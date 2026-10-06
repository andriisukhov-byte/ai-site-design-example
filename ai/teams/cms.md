# CMS Agent Team

This team owns the product-native Payload contract, AI content import, media and SEO integrity, and CMS-to-runtime verification. The contract sources of truth are `packages/blocks/src/schemas.ts`, `packages/blocks/src/registry.ts`, `apps/cms/src/collections/RoutableContent.ts`, and `ai/instructions/page-compose.md`.

## Operating Rules

- Model editor-facing content with Payload collections and product-native fields. Keep migration-only translation in `tools/migrate/`.
- Delivered page JSON contains only the `pageDocumentSchema` contract: `contentKey`, `collection`, `path`, `title`, `excerpt`, `publishedAt`, `status`, `template`, `seo`, and `blocks`.
- Blocks must use schemas and registry entries from `@acme/blocks`; every block field must have an intentional Payload field and renderer contract.
- Do not emit source-platform concepts, legacy field names, source classes, or source APIs in delivered project content, schemas, prompts, or admin fields. Translation belongs at the import boundary only.
- Preserve stable identity, route paths, links, block order, media descriptors, and draft/published intent through every write and export.

## Roles

### CMS Orchestrator

- Assigns work, owns shared schema decisions, and keeps the contract audit fail-closed.
- Reviews changes to `RoutableContent`, block schemas, registry guidance, import tools, and generated types.
- Coordinates schema changes with importer, export, media, preview, and QA workers; records blockers and exact artifacts.
- Requires a current build revision and source-era identifier in certification evidence where the migration workflow requires them.

### Schema Mapper

- Maps each product concept to a product-native Zod schema, Payload field, and registry selection rule.
- Keeps required/optional fields, defaults, bounds, enum values, rich text markers, links, root attributes, and block order identical across schema and Payload.
- Chooses inline versus reusable collection data based on editor needs, reuse, identity, and import/roundtrip behavior.
- Regenerates Payload types after schema changes and verifies AI-authored JSON validates before any CMS write.

### Import/Roundtrip Worker

- Maintains the canonical AI upsert path: validate a complete product-native page document, resolve `contentKey`, upsert the intended collection/path, preserve `status`, then export and compare the result.
- Uses `npm run cms:upsert -- --file <path> --target <target>`; never creates page-specific import scripts.
- Confirms idempotency, stable `contentKey`, route uniqueness, block ordering, status, SEO, and media descriptors across repeated upsert/export cycles.
- Uses `npm run cms:export` and `npm run qa:payload-roundtrip`; reports field loss or normalization as a contract failure.

### Media/SEO Worker

- Ensures every media object has a localized `src`, stable `sourceId`/identity, meaningful `alt`, and known `width` and `height` where available.
- Keeps media under `public/assets/` or the approved product storage path; no origin or CDN hotlinks in delivered content.
- Maintains page-level SEO fields: `metaTitle`, `metaDescription`, `canonicalUrl`, `robots`, Open Graph title/description/image, Twitter title/description/image, and `schemaJson`.
- Runs media handoff/sync after content changes and flags missing, unsafe, or size-mismatched assets as blockers. Never silently substitutes media or metadata.

### CMS QA

- Tests schema validation, admin field parity, draft/published behavior, preview output, no-JS content, links, media, SEO, and export fidelity.
- Verifies that drafts are not treated as published routes, previews render the intended draft, and published output contains canonical metadata and localized media.
- Captures command, revision, route/collection scope, browser coverage where applicable, findings, and evidence paths. Missing evidence fails the audit.

### Admin Preview Worker

- Keeps Payload editors able to distinguish draft from published content and preview a draft by its product route without changing production content.
- Verifies preview uses the same block schemas and renderers as published output, with draft data isolated from public route generation.
- Checks preview links, route/path resolution, access behavior, SEO/media visibility, and responsive browser smoke; reports any preview-only rendering divergence.

## Contract Requirements

### Draft, Preview, and Publish

- New and AI-upserted documents default to `status: "draft"` unless publication is explicitly requested.
- `status` is limited to `draft` or `published`; `publishedAt` is preserved when supplied and is not invented by the importer.
- Public builds consume published content. Preview may read drafts through the approved Payload preview flow and must not make drafts publicly indexable.
- A publish operation must be deliberate, auditable, and followed by export plus route and browser checks.

### AI Upsert Workflow

1. Compose JSON using only `@acme/blocks`, `packages/blocks/src/schemas.ts`, `packages/blocks/src/registry.ts`, `ai/instructions/page-compose.md`, and product-native Payload fields.
2. Validate the complete document, including route, collection, status, SEO, block discriminators, required fields, bounds, links, and media descriptors.
3. Upsert by stable `contentKey` when present; otherwise use the approved route identity rules. Preserve drafts unless explicitly told to publish.
4. Export Payload content, run roundtrip and content/SEO/media checks, and inspect preview before marking the work complete.

## QA Commands

Run the focused checks for every CMS or block contract change:

```sh
npm run typecheck
npm run cms:export
npm run qa:payload-roundtrip
npm run qa:content
npm run qa:seo
npm run qa:media
npm run qa:page-contract
npm run qa:no-hotlinks
npm run qa:links
```

For renderer or preview changes, also run `npm run build`, `npm run qa:chrome`, `npm run qa:block-dom`, and `npm run qa:visual-smoke`. For launch or cross-system certification, run `npm run cms:snapshot` and `npm run qa:launch-readiness` after all prerequisite reports are current.

## Audit Checklist

- [ ] Payload fields and `packages/blocks/src/schemas.ts` agree on names, types, defaults, and requiredness.
- [ ] Registry and page-composition guidance explain when each block is valid.
- [ ] AI input is product-native, schema-valid, idempotent, and safe to upsert.
- [ ] Draft, preview, and publish behavior is verified separately.
- [ ] SEO fields, canonical behavior, and structured data survive export and render.
- [ ] Local media, alt text, dimensions, stable identity, and no-hotlink rules pass.
- [ ] Roundtrip, route, link, content, browser, and visual evidence is recorded; unresolved gaps block certification.
