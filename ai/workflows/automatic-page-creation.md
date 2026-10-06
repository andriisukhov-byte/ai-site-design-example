# Automatic Content Creation

Use this workflow to create a future product-native landing page, feature page,
use case, post, guide, news item, or tip from an approved brief. It is
product-native content authoring, not source-block migration. The workflow can
automate the draft, validation, import, and QA; publishing remains an explicit
approval step.

Use `ai/prompts/page-creation.md` as the copyable AI-agent prompt for this
workflow.

## Outcome and Boundaries

Each run produces a versioned batch with:

- a page brief;
- valid `PageDocument` JSON for one of the supported collections;
- a navigation-change plan when the page needs a menu link;
- dry-run, import, and QA evidence.

Use only blocks already registered in `packages/blocks/src/registry.ts`. Do not
invent a new block, visual variant, testimonial, statistic, integration, or
customer claim. Record a missing approved asset, claim, proof point, or block
capability in `docs/migration/open-questions.md`.

If the requested page must reproduce a source-era design or needs a new source
block, stop this workflow and start `blocks-migration-session-start.md` first.

## Supported Content Types

Select the type before composition. The collection and template must match;
never create a new collection or template just for a single page.

| Content type                          | Collection  | Template                          | Canonical route and required content                                                                                                      |
| ------------------------------------- | ----------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Landing, feature, company, comparison | `pages`     | `landing` or `standard`           | `/<slug>/`; a product page arc using approved blocks and CTAs.                                                                            |
| Industry or use case                  | `use-cases` | `industry-use-case` or `use-case` | `/<slug>/`; audience, workflow, handoffs, safeguards, and FAQ when questions are approved.                                                |
| Post                                  | `posts`     | `article`                         | `/<slug>/`; `publishedAt` on publication, `articleMeta`, and one or more `rich-text` blocks with reviewed editorial copy.                 |
| Guide                                 | `guides`    | `guide`                           | `/guide/<slug>/`; `publishedAt` on publication, `articleMeta`, reviewed step-by-step `rich-text`, and only verified product instructions. |
| News                                  | `news`      | `news`                            | `/news/<slug>/`; `publishedAt`, reviewed announcement copy, and optional `articleMeta`.                                                   |
| Tip                                   | `tips`      | `tip`                             | `/tips/<slug>/`; concise reviewed `rich-text`, optional `tipCard`, and optional `articleMeta`.                                            |

Posts, guides, news, and tips are editorial content. Do not manufacture dates,
authors, statistics, product behavior, customer quotes, screenshots, or links
to make an article look complete. Keep them as `draft` when the editorial
brief, claims review, or approved assets are incomplete.

## 1. Provide a Ready Brief

Create a folder for the batch, using a durable identifier:

```text
data/ai-page-generation/<batch-id>/
  brief.md
  pages.json
  navigation.json
  review.md
```

`brief.md` must contain the following before composition begins:

```md
# <Page title>

- Canonical route: `/example-ai-agent/`
- Content type: `landing`, `feature`, `use-case`, `post`, `guide`, `news`, or `tip`
- Collection and template: the matching pair from Supported Content Types
- Audience and problem: who this page serves and what repeated workflow it improves
- Primary outcome: the approved promise, without unverified metrics
- Approved proof: links to approved copy, research, customer proof, and local assets
- Required topics: the questions, handoffs, integrations, and safeguards to cover
- Primary CTA and secondary CTA: approved destinations only
- SEO: approved meta title, meta description, and canonical route
- Navigation: `none` or the exact menu/item that should link to the page
- Editorial fields for post, guide, news, or tip: approved publication date, author, category, tags, table-of-contents decision, and reviewed body copy
- Publication decision: `draft` or `published` after named reviewer approval
```

Routes must start and end with `/`. Confirm the route is not already owned by a
published document before writing. A new page starts as `draft` unless a named
content owner has approved publication in the brief.

## 2. Prepare the Local Environment

Start the entire local stack with one command:

```sh
npm run dev
```

Wait for the CMS at `http://localhost:3000/admin` and the frontend at
`http://localhost:4321`. The root command waits for Payload before Astro so a
new run does not fail on the initial content fetch.

Read these files before an AI agent composes page data:

- `ai/instructions/page-compose.md`
- `ai/checklists/page-generation-review.md`
- `packages/blocks/src/schemas.ts`
- `packages/blocks/src/registry.ts`
- `docs/migration/open-questions.md`

## 3. Compose the Page Batch

Ask the authoring agent to write `pages.json` in this shape:

```json
{
  "pages": [
    {
      "contentKey": "ai-page:<stable-key>",
      "collection": "use-cases",
      "path": "/example-ai-agent/",
      "title": "Example AI Agent",
      "excerpt": "Approved concise summary.",
      "status": "draft",
      "template": "industry-use-case",
      "seo": {
        "metaTitle": "Example AI Agent | Acme",
        "metaDescription": "Approved SEO description.",
        "canonicalUrl": "/example-ai-agent/"
      },
      "blocks": []
    }
  ]
}
```

The schema is the authority for the actual block fields. Keep the composition
within the approved brief and use the page arc from `page-compose.md`. All
first-party media must be local `/assets/...` paths or existing CMS media
descriptors. Do not add source-origin URLs, source-platform terms, CDN URLs, or
local machine paths.

For an editorial document, change the collection/template and add its editorial
metadata. For example, a guide uses the `guides` collection and `guide`
template:

```json
{
  "collection": "guides",
  "path": "/guide/example-workflow/",
  "title": "How to Build an Example Workflow",
  "status": "draft",
  "template": "guide",
  "articleMeta": {
    "category": "How-to Guides",
    "tags": ["Workflow"],
    "showTableOfContents": true
  },
  "seo": {
    "metaTitle": "How to Build an Example Workflow | Acme",
    "metaDescription": "Approved guide description."
  },
  "blocks": [
    {
      "type": "rich-text",
      "title": "How to Build an Example Workflow",
      "html": "<p>Reviewed editorial copy.</p>"
    }
  ]
}
```

Set `publishedAt` only when an editor has approved the publish date. Use the
same article structure for posts and news with their matching collection and
template; use `tips`/`tip` and `tipCard` when a tip needs its archive metadata.

For a page that should appear in the primary navigation, create
`navigation.json` in this shape:

```json
{
  "operations": [
    {
      "menuLabel": "Use Cases",
      "itemLabel": "Example workflow",
      "href": "/example-ai-agent/"
    }
  ]
}
```

The menu and item must already exist. Navigation automation updates a link; it
does not create or redesign menu structure.

## 4. Validate Before Any Write

Run the import in dry-run mode. This validates every `PageDocument` and reports
the intended create/update actions without changing Payload:

```sh
npm run cms:upsert -- --file data/ai-page-generation/<batch-id>/pages.json --target local
```

If there is a navigation plan, validate it too:

```sh
npm run cms:navigation -- --file data/ai-page-generation/<batch-id>/navigation.json --target local
```

Resolve every validation failure. Then apply the page-generation review
checklist manually: claims are supported, CTA targets are approved, SEO is
present, assets are local, and page blocks contain no unsupported shapes.

## 5. Approve and Apply

A content owner must approve the rendered draft and its publication status.
Only after that approval, write the batch:

```sh
npm run cms:upsert -- --file data/ai-page-generation/<batch-id>/pages.json --target local --write true
```

Apply approved navigation separately:

```sh
npm run cms:navigation -- --file data/ai-page-generation/<batch-id>/navigation.json --target local --write true
```

For a remote CMS, replace `--target local` with `--target api` and provide the
approved API URL and token through the deployment environment; do not put a
token in the batch files or repository.

## 6. Verify the Rendered Result

Open every new route at:

```text
http://localhost:4321/<route>/
```

Check page title, section order, CTAs, menu link, images, mobile layout, and
browser console. For posts, guides, news, and tips also verify publication
metadata, archive placement, rich-text headings, and table of contents where
enabled. Then export the current CMS snapshot and run the required gates:

```sh
npm run cms:export
npm run qa:page-contract
npm --workspace @acme/web run build
npm run qa:no-inline-block-styles
npm run qa:no-hotlinks
npm run qa:links
npm run qa:route-coverage -- --out data/source/route-coverage-report.json
```

For a new visual composition or a high-traffic route, also capture the route
with the relevant browser/visual QA command and record the result in
`review.md`. A failed gate blocks publication until it is fixed or a product
decision is recorded in `docs/migration/open-questions.md`.

## 7. Record and Hand Off

`review.md` must include:

- batch id, routes, content owner, and approval date;
- source of every approved claim and asset;
- page and navigation dry-run/write output;
- URLs reviewed and viewport(s) used;
- commands run and their results;
- deferred decisions recorded in `docs/migration/open-questions.md`.

Commit the batch JSON, navigation plan, and review evidence together. Do not
commit secrets, raw source exports, or local media caches.

## Existing Use-Case Batch

`npm run cms:generate-use-cases` regenerates the current predefined use-case
batch at `data/ai-page-generation/use-case-pages.json`. It is useful for
reproducing that known set, not for inventing future pages. New work must use a
new `<batch-id>` folder and the generic `cms:upsert` flow above.
