# Block Storybook QA

`dev.acme.example/blocks/` through `/blocks-9/` are the visual source of truth for source block stories while they are being curated. The matching local routes must mirror source story ids, order, variants, and representative content.

## Current State

- Local routes: `apps/web/src/pages/blocks/index.astro` and `apps/web/src/pages/blocks-2/` through `blocks-9/`
- Shared route renderer: `apps/web/src/components/BlockShowcasePage.astro`
- Current inventory: 51 stories over nine pages
- Source audit script: `tools/qa/blocks-storybook-audit.ts`
- Route inventory and current-source fixture map: `apps/web/src/data/block-story-fixtures.ts`

## Target State

Each local showcase page must render one story per matching source `section[id^="sec-"]`:

- same story slug after `sec-`;
- same order as source;
- same block variant/settings;
- same root anchor when relevant;
- same section-level visual isolation;
- full-page screenshots saved for source and target.
- visual diff ratio at or below `0.01` for every story.

## Story Naming

Examples:

- `sec-hero` -> `hero`
- `sec-hero-extended` -> `hero-extended`
- `sec-feature-grid-3-columns` -> `feature-grid` with `columns: 3`
- `sec-feature-grid-4-columns` -> `feature-grid` with `columns: 4`
- `sec-feature-rows-builder-variant` -> `feature-rows` with `variant: builder`
- `sec-cta-two-buttons` -> `cta` with both actions
- `sec-pricing-details-workflow-node-table` -> `pricing-details` workflow-node variant

## Validation Commands

```bash
npm run qa:blocks-storybook -- --source-base https://dev.acme.example --target-base http://127.0.0.1:4321 --source-password acme --route /blocks/ --threshold 0.01
npm run qa:no-inline-block-styles
npm run qa:no-hotlinks
npm run typecheck
```

Use `agent-browser` for exploratory visual review and triage when available, but keep deterministic Playwright checks for repeatable CI evidence.

Run the storybook command separately for `/blocks/`, `/blocks-2/`, ..., `/blocks-9/` until the audit supports a multi-route invocation.

## Failure Rules

- Missing local story is a failed migration for that source variant.
- Source content bugs are recorded separately and sent back to content/design cleanup.
- Visual mismatch must be assigned to the owning block agent, not patched globally unless the source foundation proves the shared style is wrong.
- Page-wide QA does not replace block-story QA.
- Interactive stories must be captured in a deterministic state (autoplay stopped and a documented initial item selected) on both source and target.
- Missing screenshots, skipped pixel diffs, inventory/order mismatches, or section dimensions differing by more than two pixels are failures and cannot certify parity.
