import { readFile } from 'node:fs/promises';

import { pageDocumentSchema, type PageBlock, type PageDocument } from '@acme/blocks';

import { normalizeSeo, setFallbackTestimonials, setSourceMediaRecords, transformSourceBlock } from './block-transform';
import { argString, currentBuildRevision, currentSourceEraId, parseArgs, pathExists, sourceBasename, writeJson } from './source-utils';

type SanitizedDocument = {
  recordKey: string;
  sourceKind: string;
  status: string;
  path: string;
  title: string;
  excerpt?: string;
  publishedAt?: string;
  featuredImageSourceId?: number;
  articleMeta?: PageDocument['articleMeta'];
  tipCard?: PageDocument['tipCard'];
  richTextHtml?: string;
  seo?: Record<string, unknown>;
  sourceBlocks?: Array<{
    name: string;
    sourceName: string;
    root?: {
      anchor?: string;
      className?: string;
    };
    data: Record<string, unknown>;
  }>;
};

type ExportReportItem = {
  path: string;
  title: string;
  mappedBlocks: number;
  unmappedBlocks: Array<{ sourceName: string; reason: string }>;
  skippedBlocks: Array<{ sourceName: string; reason: string }>;
  recoveredFrom?: {
    path: string;
    blockType: PageBlock['type'];
    reason: string;
  };
  validationError?: string;
};

const args = parseArgs();
const input = argString(args, 'input', 'data/source/sanitized-content.json')!;
const out = argString(args, 'out', 'data/source/cms-pages.json')!;
const reportOut = argString(args, 'report', 'data/source/cms-export-report.json')!;
const mediaInput = argString(args, 'media', 'data/source/attachment-media.json')!;

const source = JSON.parse(await readFile(input, 'utf8')) as { documents?: SanitizedDocument[] };
const mediaSource = await readMediaRecords(mediaInput);
const mediaByPublicPath = new Map(mediaSource.map((record) => [record.publicPath, record]));
const mediaById = new Map(mediaSource.map((record) => [record.id, record]));
const pages: PageDocument[] = [];
const report: ExportReportItem[] = [];

setSourceMediaRecords(mediaSource);
setFallbackTestimonials(collectFallbackTestimonials(source.documents ?? []));

for (const document of source.documents ?? []) {
  const blocks: PageBlock[] = [];
  const unmappedBlocks: ExportReportItem['unmappedBlocks'] = [];
  const skippedBlocks: ExportReportItem['skippedBlocks'] = [];

  if (document.richTextHtml) {
    blocks.push({
      type: 'rich-text',
      title: document.title,
      html: normalizeRichTextHtml(document.richTextHtml),
    });
  }

  for (const sourceBlock of document.sourceBlocks ?? []) {
    const result = transformSourceBlock(sourceBlock, document.title);

    if (result.block) {
      blocks.push(applyBlockRoot(result.block, sourceBlock.root));
      continue;
    }

    const skipped = result.skipped ? skippedBlocks : unmappedBlocks;

    skipped.push({
      sourceName: sourceBlock.sourceName,
      reason: result.reason || 'No transform result.',
    });
  }

  const seo = withDerivedMetaDescription(normalizeSeo(document.seo ?? {}), document, blocks);
  const featuredImage = document.featuredImageSourceId
    ? imageFromMediaRecord(mediaById.get(document.featuredImageSourceId))
    : undefined;
  const candidate = {
    contentKey: document.recordKey,
    collection: inferCollection(document),
    path: document.path,
    title: document.title,
    excerpt: document.excerpt,
    featuredImage: featuredImage ?? seo.ogImage ?? seo.twitterImage,
    publishedAt: document.publishedAt,
    articleMeta: document.articleMeta,
    tipCard: document.tipCard,
    status: document.status === 'publish' ? 'published' : 'draft',
    template: inferTemplate(document),
    seo,
    blocks,
  };

  const parsed = pageDocumentSchema.safeParse(candidate);

  if (parsed.success) {
    pages.push(parsed.data);
    report.push({
      path: document.path,
      title: document.title,
      mappedBlocks: blocks.length,
      unmappedBlocks,
      skippedBlocks,
    });
    continue;
  }

  report.push({
    path: document.path,
    title: document.title,
    mappedBlocks: blocks.length,
    unmappedBlocks,
    skippedBlocks,
    validationError: parsed.error.message,
  });
}

hydrateEmptyPagesFromLinkedSourceCards(pages, report);
ensureCollectionIndexPages(pages);

await writeJson(out, {
  generatedAt: new Date().toISOString(),
  provenance: {
    sourceEraId: currentSourceEraId,
    buildRevision: currentBuildRevision(),
    input,
    mediaInput,
    sourceDump: source.source ? sourceBasename(String((source as { source?: { dumpFile?: unknown } }).source?.dumpFile ?? '')) : undefined,
  },
  collections: [...new Set(pages.map((page) => page.collection))].sort(),
  pages,
});

await writeJson(reportOut, {
  generatedAt: new Date().toISOString(),
  provenance: {
    sourceEraId: currentSourceEraId,
    buildRevision: currentBuildRevision(),
    input,
    mediaInput,
  },
  totals: {
    sourceDocuments: source.documents?.length ?? 0,
    validPages: pages.length,
    pagesWithUnmappedBlocks: report.filter((item) => item.unmappedBlocks.length > 0).length,
    pagesWithSkippedBlocks: report.filter((item) => item.skippedBlocks.length > 0).length,
    pagesRecoveredFromLinkedCards: report.filter((item) => item.recoveredFrom).length,
    invalidPages: report.filter((item) => item.validationError).length,
  },
  pages: report,
});

console.log(JSON.stringify({
  ok: true,
  out,
  report: reportOut,
  validPages: pages.length,
  pagesWithUnmappedBlocks: report.filter((item) => item.unmappedBlocks.length > 0).length,
  pagesWithSkippedBlocks: report.filter((item) => item.skippedBlocks.length > 0).length,
  pagesRecoveredFromLinkedCards: report.filter((item) => item.recoveredFrom).length,
}, null, 2));

function applyBlockRoot(block: PageBlock, root: NonNullable<SanitizedDocument['sourceBlocks']>[number]['root']): PageBlock {
  if (!root?.anchor && !root?.className) {
    return block;
  }

  return {
    ...block,
    root,
  } as PageBlock;
}

function inferCollection(document: SanitizedDocument): PageDocument['collection'] {
  if (document.sourceKind === 'post') {
    return 'posts';
  }

  if (document.sourceKind === 'news') {
    return 'news';
  }

  if (document.sourceKind === 'guide') {
    return 'guides';
  }

  if (document.sourceKind === 'tip') {
    return 'tips';
  }

  if (isUseCasePath(document.path)) {
    return 'use-cases';
  }

  return 'pages';
}

function inferTemplate(document: SanitizedDocument): PageDocument['template'] {
  if (document.sourceKind === 'post') {
    return 'article';
  }

  if (document.sourceKind === 'news') {
    return 'news';
  }

  if (document.sourceKind === 'guide') {
    return 'guide';
  }

  if (document.sourceKind === 'tip') {
    return 'tip';
  }

  if (isUseCasePath(document.path)) {
    return 'use-case';
  }

  return document.richTextHtml ? 'document' : 'standard';
}

function hydrateEmptyPagesFromLinkedSourceCards(pages: PageDocument[], items: ExportReportItem[]): void {
  const candidates = collectLinkedSideBySideCards(pages);

  for (const page of pages) {
    if (page.status !== 'published' || page.blocks.length > 0 || isCollectionIndexPath(page.path)) {
      continue;
    }

    const source = candidates.get(normalizeRoutablePath(page.path));

    if (!source) {
      continue;
    }

    const detailBlock: Extract<PageBlock, { type: 'side-by-side' }> = {
      ...source.block,
      primaryAction: undefined,
      root: {
        anchor: 'overview',
      },
    };
    const recoveredPage = pageDocumentSchema.parse({
      ...page,
      blocks: [
        {
          type: 'hero',
          eyebrow: source.page.title,
          title: page.title,
          description: page.seo?.metaDescription ?? detailBlock.description ?? detailBlock.cardDescription,
        },
        detailBlock,
      ],
    });

    page.blocks = recoveredPage.blocks;

    const reportItem = items.find((item) => item.path === page.path);

    if (reportItem) {
      reportItem.mappedBlocks = page.blocks.length;
      reportItem.recoveredFrom = {
        path: source.page.path,
        blockType: source.block.type,
        reason: 'Recovered empty published detail page from a source-backed linked use-case card.',
      };
    }
  }
}

function collectLinkedSideBySideCards(pages: PageDocument[]): Map<string, {
  page: PageDocument;
  block: Extract<PageBlock, { type: 'side-by-side' }>;
}> {
  const candidates = new Map<string, {
    page: PageDocument;
    block: Extract<PageBlock, { type: 'side-by-side' }>;
  }>();

  for (const page of pages) {
    for (const block of page.blocks) {
      if (block.type !== 'side-by-side' || !block.primaryAction?.href) {
        continue;
      }

      const href = normalizeRoutablePath(block.primaryAction.href);

      if (!href || href === normalizeRoutablePath(page.path) || candidates.has(href)) {
        continue;
      }

      candidates.set(href, {
        page,
        block,
      });
    }
  }

  return candidates;
}

function isCollectionIndexPath(path: string): boolean {
  return ['/blog/', '/guides/', '/news/', '/tips-and-tricks/'].includes(path);
}

function normalizeRoutablePath(value: string): string {
  const withoutOrigin = value.replace(/^https?:\/\/(?:www\.)?acme\.ai/i, '');
  const [withoutQuery] = withoutOrigin.split(/[?#]/);

  if (!withoutQuery || !withoutQuery.startsWith('/')) {
    return '';
  }

  return withoutQuery.endsWith('/') ? withoutQuery : `${withoutQuery}/`;
}

function isUseCasePath(path: string): boolean {
  return path.startsWith('/use-cases/') || path.startsWith('/use-case/') || path.includes('-ai-agent/');
}

function normalizeRichTextHtml(html: string): string {
  return normalizeImportedMediaReferences(html
    .replace(/https?:\/\/(?:www\.)?acme\.ai\/wp-content\/uploads\//gi, '/media/')
    .replace(/https?:\/\/(?:www\.)?acme\.ai(\/[^"'<>\s)]*)/gi, '$1')
    .replace(/\[caption[^\]]*\]/gi, '')
    .replace(/\[\/caption\]/gi, '')
    .replace(/\sclass=(["'])(.*?)\1/gi, (_match, quote: string, className: string) => {
      const cleaned = className
        .split(/\s+/)
        .filter((token) => token && !/^wp-/.test(token) && !/^size-/.test(token) && !/^align/.test(token))
        .join(' ');

      return cleaned ? ` class=${quote}${cleaned}${quote}` : '';
    }));
}

function withDerivedMetaDescription(
  seo: NonNullable<PageDocument['seo']>,
  document: SanitizedDocument,
  blocks: PageBlock[],
): NonNullable<PageDocument['seo']> {
  if (seo.metaDescription) {
    return seo;
  }

  const fallback = deriveMetaDescription(document, blocks);

  if (!fallback) {
    return seo;
  }

  return {
    ...seo,
    metaDescription: fallback,
  };
}

function deriveMetaDescription(document: SanitizedDocument, blocks: PageBlock[]): string | undefined {
  const candidates = [
    ...blocks.flatMap(blockTextCandidates),
    document.richTextHtml,
    document.title,
  ];

  for (const candidate of candidates) {
    const text = normalizePlainText(candidate);

    if (text && text.length >= 50 && text !== document.title && !looksLikeStyleArtifact(text)) {
      return trimMetaDescription(text);
    }
  }

  const title = normalizePlainText(document.title);
  return title || undefined;
}

function ensureCollectionIndexPages(pages: PageDocument[]): void {
  const indexPages: PageDocument[] = [
    {
      contentKey: 'system:collection-index:news',
      collection: 'news',
      path: '/news/',
      title: 'News',
      status: 'published',
      template: 'news',
      seo: {
        metaDescription: 'Product updates, platform improvements, and release notes from the Acme team.',
      },
      blocks: [],
    },
  ];

  for (const indexPage of indexPages) {
    if (!pages.some((page) => page.path === indexPage.path)) {
      pages.push(pageDocumentSchema.parse(indexPage));
    }
  }
}

function imageFromMediaRecord(
  record: { id: number; publicPath: string; alt?: string } | undefined,
): PageDocument['featuredImage'] {
  if (!record) {
    return undefined;
  }

  return {
    id: String(record.id),
    src: record.publicPath,
    alt: record.alt || '',
  };
}

function looksLikeStyleArtifact(value: string): boolean {
  return /(?:\[[^\]]+:[^\]]+\]|_[a-z0-9-]+>|bg-|border-|rounded|transition-|duration-|ease-|px-|my-\[)/i.test(value);
}

function blockTextCandidates(block: PageBlock): unknown[] {
  const record = block as Record<string, unknown>;
  return [
    record.description,
    record.subtitle,
    record.intro,
    record.bodyTop,
    record.html,
    record.title,
  ];
}

function normalizePlainText(value: unknown): string {
  if (typeof value !== 'string') {
    return '';
  }

  return decodeHtmlEntities(value)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\{\{|\}\}/g, '')
    .replace(/\|\|/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>');
}

function trimMetaDescription(value: string): string {
  if (value.length <= 160) {
    return value;
  }

  const sliced = value.slice(0, 157);
  const lastSpace = sliced.lastIndexOf(' ');
  const trimmed = (lastSpace >= 100 ? sliced.slice(0, lastSpace) : sliced).trim();

  return `${trimmed.replace(/[.,;:!?-]+$/g, '')}...`;
}

function normalizeImportedMediaReferences(html: string): string {
  return html.replace(/\/media\/[^"'<>\s),]+/g, (value) => resolveImportedPublicPath(value));
}

function resolveImportedPublicPath(publicPath: string): string {
  const decoded = safeDecodeUri(publicPath);

  if (mediaByPublicPath.has(decoded)) {
    return decoded;
  }

  const withoutSize = stripImageSizeVariant(decoded);

  if (withoutSize !== decoded && mediaByPublicPath.has(withoutSize)) {
    return withoutSize;
  }

  const scaledOriginal = toScaledImageVariant(decoded);

  if (scaledOriginal !== decoded && mediaByPublicPath.has(scaledOriginal)) {
    return scaledOriginal;
  }

  return decoded;
}

function stripImageSizeVariant(publicPath: string): string {
  return publicPath.replace(/-\d+x\d+(?=\.[^./]+$)/, '');
}

function toScaledImageVariant(publicPath: string): string {
  return publicPath.replace(/-\d+x\d+(?=\.[^./]+$)/, '-scaled');
}

function safeDecodeUri(value: string): string {
  try {
    return decodeURI(value);
  } catch {
    return value;
  }
}

async function readMediaRecords(file: string): Promise<Array<{ id: number; file?: string; publicPath: string; alt?: string }>> {
  if (!(await pathExists(file))) {
    return [];
  }

  const data = JSON.parse(await readFile(file, 'utf8')) as {
    records?: Array<{ id?: number; file?: string; publicPath?: string; alt?: string }>;
  };

  return (data.records ?? []).flatMap((record) => {
    const id = record.id;

    if (!Number.isFinite(id) || !record.publicPath) {
      return [];
    }

    return [{
      id,
      file: record.file,
      publicPath: record.publicPath,
      alt: record.alt,
    }];
  });
}

function collectFallbackTestimonials(documents: SanitizedDocument[]): Extract<PageBlock, { type: 'testimonials' }>['items'] {
  const items: Extract<PageBlock, { type: 'testimonials' }>['items'] = [];
  const seen = new Set<string>();

  for (const document of documents) {
    for (const sourceBlock of document.sourceBlocks ?? []) {
      if (sourceBlock.name !== 'testimonial') {
        continue;
      }

      const result = transformSourceBlock(sourceBlock, document.title);

      if (result.block?.type !== 'testimonials') {
        continue;
      }

      for (const item of result.block.items) {
        const key = [
          item.quote ?? '',
          item.authorName ?? '',
          item.authorRole ?? '',
        ].join('\u001f');

        if (seen.has(key)) {
          continue;
        }

        seen.add(key);
        items.push(item);
      }
    }
  }

  return items;
}
