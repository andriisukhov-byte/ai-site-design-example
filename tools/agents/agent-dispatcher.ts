import { spawn } from "node:child_process";
import { execFileSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { lstat, mkdir, readFile, symlink } from "node:fs/promises";
import { hostname, platform } from "node:os";
import { join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import {
  acceptAgentTask,
  blockAgentTask,
  claimAgentTask,
  enqueueAgentTask,
  getAgentTask,
  heartbeatAgentTask,
  listAgentTasks,
  recordAgentTaskReview,
  sharedQueueRoot,
  submitAgentTask,
  type AgentTask,
  type AgentTaskResult,
  type AgentTaskSpec,
  parseAgentTaskSpec,
} from "./task-queue";

const runtimeSchema = z.object({
  version: z.literal(1),
  queue: z.object({
    leaseMinutes: z.number().int().positive(),
    heartbeatSeconds: z.number().int().positive(),
    pollSeconds: z.number().int().positive(),
  }),
  worktrees: z.object({
    root: z.string().min(1),
  }),
  delivery: z.object({
    githubCommand: z.string().min(1),
    draftPullRequests: z.boolean(),
    mergeMethod: z.enum(["merge", "squash", "rebase"]),
    deleteBranchAfterMerge: z.boolean(),
  }),
  codex: z.object({
    windowsCommand: z.string().min(1),
    unixCommand: z.string().min(1),
    sandbox: z.enum(["read-only", "workspace-write", "danger-full-access"]),
    ephemeral: z.boolean(),
    maxContextFiles: z.number().int().positive().default(12),
    reviewTokenBudget: z.number().int().positive().default(8000),
  }),
  teams: z.record(
    z.string(),
    z.object({
      orchestratorRole: z.string(),
      workerRoles: z.array(z.string()),
      maxParallel: z.number().int().positive(),
      maxDelegatedTasks: z.number().int().positive(),
      defaultReasoningEffort: z.enum(["low", "medium", "high", "xhigh"]),
    }),
  ),
});

const manifestSchema = z.object({
  version: z.number(),
  roles: z.array(
    z.object({
      id: z.string(),
      roleFile: z.string(),
      promptFile: z.string(),
    }),
  ),
});

const workerResultSchema = z.object({
  status: z.enum(["completed", "blocked"]),
  blocker: z
    .object({
      reason: z.string(),
      question: z.string(),
    })
    .nullable(),
  summary: z.string(),
  commit: z.string().nullable(),
  pullRequest: z.string().nullable(),
  changedFiles: z.array(z.string()),
  checks: z.array(
    z.object({
      command: z.string(),
      status: z.enum(["passed", "failed", "skipped"]),
      note: z.string().nullable(),
    }),
  ),
  sharedChangesRequested: z.array(z.string()),
  delegatedTaskIds: z.array(z.string()),
});

const orchestratorResultSchema = z.object({
  status: z.enum(["completed", "blocked"]),
  blocker: z
    .object({
      reason: z.string(),
      question: z.string(),
    })
    .nullable(),
  summary: z.string(),
  tasks: z.array(z.unknown()).max(8),
  integrationNotes: z.array(z.string()),
});

const reviewResultSchema = z.object({
  verdict: z.enum(["approved", "changes-required"]),
  summary: z.string(),
  findings: z.array(
    z.object({
      priority: z.enum(["P0", "P1", "P2", "P3"]),
      title: z.string(),
      body: z.string(),
      file: z.string().nullable(),
      line: z.number().int().positive().nullable(),
    }),
  ),
});

export type RuntimeConfig = z.infer<typeof runtimeSchema>;
type RoleManifest = z.infer<typeof manifestSchema>;
type CliOptions = Map<string, string>;

export type DispatchPlan = {
  task: AgentTask;
  actor: string;
  repoRoot: string;
  queueRoot: string;
  worktreePath: string;
  roleFile: string;
  promptFile: string;
  workerPrompt: string;
  command: string[];
};

export type ReviewPlan = {
  task: AgentTask;
  actor: string;
  worktreePath: string;
  reviewerPrompt: string;
  command: string[];
};

function parseCli(argv: string[]): { command: string; options: CliOptions } {
  const [first = "plan", ...rest] = argv;
  const command = first.startsWith("--") ? "plan" : first;
  const tokens = first.startsWith("--") ? argv : rest;
  const options: CliOptions = new Map();

  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    if (!token.startsWith("--"))
      throw new Error(`Unexpected argument: ${token}`);
    const key = token.slice(2);
    const next = tokens[index + 1];
    if (next && !next.startsWith("--")) {
      options.set(key, next);
      index += 1;
    } else {
      options.set(key, "true");
    }
  }
  return { command, options };
}

function option(options: CliOptions, key: string): string | undefined {
  return options.get(key);
}

function git(args: string[], cwd: string): string {
  return execFileSync("git", args, {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

function gitSucceeds(args: string[], cwd: string): boolean {
  try {
    execFileSync("git", args, {
      cwd,
      stdio: "ignore",
    });
    return true;
  } catch {
    return false;
  }
}

function commandAvailable(command: string, cwd: string): boolean {
  try {
    providerExec(command, ["--version"], cwd, "ignore");
    return true;
  } catch {
    return false;
  }
}

function providerExec(
  command: string,
  args: string[],
  cwd: string,
  stdio: "ignore" | "inherit" | ["ignore", "pipe", "pipe"],
): string {
  return execFileSync(command, args, {
    cwd,
    encoding: "utf8",
    shell: platform() === "win32" && /\.(cmd|bat)$/i.test(command),
    stdio,
  }) as string;
}

function openPullRequest(input: {
  runtime: RuntimeConfig;
  repoRoot: string;
  task: AgentTask;
  summary: string;
}): string {
  const command = input.runtime.delivery.githubCommand;
  if (!commandAvailable(command, input.repoRoot)) {
    throw new Error(
      `GitHub delivery requires '${command}' on PATH and an authenticated session`,
    );
  }
  const args = [
    "pr",
    "create",
    "--base",
    input.task.baseBranch,
    "--head",
    input.task.branch,
    "--title",
    `${input.task.id}: ${input.task.title}`,
    "--body",
    [
      `Agent task: ${input.task.id}`,
      `Lane: ${input.task.lane}`,
      `Role: ${input.task.role}`,
      "",
      input.summary,
    ].join("\n"),
  ];
  if (input.runtime.delivery.draftPullRequests) args.push("--draft");
  return providerExec(command, args, input.repoRoot, [
    "ignore",
    "pipe",
    "pipe",
  ]).trim();
}

function repositoryRoot(cwd = process.cwd()): string {
  return git(["rev-parse", "--show-toplevel"], cwd);
}

export async function loadRuntime(repoRoot: string): Promise<RuntimeConfig> {
  const path = join(repoRoot, "ai", "agents", "runtime.json");
  return runtimeSchema.parse(JSON.parse(await readFile(path, "utf8")));
}

async function loadManifest(repoRoot: string): Promise<RoleManifest> {
  const path = join(repoRoot, "ai", "agents", "manifest.json");
  return manifestSchema.parse(JSON.parse(await readFile(path, "utf8")));
}

function resolveWorktreeRoot(repoRoot: string, configured: string): string {
  return resolve(repoRoot, configured);
}

function assertChildPath(parent: string, child: string): void {
  const pathFromParent = relative(resolve(parent), resolve(child));
  if (
    !pathFromParent ||
    pathFromParent === ".." ||
    pathFromParent.startsWith(`..${sep}`) ||
    resolve(pathFromParent) === pathFromParent
  ) {
    throw new Error(`Unsafe worktree path outside ${parent}: ${child}`);
  }
}

function parseWorktrees(repoRoot: string): Array<{
  path: string;
  branch?: string;
}> {
  const records = git(["worktree", "list", "--porcelain"], repoRoot)
    .split(/\r?\n\r?\n/)
    .filter(Boolean);
  return records.map((record) => {
    const lines = record.split(/\r?\n/);
    const worktree = lines
      .find((line) => line.startsWith("worktree "))
      ?.slice("worktree ".length);
    const branch = lines
      .find((line) => line.startsWith("branch "))
      ?.slice("branch refs/heads/".length);
    if (!worktree) throw new Error(`Invalid git worktree record: ${record}`);
    return { path: resolve(worktree), branch };
  });
}

export async function prepareWorktree(input: {
  repoRoot: string;
  worktreeRoot: string;
  task: AgentTask;
  create: boolean;
}): Promise<string> {
  const worktreePath = resolve(input.worktreeRoot, input.task.id);
  assertChildPath(input.worktreeRoot, worktreePath);
  const existing = parseWorktrees(input.repoRoot).find(
    (worktree) => worktree.branch === input.task.branch,
  );

  if (existing) {
    if (input.create)
      await linkSharedDependencies(input.repoRoot, existing.path);
    return existing.path;
  }
  if (!input.create) return worktreePath;

  git(["rev-parse", "--verify", input.task.baseBranch], input.repoRoot);
  await mkdir(input.worktreeRoot, { recursive: true });

  let branchExists = true;
  try {
    git(
      ["show-ref", "--verify", `refs/heads/${input.task.branch}`],
      input.repoRoot,
    );
  } catch {
    branchExists = false;
  }

  if (branchExists) {
    git(["worktree", "add", worktreePath, input.task.branch], input.repoRoot);
  } else {
    git(
      [
        "worktree",
        "add",
        "-b",
        input.task.branch,
        worktreePath,
        input.task.baseBranch,
      ],
      input.repoRoot,
    );
  }
  await linkSharedDependencies(input.repoRoot, worktreePath);
  return worktreePath;
}

async function linkSharedDependencies(
  repoRoot: string,
  worktreePath: string,
): Promise<void> {
  const source = join(repoRoot, "node_modules");
  const target = join(worktreePath, "node_modules");
  try {
    await lstat(source);
  } catch {
    return;
  }
  try {
    await lstat(target);
    return;
  } catch {
    // Create a shared dependency link below.
  }
  await symlink(source, target, platform() === "win32" ? "junction" : "dir");
}

function validateTeamTask(
  task: AgentTask,
  runtime: RuntimeConfig,
  manifest: RoleManifest,
): { roleFile: string; promptFile: string } {
  const team = runtime.teams[task.lane];
  if (!team)
    throw new Error(`No runtime team is configured for lane ${task.lane}`);
  const allowedRoles = new Set([team.orchestratorRole, ...team.workerRoles]);
  if (!allowedRoles.has(task.role)) {
    throw new Error(`Role ${task.role} is not allowed in lane ${task.lane}`);
  }
  const role = manifest.roles.find((candidate) => candidate.id === task.role);
  if (!role)
    throw new Error(
      `Role ${task.role} is missing from ai/agents/manifest.json`,
    );
  if (task.contextFiles.length > runtime.codex.maxContextFiles) {
    throw new Error(
      `Task ${task.id} has ${task.contextFiles.length} context files; maximum is ${runtime.codex.maxContextFiles}`,
    );
  }
  if (task.delivery !== "report" && task.allowedFiles.length === 0) {
    throw new Error(`Writable task ${task.id} must define allowedFiles`);
  }
  if (task.kind === "orchestration" && task.delivery !== "report") {
    throw new Error(`Orchestration task ${task.id} must use delivery=report`);
  }
  return { roleFile: role.roleFile, promptFile: role.promptFile };
}

function lines(title: string, values: string[]): string {
  return values.length
    ? `${title}:\n${values.map((value) => `- ${value}`).join("\n")}`
    : `${title}: none`;
}

export function buildWorkerPrompt(
  task: AgentTask,
  role: { roleFile: string; promptFile: string },
): string {
  return [
    task.kind === "orchestration"
      ? "Apply ai/prompts/queue-orchestrator.md."
      : "Apply ai/prompts/queue-worker.md.",
    `Task: ${task.id} — ${task.title}`,
    `Lane: ${task.lane}`,
    `Assigned role: ${task.role}`,
    `Role contract: ${role.roleFile}`,
    `Role prompt: ${role.promptFile}`,
    `Base branch: ${task.baseBranch}`,
    `Task branch: ${task.branch}`,
    `Delivery: ${task.delivery}`,
    task.tokenBudget
      ? `Soft token budget: ${task.tokenBudget}. Stop broad exploration and escalate if the bounded task cannot fit.`
      : "Token policy: use compact, source-linked context and avoid broad repository exploration.",
    "",
    "Description:",
    task.description || task.title,
    "",
    lines("Context files to read", task.contextFiles),
    "",
    lines("Allowed write scope", task.allowedFiles),
    "",
    lines("Orchestrator-owned shared files (do not edit)", task.sharedFiles),
    "",
    lines("Acceptance commands", task.acceptance),
    "",
    "Return only the structured worker result. Do not include prose outside it.",
  ].join("\n");
}

function codexArgs(input: {
  task: AgentTask;
  runtime: RuntimeConfig;
  repoRoot: string;
  worktreePath: string;
  resultPath: string;
}): string[] {
  const args = [
    "exec",
    "--cd",
    input.worktreePath,
    "--sandbox",
    input.task.delivery === "report"
      ? "read-only"
      : input.runtime.codex.sandbox,
    "-c",
    'approval_policy="never"',
    "-c",
    `model_reasoning_effort="${input.task.reasoningEffort}"`,
    "--output-schema",
    join(
      input.repoRoot,
      "ai",
      "schemas",
      input.task.kind === "orchestration"
        ? "agent-task-plan.schema.json"
        : "agent-worker-result.schema.json",
    ),
    "--output-last-message",
    input.resultPath,
    "--json",
  ];
  if (input.runtime.codex.ephemeral) args.push("--ephemeral");
  args.push("-");
  return args;
}

async function runProcess(input: {
  command: string;
  args: string[];
  cwd: string;
  stdin?: string;
  onStdout?: (chunk: string) => void;
}): Promise<{ code: number; stdout: string; stderr: string }> {
  return new Promise((resolvePromise, reject) => {
    const child = spawn(input.command, input.args, {
      cwd: input.cwd,
      shell: platform() === "win32",
      windowsHide: true,
      stdio: ["pipe", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk: Buffer) => {
      const text = chunk.toString();
      stdout += text;
      input.onStdout?.(text);
    });
    child.stderr.on("data", (chunk: Buffer) => {
      stderr += chunk.toString();
    });
    child.on("error", reject);
    child.on("close", (code) =>
      resolvePromise({ code: code ?? 1, stdout, stderr }),
    );
    child.stdin.end(input.stdin ?? "");
  });
}

function collectUsage(jsonl: string): AgentTaskResult["usage"] {
  let inputTokens = 0;
  let cachedInputTokens = 0;
  let outputTokens = 0;

  const visit = (value: unknown): void => {
    if (!value || typeof value !== "object") return;
    if (Array.isArray(value)) {
      value.forEach(visit);
      return;
    }
    const record = value as Record<string, unknown>;
    const number = (camel: string, snake: string): number =>
      typeof record[camel] === "number"
        ? (record[camel] as number)
        : typeof record[snake] === "number"
          ? (record[snake] as number)
          : 0;
    inputTokens = Math.max(inputTokens, number("inputTokens", "input_tokens"));
    cachedInputTokens = Math.max(
      cachedInputTokens,
      number("cachedInputTokens", "cached_input_tokens"),
    );
    outputTokens = Math.max(
      outputTokens,
      number("outputTokens", "output_tokens"),
    );
    Object.values(record).forEach(visit);
  };

  for (const line of jsonl.split(/\r?\n/)) {
    if (!line.trim()) continue;
    try {
      visit(JSON.parse(line));
    } catch {
      // Non-JSON diagnostics are ignored; the worker result is validated separately.
    }
  }
  return { inputTokens, cachedInputTokens, outputTokens };
}

function normalizeGitPath(path: string): string {
  return path.replaceAll("\\", "/").replace(/^\.\//, "");
}

function globPattern(pattern: string): RegExp {
  const normalized = normalizeGitPath(pattern);
  let source = "^";
  for (let index = 0; index < normalized.length; index += 1) {
    const char = normalized[index];
    if (char === "*" && normalized[index + 1] === "*") {
      source += ".*";
      index += 1;
    } else if (char === "*") {
      source += "[^/]*";
    } else {
      source += char.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&");
    }
  }
  return new RegExp(`${source}$`);
}

function matchesAny(path: string, patterns: string[]): boolean {
  return patterns.some((pattern) =>
    globPattern(pattern).test(normalizeGitPath(path)),
  );
}

function changedFiles(task: AgentTask, worktreePath: string): string[] {
  const committed = git(
    ["diff", "--name-only", `${task.baseBranch}...HEAD`],
    worktreePath,
  );
  const unstaged = git(["diff", "--name-only"], worktreePath);
  const staged = git(["diff", "--cached", "--name-only"], worktreePath);
  return [
    ...new Set(
      [committed, unstaged, staged].flatMap((value) => value.split(/\r?\n/)),
    ),
  ]
    .map(normalizeGitPath)
    .filter(Boolean)
    .sort();
}

function validateScope(task: AgentTask, files: string[]): void {
  const sharedChanges = files.filter((file) =>
    matchesAny(file, task.sharedFiles),
  );
  if (sharedChanges.length) {
    throw new Error(
      `Worker changed orchestrator-owned files: ${sharedChanges.join(", ")}`,
    );
  }
  const outsideScope = files.filter(
    (file) => !matchesAny(file, task.allowedFiles),
  );
  if (outsideScope.length) {
    throw new Error(
      `Worker changed files outside allowed scope: ${outsideScope.join(", ")}`,
    );
  }
}

async function runAcceptance(
  task: AgentTask,
  worktreePath: string,
): Promise<AgentTaskResult["checks"]> {
  const checks: AgentTaskResult["checks"] = [];
  for (const command of task.acceptance) {
    const result = await runProcess({
      command: platform() === "win32" ? "cmd.exe" : "/bin/sh",
      args:
        platform() === "win32" ? ["/d", "/s", "/c", command] : ["-lc", command],
      cwd: worktreePath,
    });
    const output = `${result.stdout}\n${result.stderr}`.trim();
    checks.push({
      command,
      status: result.code === 0 ? "passed" : "failed",
      ...(output
        ? { note: output.length > 2000 ? output.slice(-2000) : output }
        : {}),
    });
    if (result.code !== 0) break;
  }
  return checks;
}

function allowedDelegationLanes(parentLane: string): Set<string> {
  switch (parentLane) {
    case "global":
      return new Set(["web", "cms", "qa", "review"]);
    case "web":
      return new Set(["web", "qa", "review"]);
    case "cms":
      return new Set(["cms", "qa", "review"]);
    case "qa":
      return new Set(["qa", "review"]);
    default:
      return new Set(["review"]);
  }
}

function assertAcyclicChildren(children: AgentTaskSpec[]): void {
  const childIds = new Set(children.map((child) => child.id));
  const visiting = new Set<string>();
  const visited = new Set<string>();
  const byId = new Map(children.map((child) => [child.id, child]));

  const visit = (id: string): void => {
    if (visited.has(id)) return;
    if (visiting.has(id))
      throw new Error(`Delegated task dependency cycle includes ${id}`);
    visiting.add(id);
    for (const dependency of byId.get(id)?.dependsOn ?? []) {
      if (childIds.has(dependency)) visit(dependency);
    }
    visiting.delete(id);
    visited.add(id);
  };

  children.forEach((child) => visit(child.id));
}

async function delegateOrchestrationPlan(input: {
  parent: AgentTask;
  rawTasks: unknown[];
  runtime: RuntimeConfig;
  manifest: RoleManifest;
  queueRoot: string;
  actor: string;
}): Promise<string[]> {
  const team = input.runtime.teams[input.parent.lane];
  if (input.rawTasks.length > team.maxDelegatedTasks) {
    throw new Error(
      `Orchestrator returned ${input.rawTasks.length} tasks; lane maximum is ${team.maxDelegatedTasks}`,
    );
  }
  const allowedLanes = allowedDelegationLanes(input.parent.lane);
  const children = input.rawTasks.map((rawTask) =>
    parseAgentTaskSpec({
      ...(rawTask as Record<string, unknown>),
      parentId: input.parent.id,
      dependsOn: [
        input.parent.id,
        ...(((rawTask as Record<string, unknown>).dependsOn as string[]) ?? []),
      ],
    }),
  );
  const ids = new Set<string>();
  for (const child of children) {
    if (ids.has(child.id))
      throw new Error(`Duplicate delegated task id ${child.id}`);
    ids.add(child.id);
    if (child.id === input.parent.id) {
      throw new Error(`Orchestrator reused parent id ${child.id}`);
    }
    if (child.baseBranch !== input.parent.baseBranch) {
      throw new Error(
        `Delegated task ${child.id} changed base branch from ${input.parent.baseBranch}`,
      );
    }
    if (!allowedLanes.has(child.lane)) {
      throw new Error(
        `${input.parent.lane} orchestrator cannot delegate to ${child.lane}`,
      );
    }
    if (child.kind === "orchestration" && input.parent.lane !== "global") {
      throw new Error(
        `Only the global orchestrator may delegate orchestration task ${child.id}`,
      );
    }
    validateTeamTask(
      {
        ...input.parent,
        ...child,
        status: "queued",
        owner: null,
        leaseUntil: null,
        attempt: 0,
        createdAt: input.parent.createdAt,
        updatedAt: input.parent.updatedAt,
        history: [],
      },
      input.runtime,
      input.manifest,
    );
  }
  assertAcyclicChildren(children);

  const enqueued: string[] = [];
  for (const child of children) {
    await enqueueAgentTask({
      root: input.queueRoot,
      actor: input.actor,
      spec: child,
    });
    enqueued.push(child.id);
  }
  return enqueued;
}

async function createDispatchPlan(input: {
  repoRoot: string;
  queueRoot: string;
  task: AgentTask;
  actor: string;
  runtime: RuntimeConfig;
  manifest: RoleManifest;
  createWorktree: boolean;
}): Promise<DispatchPlan> {
  const role = validateTeamTask(input.task, input.runtime, input.manifest);
  if (
    input.task.delivery === "pull-request" &&
    !commandAvailable(input.runtime.delivery.githubCommand, input.repoRoot)
  ) {
    throw new Error(
      `GitHub delivery requires '${input.runtime.delivery.githubCommand}' on PATH and an authenticated session`,
    );
  }
  const worktreeRoot = resolveWorktreeRoot(
    input.repoRoot,
    input.runtime.worktrees.root,
  );
  const worktreePath = await prepareWorktree({
    repoRoot: input.repoRoot,
    worktreeRoot,
    task: input.task,
    create: input.createWorktree,
  });
  const runDir = join(input.queueRoot, "runs", input.task.id);
  await mkdir(runDir, { recursive: true });
  const resultPath = join(
    runDir,
    `attempt-${input.task.attempt || 1}-${randomUUID()}.json`,
  );
  const command =
    platform() === "win32"
      ? input.runtime.codex.windowsCommand
      : input.runtime.codex.unixCommand;
  return {
    task: input.task,
    actor: input.actor,
    repoRoot: input.repoRoot,
    queueRoot: input.queueRoot,
    worktreePath,
    roleFile: role.roleFile,
    promptFile: role.promptFile,
    workerPrompt: buildWorkerPrompt(input.task, role),
    command: [
      command,
      ...codexArgs({
        task: input.task,
        runtime: input.runtime,
        repoRoot: input.repoRoot,
        worktreePath,
        resultPath,
      }),
    ],
  };
}

export async function dispatchOnce(input: {
  repoRoot?: string;
  queueRoot?: string;
  id?: string;
  lane?: string;
  actor?: string;
  execute: boolean;
}): Promise<DispatchPlan | AgentTask> {
  const repoRoot = input.repoRoot ? resolve(input.repoRoot) : repositoryRoot();
  const runtime = await loadRuntime(repoRoot);
  const manifest = await loadManifest(repoRoot);
  const queueRoot = await sharedQueueRoot(input.queueRoot);
  const actor = input.actor ?? `dispatcher:${hostname()}:${process.pid}`;

  let task: AgentTask;
  if (input.execute) {
    task = await claimAgentTask({
      root: queueRoot,
      actor,
      id: input.id,
      lane: input.lane,
      leaseMinutes: runtime.queue.leaseMinutes,
    });
  } else if (input.id) {
    task = await getAgentTask(queueRoot, input.id);
  } else {
    const candidates = (await listAgentTasks(queueRoot, "queued")).filter(
      (candidate) => !input.lane || candidate.lane === input.lane,
    );
    if (!candidates[0]) throw new Error("No matching queued task is available");
    task = candidates[0];
  }

  try {
    const plan = await createDispatchPlan({
      repoRoot,
      queueRoot,
      task,
      actor,
      runtime,
      manifest,
      createWorktree: input.execute,
    });
    if (!input.execute) return plan;

    const resultPath =
      plan.command[plan.command.indexOf("--output-last-message") + 1];
    let heartbeatRunning = false;
    const heartbeat = setInterval(async () => {
      if (heartbeatRunning) return;
      heartbeatRunning = true;
      try {
        await heartbeatAgentTask({
          root: queueRoot,
          actor,
          id: task.id,
          leaseMinutes: runtime.queue.leaseMinutes,
        });
      } finally {
        heartbeatRunning = false;
      }
    }, runtime.queue.heartbeatSeconds * 1000);

    let processResult: Awaited<ReturnType<typeof runProcess>>;
    try {
      processResult = await runProcess({
        command: plan.command[0],
        args: plan.command.slice(1),
        cwd: repoRoot,
        stdin: plan.workerPrompt,
      });
    } finally {
      clearInterval(heartbeat);
    }

    if (processResult.code !== 0) {
      throw new Error(
        `Codex worker exited ${processResult.code}: ${processResult.stderr.slice(-2000)}`,
      );
    }

    const usage = collectUsage(processResult.stdout);
    if (task.kind === "orchestration") {
      const effectiveTokens =
        usage.inputTokens - usage.cachedInputTokens + usage.outputTokens;
      if (task.tokenBudget && effectiveTokens > task.tokenBudget) {
        throw new Error(
          `Soft token budget exceeded: ${effectiveTokens}/${task.tokenBudget} effective tokens`,
        );
      }
      const status = git(["status", "--porcelain"], plan.worktreePath);
      const files = changedFiles(task, plan.worktreePath);
      if (status || files.length) {
        throw new Error("Orchestration task modified its read-only worktree");
      }
      const orchestration = orchestratorResultSchema.parse(
        JSON.parse(await readFile(resultPath, "utf8")),
      );
      if (orchestration.status === "blocked") {
        return blockAgentTask({
          root: queueRoot,
          actor,
          id: task.id,
          reason: orchestration.blocker?.reason ?? orchestration.summary,
          question: orchestration.blocker?.question,
          usage,
        });
      }
      const delegatedTaskIds = await delegateOrchestrationPlan({
        parent: task,
        rawTasks: orchestration.tasks,
        runtime,
        manifest,
        queueRoot,
        actor,
      });
      return submitAgentTask({
        root: queueRoot,
        actor,
        id: task.id,
        result: {
          summary: orchestration.summary,
          changedFiles: [],
          checks: [],
          sharedChangesRequested: orchestration.integrationNotes,
          delegatedTaskIds,
          usage,
        },
      });
    }

    const workerResult = workerResultSchema.parse(
      JSON.parse(await readFile(resultPath, "utf8")),
    );
    if (workerResult.status === "blocked") {
      return blockAgentTask({
        root: queueRoot,
        actor,
        id: task.id,
        reason: workerResult.blocker?.reason ?? workerResult.summary,
        question: workerResult.blocker?.question,
        usage,
      });
    }
    const files = changedFiles(task, plan.worktreePath);
    validateScope(task, files);

    const status = git(["status", "--porcelain"], plan.worktreePath);
    if (task.delivery !== "report" && status) {
      throw new Error("Worker left uncommitted changes in its worktree");
    }
    if (task.delivery === "report" && files.length) {
      throw new Error("Read-only report task changed files");
    }

    const ahead = Number(
      git(
        ["rev-list", "--count", `${task.baseBranch}..HEAD`],
        plan.worktreePath,
      ),
    );
    if (task.delivery !== "report" && ahead < 1) {
      throw new Error("Worker did not create a task commit");
    }

    const checks = await runAcceptance(task, plan.worktreePath);
    const failedCheck = checks.find((check) => check.status === "failed");
    if (failedCheck) {
      throw new Error(`Acceptance failed: ${failedCheck.command}`);
    }

    const effectiveTokens =
      usage.inputTokens - usage.cachedInputTokens + usage.outputTokens;
    if (task.tokenBudget && effectiveTokens > task.tokenBudget) {
      throw new Error(
        `Soft token budget exceeded: ${effectiveTokens}/${task.tokenBudget} effective tokens`,
      );
    }

    const commit = git(["rev-parse", "HEAD"], plan.worktreePath);
    const workerDelivery = {
      summary: workerResult.summary,
      changedFiles: workerResult.changedFiles,
      checks: workerResult.checks.map((check) => ({
        command: check.command,
        status: check.status,
        ...(check.note ? { note: check.note } : {}),
      })),
      sharedChangesRequested: workerResult.sharedChangesRequested,
      delegatedTaskIds: workerResult.delegatedTaskIds,
    };
    let pullRequest = workerResult.pullRequest ?? undefined;
    if (task.delivery === "push" || task.delivery === "pull-request") {
      git(["push", "--set-upstream", "origin", task.branch], plan.worktreePath);
    }
    if (task.delivery === "pull-request") {
      pullRequest = openPullRequest({
        runtime,
        repoRoot,
        task,
        summary: workerDelivery.summary,
      });
    }

    const result: AgentTaskResult = {
      ...workerDelivery,
      ...(task.delivery === "report" ? {} : { commit }),
      ...(pullRequest ? { pullRequest } : {}),
      changedFiles: files,
      checks,
      usage,
    };

    return submitAgentTask({
      root: queueRoot,
      actor,
      id: task.id,
      result,
    });
  } catch (error) {
    if (input.execute) {
      const message = error instanceof Error ? error.message : String(error);
      try {
        await blockAgentTask({
          root: queueRoot,
          actor,
          id: task.id,
          reason: message.slice(0, 4000),
        });
      } catch {
        // Preserve the original dispatcher error if the task moved concurrently.
      }
    }
    throw error;
  }
}

function buildReviewerPrompt(task: AgentTask): string {
  return [
    "Apply ai/prompts/queue-reviewer.md.",
    "Reviewer role: ai/agents/code-reviewer.md",
    "Reviewer prompt: ai/prompts/code-review.md",
    `Task: ${task.id} — ${task.title}`,
    `Base branch: ${task.baseBranch}`,
    `Task branch: ${task.branch}`,
    `Worker commit: ${task.result?.commit ?? "not reported"}`,
    "",
    lines("Allowed write scope", task.allowedFiles),
    "",
    lines("Forbidden shared files", task.sharedFiles),
    "",
    lines("Task context", task.contextFiles),
    "",
    "Worker summary:",
    task.result?.summary ?? "missing",
    "",
    "Acceptance evidence:",
    JSON.stringify(task.result?.checks ?? []),
    "",
    `Inspect git diff ${task.baseBranch}...HEAD and return only the structured review result.`,
  ].join("\n");
}

export async function reviewOnce(input: {
  repoRoot?: string;
  queueRoot?: string;
  id: string;
  actor?: string;
  execute: boolean;
}): Promise<ReviewPlan | AgentTask> {
  const repoRoot = input.repoRoot ? resolve(input.repoRoot) : repositoryRoot();
  const runtime = await loadRuntime(repoRoot);
  const queueRoot = await sharedQueueRoot(input.queueRoot);
  const task = await getAgentTask(queueRoot, input.id);
  if (task.status !== "review") {
    throw new Error(`Task ${task.id} is ${task.status}; expected review`);
  }
  if (!task.result) throw new Error(`Task ${task.id} has no worker result`);

  const actor = input.actor ?? `reviewer:${hostname()}:${process.pid}`;
  const worktreePath = await prepareWorktree({
    repoRoot,
    worktreeRoot: resolveWorktreeRoot(repoRoot, runtime.worktrees.root),
    task,
    create: input.execute,
  });
  const runDir = join(queueRoot, "runs", task.id);
  await mkdir(runDir, { recursive: true });
  const resultPath = join(runDir, `review-${randomUUID()}.json`);
  const command =
    platform() === "win32"
      ? runtime.codex.windowsCommand
      : runtime.codex.unixCommand;
  const args = [
    "exec",
    "--cd",
    worktreePath,
    "--sandbox",
    "read-only",
    "-c",
    'approval_policy="never"',
    "-c",
    'model_reasoning_effort="high"',
    "--output-schema",
    join(repoRoot, "ai", "schemas", "agent-review.schema.json"),
    "--output-last-message",
    resultPath,
    "--json",
  ];
  if (runtime.codex.ephemeral) args.push("--ephemeral");
  args.push("-");

  const plan: ReviewPlan = {
    task,
    actor,
    worktreePath,
    reviewerPrompt: buildReviewerPrompt(task),
    command: [command, ...args],
  };
  if (!input.execute) return plan;

  const processResult = await runProcess({
    command,
    args,
    cwd: repoRoot,
    stdin: plan.reviewerPrompt,
  });
  if (processResult.code !== 0) {
    throw new Error(
      `Codex reviewer exited ${processResult.code}: ${processResult.stderr.slice(-2000)}`,
    );
  }
  const review = reviewResultSchema.parse(
    JSON.parse(await readFile(resultPath, "utf8")),
  );
  const usage = collectUsage(processResult.stdout);
  const effectiveTokens =
    usage.inputTokens - usage.cachedInputTokens + usage.outputTokens;
  if (effectiveTokens > runtime.codex.reviewTokenBudget) {
    throw new Error(
      `Review token budget exceeded: ${effectiveTokens}/${runtime.codex.reviewTokenBudget}`,
    );
  }
  return recordAgentTaskReview({
    root: queueRoot,
    actor,
    id: task.id,
    review: {
      verdict: review.verdict,
      summary: review.summary,
      findings: review.findings.map((finding) => ({
        priority: finding.priority,
        title: finding.title,
        body: finding.body,
        ...(finding.file ? { file: finding.file } : {}),
        ...(finding.line ? { line: finding.line } : {}),
      })),
      usage,
    },
  });
}

export async function integrateTask(input: {
  repoRoot?: string;
  queueRoot?: string;
  id: string;
  actor?: string;
  execute: boolean;
}): Promise<Record<string, unknown> | AgentTask> {
  const repoRoot = input.repoRoot ? resolve(input.repoRoot) : repositoryRoot();
  const queueRoot = await sharedQueueRoot(input.queueRoot);
  const task = await getAgentTask(queueRoot, input.id);
  if (task.status !== "review") {
    throw new Error(`Task ${task.id} is ${task.status}; expected review`);
  }
  if (task.review?.verdict !== "approved") {
    throw new Error(`Task ${task.id} does not have an approved review`);
  }
  const actor = input.actor ?? `integrator:${hostname()}:${process.pid}`;
  const taskWorktree = parseWorktrees(repoRoot).find(
    (worktree) => worktree.branch === task.branch,
  );
  const plan = {
    task: task.id,
    baseBranch: task.baseBranch,
    taskBranch: task.branch,
    taskWorktree: taskWorktree?.path,
    actor,
    mergeRequired: task.delivery !== "report",
  };
  if (!input.execute) return plan;

  if (task.delivery === "pull-request") {
    const runtime = await loadRuntime(repoRoot);
    const pullRequest = task.result?.pullRequest;
    if (!pullRequest)
      throw new Error(`Task ${task.id} has no pull request URL`);
    const command = runtime.delivery.githubCommand;
    if (!commandAvailable(command, repoRoot)) {
      throw new Error(
        `GitHub integration requires '${command}' on PATH and an authenticated session`,
      );
    }
    if (runtime.delivery.draftPullRequests) {
      providerExec(command, ["pr", "ready", pullRequest], repoRoot, "inherit");
    }
    const mergeArgs = [
      "pr",
      "merge",
      pullRequest,
      `--${runtime.delivery.mergeMethod}`,
    ];
    if (runtime.delivery.deleteBranchAfterMerge)
      mergeArgs.push("--delete-branch");
    providerExec(command, mergeArgs, repoRoot, "inherit");
    if (taskWorktree && resolve(taskWorktree.path) !== resolve(repoRoot)) {
      git(["worktree", "remove", taskWorktree.path], repoRoot);
    }
    if (
      gitSucceeds(
        ["show-ref", "--verify", `refs/heads/${task.branch}`],
        repoRoot,
      )
    ) {
      git(["branch", "-D", task.branch], repoRoot);
    }
    return acceptAgentTask({
      root: queueRoot,
      actor,
      id: task.id,
      note: `Merged pull request ${pullRequest}`,
    });
  }

  const currentBranch = git(["branch", "--show-current"], repoRoot);
  if (currentBranch !== task.baseBranch) {
    throw new Error(
      `Integration checkout is ${currentBranch}; expected ${task.baseBranch}`,
    );
  }
  if (git(["status", "--porcelain"], repoRoot)) {
    throw new Error("Integration checkout must be clean before merge");
  }

  if (
    task.delivery !== "report" &&
    !gitSucceeds(
      ["merge-base", "--is-ancestor", task.branch, task.baseBranch],
      repoRoot,
    )
  ) {
    try {
      git(
        [
          "merge",
          "--no-ff",
          "-m",
          `Merge agent task ${task.id}: ${task.title}`,
          task.branch,
        ],
        repoRoot,
      );
    } catch (error) {
      if (gitSucceeds(["rev-parse", "--verify", "MERGE_HEAD"], repoRoot)) {
        git(["merge", "--abort"], repoRoot);
      }
      throw error;
    }
  }

  if (taskWorktree && resolve(taskWorktree.path) !== resolve(repoRoot)) {
    git(["worktree", "remove", taskWorktree.path], repoRoot);
  }
  if (
    gitSucceeds(["show-ref", "--verify", `refs/heads/${task.branch}`], repoRoot)
  ) {
    git(["branch", "-d", task.branch], repoRoot);
  }

  return acceptAgentTask({
    root: queueRoot,
    actor,
    id: task.id,
    note: `Integrated into ${task.baseBranch}`,
  });
}

function printablePlan(plan: DispatchPlan): Record<string, unknown> {
  return {
    task: {
      id: plan.task.id,
      title: plan.task.title,
      lane: plan.task.lane,
      role: plan.task.role,
      delivery: plan.task.delivery,
      reasoningEffort: plan.task.reasoningEffort,
      tokenBudget: plan.task.tokenBudget,
    },
    actor: plan.actor,
    worktreePath: plan.worktreePath,
    roleFile: plan.roleFile,
    promptFile: plan.promptFile,
    command: plan.command,
    promptCharacters: plan.workerPrompt.length,
    contextFiles: plan.task.contextFiles,
  };
}

function printHelp(): void {
  console.log(`
Acme Codex task dispatcher

Usage:
  npm.cmd run agent:dispatch -- plan --id WEB-042
  npm.cmd run agent:dispatch -- run --id WEB-042 --execute
  npm.cmd run agent:dispatch -- run --lane web --execute
  npm.cmd run agent:dispatch -- review --id WEB-042 --execute
  npm.cmd run agent:dispatch -- integrate --id WEB-042 --execute

Safety:
  plan is read-only and does not claim tasks or create worktrees.
  run requires --execute, atomically claims one task, creates/resumes its worktree,
  runs Codex, verifies scope and acceptance, then submits it for review.
`);
}

export async function run(argv = process.argv.slice(2)): Promise<void> {
  const { command, options } = parseCli(argv);
  if (command === "help" || option(options, "help") === "true") {
    printHelp();
    return;
  }
  if (!["plan", "run", "review", "integrate"].includes(command)) {
    throw new Error(`Unknown dispatcher command: ${command}`);
  }
  if (command === "review") {
    const id = option(options, "id");
    if (!id) throw new Error("review requires --id");
    const execute = option(options, "execute") === "true";
    const result = await reviewOnce({
      repoRoot: option(options, "repo"),
      queueRoot: option(options, "queue-root"),
      id,
      actor: option(options, "actor"),
      execute,
    });
    console.log(
      JSON.stringify(
        "reviewerPrompt" in result
          ? {
              task: result.task.id,
              actor: result.actor,
              worktreePath: result.worktreePath,
              command: result.command,
              promptCharacters: result.reviewerPrompt.length,
            }
          : result,
        null,
        2,
      ),
    );
    return;
  }
  if (command === "integrate") {
    const id = option(options, "id");
    if (!id) throw new Error("integrate requires --id");
    const result = await integrateTask({
      repoRoot: option(options, "repo"),
      queueRoot: option(options, "queue-root"),
      id,
      actor: option(options, "actor"),
      execute: option(options, "execute") === "true",
    });
    console.log(JSON.stringify(result, null, 2));
    return;
  }
  const execute = command === "run" && option(options, "execute") === "true";
  if (command === "run" && !execute) {
    throw new Error("run requires explicit --execute");
  }
  const result = await dispatchOnce({
    repoRoot: option(options, "repo"),
    queueRoot: option(options, "queue-root"),
    id: option(options, "id"),
    lane: option(options, "lane"),
    actor: option(options, "actor"),
    execute,
  });
  console.log(
    JSON.stringify(
      "workerPrompt" in result ? printablePlan(result) : result,
      null,
      2,
    ),
  );
}

const entry = process.argv[1] ? resolve(process.argv[1]) : "";
if (entry === fileURLToPath(import.meta.url)) {
  run().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
