import { existsSync, readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";

import { pageDocumentSchema, type PageDocument } from "@acme/blocks";

type CmsPagesExport = {
  pages?: unknown[];
};

type Finding = {
  code: string;
  path: string;
  message: string;
  sample?: string;
};

type Heading = {
  text: string;
};

const cmsPagesPath = "data/cms/pages.json";
const distDir = "apps/web/dist";
const cmsPages = JSON.parse(await readFile(cmsPagesPath, "utf8")) as CmsPagesExport;
const findings: Finding[] = [];
let checkedRoutes = 0;
let expectedTocRoutes = 0;

for (const rawPage of cmsPages.pages ?? []) {
  const parsed = pageDocumentSchema.safeParse(rawPage);

  if (!parsed.success || parsed.data.status !== "published" || !isLongForm(parsed.data)) {
    continue;
  }

  const richHtml = parsed.data.blocks.find((block) => block.type === "rich-text")?.html ?? "";
  const sourceHeadings = extractSourceHeadings(richHtml);

  if (sourceHeadings.length === 0) {
    continue;
  }

  expectedTocRoutes += 1;
  checkedRoutes += 1;
  checkRoute(parsed.data, sourceHeadings);
}

const result = {
  ok: findings.length === 0,
  distDir,
  checkedRoutes,
  expectedTocRoutes,
  findingCount: findings.length,
  findings,
};

console.log(JSON.stringify(result, null, 2));

if (findings.length > 0) {
  process.exit(1);
}

function checkRoute(page: PageDocument, sourceHeadings: Heading[]): void {
  const htmlPath = routeToHtmlPath(page.path);

  if (!existsSync(htmlPath)) {
    findings.push({
      code: "missing-html",
      path: page.path,
      message: "Long-form page does not have built HTML.",
      sample: htmlPath,
    });
    return;
  }

  const html = readBuiltHtml(htmlPath);
  const headingIds = [...html.matchAll(/<h2\b[^>]*\bid=(["'])(.*?)\1[^>]*\bdata-toc-heading\b[^>]*>/gi)].map((match) => match[2]);
  const tocLinks = [
    ...html.matchAll(/class=(["'])(?:rich-text-toc__link|single-article__toc-link)\1[^>]*\bhref=(["'])#(.*?)\2/gi),
  ].map((match) => match[3]);

  if (!html.includes('class="rich-text-toc"') && !html.includes('class="single-article__toc"')) {
    findings.push({
      code: "missing-toc",
      path: page.path,
      message: "Published Post/Guide with source h2 headings must render a table of contents.",
    });
  }

  if (headingIds.length < sourceHeadings.length) {
    findings.push({
      code: "missing-heading-ids",
      path: page.path,
      message: "Built rich-text headings must receive stable anchor ids.",
      sample: `${headingIds.length}/${sourceHeadings.length}`,
    });
  }

  for (const link of tocLinks) {
    if (!headingIds.includes(link)) {
      findings.push({
        code: "toc-link-without-heading",
        path: page.path,
        message: "TOC link points to an id that is not present on a rich-text heading.",
        sample: link,
      });
    }
  }

  if (tocLinks.length < sourceHeadings.length) {
    findings.push({
      code: "missing-toc-links",
      path: page.path,
      message: "TOC must include every source h2 heading.",
      sample: `${tocLinks.length}/${sourceHeadings.length}`,
    });
  }
}

function readBuiltHtml(htmlPath: string): string {
  return readFileSync(htmlPath, "utf8");
}

function isLongForm(page: PageDocument): boolean {
  return page.collection === "posts" || page.collection === "guides" || page.template === "guide";
}

function extractSourceHeadings(html: string): Heading[] {
  return [...html.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi)]
    .map((match) => ({
      text: stripTags(match[1]).replace(/\s+/g, " ").trim(),
    }))
    .filter((heading) => heading.text.length > 0);
}

function stripTags(value: string): string {
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
}

function routeToHtmlPath(routePath: string): string {
  if (routePath === "/") {
    return path.join(distDir, "index.html");
  }

  return path.join(distDir, ...routePath.split("/").filter(Boolean), "index.html");
}
