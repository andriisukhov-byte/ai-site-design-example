# Source Block Migration Workflow

This workflow is optimized for parallel agents while keeping the final commit source-first and reviewable.

## Roles

- Orchestrator: owns branch state, commits, shared schema decisions, and final QA.
- Block Porter: ports one isolated source block.
- CMS Mapper: reviews Payload fields and importer mapping.
- Visual QA: compares representative pages and reports block-level mismatches.
- Code Reviewer: checks fidelity, CSS hygiene, hotlinks, and WordPress leakage.

## Run From Scratch

1. Confirm the working branch and dirty state:

```bash
git status --short
git branch --show-current
```

2. Start required services:

```bash
npm run dev:cms
npm run dev:web
```

3. Select the next block by route priority or fallback counts from `data/source/sanitized-content.json`.
4. Read `ai/workflows/source-lane.md` before touching source evidence.
5. Assign a Block Porter with `ai/prompts/block-porter.md` or `ai/prompts/source-block-port.md`.
6. Assign CMS Mapper and Code Reviewer as read-only sidecars when shared schema changes are involved.
7. Run migration commands after schema/importer changes:

```bash
npm --workspace @acme/cms run generate:types
npm run migrate:source:export
npm run migrate:source:upsert -- --write true
npm run cms:export
```

8. Run QA:

```bash
npm run typecheck
npm --workspace @acme/web run build
npm run qa:no-hotlinks
npm run qa:no-inline-block-styles
npm run qa:block-dom -- --base http://127.0.0.1:4321 --route /route/ --selector .block --expected-class block
```

9. Fill the evidence template from `ai/checklists/migration-evidence.md`.
10. Commit the block as a focused migration commit.

## Lane Pattern

1. Orchestrator selects the next source block from fallback counts or route priority.
2. Block Porter migrates the block in an isolated write scope.
3. CMS Mapper checks product-native fields and import/export behavior.
4. Orchestrator integrates changes and runs typecheck/build.
5. Visual QA checks representative routes in a batch.
6. Code Reviewer reviews the resulting diff.
7. Orchestrator fixes blockers and commits the block.

## Parallel Work Rules

- Multiple Block Porters can run at the same time only when their write scopes do not overlap.
- Do not assign two agents to edit shared files simultaneously unless one is read-only.
- Shared files are integrated by the Orchestrator:
  - `packages/blocks/src/schemas.ts`
  - `packages/blocks/src/registry.ts`
  - `apps/cms/src/collections/RoutableContent.ts`
  - `tools/migrate/block-transform.ts`
  - `apps/web/src/components/BlockRenderer.astro`
  - `ai/instructions/page-compose.md`
  - `ai/contracts/source-block-porting.md`
- Use parallel read-only analysis for source files, route coverage, and visual QA while the Orchestrator edits shared code when those tasks do not block the next local integration step.

## Shared Changes And Recertification

The Orchestrator integrates shared files after isolated block work:

- `packages/blocks/src/schemas.ts`
- `packages/blocks/src/registry.ts`
- `apps/cms/src/collections/RoutableContent.ts`
- `tools/migrate/block-transform.ts`
- `apps/web/src/components/BlockRenderer.astro`
- `ai/instructions/page-compose.md`
- `ai/contracts/source-block-porting.md`

When shared rendering, formatting, foundation styles, layout, media resolution, or block schemas change, recertify representative routes affected by that shared change. Do not rely on an old screenshot or old build after shared files change.

Conflict ownership:

- schema conflicts: Orchestrator plus CMS Mapper;
- renderer/style conflicts: Orchestrator plus Block Porter;
- visual mismatches: Visual QA reports, Orchestrator assigns fixes;
- policy conflicts: Code Reviewer blocks commit until resolved or recorded.

## Failure And Handoff

If blocked, write the blocker to `docs/migration/open-questions.md` with:

- route/block;
- source file or data path;
- what was attempted;
- why it is blocked;
- proposed owner decision.

Common blockers:

- missing source asset;
- source field has multiple incompatible shapes;
- visual mismatch needs human design decision;
- route depends on an unmigrated shared block;
- Payload schema would force a product decision.

Handoff artifacts:

- changed files;
- commands run;
- failed command output summary;
- route(s) needing visual review;
- unresolved gaps added to `docs/migration/open-questions.md`.

## Commit Rules

- Commit each migrated block separately.
- Commit shared tooling/policy separately when it is not specific to a block.
- Do not bundle many blocks into one commit.
- Do not commit secrets, production credentials, raw private dumps, or temporary generated scripts.
