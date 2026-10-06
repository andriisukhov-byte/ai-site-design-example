import { readdir, readFile, writeFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { dirname, join, relative } from 'node:path';
import { promisify } from 'node:util';

import { pageDocumentSchema, type PageDocument } from '@acme/blocks';

type CmsPagesExport = {
  generatedAt?: string;
  pages?: unknown[];
};

type MediaReport = {
  ok?: boolean;
  provenance?: {
    sourceEraId?: string;
    buildRevision?: string;
  };
  htmlFiles?: number;
  missingImportedAssets?: number;
  affectedRoutes?: number;
};

type HtmlStructureReport = {
  ok?: boolean;
  htmlFiles?: number;
  findingCount?: number;
};

type FormsReport = {
  ok?: boolean;
  htmlFiles?: number;
  formCount?: number;
  acmeFormCount?: number;
  findingCount?: number;
};

type FormApiReport = {
  ok?: boolean;
  endpointPath?: string;
  acceptedSamples?: number;
  rejectedSamples?: number;
  findingCount?: number;
};

type PayloadRoundtripReport = {
  ok?: boolean;
  sourceDocuments?: number;
  cmsDocuments?: number;
  sourcePaths?: number;
  cmsPaths?: number;
  sourceContentKeys?: number;
  cmsContentKeys?: number;
  sourceImportedImageDescriptors?: number;
  cmsImportedImageDescriptors?: number;
  sourceImportedImageIds?: number;
  cmsImportedImageIds?: number;
  findingCount?: number;
};

type PocLaunchSuiteReport = {
  ok?: boolean;
  gateCount?: number;
  passingGateCount?: number;
  failingGateCount?: number;
};

type RouteCoverageReport = {
  ok?: boolean;
  builtHtmlRoutes?: number;
  expectedBuiltRoutes?: number;
  publishedRoutes?: number;
  explicitRedirects?: number;
  missingPublishedRoutes?: number;
  missingRedirectRoutes?: number;
  builtDraftRoutes?: number;
  unownedBuiltRoutes?: number;
  blockerCount?: number;
  findingCount?: number;
};

type BlockRootAttrsReport = {
  ok?: boolean;
  htmlFiles?: number;
  routesWithRootAttrs?: number;
  rootAttrExpectations?: number;
  anchorsExpected?: number;
  classNamesExpected?: number;
  findingCount?: number;
};

type VisualSmokeReport = {
  ok?: boolean;
  mode?: string;
  routeCount?: number;
  findingCount?: number;
};

type MediaHandoffReport = {
  ok?: boolean;
  requiredImportedAssets?: number;
  presentLocalAssets?: number;
  missingLocalAssets?: number;
  manifestCoverageOk?: boolean;
  notInManifest?: number;
  totalBytes?: number;
  totalMegabytes?: number;
};

type MediaSyncReport = {
  ok?: boolean;
  mode?: string;
  itemCount?: number;
  copiedAssets?: number;
  plannedAssets?: number;
  missingSourceAssets?: number;
  sizeMismatchAssets?: number;
  unsafeTargetAssets?: number;
  totalBytes?: number;
  totalMegabytes?: number;
};

type AttachmentManifest = {
  generatedAt?: string;
  copySummary?: {
    copied?: number;
    missing?: unknown[];
  };
  records?: unknown[];
};

type Redirect = {
  from: string;
  to: string;
  file: string;
};

type ImageDescriptor = {
  id?: string;
  src: string;
};

const cmsPagesPath = argString('pages', 'data/cms/pages.json');
const mediaReportPath = argString('media-report', 'data/source/media-availability-report.json');
const mediaHandoffPath = argString('media-handoff', 'data/cms/media-handoff.json');
const mediaSyncPath = argString('media-sync-report', 'data/cms/media-sync-report.json');
const htmlReportPath = argString('html-report', 'data/source/html-structure-report.json');
const formsReportPath = argString('forms-report', 'data/source/forms-report.json');
const formApiReportPath = argString('form-api-report', 'data/source/form-api-report.json');
const payloadRoundtripPath = argString('payload-roundtrip-report', 'data/source/payload-roundtrip-report.json');
const pocSuiteReportPath = argString('poc-suite-report', 'data/source/poc-launch-suite-report.json');
const routeCoveragePath = argString('route-coverage-report', 'data/source/route-coverage-report.json');
const blockRootAttrsPath = argString('block-root-attrs-report', 'data/source/block-root-attrs-report.json');
const visualSmokePath = argString('visual-smoke-report', 'data/source/visual-smoke-report.json');
const attachmentManifestPath = argString('media-manifest', 'data/source/attachment-media.json');
const redirectsRoot = argString('redirects-root', 'apps/web/src/pages');
const distDir = argString('dist', 'apps/web/dist');
const outPath = argString('out', 'data/cms/snapshot.json');
const execFileAsync = promisify(execFile);

const cmsPages = JSON.parse(await readFile(cmsPagesPath, 'utf8')) as CmsPagesExport;
const mediaReport = await readOptionalJson<MediaReport>(mediaReportPath);
const mediaHandoff = await readOptionalJson<MediaHandoffReport>(mediaHandoffPath);
const mediaSyncReport = await readOptionalJson<MediaSyncReport>(mediaSyncPath);
const htmlReport = await readOptionalJson<HtmlStructureReport>(htmlReportPath);
const formsReport = await readOptionalJson<FormsReport>(formsReportPath);
const formApiReport = await readOptionalJson<FormApiReport>(formApiReportPath);
const payloadRoundtripReport = await readOptionalJson<PayloadRoundtripReport>(payloadRoundtripPath);
const pocSuiteReport = await readOptionalJson<PocLaunchSuiteReport>(pocSuiteReportPath);
const routeCoverageReport = await readOptionalJson<RouteCoverageReport>(routeCoveragePath);
const blockRootAttrsReport = await readOptionalJson<BlockRootAttrsReport>(blockRootAttrsPath);
const visualSmokeReport = await readOptionalJson<VisualSmokeReport>(visualSmokePath);
const attachmentManifest = await readOptionalJson<AttachmentManifest>(attachmentManifestPath);
const pages: PageDocument[] = [];
const findings: Array<{ code: string; message: string; path?: string; sample?: string }> = [];

for (const [index, candidate] of (cmsPages.pages ?? []).entries()) {
  const parsed = pageDocumentSchema.safeParse(candidate);

  if (parsed.success) {
    pages.push(parsed.data);
  } else {
    findings.push({
      code: 'schema-invalid',
      path: typeof candidate === 'object' && candidate && 'path' in candidate ? String(candidate.path) : undefined,
      message: parsed.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join('; '),
      sample: String(index),
    });
  }
}

const paths = new Set<string>();
const duplicatePaths = new Set<string>();

for (const page of pages) {
  if (paths.has(page.path)) {
    duplicatePaths.add(page.path);
  }

  paths.add(page.path);
}

for (const path of duplicatePaths) {
  findings.push({
    code: 'duplicate-path',
    path,
    message: 'Every routable document must have a unique path.',
  });
}

const redirects = await discoverLegacyRedirects(redirectsRoot);
const builtHtmlFiles = await countBuiltHtml(distDir);
const pagesByPath = new Map(pages.map((page) => [page.path, page]));
const redirectAudit = auditRedirects(redirects, pagesByPath);
const emptyPublishedRoutes = pages
  .filter((page) => page.status === 'published' && page.blocks.length === 0 && !['/blog/', '/guides/', '/news/'].includes(page.path))
  .map((page) => ({
    path: page.path,
    collection: page.collection,
    template: page.template,
    title: page.title,
  }));

const blockCounts = new Map<string, number>();
const collectionCounts = new Map<string, number>();
const templateCounts = new Map<string, number>();
let imageReferences = 0;
const imageDescriptors: ImageDescriptor[] = [];

for (const page of pages) {
  collectionCounts.set(page.collection, (collectionCounts.get(page.collection) ?? 0) + 1);
  templateCounts.set(page.template, (templateCounts.get(page.template) ?? 0) + 1);

  for (const block of page.blocks) {
    blockCounts.set(block.type, (blockCounts.get(block.type) ?? 0) + 1);
  }

  walk(page, (key, value) => {
    if (key === 'src' && typeof value === 'string' && value.startsWith('/assets/')) {
      imageReferences += 1;
    }
  });

  imageDescriptors.push(...collectImageDescriptors(page));
}

const importedImageDescriptors = imageDescriptors.filter((image) => image.src.startsWith('/media/'));
const imageDescriptorsMissingStableId = importedImageDescriptors.filter((image) => !image.id);
const uniqueImagePublicPaths = new Set(imageDescriptors.map((image) => image.src));
const uniqueImportedImagePublicPaths = new Set(importedImageDescriptors.map((image) => image.src));
const uniqueImportedRuntimePublicPaths = collectImportedRuntimePublicPaths(pages);
const pagesWithContentKey = pages.filter((page) => page.contentKey);
const uniqueContentKeys = new Set(pagesWithContentKey.map((page) => page.contentKey));

const launchGaps = [
  ...emptyPublishedRoutes.map((route) => ({
    severity: 'blocker' as const,
    code: 'empty-published-route',
    path: route.path,
    message: 'Published non-index route has no mapped blocks or rich text. Reacquire source content, add a product-approved template policy, or redirect/retire the route before launch.',
  })),
  ...redirectAudit.fromPublishedRoutes.map((redirect) => ({
    severity: 'blocker' as const,
    code: 'redirect-from-published-route',
    path: redirect.from,
    message: `Legacy redirect source ${redirect.from} conflicts with a published CMS document. Make the route canonical in CMS or retire the redirect.`,
  })),
  ...redirectAudit.missingInternalTargets.map((redirect) => ({
    severity: 'blocker' as const,
    code: 'redirect-target-missing',
    path: redirect.from,
    message: `Legacy redirect target ${redirect.to} is not a published CMS route or another explicit redirect source.`,
  })),
  ...redirectAudit.duplicateSources.map((from) => ({
    severity: 'blocker' as const,
    code: 'duplicate-redirect-source',
    path: from,
    message: `Multiple legacy redirects claim the same source route ${from}.`,
  })),
  ...((mediaReport?.ok ?? false) && (mediaReport?.missingImportedAssets ?? 0) === 0
    ? []
    : [{
        severity: 'blocker' as const,
        code: 'media-availability',
        message: 'Runtime media availability report is missing, stale, failed, or has unresolved imported assets.',
      }]),
  ...((mediaReport?.htmlFiles ?? 0) === builtHtmlFiles
    ? []
    : [{
        severity: 'blocker' as const,
        code: 'stale-media-report',
        message: `Media availability report covers ${mediaReport?.htmlFiles ?? 'unknown'} HTML files, but the current build has ${builtHtmlFiles}. Re-run qa:media after build.`,
      }]),
  ...((mediaHandoff?.ok ?? false) && (mediaHandoff?.missingLocalAssets ?? 0) === 0
    ? []
    : [{
        severity: 'blocker' as const,
        code: 'media-handoff',
        message: 'Media handoff report is missing, failed, or has missing local imported assets. Run cms:media-handoff after media recovery before staging or colleague handoff.',
      }]),
  ...((mediaHandoff?.requiredImportedAssets ?? -1) === uniqueImportedRuntimePublicPaths.size
    ? []
    : [{
        severity: 'blocker' as const,
        code: 'stale-media-handoff',
        message: `Media handoff report covers ${mediaHandoff?.requiredImportedAssets ?? 'unknown'} imported runtime assets, but the current CMS export references ${uniqueImportedRuntimePublicPaths.size}. Re-run cms:media-handoff after CMS export changes.`,
      }]),
  ...((mediaSyncReport?.ok ?? false) && (mediaSyncReport?.itemCount ?? -1) === uniqueImportedRuntimePublicPaths.size && (mediaSyncReport?.missingSourceAssets ?? -1) === 0 && (mediaSyncReport?.sizeMismatchAssets ?? -1) === 0 && (mediaSyncReport?.unsafeTargetAssets ?? -1) === 0
    ? []
    : [{
        severity: 'blocker' as const,
        code: 'media-sync-handoff',
        message: 'Media sync dry-run report is missing, failed, stale, or found source/size/target issues. Re-run cms:media-sync after cms:media-handoff before staging or colleague handoff.',
      }]),
  ...((htmlReport?.ok ?? false) && (htmlReport?.findingCount ?? 0) === 0
    ? []
    : [{
        severity: 'blocker' as const,
        code: 'html-structure',
        message: 'HTML structure report is missing, stale, failed, or has findings.',
      }]),
  ...((htmlReport?.htmlFiles ?? 0) === builtHtmlFiles
    ? []
    : [{
        severity: 'blocker' as const,
        code: 'stale-html-structure-report',
        message: `HTML structure report covers ${htmlReport?.htmlFiles ?? 'unknown'} HTML files, but the current build has ${builtHtmlFiles}. Re-run qa:html-structure after build.`,
      }]),
  ...((formsReport?.ok ?? false) && (formsReport?.findingCount ?? 0) === 0 && (formsReport?.acmeFormCount ?? 0) > 0
    ? []
    : [{
        severity: 'blocker' as const,
        code: 'forms-contract',
        message: 'Forms report is missing, stale, failed, has findings, or found zero first-party forms. Re-run qa:forms after build.',
      }]),
  ...((formsReport?.htmlFiles ?? 0) === builtHtmlFiles
    ? []
    : [{
        severity: 'blocker' as const,
        code: 'stale-forms-report',
        message: `Forms report covers ${formsReport?.htmlFiles ?? 'unknown'} HTML files, but the current build has ${builtHtmlFiles}. Re-run qa:forms after build.`,
      }]),
  ...((formApiReport?.ok ?? false) && (formApiReport?.findingCount ?? 0) === 0 && (formApiReport?.acceptedSamples ?? 0) > 0 && (formApiReport?.rejectedSamples ?? 0) > 0
    ? []
    : [{
        severity: 'blocker' as const,
        code: 'form-api-contract',
        message: 'Form API report is missing, failed, or does not prove accepted and rejected submission behavior. Re-run qa:form-api.',
      }]),
  ...((payloadRoundtripReport?.ok ?? false) && (payloadRoundtripReport?.findingCount ?? 0) === 0
    ? []
    : [{
        severity: 'blocker' as const,
        code: 'payload-roundtrip',
        message: 'Payload round-trip report is missing, failed, or has findings. Re-run qa:payload-roundtrip after Payload import/export changes.',
      }]),
  ...((payloadRoundtripReport?.cmsDocuments ?? -1) === pages.length && (payloadRoundtripReport?.cmsPaths ?? -1) === paths.size
    ? []
    : [{
        severity: 'blocker' as const,
        code: 'stale-payload-roundtrip',
        message: `Payload round-trip report covers ${payloadRoundtripReport?.cmsDocuments ?? 'unknown'} CMS documents and ${payloadRoundtripReport?.cmsPaths ?? 'unknown'} paths, but current runtime has ${pages.length} documents and ${paths.size} unique paths. Re-run qa:payload-roundtrip.`,
      }]),
  ...(pagesWithContentKey.length === pages.length && uniqueContentKeys.size === pages.length
    ? []
    : [{
        severity: 'blocker' as const,
        code: 'content-key-coverage',
        message: `Runtime CMS export has ${pagesWithContentKey.length}/${pages.length} pages with stable contentKey values and ${uniqueContentKeys.size} unique keys. Re-run migrate:source:export, Payload upsert/export, and qa:payload-roundtrip.`,
      }]),
  ...((payloadRoundtripReport?.cmsContentKeys ?? -1) === pages.length && (payloadRoundtripReport?.sourceContentKeys ?? -1) === pages.length
    ? []
    : [{
        severity: 'blocker' as const,
        code: 'stale-content-key-roundtrip',
        message: `Payload round-trip report covers ${payloadRoundtripReport?.cmsContentKeys ?? 'unknown'} CMS content keys and ${payloadRoundtripReport?.sourceContentKeys ?? 'unknown'} source content keys, but current runtime has ${pages.length} pages. Re-run qa:payload-roundtrip.`,
      }]),
  ...((pocSuiteReport?.ok ?? false) && (pocSuiteReport?.failingGateCount ?? -1) === 0 && (pocSuiteReport?.gateCount ?? 0) >= 20
    ? []
    : [{
        severity: 'blocker' as const,
        code: 'poc-launch-suite',
        message: 'POC launch suite report is missing, failed, stale, or incomplete. Re-run qa:poc-suite before cms:snapshot.',
      }]),
  ...((routeCoverageReport?.ok ?? false) && (routeCoverageReport?.blockerCount ?? 0) === 0
    ? []
    : [{
        severity: 'blocker' as const,
        code: 'route-coverage',
        message: 'Route coverage report is missing, failed, or has blockers. Re-run qa:route-coverage after build.',
      }]),
  ...((routeCoverageReport?.builtHtmlRoutes ?? 0) === builtHtmlFiles
    ? []
    : [{
        severity: 'blocker' as const,
        code: 'stale-route-coverage-report',
        message: `Route coverage report covers ${routeCoverageReport?.builtHtmlRoutes ?? 'unknown'} HTML routes, but the current build has ${builtHtmlFiles}. Re-run qa:route-coverage after build.`,
      }]),
  ...((blockRootAttrsReport?.ok ?? false) && (blockRootAttrsReport?.findingCount ?? 0) === 0
    ? []
    : [{
        severity: 'blocker' as const,
        code: 'block-root-attrs',
        message: 'Block root attribute report is missing, failed, or has findings. Re-run qa:block-root-attrs after build.',
      }]),
  ...((blockRootAttrsReport?.htmlFiles ?? 0) === builtHtmlFiles
    ? []
    : [{
        severity: 'blocker' as const,
        code: 'stale-block-root-attrs-report',
        message: `Block root attribute report covers ${blockRootAttrsReport?.htmlFiles ?? 'unknown'} HTML files, but the current build has ${builtHtmlFiles}. Re-run qa:block-root-attrs after build.`,
      }]),
  ...((visualSmokeReport?.ok ?? false) && (visualSmokeReport?.findingCount ?? 0) === 0 && (visualSmokeReport?.routeCount ?? 0) >= 8
    ? []
    : [{
        severity: 'blocker' as const,
        code: 'visual-smoke',
        message: 'Representative Playwright visual smoke report is missing, failed, or covers fewer than 8 POC routes. Run qa:visual-smoke against a local preview before cms:snapshot.',
      }]),
];
const buildRevision = await currentBuildRevision();

const snapshot = {
  generatedAt: new Date().toISOString(),
  source: {
    cmsPagesPath,
    cmsGeneratedAt: cmsPages.generatedAt,
    sourceEraId: mediaReport?.provenance?.sourceEraId ?? 'prod-sql-2026-07-23-23-14-51',
    buildRevision,
    reportBuildRevision: mediaReport?.provenance?.buildRevision,
  },
  ok: findings.length === 0,
  launchReady: findings.length === 0 && launchGaps.filter((gap) => gap.severity === 'blocker').length === 0,
  routes: {
    totalDocuments: pages.length,
    uniquePaths: paths.size,
    published: pages.filter((page) => page.status === 'published').length,
    drafts: pages.filter((page) => page.status === 'draft').length,
    contentKeys: pagesWithContentKey.length,
    uniqueContentKeys: uniqueContentKeys.size,
    emptyPublishedNonIndex: emptyPublishedRoutes.length,
    emptyPublishedSamples: emptyPublishedRoutes.slice(0, 20),
    byCollection: sortedObject(collectionCounts),
    byTemplate: sortedObject(templateCounts),
  },
  redirects: {
    count: redirects.length,
    items: redirects,
    audit: redirectAudit,
  },
  blocks: {
    total: pages.reduce((sum, page) => sum + page.blocks.length, 0),
    byType: sortedObject(blockCounts),
  },
  media: {
    attachmentRecords: attachmentManifest?.records?.length ?? 0,
    copiedLocalAssets: attachmentManifest?.copySummary?.copied ?? 0,
    missingAttachmentFiles: attachmentManifest?.copySummary?.missing?.length ?? 0,
    runtimeImageReferences: imageReferences,
    imageDescriptorReferences: imageDescriptors.length,
    importedImageDescriptorReferences: importedImageDescriptors.length,
    uniqueImagePublicPaths: uniqueImagePublicPaths.size,
    uniqueImportedImagePublicPaths: uniqueImportedImagePublicPaths.size,
    uniqueImportedRuntimePublicPaths: uniqueImportedRuntimePublicPaths.size,
    importedImageDescriptorsWithStableId: importedImageDescriptors.length - imageDescriptorsMissingStableId.length,
    importedImageDescriptorsMissingStableId: imageDescriptorsMissingStableId.length,
    availabilityOk: mediaReport?.ok ?? false,
    missingImportedAssets: mediaReport?.missingImportedAssets,
    affectedRoutes: mediaReport?.affectedRoutes,
    handoffReport: {
      path: mediaHandoffPath,
      ok: mediaHandoff?.ok ?? false,
      requiredImportedAssets: mediaHandoff?.requiredImportedAssets,
      presentLocalAssets: mediaHandoff?.presentLocalAssets,
      missingLocalAssets: mediaHandoff?.missingLocalAssets,
      manifestCoverageOk: mediaHandoff?.manifestCoverageOk,
      notInManifest: mediaHandoff?.notInManifest,
      totalBytes: mediaHandoff?.totalBytes,
      totalMegabytes: mediaHandoff?.totalMegabytes,
    },
    syncReport: {
      path: mediaSyncPath,
      ok: mediaSyncReport?.ok ?? false,
      mode: mediaSyncReport?.mode,
      itemCount: mediaSyncReport?.itemCount,
      copiedAssets: mediaSyncReport?.copiedAssets,
      plannedAssets: mediaSyncReport?.plannedAssets,
      missingSourceAssets: mediaSyncReport?.missingSourceAssets,
      sizeMismatchAssets: mediaSyncReport?.sizeMismatchAssets,
      unsafeTargetAssets: mediaSyncReport?.unsafeTargetAssets,
      totalBytes: mediaSyncReport?.totalBytes,
      totalMegabytes: mediaSyncReport?.totalMegabytes,
    },
  },
  supportingCollections: {
    configured: ['media', 'faq-items', 'testimonials'],
    note: 'Reusable supporting collections are configured in Payload; current Astro runtime receives resolved inline block data from data/cms/pages.json.',
  },
  qa: {
    builtHtmlFiles,
    mediaReport: {
      path: mediaReportPath,
      ok: mediaReport?.ok ?? false,
      htmlFiles: mediaReport?.htmlFiles,
    },
    htmlStructureReport: {
      path: htmlReportPath,
      ok: htmlReport?.ok ?? false,
      htmlFiles: htmlReport?.htmlFiles,
      findingCount: htmlReport?.findingCount,
    },
    formsReport: {
      path: formsReportPath,
      ok: formsReport?.ok ?? false,
      htmlFiles: formsReport?.htmlFiles,
      formCount: formsReport?.formCount,
      acmeFormCount: formsReport?.acmeFormCount,
      findingCount: formsReport?.findingCount,
    },
    formApiReport: {
      path: formApiReportPath,
      ok: formApiReport?.ok ?? false,
      endpointPath: formApiReport?.endpointPath,
      acceptedSamples: formApiReport?.acceptedSamples,
      rejectedSamples: formApiReport?.rejectedSamples,
      findingCount: formApiReport?.findingCount,
    },
    payloadRoundtripReport: {
      path: payloadRoundtripPath,
      ok: payloadRoundtripReport?.ok ?? false,
      sourceDocuments: payloadRoundtripReport?.sourceDocuments,
      cmsDocuments: payloadRoundtripReport?.cmsDocuments,
      sourcePaths: payloadRoundtripReport?.sourcePaths,
      cmsPaths: payloadRoundtripReport?.cmsPaths,
      sourceContentKeys: payloadRoundtripReport?.sourceContentKeys,
      cmsContentKeys: payloadRoundtripReport?.cmsContentKeys,
      sourceImportedImageDescriptors: payloadRoundtripReport?.sourceImportedImageDescriptors,
      cmsImportedImageDescriptors: payloadRoundtripReport?.cmsImportedImageDescriptors,
      sourceImportedImageIds: payloadRoundtripReport?.sourceImportedImageIds,
      cmsImportedImageIds: payloadRoundtripReport?.cmsImportedImageIds,
      findingCount: payloadRoundtripReport?.findingCount,
    },
    pocLaunchSuiteReport: {
      path: pocSuiteReportPath,
      ok: pocSuiteReport?.ok ?? false,
      gateCount: pocSuiteReport?.gateCount,
      passingGateCount: pocSuiteReport?.passingGateCount,
      failingGateCount: pocSuiteReport?.failingGateCount,
    },
    routeCoverageReport: {
      path: routeCoveragePath,
      ok: routeCoverageReport?.ok ?? false,
      builtHtmlRoutes: routeCoverageReport?.builtHtmlRoutes,
      expectedBuiltRoutes: routeCoverageReport?.expectedBuiltRoutes,
      publishedRoutes: routeCoverageReport?.publishedRoutes,
      explicitRedirects: routeCoverageReport?.explicitRedirects,
      missingPublishedRoutes: routeCoverageReport?.missingPublishedRoutes,
      missingRedirectRoutes: routeCoverageReport?.missingRedirectRoutes,
      builtDraftRoutes: routeCoverageReport?.builtDraftRoutes,
      unownedBuiltRoutes: routeCoverageReport?.unownedBuiltRoutes,
      blockerCount: routeCoverageReport?.blockerCount,
      findingCount: routeCoverageReport?.findingCount,
    },
    blockRootAttrsReport: {
      path: blockRootAttrsPath,
      ok: blockRootAttrsReport?.ok ?? false,
      htmlFiles: blockRootAttrsReport?.htmlFiles,
      routesWithRootAttrs: blockRootAttrsReport?.routesWithRootAttrs,
      rootAttrExpectations: blockRootAttrsReport?.rootAttrExpectations,
      anchorsExpected: blockRootAttrsReport?.anchorsExpected,
      classNamesExpected: blockRootAttrsReport?.classNamesExpected,
      findingCount: blockRootAttrsReport?.findingCount,
    },
    visualSmokeReport: {
      path: visualSmokePath,
      ok: visualSmokeReport?.ok ?? false,
      mode: visualSmokeReport?.mode,
      routeCount: visualSmokeReport?.routeCount,
      findingCount: visualSmokeReport?.findingCount,
    },
  },
  launchGaps,
  findings,
};

await writeFile(outPath, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({
  ok: snapshot.ok,
  out: outPath,
  pages: pages.length,
  published: snapshot.routes.published,
  redirects: redirects.length,
  emptyPublishedNonIndex: emptyPublishedRoutes.length,
  launchReady: snapshot.launchReady,
  launchGapCount: snapshot.launchGaps.length,
  mediaMissing: snapshot.media.missingImportedAssets,
  findings,
}, null, 2));

if (!snapshot.ok) {
  process.exit(1);
}

function argString(name: string, fallback: string): string {
  const index = process.argv.indexOf(`--${name}`);

  if (index === -1) {
    return fallback;
  }

  return process.argv[index + 1] ?? fallback;
}

async function readOptionalJson<T>(path: string): Promise<T | undefined> {
  try {
    return JSON.parse(await readFile(path, 'utf8')) as T;
  } catch {
    return undefined;
  }
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

function auditRedirects(redirects: Redirect[], pagesByPath: Map<string, PageDocument>) {
  const allRedirectSources = new Set(redirects.map((redirect) => redirect.from));
  const redirectSources = new Set<string>();
  const duplicateSources = new Set<string>();
  const fromPublishedRoutes: Redirect[] = [];
  const missingInternalTargets: Redirect[] = [];

  for (const redirect of redirects) {
    if (redirectSources.has(redirect.from)) {
      duplicateSources.add(redirect.from);
    }

    redirectSources.add(redirect.from);

    const sourcePage = pagesByPath.get(redirect.from);
    if (sourcePage?.status === 'published') {
      fromPublishedRoutes.push(redirect);
    }

    if (!isInternalPath(redirect.to)) {
      continue;
    }

    const targetPage = pagesByPath.get(redirect.to);
    if (targetPage?.status === 'published' || allRedirectSources.has(redirect.to)) {
      continue;
    }

    missingInternalTargets.push(redirect);
  }

  return {
    ok: duplicateSources.size === 0 && fromPublishedRoutes.length === 0 && missingInternalTargets.length === 0,
    duplicateSources: [...duplicateSources].sort(),
    fromPublishedRoutes,
    missingInternalTargets,
  };
}

function isInternalPath(value: string): boolean {
  return value.startsWith('/') && !value.startsWith('//');
}

async function countBuiltHtml(root: string): Promise<number> {
  return (await listHtmlFiles(root)).length;
}

async function listHtmlFiles(root: string): Promise<string[]> {
  const entries = await readdir(root, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const path = join(root, entry.name);

    if (entry.isDirectory()) {
      files.push(...await listHtmlFiles(path));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
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
    } else if (entry.isFile() && entry.name.endsWith('.astro')) {
      files.push(path);
    }
  }

  return files;
}

function sortedObject(map: Map<string, number>): Record<string, number> {
  return Object.fromEntries([...map.entries()].sort(([left], [right]) => left.localeCompare(right)));
}

function walk(value: unknown, visitor: (key: string, value: unknown) => void) {
  if (Array.isArray(value)) {
    value.forEach((item) => walk(item, visitor));
    return;
  }

  if (!value || typeof value !== 'object') {
    return;
  }

  for (const [key, child] of Object.entries(value)) {
    visitor(key, child);
    walk(child, visitor);
  }
}

function collectImageDescriptors(value: unknown): ImageDescriptor[] {
  if (Array.isArray(value)) {
    return value.flatMap((item) => collectImageDescriptors(item));
  }

  if (!value || typeof value !== 'object') {
    return [];
  }

  const record = value as Record<string, unknown>;
  const found: ImageDescriptor[] = [];

  if (typeof record.src === 'string' && record.src.startsWith('/assets/')) {
    found.push({
      id: typeof record.id === 'string' ? record.id : undefined,
      src: record.src,
    });
  }

  for (const child of Object.values(record)) {
    found.push(...collectImageDescriptors(child));
  }

  return found;
}

function collectImportedRuntimePublicPaths(value: unknown): Set<string> {
  const paths = new Set<string>();

  walkRuntimeStrings(value, (candidate) => {
    for (const match of candidate.matchAll(/\/media\/[^\s"'<>),]+/g)) {
      paths.add(decodeURI(match[0]).replace(/[.;:]+$/, ''));
    }
  });

  return paths;
}

function walkRuntimeStrings(value: unknown, visitor: (value: string) => void): void {
  if (typeof value === 'string') {
    visitor(value);
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => walkRuntimeStrings(item, visitor));
    return;
  }

  if (!value || typeof value !== 'object') {
    return;
  }

  Object.values(value).forEach((item) => walkRuntimeStrings(item, visitor));
}

function normalizePath(path: string): string {
  return path.replace(/\\/g, '/');
}

async function currentBuildRevision(): Promise<string> {
  try {
    const [{ stdout: revision }, { stdout: status }] = await Promise.all([
      execFileAsync('git', ['rev-parse', '--short', 'HEAD']),
      execFileAsync('git', ['status', '--porcelain']),
    ]);
    const suffix = status.trim().length > 0 ? '-dirty' : '';
    return `${revision.trim()}${suffix}`;
  } catch {
    return mediaReport?.provenance?.buildRevision ?? 'unknown';
  }
}
