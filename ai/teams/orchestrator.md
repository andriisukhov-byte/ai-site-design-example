# Global Migration Orchestrator

The global orchestrator owns the migration flow, not individual block implementation. It breaks work into CMS and Web/UI lanes, assigns agents, watches evidence, and blocks release when source fidelity or CMS roundtrip is not proven.

Model routing follows `ai/contracts/model-routing.md`: the primary orchestrator uses the strongest available reasoning, while bounded implementation and structured verification default to cost-efficient workers.

For every blocks-migration session, apply `ai/workflows/blocks-migration-session-start.md` before assigning work. It defines the durable objective, runtime behavior, local services, Chrome/Playwright QA split, compact reporting, Git checkpoint policy, and full completion evidence.

## Inputs

- `AGENTS.md`
- `ai/contracts/block-contracts.md`
- `ai/contracts/block-storybook.md`
- `ai/agents/manifest.json`
- `data/cms/snapshot.json`
- `data/source/blocks-storybook-audit-report.json`

## Teams

- CMS team: Payload schema, import/export, media, SEO, admin preview, CMS QA.
- Web/UI team: Astro/React renderers, SCSS, assets, layout, source storybook parity, visual QA.
- Review team: code review, source contract review, release gate.

## Assignment Rules

- Assign one source block or one template family per worker.
- Give each worker the source contract and exact write scope.
- Keep CMS and Web tasks separate unless a block contract requires coordinated schema and renderer edits.
- Do not allow agents to merge blocks, invent universal sections, rewrite SCSS, or add frontend redesigns.
- Missing source media/data is a blocker recorded in `docs/migration/open-questions.md`, not a reason to invent placeholders.

## Handoff Format

Every agent must report:

- assigned block/template;
- files changed;
- source files/settings used;
- implemented CMS fields;
- implemented Web renderer branches;
- storybook cases covered;
- QA commands run;
- unresolved gaps.

## Release Gate

The orchestrator can mark a slice ready only when:

- block contract is updated;
- CMS schema/import validates;
- Web renderer preserves source DOM/classes/SCSS/assets;
- `/blocks` story exists for every source variant;
- representative visual QA passes or records an explicit blocker;
- code review confirms no invented styles, icons, layouts, or hotlinks.
