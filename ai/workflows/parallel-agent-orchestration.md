# Parallel Agent Orchestration

Use this workflow when migrating several source blocks or templates at once.

## Non-Negotiable Contract

Every agent ports source evidence. No agent may redesign, merge blocks, rewrite SCSS into component CSS, invent assets, change shared foundations, change QA thresholds, or hide blockers in chat.

If a block cannot be ported faithfully because data/media/source evidence is missing, the agent keeps the closest source DOM/style contract and records the blocker in `docs/migration/open-questions.md`.

## Roles Per Batch

- One orchestrator owns shared files, the integration branch, final decisions, and conflict resolution.
- Queue workers own commits only on their isolated `codex/agent/...` task branches.
- Up to five block porters work on disjoint source blocks.
- One code reviewer reviews finished diffs for source-fidelity and scope creep.
- One visual QA agent reviews representative pages after integration, not every icon or tiny state.
- One CMS mapper reviews schema/import shape when several blocks add editor fields.

## Model Routing

Follow `ai/contracts/model-routing.md`. Keep the strongest available model in the orchestrator role. Use the most cost-efficient capable worker model for bounded coding, mechanical mappings, deterministic checks, screenshot capture, and structured QA. Escalate only ambiguous source interpretation, shared integration conflicts, difficult visual diagnosis, or repeated worker failure.

## Porter Assignment Template

Assign exactly one source block per porter unless the blocks share one source folder.

Required prompt fields:

- source block name;
- source files or in-repo pinned evidence to read;
- allowed write scope;
- routes where the block appears;
- validation commands expected;
- whether the agent may change shared schema/import files.

In a shared in-chat worktree, the porter must not commit; the orchestrator commits after review. In
the file-backed queue workflow, the porter must commit only its allowed slice on its isolated task
branch. The global orchestrator reviews and integrates that commit.

## Safe Parallel Slices

Good parallel slices:

- independent block renderers and SCSS files;
- independent block-local assets;
- read-only QA/review;
- CMS mapping review after the schema draft exists.

Do not parallelize two writers into the same shared file unless the orchestrator plans to integrate patches manually:

- `packages/blocks/src/schemas.ts`
- `packages/blocks/src/registry.ts`
- `apps/cms/src/collections/RoutableContent.ts`
- `tools/migrate/block-transform.ts`
- `apps/web/src/components/BlockRenderer.astro`
- `ai/instructions/page-compose.md`
- `ai/contracts/source-block-porting.md`

For those shared files, each porter should report the desired changes. The orchestrator applies them in one reviewed integration pass.

## Review Gate

Before accepting or integrating a block commit, the orchestrator checks:

- source files were read;
- source class names and DOM order are preserved;
- SCSS lives in `apps/web/src/styles/blocks/`;
- no `<style>` or inline `style=` was added to Astro/TSX renderers;
- no fallback media/content was invented;
- importer mapping is isolated to `tools/migrate/`;
- AI block guidance was updated;
- validation result is recorded in `docs/migration/open-questions.md`;
- unresolved gaps are recorded in `docs/migration/open-questions.md`.

## Batch Completion

At the end of a batch, run shared validation:

```bash
npm run migrate:source:export
npm --workspace @acme/cms run generate:types
npm --workspace @acme/web run typecheck
npm --workspace @acme/web run build
npm run qa:no-inline-block-styles
npm run qa:no-hotlinks
npm run qa:media
```

Use `npm.cmd` instead of `npm` on Windows PowerShell.
