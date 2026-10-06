import type { PageBlock, PageDocument } from '@acme/blocks';

type RichTextBlock = Extract<PageBlock, { type: 'rich-text' }>;

export function comparePublishedDesc(left: PageDocument, right: PageDocument): number {
  return dateValue(right.publishedAt) - dateValue(left.publishedAt) || left.title.localeCompare(right.title);
}

export function dateValue(value?: string): number {
  return value ? new Date(value.replace(' ', 'T')).getTime() || 0 : 0;
}

export function imageFor(page: PageDocument) {
  return page.featuredImage ?? page.seo.ogImage ?? page.seo.twitterImage;
}

export function excerptFor(page: PageDocument): string {
  return page.excerpt || page.seo.metaDescription || richTextFor(page);
}

export function richTextFor(page: PageDocument): string {
  return (page.blocks.find((block): block is RichTextBlock => block.type === 'rich-text')?.html ?? '').trim();
}

export function formatDate(value?: string): string {
  if (!value) {
    return '';
  }

  const date = new Date(value.replace(' ', 'T'));
  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
}

export function estimateReadTime(page: PageDocument): string {
  if (page.articleMeta?.readTimeMinutes) {
    return `${page.articleMeta.readTimeMinutes} min read`;
  }

  const words = page.blocks
    .flatMap((block) => Object.values(block as Record<string, unknown>))
    .filter((value): value is string => typeof value === 'string')
    .join(' ')
    .replace(/<[^>]+>/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

export function stripHtml(value: string): string {
  return value
    .replace(/<[^>]*>/g, ' ')
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#0?39;|&apos;|&rsquo;/gi, "'")
    .replace(/&ndash;/gi, '–')
    .replace(/&mdash;/gi, '—')
    .replace(/&hellip;/gi, '…')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

export function archivePayloadJson(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
