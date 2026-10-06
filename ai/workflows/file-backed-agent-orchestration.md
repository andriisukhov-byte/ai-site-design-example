# File-Backed Multi-Team Orchestration

Use this workflow for durable Web, CMS, migration, QA, and review work that should survive context
compaction or run across isolated Codex processes.

## Components

- Queue lifecycle: `tools/agents/task-queue.ts`
- Worker/reviewer/integration dispatcher: `tools/agents/agent-dispatcher.ts`
- Fair multi-team scheduler: `tools/agents/team-supervisor.ts`
- Team concurrency and runtime policy: `ai/agents/runtime.json`
- Roles and prompts: `ai/agents/manifest.json`
- Task contract: `ai/contracts/agent-task-queue.md`

Runtime state lives in `.git/agent-tasks`; worker checkouts live in the configured sibling worktree
directory. Root `node_modules` is shared into worktrees through a directory link when available.

## Bootstrap

```powershell
npm.cmd run agent:tasks -- init
npm.cmd run agent:supervise -- plan
```

The plan command is read-only. It reports queued tasks, review backlog, team limits, and the global
parallel cap.

## Enqueue

Start from `ai/examples/agent-task.web.json` for one bounded worker,
`ai/examples/agent-task.web-team.json` for a lane-orchestrator decomposition, or
`ai/examples/agent-task.global.json` for a coordinated global → Web/CMS team hierarchy.

```powershell
npm.cmd run agent:tasks -- enqueue --spec ai/examples/agent-task.web.json
npm.cmd run agent:tasks -- list
npm.cmd run agent:dispatch -- plan --id WEB-042
```

Do not use broad write scopes. List shared integration files separately and assign their final
changes to one dependency-gated integration task.

## Execute

One task:

```powershell
npm.cmd run agent:dispatch -- run --id WEB-042 --execute
```

Bounded multi-team wave:

```powershell
npm.cmd run agent:supervise -- run --execute --lanes global,web,cms,qa --max-parallel 4 --max-tasks 20
```

Continuous polling:

```powershell
npm.cmd run agent:supervise -- run --execute --watch --auto-review --max-parallel 4
```

Worker claims are atomic, but use only one `--auto-review` supervisor because review execution is
serialized by policy rather than a second queue lease.

## Review and Integration

Generate or refresh the read-only verdict:

```powershell
npm.cmd run agent:dispatch -- review --id WEB-042
npm.cmd run agent:dispatch -- review --id WEB-042 --execute
```

Inspect the task:

```powershell
npm.cmd run agent:tasks -- show --id WEB-042
```

For `changes-required`, requeue with the finding summary:

```powershell
npm.cmd run agent:tasks -- requeue --id WEB-042 --actor global-orchestrator --reason "Address review findings"
```

For `approved`, preview and execute integration:

```powershell
npm.cmd run agent:dispatch -- integrate --id WEB-042
npm.cmd run agent:dispatch -- integrate --id WEB-042 --execute
```

`commit` delivery merges locally and requires a clean base checkout. `pull-request` delivery uses
authenticated GitHub CLI to move the draft PR to ready, merge it with the configured method, and
delete the remote/local worker branch.

## Recovery

```powershell
npm.cmd run agent:tasks -- sweep --actor dispatcher
npm.cmd run agent:tasks -- list --status blocked
npm.cmd run agent:tasks -- requeue --id WEB-042 --actor global-orchestrator --reason "Recovered input supplied"
```

`sweep` returns expired worker leases to `queued`. Short per-task filesystem locks recover
automatically after a crashed process. Worktrees and commits are deliberately retained for blocked
tasks so diagnosis and retry do not lose evidence.

After the retention window:

```powershell
npm.cmd run agent:tasks -- purge --older-than-days 14 --yes
```

## Token-Efficiency Rules

- Orchestration agents produce plans only; workers implement bounded slices.
- Reference context by path; never inline repository documents into the queue.
- Keep `contextFiles` directly relevant and below the configured maximum.
- Use low reasoning for deterministic QA, medium for bounded coding, and high only for ambiguity,
  orchestration, integration judgment, and final review.
- Use dependencies instead of repeating upstream context in downstream task descriptions.
- Keep worker output structured and compact; durable details belong in commits and evidence files.
- Purge completed runtime tasks after their Git/PR evidence is durable.

## Prerequisites and Safety

- `codex.cmd exec` on Windows or `codex exec` on Unix must be authenticated.
- `pull-request` delivery additionally requires authenticated `gh`.
- Acceptance commands are executable shell input and may only come from a trusted orchestrator.
- Never use `--execute` on an unreviewed task specification.
- The SQL dump and production secrets must never be placed in a task, prompt, output, or queue file.
