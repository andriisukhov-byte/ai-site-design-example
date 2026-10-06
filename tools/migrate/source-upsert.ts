import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { config as loadEnv } from 'dotenv';
import { getPayload } from 'payload';

import { pageDocumentSchema, type ContentCollection, type PageBlock, type PageDocument } from '@acme/blocks';

import { argString, parseArgs } from './source-utils';

type ImportResult = {
  created: number;
  updated: number;
  validated: number;
  collections: Record<string, number>;
  featuredMediaResolved: number;
  featuredMediaMissing: number;
  pruned: number;
};

type ValidationError = {
  index: number;
  error: string;
};

const args = parseArgs();
const file = argString(args, 'file', 'data/source/cms-pages.json')!;
const pathFilter = argString(args, 'path');
const collectionFilter = argString(args, 'collection');
const offset = argNumber(args, 'offset', 0) ?? 0;
const limit = argNumber(args, 'limit');
const progressEvery = argNumber(args, 'progress', 25) ?? 25;
const shouldWrite = args.write === true || args.write === 'true';
const shouldPrune = args.prune === true || args.prune === 'true';
const input = JSON.parse(await readFile(file, 'utf8')) as { pages?: unknown[] };
const pages = input.pages ?? [];
const parsedPages: PageDocument[] = [];
const collections: Record<string, number> = {};
const errors: ValidationError[] = [];
let matchedPages = 0;

pages.forEach((candidate, index) => {
  const parsed = pageDocumentSchema.safeParse(candidate);

  if (!parsed.success) {
    errors.push({ index, error: parsed.error.message });
    return;
  }

  if (pathFilter && parsed.data.path !== pathFilter) {
    return;
  }

  if (collectionFilter && parsed.data.collection !== collectionFilter) {
    return;
  }

  if (matchedPages < offset) {
    matchedPages += 1;
    return;
  }
  matchedPages += 1;

  if (limit !== undefined && parsedPages.length >= limit) {
    return;
  }

  parsedPages.push(parsed.data);
  collections[parsed.data.collection] = (collections[parsed.data.collection] ?? 0) + 1;
});

if (errors.length) {
  console.error(JSON.stringify({
    ok: false,
    file,
    pages: pages.length,
    errors: errors.slice(0, 10),
    truncated: errors.length > 10,
  }, null, 2));
  process.exit(1);
}

if (!shouldWrite) {
  console.log(JSON.stringify({
    ok: true,
    action: 'validated',
    file,
    pages: parsedPages.length,
    collections,
    note: 'Dry-run only. Re-run with --write true to upsert into Payload.',
  }, null, 2));
  process.exit(0);
}

loadCmsEnv();
const { default: payloadConfig } = await import('../../apps/cms/src/payload.config');
const payload = await getPayload({ config: payloadConfig });
const mediaDocuments = await payload.find({
  collection: 'media',
  pagination: false,
  limit: 10000,
  depth: 0,
  overrideAccess: true,
});
const mediaIdBySourceId = new Map(
  mediaDocuments.docs
    .filter((doc) => typeof doc.sourceId === 'number')
    .map((doc) => [String(doc.sourceId), doc.id]),
);
const result: ImportResult = {
  created: 0,
  updated: 0,
  validated: parsedPages.length,
  collections,
  featuredMediaResolved: 0,
  featuredMediaMissing: 0,
  pruned: 0,
};
const importedAt = new Date().toISOString();

if (progressEvery > 0) {
  console.error(`Upserting ${parsedPages.length} documents into Payload from ${file}...`);
}

for (const [index, page] of parsedPages.entries()) {
  const collection = page.collection;
  const featuredMediaId = page.featuredImage?.id
    ? mediaIdBySourceId.get(String(page.featuredImage.id))
    : undefined;
  const data = toPayloadDocument(page, file, importedAt, featuredMediaId);

  if (page.featuredImage?.id) {
    if (featuredMediaId !== undefined) {
      result.featuredMediaResolved += 1;
    } else {
      result.featuredMediaMissing += 1;
    }
  }

  if (progressEvery > 0 && (index === 0 || index % progressEvery === 0)) {
    console.error(`[${index + 1}/${parsedPages.length}] ${collection} ${page.path}`);
  }

  const existing = await payload.find({
    collection,
    where: {
      path: {
        equals: page.path,
      },
    },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });

  if (existing.docs[0]) {
    await withSqliteBusyRetry(() => payload.update({
        collection,
        id: existing.docs[0].id,
        data,
        overrideAccess: true,
      }));
    result.updated += 1;
  } else {
    await withSqliteBusyRetry(() => payload.create({
        collection,
        data,
        overrideAccess: true,
      }));
    result.created += 1;
  }
}

if (shouldPrune && collectionFilter) {
  const expectedPaths = new Set(parsedPages.map((page) => page.path));
  const existing = await payload.find({
    collection: collectionFilter as ContentCollection,
    pagination: false,
    limit: 10000,
    depth: 0,
    overrideAccess: true,
  });

  for (const document of existing.docs) {
    const path = typeof document.path === 'string' ? document.path : '';
    const trace = document.importTrace && typeof document.importTrace === 'object'
      ? document.importTrace as { source?: unknown }
      : undefined;
    if (path && !expectedPaths.has(path) && trace?.source === 'source-json') {
      await withSqliteBusyRetry(() => payload.delete({
        collection: collectionFilter as ContentCollection,
        id: document.id,
        overrideAccess: true,
      }));
      result.pruned += 1;
    }
  }
}

await destroyPayload(payload);

console.log(JSON.stringify({
  ok: true,
  action: 'upserted',
  file,
  ...result,
}, null, 2));
process.exit(0);

function loadCmsEnv(): void {
  loadEnv({ path: resolve('apps/cms/.env') });

  const databaseUrl = process.env.DATABASE_URL;

  if (databaseUrl?.startsWith('file:./')) {
    process.env.DATABASE_URL = `file:${resolve('apps/cms', databaseUrl.slice('file:./'.length)).replace(/\\/g, '/')}`;
  }

  process.env.PAYLOAD_MCP_DISABLED ??= 'true';
  process.env.PAYLOAD_MIGRATING ??= 'true';
}

async function withSqliteBusyRetry<T>(operation: () => Promise<T>): Promise<T> {
  const attempts = 20;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      if (!isSqliteBusyError(error) || attempt === attempts) {
        throw error;
      }

      await new Promise((resolveDelay) => setTimeout(resolveDelay, attempt * 100));
    }
  }

  throw new Error('SQLite busy retry exhausted.');
}

function isSqliteBusyError(error: unknown): boolean {
  let current = error;

  for (let depth = 0; depth < 5 && current; depth += 1) {
    if (typeof current === 'object') {
      const record = current as { code?: unknown; message?: unknown; cause?: unknown };
      if (record.code === 'SQLITE_BUSY' || /database is locked|SQLITE_BUSY/i.test(String(record.message ?? ''))) {
        return true;
      }
      current = record.cause;
    } else {
      return /database is locked|SQLITE_BUSY/i.test(String(current));
    }
  }

  return false;
}

function argNumber(args: Record<string, string | boolean>, key: string, fallback?: number): number | undefined {
  const value = args[key];

  if (value === undefined) {
    return fallback;
  }

  if (typeof value === 'boolean') {
    return fallback;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function toPayloadDocument(
  page: PageDocument,
  sourceFile: string,
  importedAt: string,
  featuredMediaId?: number | string,
): Record<string, unknown> {
  const document = cleanUndefined({
    contentKey: page.contentKey,
    title: page.title,
    slug: slugFromPath(page.path),
    path: page.path,
    excerpt: page.excerpt,
    featuredImage: featuredMediaId,
    sourceFeaturedImage: page.featuredImage,
    publishedAt: page.publishedAt,
    articleMeta: page.articleMeta
      ? {
          ...page.articleMeta,
          tags: page.articleMeta.tags.map((label) => ({ label })),
        }
      : undefined,
    tipCard: page.tipCard
      ? {
          category: page.tipCard.category,
          archiveWidth: page.tipCard.archiveWidth,
          sourceIcons: page.tipCard.icons,
        }
      : undefined,
    status: page.status,
    _status: page.status,
    template: page.template,
    seo: cleanUndefined(page.seo),
    blocks: page.blocks.map(toPayloadBlock),
    importTrace: {
      source: 'source-json',
      sourceFile,
      importedAt,
      collection: page.collection,
      path: page.path,
    },
  });

  return toPayloadStorageValue(document) as Record<string, unknown>;
}

function toPayloadBlock(block: PageBlock): Record<string, unknown> {
  const { type, ...rest } = block as PageBlock & { type: ContentCollection | string };
  const payloadBlock = normalizeBlockFields(type, cleanUndefined(rest));

  return {
    ...payloadBlock,
    blockType: type,
  };
}

function normalizeBlockFields(type: string, value: unknown): Record<string, unknown> {
  const block = cleanUndefined(value) as Record<string, unknown>;

  if (type === 'content-feed' || type === 'news-insights') {
    block.cards = normalizeCards(block.cards);
  }

  if (type === 'pricing-cards') {
    block.cards = normalizePricingCards(block.cards);
  }

  if (type === 'pricing-details') {
    block.sections = normalizePricingSections(block.sections);
  }

  if (type === 'difference') {
    block.leftItems = normalizeTextItems(block.leftItems);
    block.rightItems = normalizeTextItems(block.rightItems);
  }

  return cleanUndefined(block) as Record<string, unknown>;
}

function normalizeCards(value: unknown): unknown {
  if (!Array.isArray(value)) {
    return value;
  }

  return value.map((card) => {
    if (!card || typeof card !== 'object' || Array.isArray(card)) {
      return card;
    }

    const next = { ...card } as Record<string, unknown>;
    next.tags = normalizeLabels(next.tags);
    return cleanUndefined(next);
  });
}

function normalizePricingCards(value: unknown): unknown {
  if (!Array.isArray(value)) {
    return value;
  }

  return value.map((card) => {
    if (!card || typeof card !== 'object' || Array.isArray(card)) {
      return card;
    }

    const next = { ...card } as Record<string, unknown>;
    next.features = normalizeTextItems(next.features);
    return cleanUndefined(next);
  });
}

function normalizePricingSections(value: unknown): unknown {
  if (!Array.isArray(value)) {
    return value;
  }

  return value.map((section) => {
    if (!section || typeof section !== 'object' || Array.isArray(section)) {
      return section;
    }

    const next = { ...section } as Record<string, unknown>;
    next.headers = normalizeTextItems(next.headers);
    return cleanUndefined(next);
  });
}

function normalizeLabels(value: unknown): unknown {
  if (!Array.isArray(value)) {
    return value;
  }

  return value
    .map((item) => {
      if (typeof item === 'string') {
        return { label: item };
      }

      return item;
    })
    .filter(Boolean);
}

function normalizeTextItems(value: unknown): unknown {
  if (!Array.isArray(value)) {
    return value;
  }

  return value
    .map((item) => {
      if (typeof item === 'string') {
        return { text: item };
      }

      return item;
    })
    .filter(Boolean);
}

function cleanUndefined(value: unknown): unknown {
  if (Array.isArray(value)) {
    const items = value.map(cleanUndefined).filter((item) => item !== undefined);
    return items.length ? items : undefined;
  }

  if (!value || typeof value !== 'object') {
    return value;
  }

  const entries = Object.entries(value)
    .map(([key, item]) => [key, cleanUndefined(item)] as const)
    .filter(([, item]) => item !== undefined);

  if (entries.length === 0) {
    return undefined;
  }

  return Object.fromEntries(
    entries,
  );
}

function toPayloadStorageValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(toPayloadStorageValue);
  }

  if (!value || typeof value !== 'object') {
    return value;
  }

  const record = value as Record<string, unknown>;
  const entries = Object.entries(record).map(([key, item]) => [key, toPayloadStorageValue(item)] as const);
  const next = Object.fromEntries(entries);

  if (isRuntimeImageDescriptor(next) && typeof next.id === 'string') {
    next.sourceId = next.id;
    delete next.id;
  }

  return next;
}

function isRuntimeImageDescriptor(value: Record<string, unknown>): boolean {
  if (!('src' in value)) {
    return false;
  }

  return Object.keys(value).every((key) => ['id', 'src', 'alt', 'width', 'height'].includes(key));
}

function slugFromPath(path: string): string {
  const clean = path.replace(/^\/+|\/+$/g, '');
  return clean.split('/').filter(Boolean).pop() || 'home';
}

async function destroyPayload(payload: unknown): Promise<void> {
  const maybeDestroy = payload && typeof payload === 'object' ? (payload as { destroy?: () => Promise<void> }).destroy : undefined;

  if (maybeDestroy) {
    await maybeDestroy();
  }
}
