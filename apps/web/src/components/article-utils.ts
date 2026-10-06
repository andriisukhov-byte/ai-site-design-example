import type { PageDocument } from '@acme/blocks';
import { resolveSignupHrefsInHtml } from '../data/signup-links';

export type ArticleHeading = {
  id: string;
  level: 2 | 3;
  text: string;
};

export function prepareArticleHtml(html: string, pathname = '/'): {
  html: string;
  headings: ArticleHeading[];
} {
  const usedIds = new Set<string>();
  const headings: ArticleHeading[] = [];
  const preparedHtml = renderArticleShortcodes(resolveSignupHrefsInHtml(html, pathname)).replace(
    /<h([23])\b([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (match, levelRaw: string, attrsRaw: string, content: string) => {
      const text = decodeEntities(stripHtml(content));

      if (!text) {
        return match;
      }

      const level = Number(levelRaw) === 3 ? 3 : 2;
      const existingId = readAttribute(attrsRaw, 'id');
      const id = uniqueId(existingId || slugifyHeading(text), usedIds);
      const attrsWithoutId = attrsRaw.replace(/\s+id=(["']).*?\1/i, '').trim();
      const attrs = `${attrsWithoutId} id="${escapeAttribute(id)}" data-toc-heading`
        .replace(/\s+/g, ' ')
        .trim();

      headings.push({ id, level, text });

      return `<h${level}${attrs ? ` ${attrs}` : ''}>${content}</h${level}>`;
    },
  );

  return { html: preparedHtml, headings };
}

function renderArticleShortcodes(value: string): string {
  const withoutWrapperSpans = value.replace(
    /<span\b[^>]*>\s*(\[(?:\/?post_(?:bullets|bullet|numbers|number|banner))\b[\s\S]*?\])\s*<\/span>/gi,
    '$1',
  );

  return withoutWrapperSpans
    .replace(/\[post_bullets\b([^\]]*)\]/gi, (_match, attrs: string) => (
      `<ul class="post-bullets${readShortcodeAttribute(attrs, 'purple') === 'yes' ? ' purple-bullets' : ''}">`
    ))
    .replace(/\[\/post_bullets\]/gi, '</ul>')
    .replace(/\[post_bullet\b([^\]]*)\]/gi, (_match, attrs: string) => {
      const text = readShortcodeAttribute(attrs, 'text');
      return text ? `<li><span>${text}</span></li>` : '';
    })
    .replace(/\[post_numbers\b[^\]]*\]/gi, '<div class="post-numbers">')
    .replace(/\[\/post_numbers\]/gi, '</div>')
    .replace(/\[post_number\b([^\]]*)\]/gi, (_match, attrs: string) => {
      const number = readShortcodeAttribute(attrs, 'value');
      const text = readShortcodeAttribute(attrs, 'text');

      return number || text
        ? `<div class="post-number"><div class="post-number__value">${number}</div><div class="post-number__text">${text}</div></div>`
        : '';
    })
    .replace(/\[post_banner\s+text="([^"]*)"\s+bg_first="[^"]*"\s+text_second="[^"]*"\s*\]/gi, (_match, text: string) => (
      `<div class="post-banner"><div class="post-banner__content"><div class="post-banner__text">${text}</div></div></div>`
    ))
    .replace(/\[post_banner\b[^\]]*\]/gi, '');
}

function readShortcodeAttribute(attributes: string, name: string): string {
  return attributes.match(new RegExp(`(?:^|\\s)${name}="([^"]*)"`, 'i'))?.[1]?.trim() ?? '';
}

export function articleReadTimeMinutes(page: PageDocument, html: string): number {
  if (page.articleMeta?.readTimeMinutes) {
    return page.articleMeta.readTimeMinutes;
  }

  const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function formatArticleDate(value?: string, long = false): string {
  if (!value) {
    return '';
  }

  const date = new Date(value.replace(' ', 'T'));

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return date.toLocaleDateString(
    'en-US',
    long
      ? { month: 'long', day: 'numeric', year: 'numeric' }
      : { month: 'short', day: '2-digit', year: 'numeric' },
  );
}

function readAttribute(attrs: string, name: string): string | undefined {
  const match = attrs.match(new RegExp(`\\s${name}=(["'])(.*?)\\1`, 'i'));
  return match?.[2]?.trim() || undefined;
}

function uniqueId(value: string, usedIds: Set<string>): string {
  const base = slugifyHeading(value) || 'section';
  let id = base;
  let index = 2;

  while (usedIds.has(id)) {
    id = `${base}-${index}`;
    index += 1;
  }

  usedIds.add(id);
  return id;
}

function slugifyHeading(value: string): string {
  return decodeEntities(value)
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function stripHtml(value: string): string {
  return decodeEntities(value.replace(/<[^>]*>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
}

function decodeEntities(value: string): string {
  return value
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>');
}

function escapeAttribute(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}
