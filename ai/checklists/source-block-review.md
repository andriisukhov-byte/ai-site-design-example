# Source Block Review Checklist

Use this checklist before committing any migrated source block.

## Source Fidelity

- `template.php` was read and the Astro renderer preserves source DOM order, nesting, element types, attributes, and BEM classes; any deviation is enumerated with a source requirement and reviewer approval.
- `block.scss` was copied to `apps/web/src/styles/blocks/_<block>.scss`.
- SCSS changes are limited to import paths and asset URLs. Compatibility changes require an explicit diff, justification, and approval; selector, declaration, value, layout, color, typography, and breakpoint changes fail review.
- No unrelated foundation, token, or global style changes were made to force the block to pass.
- All source `block.js` behavior is ported. Omitting behavior requires a source-based justification, an explicit no-behavior-impact review, and passing interaction QA.
- Every rendered icon and asset has recorded source provenance and is copied/localized exactly; no fallback, replacement, recoloring, invented asset, or invented icon is allowed.
- No invented icons, colors, layouts, spacing, typography, responsive rules, fallback content, fallback logos, fallback images, block merges, block splits, or generic replacements were introduced.
- The block was not merged into another source block or a universal renderer unless the source evidence proves it is the same block contract.

## Renderer Hygiene

- Astro/TSX renderer imports SCSS and contains no `<style>` block.
- Astro/TSX renderer contains no inline `style=` attributes.
- Rendered text uses `FormattedText` where `{{text}}`, `<span>`, or `||` markers are source-supported.
- Links and media are resolved through project helpers where available.

## CMS And Import

- `packages/blocks/src/schemas.ts` has product-native field names.
- `apps/cms/src/collections/RoutableContent.ts` exposes editor-friendly fields.
- `tools/migrate/block-transform.ts` is the only place that understands legacy ACF field names.
- Source export and CMS export were regenerated if importer or schema changed.
- Payload types were regenerated if CMS schema changed.

## AI Guidance

- `packages/blocks/src/registry.ts` explains when to choose the block.
- `ai/instructions/page-compose.md` explains when AI should choose the block.
- `ai/contracts/source-block-porting.md` records source files, fields, renderer, styles, assets, and selection rules.

## QA

- Typecheck passes.
- Web build passes.
- `qa:no-hotlinks` passes.
- `qa:media` either passes or the missing imported media are recorded as a certification blocker.
- `qa:no-inline-block-styles` passes.
- `qa:block-dom` passes on at least one route containing the block.
- Visual comparison is mandatory for representative route and viewport coverage. If source evidence is unavailable, review status is blocked and the evidence record must identify the missing artifact.
- The changed-file list contains only block-scoped files and the minimal required shared registration/mapping lines.
