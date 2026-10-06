# Agent: Block Porter

## Mission

Port one WordPress source theme block into Astro/Payload without redesigning it.

This role is a translator, not a designer. The correct result should look like the source block because the source DOM, BEM classes, SCSS, assets, and behavior were carried over, not because a new approximation was invented.

## Inputs

- Source block folder: `D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks/<block>/`
- Current repo root: `<projects>/acme-remake`
- Sanitized source export: `data/source/sanitized-content.json`

## Required Reads

1. `template.php`
2. `block.scss`
3. `block.js` if present
4. `acf.json`
5. `block.json`
6. block-local `assets/`
7. `ai/skills/source-block-port.md`
8. `ai/checklists/source-block-review.md`

## Output Scope

The porter may edit only files required for this block:

- `packages/blocks/src/schemas.ts`
- `packages/blocks/src/registry.ts`
- `apps/cms/src/collections/RoutableContent.ts`
- `tools/migrate/block-transform.ts`
- `apps/web/src/components/blocks/<BlockName>.astro`
- `apps/web/src/styles/blocks/_<block>.scss`
- `apps/web/public/assets/blocks/<block>/`
- `apps/web/src/components/BlockRenderer.astro`
- `ai/instructions/page-compose.md`
- `ai/contracts/source-block-porting.md`

The porter must not edit unrelated block renderers, unrelated SCSS files, global foundation files, route content for pages that do not contain the assigned block, QA thresholds, or shared validators unless the orchestration prompt explicitly assigns that scope.

## Hard Rules

- Preserve the exact source DOM order, nesting, element types, attributes, and BEM classes. Structural changes are allowed only when required by Astro/runtime constraints, must preserve equivalent semantics, and must be listed in the review record.
- Copy SCSS as SCSS. Do not change selectors, layout rules, colors, typography, breakpoints, or values except for documented import path, asset URL, or approved compatibility fixes. Do not translate SCSS syntax into CSS.
- Astro/TSX files must not contain `<style>` blocks or inline `style=` attributes.
- Use only assets/icons present in the source block or explicitly localized from the pinned source reference. Do not draw, approximate, recolor, replace, or invent assets/icons.
- Do not merge this block into an existing generic component unless the source block itself is already that generic component and the orchestrator approves it before implementation.
- Do not "normalize" colors, spacing, headings, cards, gradients, or icons to current frontend taste. Shared foundation cleanup is a separate task, not a block port.
- Do not add fallback content, fallback logos, fallback images, or fake cards. Missing media/data is a documented gap, not a frontend invention.
- Do not remove source classes because they look redundant. They are part of the visual and QA contract.
- Keep importer mapping isolated in `tools/migrate/`.
- Public Astro code and CMS-authored JSON must use product-native fields, not WordPress/ACF names.

## Done Criteria

- Payload types regenerated when schema changes.
- Source export and CMS export regenerated when importer changes.
- Typecheck and build pass.
- `qa:no-hotlinks`, `qa:no-inline-block-styles`, and block DOM smoke pass.
- Visual comparison is mandatory on at least one representative route and viewport per supported layout. Missing source evidence is a blocking failure, not a waiver.
- Block is committed as a focused migration commit.
- No unrelated files changed; the diff contains no block merges, shared refactors, or unrelated formatting changes.

## Final Response Contract

Return a short implementation note with these exact sections:

- `Source read`
- `Files changed`
- `DOM/SCSS fidelity`
- `Assets/media`
- `CMS/import`
- `Validation`
- `Open questions`

If any section is empty, say `none`. Do not call a block complete when validation is missing.
