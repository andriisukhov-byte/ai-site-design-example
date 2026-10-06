---
name: payload-page-create
description: Create, update, validate, and publish Acme marketing pages through the typed Payload page builder and Payload REST API. Use when marketing needs a new landing, industry, or use-case page from a brief; when an AI agent must compose approved blocks and create the CMS document; or when replacing legacy WordPress page-creation automation.
---

# Payload Page Create

Create an editable, product-native `PageDocument`, then write it through Payload. Never generate source-platform markup or fields.

## Workflow

1. Read `ai/instructions/page-compose.md`, `packages/blocks/src/registry.ts`, and the relevant schema in `packages/blocks/src/schemas.ts`.
2. Create a complete page JSON document. Start new pages as `draft` unless publication is explicitly requested. Give each page a stable `contentKey`, canonical trailing-slash `path`, product-native `template`, SEO title and description, and unique block anchors where used.
3. Choose existing source-faithful blocks by content shape. Do not invent assets, testimonials, statistics, compliance claims, or integrations. Record missing proof or media in `docs/migration/open-questions.md`.
4. Validate before writing:

```sh
npm run cms:upsert -- --file path/to/page.json
```

5. Upsert through the Payload REST API (the default target). Provide `PAYLOAD_API_URL` and a scoped `PAYLOAD_API_TOKEN`; do not put tokens in JSON or source control:

```sh
npm run cms:upsert -- --file path/to/page.json --write true --target api
```

For a local acceptance test only, use `--target local`. The command is idempotent by collection and canonical path and verifies that Payload maps the response back to a valid page document.

6. Export and check the result, then inspect the published route when publication was requested:

```sh
npm run cms:export
npm run qa:payload-roundtrip -- --source path/to/page.json --cms data/cms/pages.json --scope-source-paths true
npm run qa:page-contract
npm --workspace @acme/web run build
npm run qa:route-coverage
```

Read [references/marketing-brief.md](references/marketing-brief.md) before composing from an incomplete brief.

## Navigation owned by editors

Use Payload Admin → **Site settings** → **Primary navigation** to add the new canonical path. Editors may add a standard link or a mega menu item, choose its existing icon name, and set headings, columns, rows, or the bottom “all” link. The frontend reads this global from Payload; the checked-in configuration is only a safe fallback when the CMS is unavailable.

When the user requests menu placement in the same prompt, have the agent generate a navigation-plan JSON and run it after the page upsert:

```sh
npm run cms:navigation -- --file path/to/navigation.json --write true --target api
```

The plan contains `menuLabel`, `itemLabel`, and the page’s canonical `href`; it updates the existing menu item idempotently through Payload rather than modifying frontend code.

## Non-negotiable rules

- Use only the Payload block fields and local `/assets/` or approved media paths.
- Do not use WordPress, ACF, Gutenberg, PHP, shortcodes, source URLs, or hotlinked media.
- Keep one hero first, avoid adjacent CTAs, and provide SEO before publishing.
- Treat an API write as incomplete until export, schema validation, and route checks pass.
