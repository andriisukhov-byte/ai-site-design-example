import { copyFile, mkdir, readdir, readFile } from 'node:fs/promises';
import { basename, dirname, extname, join, relative, sep } from 'node:path';

import { argString, parseArgs, pathExists, writeJson } from './source-utils';

type MediaReport = {
  findings?: Array<{
    publicPath: string;
    sourceFile?: string;
    routes?: string[];
  }>;
};

type IndexedFile = {
  absolutePath: string;
  relativePath: string;
  basename: string;
};

type RecoveryItem = {
  publicPath: string;
  sourceFile: string;
  targetPath: string;
  matchType: 'path-suffix' | 'basename-only' | 'none';
  sourcePath?: string;
  candidateCount: number;
  routes: string[];
  copied: boolean;
};

const args = parseArgs();
const reportPath = argString(args, 'report', 'data/source/media-availability-report.json')!;
const publicDir = argString(args, 'public-dir', 'apps/web/public')!;
const repoRoot = argString(args, 'root', '.')!;
const out = argString(args, 'out', 'data/source/media-recovery-report.json')!;
const write = args.write === true || args.write === 'true';
const allowBasename = args['allow-basename'] === true || args['allow-basename'] === 'true';

const report = JSON.parse(await readFile(reportPath, 'utf8')) as MediaReport;
const findings = report.findings ?? [];
const files = await listFiles(repoRoot);
const indexed = files.map((absolutePath): IndexedFile => ({
  absolutePath,
  relativePath: toWebPath(relative(repoRoot, absolutePath)),
  basename: basename(absolutePath).toLowerCase(),
}));

const recoveryItems: RecoveryItem[] = [];

for (const finding of findings) {
  const sourceFile = normalizeSourceFile(finding.sourceFile ?? finding.publicPath.replace(/^\/media\//, ''));
  const targetPath = join(publicDir, 'media', sourceFile);

  if (await pathExists(targetPath)) {
    continue;
  }

  const suffixMatches = indexed.filter((file) => file.relativePath.toLowerCase().endsWith(sourceFile.toLowerCase()));
  const basenameMatches = suffixMatches.length > 0
    ? []
    : indexed.filter((file) => file.basename === basename(sourceFile).toLowerCase());
  const selected = suffixMatches[0] ?? (allowBasename ? basenameMatches[0] : undefined);
  const matchType = suffixMatches.length > 0 ? 'path-suffix' : basenameMatches.length > 0 ? 'basename-only' : 'none';
  let copied = false;

  if (write && selected && (matchType === 'path-suffix' || allowBasename)) {
    await mkdir(dirname(targetPath), { recursive: true });
    await copyFile(selected.absolutePath, targetPath);
    copied = true;
  }

  recoveryItems.push({
    publicPath: finding.publicPath,
    sourceFile,
    targetPath: toWebPath(targetPath),
    matchType,
    sourcePath: selected ? toWebPath(selected.absolutePath) : undefined,
    candidateCount: suffixMatches.length || basenameMatches.length,
    routes: finding.routes ?? [],
    copied,
  });
}

const result = {
  ok: write ? recoveryItems.every((item) => item.copied) : true,
  write,
  allowBasename,
  reportPath,
  publicDir,
  scannedFiles: indexed.length,
  missingItems: recoveryItems.length,
  pathSuffixMatches: recoveryItems.filter((item) => item.matchType === 'path-suffix').length,
  basenameOnlyMatches: recoveryItems.filter((item) => item.matchType === 'basename-only').length,
  copied: recoveryItems.filter((item) => item.copied).length,
  unresolved: recoveryItems.filter((item) => !item.copied).length,
  items: recoveryItems,
};

await writeJson(out, result);
console.log(JSON.stringify(result, null, 2));

function normalizeSourceFile(value: string): string {
  return value.replace(/\\/g, '/').replace(/^\/+/, '').replace(/^media\//, '');
}

async function listFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const results: string[] = [];

  for (const entry of entries) {
    const path = join(dir, entry.name);
    const relativePath = toWebPath(relative(repoRoot, path));

    if (shouldSkip(relativePath, entry.name)) {
      continue;
    }

    if (entry.isDirectory()) {
      results.push(...await listFiles(path));
      continue;
    }

    if (entry.isFile() && isMediaFile(path)) {
      results.push(path);
    }
  }

  return results;
}

function shouldSkip(relativePath: string, name: string): boolean {
  return name === '.git'
    || name === 'node_modules'
    || relativePath === 'apps/web/dist'
    || relativePath.startsWith('apps/web/dist/');
}

function isMediaFile(path: string): boolean {
  return new Set([
    '.avif',
    '.gif',
    '.jpeg',
    '.jpg',
    '.png',
    '.svg',
    '.webp',
  ]).has(extname(path).toLowerCase());
}

function toWebPath(path: string): string {
  return path.split(sep).join('/');
}
