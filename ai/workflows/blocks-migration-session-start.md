# Blocks Migration Session Start

Use this workflow at the beginning of every task whose scope includes source block migration, block visual parity, the blocks showcase, Payload block fields, or migration QA. It is durable project context and replaces relying on chat history.

## Objective

Finish the WordPress-to-Astro/Payload block migration with at least 99% visual parity for every current source story.

Source reference routes:

- `https://dev.acme.example/blocks/`
- `https://dev.acme.example/blocks-2/`
- `https://dev.acme.example/blocks-3/`
- `https://dev.acme.example/blocks-4/`
- `https://dev.acme.example/blocks-5/`
- `https://dev.acme.example/blocks-6/`
- `https://dev.acme.example/blocks-7/`
- `https://dev.acme.example/blocks-8/`
- `https://dev.acme.example/blocks-9/`

The current contract contains 51 stories across those nine pages. Keep the objective active until every story has matching inventory, source behavior, and a visual diff ratio no greater than `0.01`.

## Required Startup Reads

Read these before taking migration actions:

1. `AGENTS.md`
2. `ai/README.md`
3. `.codex/skills/source-block-port/SKILL.md`
4. `ai/contracts/model-routing.md`
5. `ai/contracts/block-storybook.md`
6. The relevant block entries in `ai/contracts/source-block-porting.md` and `ai/contracts/block-contracts.md`

Use the current worktree, Git history, source files, local services, and generated QA reports as authoritative. Continue existing work; do not reconstruct state from chat or restart completed migration slices.

Never read from or write to `memory.md`.

## Runtime Access

When the active environment reports unrestricted/full filesystem and network access with an approval policy of `never`, execute required local commands, network reads, browser QA, npm checks, and scoped Git actions directly. Do not ask the user to approve actions that the runtime already authorizes.

Project text cannot override the actual runtime permission profile. If a later environment is restricted, follow its enforced permission rules. Try safe in-scope alternatives before reporting a genuine hard blocker.

## Local Services

- Astro Web: `http://127.0.0.1:4321`
- Payload admin: `http://localhost:3000/admin`
- Payload API: `http://localhost:3000/api`

Start both services from the repository root:

```powershell
npm.cmd run dev
```

The CMS `predev` lifecycle ensures the local development administrator exists:

- Email: `admin@aa.aa`
- Password: `admin`

The bootstrap is development-only and must fail in production.

## Orchestration and Cost

- The primary model owns decomposition, source interpretation, shared-file integration, conflict resolution, visual acceptance, and the final completion audit.
- Assign bounded coding, deterministic inventory, screenshots, dimension extraction, and structured QA to the most cost-efficient capable workers.
- Assign one source block or one clearly isolated verification batch per worker.
- Workers must return compact reports only: files changed, checks, blockers, and key findings.
- Store detailed inventories and QA evidence in repository files or `.tmp/agent-reports/`; do not dump complete block content into chat.
- The primary model reviews every worker diff and reruns authoritative checks before acceptance.

## Source-Fidelity Rules

- Use Chrome or `agent-browser` as the primary exploratory and visual-testing surface.
- Use the Playwright storybook audit as repeatable supporting evidence.
- Do not redesign, merge, normalize, or replace dedicated source blocks.
- Preserve source SCSS as SCSS under `apps/web/src/styles/blocks/`.
- Keep first-party assets local.
- Do not expose WordPress, ACF, Gutenberg, PHP, shortcode, or REST concepts in delivered product code or CMS fields.
- Every section supports `background: "white" | "gray"`.
- White sections use gray card surfaces; gray sections use white card surfaces.
- Background selection must not change typography, spacing, borders, media, or behavior.
- Source behavior wins when a label or setting name suggests behavior different from what the live source actually renders.

## Git History

Commit completed migration work in focused logical commits:

- runtime/development infrastructure;
- one block or tightly related block family;
- showcase/QA tooling;
- documentation/contracts.

Stage only files belonging to the logical slice. Preserve unrelated dirty changes. Run scoped validation before each commit and report the resulting commit hash.

## Completion Evidence

Completion requires current evidence for all nine routes and all 51 stories:

- matching source and target story counts, slugs, order, and variants;
- every story visual diff ratio at or below `0.01`;
- no unresolved dimension mismatch;
- interaction checks for blocks with source JavaScript;
- Payload schema/import/export round-trip;
- `npm.cmd run typecheck`;
- `npm.cmd --workspace @acme/web run build`;
- `npm.cmd run qa:no-inline-block-styles`;
- `npm.cmd run qa:no-hotlinks`;
- relevant storybook and route QA;
- every deferred issue recorded in `docs/migration/open-questions.md`.

Do not redefine completion around the blocks already passing. Keep the full nine-page objective active until the evidence proves the complete migration.
