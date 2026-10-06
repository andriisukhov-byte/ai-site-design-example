import {
  contentCollectionSchema,
  pageDocumentSchema,
  payloadDocumentToPage,
  type ContentCollection,
  type PageDocument,
} from '@acme/blocks';

import cmsPagesData from '../../../../data/cms/pages.json';
import { resolveMediaUrls } from './media';

type CmsPagesExport = {
  pages?: unknown[];
};

const exportedPages = cmsPagesData as CmsPagesExport;

let cachedPages: PageDocument[] | undefined;
let cacheExpiresAt = 0;
let pendingLoad: Promise<PageDocument[]> | undefined;

export async function getSourcePage(path: string): Promise<PageDocument | undefined> {
  return (await getSourcePages()).find((page) => page.path === path);
}

/**
 * Reads published CMS content at request time in SSR mode. A short in-process
 * cache avoids fetching every collection for every asset request while keeping
 * editorial changes visible without rebuilding the site.
 */
export async function getSourcePages(): Promise<PageDocument[]> {
  const now = Date.now();
  const cacheTtlMs = Number(
    process.env.CONTENT_CACHE_TTL_MS ??
      import.meta.env.CONTENT_CACHE_TTL_MS ??
      15_000,
  );

  if (cachedPages && now < cacheExpiresAt) {
    return cachedPages;
  }

  if (!pendingLoad) {
    pendingLoad = loadSourcePages()
      .then((pages) => {
        cachedPages = pages;
        cacheExpiresAt = Date.now() + Math.max(0, cacheTtlMs);
        return pages;
      })
      .finally(() => {
        pendingLoad = undefined;
      });
  }

  return pendingLoad;
}

export function pathToSlug(path: string): string {
  return path.replace(/^\/+|\/+$/g, '');
}

export function slugToPath(slug?: string): string {
  return slug ? `/${slug.replace(/^\/+|\/+$/g, '')}/` : '/';
}

async function loadSourcePages(): Promise<PageDocument[]> {
  const apiUrl = (
    process.env.PAYLOAD_API_URL ?? import.meta.env.PAYLOAD_API_URL
  )?.trim();

  if (!apiUrl) {
    return loadSnapshotPages('PAYLOAD_API_URL is not configured');
  }

  try {
    const collections = await Promise.all(
      contentCollectionSchema.options.map((collection) =>
        fetchPayloadCollection(apiUrl, collection),
      ),
    );
    const pages = collections.flat().sort((left, right) =>
      left.path.localeCompare(right.path),
    );

    console.info(
      `[content] Loaded ${pages.length} pages from Payload at ${apiUrl}`,
    );

    return pages;
  } catch (error) {
    if (
      (process.env.PAYLOAD_API_REQUIRED ??
        import.meta.env.PAYLOAD_API_REQUIRED) === 'true'
    ) {
      throw error;
    }

    const message = error instanceof Error ? error.message : String(error);
    return loadSnapshotPages(`Payload fetch failed: ${message}`);
  }
}

async function fetchPayloadCollection(
  apiUrl: string,
  collection: ContentCollection,
): Promise<PageDocument[]> {
  const url = new URL(
    `${apiUrl.replace(/\/+$/, '')}/${encodeURIComponent(collection)}`,
  );
  url.searchParams.set('depth', '1');
  url.searchParams.set('limit', '1000');
  url.searchParams.set('pagination', 'false');

  const response = await fetch(url, {
    headers: {
      accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(
      `${collection} returned HTTP ${response.status} ${response.statusText}`,
    );
  }

  const payload = (await response.json()) as { docs?: unknown };

  if (!Array.isArray(payload.docs)) {
    throw new Error(`${collection} returned an invalid Payload response`);
  }

  return payload.docs.map((doc, index) => {
    if (!doc || typeof doc !== 'object' || Array.isArray(doc)) {
      throw new Error(`${collection}[${index}] is not a document object`);
    }

    return resolveMediaUrls(
      payloadDocumentToPage(collection, doc as Record<string, unknown>),
    );
  });
}

function loadSnapshotPages(reason: string): PageDocument[] {
  const pages = (exportedPages.pages ?? []).map((page) =>
    resolveMediaUrls(pageDocumentSchema.parse(page)),
  );

  console.warn(
    `[content] ${reason}; using the checked-in Payload snapshot (${pages.length} pages)`,
  );

  return pages;
}
