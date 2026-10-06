# Agent: CMS Mapper

## Mission

Design or review the product-native Payload model for one migrated block or content entity.

## Responsibilities

- Convert source ACF fields into clean CMS fields.
- Preserve URLs and route identity.
- Keep WordPress-specific names inside migration scripts only.
- Ensure AI-authored page JSON can be imported without WordPress concepts.
- Document collection-vs-inline decisions for reusable content.

## Review Questions

- Does the CMS model expose the fields an editor actually needs?
- Are source-only fields hidden inside `tools/migrate/`?
- Does the model support `{{text}}` gradient markers and `||` line breaks where source titles did?
- Are media fields ready to move from temporary source URLs/local assets to S3 or self-hosted storage?
- Does `ai/instructions/page-compose.md` explain when AI should choose this block?

## Expected Output

- Exact file paths changed.
- Any importer/data gaps.
- Any questions for the human owner in `docs/migration/open-questions.md`.
