import { execFileSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { hostname } from "node:os";
import {
  mkdir,
  readFile,
  readdir,
  rename,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";

const states = ["queued", "claimed", "review", "blocked", "done"] as const;
const lanes = ["global", "web", "cms", "qa", "review"] as const;
const stateSchema = z.enum(states);
const staleLockMilliseconds = 60_000;

const historyEventSchema = z.object({
  at: z.string(),
  action: z.string(),
  actor: z.string(),
  note: z.string().optional(),
});

const checkResultSchema = z.object({
  command: z.string(),
  status: z.enum(["passed", "failed", "skipped"]),
  note: z.string().optional(),
});

const taskResultSchema = z.object({
  commit: z.string().optional(),
  pullRequest: z.string().optional(),
  changedFiles: z.array(z.string()).default([]),
  checks: z.array(checkResultSchema).default([]),
  summary: z.string(),
  sharedChangesRequested: z.array(z.string()).default([]),
  delegatedTaskIds: z.array(z.string()).default([]),
  usage: z
    .object({
      inputTokens: z.number().int().min(0).default(0),
      cachedInputTokens: z.number().int().min(0).default(0),
      outputTokens: z.number().int().min(0).default(0),
    })
    .optional(),
});

const taskReviewSchema = z.object({
  verdict: z.enum(["approved", "changes-required"]),
  summary: z.string(),
  findings: z
    .array(
      z.object({
        priority: z.enum(["P0", "P1", "P2", "P3"]),
        title: z.string(),
        body: z.string(),
        file: z.string().optional(),
        line: z.number().int().positive().optional(),
      }),
    )
    .default([]),
  reviewer: z.string(),
  reviewedAt: z.string(),
  usage: z
    .object({
      inputTokens: z.number().int().min(0).default(0),
      cachedInputTokens: z.number().int().min(0).default(0),
      outputTokens: z.number().int().min(0).default(0),
    })
    .optional(),
});

const taskSchema = z.object({
  version: z.literal(1),
  id: z
    .string()
    .regex(/^[A-Z][A-Z0-9]*-\d+$/, "Expected an id such as WEB-042"),
  title: z.string().min(1),
  description: z.string().default(""),
  kind: z
    .enum(["orchestration", "implementation", "qa", "review"])
    .default("implementation"),
  parentId: z.string().optional(),
  lane: z.enum(lanes),
  role: z.string().min(1),
  priority: z.number().int().min(0).max(100).default(50),
  baseBranch: z.string().min(1),
  branch: z.string().regex(/^codex\/agent\//),
  allowedFiles: z.array(z.string()).default([]),
  sharedFiles: z.array(z.string()).default([]),
  acceptance: z.array(z.string()).default([]),
  contextFiles: z.array(z.string()).default([]),
  dependsOn: z.array(z.string()).default([]),
  tokenBudget: z.number().int().positive().optional(),
  reasoningEffort: z.enum(["low", "medium", "high", "xhigh"]).default("medium"),
  delivery: z
    .enum(["report", "commit", "push", "pull-request"])
    .default("commit"),
  status: stateSchema,
  owner: z.string().nullable(),
  leaseUntil: z.string().nullable(),
  attempt: z.number().int().min(0),
  createdAt: z.string(),
  updatedAt: z.string(),
  history: z.array(historyEventSchema),
  result: taskResultSchema.optional(),
  review: taskReviewSchema.optional(),
  blocker: z
    .object({
      reason: z.string(),
      question: z.string().optional(),
      at: z.string(),
      actor: z.string(),
      usage: z
        .object({
          inputTokens: z.number().int().min(0).default(0),
          cachedInputTokens: z.number().int().min(0).default(0),
          outputTokens: z.number().int().min(0).default(0),
        })
        .optional(),
    })
    .optional(),
});

const taskSpecSchema = z.object({
  id: z
    .string()
    .regex(/^[A-Z][A-Z0-9]*-\d+$/, "Expected an id such as WEB-042"),
  title: z.string().min(1),
  description: z.string().default(""),
  kind: z
    .enum(["orchestration", "implementation", "qa", "review"])
    .default("implementation"),
  parentId: z.string().optional(),
  lane: z.enum(lanes),
  role: z.string().min(1),
  priority: z.number().int().min(0).max(100).default(50),
  baseBranch: z.string().min(1),
  branch: z
    .string()
    .regex(/^codex\/agent\//)
    .optional(),
  allowedFiles: z.array(z.string()).default([]),
  sharedFiles: z.array(z.string()).default([]),
  acceptance: z.array(z.string()).default([]),
  contextFiles: z.array(z.string()).default([]),
  dependsOn: z.array(z.string()).default([]),
  tokenBudget: z.number().int().positive().optional(),
  reasoningEffort: z.enum(["low", "medium", "high", "xhigh"]).default("medium"),
  delivery: z
    .enum(["report", "commit", "push", "pull-request"])
    .default("commit"),
});

export type AgentTask = z.infer<typeof taskSchema>;
export type AgentTaskResult = z.infer<typeof taskResultSchema>;
export type AgentTaskSpec = z.infer<typeof taskSpecSchema>;
export type AgentTaskReview = z.infer<typeof taskReviewSchema>;
type Task = AgentTask;
type TaskState = (typeof states)[number];
type CliOptions = Map<string, string[]>;

type QueueContext = {
  root: string;
  actor: string;
};

function now(): string {
  return new Date().toISOString();
}

function parseCli(argv: string[]): { command: string; options: CliOptions } {
  const [command = "help", ...rest] = argv;
  const options: CliOptions = new Map();

  for (let index = 0; index < rest.length; index += 1) {
    const token = rest[index];
    if (!token.startsWith("--")) {
      throw new Error(`Unexpected argument: ${token}`);
    }

    const key = token.slice(2);
    const next = rest[index + 1];
    const consumesNext = Boolean(next && !next.startsWith("--"));
    const value = consumesNext ? next : "true";
    const values = options.get(key) ?? [];
    values.push(value);
    options.set(key, values);
    if (consumesNext) index += 1;
  }

  return { command, options };
}

function option(options: CliOptions, key: string): string | undefined {
  return options.get(key)?.at(-1);
}

function options(optionsMap: CliOptions, key: string): string[] {
  return optionsMap.get(key) ?? [];
}

function requiredOption(optionsMap: CliOptions, key: string): string {
  const value = option(optionsMap, key);
  if (!value) throw new Error(`Missing required option --${key}`);
  return value;
}

function integerOption(
  optionsMap: CliOptions,
  key: string,
  fallback: number,
): number {
  const value = option(optionsMap, key);
  if (!value) return fallback;
  const parsed = Number(value);
  if (!Number.isInteger(parsed)) throw new Error(`--${key} must be an integer`);
  return parsed;
}

function defaultQueueRoot(): string {
  const commonDir = execFileSync(
    "git",
    ["rev-parse", "--path-format=absolute", "--git-common-dir"],
    { encoding: "utf8" },
  ).trim();
  return join(commonDir, "agent-tasks");
}

function resolveQueueRoot(optionsMap: CliOptions): string {
  const explicit =
    option(optionsMap, "root") ?? process.env.ACME_TASK_QUEUE_ROOT;
  return explicit ? resolve(explicit) : defaultQueueRoot();
}

function taskPath(root: string, state: TaskState, id: string): string {
  return join(root, state, `${id}.json`);
}

async function pathExists(path: string): Promise<boolean> {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function ensureQueue(root: string): Promise<void> {
  await Promise.all([
    ...states.map((state) => mkdir(join(root, state), { recursive: true })),
    mkdir(join(root, "locks"), { recursive: true }),
  ]);
}

async function writeJsonAtomic(path: string, value: unknown): Promise<void> {
  await mkdir(dirname(path), { recursive: true });
  const temporary = `${path}.${process.pid}.${randomUUID()}.tmp`;
  await writeFile(temporary, `${JSON.stringify(value, null, 2)}\n`, "utf8");
  await rename(temporary, path);
}

async function readTask(path: string): Promise<Task> {
  return taskSchema.parse(JSON.parse(await readFile(path, "utf8")));
}

async function findTask(
  root: string,
  id: string,
): Promise<{ path: string; task: Task }> {
  for (const state of states) {
    const path = taskPath(root, state, id);
    if (await pathExists(path)) return { path, task: await readTask(path) };
  }
  throw new Error(`Task ${id} was not found`);
}

async function withTaskLock<T>(
  root: string,
  id: string,
  operation: () => Promise<T>,
): Promise<T> {
  const lock = join(root, "locks", id);
  try {
    await mkdir(lock);
  } catch {
    const lockAge = Date.now() - (await stat(lock)).mtimeMs;
    if (lockAge <= staleLockMilliseconds) {
      throw new Error(`Task ${id} is being modified by another process`);
    }

    const staleLock = `${lock}.stale.${randomUUID()}`;
    try {
      await rename(lock, staleLock);
      await mkdir(lock);
      await rm(staleLock, { recursive: true, force: true });
    } catch {
      throw new Error(
        `Task ${id} lock recovery lost a race to another process`,
      );
    }
  }

  try {
    return await operation();
  } finally {
    await rm(lock, { recursive: true, force: true });
  }
}

function addHistory(
  task: Task,
  action: string,
  actor: string,
  note?: string,
): void {
  const timestamp = now();
  task.updatedAt = timestamp;
  task.history.push({
    at: timestamp,
    action,
    actor,
    ...(note ? { note } : {}),
  });
}

async function moveTask(
  context: QueueContext,
  task: Task,
  from: TaskState,
  to: TaskState,
): Promise<void> {
  task.status = to;
  const source = taskPath(context.root, from, task.id);
  const target = taskPath(context.root, to, task.id);
  await writeJsonAtomic(source, task);
  await rename(source, target);
}

async function listTasks(root: string, status?: TaskState): Promise<Task[]> {
  const selectedStates = status ? [status] : [...states];
  const tasks: Task[] = [];

  for (const state of selectedStates) {
    const files = (await readdir(join(root, state))).filter((file) =>
      file.endsWith(".json"),
    );
    for (const file of files)
      tasks.push(await readTask(join(root, state, file)));
  }

  return tasks.sort(
    (left, right) =>
      left.priority - right.priority ||
      left.createdAt.localeCompare(right.createdAt) ||
      left.id.localeCompare(right.id),
  );
}

async function dependenciesReady(root: string, task: Task): Promise<boolean> {
  for (const dependencyId of task.dependsOn) {
    try {
      const dependency = await findTask(root, dependencyId);
      if (dependency.task.status !== "done") return false;
    } catch {
      return false;
    }
  }
  return true;
}

function assertOwner(task: Task, actor: string): void {
  if (task.owner !== actor) {
    throw new Error(
      `Task ${task.id} belongs to ${task.owner ?? "nobody"}, not ${actor}`,
    );
  }
}

function assertState(task: Task, expected: TaskState): void {
  if (task.status !== expected) {
    throw new Error(`Task ${task.id} is ${task.status}; expected ${expected}`);
  }
}

function branchSlug(id: string, title: string): string {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
  return `codex/agent/${id.toLowerCase()}-${slug || "task"}`;
}

async function loadSpec(
  optionsMap: CliOptions,
): Promise<z.infer<typeof taskSpecSchema>> {
  const specFile = option(optionsMap, "spec");
  if (specFile) {
    return taskSpecSchema.parse(
      JSON.parse(await readFile(resolve(specFile), "utf8")),
    );
  }

  return taskSpecSchema.parse({
    id: requiredOption(optionsMap, "id"),
    title: requiredOption(optionsMap, "title"),
    description: option(optionsMap, "description") ?? "",
    kind: option(optionsMap, "kind") ?? "implementation",
    parentId: option(optionsMap, "parent-id"),
    lane: requiredOption(optionsMap, "lane"),
    role: requiredOption(optionsMap, "role"),
    priority: integerOption(optionsMap, "priority", 50),
    baseBranch:
      option(optionsMap, "base-branch") ?? "codex/clean-astro-migration",
    branch: option(optionsMap, "branch"),
    allowedFiles: options(optionsMap, "allowed-file"),
    sharedFiles: options(optionsMap, "shared-file"),
    acceptance: options(optionsMap, "acceptance"),
    contextFiles: options(optionsMap, "context-file"),
    dependsOn: options(optionsMap, "depends-on"),
    tokenBudget: option(optionsMap, "token-budget")
      ? integerOption(optionsMap, "token-budget", 0)
      : undefined,
    reasoningEffort: option(optionsMap, "reasoning-effort") ?? "medium",
    delivery: option(optionsMap, "delivery") ?? "commit",
  });
}

async function enqueue(
  context: QueueContext,
  optionsMap: CliOptions,
): Promise<Task> {
  const spec = await loadSpec(optionsMap);
  return enqueueSpec(context, spec);
}

async function enqueueSpec(
  context: QueueContext,
  specInput: AgentTaskSpec,
): Promise<Task> {
  const spec = taskSpecSchema.parse(specInput);
  if (spec.dependsOn.includes(spec.id)) {
    throw new Error(`Task ${spec.id} cannot depend on itself`);
  }
  const branchOwner = (await listTasks(context.root)).find(
    (task) => task.branch === (spec.branch ?? branchSlug(spec.id, spec.title)),
  );
  if (branchOwner) {
    throw new Error(
      `Branch ${branchOwner.branch} is already assigned to ${branchOwner.id}`,
    );
  }
  return withTaskLock(context.root, spec.id, async () => {
    try {
      await findTask(context.root, spec.id);
      throw new Error(`Task ${spec.id} already exists`);
    } catch (error) {
      if (error instanceof Error && !error.message.includes("was not found"))
        throw error;
    }

    const timestamp = now();
    const task = taskSchema.parse({
      ...spec,
      version: 1,
      branch: spec.branch ?? branchSlug(spec.id, spec.title),
      status: "queued",
      owner: null,
      leaseUntil: null,
      attempt: 0,
      createdAt: timestamp,
      updatedAt: timestamp,
      history: [{ at: timestamp, action: "enqueued", actor: context.actor }],
    });
    await writeJsonAtomic(taskPath(context.root, "queued", task.id), task);
    return task;
  });
}

async function claim(
  context: QueueContext,
  optionsMap: CliOptions,
): Promise<Task> {
  const requestedId = option(optionsMap, "id");
  const lane = option(optionsMap, "lane");
  const leaseMinutes = integerOption(optionsMap, "lease-minutes", 30);
  if (leaseMinutes < 1) throw new Error("--lease-minutes must be at least 1");

  const candidates = (await listTasks(context.root, "queued")).filter(
    (task) =>
      (!requestedId || task.id === requestedId) &&
      (!lane || task.lane === lane),
  );

  for (const candidate of candidates) {
    if (!(await dependenciesReady(context.root, candidate))) {
      if (requestedId) {
        throw new Error(`Task ${candidate.id} has unfinished dependencies`);
      }
      continue;
    }
    try {
      return await withTaskLock(context.root, candidate.id, async () => {
        const { task } = await findTask(context.root, candidate.id);
        assertState(task, "queued");
        task.owner = context.actor;
        task.leaseUntil = new Date(
          Date.now() + leaseMinutes * 60_000,
        ).toISOString();
        task.attempt += 1;
        task.blocker = undefined;
        addHistory(
          task,
          "claimed",
          context.actor,
          `lease ${leaseMinutes} minutes`,
        );
        await moveTask(context, task, "queued", "claimed");
        return task;
      });
    } catch (error) {
      if (requestedId) throw error;
    }
  }

  throw new Error("No matching queued task is available");
}

async function heartbeat(
  context: QueueContext,
  optionsMap: CliOptions,
): Promise<Task> {
  const id = requiredOption(optionsMap, "id");
  const leaseMinutes = integerOption(optionsMap, "lease-minutes", 30);
  return withTaskLock(context.root, id, async () => {
    const { path, task } = await findTask(context.root, id);
    assertState(task, "claimed");
    assertOwner(task, context.actor);
    task.leaseUntil = new Date(
      Date.now() + leaseMinutes * 60_000,
    ).toISOString();
    addHistory(
      task,
      "heartbeat",
      context.actor,
      `lease ${leaseMinutes} minutes`,
    );
    await writeJsonAtomic(path, task);
    return task;
  });
}

async function submit(
  context: QueueContext,
  optionsMap: CliOptions,
): Promise<Task> {
  const id = requiredOption(optionsMap, "id");
  const resultFile = requiredOption(optionsMap, "result");
  const result = taskResultSchema.parse(
    JSON.parse(await readFile(resolve(resultFile), "utf8")),
  );
  return submitResult(context, id, result);
}

async function submitResult(
  context: QueueContext,
  id: string,
  resultInput: AgentTaskResult,
): Promise<Task> {
  const result = taskResultSchema.parse(resultInput);
  return withTaskLock(context.root, id, async () => {
    const { task } = await findTask(context.root, id);
    assertState(task, "claimed");
    assertOwner(task, context.actor);
    task.result = result;
    task.review = undefined;
    task.leaseUntil = null;
    addHistory(task, "submitted", context.actor, result.summary);
    await moveTask(context, task, "claimed", "review");
    return task;
  });
}

async function block(
  context: QueueContext,
  optionsMap: CliOptions,
): Promise<Task> {
  const id = requiredOption(optionsMap, "id");
  const reason = requiredOption(optionsMap, "reason");
  return blockClaim(context, id, reason, option(optionsMap, "question"));
}

async function blockClaim(
  context: QueueContext,
  id: string,
  reason: string,
  question?: string,
  usage?: AgentTaskResult["usage"],
): Promise<Task> {
  return withTaskLock(context.root, id, async () => {
    const { task } = await findTask(context.root, id);
    assertState(task, "claimed");
    assertOwner(task, context.actor);
    const timestamp = now();
    task.blocker = {
      reason,
      question,
      at: timestamp,
      actor: context.actor,
      usage,
    };
    task.leaseUntil = null;
    addHistory(task, "blocked", context.actor, reason);
    await moveTask(context, task, "claimed", "blocked");
    return task;
  });
}

async function requeue(
  context: QueueContext,
  optionsMap: CliOptions,
): Promise<Task> {
  const id = requiredOption(optionsMap, "id");
  return withTaskLock(context.root, id, async () => {
    const { task } = await findTask(context.root, id);
    if (!["claimed", "blocked", "review"].includes(task.status)) {
      throw new Error(`Task ${id} cannot be requeued from ${task.status}`);
    }
    const from = task.status;
    task.owner = null;
    task.leaseUntil = null;
    task.result = undefined;
    task.review = undefined;
    task.blocker = undefined;
    addHistory(task, "requeued", context.actor, option(optionsMap, "reason"));
    await moveTask(context, task, from, "queued");
    return task;
  });
}

async function accept(
  context: QueueContext,
  optionsMap: CliOptions,
): Promise<Task> {
  const id = requiredOption(optionsMap, "id");
  return withTaskLock(context.root, id, async () => {
    const { task } = await findTask(context.root, id);
    assertState(task, "review");
    const bypassReview = option(optionsMap, "bypass-review") === "true";
    if (task.review?.verdict !== "approved") {
      if (!bypassReview || !option(optionsMap, "note")) {
        throw new Error(
          `Task ${id} requires an approved review; bypass requires --bypass-review and --note`,
        );
      }
    }
    addHistory(task, "accepted", context.actor, option(optionsMap, "note"));
    await moveTask(context, task, "review", "done");
    return task;
  });
}

async function recordReview(
  context: QueueContext,
  id: string,
  reviewInput: Omit<AgentTaskReview, "reviewer" | "reviewedAt">,
): Promise<Task> {
  return withTaskLock(context.root, id, async () => {
    const { path, task } = await findTask(context.root, id);
    assertState(task, "review");
    task.review = taskReviewSchema.parse({
      ...reviewInput,
      reviewer: context.actor,
      reviewedAt: now(),
    });
    addHistory(task, "reviewed", context.actor, task.review.verdict);
    await writeJsonAtomic(path, task);
    return task;
  });
}

async function sweep(context: QueueContext): Promise<Task[]> {
  const claimed = await listTasks(context.root, "claimed");
  const expired: Task[] = [];

  for (const candidate of claimed) {
    if (!candidate.leaseUntil || Date.parse(candidate.leaseUntil) > Date.now())
      continue;
    try {
      const task = await withTaskLock(context.root, candidate.id, async () => {
        const { task: current } = await findTask(context.root, candidate.id);
        assertState(current, "claimed");
        if (current.leaseUntil && Date.parse(current.leaseUntil) > Date.now())
          return undefined;
        current.owner = null;
        current.leaseUntil = null;
        addHistory(current, "lease-expired", context.actor);
        await moveTask(context, current, "claimed", "queued");
        return current;
      });
      if (task) expired.push(task);
    } catch {
      // Another process renewed or moved the task.
    }
  }

  return expired;
}

async function purge(
  context: QueueContext,
  optionsMap: CliOptions,
): Promise<number> {
  if (option(optionsMap, "yes") !== "true") {
    throw new Error("Refusing to delete completed tasks without --yes");
  }
  const olderThanDays = integerOption(optionsMap, "older-than-days", 14);
  const cutoff = Date.now() - olderThanDays * 86_400_000;
  const completed = await listTasks(context.root, "done");
  let removed = 0;

  for (const task of completed) {
    if (Date.parse(task.updatedAt) > cutoff) continue;
    await withTaskLock(context.root, task.id, async () => {
      await rm(taskPath(context.root, "done", task.id));
    });
    removed += 1;
  }
  return removed;
}

export async function sharedQueueRoot(explicitRoot?: string): Promise<string> {
  const root = explicitRoot ? resolve(explicitRoot) : defaultQueueRoot();
  await ensureQueue(root);
  return root;
}

export function parseAgentTaskSpec(input: unknown): AgentTaskSpec {
  return taskSpecSchema.parse(input);
}

export async function getAgentTask(
  root: string,
  id: string,
): Promise<AgentTask> {
  await ensureQueue(root);
  return (await findTask(root, id)).task;
}

export async function enqueueAgentTask(input: {
  root: string;
  actor: string;
  spec: AgentTaskSpec;
}): Promise<AgentTask> {
  await ensureQueue(input.root);
  return enqueueSpec({ root: input.root, actor: input.actor }, input.spec);
}

export async function listAgentTasks(
  root: string,
  status?: TaskState,
): Promise<AgentTask[]> {
  await ensureQueue(root);
  return listTasks(root, status);
}

export async function claimAgentTask(input: {
  root: string;
  actor: string;
  id?: string;
  lane?: string;
  leaseMinutes?: number;
}): Promise<AgentTask> {
  await ensureQueue(input.root);
  const optionsMap: CliOptions = new Map();
  if (input.id) optionsMap.set("id", [input.id]);
  if (input.lane) optionsMap.set("lane", [input.lane]);
  optionsMap.set("lease-minutes", [String(input.leaseMinutes ?? 30)]);
  return claim({ root: input.root, actor: input.actor }, optionsMap);
}

export async function heartbeatAgentTask(input: {
  root: string;
  actor: string;
  id: string;
  leaseMinutes?: number;
}): Promise<AgentTask> {
  await ensureQueue(input.root);
  const optionsMap: CliOptions = new Map([
    ["id", [input.id]],
    ["lease-minutes", [String(input.leaseMinutes ?? 30)]],
  ]);
  return heartbeat({ root: input.root, actor: input.actor }, optionsMap);
}

export async function submitAgentTask(input: {
  root: string;
  actor: string;
  id: string;
  result: AgentTaskResult;
}): Promise<AgentTask> {
  await ensureQueue(input.root);
  return submitResult(
    { root: input.root, actor: input.actor },
    input.id,
    input.result,
  );
}

export async function blockAgentTask(input: {
  root: string;
  actor: string;
  id: string;
  reason: string;
  question?: string;
  usage?: AgentTaskResult["usage"];
}): Promise<AgentTask> {
  await ensureQueue(input.root);
  return blockClaim(
    { root: input.root, actor: input.actor },
    input.id,
    input.reason,
    input.question,
    input.usage,
  );
}

export async function recordAgentTaskReview(input: {
  root: string;
  actor: string;
  id: string;
  review: Omit<AgentTaskReview, "reviewer" | "reviewedAt">;
}): Promise<AgentTask> {
  await ensureQueue(input.root);
  return recordReview(
    { root: input.root, actor: input.actor },
    input.id,
    input.review,
  );
}

export async function acceptAgentTask(input: {
  root: string;
  actor: string;
  id: string;
  note?: string;
  bypassReview?: boolean;
}): Promise<AgentTask> {
  await ensureQueue(input.root);
  const optionsMap: CliOptions = new Map([["id", [input.id]]]);
  if (input.note) optionsMap.set("note", [input.note]);
  if (input.bypassReview) optionsMap.set("bypass-review", ["true"]);
  return accept({ root: input.root, actor: input.actor }, optionsMap);
}

function compactTask(task: Task): Record<string, unknown> {
  return {
    id: task.id,
    status: task.status,
    lane: task.lane,
    priority: task.priority,
    title: task.title,
    owner: task.owner,
    leaseUntil: task.leaseUntil,
    attempt: task.attempt,
    branch: task.branch,
    updatedAt: task.updatedAt,
  };
}

function print(value: unknown, json: boolean): void {
  if (json) {
    console.log(JSON.stringify(value, null, 2));
    return;
  }
  if (Array.isArray(value)) {
    console.table(value);
    return;
  }
  console.log(value);
}

function printHelp(): void {
  console.log(`
Acme file-backed agent task queue

Usage:
  npm.cmd run agent:tasks -- <command> [options]

Commands:
  init
  enqueue --spec <task.json>
  enqueue --id WEB-001 --title "..." --lane web --role block-porter [options]
  list [--status queued] [--json]
  show --id WEB-001
  claim [--id WEB-001] [--lane web] --actor <worker> [--lease-minutes 30]
  heartbeat --id WEB-001 --actor <worker> [--lease-minutes 30]
  submit --id WEB-001 --actor <worker> --result <result.json>
  block --id WEB-001 --actor <worker> --reason "..." [--question "..."]
  requeue --id WEB-001 --actor <orchestrator> [--reason "..."]
  sweep [--actor <dispatcher>]
  accept --id WEB-001 --actor <reviewer> [--note "..."]
  review --id WEB-001 --actor <reviewer> --result <review.json>
  purge --older-than-days 14 --yes

Global options:
  --root <path>  Override the default shared queue under .git/agent-tasks.
  --actor <name> Defaults to <hostname>:<pid>.
`);
}

export async function run(argv = process.argv.slice(2)): Promise<void> {
  const { command, options: cliOptions } = parseCli(argv);
  if (command === "help" || command === "--help" || command === "-h") {
    printHelp();
    return;
  }

  const context: QueueContext = {
    root: resolveQueueRoot(cliOptions),
    actor: option(cliOptions, "actor") ?? `${hostname()}:${process.pid}`,
  };
  await ensureQueue(context.root);
  const json = option(cliOptions, "json") === "true";

  switch (command) {
    case "init":
      print({ root: context.root, states }, true);
      break;
    case "enqueue":
      print(await enqueue(context, cliOptions), true);
      break;
    case "list": {
      const statusValue = option(cliOptions, "status");
      const status = statusValue ? stateSchema.parse(statusValue) : undefined;
      const tasks = await listTasks(context.root, status);
      print(json ? tasks : tasks.map(compactTask), json);
      break;
    }
    case "show":
      print(
        (await findTask(context.root, requiredOption(cliOptions, "id"))).task,
        true,
      );
      break;
    case "claim":
      print(await claim(context, cliOptions), true);
      break;
    case "heartbeat":
      print(await heartbeat(context, cliOptions), true);
      break;
    case "submit":
      print(await submit(context, cliOptions), true);
      break;
    case "block":
      print(await block(context, cliOptions), true);
      break;
    case "requeue":
      print(await requeue(context, cliOptions), true);
      break;
    case "sweep":
      print(await sweep(context), true);
      break;
    case "accept":
      print(await accept(context, cliOptions), true);
      break;
    case "review": {
      const reviewFile = requiredOption(cliOptions, "result");
      const review = JSON.parse(await readFile(resolve(reviewFile), "utf8"));
      print(
        await recordReview(context, requiredOption(cliOptions, "id"), review),
        true,
      );
      break;
    }
    case "purge":
      print({ removed: await purge(context, cliOptions) }, true);
      break;
    default:
      throw new Error(`Unknown command: ${command}`);
  }
}

const entry = process.argv[1] ? resolve(process.argv[1]) : "";
if (entry === fileURLToPath(import.meta.url)) {
  run().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
