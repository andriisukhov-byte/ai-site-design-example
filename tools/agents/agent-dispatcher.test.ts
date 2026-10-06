import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  dispatchOnce,
  integrateTask,
  prepareWorktree,
  reviewOnce,
} from "./agent-dispatcher";
import {
  claimAgentTask,
  enqueueAgentTask,
  getAgentTask,
  recordAgentTaskReview,
  submitAgentTask,
} from "./task-queue";
import { buildSupervisorPlan } from "./team-supervisor";

function git(args: string[], cwd: string): string {
  return execFileSync("git", args, { cwd, encoding: "utf8" }).trim();
}

const repoRoot = git(["rev-parse", "--show-toplevel"], process.cwd());
const baseBranch = git(["branch", "--show-current"], repoRoot);
const queueRoot = await mkdtemp(join(tmpdir(), "acme-dispatch-queue-"));
const temporaryRepo = await mkdtemp(join(tmpdir(), "acme-dispatch-git-"));
const temporaryWorktrees = `${temporaryRepo}-worktrees`;

try {
  const plannedTask = await enqueueAgentTask({
    root: queueRoot,
    actor: "test-orchestrator",
    spec: {
      id: "WEB-901",
      title: "Dispatcher plan smoke test",
      description:
        "Verify compact prompt and team routing without launching Codex.",
      kind: "implementation",
      lane: "web",
      role: "frontend-integration",
      priority: 50,
      baseBranch,
      branch: "codex/agent/web-901-dispatcher-plan",
      allowedFiles: ["apps/web/src/components/example.ts"],
      sharedFiles: ["packages/blocks/src/registry.ts"],
      acceptance: ["npm.cmd --workspace @acme/web run typecheck"],
      contextFiles: ["ai/contracts/agent-task-queue.md"],
      dependsOn: [],
      tokenBudget: 5000,
      reasoningEffort: "medium",
      delivery: "commit",
    },
  });
  const plan = await dispatchOnce({
    repoRoot,
    queueRoot,
    id: plannedTask.id,
    actor: "test-dispatcher",
    execute: false,
  });
  assert("workerPrompt" in plan);
  assert.match(plan.workerPrompt, /Allowed write scope/);
  assert.match(plan.workerPrompt, /apps\/web\/src\/components\/example\.ts/);
  assert.equal(plan.task.role, "frontend-integration");
  assert(plan.command.includes("--output-schema"));
  const supervisorPlan = await buildSupervisorPlan({
    repoRoot,
    queueRoot,
    lanes: ["web", "cms"],
    maxParallel: 3,
  });
  assert.equal(supervisorPlan.globalParallelCap, 3);

  git(["init", "-b", "base"], temporaryRepo);
  git(["config", "user.email", "agents@example.test"], temporaryRepo);
  git(["config", "user.name", "Agent Test"], temporaryRepo);
  await writeFile(
    join(temporaryRepo, "README.md"),
    "dispatcher worktree test\n",
  );
  git(["add", "README.md"], temporaryRepo);
  git(["commit", "-m", "initial"], temporaryRepo);

  const worktreeTask = await enqueueAgentTask({
    root: queueRoot,
    actor: "test-orchestrator",
    spec: {
      id: "WEB-902",
      title: "Worktree integration smoke test",
      description: "Commit one isolated README change.",
      kind: "implementation",
      lane: "web",
      role: "frontend-integration",
      priority: 50,
      baseBranch: "base",
      branch: "codex/agent/web-902-worktree",
      allowedFiles: ["README.md"],
      sharedFiles: [],
      acceptance: [],
      contextFiles: [],
      dependsOn: [],
      tokenBudget: 5000,
      reasoningEffort: "medium",
      delivery: "commit",
    },
  });
  const worktreePath = await prepareWorktree({
    repoRoot: temporaryRepo,
    worktreeRoot: temporaryWorktrees,
    task: worktreeTask,
    create: true,
  });
  assert.equal(
    git(["branch", "--show-current"], worktreePath),
    worktreeTask.branch,
  );
  assert.equal(
    await prepareWorktree({
      repoRoot: temporaryRepo,
      worktreeRoot: temporaryWorktrees,
      task: worktreeTask,
      create: true,
    }),
    worktreePath,
  );
  await writeFile(
    join(worktreePath, "README.md"),
    "dispatcher worktree test\nisolated agent change\n",
  );
  git(["add", "README.md"], worktreePath);
  git(["commit", "-m", "test: isolated agent change"], worktreePath);

  await claimAgentTask({
    root: queueRoot,
    actor: "test-worker",
    id: worktreeTask.id,
  });
  await submitAgentTask({
    root: queueRoot,
    actor: "test-worker",
    id: worktreeTask.id,
    result: {
      summary: "Committed isolated README change.",
      commit: git(["rev-parse", "HEAD"], worktreePath),
      changedFiles: ["README.md"],
      checks: [],
      sharedChangesRequested: [],
      delegatedTaskIds: [],
    },
  });
  await assert.rejects(
    reviewOnce({
      repoRoot,
      queueRoot,
      id: plannedTask.id,
      actor: "test-reviewer",
      execute: false,
    }),
    /expected review/,
  );

  await recordAgentTaskReview({
    root: queueRoot,
    actor: "test-reviewer",
    id: worktreeTask.id,
    review: {
      verdict: "approved",
      summary: "Isolated change is valid.",
      findings: [],
    },
  });
  await integrateTask({
    repoRoot: temporaryRepo,
    queueRoot,
    id: worktreeTask.id,
    actor: "test-integrator",
    execute: true,
  });
  assert.match(
    await readFile(join(temporaryRepo, "README.md"), "utf8"),
    /isolated agent change/,
  );
  assert.equal((await getAgentTask(queueRoot, worktreeTask.id)).status, "done");
  assert.equal(
    git(["branch", "--list", worktreeTask.branch], temporaryRepo),
    "",
  );
} finally {
  await rm(queueRoot, { recursive: true, force: true });
  await rm(temporaryRepo, { recursive: true, force: true });
  await rm(temporaryWorktrees, { recursive: true, force: true });
}

console.log("agent dispatcher integration test passed");
