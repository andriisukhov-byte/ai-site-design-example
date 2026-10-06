# Acme Migration Entry Point

This file is intentionally thin. The full AI workflow, agent roles, contracts, prompts, and MCP notes live under `ai/`.

## Read First

- For designing or generating marketing pages and for growing new design blocks, start with `ACME-WEBSITE-DESIGN-WORKFLOW.md`. It covers the two skills, the research and review agents, the block registration checklist, and the traps.
- Start with `ai/README.md`.
- For blocks migration, visual parity, or showcase QA, immediately apply `ai/workflows/blocks-migration-session-start.md`.
- Use `ai/agents/manifest.json` for available agent roles and team structure.
- Use `ai/contracts/` for block contracts, storybook parity, and source-block porting rules.
- Use `docs/migration/open-questions.md` for unresolved decisions and blockers.

## Hard Rules

- Never read from or write to `memory.md`.
- Do not redesign, merge, or normalize migrated source blocks.
- Keep source SCSS as SCSS in `apps/web/src/styles/blocks/`; no inline styles or component `<style>` blocks for migrated blocks.
- Delivered Astro/Payload code must use product-native fields and must not expose WordPress, ACF, Gutenberg, PHP, shortcode, or REST concepts.
- All delivered first-party assets must be local under `public/assets/` or the approved app-local equivalent. Do not ship source-origin, `code.jquery.com`, or `cdn.jsdelivr.net` hotlinks.
- Record every deferred issue in `docs/migration/open-questions.md`; do not leave "later" only in chat.

## Source Inputs

This repository is self-contained by default. The user-authorized read-only source inputs are:

- current WordPress reference: `D:\wamp\www\acme`
- current theme: `D:\wamp\www\acme\wp-content\themes\acme`
- current uploads/media reference when explicitly needed: `D:\wamp\www\acme\wp-content\uploads`
- production SQL dump: `<path-to-production-dump>.sql`

Treat the SQL dump as sensitive production data: never commit it raw, never execute it directly, and only commit sanitized derived artifacts.

## Validation

Do not treat a static artifact as completion evidence. Use current checks from `package.json` and the relevant AI contract:

- `npm.cmd run typecheck`
- `npm.cmd --workspace @acme/web run build`
- `npm.cmd run qa:no-inline-block-styles`
- `npm.cmd run qa:no-hotlinks`
- storybook and route QA as required by `ai/contracts/block-storybook.md`
