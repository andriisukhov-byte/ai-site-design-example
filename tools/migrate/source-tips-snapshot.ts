import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { basename, extname, join, resolve } from 'node:path';

import { JSDOM, VirtualConsole } from 'jsdom';

import { argString, parseArgs, writeJson } from './source-utils';

type SourceTip = {
  id: number;
  slug: string;
  date: string;
  modified: string;
  title: { rendered: string };
  content: { rendered: string };
  tip_category?: number[];
  yoast_head_json?: {
    title?: string;
    description?: string;
    canonical?: string;
    og_title?: string;
    og_description?: string;
    twitter_title?: string;
    twitter_description?: string;
  };
};

type SourceCategory = {
  id: number;
  name: string;
};

type CardPresentation = {
  archiveWidth: 1 | 2 | 3;
  iconUrls: string[];
};

type ArticlePresentation = {
  ratingLabel?: string;
  views?: number;
  authorName?: string;
  authorPath?: string;
};

const args = parseArgs();
const sourceBase = (argString(args, 'source-base', 'https://dev.acme.example') ?? '').replace(/\/+$/, '');
const out = argString(args, 'out', 'data/source/tips-presentation-reference.json')!;
const assetDir = argString(args, 'asset-dir', 'apps/web/public/assets/templates/tips')!;
const publicAssetRoot = '/assets/templates/tips';

const [tips, categories, presentationResponse] = await Promise.all([
  fetchJson<SourceTip[]>(`${sourceBase}/wp-json/wp/v2/tip?per_page=100&_fields=id,slug,date,modified,title,content,tip_category,yoast_head_json`),
  fetchJson<SourceCategory[]>(`${sourceBase}/wp-json/wp/v2/tip_category?per_page=100&_fields=id,name`),
  fetchJson<{ total: number; grid: string }>(`${sourceBase}/wp-json/tips/v1/list?per_page=100&page=1`),
]);

const categoryById = new Map(categories.map((category) => [category.id, decodeHtml(category.name)]));
const cardByTitle = parseCards(presentationResponse.grid);
const articleByPath = new Map(await Promise.all(tips.map(async (tip) => {
  const path = `/tips/${tip.slug}/`;
  return [path, parseArticlePresentation(await fetchText(`${sourceBase}${path}`))] as const;
})));
const localizedIconByUrl = await localizeIcons(
  [...new Set([...cardByTitle.values()].flatMap((card) => card.iconUrls))],
);

const records = tips
  .map((tip) => {
    const title = decodeHtml(stripTags(tip.title.rendered)).trim();
    const presentation = cardByTitle.get(normalizeTitle(title));
    const articlePresentation = articleByPath.get(`/tips/${tip.slug}/`);
    const category = (tip.tip_category ?? [])
      .map((id) => categoryById.get(id))
      .find((value): value is string => Boolean(value));

    return {
      sourceId: tip.id,
      slug: tip.slug,
      path: `/tips/${tip.slug}/`,
      title,
      contentHtml: sanitizeRichText(tip.content.rendered),
      publishedAt: tip.date,
      updatedAt: tip.modified,
      category,
      ...articlePresentation,
      seo: compactSeo(tip.yoast_head_json),
      tipCard: {
        category,
        archiveWidth: presentation?.archiveWidth ?? 1,
        icons: (presentation?.iconUrls ?? [])
          .map((url) => localizedIconByUrl.get(url))
          .filter((src): src is string => Boolean(src))
          .map((src) => ({ src, alt: title })),
      },
    };
  })
  .sort((left, right) => right.publishedAt.localeCompare(left.publishedAt) || left.title.localeCompare(right.title));

await writeJson(out, {
  generatedAt: new Date().toISOString(),
  source: `${sourceBase}/wp-json/wp/v2/tip`,
  total: records.length,
  categories: [...new Set(records.map((record) => record.category).filter(Boolean))],
  records,
});

console.log(JSON.stringify({
  ok: records.length === presentationResponse.total,
  out,
  records: records.length,
  sourceTotal: presentationResponse.total,
  categories: categories.length,
  localizedIcons: localizedIconByUrl.size,
}, null, 2));

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      accept: 'application/json',
      'user-agent': 'Acme source migration',
    },
  });

  if (!response.ok) {
    throw new Error(`Source request failed (${response.status}) for ${url}`);
  }

  return response.json() as Promise<T>;
}

async function fetchText(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      accept: 'text/html',
      'user-agent': 'Acme source migration',
    },
  });

  if (!response.ok) {
    throw new Error(`Source request failed (${response.status}) for ${url}`);
  }

  return response.text();
}

function parseArticlePresentation(html: string): ArticlePresentation {
  const virtualConsole = new VirtualConsole();
  const document = new JSDOM(html, { virtualConsole }).window.document;
  const meta = document.querySelector('.single-article__meta');
  const ratingLabel = meta?.querySelector('.kksr-legend')?.textContent?.replace(/\s+/g, ' ').trim();
  const viewsText = [...(meta?.querySelectorAll('.single-article__meta-item') ?? [])]
    .map((item) => item.textContent?.replace(/\s+/g, ' ').trim() ?? '')
    .find((value) => /\b\d+\s+views?\b/i.test(value));
  const viewsMatch = viewsText?.match(/\b(\d+)\s+views?\b/i);
  const authorLink = meta?.querySelector<HTMLAnchorElement>('.single-article__meta-item--author a[href]');
  const authorItem = meta?.querySelector('.single-article__meta-item--author');
  const authorName = (authorLink?.textContent ?? authorItem?.textContent)?.replace(/\s+/g, ' ').trim();

  return {
    ratingLabel: ratingLabel || undefined,
    views: viewsMatch ? Number(viewsMatch[1]) : undefined,
    authorName: authorName || undefined,
    authorPath: authorLink ? new URL(authorLink.href, sourceBase).pathname : undefined,
  };
}

function compactSeo(value: SourceTip['yoast_head_json']): Record<string, string> | undefined {
  if (!value) {
    return undefined;
  }

  const seo = {
    metaTitle: decodeHtml(value.title ?? '').trim(),
    metaDescription: decodeHtml(value.description ?? '').trim(),
    canonicalUrl: value.canonical?.trim(),
    ogTitle: decodeHtml(value.og_title ?? '').trim(),
    ogDescription: decodeHtml(value.og_description ?? '').trim(),
    twitterTitle: decodeHtml(value.twitter_title ?? '').trim(),
    twitterDescription: decodeHtml(value.twitter_description ?? '').trim(),
  };

  const entries = Object.entries(seo).filter(
    (entry): entry is [string, string] => typeof entry[1] === 'string' && entry[1].length > 0,
  );

  return entries.length > 0 ? Object.fromEntries(entries) : undefined;
}

function parseCards(html: string): Map<string, CardPresentation> {
  const cards = new Map<string, CardPresentation>();

  for (const match of html.matchAll(/<article\b[^>]*class=(["'])[^"']*\btips-card--span-([123])\b[^"']*\1[^>]*>([\s\S]*?)<\/article>/gi)) {
    const body = match[3];
    const titleMatch = body.match(/<h3\b[^>]*class=(["'])[^"']*\btips-card__title\b[^"']*\1[^>]*>([\s\S]*?)<\/h3>/i);
    const title = titleMatch ? decodeHtml(stripTags(titleMatch[2])).replace(/\s+/g, ' ').trim() : '';

    if (!title) {
      continue;
    }

    const iconUrls = [...body.matchAll(/<img\b[^>]*\bsrc=(["'])(.*?)\1/gi)]
      .map((iconMatch) => decodeHtml(iconMatch[2]))
      .filter(Boolean)
      .slice(0, 2);

    cards.set(normalizeTitle(title), {
      archiveWidth: Number(match[2]) as 1 | 2 | 3,
      iconUrls,
    });
  }

  return cards;
}

async function localizeIcons(urls: string[]): Promise<Map<string, string>> {
  const output = new Map<string, string>();
  await mkdir(resolve(assetDir), { recursive: true });

  for (const url of urls) {
    const response = await fetch(url, {
      headers: { 'user-agent': 'Acme source migration' },
    });

    if (!response.ok) {
      throw new Error(`Could not localize tip icon (${response.status}) from ${url}`);
    }

    const sourceName = basename(new URL(url).pathname);
    const extension = safeExtension(extname(sourceName), response.headers.get('content-type'));
    const stem = sourceName
      .slice(0, sourceName.length - extname(sourceName).length)
      .normalize('NFKD')
      .replace(/[^\w.-]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .toLowerCase() || 'icon';
    const hash = createHash('sha256').update(url).digest('hex').slice(0, 8);
    const filename = `${stem}-${hash}${extension}`;

    await writeFile(join(resolve(assetDir), filename), Buffer.from(await response.arrayBuffer()));
    output.set(url, `${publicAssetRoot}/${filename}`);
  }

  return output;
}

function safeExtension(value: string, contentType: string | null): string {
  const normalized = value.toLowerCase();

  if (/^\.(?:avif|gif|jpe?g|png|svg|webp)$/.test(normalized)) {
    return normalized === '.jpeg' ? '.jpg' : normalized;
  }

  if (contentType?.includes('svg')) return '.svg';
  if (contentType?.includes('webp')) return '.webp';
  if (contentType?.includes('jpeg')) return '.jpg';
  if (contentType?.includes('gif')) return '.gif';
  return '.png';
}

function sanitizeRichText(value: string): string {
  return value
    .replace(/\s(?:class|style|aria-level)=(["'])[\s\S]*?\1/gi, '')
    .replace(/\s+data-[\w-]+=(["'])[\s\S]*?\1/gi, '')
    .trim();
}

function normalizeTitle(value: string): string {
  return decodeHtml(value).replace(/\s+/g, ' ').trim().toLowerCase();
}

function stripTags(value: string): string {
  return value.replace(/<[^>]*>/g, ' ');
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
    .replace(/&gt;/gi, '>');
}
