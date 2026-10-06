import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";

import { pageDocumentSchema, type PageDocument } from "@acme/blocks";
import { siteChrome } from "@acme/config";

type CmsPagesExport = {
  generatedAt?: string;
  pages?: unknown[];
};

type Finding = {
  code: string;
  path?: string;
  message: string;
  expected?: string;
  actual?: string;
  sample?: string;
};

const cmsPagesPath = "data/cms/pages.json";
const distDir = "apps/web/dist";
const sourceText = await readFile(cmsPagesPath, "utf8");
const cmsPages = JSON.parse(sourceText) as CmsPagesExport;
const findings: Finding[] = [];
const warnings: Finding[] = [];
const publishedPaths = new Set<string>();
const allCmsPaths = new Set<string>();
let validPages = 0;
let checkedHtml = 0;
let checkedRedirects = 0;

if (!Array.isArray(cmsPages.pages)) {
  findings.push({
    code: "missing-pages",
    message: `${cmsPagesPath} must contain a pages array.`,
  });
}

for (const rawPage of cmsPages.pages ?? []) {
  const parsed = pageDocumentSchema.safeParse(rawPage);
  const pagePath =
    rawPage && typeof rawPage === "object" && "path" in rawPage
      ? String((rawPage as { path?: unknown }).path ?? "")
      : undefined;

  if (!parsed.success) {
    findings.push({
      code: "schema-invalid",
      path: pagePath,
      message: parsed.error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join("; "),
    });
    continue;
  }

  validPages += 1;
  allCmsPaths.add(parsed.data.path);

  if (parsed.data.status !== "published") {
    continue;
  }

  publishedPaths.add(parsed.data.path);
  await checkPage(parsed.data);
}

await checkBuiltRouteOwnership();

async function checkPage(page: PageDocument): Promise<void> {
  const htmlPath = routeToHtmlPath(page.path);

  if (!existsSync(htmlPath)) {
    findings.push({
      code: "missing-html",
      path: page.path,
      message: "Published route does not have a built HTML document.",
      expected: htmlPath,
    });
    return;
  }

  checkedHtml += 1;

  const html = await readFile(htmlPath, "utf8");
  const title = cleanSeoTemplate(page.seo.metaTitle) || page.title;
  const description =
    page.seo.metaDescription ||
    "Acme builds cognitive AI agents for business automation.";
  const canonicalUrl = new URL(
    page.seo.canonicalUrl || page.path,
    siteChrome.siteUrl,
  ).toString();
  const ogTitle = cleanSeoTemplate(page.seo.ogTitle) || title;
  const ogDescription = page.seo.ogDescription || description;
  const twitterTitle = cleanSeoTemplate(page.seo.twitterTitle) || ogTitle;
  const twitterDescription = page.seo.twitterDescription || ogDescription;
  const expectedOgType = page.collection === "posts" ? "article" : "website";
  const expectedTwitterCard =
    page.seo.twitterImage?.src || page.seo.ogImage?.src
      ? "summary_large_image"
      : "summary";

  expectEqual(page, "title", title, getTitle(html));
  expectEqual(page, "meta-description", description, getMeta(html, "name", "description"));
  expectEqual(page, "canonical", canonicalUrl, getLink(html, "canonical"));
  expectEqual(page, "og-title", ogTitle, getMeta(html, "property", "og:title"));
  expectEqual(
    page,
    "og-description",
    ogDescription,
    getMeta(html, "property", "og:description"),
  );
  expectEqual(page, "og-url", canonicalUrl, getMeta(html, "property", "og:url"));
  expectEqual(page, "og-type", expectedOgType, getMeta(html, "property", "og:type"));
  expectEqual(
    page,
    "twitter-card",
    expectedTwitterCard,
    getMeta(html, "name", "twitter:card"),
  );
  expectEqual(
    page,
    "twitter-title",
    twitterTitle,
    getMeta(html, "name", "twitter:title"),
  );
  expectEqual(
    page,
    "twitter-description",
    twitterDescription,
    getMeta(html, "name", "twitter:description"),
  );

  if (page.seo.robots) {
    expectEqual(page, "robots", page.seo.robots, getMeta(html, "name", "robots"));
  }

  if (page.seo.ogImage?.src) {
    expectEqual(
      page,
      "og-image",
      new URL(page.seo.ogImage.src, siteChrome.siteUrl).toString(),
      getMeta(html, "property", "og:image"),
    );
  }

  if (page.seo.twitterImage?.src) {
    expectEqual(
      page,
      "twitter-image",
      new URL(page.seo.twitterImage.src, siteChrome.siteUrl).toString(),
      getMeta(html, "name", "twitter:image"),
    );
  }

  checkSeoText(page, "title", title);
  checkSeoText(page, "description", description);
  checkUrl(page, "canonical", canonicalUrl);
  checkUrl(page, "og-url", canonicalUrl);

  const ogImage = getMeta(html, "property", "og:image");
  const twitterImage = getMeta(html, "name", "twitter:image");

  if (ogImage) {
    checkUrl(page, "og-image", ogImage);
  }

  if (twitterImage) {
    checkUrl(page, "twitter-image", twitterImage);
  }

  if (description.length < 50 || description.length > 180) {
    warnings.push({
      code: "meta-description-length",
      path: page.path,
      message: "Meta description is outside the preferred 50-180 character range.",
      sample: description,
    });
  }

  if (page.seo.schemaJson) {
    const schema = getJsonLd(html);

    if (!schema) {
      findings.push({
        code: "missing-schema-json",
        path: page.path,
        message: "Page has schemaJson in CMS data but no JSON-LD script in built HTML.",
      });
    } else if (JSON.stringify(schema) !== JSON.stringify(page.seo.schemaJson)) {
      findings.push({
        code: "schema-json-mismatch",
        path: page.path,
        message: "Built JSON-LD does not match CMS schemaJson.",
      });
    }
  }
}

function expectEqual(
  page: PageDocument,
  code: string,
  expected: string,
  actual: string | undefined,
): void {
  if (actual === expected) {
    return;
  }

  findings.push({
    code,
    path: page.path,
    message: `Built ${code} does not match the CMS/layout contract.`,
    expected,
    actual,
  });
}

function checkSeoText(page: PageDocument, field: string, value: string): void {
  if (/<[^>]+>/.test(value) || /\{\{|\}\}|\|\|/.test(value)) {
    findings.push({
      code: `seo-text-token-${field}`,
      path: page.path,
      message: "SEO text must be plain text without content-formatting tokens or HTML.",
      sample: value,
    });
  }

  if (/\s{2,}/.test(value.trim())) {
    warnings.push({
      code: `seo-text-spacing-${field}`,
      path: page.path,
      message: "SEO text contains repeated whitespace.",
      sample: value,
    });
  }
}

function checkUrl(page: PageDocument, field: string, value: string): void {
  let url: URL;

  try {
    url = new URL(value);
  } catch {
    findings.push({
      code: `${field}-invalid-url`,
      path: page.path,
      message: `${field} must be an absolute URL.`,
      actual: value,
    });
    return;
  }

  if (url.origin !== siteChrome.siteUrl) {
    findings.push({
      code: `${field}-external-origin`,
      path: page.path,
      message: `${field} must use the configured first-party site origin.`,
      expected: siteChrome.siteUrl,
      actual: url.origin,
    });
  }

  if (/\/wp-content\/uploads\//i.test(url.pathname)) {
    findings.push({
      code: `${field}-legacy-upload-path`,
      path: page.path,
      message: `${field} must not point at historical upload paths.`,
      actual: value,
    });
  }
}

function cleanSeoTemplate(value?: string): string {
  if (!value || value.includes("%%")) {
    return "";
  }

  return value;
}

function routeToHtmlPath(routePath: string): string {
  if (routePath === "/") {
    return path.join(distDir, "index.html");
  }

  const parts = routePath.split("/").filter(Boolean);
  return path.join(distDir, ...parts, "index.html");
}

async function checkBuiltRouteOwnership(): Promise<void> {
  const routes = await listBuiltRoutes(distDir);

  for (const route of routes) {
    if (publishedPaths.has(route)) {
      continue;
    }

    const html = await readFile(routeToHtmlPath(route), "utf8");

    if (isLegacyRedirectHtml(html)) {
      checkedRedirects += 1;
      continue;
    }

    findings.push({
      code: allCmsPaths.has(route) ? "draft-html-built" : "orphan-html-built",
      path: route,
      message: allCmsPaths.has(route)
        ? "Draft CMS route must not be emitted into the static build."
        : "Built HTML route must come from CMS data or be an explicit legacy redirect.",
    });
  }

  for (const route of publishedPaths) {
    if (!routes.has(route)) {
      findings.push({
        code: "published-route-missing-html",
        path: route,
        message: "Published CMS route is missing from the static build.",
      });
    }
  }
}

async function listBuiltRoutes(dir: string): Promise<Set<string>> {
  const routes = new Set<string>();
  const entries = await import("node:fs/promises").then((fs) =>
    fs.readdir(dir, { withFileTypes: true }),
  );

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const childRoutes = await listBuiltRoutes(entryPath);

      for (const route of childRoutes) {
        routes.add(route);
      }

      continue;
    }

    if (entry.name !== "index.html") {
      continue;
    }

    routes.add(htmlPathToRoute(entryPath));
  }

  return routes;
}

function htmlPathToRoute(htmlPath: string): string {
  const relativePath = path.relative(distDir, htmlPath).replaceAll(path.sep, "/");
  const route = `/${relativePath.replace(/(?:^|\/)index\.html$/, "")}`.replace(/\/+/g, "/");

  return route.endsWith("/") ? route : `${route}/`;
}

function isLegacyRedirectHtml(html: string): boolean {
  const refresh = getMetaHttpEquiv(html, "refresh");
  const robots = getMeta(html, "name", "robots");

  return Boolean(refresh?.includes("url=") && robots === "noindex, follow");
}

function getTitle(html: string): string | undefined {
  return decodeHtml(html.match(/<title>(.*?)<\/title>/is)?.[1]);
}

function getMeta(
  html: string,
  key: "name" | "property",
  value: string,
): string | undefined {
  const tag = findTag(html, "meta", key, value);
  return tag ? getAttribute(tag, "content") : undefined;
}

function getMetaHttpEquiv(html: string, value: string): string | undefined {
  const tag = findTag(html, "meta", "http-equiv", value);
  return tag ? getAttribute(tag, "content") : undefined;
}

function getLink(html: string, rel: string): string | undefined {
  const tag = findTag(html, "link", "rel", rel);
  return tag ? getAttribute(tag, "href") : undefined;
}

function getJsonLd(html: string): unknown | undefined {
  const match = html.match(
    /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/is,
  );

  if (!match?.[1]) {
    return undefined;
  }

  try {
    return JSON.parse(decodeHtml(match[1]) ?? "");
  } catch {
    return undefined;
  }
}

function findTag(
  html: string,
  tagName: string,
  attribute: string,
  value: string,
): string | undefined {
  const tags = html.match(new RegExp(`<${tagName}\\b[^>]*>`, "gi")) ?? [];

  return tags.find((tag) => getAttribute(tag, attribute) === value);
}

function getAttribute(tag: string, attribute: string): string | undefined {
  const match = tag.match(
    new RegExp(`\\b${escapeRegExp(attribute)}=(["'])(.*?)\\1`, "is"),
  );

  return decodeHtml(match?.[2]);
}

function decodeHtml(value?: string): string | undefined {
  return value
    ?.replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) =>
      String.fromCodePoint(Number.parseInt(hex, 16)),
    )
    .replace(/&#(\d+);/g, (_, code: string) =>
      String.fromCodePoint(Number.parseInt(code, 10)),
    );
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const findingsByCode = findings.reduce<Record<string, number>>(
  (counts, finding) => {
    counts[finding.code] = (counts[finding.code] ?? 0) + 1;
    return counts;
  },
  {},
);
const detailedFindings = findings.slice(0, 100);

const result = {
  ok: findings.length === 0,
  file: cmsPagesPath,
  distDir,
  generatedAt: cmsPages.generatedAt,
  totalPages: cmsPages.pages?.length ?? 0,
  validPages,
  checkedHtml,
  checkedRedirects,
  warnings,
  findingCount: findings.length,
  findingsByCode,
  findings: detailedFindings,
  omittedFindings: Math.max(0, findings.length - detailedFindings.length),
};

console.log(JSON.stringify(result, null, 2));

if (findings.length > 0) {
  process.exit(1);
}
