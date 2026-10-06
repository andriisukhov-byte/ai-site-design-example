import { readFile } from 'node:fs/promises';

import { JSDOM, VirtualConsole } from 'jsdom';
import { pageDocumentSchema, type PageDocument } from '@acme/blocks';

import { argString, parseArgs, writeJson } from './source-utils';

type CmsExport = {
  generatedAt?: string;
  source?: string;
  pages?: unknown[];
  [key: string]: unknown;
};

type ContentAuditReport = {
  results?: Array<{ path?: string; localOnly?: boolean }>;
};

const args = parseArgs();
const productionBase = (argString(args, 'production-base', 'https://acme.example') ?? '').replace(/\/+$/, '');
const input = argString(args, 'input', 'data/cms/pages.json')!;
const out = argString(args, 'out', input)!;
const reportFile = argString(args, 'report', 'data/source/production-content-parity-report.json')!;
const cms = JSON.parse(await readFile(input, 'utf8')) as CmsExport;
const report = JSON.parse(await readFile(reportFile, 'utf8')) as ContentAuditReport;
const productionPathSet = new Set(
  (report.results ?? [])
    .filter((result) => !result.localOnly && typeof result.path === 'string')
    .map((result) => result.path!),
);
const pages = (cms.pages ?? []).map((candidate) => pageDocumentSchema.parse(candidate));
const pricingPaths = pages
  .filter((page) =>
    page.status === 'published'
    && productionPathSet.has(page.path)
    && page.blocks.some((block) => block.type === 'pricing-cards'),
  )
  .map((page) => page.path);
const pricingByPath = new Map<string, Extract<PageDocument['blocks'][number], { type: 'pricing-cards' }>>();
const skipped: string[] = [];

for (const path of pricingPaths) {
  const url = new URL(path, `${productionBase}/`).toString();
  const response = await fetch(url, {
    headers: { accept: 'text/html', 'user-agent': 'Acme source migration' },
    signal: AbortSignal.timeout(30_000),
  });

  if (!response.ok) {
    skipped.push(path);
    continue;
  }
  const document = new JSDOM(await response.text(), { url, virtualConsole: new VirtualConsole() }).window.document;
  const section = document.querySelector('.pricing-cards');
  if (!section) {
    skipped.push(path);
    continue;
  }
  pricingByPath.set(path, readPricing(section));
}

let updated = 0;
const nextPages = pages.map((page) => {
  const pricing = pricingByPath.get(page.path);
  if (!pricing) return page;

  const blocks = [...page.blocks];
  const index = blocks.findIndex((block) => block.type === 'pricing-cards');
  if (index < 0) return page;

  const current = blocks[index] as Extract<PageDocument['blocks'][number], { type: 'pricing-cards' }>;
  const nextPricing = {
    ...pricing,
    background: current.background,
    root: current.root,
  };

  if (JSON.stringify(current) !== JSON.stringify(nextPricing)) updated += 1;
  blocks[index] = nextPricing;
  return pageDocumentSchema.parse({ ...page, blocks });
});

await writeJson(out, {
  ...cms,
  generatedAt: new Date().toISOString(),
  pages: nextPages,
});

console.log(JSON.stringify({
  ok: true,
  input,
  out,
  checked: pricingPaths.length,
  updated,
  skipped,
}, null, 2));

function readPricing(section: Element): Extract<PageDocument['blocks'][number], { type: 'pricing-cards' }> {
  return {
    type: 'pricing-cards',
    title: gradientText(section.querySelector('.pricing-cards__title')),
    description: text(section.querySelector('.pricing-cards__description')) || undefined,
    cards: [...section.querySelectorAll<HTMLElement>('.pricing-cards__plan')].map((card) => ({
      accent: card.classList.contains('pricing-cards__plan--dark') ? 'dark' : 'gradient',
      title: text(card.querySelector('.pricing-cards__plan-title')),
      description: innerHtml(card.querySelector('.pricing-cards__plan-description')),
      features: [...card.querySelectorAll('.pricing-cards__feature')].map((feature) => ({ text: text(feature) })),
      note: innerHtml(card.querySelector('.pricing-cards__plan-note')) || undefined,
      button: action(card.querySelector('.pricing-cards__button')),
    })),
  };
}

function action(element: Element | null | undefined) {
  const link = element?.querySelector<HTMLAnchorElement>('a')
    ?? (element?.tagName === 'A' ? element as HTMLAnchorElement : undefined);
  if (!link) return undefined;

  const sourceHref = link.getAttribute('href') || link.href;
  const url = new URL(sourceHref, `${productionBase}/`);
  const isSiteOrigin = url.hostname === 'acme.example' || url.hostname === 'www.acme.example';

  return {
    label: text(link),
    href: sourceHref.startsWith('#')
      ? sourceHref
      : isSiteOrigin
        ? `${url.pathname}${url.search}${url.hash}`
        : sourceHref,
    target: '_self' as const,
  };
}

function innerHtml(element: Element | null): string {
  return (element?.innerHTML ?? '').trim().replace(/\s*\n\s*/g, ' ');
}

function text(element: Element | null | undefined): string {
  return (element?.textContent ?? '').replace(/\s+/g, ' ').trim();
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
