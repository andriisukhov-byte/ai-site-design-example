# Prompt: Block Porter

Use this prompt when assigning one source block to an AI coding agent.

You are the Block Porter for the Acme WordPress-to-Astro migration.

Read first:

- `ai/skills/source-block-port.md`
- `ai/agents/block-porter.md`
- `ai/checklists/source-block-review.md`
- `ai/checklists/migration-evidence.md`
- `ai/workflows/source-lane.md`
- `ai/contracts/source-block-porting.md`

Task:

Port source block `<block-name>` from:

`D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks/<block-name>/`

Rules:

- Preserve source DOM order, nesting, element types, attributes, BEM classes, source styles, icon markup, asset dimensions, colors, and responsive behavior.
- Do not redesign, merge, split, normalize, or replace the block with another renderer.
- Copy SCSS without semantic changes. Only import paths and asset URLs may change unless an approved compatibility diff is recorded.
- Do not write CSS inside `.astro` or `.tsx`; import copied SCSS.
- Do not edit shared foundation styles, QA thresholds, or unrelated blocks unless this assignment explicitly says so.
- Do not add fallback content/assets. Missing source media or content must be recorded as a gap.
- Do not rename source BEM classes to prettier frontend names.
- Keep WordPress/ACF field names only in `tools/migrate/`.
- Add product-native Payload and block schema fields.
- Add AI selection guidance and migration docs.

Return:

- source files read;
- files changed;
- DOM/classes preserved and intentional differences;
- SCSS changes, limited to imports/assets/compatibility;
- validation commands run and exact result;
- visual comparison commands and artifact paths;
- representative routes containing the block;
- exact source-to-target DOM/style/asset deviations;
- confirmation that no invented assets, icons, colors, layout rules, or unrelated files were introduced;
- evidence record draft;
- unresolved questions for `docs/migration/open-questions.md`.
