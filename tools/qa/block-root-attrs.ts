import { readdir, readFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

import { pageDocumentSchema, type PageDocument } from '@acme/blocks';
import { argString, parseArgs, writeJson } from '../migrate/source-utils';

type Finding = {
  code: string;
  path: string;
  blockIndex: number;
  blockType: string;
  message: string;
  sample?: string;
};

type RootExpectation = {
  path: string;
  displayFile: string;
  blockIndex: number;
  blockType: string;
  anchor?: string;
  className?: string;
};

const args = parseArgs();
const cmsPagesPath = argString(args, 'pages', 'data/cms/pages.json')!;
const distDir = argString(args, 'dist', 'apps/web/dist')!;
const out = argString(args, 'out');
const cmsPages = await readCmsPages(cmsPagesPath);
const htmlByDisplayFile = new Map<string, string>();
const findings: Finding[] = [];

for (const file of await listHtmlFiles(distDir)) {
  htmlByDisplayFile.set(toWebPath(relative(distDir, file)), await readFile(file, 'utf8'));
}

const expectations = collectExpectations(cmsPages);

for (const expectation of expectations) {
  const html = htmlByDisplayFile.get(expectation.displayFile);

  if (!html) {
    findings.push({
      code: 'missing-built-html',
      path: expectation.path,
      blockIndex: expectation.blockIndex,
      blockType: expectation.blockType,
      message: `Expected built HTML file ${expectation.displayFile} for block root attribute verification.`,
    });
    continue;
  }

  if (expectation.anchor && !hasId(html, expectation.anchor)) {
    findings.push({
      code: 'missing-root-anchor',
      path: expectation.path,
      blockIndex: expectation.blockIndex,
      blockType: expectation.blockType,
      message: `Expected migrated block root anchor id="${expectation.anchor}" in built HTML.`,
      sample: expectation.anchor,
    });
  }

  if (expectation.className && !hasClassTokens(html, expectation.className)) {
    findings.push({
      code: 'missing-root-class',
      path: expectation.path,
      blockIndex: expectation.blockIndex,
      blockType: expectation.blockType,
      message: `Expected migrated block root className "${expectation.className}" in built HTML.`,
      sample: expectation.className,
    });
  }
}

const routesWithExpectations = new Set(expectations.map((expectation) => expectation.path));
const report = {
  ok: findings.length === 0,
  generatedAt: new Date().toISOString(),
  cmsPagesPath,
  distDir,
  htmlFiles: htmlByDisplayFile.size,
  routesWithRootAttrs: routesWithExpectations.size,
  rootAttrExpectations: expectations.length,
  anchorsExpected: expectations.filter((expectation) => expectation.anchor).length,
  classNamesExpected: expectations.filter((expectation) => expectation.className).length,
  findingCount: findings.length,
  findings,
};

if (out) {
  await writeJson(out, report);
}

console.log(JSON.stringify(report, null, 2));

if (findings.length > 0) {
  process.exit(1);
}

async function readCmsPages(path: string): Promise<PageDocument[]> {
  const raw = JSON.parse(await readFile(path, 'utf8')) as { pages?: unknown[] };

  return (raw.pages ?? []).flatMap((page) => {
    const parsed = pageDocumentSchema.safeParse(page);
    return parsed.success ? [parsed.data] : [];
  });
}

function collectExpectations(pages: PageDocument[]): RootExpectation[] {
  const expectations: RootExpectation[] = [];

  for (const page of pages) {
    // The block lab is split across nine fixture-driven routes and has its own
    // exact-inventory visual audit; it is not rendered from this CMS document.
    if (page.status !== 'published' || page.path === '/blocks/') {
      continue;
    }

    for (const [blockIndex, block] of page.blocks.entries()) {
      const anchor = block.root?.anchor?.trim();
      const className = block.root?.className?.trim();

      if (!anchor && !className) {
        continue;
      }

      expectations.push({
        path: page.path,
        displayFile: pathToDisplayFile(page.path),
        blockIndex,
        blockType: block.type,
        anchor,
        className,
      });
    }
  }

  return expectations;
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

function pathToDisplayFile(path: string): string {
  if (path === '/') {
    return 'index.html';
  }

  return `${path.replace(/^\/|\/$/g, '')}/index.html`;
}

function hasId(html: string, id: string): boolean {
  return new RegExp(`\\sid=(["'])${escapeRegExp(escapeHtmlAttribute(id))}\\1`, 'i').test(html);
}

function hasClassTokens(html: string, className: string): boolean {
  const tokens = className.split(/\s+/).filter(Boolean);
  const classPattern = /\sclass=(["'])(.*?)\1/gis;

  for (const match of html.matchAll(classPattern)) {
    const renderedTokens = new Set(match[2].split(/\s+/).filter(Boolean));

    if (tokens.every((token) => renderedTokens.has(token))) {
      return true;
    }
  }

  return false;
}

function toWebPath(path: string): string {
  return path.split(sep).join('/');
}

function escapeHtmlAttribute(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;');
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
