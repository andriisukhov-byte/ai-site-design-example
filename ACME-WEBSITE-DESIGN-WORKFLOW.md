# Acme Website — Design Workflow

How a page gets made on this site: from a sentence a marketer writes to a reviewed draft in Payload, and how a genuinely new design block gets grown into the library when the existing 45 are not enough.

This file is the entry point. It explains the pipeline, the skills, the agents, the traps, and the parts that are still missing. Everything described here exists in this repository and has been run end to end.

---

## 1. What this is for

Two different jobs, deliberately kept separate:

| Job | Track | Output |
|---|---|---|
| "I need a page about X" | **`create-page`** | A draft page in Payload, composed from blocks that already exist |
| "The library cannot express what this page needs" | **`create-block`** | A new block, designed inside the design system and registered everywhere |

The rule that keeps the site coherent: **a page is a new combination of existing blocks and new copy.** Design work happens on the `create-block` track, under review, and only when a page genuinely cannot be built otherwise. A page never invents a visual on the fly.

The second rule, which decides every argument: **on content the brief wins; on design the design system wins.** A brief can dictate the topic, the keywords, the tone and the claims. It cannot dictate a visual the system does not have.

---

## 2. What the system is built on

Most of the machinery predates this workflow. The skills orchestrate it rather than replacing it.

| Piece | Path | Role |
|---|---|---|
| Block catalog | `packages/blocks/src/registry.ts` | 45 block types with `role`, `idealItems` and `aiGuidance` — the per-block instruction that tells the composer when to use it and when not to |
| Schemas | `packages/blocks/src/schemas.ts` | zod schema per block plus `pageBlockSchema` / `pageDocumentSchema`. Nothing reaches the CMS without validating |
| Categories | `packages/blocks/src/categories.ts` | Heroes / Grids / Proof / Content / Conversion / Navigation |
| Composition law | `ai/instructions/page-compose.md` | Which block for which section, what never to substitute, title markers |
| Block ledger | `ai/contracts/block-contracts.md` | Per-block contract: origin, schema, renderer, styles, stories, status, open gaps |
| Importer | `tools/cms/upsert-content.ts` (`npm run cms:upsert`) | Validates and writes page JSON into Payload. Dry-run first |
| Renderers | `apps/web/src/components/blocks/**` (53 files) | One Astro component per block, plus the `uc-*` template family |
| Renderer map | `apps/web/src/components/BlockRenderer.astro` | Block type → component, and the `root.className` template swaps |
| Showcase | `apps/web/src/pages/blocks*` + `apps/web/src/data/block-story-fixtures.ts` | Every block rendered in isolation across 9 pages |
| Content snapshot | `data/cms/pages.json` | 361 published documents. The reference for voice, structure and prior art |

Title formatting conventions, used everywhere: `{{ ... }}` marks the gradient words, `||` forces a line break, no HTML in titles.

---

## 3. The skills

Both live in `.claude/skills/` and are committed, so anyone opening this repo in Claude Code gets them.

### `create-page`

Invoked by describing a page in plain language, or with `/create-page`. Six phases:

1. **Environment** — confirm the local stack answers, start it if not.
2. **Brief** — a couple of human questions (who is it for, what do we promise, which CTA, does it need a menu link). SEO and structure are proposed, not asked. Writes `brief.md` into a batch folder.
3. **Composition** — reads the registry, the composition law, the schemas, the renderer of every chosen block, and one or two live sibling pages. Produces `pages.json`.
4. **Validation** — `cms:upsert --write false` until clean.
5. **Import and inspect** — import as draft, publish locally for QA, screenshot every block on desktop and mobile, then run the gate ladder.
6. **Handover** — process report in `review.md`, links, open items. Publishing stays a human decision.

### `create-block`

Invoked when the library falls short. Six phases: intent → design (loads the `impeccable` skill for methodology, but bound to this site's tokens) → **explicit human approval** → registration → QA → handover. The registration checklist is section 6 below; a half-registered block breaks page generation, so it is all-or-nothing.

---

## 4. The agents

The skills do the work in the main conversation. Three kinds of subagent are spawned around it, because each needs a fresh context and an independent point of view.

| Agent | When | What it is given | What it returns |
|---|---|---|---|
| **Competitor research** | Before designing anything new | The product, the audience, a named list of competitors to check | Per-page teardown: what each leads with, section order, interactive elements, proof, and explicitly: what every page has, what no page has, which objections they ignore. Statistics marked verified or not |
| **Design-pattern research** | Same stage | The design system's constraints and the kind of component being considered | Buildable patterns with layout, motion, failure modes; accessibility rules; what to avoid as dated |
| **Independent reviewer** | Before anything is called done | Page JSON, brief, the verbatim task spec, block code, all screenshots, the composition law | `APPROVED` or `CHANGES REQUIRED` plus numbered findings with severity, exact location and a concrete fix |

The reviewer is not optional and not a formality. On the two pages built so far it returned `CHANGES REQUIRED` both times and found, between them: a wrong `<h1>`, a page that already existed on a supposedly free route, four fields silently dropped by a schema, a calculator whose visible formula did not produce its printed number, three WCAG contrast failures, and a typecheck that was failing. Self-review found none of those.

Give the reviewer the task spec **verbatim** and tell it to be adversarial. A reviewer asked to summarise will summarise.

---

## 5. The pipeline, end to end

```
brief (human)
  → route check: running CMS + data/cms/pages.json + nav + synonym routes
  → is this a new page or a revision?
  → section-by-section block mapping against registry aiGuidance
  → [if the library falls short → create-block track → back here]
  → write pages.json
  → cms:upsert --write false          (schema gate)
  → cms:upsert --write true           (imports as draft)
  → publish locally for QA only
  → screenshot every block, desktop + mobile
  → gate ladder: schema · render · H1 · links · media · review
  → review.md, then back to draft
  → human publishes in Payload
```

### The gate ladder

Each gate is pass/fail. "Almost" is a fail.

| Gate | How |
|---|---|
| Schema | `npm run cms:upsert -- --file <batch>/pages.json --write false` |
| Render | Page returns 200; every section present in the HTML, not just the screenshot |
| H1 | `curl` the page and read the `<h1>` — see the hero trap in section 7 |
| Links | Every internal href resolves; distinguish page links from pre-existing nav gaps |
| Media | No broken image; no hotlink outside the approved media host |
| Types | `npm --workspace @acme/web run typecheck` — 0 errors |
| Styles | `npm run qa:no-inline-block-styles` |
| Hotlinks | `npm run qa:no-hotlinks` (needs a production build first) |
| Review | Independent reviewer returns `APPROVED` |

`qa:block-root-attrs` and `qa:html-structure` expect a static build. This site is SSR (`output: 'server'`), so `dist` contains no HTML files and both report hundreds of `missing-built-html` findings that mean nothing. Do not chase them.

---

## 6. Registering a new block

All ten, in this order. Skipping any one leaves the block invisible to some part of the system.

1. **Schema** — `packages/blocks/src/schemas.ts`: the zod object, plus add it to the `pageBlockSchema` union.
2. **Registry** — `packages/blocks/src/registry.ts`: `type`, `role`, `description`, `idealItems`, and `aiGuidance` written as instructions ("use for X, never for Y, do not substitute Z"). This is what the page composer reads.
3. **Category** — `packages/blocks/src/categories.ts`.
4. **Payload** — `apps/cms/src/collections/RoutableContent.ts`: the `Block` config, and add it to the `routableBlocks` array. Then push the schema (section 7).
5. **Renderer** — `apps/web/src/components/blocks/<Category>/<Name>Block.astro`.
6. **Styles** — `apps/web/src/styles/blocks/_<name>.scss`, imported *inside the component*. No inline styles, no `<style>` blocks — there is a QA gate for this.
7. **Behaviour** — `apps/web/public/assets/blocks/<name>/<name>.js`, loaded with `<script is:inline … defer>`. Content must be complete and readable before the script runs; the script only enhances.
8. **Renderer map** — `apps/web/src/components/BlockRenderer.astro`: import plus an entry in `componentByType`.
9. **Showcase** — `apps/web/src/data/block-story-fixtures.ts`: add the slug to `sourceBlockStoryOrder`, and a fixture in `apps/web/src/data/fixtures/<name>-source.ts` using `pageBlockSchema.parse({...})` — that is the repo convention and it also launders literal types. Note the last showcase page is a hardcoded slice; extend it or new stories never render.
10. **Documentation** — a contract in `ai/contracts/block-contracts.md` and a usage paragraph in `ai/instructions/page-compose.md`. Undocumented blocks get misused by the next run, including by a future agent.

---

## 7. Traps, all of them found the hard way

**The hero promotes the eyebrow to `<h1>`.** In `HeroBlock.astro` and `HeroExtendedBlock.astro`, `titleTag = block.eyebrow ? 'p' : 'h1'` — so whenever an eyebrow exists, the eyebrow becomes the `<h1>` and the headline becomes a paragraph. This is the template's mechanic, not a bug: every industry page puts the keyword phrase in the eyebrow for exactly this reason. Always verify the rendered `<h1>` rather than assuming.

**Industry pages use `hero`, not `hero-extended`.** `hero-extended` is the homepage template. The industry template is: eyebrow = keyword phrase, title = headline with `||` and `{{ }}`, one description sentence, two CTAs with notes, `mediaSize: wide`, no subtitle. Match the siblings.

**A route is only free when it is absent from three places.** The running CMS (all collections, with a token — drafts are invisible without one), `data/cms/pages.json` (a 361-page snapshot, newer and larger than the export the local DB is usually seeded from), and the site navigation, which links to routes that do not exist yet. Also check synonym routes: `/lead-qualification-agent/` and `/ai-lead-qualification/` are different pages competing for one keyword.

**Phrases in the brief that mean "revision", not "creation":** "fix source's …", "swap X, per prior request", or a section list that describes what is already on the page.

**`cms:upsert` matches by path only within the declared collection.** Wrong collection creates a duplicate document on a live route instead of updating it.

**The `uc-*` template family is undocumented.** `BlockRenderer.astro` swaps in six dedicated renderers based on `root.className`: `uc-hero`, `uc-features`, `uc-problem`, `uc-hiw`, `uc-impact`, `uc-onboarding`. Neither the registry nor the composition law mentions them. If a route has siblings, read their `root.className` and match the chain.

**`faq` and `security` split their heading across two fields.** `title` and `titleGradient` render as two separate lines. An inline `{{ }}` marker in `title` duplicates the word.

**`logo-grid` silently drops items that have only a `label`.** In `packages/blocks/src/payload.ts`, `cleanPayloadValue` treats a `{label}`-only object as an incomplete link and discards it. Give each item a `subLabel` or a `url`.

**Payload schema changes need a push, and the root dev script blocks it.** `npm run dev` hardcodes `PAYLOAD_DB_PUSH=false`, so a new block's tables never get created and every collection query 500s. Run `PAYLOAD_DB_PUSH=true npm --workspace @acme/cms run dev` once. Keep the change **additive**: adding and removing fields in the same push makes drizzle ask "created or renamed?" interactively, and that prompt cannot be answered from a background process.

**The brand gradient dies on dark.** `--gradient-gold` passes through `#200000`, invisible on the near-black panel. Override `.ca-gradient-text` to solid amber in dark variants — and note that `:global()` does nothing in these plain SCSS files; use a descendant selector.

**Astro reads env from the repo root.** `envDir` points at the root, where `.env.development` targets staging — so a local site silently serves staging content. A root `.env.development.local` fixes it. Confirm with the web log line `[content] Loaded N pages from Payload at <url>`.

**Drafts 404.** Astro serves only `status: published`. Publish locally for QA, then set it back — and do not hand over a link to a page you have just reverted.

**REST-created documents land as drafts** regardless of the `status` in the JSON, because the collections have versions enabled. Publish with `PATCH /api/<collection>/<id>?draft=false` and `{"_status":"published","status":"published"}`.

**Auto-playing anything is a WCAG 2.2.2 failure.** Auto-updating content that starts on its own needs a pause control, and that criterion has no short-duration exemption. Make it user-initiated instead — and keep the control on screen, because hiding the button the user just pressed throws away keyboard focus.

**Fixed-height cards need real copy.** `functional-capabilities` cards are `min-height: 341px`; one-line descriptions leave large empty boxes. `width: "wide"` spans two columns and closes a ragged final row.

**Blocks ship default images from other verticals.** `channels-grid` falls back to recruiting mockups. Always supply per-card images or check what the default actually shows.

---

## 8. Verification tooling

Browser-pane screenshots come back blank when the pane is hidden, which reads as a broken page. Use Playwright from the repo root instead:

- Import from `@playwright/test`; first run needs `npx playwright install chromium`.
- Scroll the whole page with short pauses before capturing, so reveal animations and lazy images resolve.
- Hide the dev toolbar and un-stick the header, or they land in element screenshots.
- Capture per block with `locator(selector).screenshot()` at 1440 and 390 wide. Slice tall full-page captures into ~1500px pieces with `sharp` — a downscaled full-page PNG hides every defect.
- Verify with text too (`curl` the HTML). Text catches a missing block more reliably than a screenshot.
- Exercise interactive blocks in Playwright: type into fields, switch radios, press Enter on buttons, and assert the numbers.

---

## 9. Artifacts

Every run leaves a batch in `data/ai-page-generation/<batch-id>/`:

- `brief.md` — the brief, the block mapping, and every interpretation decision with its reason
- `pages.json` — the importable page document
- `review.md` — gate results, the verdict, what was deviated from and why, open items

Existing batches: `2026-08-skill-smoke-test`, `2026-08-lead-qualification-agent`, `2026-08-ai-receptionist-cleaning-audit` (an audit of the live page, no changes made), `2026-08-ai-receptionist-cleaning-ai`, `2026-08-ai-receptionist-cleaning-v2`.

Walkthroughs with screenshots of every block, in English and Russian: `docs/page-generation/` (page built strictly to brief) and `docs/page-generation-v2/` (page built after competitor research, introducing two new blocks).

---

## 10. Local environment

```sh
# Postgres 15, product data dir; LC_ALL is required or it refuses to start
LC_ALL=en_US.UTF-8 /opt/homebrew/opt/postgresql@15/bin/pg_ctl -D ./.pgdata start

# once, and again after any Payload block change
PAYLOAD_DB_PUSH=true npm --workspace @acme/cms run dev

# normal day
npm run dev            # CMS :3000, Astro :4321, form API :8787
```

Local admin is `admin@aa.aa` / `admin`. A root `.env.development.local` must point `PAYLOAD_API_URL` at `http://localhost:3000/api`. Media binaries are not in the repo; `PUBLIC_MEDIA_BASE_URL` serves them from staging.

The local database was seeded from `data/source/cms-pages.json` (332 documents) and then published to match the source's intent. `data/cms/pages.json` holds 361 — treat that file, not the local DB, as the authority on what exists.

---

## 11. What the two new blocks are

Both were added because competitor research found a gap no existing block could fill. Full contracts are in `ai/contracts/block-contracts.md`.

**`conversation-replay`** — one customer conversation replayed across channels, with a channel rail, a note under each agent turn saying what it did inside a connected system, and the record it created at the end. Every competitor claims omnichannel; none of them shows one thread crossing channels. The replay is user-initiated and the full transcript renders without JavaScript.

**`recovery-calculator`** — three sliders plus a booking-frequency control, so a recovered lead is modelled as a recurring contract rather than a single job, which is a 15–20× difference in this vertical and what every competitor calculator gets wrong. It leads with a client count rather than a currency figure, shows the arithmetic, computes the money from the number the formula prints, and states what the estimate excludes. The default result is rendered server-side.

---

## 12. Not built yet

- **A content pipeline for editorial** (posts, guides, news, tips). A separate ClickUp-triggered system already exists in the product workspace: research → draft against knowledge-base rules → humanise → AI-detection gate at 70/100 → Google Docs back to the task. Its patterns worth reusing here are the single hard numeric gate, rules-as-a-tool rather than rules-in-a-prompt, and a process report shipped with the deliverable. To be specified separately.
- **A callable demo.** Research found this is the single most persuasive element in the category: a phone number a visitor can call to hear the agent. The `conversation-replay` block is the closest visual substitute; a real recording with a synced transcript would be stronger. Needs an approved asset.
- **Named customer proof.** Competitors in cleaning name 8–15 operators with company and city. Nothing here invents testimonials, so this stays an open gap until real ones are approved.
- **Menu automation.** Navigation is still edited by hand in Payload → Site settings. The nav currently links to routes that do not exist.
- **ClickUp as the trigger.** A task moving into a status could start the page pipeline and return the draft link to the task.

---

## 13. Reading order for someone new

1. This file.
2. `ai/instructions/page-compose.md` — the composition law.
3. `packages/blocks/src/registry.ts` — skim the `aiGuidance` of a dozen blocks to hear how block choices are argued.
4. `docs/page-generation-v2/README.md` — one build, block by block, with screenshots.
5. `.claude/skills/create-page/SKILL.md` — then run it on something small.
