# Page Generation Review Checklist

Use before accepting AI-generated `PageDocument` content.

- The JSON validates against `pageDocumentSchema`.
- The page uses only product-native fields from `packages/blocks/src/schemas.ts`.
- No WordPress, ACF, Gutenberg, PHP, shortcode, REST, source-folder, or legacy field names appear.
- No source-origin, dev-origin, `/wp-content/uploads/`, CDN runtime, or local absolute media paths appear.
- Links are internal relative paths or explicitly approved external destinations.
- Images use localized `/assets/...` paths or existing CMS media descriptors.
- `root.anchor` values are unique.
- Every `anchor-nav.items[].anchor` resolves to another block `root.anchor`.
- There is at most one hero block, and it appears first when present.
- CTAs are not adjacent and use approved destinations.
- Published pages include SEO title/description coverage.
- Missing proof, media, taxonomy, testimonials, or form details are recorded in `docs/migration/open-questions.md` instead of invented.
