# Prompt: Product-Native Page Creation

Copy this prompt and replace every value in angle brackets.

```text
Create a new product-native Acme content document.

Before you begin, read:
- ai/workflows/automatic-page-creation.md
- ai/instructions/page-compose.md
- ai/checklists/page-generation-review.md
- packages/blocks/src/schemas.ts
- packages/blocks/src/registry.ts
- docs/migration/open-questions.md

Brief:
- Title: <page title>
- Route: </example-ai-agent/>
- Content type: <landing | feature | use-case | post | guide | news | tip>
- Collection and template: <pages/landing | pages/standard | use-cases/use-case | use-cases/industry-use-case | posts/article | guides/guide | news/news | tips/tip>
- Audience: <who the page serves>
- Problem: <the repeated customer or operational problem>
- Primary outcome: <approved value proposition, without unsupported metrics>
- Required topics: <intake questions, workflow steps, handoffs, safeguards, integrations>
- Approved proof and assets: <approved source links and local asset paths, or "none">
- Primary CTA: <label> -> <approved URL>
- Secondary CTA: <label> -> <approved URL>
- SEO title: <title | Acme>
- SEO description: <approved description>
- Navigation: <none, or menu -> existing menu item -> route>
- Editorial metadata for post, guide, news, or tip: <approved publication date, author, category, tags, table-of-contents decision>
- Reviewed editorial body for post, guide, news, or tip: <approved rich-text outline or copy; do not invent facts>
- Publication status: <draft | published after named reviewer approval>

Create this batch:
1. data/ai-page-generation/<batch-id>/brief.md
2. data/ai-page-generation/<batch-id>/pages.json
3. data/ai-page-generation/<batch-id>/navigation.json when navigation is requested
4. data/ai-page-generation/<batch-id>/review.md

Use only existing product-native blocks and schema fields. Do not invent a new
block, metric, customer, testimonial, integration, claim, or image. Use only
local /assets/... paths or existing CMS media descriptors. Do not emit source-
platform terms or URLs, CDN URLs, or local machine paths.

For a post, guide, news item, or tip, use the matching collection/template,
add `articleMeta` as approved, and create one or more reviewed `rich-text`
blocks. Use `/guide/<slug>/` for guides and `/news/<slug>/` for news. Add
`publishedAt` only after an editor approves the actual publication date.

Start with dry runs only:
- npm run cms:upsert -- --file data/ai-page-generation/<batch-id>/pages.json --target local
- npm run cms:navigation -- --file data/ai-page-generation/<batch-id>/navigation.json --target local

Do not run a command with --write true until I explicitly approve the rendered
draft and publication status.

Return the files created, dry-run results, preview URLs, validation commands,
and all unresolved questions.
```

## Filled Example: HVAC Agent

```text
Create a new product-native Acme page.

Before you begin, read:
- ai/workflows/automatic-page-creation.md
- ai/instructions/page-compose.md
- ai/checklists/page-generation-review.md
- packages/blocks/src/schemas.ts
- packages/blocks/src/registry.ts
- docs/migration/open-questions.md

Brief:
- Title: AI Agent for HVAC Companies
- Route: /hvac-ai-agent/
- Collection: use-cases
- Audience: owners and operations teams at HVAC companies
- Problem: slow inquiry handling, lost context, and manual service scheduling
- Primary outcome: the agent accepts inquiries, collects details, determines urgency, and hands the request to the right person
- Required topics: service type, address, equipment, urgency, operator handoff, and visit scheduling
- Approved proof and assets: none
- Primary CTA: Get Started Free -> https://app.acme.example/signup
- Secondary CTA: Book a Demo -> #popup-open-popupRequestDemo
- SEO title: AI Agent for HVAC Companies | Acme
- SEO description: Automate HVAC inquiry intake, collect service details, and route every request to the right next step.
- Navigation: Use Cases -> HVAC -> /hvac-ai-agent/
- Publication status: draft

Create this batch:
1. data/ai-page-generation/hvac-agent/brief.md
2. data/ai-page-generation/hvac-agent/pages.json
3. data/ai-page-generation/hvac-agent/navigation.json
4. data/ai-page-generation/hvac-agent/review.md

Use only existing product-native blocks and schema fields. Do not invent a new
block, metric, customer, testimonial, integration, claim, or image. Use only
local /assets/... paths or existing CMS media descriptors. Do not emit source-
platform terms or URLs, CDN URLs, or local machine paths.

Start with dry runs only:
- npm run cms:upsert -- --file data/ai-page-generation/hvac-agent/pages.json --target local
- npm run cms:navigation -- --file data/ai-page-generation/hvac-agent/navigation.json --target local

Do not run a command with --write true until I explicitly approve the rendered
draft and publication status.

Return the files created, dry-run results, preview URLs, validation commands,
and all unresolved questions.
```
