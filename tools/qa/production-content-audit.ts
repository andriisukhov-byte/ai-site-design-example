import { readFile } from 'node:fs/promises';

import { JSDOM, VirtualConsole } from 'jsdom';

import { argString, parseArgs, writeJson } from '../migrate/source-utils';

type CmsExport = {
  pages?: Array<{
    path?: string;
    status?: string;
    collection?: string;
    template?: string;
    title?: string;
  }>;
};

type PageCapture = {
  ok: boolean;
  status?: number;
  finalUrl?: string;
  title?: string;
  description?: string;
  headings: string[];
  normalizedText: string;
  words: string[];
  error?: string;
};

type RouteAudit = {
  path: string;
  collection?: string;
  template?: string;
  localOnly: boolean;
  production: PageCapture;
  local: PageCapture;
  comparison?: {
    verdict: 'exact' | 'matching' | 'drift';
    sourceCoverage: number;
    localPrecision: number;
    diceSimilarity: number;
    titleMatches: boolean;
    descriptionMatches: boolean;
    headingsMatch: boolean;
    productionWords: number;
    localWords: number;
    productionHeadingCount: number;
    localHeadingCount: number;
    firstHeadingDifference?: {
      index: number;
      production?: string;
      local?: string;
    };
  };
};

const args = parseArgs();
const productionBase = stripTrailingSlash(argString(args, 'production-base', 'https://acme.example')!);
const localBase = stripTrailingSlash(argString(args, 'local-base', 'http://127.0.0.1:4321')!);
const sitemapUrl = argString(args, 'sitemap', `${productionBase}/sitemap_index.xml`)!;
const pagesFile = argString(args, 'pages', 'data/cms/pages.json')!;
const out = argString(args, 'out', 'data/source/production-content-parity-report.json')!;
const concurrency = Math.max(1, Number(argString(args, 'concurrency', '8')) || 8);
const sourceCoverageThreshold = Number(argString(args, 'source-coverage', '0.98'));
const localPrecisionThreshold = Number(argString(args, 'local-precision', '0.98'));

const cms = JSON.parse(await readFile(pagesFile, 'utf8')) as CmsExport;
const localDocuments = (cms.pages ?? []).filter((page) => page.status === 'published' && typeof page.path === 'string');
const localByPath = new Map(localDocuments.map((page) => [normalizePath(page.path!), page]));
const productionPaths = await readSitemapPaths(sitemapUrl);
const productionPathSet = new Set(productionPaths);
const allPaths = [...new Set([...productionPaths, ...localByPath.keys()])].sort();

let cursor = 0;
const results: RouteAudit[] = new Array(allPaths.length);

await Promise.all(Array.from({ length: Math.min(concurrency, allPaths.length) }, async () => {
  while (cursor < allPaths.length) {
    const index = cursor;
    cursor += 1;
    const path = allPaths[index];
    const localDocument = localByPath.get(path);
    const localOnly = !productionPathSet.has(path);
    const [production, local] = await Promise.all([
      localOnly ? Promise.resolve(emptyCapture('Not present in production sitemap.')) : capture(`${productionBase}${path}`),
      capture(`${localBase}${path}`),
    ]);

    results[index] = {
      path,
      collection: localDocument?.collection,
      template: localDocument?.template,
      localOnly,
      production,
      local,
      comparison: !localOnly && production.ok && local.ok
        ? compare(production, local)
        : undefined,
    };

    if ((index + 1) % 25 === 0 || index + 1 === allPaths.length) {
      console.error(`[${index + 1}/${allPaths.length}] ${path}`);
    }
  }
}));

const productionResults = results.filter((result) => !result.localOnly);
const exact = productionResults.filter((result) => result.comparison?.verdict === 'exact');
const matching = productionResults.filter((result) => result.comparison?.verdict === 'matching');
const drift = productionResults.filter((result) => result.comparison?.verdict === 'drift');
const missingLocally = productionResults.filter((result) => !result.local.ok);
const sourceFailures = productionResults.filter((result) => !result.production.ok);
const localOnly = results.filter((result) => result.localOnly);

const report = {
  generatedAt: new Date().toISOString(),
  productionBase,
  localBase,
  sitemapUrl,
  thresholds: {
    sourceCoverage: sourceCoverageThreshold,
    localPrecision: localPrecisionThreshold,
  },
  summary: {
    productionRoutes: productionResults.length,
    localPublishedRoutes: localDocuments.length,
    checkedProductionRoutes: productionResults.length - sourceFailures.length,
    exact: exact.length,
    matching: matching.length,
    drift: drift.length,
    missingLocally: missingLocally.length,
    sourceFailures: sourceFailures.length,
    localOnlyPreserved: localOnly.length,
  },
  driftPaths: drift.map((result) => result.path),
  missingLocalPaths: missingLocally.map((result) => result.path),
  sourceFailurePaths: sourceFailures.map((result) => result.path),
  localOnlyPaths: localOnly.map((result) => result.path),
  results: results.map((result) => ({
    ...result,
    production: compactCapture(result.production),
    local: compactCapture(result.local),
  })),
};

await writeJson(out, report);
console.log(JSON.stringify({ ok: sourceFailures.length === 0, out, ...report.summary }, null, 2));

async function readSitemapPaths(entryUrl: string): Promise<string[]> {
  const pending = [entryUrl];
  const visited = new Set<string>();
  const paths = new Set<string>();

  while (pending.length > 0) {
    const url = pending.shift()!;
    if (visited.has(url)) continue;
    visited.add(url);

    const response = await fetchWithTimeout(url);
    if (!response.ok) throw new Error(`Sitemap request failed (${response.status}) ${url}`);
    const xml = await response.text();
    const document = new JSDOM(xml, { contentType: 'text/xml' }).window.document;

    for (const loc of document.querySelectorAll('sitemap > loc')) {
      const child = loc.textContent?.trim();
      if (child && !visited.has(child)) pending.push(child);
    }

    for (const loc of document.querySelectorAll('url > loc')) {
      const value = loc.textContent?.trim();
      if (!value) continue;
      const parsed = new URL(value, productionBase);
      if (parsed.origin !== new URL(productionBase).origin) continue;
      paths.add(normalizePath(parsed.pathname));
    }
  }

  return [...paths].sort();
}

async function capture(url: string): Promise<PageCapture> {
  try {
    const response = await fetchWithTimeout(url);
    const html = await response.text();
    if (!response.ok) {
      return { ...emptyCapture(`HTTP ${response.status}`), status: response.status, finalUrl: response.url };
    }

    const document = new JSDOM(html, { virtualConsole: new VirtualConsole() }).window.document;
    const main = document.querySelector('main') ?? document.querySelector('#page') ?? document.body;
    const clone = main.cloneNode(true) as Element;
    for (const element of clone.querySelectorAll([
      'script',
      'style',
      'noscript',
      'template',
      '[hidden]',
      '.popup-overlay',
      '.ca-popup',
      'header.site-header',
      '#masthead',
      'footer',
      '[role="dialog"]',
      '.skip-link',
      '.screen-reader-text',
      '.screen-reader-response',
      '.sr-only',
    ].join(','))) {
      element.remove();
    }

    if (normalizePath(new URL(url).pathname) === '/tips-and-tricks/') {
      for (const element of clone.querySelectorAll('.tips__stats,.tips__grid,.tips__pagination-wrap')) {
        element.remove();
      }
    }

    const normalizedText = elementText(clone);
    const headings = [...clone.querySelectorAll('h1,h2,h3,h4,h5,h6')]
      .map((heading) => elementText(heading))
      .filter(Boolean);

    return {
      ok: true,
      status: response.status,
      finalUrl: response.url,
      title: normalizeText(document.title),
      description: normalizeText(document.querySelector<HTMLMetaElement>('meta[name="description"]')?.content ?? ''),
      headings,
      normalizedText,
      words: tokenize(normalizedText),
    };
  } catch (error) {
    return emptyCapture(error instanceof Error ? error.message : String(error));
  }
}

function compare(production: PageCapture, local: PageCapture): NonNullable<RouteAudit['comparison']> {
  const productionCounts = wordCounts(production.words);
  const localCounts = wordCounts(local.words);
  let intersection = 0;

  for (const [word, count] of productionCounts) {
    intersection += Math.min(count, localCounts.get(word) ?? 0);
  }

  const sourceCoverage = production.words.length ? intersection / production.words.length : Number(local.words.length === 0);
  const localPrecision = local.words.length ? intersection / local.words.length : Number(production.words.length === 0);
  const diceSimilarity = production.words.length + local.words.length
    ? (2 * intersection) / (production.words.length + local.words.length)
    : 1;
  const titleMatches = production.title === local.title;
  const descriptionMatches = production.description === local.description;
  const headingsMatch = arraysEqual(production.headings, local.headings);
  const exactText = production.normalizedText === local.normalizedText;
  const matchingContent = sourceCoverage >= sourceCoverageThreshold && localPrecision >= localPrecisionThreshold;

  return {
    verdict: exactText && headingsMatch ? 'exact' : matchingContent ? 'matching' : 'drift',
    sourceCoverage: round(sourceCoverage),
    localPrecision: round(localPrecision),
    diceSimilarity: round(diceSimilarity),
    titleMatches,
    descriptionMatches,
    headingsMatch,
    productionWords: production.words.length,
    localWords: local.words.length,
    productionHeadingCount: production.headings.length,
    localHeadingCount: local.headings.length,
    firstHeadingDifference: headingsMatch ? undefined : firstArrayDifference(production.headings, local.headings),
  };
}

async function fetchWithTimeout(url: string): Promise<Response> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url, {
        redirect: 'follow',
        signal: AbortSignal.timeout(30_000),
        headers: {
          accept: 'text/html,application/xml;q=0.9,*/*;q=0.8',
          'user-agent': 'Acme production content audit',
        },
      });

      if (response.ok || response.status < 500 && response.status !== 429) {
        return response;
      }

      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }

    await new Promise((resolveDelay) => setTimeout(resolveDelay, attempt * 350));
  }

  throw lastError instanceof Error ? lastError : new Error(String(lastError));
}

function emptyCapture(error: string): PageCapture {
  return { ok: false, headings: [], normalizedText: '', words: [], error };
}

function compactCapture(capture: PageCapture): Omit<PageCapture, 'normalizedText' | 'words'> {
  const compact: Partial<PageCapture> = { ...capture };
  delete compact.normalizedText;
  delete compact.words;
  return compact as Omit<PageCapture, 'normalizedText' | 'words'>;
}

function normalizeText(value: string): string {
  return value
    .normalize('NFKC')
    .replace(/[–—−]/g, '-')
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

function elementText(element: Element): string {
  const document = element.ownerDocument;
  const walker = document.createTreeWalker(element, 4);
  const chunks: string[] = [];
  let current = walker.nextNode();

  while (current) {
    const value = normalizeText(current.textContent ?? '');
    if (value) chunks.push(value);
    current = walker.nextNode();
  }

  return normalizeText(chunks.join(' '));
}

function tokenize(value: string): string[] {
  return value.toLocaleLowerCase('en-US').match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu) ?? [];
}

function wordCounts(words: string[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const word of words) counts.set(word, (counts.get(word) ?? 0) + 1);
  return counts;
}

function arraysEqual(left: string[], right: string[]): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

function firstArrayDifference(left: string[], right: string[]) {
  const length = Math.max(left.length, right.length);
  for (let index = 0; index < length; index += 1) {
    if (left[index] !== right[index]) return { index, production: left[index], local: right[index] };
  }
  return undefined;
}

function normalizePath(value: string): string {
  const pathname = value.split(/[?#]/)[0].replace(/\/{2,}/g, '/');
  if (!pathname || pathname === '/') return '/';
  const withLeadingSlash = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${withLeadingSlash.replace(/\/+$/, '')}/`;
}

function stripTrailingSlash(value: string): string {
  return value.replace(/\/+$/, '');
}

function round(value: number): number {
  return Number(value.toFixed(4));
}
