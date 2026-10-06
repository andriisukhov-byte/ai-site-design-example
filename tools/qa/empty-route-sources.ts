import { readdir, readFile, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";

import { pageDocumentSchema } from "@acme/blocks";

type CmsPagesExport = {
  generatedAt?: string;
  pages?: unknown[];
};

type SourceHit = {
  file: string;
  slug?: string;
  title?: string;
  terms: string[];
  evidence: "standalone-content" | "standalone-empty" | "partial-mention";
};

type RouteAudit = {
  path: string;
  slug: string;
  title: string;
  collection: string;
  template: string;
  status: "recoverable" | "partial-source-only" | "missing-source";
  hits: SourceHit[];
};

const args = process.argv.slice(2);
const cmsPagesPath = readArg("--file") ?? "data/cms/pages.json";
const outPath = readArg("--out") ?? "data/source/empty-route-source-audit.json";
const sourceRoots = readRepeatedArg("--source-root");
const roots =
  sourceRoots.length > 0
    ? sourceRoots
    : [
        "D:/wamp/www/acme/wp-content/themes/acme/docs/data/pages",
        "D:/wamp/www/acme/wp-content/themes/acme/docs/data/backup-use-case-schemes",
      ];

const cmsPages = JSON.parse(await readFile(cmsPagesPath, "utf8")) as CmsPagesExport;

if (!Array.isArray(cmsPages.pages)) {
  throw new Error(`${cmsPagesPath} must contain a pages array.`);
}

const emptyRoutes = cmsPages.pages
  .map((rawPage) => pageDocumentSchema.safeParse(rawPage))
  .filter((parsed) => parsed.success)
  .map((parsed) => parsed.data)
  .filter(
    (page) =>
      page.status === "published" &&
      page.blocks.length === 0 &&
      !new Set(["/blog/", "/guides/", "/news/"]).has(page.path),
  )
  .map((page) => ({
    path: page.path,
    slug: slugFromPath(page.path),
    title: page.title,
    collection: page.collection,
    template: page.template,
  }));

const files = (
  await Promise.all(roots.map((root) => listJsonFiles(root)))
).flat();
const audits: RouteAudit[] = [];

for (const route of emptyRoutes) {
  const terms = [route.slug, route.path, route.title].filter(Boolean);
  const hits: SourceHit[] = [];

  for (const file of files) {
    const text = await readFile(file, "utf8");
    const matchedTerms = terms.filter((term) => text.includes(term));

    if (matchedTerms.length === 0) {
      continue;
    }

    const snapshot = parseJsonSnapshot(text);
    const sourceSlug = toStringValue(snapshot?.slug);
    const sourceTitle = toStringValue(snapshot?.title?.rendered) || toStringValue(snapshot?.title);
    const hasStandaloneIdentity =
      sourceSlug === route.slug ||
      sourceSlug === route.slug.replace(/\/$/, "") ||
      basename(file).replace(/^\d+-/, "").replace(/\.json$/, "") === route.slug;
    const hasContent = snapshotHasContent(snapshot);

    hits.push({
      file: file.replace(/\\/g, "/"),
      slug: sourceSlug || undefined,
      title: sourceTitle || undefined,
      terms: matchedTerms,
      evidence: hasStandaloneIdentity
        ? hasContent
          ? "standalone-content"
          : "standalone-empty"
        : "partial-mention",
    });
  }

  const hasRecoverable = hits.some((hit) => hit.evidence === "standalone-content");
  const hasPartial = hits.length > 0;

  audits.push({
    ...route,
    status: hasRecoverable
      ? "recoverable"
      : hasPartial
        ? "partial-source-only"
        : "missing-source",
    hits,
  });
}

const result = {
  ok: true,
  generatedAt: new Date().toISOString(),
  cmsPagesPath,
  sourceRoots: roots,
  emptyRoutes: audits.length,
  recoverable: audits.filter((audit) => audit.status === "recoverable").length,
  partialSourceOnly: audits.filter((audit) => audit.status === "partial-source-only").length,
  missingSource: audits.filter((audit) => audit.status === "missing-source").length,
  routes: audits,
};

await writeFile(outPath, `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify(result, null, 2));

function readArg(name: string): string | undefined {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}

function readRepeatedArg(name: string): string[] {
  const values: string[] = [];

  for (let index = 0; index < args.length; index += 1) {
    if (args[index] === name && args[index + 1]) {
      values.push(args[index + 1]);
      index += 1;
    }
  }

  return values;
}

async function listJsonFiles(root: string): Promise<string[]> {
  try {
    const entries = await readdir(root, { withFileTypes: true });
    const files: string[] = [];

    for (const entry of entries) {
      const path = join(root, entry.name);

      if (entry.isDirectory()) {
        files.push(...(await listJsonFiles(path)));
      } else if (entry.isFile() && entry.name.endsWith(".json")) {
        files.push(path);
      }
    }

    return files;
  } catch {
    return [];
  }
}

function parseJsonSnapshot(text: string): Record<string, unknown> | undefined {
  try {
    const parsed = JSON.parse(text);
    return parsed && typeof parsed === "object"
      ? (parsed as Record<string, unknown>)
      : undefined;
  } catch {
    return undefined;
  }
}

function snapshotHasContent(snapshot: Record<string, unknown> | undefined): boolean {
  if (!snapshot) {
    return false;
  }

  const rawContent = toStringValue(snapshot.content_raw);
  const renderedContent =
    toStringValue((snapshot.content as { rendered?: unknown } | undefined)?.rendered) ||
    toStringValue(snapshot.content);
  const acf = snapshot.acf;
  const acfRecord = acf && typeof acf === "object" ? (acf as Record<string, unknown>) : undefined;

  return Boolean(
    rawContent.includes("<!-- wp:acme/") ||
      renderedContent.replace(/<[^>]+>/g, "").trim() ||
      acfRecord?.hero_settings ||
      acfRecord?.returns_problem_settings ||
      acfRecord?.how_it_works_settings,
  );
}

function toStringValue(value: unknown): string {
  return typeof value === "string" || typeof value === "number"
    ? String(value).trim()
    : "";
}

function slugFromPath(path: string): string {
  return path.replace(/^\/+|\/+$/g, "").split("/").pop() ?? "";
}
