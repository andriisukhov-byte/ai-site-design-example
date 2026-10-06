import { readFile } from 'node:fs/promises';

type Snapshot = {
  ok?: boolean;
  launchReady?: boolean;
  source?: {
    sourceEraId?: string;
    buildRevision?: string;
  };
  routes?: {
    totalDocuments?: number;
    published?: number;
    contentKeys?: number;
    uniqueContentKeys?: number;
    emptyPublishedNonIndex?: number;
    emptyPublishedSamples?: Array<{
      path?: string;
      title?: string;
      collection?: string;
      template?: string;
    }>;
  };
  media?: {
    availabilityOk?: boolean;
    missingImportedAssets?: number;
    affectedRoutes?: number;
    syncReport?: {
      ok?: boolean;
      mode?: string;
      itemCount?: number;
      plannedAssets?: number;
      copiedAssets?: number;
      missingSourceAssets?: number;
      sizeMismatchAssets?: number;
      unsafeTargetAssets?: number;
      totalMegabytes?: number;
    };
  };
  qa?: {
    htmlStructureReport?: {
      ok?: boolean;
      findingCount?: number;
    };
    formsReport?: {
      ok?: boolean;
      findingCount?: number;
      acmeFormCount?: number;
    };
    formApiReport?: {
      ok?: boolean;
      acceptedSamples?: number;
      rejectedSamples?: number;
      findingCount?: number;
    };
    payloadRoundtripReport?: {
      ok?: boolean;
      sourceDocuments?: number;
      cmsDocuments?: number;
      sourceContentKeys?: number;
      cmsContentKeys?: number;
      sourceImportedImageIds?: number;
      cmsImportedImageIds?: number;
      findingCount?: number;
    };
    pocLaunchSuiteReport?: {
      ok?: boolean;
      gateCount?: number;
      passingGateCount?: number;
      failingGateCount?: number;
    };
    routeCoverageReport?: {
      ok?: boolean;
      builtHtmlRoutes?: number;
      expectedBuiltRoutes?: number;
      blockerCount?: number;
      findingCount?: number;
    };
    blockRootAttrsReport?: {
      ok?: boolean;
      rootAttrExpectations?: number;
      findingCount?: number;
    };
    visualSmokeReport?: {
      ok?: boolean;
      mode?: string;
      routeCount?: number;
      findingCount?: number;
    };
  };
  launchGaps?: Array<{
    severity?: string;
    code?: string;
    path?: string;
    message?: string;
  }>;
  findings?: unknown[];
};

type Finding = {
  code: string;
  severity: 'blocker' | 'warning';
  message: string;
  path?: string;
};

const snapshotPath = argString('snapshot', 'data/cms/snapshot.json');
const snapshot = JSON.parse(await readFile(snapshotPath, 'utf8')) as Snapshot;
const findings: Finding[] = [];

if (!snapshot.ok) {
  findings.push({
    code: 'snapshot-not-ok',
    severity: 'blocker',
    message: `CMS snapshot has schema/findings failures (${snapshot.findings?.length ?? 0}).`,
  });
}

for (const gap of snapshot.launchGaps ?? []) {
  findings.push({
    code: gap.code ?? 'launch-gap',
    severity: gap.severity === 'warning' ? 'warning' : 'blocker',
    path: gap.path,
    message: gap.message ?? 'Snapshot reports an unresolved launch gap.',
  });
}

if ((snapshot.routes?.emptyPublishedNonIndex ?? 0) > 0 && (snapshot.launchGaps ?? []).length === 0) {
  for (const route of snapshot.routes?.emptyPublishedSamples ?? []) {
    findings.push({
      code: 'empty-published-route',
      severity: 'blocker',
      path: route.path,
      message: `${route.path} (${route.collection}/${route.template}: ${route.title}) has no mapped blocks or rich text.`,
    });
  }
}

if (!snapshot.media?.availabilityOk || (snapshot.media.missingImportedAssets ?? 0) > 0) {
  findings.push({
    code: 'media-not-ready',
    severity: 'blocker',
    message: `Media availability is not launch-ready: availabilityOk=${Boolean(snapshot.media?.availabilityOk)}, missingImportedAssets=${snapshot.media?.missingImportedAssets ?? 'unknown'}, affectedRoutes=${snapshot.media?.affectedRoutes ?? 'unknown'}.`,
  });
}

if (!snapshot.media?.syncReport?.ok || (snapshot.media.syncReport.missingSourceAssets ?? 0) > 0 || (snapshot.media.syncReport.sizeMismatchAssets ?? 0) > 0 || (snapshot.media.syncReport.unsafeTargetAssets ?? 0) > 0) {
  findings.push({
    code: 'media-sync-not-ready',
    severity: 'blocker',
    message: `Media handoff sync is not launch-ready: ok=${Boolean(snapshot.media?.syncReport?.ok)}, itemCount=${snapshot.media?.syncReport?.itemCount ?? 'unknown'}, missingSourceAssets=${snapshot.media?.syncReport?.missingSourceAssets ?? 'unknown'}, sizeMismatchAssets=${snapshot.media?.syncReport?.sizeMismatchAssets ?? 'unknown'}, unsafeTargetAssets=${snapshot.media?.syncReport?.unsafeTargetAssets ?? 'unknown'}.`,
  });
}

if (!snapshot.qa?.htmlStructureReport?.ok || (snapshot.qa.htmlStructureReport.findingCount ?? 0) > 0) {
  findings.push({
    code: 'html-structure-not-ready',
    severity: 'blocker',
    message: `HTML structure is not launch-ready: ok=${Boolean(snapshot.qa?.htmlStructureReport?.ok)}, findingCount=${snapshot.qa?.htmlStructureReport?.findingCount ?? 'unknown'}.`,
  });
}

if (!snapshot.qa?.formsReport?.ok || (snapshot.qa.formsReport.findingCount ?? 0) > 0 || (snapshot.qa.formsReport.acmeFormCount ?? 0) === 0) {
  findings.push({
    code: 'forms-not-ready',
    severity: 'blocker',
    message: `Forms are not launch-ready: ok=${Boolean(snapshot.qa?.formsReport?.ok)}, findingCount=${snapshot.qa?.formsReport?.findingCount ?? 'unknown'}, acmeFormCount=${snapshot.qa?.formsReport?.acmeFormCount ?? 'unknown'}.`,
  });
}

if (!snapshot.qa?.formApiReport?.ok || (snapshot.qa.formApiReport.findingCount ?? 0) > 0 || (snapshot.qa.formApiReport.acceptedSamples ?? 0) === 0 || (snapshot.qa.formApiReport.rejectedSamples ?? 0) === 0) {
  findings.push({
    code: 'form-api-not-ready',
    severity: 'blocker',
    message: `Form API is not launch-ready: ok=${Boolean(snapshot.qa?.formApiReport?.ok)}, acceptedSamples=${snapshot.qa?.formApiReport?.acceptedSamples ?? 'unknown'}, rejectedSamples=${snapshot.qa?.formApiReport?.rejectedSamples ?? 'unknown'}, findingCount=${snapshot.qa?.formApiReport?.findingCount ?? 'unknown'}.`,
  });
}

if (!snapshot.qa?.payloadRoundtripReport?.ok || (snapshot.qa.payloadRoundtripReport.findingCount ?? 0) > 0) {
  findings.push({
    code: 'payload-roundtrip-not-ready',
    severity: 'blocker',
    message: `Payload round-trip is not launch-ready: ok=${Boolean(snapshot.qa?.payloadRoundtripReport?.ok)}, findingCount=${snapshot.qa?.payloadRoundtripReport?.findingCount ?? 'unknown'}.`,
  });
}

if (!snapshot.qa?.pocLaunchSuiteReport?.ok || (snapshot.qa.pocLaunchSuiteReport.failingGateCount ?? 0) > 0) {
  findings.push({
    code: 'poc-launch-suite-not-ready',
    severity: 'blocker',
    message: `POC launch suite is not green: ok=${Boolean(snapshot.qa?.pocLaunchSuiteReport?.ok)}, gateCount=${snapshot.qa?.pocLaunchSuiteReport?.gateCount ?? 'unknown'}, failingGateCount=${snapshot.qa?.pocLaunchSuiteReport?.failingGateCount ?? 'unknown'}.`,
  });
}

if (!snapshot.qa?.routeCoverageReport?.ok || (snapshot.qa.routeCoverageReport.blockerCount ?? 0) > 0) {
  findings.push({
    code: 'route-coverage-not-ready',
    severity: 'blocker',
    message: `Route coverage is not launch-ready: ok=${Boolean(snapshot.qa?.routeCoverageReport?.ok)}, blockerCount=${snapshot.qa?.routeCoverageReport?.blockerCount ?? 'unknown'}, findingCount=${snapshot.qa?.routeCoverageReport?.findingCount ?? 'unknown'}.`,
  });
}

if (!snapshot.qa?.blockRootAttrsReport?.ok || (snapshot.qa.blockRootAttrsReport.findingCount ?? 0) > 0) {
  findings.push({
    code: 'block-root-attrs-not-ready',
    severity: 'blocker',
    message: `Block root attrs are not launch-ready: ok=${Boolean(snapshot.qa?.blockRootAttrsReport?.ok)}, findingCount=${snapshot.qa?.blockRootAttrsReport?.findingCount ?? 'unknown'}.`,
  });
}

if (!snapshot.qa?.visualSmokeReport?.ok || (snapshot.qa.visualSmokeReport.findingCount ?? 0) > 0 || (snapshot.qa.visualSmokeReport.routeCount ?? 0) < 8) {
  findings.push({
    code: 'visual-smoke-not-ready',
    severity: 'blocker',
    message: `Visual smoke is not launch-ready: ok=${Boolean(snapshot.qa?.visualSmokeReport?.ok)}, mode=${snapshot.qa?.visualSmokeReport?.mode ?? 'unknown'}, routeCount=${snapshot.qa?.visualSmokeReport?.routeCount ?? 'unknown'}, findingCount=${snapshot.qa?.visualSmokeReport?.findingCount ?? 'unknown'}.`,
  });
}

const blockerCount = findings.filter((finding) => finding.severity === 'blocker').length;
const result = {
  ok: blockerCount === 0,
  snapshot: snapshotPath,
  sourceEraId: snapshot.source?.sourceEraId,
  buildRevision: snapshot.source?.buildRevision,
  documents: snapshot.routes?.totalDocuments,
  publishedRoutes: snapshot.routes?.published,
  contentKeys: snapshot.routes?.contentKeys,
  uniqueContentKeys: snapshot.routes?.uniqueContentKeys,
  emptyPublishedNonIndex: snapshot.routes?.emptyPublishedNonIndex,
  mediaAvailabilityOk: snapshot.media?.availabilityOk,
  missingImportedAssets: snapshot.media?.missingImportedAssets,
  mediaSyncOk: snapshot.media?.syncReport?.ok,
  mediaSyncMode: snapshot.media?.syncReport?.mode,
  mediaSyncAssets: snapshot.media?.syncReport?.itemCount,
  mediaSyncPlannedAssets: snapshot.media?.syncReport?.plannedAssets,
  mediaSyncCopiedAssets: snapshot.media?.syncReport?.copiedAssets,
  mediaSyncMissingSourceAssets: snapshot.media?.syncReport?.missingSourceAssets,
  mediaSyncSizeMismatchAssets: snapshot.media?.syncReport?.sizeMismatchAssets,
  mediaSyncUnsafeTargetAssets: snapshot.media?.syncReport?.unsafeTargetAssets,
  mediaSyncMegabytes: snapshot.media?.syncReport?.totalMegabytes,
  htmlStructureOk: snapshot.qa?.htmlStructureReport?.ok,
  formsOk: snapshot.qa?.formsReport?.ok,
  acmeFormCount: snapshot.qa?.formsReport?.acmeFormCount,
  formApiOk: snapshot.qa?.formApiReport?.ok,
  payloadRoundtripOk: snapshot.qa?.payloadRoundtripReport?.ok,
  payloadRoundtripDocuments: snapshot.qa?.payloadRoundtripReport?.cmsDocuments,
  payloadRoundtripContentKeys: snapshot.qa?.payloadRoundtripReport?.cmsContentKeys,
  payloadRoundtripImageIds: snapshot.qa?.payloadRoundtripReport?.cmsImportedImageIds,
  pocLaunchSuiteOk: snapshot.qa?.pocLaunchSuiteReport?.ok,
  pocLaunchSuiteGates: snapshot.qa?.pocLaunchSuiteReport?.gateCount,
  routeCoverageOk: snapshot.qa?.routeCoverageReport?.ok,
  builtHtmlRoutes: snapshot.qa?.routeCoverageReport?.builtHtmlRoutes,
  expectedBuiltRoutes: snapshot.qa?.routeCoverageReport?.expectedBuiltRoutes,
  blockRootAttrsOk: snapshot.qa?.blockRootAttrsReport?.ok,
  blockRootAttrExpectations: snapshot.qa?.blockRootAttrsReport?.rootAttrExpectations,
  visualSmokeOk: snapshot.qa?.visualSmokeReport?.ok,
  visualSmokeMode: snapshot.qa?.visualSmokeReport?.mode,
  visualSmokeRoutes: snapshot.qa?.visualSmokeReport?.routeCount,
  blockerCount,
  findingCount: findings.length,
  findings,
};

console.log(JSON.stringify(result, null, 2));

if (blockerCount > 0) {
  process.exit(1);
}

function argString(name: string, fallback: string): string {
  const index = process.argv.indexOf(`--${name}`);

  if (index === -1) {
    return fallback;
  }

  return process.argv[index + 1] ?? fallback;
}
