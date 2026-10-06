import { JSDOM, VirtualConsole } from 'jsdom';
import { writeFile } from 'node:fs/promises';
import { argString, ensureParentDir, parseArgs, writeJson } from './source-utils';

type YoastSeo = {
  title?: string;
  description?: string;
  canonical?: string;
  og_title?: string;
  og_description?: string;
};

type RestFaq = {
  id: number;
  slug: string;
  date: string;
  modified: string;
  author: number;
  title: { rendered: string };
  content: { rendered: string };
  faq_category?: number[];
  yoast_head_json?: YoastSeo;
};

type RestPost = {
  id: number;
  slug: string;
  date: string;
  modified: string;
  author: number;
  categories?: number[];
  tags?: number[];
  title: { rendered: string };
  excerpt: { rendered: string };
};

type RestTerm = {
  id: number;
  slug: string;
  name: string;
  description: string;
  count: number;
};

type RestAuthor = {
  id: number;
  slug: string;
  name: string;
  description: string;
  avatar_urls?: Record<string, string>;
};

const args = parseArgs();
const sourceBase = argString(args, 'source-base', 'https://acme.example')!.replace(/\/+$/, '');
const out = argString(args, 'out', 'data/source/production-taxonomy-reference.json')!;

const [faqs, faqCategories, posts, categories, tags, authors, sitemapPaths] = await Promise.all([
  fetchJson<RestFaq[]>(
    `${sourceBase}/wp-json/wp/v2/faq_item?per_page=100&_fields=id,slug,date,modified,author,title,content,faq_category,yoast_head_json`,
  ),
  fetchJson<RestTerm[]>(
    `${sourceBase}/wp-json/wp/v2/faq_category?per_page=100&_fields=id,slug,name,description,count`,
  ),
  fetchJson<RestPost[]>(
    `${sourceBase}/wp-json/wp/v2/posts?per_page=100&_fields=id,slug,date,modified,author,categories,tags,title,excerpt`,
  ),
  fetchJson<RestTerm[]>(
    `${sourceBase}/wp-json/wp/v2/categories?per_page=100&_fields=id,slug,name,description,count`,
  ),
  fetchJson<RestTerm[]>(
    `${sourceBase}/wp-json/wp/v2/tags?per_page=100&_fields=id,slug,name,description,count`,
  ),
  fetchJson<RestAuthor[]>(
    `${sourceBase}/wp-json/wp/v2/users?per_page=100&_fields=id,slug,name,description,avatar_urls`,
  ),
  readSitemapPaths(`${sourceBase}/sitemap_index.xml`),
]);

const faqCategoryById = new Map(faqCategories.map((term) => [term.id, term]));
const categoryById = new Map(categories.map((term) => [term.id, term]));
const tagById = new Map(tags.map((term) => [term.id, term]));
const authorById = new Map(authors.map((author) => [author.id, author]));
const included = (path: string) => sitemapPaths.has(path);
const archivePaths = [
  ...faqCategories.map((term) => `/faq-category/${term.slug}/`),
  ...categories.map((term) => `/category/${term.slug}/`),
  ...tags.map((term) => `/tag/${term.slug}/`),
  ...authors.map((author) => `/author/${author.slug}/`),
].filter(included);
const archiveSeoByPath = new Map(
  await Promise.all(archivePaths.map(async (path) => [path, await readPageSeo(`${sourceBase}${path}`)] as const)),
);
const authorPostMetaByPath = new Map(
  (await Promise.all(
    authors
      .filter((author) => included(`/author/${author.slug}/`))
      .map((author) => readAuthorPostMeta(`${sourceBase}/author/${author.slug}/`)),
  )).flatMap((records) => [...records]),
);
const faqPageMetaBySlug = new Map(
  await Promise.all(faqs.map(async (faq) => [
    faq.slug,
    await readFaqPageMeta(`${sourceBase}/faq/${faq.slug}/`),
  ] as const)),
);
const postPresentationByPath = new Map(
  await mapConcurrent(posts, 6, async (post) => {
    const path = `/${post.slug}/`;
    return [path, await readPostPresentation(`${sourceBase}${path}`)] as const;
  }),
);

await writeJson(out, {
  generatedAt: new Date().toISOString(),
  source: sourceBase,
  faqCategories: faqCategories
    .filter((term) => included(`/faq-category/${term.slug}/`))
    .map((term) => termRecord(term, 'faq-category', archiveSeoByPath)),
  faqItems: faqs
    .filter((faq) => included(`/faq/${faq.slug}/`))
    .map((faq) => ({
      sourceId: faq.id,
      path: `/faq/${faq.slug}/`,
      slug: faq.slug,
      question: decodeHtml(faq.title.rendered),
      answer: faq.content.rendered.trim(),
      publishedAt: toIso(faq.date),
      updatedAt: toIso(faq.modified),
      ...faqPageMetaBySlug.get(faq.slug),
      categories: (faq.faq_category ?? [])
        .map((id) => faqCategoryById.get(id)?.slug)
        .filter((slug): slug is string => Boolean(slug)),
      seo: compactSeo(faq.yoast_head_json),
    })),
  postCategories: categories
    .filter((term) => included(`/category/${term.slug}/`))
    .map((term) => termRecord(term, 'category', archiveSeoByPath)),
  postTags: tags
    .filter((term) => included(`/tag/${term.slug}/`))
    .map((term) => termRecord(term, 'tag', archiveSeoByPath)),
  authors: authors
    .filter((author) => included(`/author/${author.slug}/`))
    .map((author) => ({
      sourceId: author.id,
      path: `/author/${author.slug}/`,
      slug: author.slug,
      name: author.name,
      description: author.description.trim(),
      avatar: author.slug === 'adam-brown'
        ? '/assets/templates/blog/adam-brown.webp'
        : undefined,
      seo: archiveSeoByPath.get(`/author/${author.slug}/`),
    })),
  posts: posts.map((post) => ({
    sourceId: post.id,
    path: `/${post.slug}/`,
    publishedAt: toIso(post.date),
    updatedAt: toIso(post.modified),
    excerpt: decodeHtml(post.excerpt.rendered),
    author: authorById.get(post.author)?.slug,
    categories: (post.categories ?? [])
      .map((id) => categoryById.get(id)?.slug)
      .filter((slug): slug is string => Boolean(slug)),
    tags: (post.tags ?? [])
      .map((id) => tagById.get(id)?.slug)
      .filter((slug): slug is string => Boolean(slug)),
    ...authorPostMetaByPath.get(`/${post.slug}/`),
    ...postPresentationByPath.get(`/${post.slug}/`),
  })),
});

await downloadAsset(
  `${sourceBase}/wp-content/uploads/2025/06/Adam_Brown_-_AI_Specialist-150x150.webp`,
  'apps/web/public/assets/templates/blog/adam-brown.webp',
);

console.log(JSON.stringify({
  ok: true,
  out,
  faqs: faqs.length,
  faqCategories: faqCategories.length,
  posts: posts.length,
  categories: categories.filter((term) => included(`/category/${term.slug}/`)).length,
  tags: tags.filter((term) => included(`/tag/${term.slug}/`)).length,
  authors: authors.filter((author) => included(`/author/${author.slug}/`)).length,
}, null, 2));

function termRecord(term: RestTerm, routePrefix: string, seoByPath: Map<string, YoastSeo>) {
  const path = `/${routePrefix}/${term.slug}/`;

  return {
    sourceId: term.id,
    path,
    slug: term.slug,
    name: decodeHtml(term.name),
    description: decodeHtml(term.description),
    count: term.count,
    seo: seoByPath.get(path),
  };
}

function compactSeo(seo?: YoastSeo) {
  if (!seo) return undefined;

  return {
    metaTitle: seo.title,
    metaDescription: seo.description,
    canonicalUrl: seo.canonical,
    ogTitle: seo.og_title,
    ogDescription: seo.og_description,
  };
}

function decodeHtml(value: string): string {
  return JSDOM.fragment(value).textContent?.replace(/\s+/g, ' ').trim() ?? '';
}

function toIso(value: string): string {
  return new Date(`${value}Z`).toISOString();
}

async function readSitemapPaths(indexUrl: string): Promise<Set<string>> {
  const sitemapUrls = xmlLocations(await fetchText(indexUrl));
  const locations = (await Promise.all(sitemapUrls.map(fetchText))).flatMap(xmlLocations);
  return new Set(locations.map((location) => new URL(location).pathname));
}

function xmlLocations(xml: string): string[] {
  const document = new JSDOM(xml, { contentType: 'text/xml' }).window.document;
  return [...document.querySelectorAll('loc')]
    .map((node) => node.textContent?.trim())
    .filter((location): location is string => Boolean(location));
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Source request failed (${response.status}): ${url}`);
  return response.json() as Promise<T>;
}

async function fetchText(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Source request failed (${response.status}): ${url}`);
  return response.text();
}

async function readPageSeo(url: string): Promise<YoastSeo> {
  const document = new JSDOM(await fetchText(url), { virtualConsole: new VirtualConsole() }).window.document;

  return {
    title: document.title,
    description: document.querySelector<HTMLMetaElement>('meta[name="description"]')?.content,
    canonical: document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href,
    og_title: document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.content,
    og_description: document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.content,
  };
}

async function readFaqPageMeta(url: string) {
  const document = new JSDOM(await fetchText(url), { virtualConsole: new VirtualConsole() }).window.document;
  const metaText = [...document.querySelectorAll('.single-article__meta-item')]
    .map((node) => node.textContent?.replace(/\s+/g, ' ').trim() ?? '');
  const views = metaText.map((value) => value.match(/^(\d+)\s+views$/)?.[1]).find(Boolean);

  return {
    ratingLabel: document.querySelector('.single-article__meta-item--rating')?.textContent?.replace(/\s+/g, ' ').trim(),
    views: views ? Number(views) : undefined,
    authorName: document.querySelector('.single-article__meta-item--author')?.textContent?.replace(/\s+/g, ' ').trim(),
  };
}

async function readAuthorPostMeta(url: string): Promise<Map<string, {
  readTimeMinutes?: number;
  ratingAverage?: number;
  ratingCount?: number;
}>> {
  const document = new JSDOM(await fetchText(url), { virtualConsole: new VirtualConsole() }).window.document;
  const records = new Map<string, {
    readTimeMinutes?: number;
    ratingAverage?: number;
    ratingCount?: number;
  }>();

  for (const card of document.querySelectorAll<HTMLAnchorElement>('.guide-card[href]')) {
    const path = new URL(card.href, url).pathname;
    const readTime = card.querySelector('.guide-card__info-item.read')?.textContent?.match(/(\d+)\s+min\s+read/i);
    const rating = card.querySelector('.kksr-legend')?.textContent?.match(/([\d.]+)\/5(?:\s*-\s*\((\d+)\s+votes?\))?/i);

    records.set(path, {
      readTimeMinutes: readTime ? Number(readTime[1]) : undefined,
      ratingAverage: rating ? Number(rating[1]) : undefined,
      ratingCount: rating?.[2] ? Number(rating[2]) : undefined,
    });
  }

  return records;
}

async function readPostPresentation(url: string) {
  const document = new JSDOM(await fetchText(url), { virtualConsole: new VirtualConsole() }).window.document;
  const article = document.querySelector('.single-article--post');

  if (!article) {
    throw new Error(`Production article markup was not found for ${url}.`);
  }

  const metaText = [...article.querySelectorAll('.single-article__meta-item')]
    .map((node) => node.textContent?.replace(/\s+/g, ' ').trim() ?? '');
  const readTime = metaText.map((value) => value.match(/^(\d+)\s+min\s+read$/i)?.[1]).find(Boolean);
  const views = metaText.map((value) => value.match(/^(\d+)\s+views$/i)?.[1]).find(Boolean);
  const related = article.querySelector('.single-article__related[aria-label="Related Articles"]');
  const relatedPaths = related
    ? [...related.querySelectorAll<HTMLAnchorElement>('.guide-card__link[href]')]
        .map((card) => new URL(card.href, url).pathname)
    : [];

  return {
    readTimeMinutes: readTime ? Number(readTime) : undefined,
    views: views ? Number(views) : undefined,
    showTableOfContents: Boolean(article.querySelector('.single-article__toc')),
    showTableOfContentsTitle: Boolean(article.querySelector('.single-article__toc-title')),
    relatedPaths,
  };
}

async function mapConcurrent<T, R>(
  items: T[],
  concurrency: number,
  mapper: (item: T) => Promise<R>,
): Promise<R[]> {
  const results = new Array<R>(items.length);
  let cursor = 0;

  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await mapper(items[index]);
    }
  }));

  return results;
}

async function downloadAsset(url: string, file: string): Promise<void> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Asset request failed (${response.status}): ${url}`);
  await ensureParentDir(file);
  await writeFile(file, Buffer.from(await response.arrayBuffer()));
}
