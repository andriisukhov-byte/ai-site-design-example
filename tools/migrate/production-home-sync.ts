import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, relative, resolve } from 'node:path';

import { JSDOM } from 'jsdom';
import { pageDocumentSchema, type PageDocument } from '@acme/blocks';

import { argString, parseArgs, pathExists, writeJson } from './source-utils';

type ProductionHome = {
  title: { rendered: string };
  content: { rendered: string };
  yoast_head_json?: {
    title?: string;
    description?: string;
    canonical?: string;
    og_title?: string;
    og_description?: string;
  };
};

const args = parseArgs();
const sourceBase = (argString(args, 'source-base', 'https://acme.example') ?? '').replace(/\/+$/, '');
const pageId = argString(args, 'page-id', '7621')!;
const input = argString(args, 'input', 'data/cms/pages.json')!;
const out = argString(args, 'out', 'data/source/production-home-page.json')!;
const mediaRoot = resolve(argString(args, 'media-dir', 'apps/web/public/media')!);

const source = await fetchHome();
const inputDocument = await readHomeDocument();
const document = await syncHomeDocument(source, inputDocument);

await writeJson(out, {
  generatedAt: new Date().toISOString(),
  source: `${sourceBase}/wp-json/wp/v2/pages/${pageId}`,
  pages: [document],
});

console.log(JSON.stringify({
  ok: true,
  out,
  path: document.path,
  title: document.title,
  blocks: document.blocks.map((block) => block.type),
}, null, 2));

async function fetchHome(): Promise<ProductionHome> {
  const response = await fetch(`${sourceBase}/wp-json/wp/v2/pages/${pageId}`, {
    headers: { accept: 'application/json', 'user-agent': 'Acme source migration' },
  });

  if (!response.ok) {
    throw new Error(`Production home request failed (${response.status}).`);
  }

  return response.json() as Promise<ProductionHome>;
}

async function readHomeDocument(): Promise<PageDocument> {
  const inputJson = JSON.parse(await readFile(input, 'utf8')) as { pages?: unknown[] };
  const candidate = inputJson.pages?.find((page) => isRecord(page) && page.path === '/');
  const parsed = pageDocumentSchema.safeParse(candidate);

  if (!parsed.success) {
    throw new Error(`Could not read the local home document from ${input}.`);
  }

  return parsed.data;
}

async function syncHomeDocument(source: ProductionHome, current: PageDocument): Promise<PageDocument> {
  const dom = new JSDOM(source.content.rendered);
  const page = dom.window.document;
  const blocks = [...current.blocks];

  replaceBlock(blocks, 'hero-extended', await readHero(page));
  replaceBlock(blocks, 'live-in-days', readLiveInDays(page));
  replaceBlock(blocks, 'agent-capabilities', readAgentCapabilities(page));
  replaceBlock(blocks, 'pricing-cards', readPricing(page));
  replaceBlock(blocks, 'faq', readFaq(page));

  return pageDocumentSchema.parse({
    ...current,
    title: text(page.querySelector('.hero-extended__eyebrow')) || decodeHtml(stripTags(source.title.rendered)),
    seo: compactSeo(source.yoast_head_json, current.seo),
    blocks,
  });
}

async function readHero(page: Document) {
  const section = required(page, '.hero-extended');
  const actions = [...section.querySelectorAll('.hero-extended__action')];
  const background = section.querySelector<HTMLImageElement>('.hero-extended__background-image');
  const media = section.querySelector<HTMLImageElement>('.hero-extended__image');

  return {
    type: 'hero-extended' as const,
    variant: 'home' as const,
    eyebrow: text(section.querySelector('.hero-extended__eyebrow')),
    title: gradientText(section.querySelector('.hero-extended__title')),
    subtitle: text(section.querySelector('.hero-extended__subtitle')) || undefined,
    description: inlineText(section.querySelector('.hero-extended__description')) || undefined,
    backgroundImage: background?.src
      ? { src: await localizeUpload(background.src), alt: background.alt || '' }
      : undefined,
    media: media?.src
      ? { src: await localizeUpload(media.src), alt: media.alt || '' }
      : undefined,
    mediaSize: section.classList.contains('hero-extended--media-tall') ? 'tall' as const : 'wide' as const,
    secondaryAction: action(actions[0]),
    secondaryNote: text(actions[0]?.querySelector('.hero-extended__note-text')) || undefined,
    primaryAction: action(actions[1]),
    primaryNote: text(actions[1]?.querySelector('.hero-extended__note-text')) || undefined,
    cards: [],
  };
}

function readLiveInDays(page: Document) {
  const section = required(page, '.live-in-days');
  const icons = ['code-xml', 'layout-grid', 'bot-message-square', 'user-round-check'] as const;

  return {
    type: 'live-in-days' as const,
    items: [...section.querySelectorAll('.live-in-days__item')].map((item, index) => ({
      icon: icons[index] ?? 'code-xml',
      label: text(item.querySelector('.live-in-days__label')),
    })),
  };
}

function readAgentCapabilities(page: Document) {
  const section = required(page, '.agent-capabilities');
  const icons = ['circle-dollar-sign', 'headset', 'user-round-check', 'megaphone', 'users', 'wallet', 'briefcase-business'];

  return {
    type: 'agent-capabilities' as const,
    title: gradientText(section.querySelector('.agent-capabilities__heading')),
    description: text(section.querySelector('.agent-capabilities__intro-text')) || undefined,
    contentSide: section.classList.contains('agent-capabilities--content-left') ? 'left' as const : 'right' as const,
    autoplay: section.getAttribute('data-capability-autoplay') === 'true',
    autoplayInterval: Number(section.getAttribute('data-capability-autoplay-interval')) || 5000,
    items: [...section.querySelectorAll('.agent-capabilities__panel')].map((panel, index) => ({
      icon: icons[index] ?? 'messages-square',
      title: text(panel.querySelector('.agent-capabilities__panel-title')),
      description: innerHtml(panel.querySelector('.agent-capabilities__panel-description')),
      link: {
        url: 'https://app.acme.example/',
        title: text(section.querySelector('.agent-capabilities__panel-button')) || 'Get more',
        target: '_self' as const,
      },
    })),
    infoNote: text(section.querySelector('.agent-capabilities__info-text')) || undefined,
    preview: false,
  };
}

function readPricing(page: Document) {
  const section = required(page, '.pricing-cards');

  return {
    type: 'pricing-cards' as const,
    title: gradientText(section.querySelector('.pricing-cards__title')),
    description: text(section.querySelector('.pricing-cards__description')) || undefined,
    cards: [...section.querySelectorAll<HTMLElement>('.pricing-cards__plan')].map((card) => ({
      accent: card.classList.contains('pricing-cards__plan--dark') ? 'dark' as const : 'gradient' as const,
      title: text(card.querySelector('.pricing-cards__plan-title')),
      description: innerHtml(card.querySelector('.pricing-cards__plan-description')),
      features: [...card.querySelectorAll('.pricing-cards__feature')].map((feature) => ({ text: text(feature) })),
      note: innerHtml(card.querySelector('.pricing-cards__plan-note')) || undefined,
      button: action(card.querySelector('.pricing-cards__button')),
    })),
  };
}

function readFaq(page: Document) {
  const section = required(page, '.faq');

  return {
    type: 'faq' as const,
    title: text(section.querySelector('.faq__title')),
    titleGradient: text(section.querySelector('.faq__title-gradient')),
    searchPlaceholder: section.querySelector<HTMLInputElement>('.faq__search-input')?.placeholder || 'Search FAQ',
    items: [...section.querySelectorAll('.faq__category')].flatMap((category) => {
      const categoryId = slugify(text(category.querySelector('.faq__category-title')));
      return [...category.querySelectorAll('.faq__item')].map((item) => ({
        question: text(item.querySelector('.faq__item-title')),
        answer: innerHtml(item.querySelector('.faq__answer')),
        category: categoryId,
      }));
    }),
  };
}

function replaceBlock(blocks: PageDocument['blocks'], type: PageDocument['blocks'][number]['type'], replacement: PageDocument['blocks'][number]) {
  const index = blocks.findIndex((block) => block.type === type);
  if (index < 0) {
    throw new Error(`Local home document has no ${type} block.`);
  }
  blocks[index] = replacement;
}

function action(element: Element | undefined | null) {
  const link = element?.querySelector<HTMLAnchorElement>('a')
    ?? (element?.tagName === 'A' ? element as HTMLAnchorElement : undefined);
  if (!link) return undefined;
  return { label: text(link), href: toLocalHref(link.href), target: '_self' as const };
}

function required(page: Document, selector: string): Element {
  const element = page.querySelector(selector);
  if (!element) throw new Error(`Production home is missing ${selector}.`);
  return element;
}

function innerHtml(element: Element | null): string {
  return (element?.innerHTML ?? '').trim().replace(/\s*\n\s*/g, ' ');
}

function text(element: Element | undefined | null): string {
  return (element?.textContent ?? '').replace(/\s+/g, ' ').trim();
}

function inlineText(element: Element | null): string {
  return (element?.innerHTML ?? '')
    .replace(/<br\s*\/?>/gi, '||')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function gradientText(element: Element | null): string {
  if (!element) return '';

  return [...element.childNodes]
    .map((node) => {
      if (node.nodeType === node.TEXT_NODE) return node.textContent?.trim() || '';
      if (node.nodeType !== node.ELEMENT_NODE) return '';

      const child = node as Element;
      if (child.classList.contains('ez-toc-section') || child.classList.contains('ez-toc-section-end')) return '';
      return `{{ ${text(child)} }}`;
    })
    .filter(Boolean)
    .join(' ')
    .replace(/\s+([,.!?;:])/g, '$1')
    .trim();
}

function slugify(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
}

function toLocalHref(value: string): string {
  const url = new URL(value);
  const isSiteOrigin = url.hostname === 'acme.example' || url.hostname === 'www.acme.example';
  return isSiteOrigin ? `${url.pathname}${url.search}${url.hash}` : value;
}

async function localizeUpload(value: string): Promise<string> {
  const url = new URL(value);
  const marker = '/wp-content/uploads/';
  const index = url.pathname.indexOf(marker);

  if (index < 0) return value;

  const storagePath = decodeURIComponent(url.pathname.slice(index + marker.length));
  const destination = resolve(mediaRoot, storagePath);
  if (relative(mediaRoot, destination).startsWith('..')) throw new Error(`Unsafe media path: ${value}`);

  if (!(await pathExists(destination))) {
    const response = await fetch(value, { headers: { 'user-agent': 'Acme source migration' } });
    if (!response.ok) throw new Error(`Could not download production media (${response.status}) ${value}`);
    await mkdir(dirname(destination), { recursive: true });
    await writeFile(destination, Buffer.from(await response.arrayBuffer()));
  }

  return `/media/${storagePath}`;
}

function compactSeo(value: ProductionHome['yoast_head_json'], fallback: PageDocument['seo']): PageDocument['seo'] {
  if (!value) return fallback;
  return Object.fromEntries(Object.entries({
    ...fallback,
    metaTitle: decodeHtml(value.title ?? ''),
    metaDescription: decodeHtml(value.description ?? ''),
    canonicalUrl: value.canonical,
    ogTitle: decodeHtml(value.og_title ?? ''),
    ogDescription: decodeHtml(value.og_description ?? ''),
  }).filter(([, item]) => typeof item === 'string' && item.length > 0));
}

function decodeHtml(value: string): string {
  return value.replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&amp;/gi, '&').replace(/&quot;/gi, '"').replace(/&#0?39;|&apos;/gi, "'")
    .replace(/&nbsp;/gi, ' ').replace(/&lt;/gi, '<').replace(/&gt;/gi, '>').replace(/\s+/g, ' ').trim();
}

function stripTags(value: string): string {
  return value.replace(/<[^>]*>/g, ' ');
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}
