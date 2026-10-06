import type { PageDocument } from '@acme/blocks';
import { siteChrome } from '@acme/config';

import { productionTaxonomies } from './production-taxonomies';
import { getSourcePages } from './source-pages';

export type SiteIndexEntry = {
  path: string;
  url: string;
  title: string;
  description: string;
  collection: PageDocument['collection'];
  template: PageDocument['template'];
  publishedAt?: string;
};

export const defaultMetaDescription = 'Acme builds cognitive AI agents for business automation.';

export async function getSiteIndexEntries(): Promise<SiteIndexEntry[]> {
  const contentEntries = (await getSourcePages())
    .filter((page) => page.status === 'published')
    .filter((page) => !isNoIndex(page))
    .map((page) => ({
      path: page.path,
      url: absoluteUrl(page.seo.canonicalUrl || page.path),
      title: cleanPlainText(cleanSeoTemplate(page.seo.metaTitle) || page.title),
      description: cleanPlainText(page.seo.metaDescription || page.excerpt || defaultMetaDescription),
      collection: page.collection,
      template: page.template,
      publishedAt: page.publishedAt,
    }));
  const existingPaths = new Set(contentEntries.map((entry) => entry.path));
  const taxonomyEntries: SiteIndexEntry[] = [
    ...productionTaxonomies.faqItems.map((item) => ({
      path: item.path,
      url: absoluteUrl(item.seo?.canonicalUrl || item.path),
      title: cleanPlainText(item.seo?.metaTitle || item.question),
      description: cleanPlainText(
        item.seo?.metaDescription || stripHtml(item.answer) || defaultMetaDescription,
      ),
      collection: 'posts' as const,
      template: 'article' as const,
      publishedAt: item.updatedAt,
    })),
    ...[
      ...productionTaxonomies.faqCategories,
      ...productionTaxonomies.postCategories,
      ...productionTaxonomies.postTags,
      ...productionTaxonomies.authors,
    ].map((archive) => ({
      path: archive.path,
      url: absoluteUrl(archive.seo?.canonical || archive.path),
      title: cleanPlainText(archive.seo?.title || `${archive.name} Archives | Acme`),
      description: cleanPlainText(archive.seo?.description || archive.description || defaultMetaDescription),
      collection: 'pages' as const,
      template: 'standard' as const,
    })),
  ].filter((entry) => !existingPaths.has(entry.path));

  return [...contentEntries, ...taxonomyEntries].sort((a, b) => a.path.localeCompare(b.path));
}

export function absoluteUrl(pathOrUrl: string): string {
  return new URL(pathOrUrl, siteChrome.siteUrl).toString();
}

function isNoIndex(page: PageDocument): boolean {
  return page.seo.robots?.toLowerCase().split(',').map((part) => part.trim()).includes('noindex') ?? false;
}

function cleanSeoTemplate(value?: string): string {
  if (!value || value.includes('%%')) {
    return '';
  }

  return value;
}

function cleanPlainText(value: string): string {
  return value
    .replace(/â€™/g, "'")
    .replace(/â€œ|â€�/g, '"')
    .replace(/â€“|â€”/g, '-')
    .replace(/Â©/g, '(c)')
    .replace(/\s+/g, ' ')
    .trim();
}

function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}
