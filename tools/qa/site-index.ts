import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";

import { pageDocumentSchema } from "@acme/blocks";
import { siteChrome } from "@acme/config";

type CmsPagesExport = {
  pages?: unknown[];
};

type Finding = {
  code: string;
  message: string;
  path?: string;
  expected?: string;
  actual?: string;
};

const cmsPagesPath = "data/cms/pages.json";
const distDir = "apps/web/dist";
const requiredFiles = ["sitemap.xml", "robots.txt", "llms.txt"];
const findings: Finding[] = [];

const cmsPages = JSON.parse(await readFile(cmsPagesPath, "utf8")) as CmsPagesExport;
const expectedUrls = new Set<string>();
const noIndexUrls = new Set<string>();

for (const rawPage of cmsPages.pages ?? []) {
  const parsed = pageDocumentSchema.safeParse(rawPage);

  if (!parsed.success) {
    findings.push({
      code: "schema-invalid",
      message: parsed.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("; "),
    });
    continue;
  }

  if (parsed.data.status !== "published") {
    continue;
  }

  const url = new URL(parsed.data.seo.canonicalUrl || parsed.data.path, siteChrome.siteUrl).toString();

  if (parsed.data.seo.robots?.toLowerCase().split(",").map((part) => part.trim()).includes("noindex")) {
    noIndexUrls.add(url);
    continue;
  }

  expectedUrls.add(url);
}

for (const file of requiredFiles) {
  const filePath = path.join(distDir, file);

  if (!existsSync(filePath)) {
    findings.push({
      code: "missing-site-index-file",
      message: "Required site index artifact is missing from the built output.",
      expected: filePath,
    });
  }
}

const sitemap = await readDistText("sitemap.xml");
const robots = await readDistText("robots.txt");
const llms = await readDistText("llms.txt");

for (const [file, text] of [
  ["sitemap.xml", sitemap],
  ["robots.txt", robots],
  ["llms.txt", llms],
] as const) {
  if (text && /â|Â|�/.test(text)) {
    findings.push({
      code: "site-index-mojibake",
      message: "Site index artifact must not contain mojibake or replacement characters.",
      path: file,
    });
  }
}

if (sitemap) {
  if (!sitemap.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')) {
    findings.push({
      code: "invalid-sitemap-root",
      message: "sitemap.xml must use the standard sitemap urlset root.",
    });
  }

  for (const url of expectedUrls) {
    if (!sitemap.includes(`<loc>${escapeXml(url)}</loc>`)) {
      findings.push({
        code: "sitemap-missing-url",
        message: "Published indexable CMS route is missing from sitemap.xml.",
        path: new URL(url).pathname,
        expected: url,
      });
    }
  }

  for (const url of noIndexUrls) {
    if (sitemap.includes(`<loc>${escapeXml(url)}</loc>`)) {
      findings.push({
        code: "sitemap-noindex-url",
        message: "Noindex CMS route must not be included in sitemap.xml.",
        path: new URL(url).pathname,
        actual: url,
      });
    }
  }
}

if (robots) {
  expectText(robots, "User-agent: *", "robots-user-agent");
  expectText(robots, "Allow: /", "robots-allow");
  expectText(robots, `Sitemap: ${new URL("/sitemap.xml", siteChrome.siteUrl).toString()}`, "robots-sitemap");
}

if (llms) {
  expectText(llms, `# ${siteChrome.siteName}`, "llms-title");
  expectText(llms, `Generated from ${expectedUrls.size} published, indexable CMS routes.`, "llms-count");

  for (const requiredPath of ["/", "/blog/", "/guides/", "/news/", "/tips-and-tricks/"]) {
    const url = new URL(requiredPath, siteChrome.siteUrl).toString();

    if (expectedUrls.has(url) && !llms.includes(`](${url})`)) {
      findings.push({
        code: "llms-missing-core-route",
        message: "llms.txt must include core public routes.",
        path: requiredPath,
        expected: url,
      });
    }
  }
}

const report = {
  ok: findings.length === 0,
  distDir,
  expectedIndexableRoutes: expectedUrls.size,
  excludedNoindexRoutes: noIndexUrls.size,
  findings,
};

console.log(JSON.stringify(report, null, 2));

if (findings.length > 0) {
  process.exitCode = 1;
}

async function readDistText(file: string): Promise<string | undefined> {
  const filePath = path.join(distDir, file);

  if (!existsSync(filePath)) {
    return undefined;
  }

  return readFile(filePath, "utf8");
}

function expectText(text: string, expected: string, code: string): void {
  if (text.includes(expected)) {
    return;
  }

  findings.push({
    code,
    message: "Site index artifact is missing required text.",
    expected,
  });
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
