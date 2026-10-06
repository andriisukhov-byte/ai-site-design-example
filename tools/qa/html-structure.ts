import { readdir, readFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

import type { PageBlock, PageDocument } from '@acme/blocks';
import { pageDocumentSchema } from '@acme/blocks';
import { siteChrome } from '../../packages/config/src/index';
import { argString, parseArgs, writeJson } from '../migrate/source-utils';

type Finding = {
  file: string;
  code: string;
  message: string;
};

const args = parseArgs();
const distDir = argString(args, 'dist', 'apps/web/dist')!;
const out = argString(args, 'out');
const htmlFiles = await listHtmlFiles(distDir);
const htmlByDisplayFile = new Map<string, string>();
const cmsPages = await readCmsPages();
const findings: Finding[] = [];
const legacyClasses = [
  'blog-index',
  'guides-index',
  'news-index',
  'content-feed',
];
const customTemplateRoutes = new Set([
  '/blog/',
  '/guides/',
  '/news/',
  '/tips-and-tricks/',
]);
const blockRootClassByType: Record<PageBlock['type'], string> = {
  hero: 'hero',
  'hero-extended': 'hero-extended',
  'rich-text': 'rich-text-section',
  'side-by-side': 'side-by-side',
  story: 'story',
  'media-showcase': 'media-showcase',
  'feature-grid': 'feature-grid',
  'agent-capabilities': 'agent-capabilities',
  'agent-solutions': 'agent-solutions',
  'contact-us': 'contact-us',
  'concierge-flow': 'concierge-flow',
  'enterprise-upgrade': 'enterprise-upgrade',
  'channels-grid': 'channels-grid',
  'feature-stack': 'feature-stack',
  'coverage-grid': 'coverage-grid',
  'feature-rows': 'feature-rows',
  'capability-trio': 'capability-trio',
  'use-cases-grid': 'use-cases-grid',
  security: 'security',
  'functional-capabilities': 'functional-capabilities',
  'how-it-works': 'how-it-works',
  cta: 'cta',
  metrics: 'metrics-section',
  'results-stats': 'results-stats',
  'stats-cards': 'stats-cards',
  'capability-strip': 'capability-strip',
  'live-in-days': 'live-in-days',
  faq: 'faq',
  'content-feed': 'news-insights',
  'news-insights': 'news-insights',
  'pricing-cards': 'pricing-cards',
  'pricing-details': 'pricing-details',
  difference: 'difference',
  'pain-points-comparison': 'pain-points-comparison',
  'pricing-policy': 'pricing-policy',
  'industry-expertise': 'industry-expertise',
  'logo-strip': 'logo-strip',
  'logo-grid': 'logo-grid',
  'tabs-showcase': 'tabs-showcase',
  'anchor-nav': 'anchor-pills',
  testimonials: 'testimonial',
  'comparison-grid': 'alternatives-grid',
  'use-case-flow': 'use-cases-flow',
};

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const displayFile = toWebPath(relative(distDir, file));
  htmlByDisplayFile.set(displayFile, html);
  const mainCount = countMatches(html, /<main(?:\s|>)/gi);

  if (mainCount !== 1) {
    findings.push({
      file: displayFile,
      code: 'unexpected-main-count',
      message: `Expected exactly one <main> landmark, found ${mainCount}.`,
    });
  }

  for (const className of legacyClasses) {
    if (html.includes(className)) {
      findings.push({
        file: displayFile,
        code: 'legacy-archive-class',
        message: `Found legacy archive class or block class "${className}".`,
      });
    }
  }

  if (displayFile === 'news/index.html' && (!html.includes('news-timeline') || html.includes('guide-card__link'))) {
    findings.push({
      file: displayFile,
      code: 'invalid-news-archive-template',
      message: 'Expected source news timeline markup and no shared guide-card archive links.',
    });
  }

  if (displayFile === 'tips-and-tricks/index.html' && (!html.includes('tips__grid') || !html.includes('tips-card') || html.includes('guide-card__link'))) {
    findings.push({
      file: displayFile,
      code: 'invalid-tips-archive-template',
      message: 'Expected source tips archive markup and no shared guide-card archive links.',
    });
  }

  if (displayFile === 'blog/index.html' && (!html.includes('blog-featured') || !html.includes('blog-posts guides') || !html.includes('ca-pagination'))) {
    findings.push({
      file: displayFile,
      code: 'invalid-blog-archive-template',
      message: 'Expected source blog archive markup with featured article, blog grid, and pagination.',
    });
  }

  if (displayFile === 'guides/index.html' && (!html.includes('first-guide') || !html.includes('guides__list') || !html.includes('ca-pagination'))) {
    findings.push({
      file: displayFile,
      code: 'invalid-guides-archive-template',
      message: 'Expected source guides archive markup with first guide, guide grid, and pagination.',
    });
  }

  if (displayFile === '404.html' && (!hasClassToken(html, 'not-found') || !hasNoindexRobots(html))) {
    findings.push({
      file: displayFile,
      code: 'invalid-custom-404',
      message: 'Expected custom 404 markup with noindex robots metadata.',
    });
  }

  if (html.includes('<footer class="footer"')) {
    for (const link of siteChrome.socialLinks) {
      if (!html.includes(`data-social-platform="${link.platform}"`) || !html.includes(`href="${escapeHtmlAttribute(link.href)}"`)) {
        findings.push({
          file: displayFile,
          code: 'footer-social-mismatch',
          message: `Expected footer social ${link.platform} to render with configured href ${link.href}.`,
        });
      }
    }
  }
}

for (const page of cmsPages) {
  if (page.status !== 'published' || page.blocks.length === 0 || customTemplateRoutes.has(page.path)) {
    continue;
  }

  const displayFile = pathToDisplayFile(page.path);
  const html = htmlByDisplayFile.get(displayFile);

  if (!html) {
    continue;
  }

  for (const block of page.blocks) {
    const expectedClass = blockRootClassByType[block.type];

    if (!expectedClass || html.includes(classTokenNeedle(expectedClass))) {
      continue;
    }

    findings.push({
      file: displayFile,
      code: 'missing-rendered-block-class',
      message: `Expected block "${block.type}" to render class "${expectedClass}".`,
    });
  }
}

const result = {
  ok: findings.length === 0,
  distDir,
  htmlFiles: htmlFiles.length,
  findingCount: findings.length,
  findings,
};

if (out) {
  await writeJson(out, result);
}

console.log(JSON.stringify(result, null, 2));

if (findings.length > 0) {
  process.exit(1);
}

async function listHtmlFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const path = join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...await listHtmlFiles(path));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(path);
    }
  }

  return files;
}

async function readCmsPages(): Promise<PageDocument[]> {
  const raw = JSON.parse(await readFile('data/cms/pages.json', 'utf8')) as { pages?: unknown[] };

  return (raw.pages ?? []).flatMap((page) => {
    const parsed = pageDocumentSchema.safeParse(page);
    return parsed.success ? [parsed.data] : [];
  });
}

function countMatches(value: string, pattern: RegExp): number {
  return value.match(pattern)?.length ?? 0;
}

function pathToDisplayFile(path: string): string {
  if (path === '/') {
    return 'index.html';
  }

  return `${path.replace(/^\/|\/$/g, '')}/index.html`;
}

function hasClassToken(html: string, className: string): boolean {
  for (const match of html.matchAll(/\bclass=(["'])(.*?)\1/gi)) {
    if ((match[2] ?? '').split(/\s+/).includes(className)) {
      return true;
    }
  }

  return false;
}

function hasNoindexRobots(html: string): boolean {
  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    const tag = match[0];

    if (!/\bname=(["'])robots\1/i.test(tag)) {
      continue;
    }

    const content = tag.match(/\bcontent=(["'])(.*?)\1/i)?.[2];
    if (content?.split(',').some((directive) => directive.trim().toLowerCase() === 'noindex')) {
      return true;
    }
  }

  return false;
}

function classTokenNeedle(className: string): string {
  return `class="${className}`;
}

function toWebPath(path: string): string {
  return path.split(sep).join('/');
}

function escapeHtmlAttribute(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;');
}
