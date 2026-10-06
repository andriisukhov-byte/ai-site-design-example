import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, relative, resolve } from 'node:path';

import { JSDOM, VirtualConsole } from 'jsdom';
import { pageDocumentSchema, type PageBlock, type PageDocument } from '@acme/blocks';

import { argString, parseArgs, pathExists, writeJson } from './source-utils';

type CmsExport = {
  generatedAt?: string;
  source?: string;
  pages?: unknown[];
  [key: string]: unknown;
};

type ContentAuditReport = {
  results?: Array<{ path?: string; localOnly?: boolean }>;
};

type CapabilityToolsBlock = Extract<PageBlock, { type: 'capability-tools' }>;

const args = parseArgs();
const productionBase = (argString(args, 'production-base', 'https://acme.example') ?? '').replace(/\/+$/, '');
const input = argString(args, 'input', 'data/cms/pages.json')!;
const out = argString(args, 'out', input)!;
const reportFile = argString(args, 'report', 'data/source/production-content-parity-report.json')!;
const mediaRoot = resolve(argString(args, 'media-dir', 'apps/web/public/media')!);
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
  && (
    page.path === '/ai-receptionist-for-cleaning-companies/'
    || page.blocks.some((block) =>
      block.type === 'logo-strip'
      || block.type === 'testimonials'
      || block.type === 'how-it-works'
    )
  ),
);
const productionByPath = new Map<string, Document>();
const skipped: string[] = [];

await Promise.all(candidates.map(async (page) => {
  const url = new URL(page.path, `${productionBase}/`).toString();
  const response = await fetch(url, {
    headers: { accept: 'text/html', 'user-agent': 'Acme source migration' },
    signal: AbortSignal.timeout(30_000),
  });

  if (!response.ok) {
    skipped.push(page.path);
    return;
  }

  productionByPath.set(page.path, new JSDOM(await response.text(), {
    url,
    virtualConsole: new VirtualConsole(),
  }).window.document);
}));

let updated = 0;
let removedLogoStrips = 0;
let removedDuplicateTestimonials = 0;
let syncedCapabilityTools = 0;
let syncedHowItWorksSubtitles = 0;
const nextPages: PageDocument[] = [];

for (const page of pages) {
  const production = productionByPath.get(page.path);
  if (!production) {
    nextPages.push(page);
    continue;
  }

  let blocks = [...page.blocks];
  const productionLogoStrips = production.querySelectorAll('.logo-strip').length;
  const localLogoStrips = blocks.filter((block) => block.type === 'logo-strip').length;

  if (localLogoStrips > productionLogoStrips) {
    let retained = 0;
    blocks = blocks.filter((block) => {
      if (block.type !== 'logo-strip') return true;
      retained += 1;
      return retained <= productionLogoStrips;
    });
    removedLogoStrips += localLogoStrips - productionLogoStrips;
  }

  const productionTestimonials = production.querySelectorAll('.testimonial').length;
  const localTestimonials = blocks.filter((block) => block.type === 'testimonials').length;

  if (localTestimonials > productionTestimonials) {
    let retained = 0;
    blocks = blocks.filter((block) => {
      if (block.type !== 'testimonials') return true;
      retained += 1;
      return retained <= productionTestimonials;
    });
    removedDuplicateTestimonials += localTestimonials - productionTestimonials;
  }

  const productionCapabilityTools = production.querySelector('.capability-tools');
  if (productionCapabilityTools) {
    const capabilityTools = await readCapabilityTools(productionCapabilityTools);
    const existingIndex = blocks.findIndex((block) => block.type === 'capability-tools');

    if (existingIndex >= 0) {
      blocks[existingIndex] = capabilityTools;
    } else {
      const precedingIndex = blocks.findIndex((block) => block.type === 'functional-capabilities');
      blocks.splice(precedingIndex >= 0 ? precedingIndex + 1 : 0, 0, capabilityTools);
    }
    syncedCapabilityTools += 1;
  }

  const productionHowItWorks = [...production.querySelectorAll('.how-it-works')];
  let howItWorksIndex = 0;
  blocks = blocks.map((block) => {
    if (block.type !== 'how-it-works') return block;

    const sourceSection = productionHowItWorks[howItWorksIndex];
    howItWorksIndex += 1;
    if (!sourceSection) return block;

    const subtitle = text(sourceSection.querySelector('.how-it-works__subtitle')) || undefined;
    if (block.subtitle !== subtitle) syncedHowItWorksSubtitles += 1;
    return { ...block, subtitle };
  });

  const next = pageDocumentSchema.parse({ ...page, blocks });
  if (JSON.stringify(next.blocks) !== JSON.stringify(page.blocks)) updated += 1;
  nextPages.push(next);
}

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
  updated,
  removedLogoStrips,
  removedDuplicateTestimonials,
  syncedCapabilityTools,
  syncedHowItWorksSubtitles,
  skipped: skipped.sort(),
}, null, 2));

async function readCapabilityTools(section: Element): Promise<CapabilityToolsBlock> {
  const cards = await Promise.all(
    [...section.querySelectorAll('.capability-tools__card')].map(async (card) => {
      const visibleLogos = [
        ...card.querySelectorAll<HTMLImageElement>(':scope > .capability-tools__tools > .capability-tools__tool > .capability-tools__logo'),
      ].slice(0, 6);

      return {
        title: text(card.querySelector('.capability-tools__card-title')) || undefined,
        description: text(card.querySelector('.capability-tools__card-desc')) || undefined,
        href: toLocalHref(card.querySelector<HTMLAnchorElement>('.capability-tools__card-link')?.href),
        logos: await Promise.all(visibleLogos.map(async (image) => ({
          src: await localizeUpload(image.src),
          alt: image.alt,
        }))),
        extraTools: Number.parseInt(text(card.querySelector('.capability-tools__more-count')).replace(/\D+/g, ''), 10) || 0,
      };
    }),
  );

  return {
    type: 'capability-tools',
    eyebrow: text(section.querySelector('.capability-tools__eyebrow')) || undefined,
    title: gradientText(section.querySelector('.capability-tools__title')) || undefined,
    description: text(section.querySelector('.capability-tools__description')) || undefined,
    cards,
  };
}

function toLocalHref(value?: string): string | undefined {
  if (!value) return undefined;
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
    const response = await fetch(value, {
      headers: { 'user-agent': 'Acme source migration' },
      signal: AbortSignal.timeout(30_000),
    });
    if (!response.ok) throw new Error(`Could not download production media (${response.status}) ${value}`);
    await mkdir(dirname(destination), { recursive: true });
    await writeFile(destination, Buffer.from(await response.arrayBuffer()));
  }

  return `/media/${storagePath}`;
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
      return `{{ ${text(node as Element)} }}`;
    })
    .filter(Boolean)
    .join(' ')
    .replace(/\s+([,.!?;:])/g, '$1')
    .trim();
}
