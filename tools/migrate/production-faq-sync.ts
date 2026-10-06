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

type FaqBlock = Extract<PageDocument['blocks'][number], { type: 'faq' }>;

const args = parseArgs();
const productionBase = (argString(args, 'production-base', 'https://acme.example') ?? '').replace(/\/+$/, '');
const input = argString(args, 'input', 'data/cms/pages.json')!;
const out = argString(args, 'out', input)!;
const reportFile = argString(args, 'report', 'data/source/production-content-parity-report.json')!;
const concurrency = Math.max(1, Number(argString(args, 'concurrency', '8')) || 8);
const cms = JSON.parse(await readFile(input, 'utf8')) as CmsExport;
const report = JSON.parse(await readFile(reportFile, 'utf8')) as ContentAuditReport;
const productionPaths = new Set(
  (report.results ?? [])
    .filter((result) => !result.localOnly && typeof result.path === 'string')
    .map((result) => result.path!),
);
const pages = (cms.pages ?? []).map((candidate) => pageDocumentSchema.parse(candidate));
const candidates = pages.filter((page) =>
  page.status === 'published'
  && productionPaths.has(page.path)
  && page.blocks.some((block) => block.type === 'faq'),
);
const faqByPath = new Map<string, FaqBlock>();
const skipped: string[] = [];
let cursor = 0;

await Promise.all(Array.from({ length: Math.min(concurrency, candidates.length) }, async () => {
  while (cursor < candidates.length) {
    const index = cursor;
    cursor += 1;
    const page = candidates[index];
    const url = new URL(page.path, `${productionBase}/`).toString();
    const response = await fetch(url, {
      headers: { accept: 'text/html', 'user-agent': 'Acme source migration' },
      signal: AbortSignal.timeout(30_000),
    });

    if (!response.ok) {
      skipped.push(page.path);
      continue;
    }

    const document = new JSDOM(await response.text(), {
      url,
      virtualConsole: new VirtualConsole(),
    }).window.document;
    const section = document.querySelector('.faq');

    if (!section) {
      skipped.push(page.path);
      continue;
    }

    const current = page.blocks.find((block): block is FaqBlock => block.type === 'faq')!;
    faqByPath.set(page.path, {
      ...current,
      ...readFaq(section),
      background: current.background,
      root: current.root,
    });
  }
}));

let updated = 0;
const nextPages = pages.map((page) => {
  const faq = faqByPath.get(page.path);
  if (!faq) return page;

  const blocks = [...page.blocks];
  const index = blocks.findIndex((block) => block.type === 'faq');
  if (index < 0) return page;

  if (JSON.stringify(blocks[index]) !== JSON.stringify(faq)) updated += 1;
  blocks[index] = faq;
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
  report: reportFile,
  checked: candidates.length,
  found: faqByPath.size,
  updated,
  skipped: skipped.sort(),
}, null, 2));

function readFaq(section: Element): Pick<FaqBlock, 'type' | 'title' | 'titleGradient' | 'searchPlaceholder' | 'items'> {
  const categories = [...section.querySelectorAll('.faq__category')];
  const items = categories.length > 0
    ? categories.flatMap((category) => readItems(category, slugify(text(category.querySelector('.faq__category-title')))))
    : readItems(section);

  return {
    type: 'faq',
    title: text(section.querySelector('.faq__title')),
    titleGradient: text(section.querySelector('.faq__title-gradient')) || undefined,
    searchPlaceholder: section.querySelector<HTMLInputElement>('.faq__search-input')?.placeholder || 'Search FAQ',
    items,
  };
}

function readItems(root: Element, category?: string): FaqBlock['items'] {
  return [...root.querySelectorAll('.faq__item')].map((item) => ({
    question: text(item.querySelector('.faq__item-title')),
    answer: localizeHtml(innerHtml(item.querySelector('.faq__answer'))),
    category: category || undefined,
  }));
}

function localizeHtml(value: string): string {
  return value
    .replaceAll(`${productionBase}/`, '/')
    .replaceAll(productionBase, '');
}

function innerHtml(element: Element | null): string {
  return (element?.innerHTML ?? '').trim().replace(/\s*\n\s*/g, ' ');
}

function text(element: Element | null | undefined): string {
  return (element?.textContent ?? '').replace(/\s+/g, ' ').trim();
}

function slugify(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
}
