import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, relative, resolve } from 'node:path';

import { pageDocumentSchema, type PageDocument } from '@acme/blocks';

import { argString, parseArgs, pathExists, writeJson } from './source-utils';

type ProductionPost = {
  id: number;
  date: string;
  modified: string;
  link: string;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt?: { rendered?: string };
  featured_media: number;
  yoast_head_json?: {
    title?: string;
    description?: string;
    canonical?: string;
    og_title?: string;
    og_description?: string;
    twitter_title?: string;
    twitter_description?: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url?: string;
      alt_text?: string;
    }>;
  };
};

const args = parseArgs();
const sourceBase = (argString(args, 'source-base', 'https://acme.example') ?? '').replace(/\/+$/, '');
const endpoint = argString(args, 'endpoint', 'posts')!;
const collection = argString(args, 'collection', endpoint === 'guide' ? 'guides' : 'posts')!;
const template = endpoint === 'guide' ? 'guide' : 'article';
const routePrefix = argString(args, 'route-prefix', endpoint === 'guide' ? '/guide/' : '/')!;
const requestedPaths = (argString(args, 'paths') ?? '').split(',').map(normalizePath).filter(Boolean);
const paths = requestedPaths.length ? requestedPaths : await discoverPaths();
const out = argString(
  args,
  'out',
  endpoint === 'guide'
    ? 'data/source/production-guide-pages.json'
    : 'data/source/production-articles-pages.json',
)!;
const pagesInput = argString(args, 'pages', 'data/cms/pages.json')!;
const mediaRoot = resolve(argString(args, 'media-dir', 'apps/web/public/media')!);
const concurrency = Math.max(1, Number(argString(args, 'concurrency', '6')) || 6);
const currentPages = JSON.parse(await readFile(pagesInput, 'utf8')) as { pages?: PageDocument[] };
const currentByPath = new Map(
  (currentPages.pages ?? []).map((page) => [page.path, page]),
);

if (!paths.length) {
  throw new Error(`No published ${endpoint} routes were discovered.`);
}

const pages = new Array<PageDocument>(paths.length);
let cursor = 0;

await Promise.all(Array.from({ length: Math.min(concurrency, paths.length) }, async () => {
  while (cursor < paths.length) {
    const index = cursor;
    cursor += 1;
    pages[index] = await syncPost(paths[index]);
  }
}));
await writeJson(out, {
  generatedAt: new Date().toISOString(),
  source: `${sourceBase}/wp-json/wp/v2/${endpoint}`,
  preservePolicy: 'This output is safe to upsert without --prune; local-only documents remain preserved.',
  pages,
});

console.log(JSON.stringify({
  ok: true,
  action: 'prepared-production-articles',
  endpoint,
  collection,
  out,
  pages: pages.map((page) => page.path),
}, null, 2));

async function discoverPaths(): Promise<string[]> {
  const discovered: string[] = [];
  let page = 1;
  let totalPages = 1;

  do {
    const response = await fetchWithRetry(
      `${sourceBase}/wp-json/wp/v2/${endpoint}?per_page=100&page=${page}&_fields=link`,
    );

    if (!response.ok) {
      throw new Error(`Production ${endpoint} discovery failed (${response.status}) on page ${page}`);
    }

    totalPages = Number(response.headers.get('x-wp-totalpages')) || 1;
    const records = await response.json() as Array<{ link?: string }>;
    discovered.push(...records.map((record) => normalizePath(record.link ?? '')).filter(Boolean));
    page += 1;
  } while (page <= totalPages);

  return [...new Set(discovered)].sort();
}

async function syncPost(path: string): Promise<PageDocument> {
  const slug = path.replace(new RegExp(`^${escapeRegExp(routePrefix)}`), '').replace(/\/$/, '');
  const response = await fetchWithRetry(
    `${sourceBase}/wp-json/wp/v2/${endpoint}?slug=${encodeURIComponent(slug)}&_embed=wp:featuredmedia`,
  );

  if (!response.ok) {
    throw new Error(`Production post request failed (${response.status}) for ${path}`);
  }

  const [post] = await response.json() as ProductionPost[];

  if (!post) {
    throw new Error(`Production post was not found for ${path}`);
  }

  const html = await localizeFirstPartyMedia(post.content.rendered);
  const featured = post._embedded?.['wp:featuredmedia']?.[0];
  const featuredSrc = featured?.source_url
    ? await localizeFirstPartyMediaUrl(featured.source_url)
    : undefined;
  const title = decodeHtml(stripTags(post.title.rendered));
  const current = currentByPath.get(path);

  return pageDocumentSchema.parse({
    contentKey: current?.contentKey ?? stableDocumentKey(post.id),
    collection,
    path,
    title,
    featuredImage: featuredSrc
      ? { id: String(post.featured_media), src: featuredSrc, alt: featured?.alt_text || title }
      : current?.featuredImage,
    excerpt: decodeHtml(stripTags(post.excerpt?.rendered ?? '')) || current?.excerpt,
    publishedAt: post.date,
    articleMeta: {
      ...current?.articleMeta,
      tags: current?.articleMeta?.tags ?? [],
      updatedAt: post.modified,
      showTableOfContents: current?.articleMeta?.showTableOfContents ?? true,
      showTableOfContentsTitle: current?.articleMeta?.showTableOfContentsTitle ?? false,
      tableOfContentsTitle: current?.articleMeta?.tableOfContentsTitle ?? 'Contents',
    },
    status: 'published',
    template,
    seo: compactSeo(post.yoast_head_json),
    blocks: [{ type: 'rich-text', title, html }],
  });
}

async function localizeFirstPartyMedia(html: string): Promise<string> {
  const urls = [...html.matchAll(/https?:\/\/(?:www\.)?acme\.ai\/wp-content\/uploads\/[^"'<>\s)]+/gi)]
    .map((match) => match[0]);
  await Promise.all([...new Set(urls)].map(localizeFirstPartyMediaUrl));

  return html
    .replace(/https?:\/\/(?:www\.)?acme\.ai\/wp-content\/uploads\//gi, '/media/')
    .replace(/\sclass=(["'])(.*?)\1/gi, (_match, quote: string, className: string) => {
      const classNames = className
        .split(/\s+/)
        .filter((token) => token && !/^wp-/.test(token) && !/^size-/.test(token) && !/^align/.test(token));
      return classNames.length ? ` class=${quote}${classNames.join(' ')}${quote}` : '';
    });
}

async function localizeFirstPartyMediaUrl(value: string): Promise<string> {
  const url = new URL(value);
  const marker = '/wp-content/uploads/';
  const index = url.pathname.indexOf(marker);

  if (index < 0) {
    return value;
  }

  const storagePath = decodeURIComponent(url.pathname.slice(index + marker.length));
  const target = resolve(mediaRoot, storagePath);

  if (relative(mediaRoot, target).startsWith('..')) {
    throw new Error(`Unsafe production media path: ${value}`);
  }

  if (!(await pathExists(target))) {
    const response = await fetchWithRetry(value);

    if (!response.ok) {
      throw new Error(`Could not localize production media (${response.status}) ${value}`);
    }

    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, Buffer.from(await response.arrayBuffer()));
  }

  return `/media/${storagePath}`;
}

function compactSeo(value: ProductionPost['yoast_head_json']): PageDocument['seo'] {
  if (!value) return {};

  return pruneEmpty({
    metaTitle: decodeHtml(value.title ?? ''),
    metaDescription: decodeHtml(value.description ?? ''),
    canonicalUrl: value.canonical,
    ogTitle: decodeHtml(value.og_title ?? ''),
    ogDescription: decodeHtml(value.og_description ?? ''),
    twitterTitle: decodeHtml(value.twitter_title ?? ''),
    twitterDescription: decodeHtml(value.twitter_description ?? ''),
  });
}

function normalizePath(value: string): string {
  const path = value.trim().replace(/^https?:\/\/(?:www\.)?acme\.ai/i, '').split(/[?#]/)[0];
  return path && path.startsWith('/') ? (path.endsWith('/') ? path : `${path}/`) : '';
}

async function fetchWithRetry(url: string): Promise<Response> {
  let response: Response | undefined;
  let lastError: unknown;

  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      response = await fetch(url, {
        headers: { accept: 'application/json,*/*;q=0.8', 'user-agent': 'Acme source migration' },
        signal: AbortSignal.timeout(30_000),
      });

      if (response.ok || response.status < 500 && response.status !== 429) {
        return response;
      }

      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }

    await new Promise((resolveDelay) => setTimeout(resolveDelay, attempt * 400));
  }

  if (response) {
    return response;
  }

  throw lastError instanceof Error ? lastError : new Error(String(lastError));
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
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

function stripTags(value: string): string {
  return value.replace(/<[^>]*>/g, ' ');
}

function pruneEmpty<T extends Record<string, string | undefined>>(value: T): T {
  return Object.fromEntries(Object.entries(value).filter(([, item]) => Boolean(item))) as T;
}
