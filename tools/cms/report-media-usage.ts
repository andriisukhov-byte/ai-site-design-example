import {
  argString,
  currentBuildRevision,
  currentSourceEraId,
  parseArgs,
  writeJson,
} from '../migrate/source-utils';
import { loadMediaUsage } from './media-usage';

const args = parseArgs();
const outPath = argString(args, 'out', 'data/cms/media-usage-report.json')!;
const usage = await loadMediaUsage({
  handoffPath: argString(args, 'handoff', 'data/cms/media-handoff.json'),
  manifestPath: argString(args, 'manifest', 'data/source/attachment-media.json'),
  runtimeContentPath: argString(args, 'runtime-content', 'data/cms/pages.json'),
  sourceContentPath: argString(args, 'source-content', 'data/source/cms-pages.json'),
});

const assets = usage.selectedRecords
  .map((record) => {
    const usages = usage.usageByPublicPath.get(record.publicPath) ?? [];

    return {
      sourceId: record.id,
      title: record.title,
      alt: record.alt,
      description: record.description,
      publicPath: record.publicPath,
      storageKey: record.storageKey,
      usageCount: usages.length,
      usages,
    };
  })
  .sort((left, right) => left.publicPath.localeCompare(right.publicPath));
const pathsOutsideManifest = usage.handoffPathsOutsideManifest
  .map((publicPath) => {
    const usages = usage.usageByPublicPath.get(publicPath) ?? [];

    return {
      publicPath,
      usageCount: usages.length,
      usages,
    };
  })
  .sort((left, right) => left.publicPath.localeCompare(right.publicPath));
const assetsWithoutUsageEvidence = assets
  .filter((asset) => asset.usageCount === 0)
  .map((asset) => ({ sourceId: asset.sourceId, publicPath: asset.publicPath }));
const pathsOutsideManifestWithoutUsageEvidence = pathsOutsideManifest
  .filter((asset) => asset.usageCount === 0)
  .map((asset) => asset.publicPath);
const referenceCounts = [...usage.usageByPublicPath.values()]
  .flat()
  .reduce<Record<string, number>>((counts, reference) => {
    counts[reference.source] = (counts[reference.source] ?? 0) + 1;
    return counts;
  }, {});
const report = {
  ok: assetsWithoutUsageEvidence.length === 0 && pathsOutsideManifestWithoutUsageEvidence.length === 0,
  provenance: {
    sourceEraId: currentSourceEraId,
    buildRevision: currentBuildRevision(),
  },
  generatedAt: new Date().toISOString(),
  policy: 'Only media referenced by the current source/runtime CMS exports or runtime handoff is retained.',
  counts: {
    manifestRecords: usage.manifestRecords.length,
    selectedManifestRecords: usage.selectedRecords.length,
    unusedManifestRecords: usage.manifestRecords.length - usage.selectedRecords.length,
    usedPublicPaths: usage.usedPublicPaths.size,
    handoffPaths: usage.handoffPaths.size,
    handoffPathsOutsideManifest: usage.handoffPathsOutsideManifest.length,
    assetsWithoutUsageEvidence: assetsWithoutUsageEvidence.length,
    pathsOutsideManifestWithoutUsageEvidence: pathsOutsideManifestWithoutUsageEvidence.length,
    referencesBySource: referenceCounts,
  },
  assetsWithoutUsageEvidence,
  pathsOutsideManifestWithoutUsageEvidence,
  assets,
  pathsOutsideManifest,
};

await writeJson(outPath, report);
console.log(JSON.stringify({
  ok: report.ok,
  out: outPath,
  ...report.counts,
}, null, 2));

if (!report.ok) {
  process.exit(1);
}
