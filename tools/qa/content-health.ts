import { readFile } from "node:fs/promises";

import { pageDocumentSchema } from "@acme/blocks";

type CmsPagesExport = {
  generatedAt?: string;
  pages?: unknown[];
};

type Finding = {
  code: string;
  path?: string;
  message: string;
  sample?: string;
};

const cmsPagesPath = "data/cms/pages.json";
const sourceText = await readFile(cmsPagesPath, "utf8");
const cmsPages = JSON.parse(sourceText) as CmsPagesExport;
const findings: Finding[] = [];
const warnings: Finding[] = [];
const criticalRouteMinimumBlocks = new Map([
  ["/", 1],
  ["/pricing/", 1],
  ["/ai-agent-builder/", 1],
  ["/about/", 1],
]);

const mojibakePattern =
  /[\u0080-\u009f\ufffd]|\u00e2[\u0080-\u00ff\u2018-\u2122]|\u00c3[\u0080-\u00bf]|\u00c2[\u0080-\u00bf]/gu;
const forbiddenRuntimePatterns: Array<{
  code: string;
  pattern: RegExp;
  message: string;
}> = [
  {
    code: "wp-block-comment",
    pattern: /<!--\s*wp:/i,
    message: "WordPress block comments must not appear in CMS runtime JSON.",
  },
  {
    code: "wp-upload-hotlink",
    pattern: /https?:\/\/(?:www\.)?acme\.ai\/wp-content\/uploads\//i,
    message: "First-party upload URLs must be localized to project assets.",
  },
  {
    code: "wp-upload-path",
    pattern: /(?<![A-Za-z0-9.:/])\/wp-content\/uploads\//i,
    message:
      "Relative WordPress upload paths must be rewritten to local assets.",
  },
  {
    code: "wp-image-class",
    pattern: /\bwp-image-\d+\b/i,
    message: "WordPress image classes must be stripped from rich text.",
  },
  {
    code: "wp-caption-shortcode",
    pattern: /\[\/?caption\b/i,
    message: "WordPress caption shortcodes must be normalized before export.",
  },
  {
    code: "source-block-name",
    pattern: /\bacme\/[a-z0-9_-]+/i,
    message:
      "Historical source block names must not appear in CMS runtime JSON.",
  },
];

if (!Array.isArray(cmsPages.pages)) {
  findings.push({
    code: "missing-pages",
    message: `${cmsPagesPath} must contain a pages array.`,
  });
}

const seenPaths = new Set<string>();
const duplicatePaths = new Set<string>();
let validPages = 0;
let publishedPagesWithoutMetaDescription = 0;
const publishedPagesWithoutContent: Array<{
  path: string;
  title: string;
  collection: string;
  template: string;
}> = [];
const explicitEmptyRouteAllowlist = new Set([
  "/blog/",
  "/guides/",
  "/news/",
]);

for (const rawPage of cmsPages.pages ?? []) {
  const parsed = pageDocumentSchema.safeParse(rawPage);
  const page =
    rawPage && typeof rawPage === "object"
      ? (rawPage as { path?: unknown; status?: unknown; seo?: unknown })
      : {};
  const path = typeof page.path === "string" ? page.path : undefined;

  if (!parsed.success) {
    findings.push({
      code: "schema-invalid",
      path,
      message: parsed.error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join("; "),
    });
    continue;
  }

  validPages += 1;

  if (seenPaths.has(parsed.data.path)) {
    duplicatePaths.add(parsed.data.path);
  }

  seenPaths.add(parsed.data.path);

  if (parsed.data.status === "published" && !parsed.data.seo.metaDescription) {
    publishedPagesWithoutMetaDescription += 1;
  }

  if (
    parsed.data.status === "published" &&
    parsed.data.blocks.length === 0 &&
    !explicitEmptyRouteAllowlist.has(parsed.data.path)
  ) {
    publishedPagesWithoutContent.push({
      path: parsed.data.path,
      title: parsed.data.title,
      collection: parsed.data.collection,
      template: parsed.data.template,
    });
  }

  const minimumBlocks = criticalRouteMinimumBlocks.get(parsed.data.path);

  if (
    minimumBlocks !== undefined &&
    parsed.data.blocks.length < minimumBlocks
  ) {
    findings.push({
      code: "critical-route-empty",
      path: parsed.data.path,
      message: `Critical route must contain at least ${minimumBlocks} mapped block(s).`,
    });
  }
}

for (const path of duplicatePaths) {
  findings.push({
    code: "duplicate-path",
    path,
    message: "Every routable document must have a unique canonical path.",
  });
}

for (const match of sourceText.matchAll(mojibakePattern)) {
  findings.push({
    code: "mojibake",
    message:
      "Exported CMS JSON contains mojibake, replacement, or C1 control characters.",
    sample: match[0],
  });

  if (findings.filter((finding) => finding.code === "mojibake").length >= 10) {
    break;
  }
}

for (const { code, pattern, message } of forbiddenRuntimePatterns) {
  const match = pattern.exec(sourceText);

  if (match) {
    findings.push({
      code,
      message,
      sample: match[0],
    });
  }
}

if (publishedPagesWithoutMetaDescription > 0) {
  warnings.push({
    code: "missing-meta-description",
    message: `${publishedPagesWithoutMetaDescription} published pages do not have a metaDescription in the current export.`,
  });
}

if (publishedPagesWithoutContent.length > 0) {
  warnings.push({
    code: "empty-published-routes",
    message: `${publishedPagesWithoutContent.length} published non-index routes have no mapped blocks or rich text in the current export.`,
    sample: publishedPagesWithoutContent
      .slice(0, 20)
      .map((page) => `${page.path} (${page.collection}/${page.template}: ${page.title})`)
      .join("; "),
  });
}

const result = {
  ok: findings.length === 0,
  file: cmsPagesPath,
  generatedAt: cmsPages.generatedAt,
  totalPages: cmsPages.pages?.length ?? 0,
  validPages,
  uniquePaths: seenPaths.size,
  warnings,
  findings,
};

console.log(JSON.stringify(result, null, 2));

if (findings.length > 0) {
  process.exit(1);
}
