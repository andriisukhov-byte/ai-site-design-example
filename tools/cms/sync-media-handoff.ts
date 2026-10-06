import { copyFile, mkdir, readFile, stat } from 'node:fs/promises';
import { dirname, isAbsolute, join, relative, resolve } from 'node:path';

import {
  argString,
  currentBuildRevision,
  currentSourceEraId,
  parseArgs,
  pathExists,
  writeJson,
} from '../migrate/source-utils';

type MediaHandoffAsset = {
  publicPath: string;
  storageKey: string;
  sizeBytes?: number;
  attachmentId?: number;
  manifestStatus?: 'recorded' | 'missing-original' | 'not-in-manifest';
};

type MediaHandoffReport = {
  ok?: boolean;
  generatedAt?: string;
  publicDir?: string;
  requiredImportedAssets?: number;
  presentLocalAssets?: number;
  missingLocalAssets?: number;
  totalBytes?: number;
  assets?: MediaHandoffAsset[];
};

type SyncItem = {
  publicPath: string;
  storageKey: string;
  sourcePath: string;
  targetPath: string;
  sizeBytes?: number;
  status: 'planned' | 'copied' | 'missing-source' | 'size-mismatch' | 'unsafe-target';
  attachmentId?: number;
  manifestStatus?: MediaHandoffAsset['manifestStatus'];
};

const args = parseArgs();
const handoffPath = argString(args, 'handoff', 'data/cms/media-handoff.json')!;
const sourcePublicDir = argString(args, 'source-public-dir', 'apps/web/public')!;
const targetPublicDir = argString(args, 'target-public-dir', '.tmp/media-handoff/public')!;
const outPath = argString(args, 'out', 'data/cms/media-sync-report.json')!;
const write = args.write === true || args.write === 'true';
const verbose = args.verbose === true || args.verbose === 'true';

const handoff = JSON.parse(await readFile(handoffPath, 'utf8')) as MediaHandoffReport;
const assets = handoff.assets ?? [];
const items: SyncItem[] = [];
const sourceRoot = resolve(sourcePublicDir);
const targetRoot = resolve(targetPublicDir);

for (const asset of assets) {
  const relativePublicPath = asset.publicPath.replace(/^\/+/, '');
  const sourcePath = resolve(join(sourceRoot, relativePublicPath));
  const targetPath = resolve(join(targetRoot, relativePublicPath));
  const baseItem = {
    publicPath: asset.publicPath,
    storageKey: asset.storageKey,
    sourcePath: reportPath(sourcePath),
    targetPath: reportPath(targetPath),
    sizeBytes: asset.sizeBytes,
    attachmentId: asset.attachmentId,
    manifestStatus: asset.manifestStatus,
  };

  if (!isInside(targetRoot, targetPath)) {
    items.push({ ...baseItem, status: 'unsafe-target' });
    continue;
  }

  if (!(await pathExists(sourcePath))) {
    items.push({ ...baseItem, status: 'missing-source' });
    continue;
  }

  const sourceStat = await stat(sourcePath);
  if (typeof asset.sizeBytes === 'number' && sourceStat.size !== asset.sizeBytes) {
    items.push({ ...baseItem, status: 'size-mismatch', sizeBytes: sourceStat.size });
    continue;
  }

  if (write) {
    await mkdir(dirname(targetPath), { recursive: true });
    await copyFile(sourcePath, targetPath);
    items.push({ ...baseItem, status: 'copied', sizeBytes: sourceStat.size });
  } else {
    items.push({ ...baseItem, status: 'planned', sizeBytes: sourceStat.size });
  }
}

const statusCounts = items.reduce<Record<string, number>>((counts, item) => {
  counts[item.status] = (counts[item.status] ?? 0) + 1;
  return counts;
}, {});
const blockerCount = (statusCounts['missing-source'] ?? 0)
  + (statusCounts['size-mismatch'] ?? 0)
  + (statusCounts['unsafe-target'] ?? 0);
const totalBytes = items
  .filter((item) => item.status === 'planned' || item.status === 'copied')
  .reduce((sum, item) => sum + (item.sizeBytes ?? 0), 0);

const report = {
  ok: Boolean(handoff.ok) && blockerCount === 0 && assets.length === (handoff.requiredImportedAssets ?? assets.length),
  provenance: {
    sourceEraId: currentSourceEraId,
    buildRevision: currentBuildRevision(),
  },
  generatedAt: new Date().toISOString(),
  mode: write ? 'write' : 'dry-run',
  handoffPath,
  handoffGeneratedAt: handoff.generatedAt,
  sourcePublicDir,
  targetPublicDir,
  requiredImportedAssets: handoff.requiredImportedAssets ?? assets.length,
  handoffPresentLocalAssets: handoff.presentLocalAssets,
  handoffMissingLocalAssets: handoff.missingLocalAssets,
  itemCount: items.length,
  copiedAssets: statusCounts.copied ?? 0,
  plannedAssets: statusCounts.planned ?? 0,
  missingSourceAssets: statusCounts['missing-source'] ?? 0,
  sizeMismatchAssets: statusCounts['size-mismatch'] ?? 0,
  unsafeTargetAssets: statusCounts['unsafe-target'] ?? 0,
  totalBytes,
  totalMegabytes: Number((totalBytes / 1024 / 1024).toFixed(2)),
  statusCounts,
  policy: 'Dry-run validates the ignored local media cache against data/cms/media-handoff.json. Write mode copies the exact publicPath tree to targetPublicDir for staging/self-hosted sync without committing imported binaries.',
  sampleItems: items.slice(0, 5),
  problemItems: items.filter((item) => !['planned', 'copied'].includes(item.status)),
  items: verbose ? items : undefined,
};

await writeJson(outPath, report);
console.log(JSON.stringify({
  ok: report.ok,
  mode: report.mode,
  out: outPath,
  handoffPath,
  sourcePublicDir,
  targetPublicDir,
  itemCount: report.itemCount,
  copiedAssets: report.copiedAssets,
  plannedAssets: report.plannedAssets,
  missingSourceAssets: report.missingSourceAssets,
  sizeMismatchAssets: report.sizeMismatchAssets,
  unsafeTargetAssets: report.unsafeTargetAssets,
  totalMegabytes: report.totalMegabytes,
}, null, 2));

if (!report.ok) {
  process.exit(1);
}

function isInside(root: string, candidate: string): boolean {
  const rel = relative(root, candidate);
  return rel === '' || (!rel.startsWith('..') && !isAbsolute(rel));
}

function normalizePath(path: string): string {
  return path.replace(/\\/g, '/');
}

function reportPath(path: string): string {
  const rel = relative(process.cwd(), path);
  return isInside(process.cwd(), path) ? normalizePath(rel) : normalizePath(path);
}
