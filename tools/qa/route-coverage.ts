import { readdir, readFile, writeFile } from 'node:fs/promises';
import { extname, join, relative, sep } from 'node:path';

import { pageDocumentSchema, type PageDocument } from '@acme/blocks';

type CmsPagesExport = {
  generatedAt?: string;
  pages?: unknown[];
};

type Redirect = {
  from: string;
  to: string;
  file: string;
};

type Finding = {
  code: string;
  severity: 'blocker' | 'warning';
  path?: string;
  message: string;
  expected?: string;
  actual?: string;
};

const cmsPagesPath = argString('pages', 'data/cms/pages.json');
const distDir = argString('dist', 'apps/web/dist');
const redirectsRoot = argString('redirects-root', 'apps/web/src/pages');
const outPath = argString('out');
const cmsPages = JSON.parse(await readFile(cmsPagesPath, 'utf8')) as CmsPagesExport;
const findings: Finding[] = [];
const pages: PageDocument[] = [];

for (const [index, rawPage] of (cmsPages.pages ?? []).entries()) {
  const parsed = pageDocumentSchema.safeParse(rawPage);

  if (parsed.success) {
    pages.push(parsed.data);
    continue;
  }

  findings.push({
    code: 'schema-invalid',
    severity: 'blocker',
    message: parsed.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join('; '),
    actual: String(index),
  });
}

const redirects = await discoverLegacyRedirects(redirectsRoot);
const redirectSources = new Set(redirects.map((redirect) => redirect.from));
const publishedPaths = new Set(pages.filter((page) => page.status === 'published').map((page) => page.path));
const draftPaths = new Set(pages.filter((page) => page.status === 'draft').map((page) => page.path));
const htmlRoutes = new Set((await listHtmlFiles(distDir)).map(routePathForHtml));
const expectedRoutes = new Set([...publishedPaths, ...redirectSources, '/404']);

for (const path of publishedPaths) {
  if (!htmlRoutes.has(path)) {
    findings.push({
      code: 'published-route-not-built',
      severity: 'blocker',
      path,
      message: 'Published CMS route is missing from the built Astro HTML output.',
      expected: path,
    });
  }
}

for (const redirect of redirects) {
  if (!htmlRoutes.has(redirect.from)) {
    findings.push({
      code: 'redirect-route-not-built',
      severity: 'blocker',
      path: redirect.from,
      message: 'Explicit legacy redirect route is missing from the built Astro HTML output.',
      expected: redirect.from,
      actual: redirect.to,
    });
  }
}

for (const path of draftPaths) {
  if (htmlRoutes.has(path) && !redirectSources.has(path)) {
    findings.push({
      code: 'draft-route-built',
      severity: 'blocker',
      path,
      message: 'Draft CMS route must not be emitted as a public HTML page.',
    });
  }
}

for (const route of htmlRoutes) {
  if (expectedRoutes.has(route)) {
    continue;
  }

  findings.push({
    code: 'unowned-built-route',
    severity: 'warning',
    path: route,
    message: 'Built HTML route is not owned by a published CMS document, explicit redirect, or 404 artifact.',
  });
}

const blockerCount = findings.filter((finding) => finding.severity === 'blocker').length;
const report = {
  ok: blockerCount === 0,
  generatedAt: new Date().toISOString(),
  cmsPagesPath,
  cmsGeneratedAt: cmsPages.generatedAt,
  distDir,
  redirectsRoot,
  totalDocuments: pages.length,
  publishedRoutes: publishedPaths.size,
  draftRoutes: draftPaths.size,
  explicitRedirects: redirects.length,
  builtHtmlRoutes: htmlRoutes.size,
  expectedBuiltRoutes: expectedRoutes.size,
  missingPublishedRoutes: findings.filter((finding) => finding.code === 'published-route-not-built').length,
  missingRedirectRoutes: findings.filter((finding) => finding.code === 'redirect-route-not-built').length,
  builtDraftRoutes: findings.filter((finding) => finding.code === 'draft-route-built').length,
  unownedBuiltRoutes: findings.filter((finding) => finding.code === 'unowned-built-route').length,
  blockerCount,
  findingCount: findings.length,
  redirects,
  findings,
};

if (outPath) {
  await writeFile(outPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
}

console.log(JSON.stringify(report, null, 2));

if (blockerCount > 0) {
  process.exit(1);
}

function argString(name: string, fallback?: string): string {
  const index = process.argv.indexOf(`--${name}`);

  if (index === -1) {
    return fallback ?? '';
  }

  return process.argv[index + 1] ?? fallback ?? '';
}

async function discoverLegacyRedirects(root: string): Promise<Redirect[]> {
  const files = await listAstroFiles(root);
  const redirects: Redirect[] = [];

  for (const file of files) {
    const text = await readFile(file, 'utf8');

    if (!text.includes('LegacyRedirect')) {
      continue;
    }

    const from = /from=["']([^"']+)["']/.exec(text)?.[1];
    const to = /to=["']([^"']+)["']/.exec(text)?.[1];

    if (from && to) {
      redirects.push({
        from,
        to,
        file: normalizePath(relative(process.cwd(), file)),
      });
    }
  }

  return redirects.sort((left, right) => left.from.localeCompare(right.from));
}

async function listHtmlFiles(root: string): Promise<string[]> {
  const entries = await readdir(root, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const path = join(root, entry.name);

    if (entry.isDirectory()) {
      files.push(...await listHtmlFiles(path));
    } else if (entry.isFile() && extname(path) === '.html') {
      files.push(path);
    }
  }

  return files;
}

async function listAstroFiles(root: string): Promise<string[]> {
  const entries = await readdir(root, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const path = join(root, entry.name);

    if (entry.isDirectory()) {
      files.push(...await listAstroFiles(path));
    } else if (entry.isFile() && extname(path) === '.astro') {
      files.push(path);
    }
  }

  return files;
}

function routePathForHtml(file: string): string {
  const relativePath = normalizePath(relative(distDir, file));

  if (relativePath === '404.html') {
    return '/404';
  }

  if (relativePath === 'index.html') {
    return '/';
  }

  if (relativePath.endsWith('/index.html')) {
    return `/${relativePath.slice(0, -'index.html'.length)}`;
  }

  return `/${relativePath.replace(/\.html$/, '')}`;
}

function normalizePath(path: string): string {
  return path.split(sep).join('/');
}
