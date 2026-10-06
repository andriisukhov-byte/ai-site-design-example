# Agent Task Queue Contract

The queue is a durable coordination protocol between the global orchestrator, lane orchestrators,
workers, QA, and reviewers. It does not replace the role, migration, or source-fidelity contracts
under `ai/`.

## Storage

Runtime task files live under the repository's shared Git directory:

```text
.git/agent-tasks/
  queued/
  claimed/
  review/
  blocked/
  done/
  locks/
```

`git rev-parse --git-common-dir` resolves the same directory from the primary checkout and every
linked worktree. Runtime task state is intentionally not committed. Durable implementation evidence
still belongs in Git commits, pull requests, `docs/migration/open-questions.md`, and
`docs/migration/open-questions.md`.

Use `ACME_TASK_QUEUE_ROOT` or `--root` only for tests or an explicitly shared external queue.

## Ownership

- The global orchestrator enqueues top-level tasks and integrates reviewed work.
- A Web or CMS orchestration task may return a structured child-task plan. The dispatcher validates
  and enqueues the children; the orchestrator process never writes the queue directly.
- A lane orchestrator or worker claims one task with an owner id and a finite lease.
- Only the current owner may heartbeat, submit, or block a claimed task.
- A reviewer records `approved` or `changes-required`; it cannot merge or accept its own result.
- Integration requires an approved review. Bypass requires an explicit flag and recorded reason.
- Shared integration files remain orchestrator-owned unless the task explicitly grants write access.
- A worker may commit and push its branch, but must not merge its own pull request or delete its
  branch.

## State Machine

```text
queued -> claimed -> review -> done
             |          |
             v          v
          blocked     queued
             |
             v
           queued
```

Expired `claimed` leases return to `queued` through `sweep`. Task transitions and updates use a
per-task atomic lock. Claiming is therefore safe when several dispatchers poll the same queue.

Dependencies are release gates: a queued task is claimable only after every `dependsOn` task is
`done`. Delegated children automatically depend on their orchestration parent, so no generated plan
runs before the parent plan is reviewed and accepted.

## Required Task Fields

A task must define:

- stable id such as `WEB-042`;
- title, description, task kind, lane, and agent role;
- base branch and unique worker branch;
- allowed write scope;
- orchestrator-owned shared files;
- deterministic acceptance commands.
- explicit context files and dependencies;
- reasoning effort, optional token budget, and delivery mode.

Every worker result must define:

- compact summary;
- changed files;
- checks with `passed`, `failed`, or `skipped`;
- commit and pull request when available;
- requested shared-file integration;
- delegated child ids for orchestration tasks;
- measured input, cached-input, and output token usage;
- blockers through the separate `block` transition.

## Context Discipline

Dispatchers should use the compact `list` output and load only the claimed task. Workers read the
task, the named role/prompt, `AGENTS.md`, and directly relevant contracts. They must not load all
completed tasks into context.

`contextFiles` is capped by runtime configuration. Prompts contain file references instead of file
contents, deterministic work defaults to low/medium reasoning, sessions are ephemeral, and
effective token usage is computed as non-cached input plus output. Exceeding a task's soft budget
blocks acceptance instead of silently normalizing higher cost.

Completed task files may be purged after their retention window because the accepted commit, pull
request, and repository evidence are the durable audit trail. Purge always requires `--yes`.

## Execution Boundary

A task file by itself does not launch an agent. `agent:dispatch` and `agent:supervise` are the
explicit execution boundary:

- dispatcher claims atomically, creates or resumes an isolated worktree, and maintains heartbeat;
- the worker runs under the configured Codex sandbox and structured output schema;
- dispatcher independently verifies changed-file scope, clean commit state, acceptance commands,
  and token usage;
- reviewer runs read-only and records a structured verdict;
- integrator merges only approved work and then removes the task worktree and branch;
- GitHub delivery creates a draft PR and merges/deletes it through authenticated `gh`;
- every mutating dispatcher, supervisor, review, and integration operation requires `--execute`.

Local integration additionally requires the primary checkout to be clean and checked out on the
task's exact base branch. A merge conflict is aborted and the task remains recoverable.
