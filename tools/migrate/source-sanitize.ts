import {
  pathExists,
  argString,
  defaultDumpPath,
  extractSourceBlocks,
  forSqlRows,
  parseArgs,
  sanitizeValue,
  sha256File,
  type SourceBlock,
  sourceBasename,
  stableRecordKey,
  toNumberValue,
  toStringValue,
  writeJson,
} from "./source-utils";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

type SanitizedDocument = {
  recordKey: string;
  sourceKind: string;
  status: string;
  slug: string;
  path: string;
  title: string;
  excerpt?: string;
  richTextHtml?: string;
  featuredImageSourceId?: number;
  publishedAt?: string;
  updatedAt?: string;
  articleMeta?: {
    category?: string;
    tags: string[];
    authorName?: string;
    updatedAt?: string;
    ratingAverage?: number;
    ratingCount?: number;
    views?: number;
    showTableOfContents: boolean;
    showTableOfContentsTitle: boolean;
    tableOfContentsTitle: string;
  };
  tipCard?: {
    category?: string;
    archiveWidth: 1 | 2 | 3;
    icons: Array<{
      src: string;
      alt: string;
    }>;
  };
  seo: Record<string, unknown>;
  sourceBlocks: ReturnType<typeof extractSourceBlocks>;
  selectedMeta: Record<string, string>;
};

type FaqSourceItem = {
  id: number;
  title: string;
  content: string;
  categoryIds: string[];
};

type FaqCategory = {
  id: number;
  name: string;
  slug: string;
};

type TermTaxonomy = {
  taxonomy: string;
  termId: number;
};

const documentKinds = new Set(["page", "post", "guide", "tip", "news"]);
const documentStatuses = new Set([
  "publish",
  "draft",
  "future",
  "pending",
  "private",
]);
const selectedMetaKeys = new Set([
  "_wp_page_template",
  "_yoast_wpseo_title",
  "_yoast_wpseo_metadesc",
  "_yoast_wpseo_canonical",
  "_yoast_wpseo_opengraph-title",
  "_yoast_wpseo_opengraph-description",
  "_yoast_wpseo_opengraph-image",
  "_yoast_wpseo_twitter-title",
  "_yoast_wpseo_twitter-description",
  "_yoast_wpseo_twitter-image",
  "_thumbnail_id",
  "_kksr_avg",
  "_kksr_casts",
  "my_post_views_count",
]);

const args = parseArgs();
const dump = argString(
  args,
  "dump",
  process.env.SOURCE_DB_DUMP || defaultDumpPath,
);
const out = argString(args, "out", "data/source/sanitized-content.json")!;
const homeSnapshot = argString(
  args,
  "home-snapshot",
  "D:/wamp/www/acme/wp-content/themes/acme/docs/data/pages/7621-cognitive-ai-platform.json",
)!;
const tipsPresentationSnapshot = argString(
  args,
  "tips-presentation-snapshot",
  "data/source/tips-presentation-reference.json",
)!;
const guideTaxonomySnapshot = argString(
  args,
  "guide-taxonomy-snapshot",
  "data/source/guide-taxonomy-reference.json",
)!;
const useCaseSnapshotsRoot = argString(
  args,
  "use-case-snapshots-root",
  "D:/wamp/www/acme/wp-content/themes/acme/docs/data",
)!;
const limitValue = argString(args, "limit");
const limit = limitValue ? Number(limitValue) : undefined;

if (!dump) {
  console.error(
    "Usage: npm run migrate:source:sanitize -- --dump D:/path/to/source.sql",
  );
  process.exit(1);
}

const documents = new Map<number, SanitizedDocument>();
const idToRecordKey = new Map<number, string>();
const seoBySourceId = new Map<number, Record<string, unknown>>();
const pathBySourceId = new Map<number, string>();
const faqItems = new Map<number, FaqSourceItem>();
const termsById = new Map<number, FaqCategory>();
const faqTermIdByTermTaxonomyId = new Map<number, number>();
const faqTermTaxonomyById = new Map<number, FaqCategory>();
const faqTermTaxonomyIdsByPostId = new Map<number, number[]>();
const authorIdBySourceId = new Map<number, number>();
const authorNameByUserId = new Map<number, string>();
const termTaxonomyById = new Map<number, TermTaxonomy>();
const termTaxonomyIdsByPostId = new Map<number, number[]>();

await forSqlRows(
  dump,
  new Set(["wp_posts", "wp_users", "wp_yoast_indexable"]),
  (table, row) => {
    if (table === "wp_users") {
      const id = toNumberValue(row[0]);
      const displayName = cleanText(toStringValue(row[9]));

      if (Number.isFinite(id) && displayName) {
        authorNameByUserId.set(id, displayName);
      }

      return;
    }

    if (table === "wp_yoast_indexable") {
      const objectId = toNumberValue(row[3]);

      if (!Number.isFinite(objectId)) {
        return;
      }

      const permalinkPath = pathFromPermalink(toStringValue(row[1]));

      if (permalinkPath) {
        pathBySourceId.set(objectId, permalinkPath);
      }

      const robots = [
        toNumberValue(row[21]) === 1 ? "noindex" : "",
        toNumberValue(row[22]) === 1 ? "nofollow" : "",
        toNumberValue(row[23]) === 1 ? "noarchive" : "",
        toNumberValue(row[24]) === 1 ? "noimageindex" : "",
        toNumberValue(row[25]) === 1 ? "nosnippet" : "",
      ]
        .filter(Boolean)
        .join(", ");

      seoBySourceId.set(
        objectId,
        pruneEmpty({
          metaTitle: sanitizeValue(row[8]),
          metaDescription: sanitizeValue(row[9]),
          canonicalUrl: sanitizeValue(row[16]),
          robots,
          twitterTitle: sanitizeValue(row[26]),
          twitterImage: sanitizeValue(row[27]),
          twitterDescription: sanitizeValue(row[28]),
          ogTitle: sanitizeValue(row[31]),
          ogDescription: sanitizeValue(row[32]),
          ogImage: sanitizeValue(row[33]),
          schemaPageType: sanitizeValue(row[46]),
          schemaArticleType: sanitizeValue(row[47]),
        }),
      );
      return;
    }

    const id = toNumberValue(row[0]);
    const authorId = toNumberValue(row[1]);
    const content = toStringValue(row[4]);
    const title = cleanText(toStringValue(row[5]));
    const excerpt = cleanText(toStringValue(row[6]));
    const status = toStringValue(row[7]);
    const slug = toStringValue(row[11]);
    const updatedAt = toStringValue(row[15]);
    const sourceKind = toStringValue(row[20]);

    if (sourceKind === "faq_item") {
      if (status === "publish" && title && content) {
        faqItems.set(id, {
          id,
          title,
          content: stripEditorComments(content),
          categoryIds: [],
        });
      }

      return;
    }

    if (
      !documentKinds.has(sourceKind) ||
      !documentStatuses.has(status) ||
      !slug ||
      !title
    ) {
      return;
    }

    if (limit && documents.size >= limit) {
      return;
    }

    const recordKey = stableRecordKey("document", id);
    const sourceBlocks = extractSourceBlocks(content);
    const richTextHtml =
      sourceBlocks.length === 0 ? stripEditorComments(content) : undefined;

    documents.set(id, {
      recordKey,
      sourceKind,
      status,
      slug,
      path: inferPath(sourceKind, slug),
      title,
      excerpt: excerpt || undefined,
      richTextHtml: richTextHtml || undefined,
      publishedAt: toStringValue(row[2]) || undefined,
      updatedAt: updatedAt || undefined,
      seo: {},
      sourceBlocks,
      selectedMeta: {},
    });
    if (Number.isFinite(authorId)) {
      authorIdBySourceId.set(id, authorId);
    }
    idToRecordKey.set(id, recordKey);
  },
);

await forSqlRows(dump, new Set(["wp_postmeta"]), (table, row) => {
  if (table !== "wp_postmeta") {
    return;
  }

  const sourceId = toNumberValue(row[1]);
  const key = toStringValue(row[2]);
  const value = toStringValue(row[3]);
  const document = documents.get(sourceId);

  if (!document || !selectedMetaKeys.has(key)) {
    return;
  }

  document.selectedMeta[key] = cleanText(value);
});

await forSqlRows(
  dump,
  new Set(["wp_terms", "wp_term_taxonomy", "wp_term_relationships"]),
  (table, row) => {
    if (table === "wp_terms") {
      const id = toNumberValue(row[0]);

      if (Number.isFinite(id)) {
        termsById.set(id, {
          id,
          name: cleanText(toStringValue(row[1])),
          slug: cleanText(toStringValue(row[2])),
        });
      }

      return;
    }

    if (table === "wp_term_taxonomy") {
      const termTaxonomyId = toNumberValue(row[0]);
      const termId = toNumberValue(row[1]);
      const taxonomy = toStringValue(row[2]);

      if (Number.isFinite(termTaxonomyId) && Number.isFinite(termId)) {
        termTaxonomyById.set(termTaxonomyId, { taxonomy, termId });

        if (taxonomy === "faq_category") {
          faqTermIdByTermTaxonomyId.set(termTaxonomyId, termId);
        }
      }

      return;
    }

    if (table === "wp_term_relationships") {
      const objectId = toNumberValue(row[0]);
      const termTaxonomyId = toNumberValue(row[1]);

      if (
        Number.isFinite(objectId) &&
        Number.isFinite(termTaxonomyId)
      ) {
        if (faqItems.has(objectId)) {
          const current = faqTermTaxonomyIdsByPostId.get(objectId) ?? [];

          current.push(termTaxonomyId);
          faqTermTaxonomyIdsByPostId.set(objectId, current);
        }

        if (documents.has(objectId)) {
          const current = termTaxonomyIdsByPostId.get(objectId) ?? [];

          current.push(termTaxonomyId);
          termTaxonomyIdsByPostId.set(objectId, current);
        }
      }
    }
  },
);

for (const [termTaxonomyId, termId] of faqTermIdByTermTaxonomyId) {
  const term = termsById.get(termId);

  if (term) {
    faqTermTaxonomyById.set(termTaxonomyId, term);
  }
}

for (const [postId, item] of faqItems) {
  item.categoryIds = (faqTermTaxonomyIdsByPostId.get(postId) ?? [])
    .map((termTaxonomyId) => faqTermTaxonomyById.get(termTaxonomyId))
    .filter((term): term is FaqCategory => Boolean(term))
    .map((term) => normalizeFaqCategoryId(term.slug || term.name));
}

for (const [sourceId, document] of documents) {
  const permalinkPath = pathBySourceId.get(sourceId);

  if (permalinkPath && (permalinkPath !== "/" || isHomeSlug(document.slug))) {
    document.path = permalinkPath;
  }

  document.seo = pruneEmpty({
    ...seoBySourceId.get(sourceId),
    metaTitle:
      document.selectedMeta["_yoast_wpseo_title"] ||
      seoBySourceId.get(sourceId)?.metaTitle,
    metaDescription:
      document.selectedMeta["_yoast_wpseo_metadesc"] ||
      seoBySourceId.get(sourceId)?.metaDescription,
    canonicalUrl:
      document.selectedMeta["_yoast_wpseo_canonical"] ||
      seoBySourceId.get(sourceId)?.canonicalUrl,
    ogTitle:
      document.selectedMeta["_yoast_wpseo_opengraph-title"] ||
      seoBySourceId.get(sourceId)?.ogTitle,
    ogDescription:
      document.selectedMeta["_yoast_wpseo_opengraph-description"] ||
      seoBySourceId.get(sourceId)?.ogDescription,
    ogImage:
      document.selectedMeta["_yoast_wpseo_opengraph-image"] ||
      seoBySourceId.get(sourceId)?.ogImage,
    twitterTitle:
      document.selectedMeta["_yoast_wpseo_twitter-title"] ||
      seoBySourceId.get(sourceId)?.twitterTitle,
    twitterDescription:
      document.selectedMeta["_yoast_wpseo_twitter-description"] ||
      seoBySourceId.get(sourceId)?.twitterDescription,
    twitterImage:
      document.selectedMeta["_yoast_wpseo_twitter-image"] ||
      seoBySourceId.get(sourceId)?.twitterImage,
  });

  const terms = (termTaxonomyIdsByPostId.get(sourceId) ?? [])
    .map((termTaxonomyId) => termTaxonomyById.get(termTaxonomyId))
    .filter((term): term is TermTaxonomy => Boolean(term))
    .map((term) => ({
      taxonomy: term.taxonomy,
      term: termsById.get(term.termId),
    }))
    .filter((item): item is { taxonomy: string; term: FaqCategory } => Boolean(item.term));
  const categoryTaxonomy = document.sourceKind === "guide"
    ? "guide_category"
    : document.sourceKind === "tip"
      ? "tip_category"
      : "category";
  const tagTaxonomy = document.sourceKind === "guide" ? "guide_tag" : "post_tag";
  const category = terms.find((item) => item.taxonomy === categoryTaxonomy)?.term.name;
  const tags = terms
    .filter((item) => item.taxonomy === tagTaxonomy)
    .map((item) => item.term.name)
    .filter(Boolean);
  const authorName = authorNameByUserId.get(authorIdBySourceId.get(sourceId) ?? -1);
  const ratingAverage = optionalNumber(document.selectedMeta["_kksr_avg"]);
  const ratingCount = optionalInteger(document.selectedMeta["_kksr_casts"]);
  const views = optionalInteger(document.selectedMeta.my_post_views_count);
  document.featuredImageSourceId = optionalInteger(document.selectedMeta._thumbnail_id);

  if (document.sourceKind === "post" || document.sourceKind === "guide" || document.sourceKind === "tip") {
    document.articleMeta = pruneEmpty({
      category,
      tags,
      authorName,
      updatedAt: document.updatedAt,
      ratingAverage,
      ratingCount,
      views,
      showTableOfContents: true,
      showTableOfContentsTitle: false,
      tableOfContentsTitle: "Contents",
    }) as SanitizedDocument["articleMeta"];
  }
}

await applyTipsPresentationSnapshot();
await applyGuideTaxonomySnapshot();

const homeOverride = await readHomeSnapshot(homeSnapshot);
if (homeOverride?.sourceBlocks.length) {
  let inheritedSeo: Record<string, unknown> = {};

  for (const [sourceId, document] of documents) {
    if (document.path === "/") {
      inheritedSeo = document.seo;

      if (document.sourceBlocks.length === 0 && !document.richTextHtml) {
        documents.delete(sourceId);
      }
    }
  }

  documents.set(homeOverride.id, {
    recordKey: stableRecordKey("document", homeOverride.id),
    sourceKind: "page",
    status: homeOverride.status || "publish",
    slug: homeOverride.slug,
    path: "/",
    title: homeOverride.title,
    publishedAt: undefined,
    updatedAt: homeOverride.modified,
    seo: inheritedSeo,
    sourceBlocks: homeOverride.sourceBlocks,
    selectedMeta: {
      _source_snapshot: homeSnapshot,
    },
  });
}

async function applyTipsPresentationSnapshot(): Promise<void> {
  if (!tipsPresentationSnapshot || !(await pathExists(tipsPresentationSnapshot))) {
    return;
  }

  const snapshot = JSON.parse(await readFile(tipsPresentationSnapshot, "utf8")) as {
    records?: Array<{
      sourceId: number;
      slug: string;
      path: string;
      title: string;
      contentHtml: string;
      publishedAt?: string;
      updatedAt?: string;
      category?: string;
      tipCard?: SanitizedDocument["tipCard"];
    }>;
  };

  for (const [sourceId, document] of documents) {
    if (document.sourceKind === "tip") {
      documents.delete(sourceId);
      idToRecordKey.delete(sourceId);
    }
  }

  for (const record of snapshot.records ?? []) {
    if (!Number.isFinite(record.sourceId) || !record.slug || !record.title) {
      continue;
    }

    const existing = documents.get(record.sourceId);
    const articleMeta: SanitizedDocument["articleMeta"] = {
      ...(existing?.articleMeta ?? {
        tags: [],
        showTableOfContents: false,
        showTableOfContentsTitle: false,
        tableOfContentsTitle: "Contents",
      }),
      category: record.category || existing?.articleMeta?.category,
      updatedAt: record.updatedAt || existing?.articleMeta?.updatedAt,
    };

    documents.set(record.sourceId, {
      recordKey: existing?.recordKey ?? stableRecordKey("document", record.sourceId),
      sourceKind: "tip",
      status: existing?.status ?? "publish",
      slug: record.slug,
      path: record.path || `/tips/${record.slug}/`,
      title: cleanText(record.title),
      excerpt: existing?.excerpt,
      richTextHtml: sanitizeValue(record.contentHtml) as string,
      featuredImageSourceId: existing?.featuredImageSourceId,
      publishedAt: record.publishedAt || existing?.publishedAt,
      updatedAt: record.updatedAt || existing?.updatedAt,
      articleMeta,
      tipCard: record.tipCard,
      seo: existing?.seo ?? {},
      sourceBlocks: existing?.sourceBlocks ?? [],
      selectedMeta: existing?.selectedMeta ?? {},
    });
    idToRecordKey.set(record.sourceId, documents.get(record.sourceId)!.recordKey);
  }
}

async function applyGuideTaxonomySnapshot(): Promise<void> {
  if (!guideTaxonomySnapshot || !(await pathExists(guideTaxonomySnapshot))) {
    return;
  }

  const snapshot = JSON.parse(await readFile(guideTaxonomySnapshot, "utf8")) as {
    records?: Array<{ sourceId: number; slug: string; tags?: string[] }>;
  };
  const documentBySlug = new Map(
    [...documents.values()]
      .filter((document) => document.sourceKind === "guide")
      .map((document) => [document.slug, document]),
  );

  for (const record of snapshot.records ?? []) {
    const document = documents.get(record.sourceId) ?? documentBySlug.get(record.slug);
    if (document?.articleMeta) {
      document.articleMeta.tags = (record.tags ?? []).map(cleanText).filter(Boolean);
    }
  }
}

const useCaseSnapshots = await readUseCaseSnapshots(useCaseSnapshotsRoot);
let supplementedUseCaseSnapshots = 0;

for (const document of documents.values()) {
  if (document.sourceBlocks.length || document.richTextHtml) {
    continue;
  }

  const snapshot = useCaseSnapshots.get(document.slug);

  if (!snapshot?.sourceBlocks.length) {
    continue;
  }

  document.sourceBlocks = snapshot.sourceBlocks;
  document.updatedAt = document.updatedAt || snapshot.modified;
  document.selectedMeta._source_snapshot = snapshot.file;
  supplementedUseCaseSnapshots += 1;
}

for (const document of documents.values()) {
  dedupeSourceBlockAnchors(document.sourceBlocks);
}

hydrateCptFaqBlocks([...documents.values()], [...faqItems.values()]);

const output = {
  generatedAt: new Date().toISOString(),
  source: {
    dumpFile: sourceBasename(dump),
    dumpSha256: await sha256File(dump),
    includedRecordKinds: [...documentKinds],
    supplementedUseCaseSnapshots,
    useCaseSnapshotsRoot,
    excludedSensitiveAreas: [
      "user credentials",
      "user metadata",
      "options",
      "comments",
      "mail/debug logs",
      "scheduler/auth/session/token tables",
    ],
  },
  documents: [...documents.values()].sort((left, right) =>
    left.path.localeCompare(right.path),
  ),
};

await writeJson(out, output);

console.log(
  JSON.stringify(
    {
      ok: true,
      out,
      documents: documents.size,
      linkedRecords: idToRecordKey.size,
    },
    null,
    2,
  ),
);

function inferPath(kind: string, slug: string): string {
  if (slug === "home" || slug === "homepage") {
    return "/";
  }

  if (kind === "post") {
    return `/blog/${slug}/`;
  }

  if (kind === "tip") {
    return `/tips/${slug}/`;
  }

  if (kind === "guide") {
    return `/guides/${slug}/`;
  }

  if (kind === "news") {
    return `/news/${slug}/`;
  }

  return `/${slug}/`;
}

function pathFromPermalink(permalink: string): string {
  if (!permalink) {
    return "";
  }

  try {
    const url = new URL(permalink);
    return url.pathname.endsWith("/") ? url.pathname : `${url.pathname}/`;
  } catch {
    return "";
  }
}

function isHomeSlug(slug: string): boolean {
  return ["home", "homepage", "main-page"].includes(slug);
}

function cleanText(value: string): string {
  return value.replace(/\0/g, "").trim();
}

function stripEditorComments(value: string): string {
  return value
    .replace(/<!--\s+wp:[\s\S]*?-->/g, "")
    .replace(/<!--\s+\/wp:[\s\S]*?-->/g, "")
    .trim();
}

function hydrateCptFaqBlocks(
  documents: SanitizedDocument[],
  sourceItems: FaqSourceItem[],
): void {
  const fallbackItems = sourceItems
    .filter((item) => item.title && item.content)
    .sort((left, right) => left.title.localeCompare(right.title))
    .slice(0, 16);

  if (fallbackItems.length < 2) {
    return;
  }

  for (const document of documents) {
    for (const sourceBlock of document.sourceBlocks) {
      if (sourceBlock.name !== "faq") {
        continue;
      }

      if (
        sourceBlock.data.source === "manual" ||
        Number(sourceBlock.data.manual_items) > 0
      ) {
        continue;
      }

      sourceBlock.data = {
        ...sourceBlock.data,
        source: "manual",
        ...faqItemsToRepeaterData(fallbackItems),
      };
    }
  }
}

function faqItemsToRepeaterData(items: FaqSourceItem[]): Record<string, unknown> {
  const data: Record<string, unknown> = {
    manual_items: items.length,
  };

  items.forEach((item, index) => {
    const category = item.categoryIds[0] || "all";

    data[`manual_items_${index}_category`] = category;
    data[`manual_items_${index}_question`] = item.title;
    data[`manual_items_${index}_answer`] = item.content;
  });

  return data;
}

function normalizeFaqCategoryId(value: string): string {
  const normalized = value
    .toLowerCase()
    .replace(/&amp;/g, "and")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

  if (!normalized || normalized === "general") {
    return "all";
  }

  return normalized;
}

function pruneEmpty<T extends Record<string, unknown>>(record: T): Partial<T> {
  const clean: Partial<T> = {};

  for (const [key, value] of Object.entries(record)) {
    if (value === undefined || value === null || value === "") {
      continue;
    }

    clean[key as keyof T] = value as T[keyof T];
  }

  return clean;
}

function optionalNumber(value: string | undefined): number | undefined {
  if (!value) {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function optionalInteger(value: string | undefined): number | undefined {
  const parsed = optionalNumber(value);
  return parsed === undefined ? undefined : Math.max(0, Math.round(parsed));
}

async function readHomeSnapshot(file: string): Promise<
  | {
      id: number;
      slug: string;
      status: string;
      title: string;
      modified?: string;
      sourceBlocks: ReturnType<typeof extractSourceBlocks>;
    }
  | undefined
> {
  if (!(await pathExists(file))) {
    return undefined;
  }

  const snapshot = JSON.parse(await readFile(file, "utf8")) as {
    id?: unknown;
    slug?: unknown;
    status?: unknown;
    title?: unknown;
    modified?: unknown;
    content_raw?: unknown;
  };
  const id = toNumberValue(snapshot.id);
  const title = cleanText(toStringValue(snapshot.title));
  const content = toStringValue(snapshot.content_raw);

  if (!Number.isFinite(id) || !title || !content) {
    return undefined;
  }

  return {
    id,
    slug: toStringValue(snapshot.slug) || "home",
    status: toStringValue(snapshot.status) || "publish",
    title,
    modified: toStringValue(snapshot.modified) || undefined,
    sourceBlocks: extractSourceBlocks(content),
  };
}

async function readUseCaseSnapshots(root: string): Promise<
  Map<
    string,
    {
      file: string;
      id: number;
      slug: string;
      modified?: string;
      sourceBlocks: SourceBlock[];
    }
  >
> {
  const snapshots = new Map<
    string,
    {
      file: string;
      id: number;
      slug: string;
      modified?: string;
      sourceBlocks: SourceBlock[];
    }
  >();
  const files = [
    ...(await listJsonFiles(join(root, "pages"))),
    ...(await listJsonFiles(join(root, "backup-use-case-schemes"))),
  ];

  for (const file of files) {
    const snapshot = await readUseCaseSnapshot(file);

    if (!snapshot || !snapshot.sourceBlocks.length) {
      continue;
    }

    snapshots.set(snapshot.slug, snapshot);
  }

  return snapshots;
}

async function listJsonFiles(root: string): Promise<string[]> {
  if (!(await pathExists(root))) {
    return [];
  }

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
}

async function readUseCaseSnapshot(file: string): Promise<
  | {
      file: string;
      id: number;
      slug: string;
      modified?: string;
      sourceBlocks: SourceBlock[];
    }
  | undefined
> {
  const snapshot = JSON.parse(await readFile(file, "utf8")) as {
    id?: unknown;
    slug?: unknown;
    template?: unknown;
    modified?: unknown;
    acf?: unknown;
  };
  const acf = snapshot.acf && typeof snapshot.acf === "object" ? (snapshot.acf as Record<string, unknown>) : undefined;
  const id = toNumberValue(snapshot.id);
  const slug = toStringValue(snapshot.slug) || slugFromSnapshotFile(file);

  if (!Number.isFinite(id) || !slug || !acf || !isUseCaseAcf(acf)) {
    return undefined;
  }

  return {
    file,
    id,
    slug,
    modified: toStringValue(snapshot.modified) || undefined,
    sourceBlocks: useCaseAcfToSourceBlocks(acf),
  };
}

function isUseCaseAcf(acf: Record<string, unknown>): boolean {
  return Boolean(acf.hero_settings || acf.returns_problem_settings || acf.how_it_works_settings);
}

function useCaseAcfToSourceBlocks(acf: Record<string, unknown>): SourceBlock[] {
  const blocks: SourceBlock[] = [];
  const hero = asRecord(acf.hero_settings);
  const features = asRecord(acf.features_settings);
  const problem = asRecord(acf.returns_problem_settings);
  const howItWorks = asRecord(acf.how_it_works_settings);
  const impact = asRecord(acf.ecommerce_impact_settings);
  const onboarding = asRecord(acf.onboarding_timeline_settings);
  const cta = asRecord(acf.cta_settings);
  const faq = asRecord(acf.faq_settings);

  if (isEnabled(hero)) {
    blocks.push(sourceBlock("hero", {
      eyebrow: richTextMarkers(hero.top_text),
      title: richTextMarkers(hero.title),
      description: richTextMarkers(hero.subtitle),
      primary_button: {
        title: "Get Started Free",
        url: "https://app.acme.example/signup",
        target: "",
      },
      primary_note: hero.subtext_1,
      secondary_note: hero.subtext_2,
      image: normalizeSnapshotValue(hero.image),
    }));
  }

  if (isEnabled(features)) {
    const items = asArray(features.items);
    const data: Record<string, unknown> = {
      title: richTextMarkers(features.title),
      background: "white",
      columns: items.length >= 4 ? "4" : "3",
      cards: items.length,
    };

    items.forEach((item, index) => {
      const record = asRecord(item);
      data[`cards_${index}_title`] = cleanSnapshotText(record.title);
      data[`cards_${index}_custom_icon`] = normalizeSnapshotValue(record.icon);
    });

    blocks.push(sourceBlock("feature-grid", data));
  }

  if (isEnabled(problem)) {
    const items = asArray(problem.items);
    const data: Record<string, unknown> = {
      title: richTextMarkers(problem.title),
      background: "gray",
      columns: items.length >= 4 ? "4" : "3",
      cards: items.length,
    };

    items.forEach((item, index) => {
      const record = asRecord(item);
      data[`cards_${index}_title`] = cleanSnapshotText(record.subtitle);
      data[`cards_${index}_description`] = cleanSnapshotText(record.text);
      data[`cards_${index}_custom_icon`] = normalizeSnapshotValue(record.icon);
    });

    blocks.push(sourceBlock("feature-grid", data));
  }

  if (isEnabled(howItWorks)) {
    const steps = asArray(howItWorks.info_blocks);
    const data: Record<string, unknown> = {
      title: richTextMarkers(howItWorks.title),
      background: "white",
      steps: steps.length,
    };

    steps.forEach((step, index) => {
      const record = asRecord(step);
      data[`steps_${index}_label`] = `Step ${index + 1}`;
      data[`steps_${index}_title`] = cleanSnapshotText(record.title);
      data[`steps_${index}_description`] = cleanSnapshotText(record.text);
    });

    blocks.push(sourceBlock("how-it-works", data));
  }

  if (isEnabled(impact)) {
    const columns = asArray(impact.table);
    const rowCount = Math.max(...columns.map((column) => asArray(asRecord(column).items).length), 0);
    const data: Record<string, unknown> = {
      title: richTextMarkers(impact.title),
      background: "gray",
      variant: "comparison",
      headers: columns.length,
      rows: rowCount,
    };

    columns.forEach((column, columnIndex) => {
      const record = asRecord(column);
      data[`headers_${columnIndex}_text`] = cleanSnapshotText(record.title);
    });

    for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
      data[`rows_${rowIndex}_cells`] = columns.length;

      columns.forEach((column, columnIndex) => {
        const cell = asRecord(asArray(asRecord(column).items)[rowIndex]);
        data[`rows_${rowIndex}_cells_${columnIndex}_text`] = cleanSnapshotText(cell.item);
      });
    }

    blocks.push(sourceBlock("pricing-details", data));
  }

  if (isEnabled(onboarding)) {
    const steps = asArray(onboarding.steps);
    const data: Record<string, unknown> = {
      title: richTextMarkers(onboarding.title),
      background: "white",
      steps: steps.length,
    };

    steps.forEach((step, index) => {
      const record = asRecord(step);
      data[`steps_${index}_label`] = cleanSnapshotText(record.title) || `Step ${index + 1}`;
      data[`steps_${index}_description`] = cleanSnapshotText(record.text);
    });

    blocks.push(sourceBlock("how-it-works", data));
  }

  if (isEnabled(cta)) {
    blocks.push(sourceBlock("cta", {
      title: richTextMarkers(cta.title),
      description: richTextMarkers(cta.text),
      secondary_button: normalizeSnapshotLink(cta.link),
    }));
  }

  if (isEnabled(faq)) {
    const items = asArray(faq.list);
    const data: Record<string, unknown> = {
      title: richTextMarkers(faq.title),
      manual_items: items.length,
    };

    items.forEach((item, index) => {
      const record = asRecord(item);
      data[`manual_items_${index}_question`] = cleanSnapshotText(record.question);
      data[`manual_items_${index}_answer`] = cleanSnapshotText(record.answer);
    });

    blocks.push(sourceBlock("faq", data));
  }

  blocks.push(sourceBlock("news-insights", {
    title: "AI Industry {{ News }} and {{ Insights }}",
    posts_count: "3",
  }));

  return blocks.filter((block) => Object.keys(block.data).length > 0);
}

function sourceBlock(name: string, data: Record<string, unknown>, root?: SourceBlock["root"]): SourceBlock {
  return {
    name,
    sourceName: `acme/${name}`,
    root,
    data: sanitizeSnapshotRecord(data),
  };
}

function sanitizeSnapshotRecord(data: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(data)
      .map(([key, value]) => [key, normalizeSnapshotValue(value)] as const)
      .filter(([, value]) => value !== undefined && value !== "" && value !== null),
  );
}

function normalizeSnapshotValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(normalizeSnapshotValue).filter((item) => item !== undefined && item !== "");
  }

  if (value && typeof value === "object") {
    return sanitizeSnapshotRecord(value as Record<string, unknown>);
  }

  if (typeof value === "string") {
    return cleanSnapshotText(value);
  }

  return value ?? undefined;
}

function normalizeSnapshotLink(value: unknown): unknown {
  const link = asRecord(value);
  const title = cleanSnapshotText(link.title);
  const url = cleanSnapshotText(link.url);

  if (!title || !url || url === "#") {
    return {
      title: "Get Started Free",
      url: "https://app.acme.example/signup",
      target: "",
    };
  }

  return {
    title,
    url: normalizeSnapshotUrl(url),
    target: cleanSnapshotText(link.target),
  };
}

function normalizeSnapshotUrl(url: string): string {
  try {
    const parsed = new URL(url);

    if (parsed.hostname === "app.dev.acme.example") {
      parsed.hostname = "app.acme.example";
      return parsed.toString();
    }
  } catch {
    return url;
  }

  return url;
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function isEnabled(section: Record<string, unknown>): boolean {
  return section.show_section === true || section.show_section === 1 || section.show_section === "1";
}

function richTextMarkers(value: unknown): string {
  return cleanSnapshotText(value).replace(/<span>(.*?)<\/span>/gi, "{{ $1 }}");
}

function cleanSnapshotText(value: unknown): string {
  if (typeof value !== "string" && typeof value !== "number") {
    return "";
  }

  return repairMojibake(String(value))
    .replace(/\r\n/g, "\n")
    .replace(/\0/g, "")
    .trim();
}

function repairMojibake(value: string): string {
  return value
    .replace(/â€”/g, "—")
    .replace(/â€“/g, "–")
    .replace(/â€˜/g, "‘")
    .replace(/â€™/g, "’")
    .replace(/â€œ/g, "“")
    .replace(/â€�/g, "”")
    .replace(/â€¦/g, "…")
    .replace(/Â·/g, "·")
    .replace(/Â /g, " ")
    .replace(/Â/g, "");
}

function slugFromSnapshotFile(file: string): string {
  return file
    .replace(/\\/g, "/")
    .split("/")
    .pop()
    ?.replace(/^\d+-/, "")
    .replace(/\.json$/, "") || "";
}

function dedupeSourceBlockAnchors(blocks: SourceBlock[]): void {
  const seen = new Map<string, number>();

  for (const block of blocks) {
    const anchor = block.root?.anchor;

    if (!anchor) {
      continue;
    }

    const count = seen.get(anchor) ?? 0;
    seen.set(anchor, count + 1);

    if (count === 0) {
      continue;
    }

    block.root = {
      ...block.root,
      anchor: `${anchor}-${count + 1}`,
    };
  }
}
