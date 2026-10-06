import { readdir, readFile, writeFile } from 'node:fs/promises';
import { extname, join, relative, sep } from 'node:path';

import { argString, currentBuildRevision, currentSourceEraId, parseArgs, pathExists } from '../migrate/source-utils';

type AttachmentRecord = {
  id: number;
  file: string;
  publicPath: string;
  storageKey: string;
};

type AttachmentManifest = {
  copySummary?: {
    missing?: Array<{ id: number; file: string }>;
  };
  records?: AttachmentRecord[];
};

type Finding = {
  publicPath: string;
  storageKey?: string;
  attachmentId?: number;
  sourceFile?: string;
  manifestStatus: 'missing-original' | 'recorded' | 'not-in-manifest';
  localCandidates?: LocalCandidate[];
  routeCount: number;
  routes: string[];
};

type LocalCandidate = {
  publicPath: string;
  score: number;
};

const args = parseArgs();
const distDir = argString(args, 'dist', 'apps/web/dist')!;
const publicDir = argString(args, 'public-dir', 'apps/web/public')!;
const manifestPath = argString(args, 'manifest', 'data/source/attachment-media.json')!;
const out = argString(args, 'out');
const sampleLimit = Number(argString(args, 'sample-limit', '40'));
const verbose = args.verbose === true;

const manifest = JSON.parse(await readFile(manifestPath, 'utf8')) as AttachmentManifest;
const recordByPublicPath = new Map((manifest.records ?? []).map((record) => [record.publicPath, record]));
const missingFiles = new Set((manifest.copySummary?.missing ?? []).map((item) => item.file));
const files = await listFiles(distDir);
const htmlFiles = files.filter((file) => extname(file) === '.html');
const localImportedAssets = await listLocalImportedAssets();
const routesByPublicPath = new Map<string, Set<string>>();

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const route = routePathForHtml(file);

  for (const reference of extractReferences(html)) {
    const publicPath = normalizeImportedAssetPath(reference);

    if (!publicPath) {
      continue;
    }

    const diskPath = join(publicDir, publicPath.replace(/^\/+/, ''));

    if (await pathExists(diskPath)) {
      continue;
    }

    if (!routesByPublicPath.has(publicPath)) {
      routesByPublicPath.set(publicPath, new Set());
    }

    routesByPublicPath.get(publicPath)!.add(route);
  }
}

const findings: Finding[] = [...routesByPublicPath.entries()]
  .map(([publicPath, routes]) => {
    const record = recordByPublicPath.get(publicPath);
    const sourceFile = record?.file ?? publicPath.replace(/^\/media\//, '');
    const manifestStatus = record
      ? missingFiles.has(record.file) ? 'missing-original' : 'recorded'
      : 'not-in-manifest';

    return {
      publicPath,
      storageKey: record?.storageKey,
      attachmentId: record?.id,
      sourceFile,
      manifestStatus,
      localCandidates: findLocalCandidates(publicPath, localImportedAssets),
      routeCount: routes.size,
      routes: [...routes].sort(),
    };
  })
  .sort((left, right) => right.routeCount - left.routeCount || left.publicPath.localeCompare(right.publicPath));

const result = {
  ok: findings.length === 0,
  provenance: {
    sourceEraId: currentSourceEraId,
    buildRevision: currentBuildRevision(),
  },
  distDir,
  publicDir,
  manifestPath,
  htmlFiles: htmlFiles.length,
  missingImportedAssets: findings.length,
  affectedRoutes: new Set(findings.flatMap((finding) => finding.routes)).size,
  byManifestStatus: summarizeByStatus(findings),
  findingsWithLocalCandidates: findings.filter((finding) => finding.localCandidates && finding.localCandidates.length > 0).length,
  topMissingAssets: findings.slice(0, 30).map(({ publicPath, routeCount, manifestStatus }) => ({ publicPath, routeCount, manifestStatus })),
  findings: verbose ? findings : findings.slice(0, sampleLimit),
  truncatedFindings: verbose ? 0 : Math.max(0, findings.length - sampleLimit),
};

if (out) {
  await writeFile(out, `${JSON.stringify(result, null, 2)}\n`);
}

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

function normalizeImportedAssetPath(reference: string): string | undefined {
  const trimmed = reference.trim();

  if (!trimmed || /^(?:https?:)?\/\//i.test(trimmed) || /^(?:mailto|tel|sms|data|blob):/i.test(trimmed)) {
    return undefined;
  }

  try {
    const url = new URL(trimmed, 'https://local.test/');
    const path = decodeURI(url.pathname);

    return path.startsWith('/media/') ? path : undefined;
  } catch {
    return undefined;
  }
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

function toWebPath(path: string): string {
  return path.split(sep).join('/');
}

function summarizeByStatus(findings: Finding[]): Record<Finding['manifestStatus'], number> {
  return findings.reduce<Record<Finding['manifestStatus'], number>>((summary, finding) => {
    summary[finding.manifestStatus] += 1;
    return summary;
  }, {
    'missing-original': 0,
    recorded: 0,
    'not-in-manifest': 0,
  });
}

async function listLocalImportedAssets(): Promise<string[]> {
  const importedDir = join(publicDir, 'media');

  if (!(await pathExists(importedDir))) {
    return [];
  }

  return (await listFiles(importedDir))
    .map((file) => `/${toWebPath(relative(publicDir, file))}`)
    .sort();
}

function findLocalCandidates(publicPath: string, candidates: string[]): LocalCandidate[] {
  const missingTokens = mediaNameTokens(publicPath);

  if (missingTokens.length === 0) {
    return [];
  }

  return candidates
    .filter((candidate) => candidate !== publicPath)
    .map((candidate) => {
      const candidateTokens = mediaNameTokens(candidate);
      const shared = candidateTokens.filter((token) => missingTokens.includes(token));
      const score = shared.length / Math.max(missingTokens.length, 1);

      return { publicPath: candidate, score: Number(score.toFixed(3)) };
    })
    .filter((candidate) => candidate.score >= 0.75)
    .sort((left, right) => right.score - left.score || left.publicPath.localeCompare(right.publicPath))
    .slice(0, 5);
}

function mediaNameTokens(publicPath: string): string[] {
  const name = publicPath.split('/').pop()?.replace(/\.[^.]+$/, '') ?? '';
  const stopWords = new Set([
    'ai',
    'banner',
    'brandlogos',
    'icon',
    'image',
    'img',
    'jpg',
    'jpeg',
    'logo',
    'net',
    'picture',
    'png',
    'pos',
    'regular',
    'scaled',
    'svg',
    'the',
    'wordmark',
  ]);

  return [...new Set(name
    .toLowerCase()
    .replace(/\b\d+x\d+\b/g, ' ')
    .replace(/\b\d+x\b/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter((token) => token.length > 1
      && !/^\d+$/.test(token)
      && !/^(?=.*\d)[a-f0-9]{12,}$/i.test(token)
      && !stopWords.has(token)))];
}
