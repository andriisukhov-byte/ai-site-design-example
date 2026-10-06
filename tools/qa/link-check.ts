import { readdir, readFile } from 'node:fs/promises';
import { extname, join, relative, sep } from 'node:path';

import { argString, parseArgs } from '../migrate/source-utils';

type Finding = {
  file: string;
  code: string;
  reference: string;
  message: string;
};

const args = parseArgs();
const distDir = argString(args, 'dist', 'apps/web/dist')!;
const sampleLimit = Number(argString(args, 'sample-limit', '40'));
const verbose = args.verbose === true;
const findings: Finding[] = [];
const files = await listFiles(distDir);
const fileSet = new Set(files.map((file) => toWebPath(relative(distDir, file))));
const htmlFiles = files.filter((file) => extname(file) === '.html');

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const pagePath = routePathForHtml(file);
  const references = extractReferences(html);

  for (const reference of references) {
    const resolved = resolveReference(reference, pagePath);

    if (!resolved || resolved.external || resolved.hashOnly) {
      continue;
    }

    if (!referenceExists(resolved.path, fileSet)) {
      const isAssetReference = Boolean(extname(resolved.path));

      findings.push({
        file: toWebPath(relative(distDir, file)),
        code: isAssetReference ? 'missing-asset-reference' : 'missing-route-reference',
        reference,
        message: `Resolved ${resolved.path}, but no matching built page or asset exists.`,
      });
    }
  }
}

const result = {
  ok: findings.length === 0,
  distDir,
  htmlFiles: htmlFiles.length,
  checkedFiles: files.length,
  findingCount: findings.length,
  findingsByCode: summarizeByCode(findings),
  topReferences: summarizeReferences(findings).slice(0, 30),
  findings: verbose ? findings : findings.slice(0, sampleLimit),
  truncatedFindings: verbose ? 0 : Math.max(0, findings.length - sampleLimit),
};

console.log(JSON.stringify(result, null, 2));

if (findings.length > 0) {
  process.exit(1);
}

async function listFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const results: string[] = [];

  for (const entry of entries) {
    const path = join(dir, entry.name);

    if (entry.isDirectory()) {
      results.push(...await listFiles(path));
      continue;
    }

    if (entry.isFile()) {
      results.push(path);
    }
  }

  return results;
}

function extractReferences(html: string): string[] {
  const references = new Set<string>();
  const attributePattern = /\b(?:href|src|poster)\s*=\s*(["'])(.*?)\1/gi;
  const srcsetPattern = /\bsrcset\s*=\s*(["'])(.*?)\1/gi;

  for (const match of html.matchAll(attributePattern)) {
    references.add(match[2]);
  }

  for (const match of html.matchAll(srcsetPattern)) {
    for (const candidate of match[2].split(',')) {
      const [url] = candidate.trim().split(/\s+/);

      if (url) {
        references.add(url);
      }
    }
  }

  return [...references];
}

function resolveReference(reference: string, pagePath: string) {
  const trimmed = reference.trim();

  if (!trimmed || trimmed.startsWith('#')) {
    return { hashOnly: true };
  }

  if (/^(?:https?:)?\/\//i.test(trimmed) || /^(?:mailto|tel|sms|data|blob):/i.test(trimmed)) {
    return { external: true };
  }

  try {
    const url = new URL(trimmed, `https://local.test${pagePath}`);
    return {
      path: normalizePath(url.pathname),
    };
  } catch {
    return undefined;
  }
}

function referenceExists(path: string, fileSet: Set<string>): boolean {
  if (path === '/') {
    return fileSet.has('index.html');
  }

  const withoutLeadingSlash = path.replace(/^\/+/, '');

  if (path.endsWith('/')) {
    return fileSet.has(`${withoutLeadingSlash}index.html`);
  }

  if (fileSet.has(withoutLeadingSlash)) {
    return true;
  }

  if (extname(path)) {
    return false;
  }

  return fileSet.has(`${withoutLeadingSlash}/index.html`) || fileSet.has(`${withoutLeadingSlash}.html`);
}

function routePathForHtml(file: string): string {
  const relativePath = toWebPath(relative(distDir, file));

  if (relativePath === 'index.html') {
    return '/';
  }

  if (relativePath.endsWith('/index.html')) {
    return `/${relativePath.slice(0, -'index.html'.length)}`;
  }

  return `/${relativePath.replace(/\.html$/, '')}`;
}

function normalizePath(path: string): string {
  const decoded = decodeURI(path);
  return decoded.endsWith('/') || extname(decoded) ? decoded : `${decoded}/`;
}

function toWebPath(path: string): string {
  return path.split(sep).join('/');
}

function summarizeReferences(items: Finding[]): Array<{ reference: string; count: number }> {
  const counts = new Map<string, number>();

  for (const finding of items) {
    counts.set(finding.reference, (counts.get(finding.reference) ?? 0) + 1);
  }

  return [...counts.entries()]
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
    .map(([reference, count]) => ({ reference, count }));
}

function summarizeByCode(items: Finding[]): Record<string, number> {
  return items.reduce<Record<string, number>>((summary, finding) => {
    summary[finding.code] = (summary[finding.code] ?? 0) + 1;
    return summary;
  }, {});
}
