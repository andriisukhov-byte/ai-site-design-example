---
name: source-block-port
description: Port Acme WordPress theme blocks into Astro/Payload source-first. Use when migrating a block/template from the source theme, fixing a migrated block that visually diverges from WordPress/dev reference, adding Payload import fields for a migrated block, or updating AI page-generation guidance for block selection.
---

# Source Block Port

## Rule

Port the source block. Do not redesign it, normalize it into a generic section, rewrite SCSS as CSS, invent icons, or substitute a universal block. A universal renderer may be used only when the source template, DOM, styles, and data contract are demonstrably identical; record that evidence in the migration review. Do not put CSS in Astro/TSX renderers.

## Agent Contract

Every porter works from source evidence, not taste. If the source block has a `template.php`, `block.scss`, `block.js`, icons, images, or helper behavior, the migration task is to translate those artifacts into Astro/TSX/SCSS with the same visible contract.

Hard stops:

- Do not merge several source blocks into one renderer.
- Do not replace a dedicated source block with a normalized/foundation block.
- Do not add new colors, icons, layout primitives, wrapper cards, or decorative effects that are not in source.
- Do not rewrite SCSS into plain CSS or inline component styles.
- Do not change shared foundation styles to make one block look closer unless the source foundation evidence proves the shared token/style is wrong.
- Do not hide uncertainty in chat. Add the gap to `docs/migration/open-questions.md` or the block report before continuing.

If exact fidelity is blocked by missing source media/data, keep the source DOM/style contract and record the missing artifact. Do not invent placeholders as completion evidence.

## Source Files

For `template-parts/blocks/<block>/`, read:

- `template.php`
- `block.scss`
- `block.js` when present
- `block.json`
- `acf.json`
- block-local `assets/`

Treat existing PHP, BEM class names, SCSS, and block-local assets as the implementation reference.

## Porting Steps

1. Add a product-native block type in `packages/blocks/src/schemas.ts`.
2. Add block selection guidance in `packages/blocks/src/registry.ts`.
3. Add a Payload block in `apps/cms/src/collections/RoutableContent.ts`.
4. Add or update the source importer in `tools/migrate/block-transform.ts`.
5. Create an Astro renderer in `apps/web/src/components/blocks/<BlockName>.astro`.
6. Copy source SCSS to `apps/web/src/styles/blocks/_<block>.scss`; preserve selectors, declarations, values, nesting, mixins, variables, and responsive rules byte-for-byte where possible. Only change import paths and asset URLs. Any other compatibility change needs an explicit before/after note and reviewer approval. The Astro/TSX renderer may import this SCSS, but must not contain `<style>` blocks or inline `style=` attributes.
7. Copy block-local assets to `apps/web/public/assets/blocks/<block>/`.
8. Wire the renderer in `apps/web/src/components/BlockRenderer.astro`.
9. Add AI workflow notes in `ai/instructions/page-compose.md` and `ai/contracts/source-block-porting.md`.
10. Regenerate Payload types and source exports when schema/import mapping changes.
11. Validate with typecheck, build, no-hotlinks, no-inline-block-styles, and mandatory route-level smoke/visual QA on representative routes and viewports where the block appears. If source capture is unavailable, record the blocker; do not certify the migration.
12. Commit the block as a focused migration commit.

## Required Return Format

When an agent finishes a block, it must report:

- source files read;
- files changed;
- source DOM/classes preserved or every intentional structural difference;
- SCSS changes and why each was necessary;
- assets copied or missing;
- import/CMS fields added;
- representative routes containing the block;
- validation commands and exact pass/fail result;
- open questions appended to docs.

## AI Guidance

Every migrated block needs a short rule that says:

- when AI should choose the block;
- which content fields AI should fill;
- what similar blocks it must not replace;
- any item count/layout behavior that affects visual fidelity.

Generated content must use `{{text}}` for gradient spans and `||` for intentional line breaks. Do not emit WordPress, ACF, Gutenberg, shortcode, PHP, or REST structures in product CMS JSON.

## Payload Import

The importer may understand legacy source data, but public Astro code and CMS-authored JSON must use product-native field names. Keep mapping logic isolated in `tools/migrate/`.
