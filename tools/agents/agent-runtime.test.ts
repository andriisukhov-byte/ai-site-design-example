import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import {
  chmod,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  writeFile,
} from "node:fs/promises";
import { tmpdir, platform } from "node:os";
import { join } from "node:path";
import { dispatchOnce, integrateTask, reviewOnce } from "./agent-dispatcher";
import {
  claimAgentTask,
  enqueueAgentTask,
  getAgentTask,
  sharedQueueRoot,
} from "./task-queue";

function git(args: string[], cwd: string): string {
  return execFileSync("git", args, { cwd, encoding: "utf8" }).trim();
}

const repo = await mkdtemp(join(tmpdir(), "acme-runtime-git-"));
const queue = await mkdtemp(join(tmpdir(), "acme-runtime-queue-"));
const bareRemote = await mkdtemp(join(tmpdir(), "acme-runtime-remote-"));
const fakeCodexJs = join(repo, "fake-codex.mjs");
const fakeCodexCommand =
  platform() === "win32"
    ? join(repo, "fake-codex.cmd")
    : join(repo, "fake-codex");
const fakeGithubJs = join(repo, "fake-github.mjs");
const fakeGithubLog = join(queue, "fake-github.log");
const fakeGithubCommand =
  platform() === "win32"
    ? join(repo, "fake-github.cmd")
    : join(repo, "fake-github");

try {
  await Promise.all([
    mkdir(join(repo, "ai", "agents"), { recursive: true }),
    mkdir(join(repo, "ai", "prompts"), { recursive: true }),
    mkdir(join(repo, "ai", "schemas"), { recursive: true }),
  ]);

  await writeFile(
    fakeCodexJs,
    `
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const args = process.argv.slice(2);
const valueAfter = (name) => args[args.indexOf(name) + 1];
const cwd = valueAfter("--cd");
const output = valueAfter("--output-last-message");
const schema = valueAfter("--output-schema");
let prompt = "";
process.stdin.on("data", (chunk) => { prompt += chunk.toString(); });
process.stdin.resume();
await new Promise((resolve) => process.stdin.on("end", resolve));

if (schema.includes("agent-review")) {
  writeFileSync(output, JSON.stringify({
    verdict: "approved",
    summary: "Fake reviewer approved the bounded change.",
    findings: []
  }));
} else if (schema.includes("agent-task-plan")) {
  const hierarchyTask = {
    id: "WEBTEAM-995",
    title: "Delegated Web team orchestration",
    description: "Decompose the Web lane after global approval.",
    kind: "orchestration",
    lane: "web",
    role: "web-orchestrator",
    priority: 15,
    baseBranch: "base",
    branch: "codex/agent/webteam-995-delegated",
    allowedFiles: [],
    sharedFiles: [],
    acceptance: [],
    contextFiles: [],
    dependsOn: [],
    reasoningEffort: "high",
    delivery: "report"
  };
  const implementationTask = {
    id: "WEB-992",
    title: "Delegated bounded child",
    description: "Implement one generated child slice.",
    kind: "implementation",
    lane: "web",
    role: "frontend-integration",
    priority: 20,
    baseBranch: "base",
    branch: "codex/agent/web-992-delegated",
    allowedFiles: ["delegated.txt"],
    sharedFiles: [],
    acceptance: [],
    contextFiles: [],
    dependsOn: [],
    reasoningEffort: "medium",
    delivery: "commit"
  };
  writeFileSync(output, JSON.stringify({
    status: "completed",
    blocker: null,
    summary: "Fake Web orchestrator produced one bounded child.",
    tasks: [prompt.includes("GLOBAL_HIERARCHY") ? hierarchyTask : implementationTask],
    integrationNotes: []
  }));
} else {
  if (prompt.includes("BLOCK_ME")) {
    writeFileSync(output, JSON.stringify({
      status: "blocked",
      blocker: {
        reason: "A product decision is missing.",
        question: "Which product-native field should be used?"
      },
      summary: "Waiting for a product-native field decision.",
      commit: null,
      pullRequest: null,
      changedFiles: [],
      checks: [],
      sharedChangesRequested: [],
      delegatedTaskIds: []
    }));
    process.stdout.write(JSON.stringify({
      type: "turn.completed",
      usage: { input_tokens: 90, cached_input_tokens: 60, output_tokens: 20 }
    }) + "\\n");
    process.exit(0);
  }
  const resultPath = cwd + "/result.txt";
  const previous = existsSync(resultPath) ? readFileSync(resultPath, "utf8") : "";
  writeFileSync(resultPath, previous + "fake bounded worker result\\n");
  execFileSync("git", ["add", "result.txt"], { cwd });
  execFileSync("git", ["commit", "-m", "test: fake worker result"], { cwd });
  writeFileSync(output, JSON.stringify({
    status: "completed",
    blocker: null,
    summary: "Fake worker committed the bounded result.",
    commit: null,
    pullRequest: null,
    changedFiles: ["result.txt"],
    checks: [],
    sharedChangesRequested: [],
    delegatedTaskIds: []
  }));
}

process.stdout.write(JSON.stringify({
  type: "turn.completed",
  usage: { input_tokens: 120, cached_input_tokens: 80, output_tokens: 30 }
}) + "\\n");
`,
    "utf8",
  );
  await writeFile(
    fakeGithubJs,
    `
import { appendFileSync } from "node:fs";
const args = process.argv.slice(2);
if (args[0] === "--version") {
  process.stdout.write("gh version fake\\n");
  process.exit(0);
}
appendFileSync(${JSON.stringify(fakeGithubLog)}, JSON.stringify(args) + "\\n");
if (args[0] === "pr" && args[1] === "create") {
  process.stdout.write("https://github.test/example/pull/42\\n");
}
`,
    "utf8",
  );

  if (platform() === "win32") {
    await writeFile(
      fakeCodexCommand,
      `@echo off\r\nnode "%~dp0fake-codex.mjs" %*\r\n`,
      "utf8",
    );
    await writeFile(
      fakeGithubCommand,
      `@echo off\r\nnode "%~dp0fake-github.mjs" %*\r\n`,
      "utf8",
    );
  } else {
    await writeFile(
      fakeCodexCommand,
      `#!/bin/sh\nexec node "$(dirname "$0")/fake-codex.mjs" "$@"\n`,
      "utf8",
    );
    await chmod(fakeCodexCommand, 0o755);
    await writeFile(
      fakeGithubCommand,
      `#!/bin/sh\nexec node "$(dirname "$0")/fake-github.mjs" "$@"\n`,
      "utf8",
    );
    await chmod(fakeGithubCommand, 0o755);
  }

  const runtime = {
    version: 1,
    queue: { leaseMinutes: 5, heartbeatSeconds: 1, pollSeconds: 1 },
    worktrees: { root: `${repo}-worktrees` },
    delivery: {
      githubCommand: fakeGithubCommand,
      draftPullRequests: true,
      mergeMethod: "merge",
      deleteBranchAfterMerge: true,
    },
    codex: {
      windowsCommand: fakeCodexCommand,
      unixCommand: fakeCodexCommand,
      sandbox: "workspace-write",
      ephemeral: true,
      maxContextFiles: 4,
      reviewTokenBudget: 1000,
    },
    teams: {
      global: {
        orchestratorRole: "global-orchestrator",
        workerRoles: ["web-orchestrator"],
        maxParallel: 1,
        maxDelegatedTasks: 4,
        defaultReasoningEffort: "high",
      },
      web: {
        orchestratorRole: "web-orchestrator",
        workerRoles: ["frontend-integration"],
        maxParallel: 1,
        maxDelegatedTasks: 4,
        defaultReasoningEffort: "medium",
      },
    },
  };
  await writeFile(
    join(repo, "ai", "agents", "runtime.json"),
    JSON.stringify(runtime),
  );
  await writeFile(
    join(repo, "ai", "agents", "manifest.json"),
    JSON.stringify({
      version: 1,
      roles: [
        {
          id: "global-orchestrator",
          roleFile: "ai/agents/global-orchestrator.md",
          promptFile: "ai/prompts/global-orchestrator.md",
        },
        {
          id: "web-orchestrator",
          roleFile: "ai/agents/web-orchestrator.md",
          promptFile: "ai/prompts/web-orchestrator.md",
        },
        {
          id: "frontend-integration",
          roleFile: "ai/agents/frontend-integration.md",
          promptFile: "ai/prompts/frontend-integration.md",
        },
      ],
    }),
  );
  await writeFile(
    join(repo, "ai", "agents", "global-orchestrator.md"),
    "Global orchestration test role.\n",
  );
  await writeFile(
    join(repo, "ai", "agents", "web-orchestrator.md"),
    "Web orchestration test role.\n",
  );
  await writeFile(
    join(repo, "ai", "agents", "frontend-integration.md"),
    "Bounded test role.\n",
  );
  await writeFile(
    join(repo, "ai", "prompts", "global-orchestrator.md"),
    "Plan bounded team tasks.\n",
  );
  await writeFile(
    join(repo, "ai", "prompts", "web-orchestrator.md"),
    "Plan bounded Web tasks.\n",
  );
  await writeFile(
    join(repo, "ai", "prompts", "frontend-integration.md"),
    "Implement the bounded task.\n",
  );
  await writeFile(
    join(repo, "ai", "prompts", "queue-worker.md"),
    "Queue worker test prompt.\n",
  );
  await writeFile(
    join(repo, "ai", "prompts", "queue-orchestrator.md"),
    "Queue orchestrator test prompt.\n",
  );
  await writeFile(
    join(repo, "ai", "prompts", "queue-reviewer.md"),
    "Queue reviewer test prompt.\n",
  );
  await writeFile(
    join(repo, "ai", "schemas", "agent-worker-result.schema.json"),
    "{}",
  );
  await writeFile(
    join(repo, "ai", "schemas", "agent-task-plan.schema.json"),
    "{}",
  );
  await writeFile(
    join(repo, "ai", "schemas", "agent-review.schema.json"),
    "{}",
  );
  await writeFile(join(repo, "README.md"), "runtime integration fixture\n");

  git(["init", "-b", "base"], repo);
  git(["config", "user.email", "agents@example.test"], repo);
  git(["config", "user.name", "Agent Runtime Test"], repo);
  git(["add", "."], repo);
  git(["commit", "-m", "initial runtime fixture"], repo);
  git(["init", "--bare"], bareRemote);
  git(["remote", "add", "origin", bareRemote], repo);
  git(["push", "--set-upstream", "origin", "base"], repo);

  const queueRoot = await sharedQueueRoot(queue);
  const task = await enqueueAgentTask({
    root: queueRoot,
    actor: "runtime-orchestrator",
    spec: {
      id: "WEB-990",
      title: "Hermetic runtime pipeline",
      description:
        "Exercise process, worktree, review, and integration wiring.",
      kind: "implementation",
      lane: "web",
      role: "frontend-integration",
      priority: 10,
      baseBranch: "base",
      branch: "codex/agent/web-990-runtime",
      allowedFiles: ["result.txt"],
      sharedFiles: [],
      acceptance: [`node -e "require('node:fs').accessSync('result.txt')"`],
      contextFiles: [],
      dependsOn: [],
      tokenBudget: 1000,
      reasoningEffort: "medium",
      delivery: "commit",
    },
  });

  const submitted = await dispatchOnce({
    repoRoot: repo,
    queueRoot,
    id: task.id,
    actor: "runtime-dispatcher",
    execute: true,
  });
  assert(!("workerPrompt" in submitted));
  assert.equal(submitted.status, "review");
  assert.deepEqual(submitted.result?.usage, {
    inputTokens: 120,
    cachedInputTokens: 80,
    outputTokens: 30,
  });

  const reviewed = await reviewOnce({
    repoRoot: repo,
    queueRoot,
    id: task.id,
    actor: "runtime-reviewer",
    execute: true,
  });
  assert(!("reviewerPrompt" in reviewed));
  assert.equal(reviewed.review?.verdict, "approved");

  await integrateTask({
    repoRoot: repo,
    queueRoot,
    id: task.id,
    actor: "runtime-integrator",
    execute: true,
  });
  assert.equal((await getAgentTask(queueRoot, task.id)).status, "done");
  assert.equal(
    (await readFile(join(repo, "result.txt"), "utf8")).replaceAll("\r\n", "\n"),
    "fake bounded worker result\n",
  );
  assert.equal(git(["branch", "--list", task.branch], repo), "");

  const orchestrationTask = await enqueueAgentTask({
    root: queueRoot,
    actor: "runtime-global-orchestrator",
    spec: {
      id: "WEBTEAM-991",
      title: "Hermetic Web team orchestration",
      description: "Return a structured child plan without modifying files.",
      kind: "orchestration",
      lane: "web",
      role: "web-orchestrator",
      priority: 10,
      baseBranch: "base",
      branch: "codex/agent/webteam-991-plan",
      allowedFiles: [],
      sharedFiles: [],
      acceptance: [],
      contextFiles: [],
      dependsOn: [],
      tokenBudget: 1000,
      reasoningEffort: "high",
      delivery: "report",
    },
  });
  const planned = await dispatchOnce({
    repoRoot: repo,
    queueRoot,
    id: orchestrationTask.id,
    actor: "runtime-web-orchestrator",
    execute: true,
  });
  assert(!("workerPrompt" in planned));
  assert.deepEqual(planned.result?.delegatedTaskIds, ["WEB-992"]);
  const child = await getAgentTask(queueRoot, "WEB-992");
  assert.deepEqual(child.dependsOn, [orchestrationTask.id]);
  await assert.rejects(
    claimAgentTask({
      root: queueRoot,
      actor: "premature-worker",
      id: child.id,
    }),
    /unfinished dependencies/,
  );

  await reviewOnce({
    repoRoot: repo,
    queueRoot,
    id: orchestrationTask.id,
    actor: "runtime-plan-reviewer",
    execute: true,
  });
  await integrateTask({
    repoRoot: repo,
    queueRoot,
    id: orchestrationTask.id,
    actor: "runtime-plan-integrator",
    execute: true,
  });
  const releasedChild = await claimAgentTask({
    root: queueRoot,
    actor: "released-worker",
    id: child.id,
  });
  assert.equal(releasedChild.status, "claimed");

  const pullRequestTask = await enqueueAgentTask({
    root: queueRoot,
    actor: "runtime-global-orchestrator",
    spec: {
      id: "WEB-993",
      title: "Hermetic pull request delivery",
      description:
        "Exercise push, draft PR, review, merge, and branch cleanup.",
      kind: "implementation",
      lane: "web",
      role: "frontend-integration",
      priority: 10,
      baseBranch: "base",
      branch: "codex/agent/web-993-pull-request",
      allowedFiles: ["result.txt"],
      sharedFiles: [],
      acceptance: [],
      contextFiles: [],
      dependsOn: [],
      tokenBudget: 1000,
      reasoningEffort: "medium",
      delivery: "pull-request",
    },
  });
  const pullRequestSubmitted = await dispatchOnce({
    repoRoot: repo,
    queueRoot,
    id: pullRequestTask.id,
    actor: "runtime-pr-worker",
    execute: true,
  });
  assert(!("workerPrompt" in pullRequestSubmitted));
  assert.equal(
    pullRequestSubmitted.result?.pullRequest,
    "https://github.test/example/pull/42",
  );
  await reviewOnce({
    repoRoot: repo,
    queueRoot,
    id: pullRequestTask.id,
    actor: "runtime-pr-reviewer",
    execute: true,
  });
  await integrateTask({
    repoRoot: repo,
    queueRoot,
    id: pullRequestTask.id,
    actor: "runtime-pr-integrator",
    execute: true,
  });
  assert.equal(
    (await getAgentTask(queueRoot, pullRequestTask.id)).status,
    "done",
  );
  assert.equal(git(["branch", "--list", pullRequestTask.branch], repo), "");
  const githubCalls = (await readFile(fakeGithubLog, "utf8"))
    .trim()
    .split(/\r?\n/)
    .map((line) => JSON.parse(line) as string[]);
  assert(githubCalls.some((args) => args[1] === "create"));
  assert(githubCalls.some((args) => args[1] === "ready"));
  assert(githubCalls.some((args) => args[1] === "merge"));

  const clarificationTask = await enqueueAgentTask({
    root: queueRoot,
    actor: "runtime-global-orchestrator",
    spec: {
      id: "WEB-994",
      title: "Hermetic clarification handoff",
      description: "BLOCK_ME and return one actionable question.",
      kind: "implementation",
      lane: "web",
      role: "frontend-integration",
      priority: 10,
      baseBranch: "base",
      branch: "codex/agent/web-994-clarification",
      allowedFiles: ["clarification.txt"],
      sharedFiles: [],
      acceptance: [],
      contextFiles: [],
      dependsOn: [],
      tokenBudget: 1000,
      reasoningEffort: "medium",
      delivery: "commit",
    },
  });
  const blocked = await dispatchOnce({
    repoRoot: repo,
    queueRoot,
    id: clarificationTask.id,
    actor: "runtime-blocked-worker",
    execute: true,
  });
  assert(!("workerPrompt" in blocked));
  assert.equal(blocked.status, "blocked");
  assert.equal(
    blocked.blocker?.question,
    "Which product-native field should be used?",
  );
  assert.deepEqual(blocked.blocker?.usage, {
    inputTokens: 90,
    cachedInputTokens: 60,
    outputTokens: 20,
  });

  const globalTask = await enqueueAgentTask({
    root: queueRoot,
    actor: "runtime-main",
    spec: {
      id: "GLOBAL-996",
      title: "Hermetic global hierarchy",
      description: "GLOBAL_HIERARCHY into a Web orchestration task.",
      kind: "orchestration",
      lane: "global",
      role: "global-orchestrator",
      priority: 5,
      baseBranch: "base",
      branch: "codex/agent/global-996-hierarchy",
      allowedFiles: [],
      sharedFiles: [],
      acceptance: [],
      contextFiles: [],
      dependsOn: [],
      tokenBudget: 1000,
      reasoningEffort: "high",
      delivery: "report",
    },
  });
  const globalPlan = await dispatchOnce({
    repoRoot: repo,
    queueRoot,
    id: globalTask.id,
    actor: "runtime-global-worker",
    execute: true,
  });
  assert(!("workerPrompt" in globalPlan));
  const delegatedTeam = await getAgentTask(queueRoot, "WEBTEAM-995");
  assert.equal(delegatedTeam.kind, "orchestration");
  assert.deepEqual(delegatedTeam.dependsOn, [globalTask.id]);
  await reviewOnce({
    repoRoot: repo,
    queueRoot,
    id: globalTask.id,
    actor: "runtime-global-reviewer",
    execute: true,
  });
  await integrateTask({
    repoRoot: repo,
    queueRoot,
    id: globalTask.id,
    actor: "runtime-global-integrator",
    execute: true,
  });
  assert.equal(
    (
      await claimAgentTask({
        root: queueRoot,
        actor: "runtime-web-team",
        id: delegatedTeam.id,
      })
    ).status,
    "claimed",
  );
} finally {
  await rm(queue, { recursive: true, force: true });
  await rm(repo, { recursive: true, force: true });
  await rm(`${repo}-worktrees`, { recursive: true, force: true });
  await rm(bareRemote, { recursive: true, force: true });
}

console.log("agent hermetic runtime integration test passed");
