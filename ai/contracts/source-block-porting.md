# Source Block Porting

Migration rule: port source blocks from the WordPress theme as block units, not as redesigned generic sections.

For each source block:

1. Read `template-parts/blocks/<source>/template.php`, `block.scss`, `block.js`, `block.json`, `acf.json`, and local assets.
2. Create or update the Astro renderer with the exact source DOM order, nesting, element types, attributes, and BEM classes. Only framework-required structural changes are permitted; document each one with its reason and visual/behavioral equivalence.
3. Keep SCSS as SCSS under `apps/web/src/styles/blocks/` and preserve its selectors and declarations. Change only imports and asset paths. Do not rewrite, simplify, normalize, or recreate SCSS rules in CSS, Astro, TSX, utility classes, or inline styles.
4. Copy block-local assets into `apps/web/public/assets/blocks/<source>/`; every icon and asset must have source provenance and be localized exactly. Invented, approximate, recolored, or substitute assets are prohibited. No source-site hotlinks.
5. Add or update the Payload block schema and source importer mapping.
6. Add AI guidance in `packages/blocks/src/registry.ts` and `ai/instructions/page-compose.md`.
7. Validate with typecheck/build, static QA checks, DOM smoke, interaction checks for `block.js`, and mandatory route-level visual comparison at representative viewports. Missing source evidence blocks certification.
8. Commit only the block-scoped migration. Do not merge source blocks, consolidate renderers, or include unrelated shared-file changes.

## feature-rows

Source:

- `D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks/feature-rows/template.php`
- `D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks/feature-rows/block.scss`
- `D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks/feature-rows/block.js`
- `D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks/feature-rows/acf.json`

Astro/Payload contract:

- Block type: `feature-rows`
- Variants: `capabilities`, `builder`
- Fields: exactly three `rows` with optional `eyebrow`, `title`, and `description`
- Renderer: `apps/web/src/components/blocks/Proof/FeatureRowsBlock.astro`
- Styles: `apps/web/src/styles/blocks/_feature-rows.scss`
- Assets: `apps/web/public/assets/blocks/feature-rows/`

AI selection rule:

- Use `feature-rows` for the three-row visual flow section.
- Do not use `feature-grid` for this source block.

## feature-grid

Source:

- `D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks/feature-grid/template.php`
- `D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks/feature-grid/block.scss`
- `D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks/feature-grid/block.js`
- `D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks/feature-grid/acf.json`

Astro/Payload contract:

- Block type: `feature-grid`
- Fields: optional `eyebrow`, optional formatted `title`, optional formatted `description`, `background`, `columns`, and `cards`
- Card fields: `icon`, optional `customIcon`, optional formatted `title`, optional formatted `description`
- Renderer: `apps/web/src/components/blocks/Grids/FeatureGridBlock.astro`
- Styles: `apps/web/src/styles/blocks/_feature-grid.scss`
- Assets: source preset icons are inline SVGs from `template.php`; custom icons resolve through media fields

AI selection rule:

- Use `feature-grid` only for source-style feature card grids with optional centered header and 2/3/4-column card layout.
- Preserve source preset icons, optional custom icons, `background`, and `columns`.
- Do not add card links; the source ACF block has no link field.
- Do not use `feature-grid` for migrated source blocks that now have dedicated renderers.

## difference

Source:

- `D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks/difference/template.php`
- `D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks/difference/block.scss`
- `D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks/difference/block.js`
- `D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks/difference/acf.json`
- `D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks/difference/assets/`

Astro/Payload contract:

- Block type: `difference`
- Fields: optional `title`, optional `subtitle`, optional `leftTitle`, optional `rightTitle`, optional `leftItems`, optional `rightItems`, optional `action`
- Renderer: `apps/web/src/components/blocks/Proof/DifferenceBlock.astro`
- Styles: `apps/web/src/styles/blocks/_difference.scss`
- Assets: `apps/web/public/assets/blocks/difference/`

AI selection rule:

- Use `difference` for source-style two-column contrast sections where the left column describes other tools and the right column describes Acme advantages.
- Imported source content must preserve left/right item counts, order, and column labels exactly. AI-authored content should keep the columns balanced, commonly five items per column.
- Do not use `difference` as a generic feature grid; use it only when the copy is explicitly comparative.

## how-it-works

Source:

- `D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks/how-it-works/template.php`
- `D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks/how-it-works/block.scss`
- `D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks/how-it-works/block.js`
- `D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks/how-it-works/acf.json`

Astro/Payload contract:

- Block type: `how-it-works`
- Fields: `background`, `openFirst`, optional `eyebrow`, optional formatted `title`, optional `gradientText`, optional `subtitle`, optional `steps`, optional `button`, optional `infoNote`
- Step fields: optional `title`, optional `description`, optional `label`
- Renderer: `apps/web/src/components/blocks/Content/HowItWorksBlock.astro`
- Styles: `apps/web/src/styles/blocks/_how-it-works.scss`
- Behavior: `apps/web/public/assets/blocks/how-it-works/how-it-works.js`

AI selection rule:

- Use `how-it-works` for source-style ordered rollout, onboarding, and implementation timelines.
- Imported source content must preserve source step count, order, labels, and layout flags exactly. AI-authored content may use 3, 4, or 6 steps; it must not trigger a different block or redesigned variant.
- Set `openFirst: true` only when desktop auto-cycle is desired.
- `{{ }}` and `||` title markers are an Astro authoring normalization; imported source `gradientText` still maps to the same rendered gradient span.

## pricing-cards

Source:

- `D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks/pricing-cards/template.php`
- `D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks/pricing-cards/block.scss`
- `D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks/pricing-cards/block.js`
- `D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks/pricing-cards/acf.json`
- `D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks/pricing-cards/icons/`

Astro/Payload contract:

- Block type: `pricing-cards`
- Fields: optional `eyebrow`, optional formatted `title`, optional formatted `description`, `background`, `cards`, optional `info`
- Card fields: `accent`, optional `eyebrow`, optional `title`, optional HTML-safe `description`, `features`, optional HTML-safe `note`, optional `button`
- Renderer: `apps/web/src/components/blocks/Conversion/PricingCardsBlock.astro`
- Styles: `apps/web/src/styles/blocks/_pricing-cards.scss`
- Assets: `apps/web/public/assets/blocks/pricing-cards/icons/`
- Source ACF `source: global | manual` and `background: inherit` are resolved during import instead of modeled in Payload. This keeps the new CMS content explicit and avoids carrying WordPress block-default coupling forward.

AI selection rule:

- Use `pricing-cards` for source-style plan cards, especially pay-as-you-go versus enterprise positioning.
- Imported source content must preserve source card count, order, accent, and layout flags exactly. AI-authored content may use the documented repeater range and must not redesign the visual composition.
- Use `accent: "gradient"` for the primary/pay-as-you-go card and `accent: "dark"` for the enterprise/secondary card.
- Preserve popup CTA hashes such as `#popup-open-popupFreeTrial`; the renderer exposes the matching `data-popup` attribute.

## use-cases-grid

Source:

- `D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks/use-cases-grid/template.php`
- `D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks/use-cases-grid/block.scss`
- `D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks/use-cases-grid/acf.json`
- `D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks/use-cases-grid/assets/icons/`

Astro/Payload contract:

- Block type: `use-cases-grid`
- Fields: optional `eyebrow`, optional formatted `title`, optional `description`, and `cards`
- Card fields: `icon`, optional `customIcon`, optional `title`, optional `description`, optional `href`
- Renderer: `apps/web/src/components/blocks/Grids/UseCasesGridBlock.astro`
- Styles: `apps/web/src/styles/blocks/_use-cases-grid.scss`
- Assets: `apps/web/public/assets/blocks/use-cases-grid/icons/`

AI selection rule:

- Use `use-cases-grid` for source-style card rosters with preset icons and 3/4-column grid behavior.
- Use 4/8/16 cards for 4-column layouts; use 3/6/9/12 cards for 3-column layouts.
- Do not use `feature-grid` for migrated `acme/use-cases-grid` sections.

## security

Source:

- `D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks/security/template.php`
- `D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks/security/block.scss`
- `D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks/security/acf.json`

Astro/Payload contract:

- Block type: `security`
- Fields: `background`, optional `title`, optional `titleGradient`, optional `subtitle`, and `cards`
- Card fields: `icon`, optional `customIcon`, optional `title`, optional `description`
- Renderer: `apps/web/src/components/blocks/Proof/SecurityBlock.astro`
- Styles: `apps/web/src/styles/blocks/_security.scss`
- Icons: extracted exact inline source SVGs under `apps/web/public/assets/blocks/security/icons/`

AI selection rule:

- Use `security` for source-style security, privacy, compliance, and audit proof.
- Imported source content must preserve source card count, order, icon provenance, and layout flags exactly. AI-authored content should use four cards for the source left-visual plus 2x2 card-grid layout.
- Do not use `feature-grid` for migrated `acme/security` sections.

## channels-grid

Source:

- `D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks/channels-grid/template.php`
- `D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks/channels-grid/block.scss`
- `D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks/channels-grid/acf.json`
- `D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks/channels-grid/assets/`

Astro/Payload contract:

- Block type: `channels-grid`
- Fields: formatted `title`, optional `gradientText`, optional `description`, and `cards`
- Card fields: `icon`, optional `customIcon`, optional `title`, optional `href`, optional HTML-safe `description`, optional `image`, and `fullWidth`
- Renderer: `apps/web/src/components/blocks/Grids/ChannelsGridBlock.astro`
- Styles: `apps/web/src/styles/blocks/_channels-grid.scss`
- Assets: `apps/web/public/assets/blocks/channels-grid/`

AI selection rule:

- Use `channels-grid` for source-style "every channel" sections with five route-specific cards.
- Preserve source card order, preview images, and `fullWidth` flags.
- Do not use `feature-grid` for migrated `acme/channels-grid` sections.

## feature-stack

Source:

- `D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks/feature-stack/template.php`
- `D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks/feature-stack/block.scss`
- `D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks/feature-stack/acf.json`
- `D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks/feature-stack/assets/icons/`

Astro/Payload contract:

- Block type: `feature-stack`
- Fields: formatted `title`, optional `description`, `cards`, optional `infoNote`
- Card fields: `icon`, optional `customIcon`, optional `title`, optional `description`, optional `href`
- Renderer: `apps/web/src/components/blocks/Proof/FeatureStackBlock.astro`
- Styles: `apps/web/src/styles/blocks/_feature-stack.scss`
- Assets: `apps/web/public/assets/blocks/feature-stack/icons/`

AI selection rule:

- Use `feature-stack` for source-style proof stacks with a left heading and right stacked icon cards.
- Preserve the three-card stack and optional source `infoNote`.
- Do not use `feature-grid` for migrated `acme/feature-stack` sections.

## coverage-grid

Source:

- `D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks/coverage-grid/template.php`
- `D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks/coverage-grid/block.scss`
- `D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks/coverage-grid/acf.json`
- `D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks/coverage-grid/assets/icons/`

Astro/Payload contract:

- Block type: `coverage-grid`
- Fields: optional `eyebrow`, formatted `title`, optional `description`, and `cards`
- Card fields: `icon`, optional `customIcon`, optional `title`, optional `description`, optional `href`
- Renderer: `apps/web/src/components/blocks/Grids/CoverageGridBlock.astro`
- Styles: `apps/web/src/styles/blocks/_coverage-grid.scss`
- Assets: `apps/web/public/assets/blocks/coverage-grid/icons/`

AI selection rule:

- Use `coverage-grid` for source-style service coverage sections listing trades, service lines, regions, or operations.
- Preserve 6-8 icon cards and the two-column source grid.
- Do not use `feature-grid` for migrated `acme/coverage-grid` sections.

## functional-capabilities

Source:

- `D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks/functional-capabilities/template.php`
- `D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks/functional-capabilities/block.scss`
- `D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks/functional-capabilities/acf.json`
- `D:/wamp/www/acme/wp-content/themes/acme/assets/images/functional-capabilities/`

Astro/Payload contract:

- Block type: `functional-capabilities`
- Presets: `sales`, `service`, `recruiting`, `channels`
- Fields: optional `eyebrow`, formatted `title`, formatted `description`, `cards`, optional `note`
- Card fields: `icon`, optional `customIcon`, optional `title`, optional `description`, optional `channels`, `width`
- Renderer: `apps/web/src/components/blocks/Grids/FunctionalCapabilitiesBlock.astro`
- Styles: `apps/web/src/styles/blocks/_functional-capabilities.scss`
- Assets: `apps/web/public/assets/blocks/functional-capabilities/`

AI selection rule:

- Use `functional-capabilities` for source-style "agent handles/runs/automates" process grids.
- Use `preset: "channels"` only when cards need channels labels and source background pattern cards.
- Preserve source wide cards with `width: "wide"`.
- Do not use `feature-grid` for migrated `acme/functional-capabilities` sections.

## capability-tools

Source:

- `D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks/capability-tools/template.php`
- `D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks/capability-tools/block.scss`
- `D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks/capability-tools/acf.json`

Astro/Payload contract:

- Block type: `capability-tools`
- Fields: optional `eyebrow`, formatted `title`, optional `description`, and `cards`
- Card fields: optional `title`, optional `description`, optional `href`, ordered `logos`, and `extraTools`
- Renderer: `apps/web/src/components/blocks/Grids/CapabilityToolsBlock.astro`
- Styles: `apps/web/src/styles/blocks/_capability-tools.scss`
- Assets: `apps/web/public/assets/blocks/capability-tools/`

AI selection rule:

- Use `capability-tools` only when capability cards explicitly show the connected tools used for each workflow.
- Preserve card order, logo order, link targets, and overflow counts.
- Do not replace it with `functional-capabilities` or `feature-grid`.

## Shared section background

- Every product-native block accepts optional `background: "white" | "gray"` unless its dedicated source contract already defines a stricter background field.
- Switching the section background changes only the section surface and card surface: gray sections use white cards; white sections use gray cards.
- Typography, spacing, borders, media, and behavior must not change between the two background choices.
- Dedicated source selectors remain authoritative where a block already implements the inverse card surface itself.
