import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { config as loadEnv } from 'dotenv';
import { getPayload } from 'payload';

import {
  pageDocumentSchema,
  payloadDocumentToPage,
  type ContentCollection,
  type PageBlock,
  type PageDocument,
} from '@acme/blocks';

type PayloadApiResponse = { docs?: Array<Record<string, unknown>> };
type UpsertResult = {
  path: string;
  collection: ContentCollection;
  operation: 'created' | 'updated';
  id: string | number;
  blocks: number;
};

const args = parseArgs();
const file = stringArg(args, 'file');
const target = stringArg(args, 'target', 'api');
const shouldWrite = args.write === true || args.write === 'true';
// Demo seeding only: publish on import instead of the default draft.
const shouldPublish = args.publish === true || args.publish === 'true';

if (!file) {
  console.error('Usage: npm run cms:upsert -- --file path/to/pages.json --write true --target api|local');
  process.exit(1);
}

if (target !== 'api' && target !== 'local') {
  console.error(`Unsupported --target ${target}. Use api or local.`);
  process.exit(1);
}

const input = JSON.parse(await readFile(file, 'utf8')) as unknown;
const candidates = Array.isArray(input)
  ? input
  : input && typeof input === 'object' && Array.isArray((input as { pages?: unknown[] }).pages)
    ? (input as { pages: unknown[] }).pages
    : [input];
const pages = candidates.map((candidate, index) => {
  const parsed = pageDocumentSchema.safeParse(candidate);
  if (!parsed.success) {
    throw new Error(`Invalid PageDocument at index ${index}: ${parsed.error.message}`);
  }
  return parsed.data;
});

const duplicatePaths = pages
  .map((page) => page.path)
  .filter((path, index, all) => all.indexOf(path) !== index);
if (duplicatePaths.length) {
  throw new Error(`Input contains duplicate paths: ${[...new Set(duplicatePaths)].join(', ')}`);
}

if (!shouldWrite) {
  console.log(JSON.stringify({
    ok: true,
    action: 'validated',
    file,
    target,
    pages: pages.map((page) => ({
      collection: page.collection,
      path: page.path,
      blocks: page.blocks.length,
      status: page.status,
    })),
    note: 'Dry run. Re-run with --write true to create or update the documents.',
  }, null, 2));
  process.exit(0);
}

const results = target === 'api'
  ? await upsertViaApi(pages)
  : await upsertLocally(pages);

console.log(JSON.stringify({
  ok: true,
  action: 'upserted',
  target,
  file,
  created: results.filter((result) => result.operation === 'created').length,
  updated: results.filter((result) => result.operation === 'updated').length,
  pages: results,
}, null, 2));
// Payload's local API leaves handles open after destroy(); exit explicitly.
process.exit(0);

async function upsertViaApi(pagesToWrite: PageDocument[]): Promise<UpsertResult[]> {
  const apiUrl = stringArg(args, 'api-url', process.env.PAYLOAD_API_URL ?? 'http://localhost:3000/api')!;
  const token = stringArg(args, 'token', process.env.PAYLOAD_API_TOKEN);
  const headers = {
    accept: 'application/json',
    'content-type': 'application/json',
    ...(token ? { authorization: `Bearer ${token}` } : {}),
  };
  const results: UpsertResult[] = [];

  for (const page of pagesToWrite) {
    const collectionUrl = new URL(`${apiUrl.replace(/\/+$/, '')}/${page.collection}`);
    collectionUrl.searchParams.set('where[path][equals]', page.path);
    collectionUrl.searchParams.set('limit', '1');
    collectionUrl.searchParams.set('depth', '0');

    const findResponse = await fetch(collectionUrl, { headers });
    if (!findResponse.ok) {
      throw await apiError('find', page, findResponse);
    }

    const found = await findResponse.json() as PayloadApiResponse;
    const existing = found.docs?.[0];
    const method = existing ? 'PATCH' : 'POST';
    const writeUrl = existing
      ? `${apiUrl.replace(/\/+$/, '')}/${page.collection}/${encodeURIComponent(String(existing.id))}`
      : `${apiUrl.replace(/\/+$/, '')}/${page.collection}`;
    const writeResponse = await fetch(writeUrl, {
      method,
      headers,
      body: JSON.stringify(toPayloadDocument(page, file)),
    });
    if (!writeResponse.ok) {
      throw await apiError(method.toLowerCase(), page, writeResponse);
    }

    // Payload's REST create/update replies with `{ message, doc }`, not a bare
    // document. Unwrap it, or the round-trip assertion reads the envelope and
    // reports every successful write as a lost route.
    const written = await writeResponse.json() as Record<string, unknown>;
    const document = (written.doc ?? written) as Record<string, unknown>;
    assertPayloadRoundTrip(page, document);
    results.push({
      path: page.path,
      collection: page.collection,
      operation: existing ? 'updated' : 'created',
      id: document.id as string | number,
      blocks: page.blocks.length,
    });
  }

  return results;
}

async function upsertLocally(pagesToWrite: PageDocument[]): Promise<UpsertResult[]> {
  loadCmsEnv();
  const { default: payloadConfig } = await import('../../apps/cms/src/payload.config');
  const payload = await getPayload({ config: payloadConfig });
  const results: UpsertResult[] = [];

  try {
    for (const page of pagesToWrite) {
      const existing = await payload.find({
        collection: page.collection,
        where: { path: { equals: page.path } },
        limit: 1,
        depth: 0,
        overrideAccess: true,
      });
      const data = toPayloadDocument(page, file);
      if (shouldPublish) Object.assign(data, { status: 'published', _status: 'published' });
      const document = existing.docs[0]
        ? await payload.update({ collection: page.collection, id: existing.docs[0].id, data, overrideAccess: true })
        : await payload.create({ collection: page.collection, data, overrideAccess: true });

      assertPayloadRoundTrip(page, document as Record<string, unknown>);
      results.push({
        path: page.path,
        collection: page.collection,
        operation: existing.docs[0] ? 'updated' : 'created',
        id: document.id,
        blocks: page.blocks.length,
      });
    }
  } finally {
    await payload.destroy();
  }

  return results;
}

function toPayloadDocument(page: PageDocument, sourceFile: string): Record<string, unknown> {
  return cleanUndefined({
    contentKey: page.contentKey,
    title: page.title,
    slug: slugFromPath(page.path),
    path: page.path,
    excerpt: page.excerpt,
    featuredImage: page.featuredImage,
    publishedAt: page.publishedAt,
    articleMeta: page.articleMeta
      ? { ...page.articleMeta, tags: page.articleMeta.tags.map((label) => ({ label })) }
      : undefined,
    tipCard: page.tipCard,
    status: page.status,
    template: page.template,
    seo: page.seo,
    blocks: page.blocks.map(toPayloadBlock),
    importTrace: {
      source: 'ai-page-creation',
      sourceFile,
      importedAt: new Date().toISOString(),
      collection: page.collection,
      path: page.path,
    },
  }) as Record<string, unknown>;
}

function toPayloadBlock(block: PageBlock): Record<string, unknown> {
  const { type, ...fields } = block;
  const result = cleanUndefined(fields) as Record<string, unknown>;

  if (type === 'difference') {
    result.leftItems = textItems(result.leftItems);
    result.rightItems = textItems(result.rightItems);
  }

  if (type === 'pricing-cards' && Array.isArray(result.cards)) {
    result.cards = result.cards.map((card) => {
      if (!card || typeof card !== 'object' || Array.isArray(card)) return card;
      const value = { ...(card as Record<string, unknown>) };
      value.features = textItems(value.features);
      return value;
    });
  }

  return { ...result, blockType: type };
}

function textItems(value: unknown): unknown {
  if (!Array.isArray(value)) return value;
  return value.map((item) => typeof item === 'string' ? { text: item } : item);
}

function assertPayloadRoundTrip(expected: PageDocument, document: Record<string, unknown>): void {
  const actual = pageDocumentSchema.safeParse(payloadDocumentToPage(expected.collection, document));
  if (!actual.success) {
    throw new Error(`Payload response for ${expected.path} did not map back to PageDocument: ${actual.error.message}`);
  }
  if (actual.data.path !== expected.path || actual.data.blocks.length !== expected.blocks.length) {
    throw new Error(`Payload response for ${expected.path} lost route identity or block order.`);
  }
}

async function apiError(action: string, page: PageDocument, response: Response): Promise<Error> {
  const body = await response.text();
  return new Error(`Payload API ${action} failed for ${page.collection} ${page.path}: HTTP ${response.status} ${body.slice(0, 600)}`);
}

function cleanUndefined(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(cleanUndefined).filter((item) => item !== undefined);
  if (!value || typeof value !== 'object') return value ?? undefined;
  return Object.fromEntries(Object.entries(value)
    .map(([key, item]) => [key, cleanUndefined(item)] as const)
    .filter(([, item]) => item !== undefined));
}

function slugFromPath(path: string): string {
  return path.replace(/^\/+|\/+$/g, '').split('/').pop() || 'home';
}

function loadCmsEnv(): void {
  loadEnv({ path: resolve('apps/cms/.env') });
  if (process.env.DATABASE_URL?.startsWith('file:./')) {
    process.env.DATABASE_URL = `file:${resolve('apps/cms', process.env.DATABASE_URL.slice('file:./'.length)).replace(/\\/g, '/')}`;
  }
  process.env.PAYLOAD_MCP_DISABLED ??= 'true';
  process.env.PAYLOAD_MIGRATING ??= 'true';
}

function parseArgs(argv = process.argv.slice(2)): Record<string, string | boolean> {
  const result: Record<string, string | boolean> = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (!arg?.startsWith('--')) continue;
    const key = arg.slice(2);
    const next = argv[index + 1];
    result[key] = !next || next.startsWith('--') ? true : next;
    if (typeof result[key] === 'string') index += 1;
  }
  return result;
}

function stringArg(argsToRead: Record<string, string | boolean>, key: string, fallback?: string): string | undefined {
  return typeof argsToRead[key] === 'string' ? argsToRead[key] : fallback;
}
