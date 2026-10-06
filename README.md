# Acme — the marketing site, explained for people

> 🇷🇺 **Читаете по-русски?** Тот же документ на русском: **[README.ru.md](README.ru.md)**.

This file is written so that anyone opening the repository for the first time can follow it: a developer, a marketer, or a manager. Without jargon wherever jargon can be avoided.

---

## 1. What this is

This is the website of Acme — the one that sells AI agents. It used to run on WordPress. Here it is rebuilt from scratch on a different stack.

The idea the whole thing was started for: **pages should be assembled from ready-made bricks, not laid out from scratch every time.** A brick is called a "block" — for example a hero section, a card grid, a pricing table, an FAQ, a testimonials section. There are 47 of them today.

A second idea follows from the first: if a page is just a list of blocks with text in them, then it can be assembled by someone other than a designer working with a front-end developer. It can be assembled by the person who simply wrote down what they want. Or by an AI reading that text. The second half of this document is about that.

---

## 2. What it consists of

Three programs that run at the same time and talk to each other.

**Payload CMS** (`apps/cms`) — the admin panel and the database. This is where editors edit copy, images and pages. Runs on port **3000**. Underneath it sits PostgreSQL, where everything is physically stored.

**Astro** (`apps/web`) — the site itself. Takes content from the CMS and turns it into the HTML a visitor sees. Runs on port **4321**.

**Form API** — a small service that receives form submissions from the site. Port **8787**.

How they connect:

```
PostgreSQL  →  Payload CMS  →  REST API  →  Astro  →  HTML in the browser
   (data)        (:3000)        (/api)      (:4321)
```

Read it like this: the data lives in Postgres. Payload exposes it through the admin panel and through an API. Astro calls that API at `http://localhost:3000/api`, fetches the pages, and renders them.

**The detail everyone trips over:** the API address must end in `/api`. Plain `http://localhost:3000` will not work — Astro will not find any content.

---

## 3. How a page is built

Every page is a record in the database with a route (`/ai-receptionist/`), a title, SEO fields, and **a list of blocks**. A block is an object with a type and some content:

```json
{
  "type": "hero",
  "eyebrow": "AI Receptionist for Cleaning Companies",
  "title": "Turn Every Missed Call ||{{ Into Booked Jobs }}",
  "description": "One sentence about what the agent does.",
  "primaryAction": { "label": "Get Started Free", "href": "/signup" }
}
```

From there the chain is simple:

1. A visitor opens `/ai-receptionist/`.
2. The file `apps/web/src/pages/[...slug].astro` catches any route and asks the CMS: what lives at this address?
3. The CMS returns the list of blocks.
4. The file `apps/web/src/components/BlockRenderer.astro` is **the dispatcher**. It looks at each block's `type` and calls the matching component: `hero` → `HeroBlock.astro`, `faq` → `FaqBlock.astro`, and so on.
5. The component renders the HTML.

That is the answer to "how does it call things": **by the `type` field**. No magic — an ordinary lookup table from block name to component.

Two markers you can write directly inside headings:

- `{{ word }}` — render the word with the brand gradient;
- `||` — force a line break.

To see all 47 blocks live: `http://localhost:4321/blocks`, then `/blocks-2` … `/blocks-9`.

---

## 4. First run

You need **Node.js 22.13+** and **PostgreSQL** (`brew install postgresql@15`). No Docker needed.

```sh
npm run setup   # once: dependencies, a private database in .pgdata, env files, content and every generated page
npm run dev     # every time: CMS, site and form API
```

`npm run setup` is safe to re-run. If port 5432 is taken by another Postgres: `PGPORT=5544 npm run setup`.

After it starts:

- admin: http://localhost:3000/admin, login `admin@aa.aa`, password `admin` (local development only);
- site: http://localhost:4321

If Postgres stopped (after a reboot): `LC_ALL=en_US.UTF-8 /opt/homebrew/opt/postgresql@15/bin/pg_ctl -D ./.pgdata start`.

To confirm it works, the startup log must contain

```
[content] Loaded 336 pages from Payload at http://localhost:3000/api
```

Images of the legacy content are not part of this example (media lives outside the repo), so some pictures on older pages are blank. Generated pages and blocks are not affected.

### Alternative: everything in Docker

```sh
cp .env.docker.example .env.docker
npm run docker:local:setup   # once
npm run docker:local:up
```

Inside Docker the API address is different — `http://cms:3000/api`, because the services see each other by service name. It is already set in `docker-compose.local.yml` and does not need changing.

---

## 5. What lives where

```
apps/
  cms/        Payload CMS: admin panel, collections, database migrations
  web/        Astro: pages, block components, styles, scripts
packages/
  blocks/     THE SHARED LANGUAGE OF BLOCKS — the most important place in the repo
  styles/     design tokens: colours, fonts, spacing, radii
  config/     shared settings (for example how the signup link is composed)
  ui/         small reusable UI elements
tools/
  cms/        content import and export
  migrate/    data transfer from the old site
  qa/         quality checks (~30 scripts)
  agents/     AI agent orchestration
  dev/        local development helpers
  deploy/     asset upload
ai/
  contracts/  the copy rules, the approved facts, the block contracts
  instructions/  composition law: which block for what
  prompts/    prompts for the AI agents
  marketing-skills/  what is handed back to the marketing team
  docs/       decision write-ups, dated
.claude/      skills: the procedures the AI follows
data/
  cms/        content snapshots (pages.json — 361 documents)
  source/     migration artifacts from the old site
  ai-page-generation/  output of page-generator runs
docs/         write-ups and documentation
infra/        infrastructure
```

### About `packages/blocks` — why this is the important place

This holds the shared vocabulary that the CMS, the site and the AI all rely on:

- **`schemas.ts`** — which fields each block has and what counts as valid. JSON that fails the schema never reaches the database.
- **`registry.ts`** — **the block catalog**: each block's role, its ideal number of items, and `aiGuidance`, a note on when to reach for this block and when not to.
- **`categories.ts`** — how blocks are grouped.
- **`payload.ts`** — translation between Payload's format and the internal one.

Remember one thing: **`registry.ts` is the system's eyes.** A block can exist in the schema, have a working component, and stand on live pages — but if it is missing from the registry, the page generator cannot see it and will assume no such block exists. The system got burned by exactly this once (write-up: [docs/page-generation-v3](docs/page-generation-v3/README.ru.md), in Russian).

---

## 6. The AI page-generation system

This is the second half of the project. The goal: a marketer describes in plain text what page they need, and gets a finished draft in the admin panel. With no designer and no front-end developer in the middle.

### Two tracks, and the difference matters

**Track A — the copy already exists.** The marketing team writes landing page copy with its own Claude skills, which carry a mature rule set: a banned-word list in three tiers of strictness, five blocks of "write like a human, not like a machine", locked product facts, a length limit per field, and sourced pain data per industry. Their output is a document with numbered sections (`## S1 - Hero`, `## S4 - Pain Points`), saved into the page batch as `lp.md`.

On this track **the copy is an input, not a draft.** The system carries those words into page sections byte for byte. It does not shorten them, re-voice them, tidy the punctuation, or "refine" them. If a line does not fit the section it was written for, the system does not fix the line - it produces a **fit report**: the measured length, the section's real limit, and the options, one of which is always "use a different section". The author decides, always.

That guarantee is checked, not promised: `npm run qa:copy-fidelity` compares every line of `lp.md` against the built page and fails on any difference, down to a dropped comma.

**Track B — there is no copy yet, only a task.** Then the system writes the copy itself, and holds itself to the same rule set, because there is no human author to defer to.

### How to invoke it

In Claude Code, inside the repository:

```
/create-page      create a page from text
/create-block     design a new block (only when there is genuinely no way around it)
```

The system then asks a handful of questions in plain language: what the page is about, who it is for, what we promise, where we send people, whether it needs a menu link.

### What happens inside

**Phase 0 — environment check.** Are the CMS and the site alive, and is content coming from the right place.

**Phase 1 — the brief.** Questions, and choosing the route. The route is checked against three sources: the running CMS, the snapshot in `data/cms/pages.json`, and similar synonym addresses. Because the local database is sometimes older than the snapshot, and "not in the CMS" does not yet mean "the page does not exist".

**Phase 2 — assembly.** The system reads the block catalog, the composition rules, the schemas, the components, and one or two live pages of the same type as a reference. Then it fills in a table: for each section, which block we take and why.

This is where **the reuse rule** applies. A new block is an exception. To create one, all three conditions must hold at once:

1. no existing block covers the role of this section;
2. the section brings a new **mechanism** — interactivity, a data structure, a way of presenting something (different icons or a different background do not count as a mechanism);
3. the block will be useful on at least two more future pages.

At most one new block per page.

**Phase 2.5 — the copy.** Three modes, and which one applies is decided by where the text came from, not by how good it looks.

- **Transported verbatim.** Track A. Every field with a counterpart in `lp.md` is copied byte for byte. The only thing the system may add is markup the renderer needs, and only where the document asked for it: a gradient highlight, a deliberate line break. No word changes.
- **Mechanical gap fill.** Sections need fields the copy document has no slot for: step labels like "Days 1-3", icon choices, image descriptions the author left out. The system writes those, and lists every one of them in the batch report under "Written by the pipeline" for the author to approve or replace. Never a headline, never a description, never a CTA label - if one of those is missing, that is a fit report, not a gap fill.
- **The system writing for itself.** Demo content for a new block, and the block showcase. There is no author's copy there by definition, and this is the only place the copywriting agent still runs - with a clear head and nothing but the writing rules, because an agent holding schemas, component traps and delivery gates at the same time writes in a dead language.

The rule set is the marketing team's, mirrored into the repository with a version line so the two cannot drift silently. On top of it sits one addition from this side: the rule layer of the **ASD-STE100 (Simplified Technical English)** standard - one term per concept, no more than 20 words per sentence, active voice with a named actor, present tense, no more than three nouns in a row. And a clause that outranks clarity: never strip the promise out of a section, or the page turns into a manual and stops selling.

**Phase 3 — validation.** A dry run of the validator until it comes back clean, plus the copy gate: `npm run qa:copy` checks everything in the rule set a script can decide - banned words, dashes, lengths, locked CTA labels, locked plan names, stats used twice, certifications that do not exist, and any figure that is not in the approved-facts file or the brief. It reports and never edits, and its report says plainly what it cannot check, so nobody mistakes it for the whole job.

**Phase 4 — import and acceptance.** The page is imported **as a draft**, screenshots are taken on desktop and mobile, the checks run, and then a **separate reviewer agent** — one that did not build the page and is looking for what is wrong with it. This is not a formality: on every run so far the reviewer found blockers that self-review had missed.

**Phase 5 — handover.** Links and a list of loose ends. **Publishing is always a human action**, a button in the admin panel.

### Where the rules live

| File | What is in it |
|---|---|
| `.claude/skills/create-page/SKILL.md` | the page-creation procedure, both tracks |
| `.claude/skills/create-block/SKILL.md` | the new-block procedure |
| `ai/instructions/page-compose.md` | which block for what, the page arc, the CTA policy, the reuse policy |
| `ai/contracts/copy-rules.md` | **the writing rules — the only copy rule set in the repository.** Mirrored from the marketing team's skill, with a version line |
| `ai/contracts/copy-data.md` | the facts a page is allowed to state: sourced pain data per industry, integration stacks, channel order, cost anchors, approved category definitions, the competitor list |
| `ai/contracts/lp-handoff.md` | how marketing copy becomes a page: the three modes, the fit report, and which section maps to which block |
| `ai/contracts/block-contracts.md` | block contracts and shared presentation rules |
| `ai/marketing-skills/` | what goes back to the marketing team: an add-on skill for their own tooling, plus a short patch list |
| `ai/prompts/copy-refiner.md` | the writing agent's prompt — now only for content the system writes for itself |
| `ai/checklists/page-generation-review.md` | the acceptance checklist |

One deliberate choice in that table: the rules exist **once**. Nothing else in the repository restates a copy rule, everything points at `copy-rules.md`. The marketing team learned this the hard way - their own skills each bundled a copy of the shared rules, the copies went stale, and three wrong rules survived a whole version because of it.

---

## 7. Commands

There are 87 scripts in the project. These are the ones people actually use.

### Running and building

| Command | What it does |
|---|---|
| `npm run dev` | bring up everything: CMS, site, form API |
| `npm run dev:cms` | CMS only |
| `npm run dev:web` | site only |
| `npm run build` | production build |
| `npm run typecheck` | type checking |
| `npm run lint` | linter |
| `npm run format` | reformat the code |

**Worth memorising separately:** after **any** change to block structure in Payload, start the CMS like this:

```sh
PAYLOAD_DB_PUSH=true npm --workspace @acme/cms run dev
```

Otherwise the database never learns about the new fields and they get silently dropped. Important: such changes must be **additive only**. If one pass both adds and removes something, the migration asks an interactive question that nobody is there to answer in an automated run.

### Content

| Command | What it does |
|---|---|
| `npm run cms:upsert -- --file <file> --write false` | check a page file, writing nothing |
| `npm run cms:upsert -- --file <file> --write true` | import the pages into the CMS |
| `npm run cms:export` | export content from the CMS |
| `npm run cms:snapshot` | take a snapshot |
| `npm run cms:navigation` | update the site menu |
| `npm run cms:media-usage` | report on which images are used where |

The `--write false` flag is a fitting: the system tells you whether everything is in order but changes nothing. Always start there.

The importer needs an access token:

```sh
PAYLOAD_API_TOKEN=<token> npm run cms:upsert -- --file <file> --write true
```

**Careful:** the importer matches a page by address **within the collection you declared**. Name the wrong collection and instead of an update you get a duplicate on a live address.

### Quality checks

| Command | What it checks |
|---|---|
| `npm run qa:block-registry` | that the block catalog, the schemas and the components agree |
| `npm run qa:copy` | the writing rules, over a page batch. Add `--brief <batch>/brief.md` or every figure the brief introduced reads as unsourced. `--legacy` turns it into a survey that never fails |
| `npm run qa:copy-fidelity` | that the author's copy reached the page unchanged, and which strings on the page the author did not write |
| `npm run qa:keyword-collision` | whether the route or the keyword already belongs to another page |
| `npm run qa:links` | broken links |
| `npm run qa:media` | broken images |
| `npm run qa:seo` | SEO fields |
| `npm run qa:no-inline-block-styles` | that styles are not written inside components |
| `npm run qa:no-hotlinks` | that nothing links to foreign domains (needs a build) |
| `npm run qa:content` | content health |
| `npm run qa:launch-readiness` | overall launch readiness |

Two checks — `qa:block-root-attrs` and `qa:html-structure` — expect a static build, while this site renders dynamically. They emit hundreds of `missing-built-html` messages, and those are not errors but a quirk. Do not be alarmed.

`npm run ai:block-catalog` regenerates the plain-language block catalog that ships inside the marketing add-on skill. Run it whenever a block is added, otherwise the marketing side keeps writing against a stale list of what the site can render.

### Migration from the old site

The `migrate:source:*` group transfers data from WordPress. It is a one-off exercise and is not needed in day-to-day work. The old site and the database dump are here purely as **an import source**: the new schemas, components and everything else do not depend on WordPress.

---

## 8. How people usually work

**Fix copy on an existing page.** Through the admin panel at http://localhost:3000/admin. No code involved.

**Create a new page.** Run `/create-page`, answer the questions, wait for the draft, look at it, publish with the button in the admin panel.

**Change how a block looks.** A block's styles live in `apps/web/src/styles/blocks/_<name>.scss` and are imported inside the component. There must be no inline styles and no `<style>` tags in components — `qa:no-inline-block-styles` enforces that. Colours, sizes and spacing come from the tokens in `packages/styles`, not from numbers typed in place.

**Add a new block.** Run `/create-block`. But first check honestly whether an existing block with different content already covers the job — nine times out of ten it does. Registering a new block takes ten steps across different files, and skipping any one of them leaves the block either failing validation, or not rendering, or invisible to the generator.

---

## 9. Traps that cost people time

- **Drafts do not open on the site** — they return 404. To look at one, the page has to be published temporarily and then put back into draft.
- **The `hero` block:** if the `eyebrow` field is filled in, then the eyebrow becomes the `<h1>` and the visible headline drops to an ordinary paragraph. This is deliberate — it is how the keyword lands in the `<h1>` on industry pages. But you have to verify the result in the rendered HTML, not in the data.
- **The `faq` and `security` blocks:** `title` and `titleGradient` render as two separate lines, and the second one sits outside the heading. If a keyword belongs in the heading, it has to be in the first field.
- **The `logo-grid` block** drops items that carry only text without a link or an image: the importer treats them as incomplete.
- **The `channels-grid` block** substitutes unrelated placeholder images when its own are missing. Always supply the images.
- **The brand gradient** passes through a near-black stop and disappears on dark panels. On those blocks it is overridden with a solid colour.
- **Never enable autoplay** on anything that changes readable text unless a visible stop control sits next to it. That is an accessibility requirement, not a matter of taste.
- **Screenshots** should be taken with Playwright from the repository root, and the page must be scrolled with pauses first: otherwise reveal animations and lazy images do not have time to appear and you get empty blocks.

---

## 10. Where to look next

- [README.ru.md](README.ru.md) — this same documentation in Russian.
- [CLAUDE.md](CLAUDE.md) — a short cheat sheet with all the traps.
- [ACME-WEBSITE-DESIGN-WORKFLOW.md](ACME-WEBSITE-DESIGN-WORKFLOW.md) — the full design and page-creation process.
- [AGENTS.md](AGENTS.md) — migration rules.
- [docs/page-generation-v3/README.ru.md](docs/page-generation-v3/README.ru.md) — how the page generator works and what was fixed in it most recently.
- [docs/page-generation/README.ru.md](docs/page-generation/README.ru.md) and [v2](docs/page-generation-v2/README.ru.md) — write-ups of the earlier runs, with screenshots.
- [ai/marketing-skills/README.md](ai/marketing-skills/README.md) — what goes back to the marketing team, and the four edits their own skills need.
- `ai/README.md` — how the AI side is organised.

---

## 11. Preview environment and deployment

The project has a shared preview environment on DigitalOcean:

- site — `https://preview.example.com`
- admin panel — the same address with `/admin`
- API — the same address with `/api`

What it is made of: Astro and Payload as two separate App Platform services built from images in the container registry; a managed PostgreSQL database; a Spaces bucket for media files; HTTPS and routing handled by the platform, with no separate Nginx; form submissions going straight to Formspree, with no form service.

An important property: **publishing content in Payload does not rebuild the site.** Astro reads the CMS at request time and keeps a short cache. So you publish, and a few seconds later it is visible, with no deploy.

Project identifiers, database credentials, Spaces credentials and the preview admin credentials live locally in `.env.digitalocean.local`. That file does not go into Git and must never do so.


## 12. Forms

Forms on the site submit only to the address in `PUBLIC_FORM_ENDPOINT` (locally `/api/forms/submit`). The form service stores every accepted submission in Payload and, where configured, forwards the relevant intents to Formspree.

What needs configuring: the same `FORM_SUBMISSION_SECRET` in the CMS and form service environments, and `FORM_PAYLOAD_API_URL` pointing at the CMS. Formspree addresses live **only** in the server-side `FORMSPREE_ENDPOINT_*` variables and never reach the browser.

## 13. Payload MCP for Codex

The MCP configuration points Codex at `http://localhost:3000/api/mcp`. The order of operations: create a unique `PAYLOAD_MCP_API_KEY` in `apps/cms/.env`, create the matching key in the admin panel (**Payload Admin → MCP → API Keys**), and expose it to new Codex processes:

```sh
launchctl setenv PAYLOAD_MCP_API_KEY "$(awk -F= '/^PAYLOAD_MCP_API_KEY=/{print $2}' apps/cms/.env)"
```

Codex needs restarting afterwards. The local key should only be granted the collections and operations that are actually needed.

## 14. Repository rules

- Do not commit raw production dumps or any secrets.
- Commit only sanitised derived import artifacts.
- Use `cms:upsert` for generated content rather than writing separate push scripts per page.
- Do visual comparison with deterministic Playwright checks, and send only the ambiguous cases to AI review.

## 15. If you are continuing in a new chat

Use `CLAUDE.md` and `START-HERE.md` as the first handoff files: together they hold how to run the stack, the hard rules, and where the skills, contracts and example batches live.
