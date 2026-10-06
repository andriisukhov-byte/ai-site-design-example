# Sections the site can render

Generated from `packages/blocks/src/registry.ts` - 47 registered block types. Do not edit by hand; run `npm run ai:block-catalog`.

A page is composed only from these. If a section you want to write has no entry here, the site cannot render it - say so in the brief instead of describing the visual, and the design side will either map it to the closest entry or grow a new block through its own approval track.

## conversion

| Block | What it is | How many items | When to use it |
|---|---|---|---|
| `contact-us` | Source-faithful contact layout with address/phone panel, logo detail, and product-native contact form shell. | - | Use only for source `contact-us` pages/sections. Preserve titleStart/titleAccent, location copy, phone, logo, and the two-column contact/form layout. Do not replace this with cta. |
| `enterprise-upgrade` | Source-faithful enterprise upgrade landing/thank-you section with banner, benefits comparison, body copy, and product-native form or calendar embed. | benefits: 2-12 | Use only for source enterprise upgrade, move-to-enterprise, verification, and thank-you flows. Preserve the banner, benefits table, body content, and form/embed slot. Do not replace this with cta. |

## cta

| Block | What it is | How many items | When to use it |
|---|---|---|---|
| `cta` | Focused conversion section with one primary path and optional secondary link. | - | Use near the end or after a dense proof section. Do not stack CTAs back to back. |
| `pricing-cards` | Pricing plan cards with feature lists, plan actions, and optional info note. | cards: 2-3 | Use for commercial pages when plan selection or pay-as-you-go vs enterprise positioning is needed. Keep feature text short and put pricing mechanics in the info note. |

## explanation

| Block | What it is | How many items | When to use it |
|---|---|---|---|
| `concierge-flow` | Source-faithful AI Concierge process section with diagram, three proof cards, and a centered CTA. | cards: 3-3 | Use only for source `concierge-flow` sections. Preserve the title gradient/span, diagram image, three-card proof layout, and button. Do not replace this with cta. |

## hero

| Block | What it is | How many items | When to use it |
|---|---|---|---|
| `hero` | Opening page section with headline, supporting copy, actions, and optional media. | - | Use once at the top of marketing pages. Keep one clear primary action. |
| `hero-extended` | Source-faithful extended landing hero with background art, two CTA/note pairs, optional media frame, and optional three-card proof row. | cards: 0-3 | Use only for source `hero-extended` pages or new top-of-page sections that intentionally need the same background, dual CTA notes, media frame, and card row. Do not replace it with the simpler hero block. |

## narrative

| Block | What it is | How many items | When to use it |
|---|---|---|---|
| `how-it-works` | Interactive source-faithful process timeline with expandable steps and progress. | steps: 3-6 | Use for ordered implementation or onboarding processes with step labels and descriptions. |
| `rich-text` | Editorial HTML content for articles, legal pages, and imported WYSIWYG content. | - | Use for long-form copy when a structured marketing section would make editing harder. |
| `side-by-side` | Alternating media and copy section for feature explanations or use-case details. | bullets: 0-6 | Good body workhorse. When stacking, alternate mediaSide and background. |
| `story` | Long-form editorial section with intro, body copy, a pull quote, an image, and optional supporting cards. | cards: 0-4 | Use on company, about, and manifesto pages where the page needs one continuous argument rather than a card roster. Do not use it as a generic text block on product pages; side-by-side and rich-text cover those. |

## nav

| Block | What it is | How many items | When to use it |
|---|---|---|---|
| `anchor-nav` | Compact in-page anchor navigation rendered as icon pills. | items: 4-14 | Use near the top of long use-case or directory pages to jump to sections on the same page. Every anchor should match a real section id. |
| `comparison-grid` | Grid of comparison or alternative pages with short summaries and actions. | cards: 6-16 | Use on directory pages that route readers to alternative/comparison pages. Keep summaries one sentence and actions internal whenever possible. |
| `content-feed` | Product-native latest or curated content feed for future authored pages. | cards: 0-6 | Do not use for migrated source pages. Prefer news-insights for Acme-style editorial feed sections; reserve content-feed for a future generic product-native feed after its renderer and design are certified. |
| `faq` | Searchable or static FAQ list. | items: 4-10 | Use as the final support section when objections or SEO questions matter. |
| `news-insights` | Source-faithful AI Industry News and Insights section using the source guide-card/blog-card visual system. | cards: 0-6 | Use near the end of Acme marketing pages for the source-style related posts section. Preserve the news-insights root/header/grid classes and default title treatment; use latest posts unless the CMS supplies curated cards. |

## proof

| Block | What it is | How many items | When to use it |
|---|---|---|---|
| `agent-capabilities` | Source-faithful interactive capability carousel with a detail card, icon grid, connector drawing, and optional info note. | items: 4-10 | Use only for source `agent-capabilities` sections such as "What Your Agents Can Do". Preserve contentSide, autoplay settings, icons, rich descriptions, optional card images, and links. Do not replace this with feature-grid. |
| `agent-solutions` | Source-faithful expandable two-column agent solution card grid. | items: 4-10 | Use only for source `agent-solutions` sections. Preserve the two-column expandable card layout, source icon presets, optional custom icons, optional card links, and first-card active behavior. Do not replace this with feature-grid. |
| `capability-trio` | Source-faithful three-card capability diagram with a central workflow node and animated connector emphasis. | cards: 3-3 | Use for the homepage-style "Set Up, Test, and Launch Real Automation" trio: Deterministic workflow engine, Conversational AI, and Cognitive AI Agents. Keep exactly three cards and the central label; do not replace this with feature-rows or  |
| `conversation-replay` | One customer conversation replayed turn by turn across channels, with a channel rail, the actions the agent took in connected systems, and the record it created at the end. | turns: 4-8 | Use when the product claim is that one agent carries a single conversation across channels and finishes a real job. It is the strongest available substitute for a live demo, so give it one continuous story with a concrete outcome - not a fe |
| `difference` | Two-column contrast section showing ordinary tools versus Acme advantages. | - | Use when positioning needs a direct before/after or other-tools vs Acme contrast. Keep left and right item counts balanced. |
| `feature-rows` | Source-faithful flow block showing Acme platform capabilities or AI-builder workflow rows. | rows: 3-3 | Use when the page needs the visual flow section with three rows: Conversational AI, Autonomous Agents, and Workflow Automation, or the builder variant. Never replace this with feature-grid cards. |
| `feature-stack` | Source-faithful two-column proof section with formatted heading, stacked icon cards, and optional bottom info note. | cards: 3-3 | Use for source feature-stack sections explaining why an AI agent works differently: structured reasoning, validation, memory, or similar proof stacks. Preserve three stacked cards and the info note. Do not replace this with feature-grid. |
| `integrations-banner` | Dark source integrations banner with centered copy and horizontal app icon marquee. | items: 12-32 | Use only for migrated source integrations-banner sections or dark integration proof bands. Preserve the centered title, description, app icon marquee, and mobile chips; do not replace this with logo-strip. |
| `live-in-days` | Source-faithful launch reassurance card with short setup copy, decorative circuit art, and icon labels. | items: 4-4 | Use directly after a hero when the page needs to reassure non-technical operators that launch/setup is fast and low-friction. Do not replace it with capability-strip on source-migrated pages. |
| `logo-grid` | Categorized integration or partner logo grid with optional labels and links. | columns: 3-4 | Use when showing connected software by category, including migrated source logos-grid sections. Preserve column headings, primary and secondary logos, labels, sub-labels, optional URLs, and row alignment; prefer 4 columns with 4-6 recogniza |
| `logo-strip` | Trust marquee with optional customer logos and metric stats. | stats: 3-4 | Use as a social-proof band on industry and product pages. Keep the title compact; stats should be short values with one-line labels. |
| `media-showcase` | Single product visual with a short title and one supporting line, used for "X in Action" sections. | - | Use for the "your agent in action" slot when a static product visual is the honest answer and no interactive story is available. It is the cheapest way to show the product, so prefer it over inventing a new demo block. Choose conversation-r |
| `metrics` | KPI/stat proof section with short values and explanatory captions. | items: 3-6 | Use only for product-native metric sections. Do not use as a silent alias for source results-stats or stats-cards folders unless the source contract has been proven identical. |
| `pain-points-comparison` | Challenge-versus-solution table for pain points and AI-agent responses. | rows: 4-6 | Use when a service/industry page needs to spell out operational pain points and the matching AI agent capability. Keep each row parallel: concrete challenge on the left, practical solution on the right. |
| `pricing-details` | Detailed pricing tables for credits, workflow nodes, conversations, knowledge base, channels, or competitor comparison. | sections: 1-5 | Use after pricing cards when readers need mechanics. Keep table labels short; use comparison variant only for competitor/pricing-rating tables. |
| `pricing-policy` | Pricing policy callouts and explanatory note for billing rules or credit policy. | callouts: 2-4 | Use near pricing tables for concise billing-policy statements. Keep callouts short and reserve the info note for caveats. |
| `recovery-calculator` | Three-input interactive estimate that turns the visitor\ | controls: 3-3 | Use once per page, on pages where the buying decision is arithmetic the operator already does in their head. Keep exactly the three controls (missed volume, average value, conversion share): more inputs read as a quote form and fewer read a |
| `results-stats` | Source-faithful results-stats section with measured values, rich descriptions, and an optional evidence note. | items: 4-4 | Use when the source block is results-stats. Preserve one value plus one rich description per card, keep the source title line breaks/gradient spans, and do not collapse this into metrics. |
| `security` | Source-faithful security and compliance section with left shield visual and security proof cards. | cards: 4-4 | Use for security, privacy, compliance, audit, and data-protection proof sections. Keep four cards unless the source/design explicitly changes. Do not replace this with feature-grid. |
| `stats-cards` | Source-faithful stats-cards section with icon, heading, value, and compact label per card. | items: 4-5 | Use when the source block is stats-cards or when a new proof section needs icon + heading + KPI value + label. Do not collapse this into metrics because metrics lacks source headings/icons. |
| `tabs-showcase` | Interactive workflow examples with tabs and step-by-step process flows. | tabs: 3-4 | Use when several workflow scenarios need the same structured sequence treatment. Keep tabs scenario-specific and steps short; prefer 5 steps unless the real process needs fewer or more. |
| `testimonials` | Customer quote carousel or static proof section with author metadata. | items: 2-6 | Use when named customer proof supports conversion. Keep quotes specific and avoid anonymous praise unless no better evidence exists. |
| `use-case-flow` | Static multi-column process flow for use-case scenarios. | columns: 2-4 | Use when showing parallel use-case flows or scenario paths. Keep each column to 4-6 short operational steps. |

## roster

| Block | What it is | How many items | When to use it |
|---|---|---|---|
| `capability-strip` | Compact strip of named platform capabilities with icons and short labels. | items: 3-6 | Use for compact icon/label capability rows when there are no KPI values and not enough copy for feature cards. Use metrics for measurable proof and feature-grid for card-level explanations. |
| `capability-tools` | Source-faithful capability card grid showing the concrete integration tools involved in each workflow. | cards: 3-12 | Use when each capability needs an explicit roster of connected tools or integrations. Preserve card and logo order plus extraTools counts. Do not replace this with functional-capabilities or feature-grid. |
| `channels-grid` | Source-faithful channel card grid with two-column cards, block-local icons, preview media, and optional wide final cards. | cards: 5-5 | Use for "every channel your customers/candidates/prospects use" sections. Preserve the explicit route-specific card order, fullWidth flags, channel media, and gradientText substring. Do not replace this with feature-grid. |
| `coverage-grid` | Source-faithful service coverage grid with header copy and two-column icon cards. | cards: 6-8 | Use for source coverage-grid sections listing service lines, trades, locations, or operational coverage. Preserve the block-specific two-column card layout and preset icons. Do not replace this with feature-grid. |
| `feature-grid` | Source-faithful feature card grid with optional centered header, 2/3/4-column layout, and gradient preset icons. | cards: 3-8 | Use only for migrated acme/feature-grid sections or newly authored sections that intentionally match that source card grid. Preserve background, 2/3/4-column choice, preset icons, and optional custom icons. Do not use it for source bl |
| `functional-capabilities` | Source-faithful workflow capability card grid with sales, service, recruiting, and channels presets. | cards: 5-10 | Use for "what the agent handles/runs/automates" sections. Pick preset channels only for cross-channel delivery cards; otherwise choose the closest sales/service/recruiting workflow. Preserve wide cards and channel labels when present. Do no |
| `industry-expertise` | Interactive expertise tabs for industries, platform capabilities, or capability groups with optional preview media. | items: 5-6 | Use on industry and use-case pages when several capabilities need richer explanation than cards. Choose capabilities mode for platform mechanics, industry mode for vertical lists, and platform mode for product feature tabs. |
| `use-cases-grid` | Source-faithful use-case card grid with preset block-local icons, optional custom icons, and 3/4-column source layout. | cards: 4-9 | Use for industry/use-case/capability card rosters that match the source use-cases-grid visual: centered title, optional description, large gray cards, and 3 or 4 columns. Do not replace this with feature-grid. |

