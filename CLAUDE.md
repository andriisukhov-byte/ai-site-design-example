# CLAUDE.md

Acme marketing site. Astro (`apps/web`, :4321) + Payload CMS (`apps/cms`, :3000) + form API (:8787). Node 22+.

Full design/page workflow: `ACME-WEBSITE-DESIGN-WORKFLOW.md`. Migration rules: `AGENTS.md`.

## Run locally

```sh
npm run setup                                           # first time only (PGPORT=5544 if 5432 is taken)
npm run dev                                             # normal
LC_ALL=en_US.UTF-8 /opt/homebrew/opt/postgresql@15/bin/pg_ctl -D ./.pgdata start   # if Postgres is down
PAYLOAD_DB_PUSH=true npm --workspace @acme/cms run dev   # after ANY Payload block change
```

Admin `admin@aa.aa` / `admin`. `npm run setup` writes `.env.development.local` with `PAYLOAD_API_URL=http://localhost:3000/api`; Astro reads env from the repo root. Verify: web log says `[content] Loaded N pages from Payload at <url>`.

## What this repo has

- 47 registered block types (`packages/blocks/src/registry.ts`, each with `aiGuidance`), zod schemas (`schemas.ts`), 53 renderers (`apps/web/src/components/blocks/`)
- Composition law `ai/instructions/page-compose.md`; block ledger `ai/contracts/block-contracts.md`
- **Copy law** `ai/contracts/copy-rules.md` (mirrored from the marketing team's `acme-lp-shared-rules`, v5.0) + approved facts `ai/contracts/copy-data.md` + transport contract `ai/contracts/lp-handoff.md`. Nothing else in the repo may restate a copy rule
- Importer `npm run cms:upsert -- --file <batch>/pages.json --write false|true`
- Showcase of every block: `/blocks` … `/blocks-9`
- `data/cms/pages.json` = 361-doc content snapshot (authority on what exists; the local DB is seeded from a smaller, older export)

## Two skills

`.claude/skills/create-page` — two tracks. **Track A** (copy already written by marketing, `lp.md` with `## S4 - …` section ids): map sections to blocks, transport text verbatim, fit-report on anything that does not fit, validate, import as draft. **Track B** (loose brief): compose, write the copy against `copy-rules.md`, same gates. The copy-refiner subagent now runs only on content the system writes for itself (new-block demo content, showcase fixtures).
`.claude/skills/create-block` — design a new block inside the design system → design-system gate → human approval → 10-step registration.

## Hard rules

- Content: the brief wins. Design: the design system wins. A brief cannot request a visual the system does not have.
- **Marketing copy is an input, not a draft.** Text from the LP skills is transported byte for byte. Never shorten, re-voice, re-punctuate, or "refine" it. Does not fit the block → fit-report to the author (measured number + block's real limit + options, one of which is always a different block), never a rewrite. Copy shorter than a block's floor is also a fit-report, not a licence to pad.
- Reuse-first. A new block needs all three: no registered block covers the section's role, it introduces a real new mechanism, and it is reusable on ≥2 future pages. Max 1 new block per page.
- Only registered blocks in `pages.json`. Never invent testimonials, stats, customers, integrations, or dates.
- New pages import as `draft`. Publishing is a human action in Payload.
- Block styles live in `apps/web/src/styles/blocks/_<name>.scss`, imported inside the component. No inline styles, no `<style>` blocks.
- Independent reviewer subagent before anything is called done. It found blockers on every page so far; self-review found none.

## Traps (all cost real time)

- **`<h1>`**: in `hero`/`hero-extended`, if `eyebrow` is set the *eyebrow* becomes the h1 and the title drops to `<p>`. Industry pages use this deliberately — keyword goes in the eyebrow. Always `curl` and check the rendered h1.
- **Industry pages use `hero`**, not `hero-extended` (that's the homepage template): eyebrow = keyword, title with `||` + `{{ }}`, one description sentence, 2 CTAs with notes, `mediaSize: wide`, no subtitle.
- **Route freedom** = absent from the running CMS (all collections, with a token — drafts are invisible without one) AND `data/cms/pages.json` AND the site nav (which links to routes that don't exist). Check synonym routes too.
- Brief phrases meaning *revision*, not creation: "fix source's…", "swap X, per prior request", a section list matching the live page.
- `cms:upsert` matches by path **within the declared collection** — wrong collection creates a duplicate on a live route.
- `cms:upsert` writes only the keys **present** in the JSON. Deleting a key does not clear the stored value — the document keeps it. `seo.robots: "noindex, nofollow"` survived a re-import that updated every other field, and `PUBLIC_SITE_NOINDEX` masks it in dev so the rendered HTML looks fine. Write the field empty, then verify against the API, not the file.
- Undocumented template family: `BlockRenderer.astro` swaps renderers on `root.className` (`uc-hero`, `uc-features`, `uc-problem`, `uc-hiw`, `uc-impact`, `uc-onboarding`). Match siblings.
- `faq` / `security`: `title` and `titleGradient` render as two lines; a `{{ }}` marker in `title` duplicates the word.
- `logo-grid` drops items that have only a `label` (`cleanPayloadValue` mistakes them for incomplete links) — add `subLabel` or `url`.
- Payload schema pushes must be **additive**; adding + removing fields in one push triggers an interactive drizzle prompt that can't be answered headlessly.
- Brand gradient dies on dark (`#200000` mid-stop) — override `.ca-gradient-text` to solid amber. `:global()` does nothing in these SCSS files.
- Drafts 404 on the site. Publish locally for QA via `PATCH /api/<collection>/<id>?draft=false` with `{"_status":"published","status":"published"}`, and don't hand over a link to a page you just reverted.
- Never autoplay revealing content — WCAG 2.2.2 has no short-duration exemption. User-initiated, and keep the control on screen (hiding it destroys keyboard focus).
- `functional-capabilities` cards are `min-height: 341px`; `width: "wide"` spans 2 columns to close a ragged row.
- `channels-grid` falls back to recruiting mockups — always supply per-card images.

## Gates

`cms:upsert --write false` · page 200 + all sections in HTML · rendered h1 · internal links · no broken media · `npm --workspace @acme/web run typecheck` (0 errors) · `qa:no-inline-block-styles` · `qa:no-hotlinks` (needs a prod build) · `qa:copy -- --file <batch>/pages.json --brief <batch>/brief.md` (0 blockers/majors, or every finding is an author-accepted fit-report item; it also flags any figure absent from `copy-data.md` and the brief) · `qa:copy-fidelity` on any page built from an `lp.md` · `qa:keyword-collision` before drafting · reviewer `APPROVED`.

`qa:copy` reports and never edits. `--legacy` turns it into a survey that never fails — the 361-doc snapshot has 1,201 blockers (780 em dashes, banned vocabulary, "Acme does X"), because the rules bind new and edited pages and the retrofit is a separate task.

`qa:block-root-attrs`, `qa:html-structure` and `qa:seo` expect a static build; this site is SSR, `dist` has no HTML, their hundreds of `missing-html` findings are noise. Verify SEO fields by `curl`ing the rendered page instead.

## Screenshots

Browser-pane screenshots return blank when the pane is hidden. Use Playwright from the repo root (`@playwright/test`, `npx playwright install chromium` once): scroll the page with pauses first, hide the dev toolbar, un-stick the header, capture per block at 1440 and 390, slice tall PNGs with `sharp`. Verify with `curl` text too.

## Two new blocks (built here)

`conversation-replay` — one conversation across channels + what the agent did in connected systems + the record created. `recovery-calculator` — 3 sliders + booking frequency, models a recovered lead as a recurring contract, leads with a client count, money computed from the number the visible formula prints, default result server-rendered.

## State

Batches in `data/ai-page-generation/`; walkthroughs with screenshots in `docs/page-generation/` and `docs/page-generation-v2/` (EN + RU).
The marketing side gets `ai/marketing-skills/` — an add-on skill `acme-lp-handoff` plus a 4-item patch list for their three `lp-creator-*` skills. Their bundled `references/acme-shared-rules.md` files are stale forks and should be deleted.
Open: `seo.schemaJson` renders but nothing generates `BreadcrumbList`/`Organization`/`SoftwareApplication`/`DefinedTerm`; no citation block for a Sources section (`rich-text` for now); no canvas screenshot asset; no approved testimonials; nav edited by hand; content pipeline for editorial not built.
