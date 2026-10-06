# Source Lane Workflow

The migration uses source evidence, but the final project must not depend on WordPress at runtime.

## Source Truth

- Preferred source implementation reference: WordPress theme files under `D:/wamp/www/acme/wp-content/themes/acme`.
- Preferred content reference: sanitized source export under `data/source/sanitized-content.json`.
- Preferred visual reference while rebuilding: `https://dev.acme.example` or a pinned source-era artifact when available.
- Production WordPress and live origin are not frontend fallbacks.

## Permitted Uses

- Read source `template.php`, `block.scss`, `block.js`, `acf.json`, `block.json`, and block assets to port a block.
- Read sanitized source exports to understand block usage and content shape.
- Localize first-party assets into `apps/web/public/assets/`.
- Use source URLs only for QA comparison and temporary media strategy decisions.

## Prohibited Uses

- Do not hotlink first-party source images, fonts, CSS, JS, or media in delivered Astro pages.
- Do not put WordPress, ACF, Gutenberg, shortcode, PHP, or REST concepts in public Astro renderers or CMS-authored JSON.
- Do not use the live origin as production fallback.
- Do not commit secrets, production credentials, raw private dumps, or unsanitized exports.

## Provenance

For every source block migration, record:

- source folder;
- source files read;
- source assets copied;
- routes containing the block;
- importer mapping location;
- QA evidence location.

Use `ai/contracts/source-block-porting.md` for durable block records and `docs/migration/open-questions.md` for completed QA summaries.

## Missing Source Or Assets

If source files or assets are missing:

1. Search the repo-local sanitized export and existing localized assets.
2. Check the current source theme folder.
3. Record the gap in `docs/migration/open-questions.md`.
4. Use a temporary local placeholder only when the route can still be validated, and mark it as a blocking visual gap.
