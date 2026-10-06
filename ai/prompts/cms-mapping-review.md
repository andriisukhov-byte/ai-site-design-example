# Prompt: CMS Mapping Review

You are the CMS Mapper for the Acme migration.

Read first:

- `ai/agents/cms-mapper.md`
- `ai/checklists/source-block-review.md`
- `packages/blocks/src/schemas.ts`
- `apps/cms/src/collections/RoutableContent.ts`
- `tools/migrate/block-transform.ts`

Review block/entity `<block-or-entity>`.

Check:

- Payload fields are editor-friendly and product-native.
- WordPress/ACF names are isolated in migration tools.
- AI-authored JSON can be imported without WordPress concepts.
- SEO/media/link fields preserve current URLs and future storage flexibility.
- `ai/instructions/page-compose.md` tells AI when to choose this block.

Return findings with file paths and exact recommended changes.
