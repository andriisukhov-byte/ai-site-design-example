import { readFile } from 'node:fs/promises';

import { JSDOM, VirtualConsole } from 'jsdom';

import { argString, parseArgs, writeJson } from './source-utils';

type GuidePagesSnapshot = {
  pages?: Array<{ path?: string }>;
};

type GuideCardPresentation = {
  path: string;
  readTimeLabel?: string;
};

const args = parseArgs();
const sourceBase = (argString(args, 'source-base', 'https://acme.example') ?? '').replace(/\/+$/, '');
const pagesInput = argString(args, 'pages', 'data/source/production-guide-pages.json')!;
const out = argString(args, 'out', 'data/source/guides-presentation-reference.json')!;
const concurrency = Math.max(1, Number(argString(args, 'concurrency', '6')) || 6);
const pagesSnapshot = JSON.parse(await readFile(pagesInput, 'utf8')) as GuidePagesSnapshot;
const paths = [...new Set(
  (pagesSnapshot.pages ?? [])
    .map((page) => normalizePath(page.path ?? ''))
    .filter((path) => path.startsWith('/guide/')),
)].sort();

if (!paths.length) {
  throw new Error(`No /guide/ routes were found in ${pagesInput}.`);
}

const records = new Array<ReturnType<typeof parseGuidePresentation>>(paths.length);
let cursor = 0;

await Promise.all(Array.from({ length: Math.min(concurrency, paths.length) }, async () => {
  while (cursor < paths.length) {
    const index = cursor;
    cursor += 1;
    const path = paths[index];
    records[index] = parseGuidePresentation(path, await fetchText(`${sourceBase}${path}`));
  }
}));

const archive = parseArchivePresentation(await fetchText(`${sourceBase}/guides/`));

await writeJson(out, {
  generatedAt: new Date().toISOString(),
  source: sourceBase,
  archive,
  records,
});

console.log(JSON.stringify({
  ok: records.length === paths.length,
  out,
  records: records.length,
  tocVisible: records.filter((record) => record.showTableOfContents).length,
  relatedVisible: records.filter((record) => record.relatedCards.length > 0).length,
  archiveCards: archive.cards.length,
}, null, 2));

function parseGuidePresentation(path: string, html: string) {
  const document = htmlDocument(html);
  const article = document.querySelector('.single-article--guide');
  const related = article?.querySelector('.single-article__related[aria-label="Other Guides"]');

  if (!article) {
    throw new Error(`Production guide markup was not found for ${path}.`);
  }

  return {
    path,
    readTimeLabel: readTimeFor(article),
    showTableOfContents: Boolean(article.querySelector('.single-article__toc .ez-toc-link')),
    relatedCards: related ? cardsFor(related) : [],
  };
}

function parseArchivePresentation(html: string) {
  const document = htmlDocument(html);
  const archive = document.querySelector('main.guide-archive');

  if (!archive) {
    throw new Error('Production guide archive markup was not found.');
  }

  return {
    featuredPath: pathFor(archive.querySelector<HTMLAnchorElement>('.first-guide__title a[href]')?.href),
    cards: cardsFor(archive.querySelector('.guides__list')),
  };
}

function cardsFor(root: Element | null): GuideCardPresentation[] {
  if (!root) {
    return [];
  }

  return [...root.querySelectorAll<HTMLAnchorElement>('.guide-card__link[href]')]
    .map((card) => ({
      path: pathFor(card.href),
      readTimeLabel: readTimeFor(card),
    }))
    .filter((card): card is GuideCardPresentation => Boolean(card.path));
}

function readTimeFor(root: Element): string | undefined {
  const articleValue = [...root.querySelectorAll('.single-article__meta .single-article__meta-item span')]
    .map((item) => normalizeText(item.textContent ?? ''))
    .find((item) => /^\d+\s+min\s+read$/i.test(item));
  const value = articleValue ?? root.querySelector('.guide-card__info-item.read span')?.textContent;
  const normalized = normalizeText(value ?? '');
  return /^\d+\s+min\s+read$/i.test(normalized) ? normalized : undefined;
}

function htmlDocument(html: string): Document {
  return new JSDOM(html, { virtualConsole: new VirtualConsole() }).window.document;
}

function pathFor(value?: string): string {
  if (!value) {
    return '';
  }

  return normalizePath(new URL(value, sourceBase).pathname);
}

function normalizePath(value: string): string {
  const path = value.trim().split(/[?#]/)[0];
  if (!path.startsWith('/')) {
    return '';
  }
  return path.endsWith('/') ? path : `${path}/`;
}

function normalizeText(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

async function fetchText(url: string): Promise<string> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: {
          accept: 'text/html',
          'user-agent': 'Acme source migration',
        },
        signal: AbortSignal.timeout(30_000),
      });

      if (response.ok) {
        return response.text();
      }

      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }

    await new Promise((resolveDelay) => setTimeout(resolveDelay, attempt * 350));
  }

  throw new Error(`Source request failed for ${url}: ${lastError instanceof Error ? lastError.message : String(lastError)}`);
}
