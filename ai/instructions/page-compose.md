# Page Compose

Generate product-native CMS JSON. Do not emit WordPress, ACF, Gutenberg, shortcode, PHP, or REST-specific structures.

Use the block catalog in `packages/blocks/src/registry.ts` and category map in `packages/blocks/src/categories.ts` as the source of truth. Output must validate against `pageDocumentSchema`.

Before composing or changing a migrated block, read `ai/contracts/block-contracts.md`. If the needed source variant is not contracted, create or assign a contract audit before inventing a new shape.

For source-migrated blocks, validate visual choices against local `/blocks` and source `dev.acme.example/blocks`. Page-level screenshots are integration evidence, not a substitute for block-story parity.

## Copy authority

Words are governed by `ai/contracts/copy-rules.md` and the facts they may state by `ai/contracts/copy-data.md`. This file governs structure: which block, in what order, how many, with which CTA placement. When copy arrives from the marketing LP skills it is transported verbatim under `ai/contracts/lp-handoff.md` - composition adapts to the copy, not the other way round.

## Default page arc

The arc below is the marketing team's landing-page framework, mirrored from their LP skills (v5.0) so that pages composed here and pages written there have the same spine. Section ids are the ones used in `lp.md` handoff documents. Sections marked *(optional)* are included or skipped per audience and funnel stage, with the reason recorded in the batch review.

| id | Section | Block |
|---|---|---|
| S1 | Hero | `hero` |
| S2 | Social proof *(optional)* | `logo-strip` / `metrics` |
| S3 | Business benefits, or core capabilities on a category page | `use-cases-grid` / `functional-capabilities` |
| S4 | Pain points | `pain-points-comparison` / `feature-grid` |
| S5 | How it works | `how-it-works` |
| S6 | Product screenshot *(optional)* | `hero.media` / `feature-rows` |
| S7 | Mid-page CTA | `cta` |
| S8 | Who it is built for | `coverage-grid` / `use-cases-grid` |
| S9 | Channels *(optional on category pages)* | `channels-grid` |
| S10 | Platform capabilities or architecture | `feature-stack` / `industry-expertise` |
| S11 | Integrations | `logo-grid` / `capability-tools` |
| S12 | Comparison *(decision-stage)* | `difference` / `pricing-details` |
| S13 | Results | `results-stats` / `metrics` |
| S14 | Pricing | `pricing-cards` + `pricing-policy` |
| S15 | Budget comparison *(optional)* | `pricing-details` |
| S16 | Security | `security` |
| S17 | Testimonials *(omitted while no approved quotes exist)* | `testimonials` |
| S18 | Blog | `news-insights` |
| S19 | FAQ | `faq` |
| - | Sources | `rich-text` |

A category or platform page adds a **category definition** block of 40-70 words immediately after the hero, written to stand alone as a quotable answer to "what is a [term]", and replaces S4/S8 with a cross-industry use-case roster. A vertical page links **up** to one technology-cluster page from S10; a category page links **sideways** to the other three cluster anchors and **down** to the vertical pages that exist. The mapping is in `ai/contracts/copy-data.md`.

Two shorter arcs remain valid where the page type does not call for the full framework: a use-case page (`hero` → `use-case-flow` → proof → `cta` → `faq`) and a directory page (`hero` → `comparison-grid` → `cta`). Anything else follows the table.

Every page needs SEO fields, one clear primary CTA path, and block content density within the registry guidance.

## Block reuse policy

Compose from the registered catalog. A new block type is an exception that must be justified against the "Порог нового блока" procedure in the `create-page` skill, and at most one new block may be introduced per page.

Visual variety comes from block combination, section order, content density, and copy — not from new visual constructions. If two candidate sections would use the same block, change the content and the density; do not fork the block.

Before proposing a new block, check the template families in `apps/web/src/components/BlockRenderer.astro` (`uc-hero`, `uc-features`, `uc-problem`, `uc-hiw`, `uc-impact`, `uc-onboarding`): an existing type frequently already has an alternative renderer that covers the intent.

## CTA policy

Labels and destinations are copy, and they follow the table in `ai/contracts/copy-rules.md` → CTA conventions. Count and placement are layout, and they are set here.

Two destinations per page, never more. **Self-serve**: every self-serve CTA resolves to the same signup address, whatever its label ("Get Started Free", "Start Building Your Agent"). **Sales**: "Book a Demo" / "Request Demo", "See It In Action" and "Talk to Sales" all resolve to the demo or contact route. A page never carries two competing self-serve destinations, and never a third destination.

Placement, in order of priority:

1. Hero - always.
2. After the first proof or value section.
3. A dedicated `cta` block once the value arc is complete (benefits → pain → how it works) - always. On the full framework arc that is the mid-page banner at S7, and there is no second banner later.

`faq` is the last block on the page, with the sources block and `news-insights` before it. Nothing converts after the FAQ: the FAQ, testimonials, and blog sections serve readers who are still researching, and conversion pressure there works against the page. A trailing `cta` after `faq` is a gate failure, not a style choice - `qa:copy` fails on it.

A page shorter than 6 blocks uses positions 1 and 3 only. On the full framework arc the count follows from the arc itself: the six CTA positions in `copy-rules.md` plus one CTA per pricing tier, so **7-9 CTAs across exactly two destinations**. The old "never more than 5" ceiling predates the framework and produced a false pass on a real page - what matters is the number of destinations, not the number of buttons.

Never label a CTA "Learn More".

An interactive control is not a CTA. Replay controls, calculator sliders, carousel arrows, and anchor navigation do not count toward the total and must not be styled as primary buttons.

Record the CTA count, labels, and positions in the batch `review.md`.

Use `hero-extended` only for top-of-page sections that intentionally match the extended source hero: background art, title with gradient marker support, dual CTA/note pairs, optional media frame, and optional three-card proof row. Use the simpler `hero` when those extended elements are not required.

Use `news-insights` for Acme-style related posts/news sections near the end of marketing pages. Do not use it as a substitute for page-specific narrative, comparison, pricing, or proof sections. Use `content-feed` only for future generic product-native feeds after its design and renderer are explicitly certified.

Use `feature-grid` only for source-style feature card grids: optional centered eyebrow/title/description, `background: "white" | "gray"`, `columns: 2 | 3 | 4`, and preset/custom icon cards. Do not add card links; the source block has no card URL field. Do not use it for feature-rows, security, use-cases-grid, channels-grid, coverage-grid, feature-stack, or other migrated blocks with their own renderer.

Use `agent-capabilities` for the interactive "what your agents can do" capability carousel/detail-card section. Preserve `contentSide`, autoplay settings, rich item descriptions, item images, custom icons, and links. Do not replace it with `feature-grid`; the source layout and behavior are different.

Use `agent-solutions` for expandable two-column agent solution card grids from the source theme. Preserve preset/custom icons, optional card links, short titles, and source-like descriptions. Do not replace it with `feature-grid`.

Use `contact-us` only for contact pages or source contact sections with a left-side location/phone panel and right-side form. Do not use `cta` for this layout.

Use `concierge-flow` for AI Concierge explanation sections with a diagram image, three explanatory cards, and a centered CTA. Do not use `cta` for this layout.

Use `enterprise-upgrade` for enterprise upgrade, move-to-enterprise, verification, demo-thank-you, and free-trial-thank-you flows where the source section combines a banner, comparison/benefits table, body copy, and a form or calendar embed. Do not use `cta` for this layout.

Use `pricing-cards` for pay-as-you-go, enterprise, or plan-comparison sections. Imported source content must preserve source card count, order, accents, and feature rows exactly. AI-authored content should use 2 cards for pay-as-you-go versus enterprise comparisons, keep feature rows short, and use the optional info field for pricing mechanics that should sit below the cards.

Use `pricing-details` after `pricing-cards` when the reader needs exact mechanics: credit packages, node costs, conversation pricing, knowledge-base costs, channels, or comparison tables. Imported source content must preserve source table structure and row order exactly. AI-authored content should use concise headers and rows; use `comparison` variant only when the table is evaluative rather than purely informational.

Use `difference` when a page needs a direct two-column contrast between generic tools and Acme. Keep both columns balanced and reserve the right column for the differentiated Acme capability.

Use `how-it-works` for ordered onboarding, implementation, or rollout timelines with interactive source-style step cards. Use `label` for concise day ranges such as `Days 1-3`; set `openFirst: true` only when the section should auto-cycle on desktop. Keep 3, 4, or 6 steps for source-like layouts, and use `infoNote` only for a final process caveat below the CTA.

Use `pain-points-comparison` for industry or service pages where each operational problem should be paired with a concrete AI-agent response. Do not use it for generic feature lists; each row should read as challenge -> solution.

Use `pricing-policy` as a support section near pricing cards/details for billing rules, credit expiration, support policy, or other concise commercial caveats.

Use `capability-strip` for compact rows of 3-6 icon/label platform capabilities when there are no KPI values and no card-level descriptions. Use `metrics` for measurable proof and `feature-grid` for explanatory cards.

Use `feature-rows` only for the source flow block with exactly three rows. Choose `variant: "capabilities"` for the platform capability flow used on AI-agent-builder style pages; choose `variant: "builder"` for the AI-builder workflow visual. Do not replace this block with `feature-grid`, because its layout, connectors, and assets are source-specific.

Use `use-cases-grid` for source-style card rosters with preset icons and medium/long descriptions: industries, vertical use cases, workflow outcomes, or AI-agent capabilities that should render as large gray cards in 3 or 4 columns. Use 4, 8, or 16 cards when the design needs 4 columns; otherwise 3, 6, 9, or 12 cards naturally render as 3 columns. Do not use `feature-grid` for migrated `acme/use-cases-grid` sections.

Use `channels-grid` for "one agent, every channel" sections where five explicit cards describe SMS, WhatsApp, voice, chat, email, or route-specific event channels. Preserve the source card order, `fullWidth` final cards, preview images, and `gradientText` substring. Do not use `feature-grid` for migrated `acme/channels-grid` sections.

Use `feature-stack` for two-column proof sections that explain why the agent works differently. Imported source content must preserve source title line breaks/gradient markers, card count, card order, icons, and `infoNote`. AI-authored content should use three stacked icon cards and an optional bottom evidence note. Do not use `feature-grid` for migrated `acme/feature-stack` sections.

Use `coverage-grid` for source-style service coverage sections that list trades, service lines, regions, or operational coverage with preset icons. Preserve the two-column card grid, source icon choices, and 6-8 card density. Do not use `feature-grid` for migrated `acme/coverage-grid` sections.

Use `security` for security/compliance proof sections with the source left-side shield visual and four proof cards. Keep the cards focused on data protection, privacy, secure integrations, and audit/monitoring unless the page has stronger source-specific compliance points. Do not use `feature-grid` for migrated `acme/security` sections.

Use `functional-capabilities` for "what this agent handles/runs/automates from day one" workflow capability grids. Choose `preset: "channels"` only for cross-channel delivery sections with `channels` labels and optional bottom `note`; use `sales`, `service`, or `recruiting` for process/workflow cards. Preserve `width: "wide"` cards from source. Do not use `feature-grid` for migrated `acme/functional-capabilities` sections.

Use `capability-tools` when each capability card must show the specific connected tools or integrations that power it. Preserve card order, logo order, links, and `extraTools` overflow counts. Do not replace it with `functional-capabilities` or `feature-grid`, because those source blocks do not include the tool-logo row.

Use `industry-expertise` on industry, use-case, or platform pages when 5-6 related capabilities need interactive explanation. Use `visualType: "capabilities"` for platform mechanics such as reasoning, templates, concierge, channels, and virtual employees; use `industry` for vertical lists; use `platform` for product-area tabs with preview images. Keep descriptions concrete and avoid using it as a generic card grid.

Use `logo-strip` as a social-proof band for customer trust and compact stats. Use `logo-grid` for categorized integrations or partner ecosystems where the reader needs to scan tools by category. Do not use either block as decoration; they should support credibility or compatibility claims.

Use `tabs-showcase` when a reader should compare workflow scenarios that share the same step-by-step visual language. Imported source content must preserve source tab count, tab order, step count, connector behavior, and autoplay settings exactly. AI-authored content should use 3-4 tabs, short labels, concrete step verbs, 5 steps for source-like flow parity, and `autoplaySeconds: 0` unless autoplay is intentional.

Use `anchor-nav` near the top of long pages with many same-page sections. Each item should point to an existing section id without `#`; do not use it for external navigation or short pages.

Use `testimonials` when named customer proof supports the page promise. Imported source content must preserve testimonial count, order, author media, and quote text exactly. AI-authored content should use specific outcomes, named authors, and roles. Do not invent testimonials; omit the block when credible quotes are unavailable.
When credible reusable FAQ or testimonial records already exist in the CMS, editors may use collection-backed block mode. Generated static page JSON should still resolve to inline `faq.items` or `testimonials.items`; do not emit unresolved relationships for Astro.

Use `comparison-grid` on directory pages that send readers to comparison or alternative pages. Keep actions internal and summaries concise.

Use `use-case-flow` when a use-case page needs a compact process story with 3-4 grouped stages. Keep step labels action-oriented, use one optional CTA, and avoid using it for generic feature grids.

Inline title formatting:

- Use `{{text}}` to mark gradient-highlighted words in title-like fields.
- Use `||` only for an intentional line break in title-like fields.
- Do not emit HTML spans for new AI-authored content. The importer may preserve sanitized legacy spans, but generated content should use the markers above.

Navigation for an AI-created page is editor-managed in Payload Site settings. Add the page’s canonical path to `primaryNavigation` or its mega-menu items; do not hard-code a new marketing route in the Astro header or package configuration.

Use `conversation-replay` when the page's core claim is that one agent carries a single customer conversation across channels and finishes a real job. Give it one continuous story with concrete timestamps, alternating `from: customer` and `from: agent`, `action` lines only for what the agent did inside a connected system, and `outcomeRows` naming the record it created. It is the closest available substitute for a live demo, so do not fill it with disconnected sample messages, and do not use it as a second channels section — `channels-grid` covers per-channel capability. The replay is user-initiated by design: auto-starting it would require a pause control under WCAG 2.2.2.

Use `recovery-calculator` once per page, on pages where the buying decision is arithmetic the reader already does in their head. Keep the three sliders plus the booking-frequency control: for recurring-service verticals, modelling a recovered lead as a single job understates it by an order of magnitude. Lead with the client count rather than the money, keep the visible formula, and keep an `assumptionNote` that states what the estimate leaves out — the credibility comes from being arguable. Never seed defaults that flatter the product, never show an ROI percentage, and never present the output as a guarantee. For fixed published statistics use `results-stats` or `metrics` instead.
