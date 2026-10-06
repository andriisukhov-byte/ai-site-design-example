import { execFileSync } from "node:child_process";
import { hostname } from "node:os";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  dispatchOnce,
  loadRuntime,
  reviewOnce,
  type RuntimeConfig,
} from "./agent-dispatcher";
import { listAgentTasks, sharedQueueRoot, type AgentTask } from "./task-queue";

type CliOptions = Map<string, string>;

function parseCli(argv: string[]): { command: string; options: CliOptions } {
  const [command = "plan", ...tokens] = argv;
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

function integerOption(
  options: CliOptions,
  key: string,
  fallback: number,
): number {
  const raw = option(options, key);
  if (!raw) return fallback;
  const value = Number(raw);
  if (!Number.isInteger(value) || value < 1) {
    throw new Error(`--${key} must be a positive integer`);
  }
  return value;
}

function repositoryRoot(cwd = process.cwd()): string {
  return execFileSync("git", ["rev-parse", "--show-toplevel"], {
    cwd,
    encoding: "utf8",
  }).trim();
}

function selectedLanes(runtime: RuntimeConfig, requested?: string): string[] {
  const lanes = requested
    ? requested
        .split(",")
        .map((lane) => lane.trim())
        .filter(Boolean)
    : ["global", "web", "cms", "qa"];
  for (const lane of lanes) {
    if (!runtime.teams[lane]) throw new Error(`Unknown team lane: ${lane}`);
  }
  return lanes;
}

export async function buildSupervisorPlan(input: {
  repoRoot: string;
  queueRoot: string;
  lanes: string[];
  maxParallel: number;
}): Promise<Record<string, unknown>> {
  const runtime = await loadRuntime(input.repoRoot);
  const queued = await listAgentTasks(input.queueRoot, "queued");
  const review = await listAgentTasks(input.queueRoot, "review");
  return {
    queueRoot: input.queueRoot,
    globalParallelCap: input.maxParallel,
    teams: input.lanes.map((lane) => ({
      lane,
      configuredParallelism: runtime.teams[lane].maxParallel,
      queued: queued.filter((task) => task.lane === lane).length,
      roles: runtime.teams[lane].workerRoles,
    })),
    waitingForReview: review.length,
    reviewWithoutVerdict: review.filter((task) => !task.review).length,
  };
}

function taskSummary(task: AgentTask): Record<string, unknown> {
  return {
    id: task.id,
    status: task.status,
    lane: task.lane,
    delegated: task.result?.delegatedTaskIds ?? [],
    usage: task.result?.usage,
  };
}

async function runWorkerWave(input: {
  repoRoot: string;
  queueRoot: string;
  runtime: RuntimeConfig;
  lanes: string[];
  maxParallel: number;
  remaining: number;
  actorPrefix: string;
}): Promise<{ completed: number; results: Record<string, unknown>[] }> {
  const slots: string[] = [];
  const widestTeam = Math.max(
    ...input.lanes.map((lane) => input.runtime.teams[lane].maxParallel),
  );
  for (let round = 0; round < widestTeam; round += 1) {
    for (const lane of input.lanes) {
      if (round < input.runtime.teams[lane].maxParallel) slots.push(lane);
    }
  }
  const selected = slots.slice(0, Math.min(input.maxParallel, input.remaining));
  const settled = await Promise.allSettled(
    selected.map((lane, index) =>
      dispatchOnce({
        repoRoot: input.repoRoot,
        queueRoot: input.queueRoot,
        lane,
        actor: `${input.actorPrefix}:${lane}:${index}`,
        execute: true,
      }),
    ),
  );
  const results: Record<string, unknown>[] = [];
  let completed = 0;
  for (const item of settled) {
    if (item.status === "fulfilled" && !("workerPrompt" in item.value)) {
      completed += 1;
      results.push(taskSummary(item.value));
    } else if (
      item.status === "rejected" &&
      !String(item.reason).includes("No matching queued task")
    ) {
      results.push({ error: String(item.reason) });
    }
  }
  return { completed, results };
}

async function runReviewWave(input: {
  repoRoot: string;
  queueRoot: string;
  actorPrefix: string;
}): Promise<Record<string, unknown>[]> {
  const candidates = (await listAgentTasks(input.queueRoot, "review")).filter(
    (task) => !task.review,
  );
  if (!candidates[0]) return [];
  try {
    const reviewed = await reviewOnce({
      repoRoot: input.repoRoot,
      queueRoot: input.queueRoot,
      id: candidates[0].id,
      actor: `${input.actorPrefix}:review`,
      execute: true,
    });
    return [
      "reviewerPrompt" in reviewed
        ? { error: "review unexpectedly returned a plan" }
        : taskSummary(reviewed),
    ];
  } catch (error) {
    return [{ error: error instanceof Error ? error.message : String(error) }];
  }
}

function printHelp(): void {
  console.log(`
Acme multi-team supervisor

Usage:
  npm.cmd run agent:supervise -- plan [--lanes web,cms] [--max-parallel 4]
  npm.cmd run agent:supervise -- run --execute [--lanes web,cms,qa]
    [--max-parallel 4] [--max-tasks 20] [--auto-review] [--watch]

The supervisor enforces per-team and global concurrency caps. Worker claims remain
atomic, so multiple supervisor processes are safe for workers. Run only one
auto-review supervisor because review claims are intentionally serialized.
`);
}

export async function run(argv = process.argv.slice(2)): Promise<void> {
  const { command, options } = parseCli(argv);
  if (command === "help" || option(options, "help") === "true") {
    printHelp();
    return;
  }
  if (!["plan", "run"].includes(command)) {
    throw new Error(`Unknown supervisor command: ${command}`);
  }

  const repoRoot = option(options, "repo")
    ? resolve(option(options, "repo")!)
    : repositoryRoot();
  const queueRoot = await sharedQueueRoot(option(options, "queue-root"));
  const runtime = await loadRuntime(repoRoot);
  const lanes = selectedLanes(runtime, option(options, "lanes"));
  const maxParallel = integerOption(options, "max-parallel", 4);

  if (command === "plan") {
    console.log(
      JSON.stringify(
        await buildSupervisorPlan({
          repoRoot,
          queueRoot,
          lanes,
          maxParallel,
        }),
        null,
        2,
      ),
    );
    return;
  }
  if (option(options, "execute") !== "true") {
    throw new Error("supervisor run requires explicit --execute");
  }

  const maxTasks = integerOption(options, "max-tasks", 20);
  const watch = option(options, "watch") === "true";
  const autoReview = option(options, "auto-review") === "true";
  const actorPrefix =
    option(options, "actor") ?? `supervisor:${hostname()}:${process.pid}`;
  let completed = 0;

  do {
    const wave = await runWorkerWave({
      repoRoot,
      queueRoot,
      runtime,
      lanes,
      maxParallel,
      remaining: maxTasks - completed,
      actorPrefix,
    });
    completed += wave.completed;
    if (wave.results.length) console.log(JSON.stringify(wave.results));

    if (autoReview) {
      const reviews = await runReviewWave({
        repoRoot,
        queueRoot,
        actorPrefix,
      });
      if (reviews.length) console.log(JSON.stringify(reviews));
    }

    if (!watch || completed >= maxTasks) break;
    if (wave.completed === 0) {
      await new Promise((resolvePromise) =>
        setTimeout(resolvePromise, runtime.queue.pollSeconds * 1000),
      );
    }
  } while (completed < maxTasks);

  console.log(JSON.stringify({ completed, maxTasks }));
}

const entry = process.argv[1] ? resolve(process.argv[1]) : "";
if (entry === fileURLToPath(import.meta.url)) {
  run().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
