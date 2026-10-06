import { existsSync } from 'node:fs';
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

type Finding = {
  file: string;
  line: number;
  column: number;
  match: string;
  reason: string;
};

const rootDir = process.cwd();
const distDir = path.resolve(rootDir, 'apps/web/dist');

const scannedExtensions = new Set([
  '.css',
  '.html',
  '.js',
  '.json',
  '.mjs',
  '.svg',
  '.txt',
  '.xml',
]);

const forbiddenPatterns: Array<{ pattern: RegExp; reason: string }> = [
  {
    pattern:
      /https?:\/\/(?:www\.)?acme\.ai\/(?:wp-content\/(?:uploads|themes)\/|wp-includes\/)[^\s"'<>)]*/gi,
    reason: 'source-origin asset URL must be localized',
  },
  {
    pattern: /https?:\/\/dev\.acme\.com[^\s"'<>)]*/gi,
    reason: 'dev source URL must not ship in static output',
  },
  {
    pattern: /https?:\/\/code\.jquery\.com[^\s"'<>)]*/gi,
    reason: 'third-party runtime hotlink is forbidden',
  },
  {
    pattern: /https?:\/\/cdn\.jsdelivr\.net[^\s"'<>)]*/gi,
    reason: 'third-party runtime hotlink is forbidden',
  },
  {
    pattern: /(?<![A-Za-z0-9.:/])\/wp-content\/uploads\//gi,
    reason: 'WordPress upload path must be rewritten to local assets',
  },
];

async function collectFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const absolutePath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        return collectFiles(absolutePath);
      }

      if (!entry.isFile()) {
        return [];
      }

      return scannedExtensions.has(path.extname(entry.name).toLowerCase()) ? [absolutePath] : [];
    }),
  );

  return files.flat();
}

function positionFor(content: string, index: number) {
  const before = content.slice(0, index);
  const lines = before.split(/\r?\n/);
  return {
    line: lines.length,
    column: (lines.at(-1)?.length ?? 0) + 1,
  };
}

async function scanFile(filePath: string): Promise<Finding[]> {
  const content = await readFile(filePath, 'utf8');
  const relativePath = path.relative(rootDir, filePath).replaceAll(path.sep, '/');
  const findings: Finding[] = [];

  for (const { pattern, reason } of forbiddenPatterns) {
    pattern.lastIndex = 0;

    for (const match of content.matchAll(pattern)) {
      if (match.index === undefined) {
        continue;
      }

      const position = positionFor(content, match.index);
      findings.push({
        file: relativePath,
        line: position.line,
        column: position.column,
        match: match[0],
        reason,
      });
    }
  }

  return findings;
}

if (!existsSync(distDir) || !(await stat(distDir)).isDirectory()) {
  console.error(
    JSON.stringify(
      {
        ok: false,
        error: 'Missing apps/web/dist. Run `npm --workspace @acme/web run build` before qa:no-hotlinks.',
      },
      null,
      2,
    ),
  );
  process.exit(1);
}

const files = await collectFiles(distDir);
const findings = (await Promise.all(files.map(scanFile))).flat();

const result = {
  ok: findings.length === 0,
  distDir: path.relative(rootDir, distDir).replaceAll(path.sep, '/'),
  scannedFiles: files.length,
  forbiddenPatterns: forbiddenPatterns.map(({ reason }) => reason),
  findings,
};

console.log(JSON.stringify(result, null, 2));

if (findings.length > 0) {
  process.exit(1);
}
