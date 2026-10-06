# Team AI Workflow

The migration AI workflow is part of the repository, not private chat history. Every teammate should be able to run the same block migration, CMS mapping, QA, and review process in their preferred AI client.

## Page Authoring Lane

Page generation uses only `@acme/blocks`, `packages/blocks/src/schemas.ts`, `packages/blocks/src/registry.ts`, `ai/instructions/page-compose.md`, and product-native Payload fields.

For an end-to-end future page batch, follow
`ai/workflows/automatic-page-creation.md`. It keeps AI composition automated
while requiring explicit content-owner approval before a write or publication.

Do not inspect, emit, or ask page-generation agents to use WordPress, ACF, Gutenberg, PHP, shortcode, REST, source-folder, or legacy field names. Source-porting documentation is for migration tasks only.

Required context for a page authoring agent:

- `ai/README.md`
- `ai/instructions/page-compose.md`
- `ai/checklists/page-generation-review.md`
- `packages/blocks/src/schemas.ts`
- `packages/blocks/src/registry.ts`
- `docs/migration/open-questions.md`

## Quick Start

1. Start from `ai/README.md`.
2. Pick the role file from `ai/agents/`.
3. Give the agent the relevant prompt from `ai/prompts/`.
4. Require the checklist in `ai/checklists/source-block-review.md` before commit.
5. Require the evidence record in `ai/checklists/migration-evidence.md` before certification.
6. Run the QA scripts from `package.json`.

A checklist item may not be waived because it is inconvenient or because source evidence is missing. Missing visual evidence blocks certification.

For multi-agent batches, the orchestrator must also use `ai/workflows/parallel-agent-orchestration.md`. Give each porter one block and a disjoint write scope. Shared schema/import/registry files are integrated by the orchestrator after worker reports, not edited blindly by several agents at once.

For durable process-level execution with isolated branches/worktrees, dependencies, leases, team
routing, structured review, and token accounting, also use
`ai/workflows/file-backed-agent-orchestration.md`.

## Required Context For Any AI Client

Attach or reference these files for source-block work:

- `ai/skills/source-block-port.md`
- `ai/contracts/block-contracts.md`
- `ai/contracts/block-storybook.md`
- `ai/agents/block-porter.md`
- `ai/prompts/block-porter.md`
- `ai/checklists/source-block-review.md`
- `ai/checklists/migration-evidence.md`
- `ai/workflows/source-lane.md`
- `ai/workflows/source-block-migration.md`
- `ai/contracts/source-block-porting.md`
- `ai/instructions/page-compose.md`

For review-only work, use:

- `ai/agents/code-reviewer.md`
- `ai/agents/visual-qa.md`
- `ai/checklists/source-block-review.md`

## Shared Commands

```bash
npm run migrate:source:export
npm run migrate:source:upsert -- --write true
npm run cms:snapshot
npm run typecheck
npm --workspace @acme/web run build
npm run qa:no-hotlinks
npm run qa:page-contract
npm run qa:media
npm run qa:no-inline-block-styles
npm run qa:block-dom -- --base http://127.0.0.1:4321 --route /route/ --selector .source-block --expected-class source-block
npm run qa:visual -- --target-base http://127.0.0.1:4321 --source-base https://dev.acme.example --routes /route/
```

Use `npm.cmd` instead of `npm` on Windows PowerShell when needed.

## MCP

Use `ai/docs/mcp.md` for Payload and Astro MCP setup. MCP is optional for reading these repo instructions, but useful for CMS edits and current Astro documentation.

## CSS Policy

SCSS remains the authoritative block stylesheet under `apps/web/src/styles/blocks/`. Astro/TSX renderers may import it, but agents must not translate, simplify, normalize, or reproduce its rules in CSS, `<style>`, inline attributes, CSS modules, or utility classes.

`npm run qa:no-inline-block-styles` enforces this for source-first block renderers.

## Git Policy

- Commit each migrated block separately as a focused diff.
- Commit AI workflow/tooling separately from block migrations.
- Do not include unrelated shared-file edits, refactors, formatting churn, block consolidation, or cleanup.
- Before commit, compare the changed-file list against the block porter allowlist and fail review on any unapproved path.
- Do not hide TODOs in chat; write unresolved decisions to `docs/migration/open-questions.md`.
