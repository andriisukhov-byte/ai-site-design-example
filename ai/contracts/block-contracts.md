# Block Contracts

This file is the source-audit ledger for migrated blocks. Each block must connect the original source evidence to the product-native CMS schema, Web renderer, assets, and storybook cases.

## Value typography (applies to every block)

Any prominent numeric or currency value a block renders — a metric, a price, a calculator output, a recovered-revenue figure — reuses the value typography already established by `metrics`, `pricing-cards`, and `results-stats`: same scale, weight, tracking, and highlight mechanism. A block must not invent its own treatment for its headline number, and must not apply the brand gradient to a value that changes at runtime.

## Contract Template

Use this structure for every block:

```md
## block-name

- Category:
- Source folder:
- Source files read:
  - template.php:
  - block.scss:
  - block.js:
  - block.json:
  - acf.json:
- Source settings:
- ACF fields:
- Conditional logic:
- CMS schema:
- Web renderer:
- Styles:
- Assets:
- Dynamic behavior:
- Storybook cases:
- QA:
- Status:
- Open gaps:
```

## Current Category Map

- Heroes: `hero`, `hero-extended`
- Grids: `feature-grid`, `channels-grid`, `coverage-grid`, `functional-capabilities`, `logo-grid`, `comparison-grid`, `use-cases-grid`
- Proof: `agent-capabilities`, `agent-solutions`, `capability-tools`, `capability-trio`, `feature-rows`, `feature-stack`, `security`, `metrics`, `results-stats`, `stats-cards`, `difference`, `pain-points-comparison`, `industry-expertise`, `logo-strip`, `testimonials`
- Content: `rich-text`, `side-by-side`, `story`, `media-showcase`, `how-it-works`, `tabs-showcase`, `use-case-flow`
- Conversion: `cta`, `contact-us`, `concierge-flow`, `enterprise-upgrade`, `pricing-cards`, `pricing-details`, `pricing-policy`, `live-in-days`
- Navigation: `faq`, `news-insights`, `content-feed`, `anchor-nav`, `capability-strip`

## Required Status Values

- `not-audited`: source settings were not fully read yet.
- `contracted`: source files/settings/conditional logic are documented.
- `cms-ready`: Payload fields and import mapping exist.
- `web-ready`: renderer, SCSS, JS/React behavior, and assets exist.
- `storybook-ready`: every source variant has a local `/blocks` story.
- `qa-ready`: storybook and representative route QA passed.

## Shared signup-link behavior

- CMS/source blocks may carry `/signup`, `/sign-up`, or `https://app.acme.example/signup`.
- The Web renderer resolves every signup action to `https://app.acme.example/signup?utm_content=<current-page-slug>`.
- `/` uses `cognitive-ai-platform` as its explicit `utm_content` value.
- `packages/config/src/index.ts` owns the global signup URL and pathname resolver; individual block renderers must not hardcode competing signup destinations.
- `npm run qa:signup-links` validates every built signup anchor.

## Initial Audit Notes

The current implementation has many renderers and CMS fields, but not every block has a completed `block.json`/`acf.json` conditional-logic audit. Treat existing blocks as `not-audited` until their section below proves source settings, CMS fields, Web branches, and storybook cases.

## hero

- Category: Heroes
- Source settings: not audited in this ledger yet.
- CMS schema: partial, includes `variant`, media, actions, notes, tooltip, cards.
- Web renderer: implemented at `apps/web/src/components/blocks/Heroes/HeroBlock.astro`.
- Storybook cases: source has `hero`; local must keep matching story id.
- Status: web-ready, cms-ready, not-audited.

## hero-extended

- Category: Heroes
- Source settings: not audited in this ledger yet.
- CMS schema: partial, includes `variant`, background, media, actions, notes, cards.
- Web renderer: implemented at `apps/web/src/components/blocks/Heroes/HeroExtendedBlock.astro`.
- Storybook cases: source has `hero-extended`.
- Status: web-ready, cms-ready, not-audited.

## feature-rows

- Category: Proof
- Source settings: not audited in this ledger yet.
- CMS schema: partial, includes `variant: capabilities | builder`.
- Web renderer: implemented at `apps/web/src/components/blocks/Proof/FeatureRowsBlock.astro`.
- Storybook cases: source has `feature-rows` and `feature-rows-builder-variant`.
- Status: web-ready, cms-ready, not-audited.

## agent-capabilities

- Category: Proof
- Source settings: not audited in this ledger yet.
- CMS schema: partial, includes `contentSide`, `autoplay`, `autoplayInterval`, items, images, links.
- Web renderer: implemented at `apps/web/src/components/blocks/Proof/AgentCapabilitiesBlock.astro`.
- Storybook cases: source has `agent-capabilities` and `agent-capabilities-with-card-images`.
- Status: web-ready, cms-ready, not-audited.

## tabs-showcase

- Category: Content
- Source settings: not audited in this ledger yet.
- CMS schema: partial, includes `background`, `autoplaySeconds`, tabs, steps.
- Web renderer: implemented at `apps/web/src/components/blocks/Content/TabsShowcaseBlock.astro` with React island.
- Storybook cases: source has `tabs-showcase`.
- Status: web-ready, cms-ready, not-audited.

## capability-tools

- Category: Proof
- Source folder: `template-parts/blocks/capability-tools`
- Source settings: ordered capability cards with an optional link, an ordered tool-logo row, and an additional-tool count.
- CMS schema: product-native `eyebrow`, `title`, `description`, and `cards`; each card has `title`, `description`, `href`, `logos`, and `extraTools`.
- Web renderer: `apps/web/src/components/blocks/Grids/CapabilityToolsBlock.astro`.
- Styles: `apps/web/src/styles/blocks/_capability-tools.scss`.
- Assets: localized under `apps/web/public/assets/blocks/capability-tools/`.
- Storybook cases: source has `capability-tools` on `/blocks-3/`.
- QA: schema/import round-trip and local story exist; strict visual threshold remains part of the nine-page audit.
- Status: storybook-ready, web-ready, cms-ready.
- Open gaps: none at the contract level.

## conversation-replay

- Category: Proof
- Source folder: none. Net-new block, designed for this repository rather than ported from the source theme.
- Origin: designed 2026-08-12 for `/ai-receptionist-for-cleaning-companies-v2/` after a competitive teardown of 12 AI-receptionist pages and 5 cleaning-software pages. The teardown found that every competitor claims omnichannel handling and none of them shows one customer conversation moving across channels with continuous context; that gap is what this block occupies.
- Product intent: one continuous customer conversation replayed turn by turn, with a channel rail showing the channels it travelled, per-turn annotations for what the agent did inside connected systems, and a closing record of the artifact it created. It is the closest substitute available for a callable live demo.
- CMS schema: `background`, `title`, `description`, `replayLabel`, `turns[]` (`channel` enum voice/sms/chat/whatsapp/mail, `time`, `from` enum customer/agent, `text` required, `action`), `outcomeTitle`, `outcomeRows[]` (`label`, `value`), `outcomeNote`. Declared in `packages/blocks/src/schemas.ts` as `conversationReplayBlockSchema`; Payload block in `apps/cms/src/collections/RoutableContent.ts`.
- Web renderer: `apps/web/src/components/blocks/Proof/ConversationReplayBlock.astro`.
- Styles: `apps/web/src/styles/blocks/_conversation-replay.scss`. Tokens only; no inline styles.
- Dynamic behavior: `apps/web/public/assets/blocks/conversation-replay/conversation-replay.js`. The whole transcript renders visible by default; the script only adds an opt-in staged replay driven by the button. Replay is deliberately user-initiated - auto-starting would make it auto-updating content requiring a pause control under WCAG 2.2.2 (Level A), which has no short-duration exemption. Reduced motion reveals everything without transitions.
- Assets: none. Channel glyphs are inline SVG in the renderer.
- Storybook cases: `conversation-replay` on `/blocks-9/`.
- QA: schema round-trip and local story exist; `qa:no-inline-block-styles` passes. Independent review of the page that introduced it is recorded in `data/ai-page-generation/2026-08-ai-receptionist-cleaning-v2/`.
- Status: storybook-ready, web-ready, cms-ready.
- Open gaps: no audio variant. The strongest form of this proof in the category pairs a real recorded call with a synced transcript, which needs a real recording as an approved asset.

## recovery-calculator

- Category: Proof
- Source folder: none. Net-new block.
- Origin: designed 2026-08-12 alongside `conversation-replay`. Research across ~15 B2B calculators found the modal input count is four, that results should be ungated with a server-rendered default, and that every competitor calculator in this category prices a recovered lead as a single job - which understates a recurring-service business by an order of magnitude. The booking-frequency control is the differentiator.
- Product intent: turn the reader's own volume into an arguable estimate. Leads with a client count rather than a currency figure, keeps the formula visible, and states what the estimate excludes.
- CMS schema: `background` (white/gray/dark), `title`, `description`, `controls[]` (`key` enum missed/share/jobValue, plus `label`, `hint`, `min`, `max`, `step`, `value`, `prefix`, `suffix`), `frequencyLabel`, `frequencyDefault`, `clientsLabel`, `resultLabel`, `annualLabel`, `breakEvenNote`, `assumptionNote`, `action`. Declared as `recoveryCalculatorBlockSchema`.
- Web renderer: `apps/web/src/components/blocks/Proof/RecoveryCalculatorBlock.astro`. The default result is computed server-side, so the persuasive claim does not depend on JavaScript.
- Styles: `apps/web/src/styles/blocks/_recovery-calculator.scss`. The dark variant overrides `.ca-gradient-text` to solid amber because the brand gradient passes through `#200000` and disappears against the near-black panel.
- Dynamic behavior: `apps/web/public/assets/blocks/recovery-calculator/recovery-calculator.js`. Live recalculation, slider track fill, and a count-up that renders the final value immediately under reduced motion.
- Assets: none.
- Storybook cases: `recovery-calculator` on `/blocks-9/`.
- QA: schema round-trip and local story exist; `qa:no-inline-block-styles` passes; arithmetic exercised in the browser (frequency switch and slider drag).
- Status: storybook-ready, web-ready, cms-ready.
- Open gaps: none at the contract level. Each slider has a paired numeric field (added 2026-08-13) that clamps to the slider's range on blur, because published usability research finds operators who know their exact figure abandon slider-only controls.
