import { readFile } from 'node:fs/promises';

import { argString, currentBuildRevision, currentSourceEraId, parseArgs, writeJson } from '../migrate/source-utils';

type Snapshot = {
  launchReady?: boolean;
  routes?: {
    totalDocuments?: number;
    published?: number;
    drafts?: number;
    contentKeys?: number;
    uniqueContentKeys?: number;
  };
  qa?: {
    builtHtmlFiles?: number;
    pocLaunchSuiteReport?: {
      ok?: boolean;
      gateCount?: number;
      passingGateCount?: number;
      failingGateCount?: number;
    };
    visualSmokeReport?: {
      ok?: boolean;
      mode?: string;
      routeCount?: number;
      findingCount?: number;
    };
  };
  media?: {
    missingImportedAssets?: number;
    syncReport?: {
      ok?: boolean;
      itemCount?: number;
      totalMegabytes?: number;
      missingSourceAssets?: number;
      sizeMismatchAssets?: number;
      unsafeTargetAssets?: number;
    };
  };
  launchGaps?: Array<{ severity?: string; code?: string; message?: string; path?: string }>;
};

type PocSuiteReport = {
  ok?: boolean;
  gateCount?: number;
  passingGateCount?: number;
  failingGateCount?: number;
};

type VisualSmokeReport = {
  ok?: boolean;
  mode?: string;
  routeCount?: number;
  findingCount?: number;
  routes?: string[];
};

type Finding = {
  code: string;
  severity: 'blocker' | 'warning';
  message: string;
};

const args = parseArgs();
const snapshotPath = argString(args, 'snapshot', 'data/cms/snapshot.json')!;
const pocSuitePath = argString(args, 'poc-suite', 'data/source/poc-launch-suite-report.json')!;
const visualSmokePath = argString(args, 'visual-smoke', 'data/source/visual-smoke-report.json')!;
const openQuestionsPath = argString(args, 'open-questions', 'docs/migration/open-questions.md')!;
const outPath = argString(args, 'out', 'data/cms/poc-readiness-report.json')!;

const snapshot = JSON.parse(await readFile(snapshotPath, 'utf8')) as Snapshot;
const pocSuite = JSON.parse(await readFile(pocSuitePath, 'utf8')) as PocSuiteReport;
const visualSmoke = JSON.parse(await readFile(visualSmokePath, 'utf8')) as VisualSmokeReport;
const openQuestions = await readFile(openQuestionsPath, 'utf8');
const findings: Finding[] = [];
const productDecisionBlockers = extractProductDecisionBlockers(openQuestions);

if (!snapshot.launchReady) {
  findings.push({
    code: 'snapshot-not-launch-ready',
    severity: 'blocker',
    message: 'data/cms/snapshot.json does not report launchReady=true.',
  });
}

for (const gap of snapshot.launchGaps ?? []) {
  findings.push({
    code: gap.code ?? 'launch-gap',
    severity: gap.severity === 'warning' ? 'warning' : 'blocker',
    message: gap.message ?? 'Snapshot reports an unresolved launch gap.',
  });
}

if (!pocSuite.ok || (pocSuite.failingGateCount ?? 0) > 0 || (pocSuite.gateCount ?? 0) < 20) {
  findings.push({
    code: 'poc-suite-not-green',
    severity: 'blocker',
    message: `POC suite is not green enough: ok=${Boolean(pocSuite.ok)}, gates=${pocSuite.gateCount ?? 'unknown'}, failing=${pocSuite.failingGateCount ?? 'unknown'}.`,
  });
}

if (!visualSmoke.ok || (visualSmoke.findingCount ?? 0) > 0 || (visualSmoke.routeCount ?? 0) < 8) {
  findings.push({
    code: 'visual-smoke-not-green',
    severity: 'blocker',
    message: `Visual smoke is not green enough: ok=${Boolean(visualSmoke.ok)}, routes=${visualSmoke.routeCount ?? 'unknown'}, findings=${visualSmoke.findingCount ?? 'unknown'}.`,
  });
}

if (productDecisionBlockers.length > 0) {
  findings.push({
    code: 'blocking-product-decisions',
    severity: 'blocker',
    message: `Open product/design decisions are still blocking POC readiness: ${productDecisionBlockers.join('; ')}`,
  });
}

const blockerCount = findings.filter((finding) => finding.severity === 'blocker').length;
const report = {
  ok: blockerCount === 0,
  status: blockerCount === 0 ? 'poc-ready' : 'not-ready',
  provenance: {
    sourceEraId: currentSourceEraId,
    buildRevision: currentBuildRevision(),
  },
  generatedAt: new Date().toISOString(),
  inputs: {
    snapshotPath,
    pocSuitePath,
    visualSmokePath,
    openQuestionsPath,
  },
  routes: {
    documents: snapshot.routes?.totalDocuments,
    published: snapshot.routes?.published,
    drafts: snapshot.routes?.drafts,
    builtHtmlFiles: snapshot.qa?.builtHtmlFiles,
    contentKeys: snapshot.routes?.contentKeys,
    uniqueContentKeys: snapshot.routes?.uniqueContentKeys,
  },
  gates: {
    launchReady: snapshot.launchReady === true,
    launchGaps: snapshot.launchGaps?.length ?? 0,
    pocSuiteOk: pocSuite.ok === true,
    pocSuiteGates: pocSuite.gateCount,
    pocSuiteFailingGates: pocSuite.failingGateCount,
    visualSmokeOk: visualSmoke.ok === true,
    visualSmokeMode: visualSmoke.mode,
    visualSmokeRoutes: visualSmoke.routeCount,
    visualSmokeFindings: visualSmoke.findingCount,
    mediaMissingImportedAssets: snapshot.media?.missingImportedAssets,
    mediaSyncOk: snapshot.media?.syncReport?.ok,
    mediaSyncAssets: snapshot.media?.syncReport?.itemCount,
    mediaSyncMegabytes: snapshot.media?.syncReport?.totalMegabytes,
    blockingProductDecisionCount: productDecisionBlockers.length,
  },
  visualSmokeRoutes: visualSmoke.routes ?? [],
  finalCertificationNotes: [
    'POC-ready does not mean final strict source-era certification.',
    'Final storage destination, taxonomy metadata, and recovered-detail standalone source certification remain tracked in docs/migration/open-questions.md.',
    'Archive taxonomy/card metadata and recovered-detail standalone-source gaps are machine-audited in data/cms/archive-metadata-readiness-report.json.',
  ],
  blockerCount,
  findingCount: findings.length,
  findings,
};

await writeJson(outPath, report);
console.log(JSON.stringify({
  ok: report.ok,
  status: report.status,
  out: outPath,
  documents: report.routes.documents,
  published: report.routes.published,
  builtHtmlFiles: report.routes.builtHtmlFiles,
  pocSuiteGates: report.gates.pocSuiteGates,
  visualSmokeRoutes: report.gates.visualSmokeRoutes,
  mediaSyncAssets: report.gates.mediaSyncAssets,
  blockerCount,
  findingCount: findings.length,
}, null, 2));

if (blockerCount > 0) {
  process.exit(1);
}

function extractProductDecisionBlockers(markdown: string): string[] {
  const match = markdown.match(/## Needs Product\/Design Decision\s+([\s\S]*?)(?:\n## |\s*$)/);
  const body = match?.[1] ?? '';
  const bullets = body
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => line.slice(2).trim())
    .filter(Boolean);

  return bullets.filter((bullet) => !/^none currently blocking\.?$/i.test(bullet));
}
