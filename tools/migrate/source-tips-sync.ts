import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

import { pageDocumentSchema, type PageDocument } from '@acme/blocks';

import { argString, parseArgs, writeJson } from './source-utils';

type TipsSnapshot = {
  records?: Array<{
    sourceId: number;
    path: string;
    title: string;
    contentHtml: string;
    publishedAt?: string;
    updatedAt?: string;
    category?: string;
    seo?: PageDocument['seo'];
    tipCard?: PageDocument['tipCard'];
  }>;
};

type PagesExport = {
  pages?: PageDocument[];
};

const args = parseArgs();
const snapshotPath = argString(args, 'snapshot', 'data/source/tips-presentation-reference.json')!;
const pagesPath = argString(args, 'pages', 'data/cms/pages.json')!;
const out = argString(args, 'out', 'data/source/production-tips-pages.json')!;

const [snapshot, current] = await Promise.all([
  readJson<TipsSnapshot>(snapshotPath),
  readJson<PagesExport>(pagesPath),
]);
const currentTipsByPath = new Map(
  (current.pages ?? [])
    .filter((page) => page.collection === 'tips')
    .map((page) => [page.path, page]),
);

const pages = (snapshot.records ?? []).map((record) => {
  const currentTip = currentTipsByPath.get(record.path);
  const candidate: PageDocument = {
    contentKey: currentTip?.contentKey ?? stableDocumentKey(record.sourceId),
    collection: 'tips',
    path: record.path,
    title: decodeHtml(record.title),
    excerpt: currentTip?.excerpt,
    featuredImage: currentTip?.featuredImage,
    publishedAt: record.publishedAt,
    articleMeta: {
      tags: currentTip?.articleMeta?.tags ?? [],
      category: record.category ?? currentTip?.articleMeta?.category,
      authorName: currentTip?.articleMeta?.authorName,
      updatedAt: record.updatedAt ?? currentTip?.articleMeta?.updatedAt,
      ratingAverage: currentTip?.articleMeta?.ratingAverage,
      ratingCount: currentTip?.articleMeta?.ratingCount,
      views: currentTip?.articleMeta?.views,
      showTableOfContents: true,
      showTableOfContentsTitle: currentTip?.articleMeta?.showTableOfContentsTitle ?? false,
      tableOfContentsTitle: currentTip?.articleMeta?.tableOfContentsTitle ?? 'Contents',
    },
    tipCard: record.tipCard ?? currentTip?.tipCard ?? {
      category: record.category,
      archiveWidth: 1,
      icons: [],
    },
    status: 'published',
    template: 'tip',
    seo: record.seo ?? currentTip?.seo ?? {},
    blocks: [{
      type: 'rich-text',
      title: decodeHtml(record.title),
      html: record.contentHtml,
    }],
  };

  return pageDocumentSchema.parse(candidate);
});

await writeJson(out, {
  generatedAt: new Date().toISOString(),
  source: snapshotPath,
  preservePolicy: 'This output contains production Tips only. Upsert without --prune preserves local-only pages and Tips.',
  pages,
});

console.log(JSON.stringify({
  ok: true,
  action: 'prepared-production-tips',
  out,
  pages: pages.length,
  existingTipsUpdated: pages.filter((page) => currentTipsByPath.has(page.path)).length,
  productionTipsAdded: pages.filter((page) => !currentTipsByPath.has(page.path)).length,
}, null, 2));

async function readJson<T>(file: string): Promise<T> {
  return JSON.parse(await readFile(file, 'utf8')) as T;
}

function stableDocumentKey(sourceId: number): string {
  return createHash('sha1').update(`document:${sourceId}`).digest('hex').slice(0, 16);
}

function decodeHtml(value: string): string {
  return value
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#0?39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\s+/g, ' ')
    .trim();
}
