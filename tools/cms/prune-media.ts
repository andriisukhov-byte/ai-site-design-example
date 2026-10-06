import { readdir, rmdir, unlink } from 'node:fs/promises';
import path, { resolve } from 'node:path';

import { config as loadEnv } from 'dotenv';
import { getPayload } from 'payload';

import { argString, parseArgs, writeJson } from '../migrate/source-utils';
import { loadMediaUsage } from './media-usage';

type PruneCandidate = {
  id: number | string;
  sourceId: number;
  filename?: string | null;
  publicPath?: string | null;
};

const args = parseArgs();
const manifestPath = argString(args, 'manifest', 'data/source/attachment-media.json')!;
const handoffPath = argString(args, 'handoff', 'data/cms/media-handoff.json')!;
const runtimeContentPath = argString(args, 'runtime-content', 'data/cms/pages.json')!;
const sourceContentPath = argString(args, 'source-content', 'data/source/cms-pages.json')!;
const cacheDir = resolve(argString(args, 'cache-dir', 'apps/web/public/media')!);
const managedMediaDir = resolve(argString(args, 'managed-media-dir', 'apps/web/public/media')!);
const reportPath = argString(args, 'out', 'data/cms/media-prune-report.json')!;
const progressEvery = numberArg(args.progress, 100);
const shouldWrite = args.write === true || args.write === 'true';
const usage = await loadMediaUsage({
  handoffPath,
  manifestPath,
  runtimeContentPath,
  sourceContentPath,
});

loadCmsEnv();
const { default: payloadConfig } = await import('../../apps/cms/src/payload.config');
const payload = await getPayload({ config: payloadConfig });
const media = await payload.find({
  collection: 'media',
  pagination: false,
  limit: 10000,
  depth: 0,
  overrideAccess: true,
});
const importedMedia = media.docs.filter(
  (doc): doc is typeof doc & { sourceId: number } => typeof doc.sourceId === 'number',
);
const pruneCandidates: PruneCandidate[] = importedMedia
  .filter(
    (doc) => !usage.usedSourceIds.has(String(doc.sourceId))
      && !(typeof doc.publicPath === 'string' && usage.usedPublicPaths.has(doc.publicPath)),
  )
  .map((doc) => ({
    id: doc.id,
    sourceId: doc.sourceId,
    filename: doc.filename,
    publicPath: doc.publicPath,
  }));
const cacheFiles = await listFiles(cacheDir);
const unusedCacheFiles = cacheFiles.filter(
  (file) => !usage.usedPublicPaths.has(toImportedPublicPath(cacheDir, file)),
);
const before = {
  manifestRecords: usage.manifestRecords.length,
  selectedManifestRecords: usage.selectedRecords.length,
  payloadMediaRecords: media.docs.length,
  importedPayloadRecords: importedMedia.length,
  protectedNonImportedRecords: media.docs.length - importedMedia.length,
  prunePayloadRecords: pruneCandidates.length,
  cacheFiles: cacheFiles.length,
  keepCacheFiles: cacheFiles.length - unusedCacheFiles.length,
  pruneCacheFiles: unusedCacheFiles.length,
  handoffPaths: usage.handoffPaths.size,
  usedPublicPaths: usage.usedPublicPaths.size,
  handoffPathsOutsideManifest: usage.handoffPathsOutsideManifest.length,
};

if (!shouldWrite) {
  await destroyPayload(payload);
  const report = {
    ok: true,
    action: 'validated',
    ...before,
    pruneSourceIds: pruneCandidates.map((candidate) => candidate.sourceId),
    note: 'Dry-run only. Re-run with --write true to remove unused imported Payload records and cache files.',
  };
  await writeJson(reportPath, report);
  console.log(JSON.stringify({ ...report, pruneSourceIds: pruneCandidates.length, out: reportPath }, null, 2));
  process.exit(0);
}

let deletedPayloadRecords = 0;
let fallbackDeletedPayloadRecords = 0;
const failures: Array<{ target: string; error: string }> = [];

for (const [index, candidate] of pruneCandidates.entries()) {
  if (progressEvery > 0 && (index === 0 || (index + 1) % progressEvery === 0)) {
    console.error(`[${index + 1}/${pruneCandidates.length}] media sourceId=${candidate.sourceId}`);
  }

  try {
    await payload.delete({
      collection: 'media',
      id: candidate.id,
      overrideAccess: true,
    });
    deletedPayloadRecords += 1;
  } catch (error) {
    try {
      await payload.db.deleteOne({
        collection: 'media',
        where: {
          id: {
            equals: candidate.id,
          },
        },
      });

      if (candidate.filename) {
        const managedFile = path.resolve(managedMediaDir, candidate.filename);
        assertInside(managedMediaDir, managedFile);
        await unlinkIfPresent(managedFile);
      }

      deletedPayloadRecords += 1;
      fallbackDeletedPayloadRecords += 1;
    } catch (fallbackError) {
      failures.push({
        target: `media:${candidate.id}`,
        error: [
          error instanceof Error ? error.message : String(error),
          fallbackError instanceof Error ? fallbackError.message : String(fallbackError),
        ].join(' | fallback: '),
      });
    }
  }
}

let deletedCacheFiles = 0;

if (failures.length === 0) {
  for (const file of unusedCacheFiles) {
    try {
      assertInside(cacheDir, file);
      await unlink(file);
      deletedCacheFiles += 1;
    } catch (error) {
      failures.push({
        target: file,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  await removeEmptyDirectories(cacheDir);
}

const remainingMedia = await payload.count({ collection: 'media', overrideAccess: true });
await destroyPayload(payload);
const remainingCacheFiles = await listFiles(cacheDir);
const report = {
  ok: failures.length === 0
    && remainingMedia.totalDocs === before.payloadMediaRecords - deletedPayloadRecords
    && remainingCacheFiles.length === before.cacheFiles - deletedCacheFiles,
  action: 'pruned',
  ...before,
  deletedPayloadRecords,
  fallbackDeletedPayloadRecords,
  deletedCacheFiles,
  remainingPayloadRecords: remainingMedia.totalDocs,
  remainingCacheFiles: remainingCacheFiles.length,
  failures,
};

await writeJson(reportPath, report);
console.log(JSON.stringify({ ...report, failures: failures.length, out: reportPath }, null, 2));
process.exit(report.ok ? 0 : 1);

function loadCmsEnv(): void {
  loadEnv({ path: resolve('apps/cms/.env') });

  if (process.env.DATABASE_URL === 'file:./apps-cms.db') {
    process.env.DATABASE_URL = `file:${resolve('apps/cms/apps-cms.db').replace(/\\/g, '/')}`;
  }

  process.env.PAYLOAD_DB_PUSH ??= 'false';
  process.env.PAYLOAD_MCP_DISABLED ??= 'true';
  process.env.PAYLOAD_MIGRATING ??= 'true';
}

function numberArg(value: string | boolean | undefined, fallback: number): number {
  if (typeof value !== 'string') {
    return fallback;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

async function listFiles(root: string): Promise<string[]> {
  const files: string[] = [];
  const entries = await readdir(root, { withFileTypes: true });

  for (const entry of entries) {
    const target = path.join(root, entry.name);

    if (entry.isDirectory()) {
      files.push(...await listFiles(target));
    } else if (entry.isFile()) {
      files.push(target);
    }
  }

  return files;
}

function toImportedPublicPath(root: string, file: string): string {
  assertInside(root, file);
  return `/media/${path.relative(root, file).replace(/\\/g, '/')}`;
}

function assertInside(root: string, target: string): void {
  const relative = path.relative(root, target);

  if (!relative || relative.startsWith('..') || path.isAbsolute(relative)) {
    throw new Error(`Unsafe media-cache target: ${target}`);
  }
}

async function removeEmptyDirectories(root: string): Promise<void> {
  const entries = await readdir(root, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    const target = path.join(root, entry.name);
    assertInside(root, target);
    await removeEmptyDirectories(target);

    if ((await readdir(target)).length === 0) {
      await rmdir(target);
    }
  }
}

async function unlinkIfPresent(file: string): Promise<void> {
  try {
    await unlink(file);
  } catch (error) {
    if (!(error instanceof Error && 'code' in error && error.code === 'ENOENT')) {
      throw error;
    }
  }
}

async function destroyPayload(payloadInstance: unknown): Promise<void> {
  const maybeDestroy = payloadInstance && typeof payloadInstance === 'object'
    ? (payloadInstance as { destroy?: () => Promise<void> }).destroy
    : undefined;

  if (maybeDestroy) {
    await maybeDestroy();
  }
}
