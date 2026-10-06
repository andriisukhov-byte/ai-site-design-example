# Acme AI Operations

This folder makes the migration workflow visible in the repository. Runtime Codex subagents are not persisted by the app, so agent roles, prompts, checklists, and orchestration rules live here.

Use this layer for:

- assigning the same block-migration task to multiple agents without rewriting the prompt;
- keeping source-first migration rules out of chat history;
- making CMS mapping, AI page composition, QA, and review requirements auditable;
- recording reusable decisions that should survive context compaction.

For durable multi-agent handoff outside a single chat context, use the file-backed queue contract in
`ai/contracts/agent-task-queue.md`, the operational workflow in
`ai/workflows/file-backed-agent-orchestration.md`, and the `agent:tasks`, `agent:dispatch`, and
`agent:supervise` commands.

Primary workflow:

1. For any blocks-migration task, start with `ai/workflows/blocks-migration-session-start.md`.
2. Read `ai/teams/orchestrator.md`.
3. Pick the local team: `ai/teams/web-ui.md` or `ai/teams/cms.md`.
4. Read `ai/workflows/source-block-migration.md`.
5. For parallel work, read `ai/workflows/parallel-agent-orchestration.md`.
6. Assign agents from `ai/agents/manifest.json`.
7. Use reusable prompts from `ai/prompts/`.
8. Validate work with `ai/checklists/source-block-review.md`.
9. Update `ai/contracts/block-contracts.md`, `ai/contracts/block-storybook.md`, and `ai/contracts/source-block-porting.md` for every migrated block.
10. Apply `ai/contracts/model-routing.md`: cost-efficient workers implement bounded slices; the primary orchestrator controls integration and quality.

For net-new product-native landing, industry, and use-case pages, use
`ai/workflows/automatic-page-creation.md`. It defines the brief, composition,
approval, Payload import, navigation, and QA gates.

Team setup:

- `ai/docs/team-workflow.md` explains how any teammate can run the same process in their AI client.
- `ai/agents/manifest.json` lists repo-owned roles and prompt files.
- `ai/teams/` defines the global, Web/UI, and CMS team operating model.
- `.codex/skills/source-block-port/SKILL.md` is only a thin Codex adapter that points back into `ai/`.

Do not place secrets, WordPress credentials, API tokens, or production-only endpoints in this folder.
