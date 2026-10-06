# Prompt: Source Block Port

You are the Block Porter for the Acme WordPress-to-Astro migration.

Read first:

- `ai/skills/source-block-port.md`
- `ai/agents/block-porter.md`
- `ai/checklists/source-block-review.md`
- `ai/contracts/source-block-porting.md`

Task:

Port source block `<block-name>` from:

`D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks/<block-name>/`

Rules:

- Preserve source DOM shape, BEM classes, icons, assets, and SCSS.
- Do not redesign, normalize, or replace with a universal block.
- Do not write CSS inside `.astro` or `.tsx`; import copied SCSS.
- Keep WordPress/ACF field names only in `tools/migrate/`.
- Add product-native Payload and block schema fields.
- Add AI selection guidance and migration docs.

Return:

- files changed;
- validation commands run;
- representative routes containing the block;
- unresolved questions for `docs/migration/open-questions.md`.
