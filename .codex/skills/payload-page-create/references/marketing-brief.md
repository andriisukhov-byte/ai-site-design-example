# Marketing and editorial content brief

Use this minimum brief when a content owner has not supplied full copy. It
covers product pages and editorial content; see
`ai/workflows/automatic-page-creation.md` for the complete authoring process.

- Content type and matching collection/template:
  - landing, feature, company, or comparison: `pages` / `landing` or `standard`;
  - industry or use case: `use-cases` / `industry-use-case` or `use-case`;
  - post: `posts` / `article`;
  - guide: `guides` / `guide`;
  - news: `news` / `news`;
  - tip: `tips` / `tip`.
- Canonical path and publication decision: `draft` by default, or `published`
  after named reviewer approval. Posts use `/<slug>/`, guides
  `/guide/<slug>/`, news `/news/<slug>/`, and tips `/tips/<slug>/`.
- Audience, job to be done, and approved outcome or editorial angle.
- Approved title, excerpt, SEO title, SEO description, and canonical route.
- Approved product facts, source links, customer proof, and local media.
- Required topics: integrations, legal/compliance constraints, safeguards, and
  human-handoff points where applicable.
- Primary and secondary conversion actions with approved destinations for
  marketing pages; navigation placement when a menu item must link to it.
- For posts, guides, news, and tips: reviewed rich-text body, author,
  publication date, category, tags, and table-of-contents decision. Do not set
  `publishedAt` until the date and publication have been approved.
- Content owner and named reviewer responsible for factual and publication
  approval.

If proof, a customer quote, a result metric, editorial metadata, approved copy,
or media is absent, omit it or keep the item as a draft. Do not manufacture it
to fill a block. Use the existing block catalog for page composition and keep
questions for the owner in `docs/migration/open-questions.md`.
