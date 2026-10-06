import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

import { isSignupHref, signupUrlForPath } from '@acme/config';

type Finding = {
  path: string;
  href: string;
  expected: string;
};

const distDir = 'apps/web/dist';
const htmlFiles = await findHtmlFiles(distDir);
const findings: Finding[] = [];
let signupLinks = 0;

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const route = routeForHtml(file);
  const expected = signupUrlForPath(route);

  for (const match of html.matchAll(/<a\b[^>]*\bhref=(["'])(.*?)\1[^>]*>/gi)) {
    const href = decodeHtmlAttribute(match[2]);
    if (!isSignupHref(href)) continue;

    signupLinks += 1;
    if (href !== expected) {
      findings.push({ path: route, href, expected });
    }
  }
}

console.log(JSON.stringify({
  ok: findings.length === 0,
  distDir,
  checkedHtmlFiles: htmlFiles.length,
  signupLinks,
  findingCount: findings.length,
  findings: findings.slice(0, 100),
  truncated: findings.length > 100,
}, null, 2));

if (findings.length > 0) {
  process.exit(1);
}

async function findHtmlFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? findHtmlFiles(entryPath) : entry.name.endsWith('.html') ? [entryPath] : [];
  }));

  return files.flat().sort();
}

function routeForHtml(file: string): string {
  const relative = path.relative(distDir, file).split(path.sep).join('/');

  if (relative === 'index.html') return '/';
  if (relative.endsWith('/index.html')) return `/${relative.slice(0, -'index.html'.length)}`;

  return `/${relative.replace(/\.html$/, '')}/`;
}

function decodeHtmlAttribute(value: string): string {
  return value.replace(/&amp;/g, '&');
}
