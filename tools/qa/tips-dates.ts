import { readFile } from 'node:fs/promises';

import { pageDocumentSchema, type PageDocument } from '@acme/blocks';
import { argString, parseArgs, writeJson } from '../migrate/source-utils';

type SanitizedDocument = {
  sourceKind?: string;
  path?: string;
  title?: string;
  publishedAt?: string;
  updatedAt?: string;
  status?: string;
};

type Finding = {
  code: string;
  path?: string;
  message: string;
  sample?: string;
};

const args = parseArgs();
const sanitizedPath = argString(args, 'sanitized', 'data/source/sanitized-content.json')!;
const sourceCmsPath = argString(args, 'source-cms', 'data/source/cms-pages.json')!;
const runtimeCmsPath = argString(args, 'runtime-cms', 'data/cms/pages.json')!;
const out = argString(args, 'out');
const sanitized = JSON.parse(await readFile(sanitizedPath, 'utf8')) as { documents?: SanitizedDocument[] };
const sanitizedTips = (sanitized.documents ?? []).filter((document) => document.sourceKind === 'tip');
const sourceTips = await readTipPages(sourceCmsPath);
const runtimeTips = await readTipPages(runtimeCmsPath);
const sanitizedByPath = new Map(sanitizedTips.map((document) => [document.path, document]));
const sourceByPath = new Map(sourceTips.map((page) => [page.path, page]));
const runtimeByPath = new Map(runtimeTips.map((page) => [page.path, page]));
const findings: Finding[] = [];

for (const sourceTip of sanitizedTips) {
  if (!sourceTip.path) {
    findings.push({
      code: 'missing-source-path',
      message: 'Sanitized tip source document is missing a path.',
      sample: sourceTip.title,
    });
    continue;
  }

  const sourcePage = sourceByPath.get(sourceTip.path);
  const runtimePage = runtimeByPath.get(sourceTip.path);

  if (!sourcePage) {
    findings.push({
      code: 'missing-source-cms-tip',
      path: sourceTip.path,
      message: 'Sanitized tip source document is missing from data/source/cms-pages.json.',
    });
    continue;
  }

  if (!runtimePage) {
    findings.push({
      code: 'missing-runtime-cms-tip',
      path: sourceTip.path,
      message: 'Sanitized tip source document is missing from data/cms/pages.json.',
    });
    continue;
  }

  compareDate(sourceTip.path, 'source-export', sourceTip.publishedAt, sourcePage.publishedAt);
  compareDate(sourceTip.path, 'runtime-export', sourceTip.publishedAt, runtimePage.publishedAt);
}

for (const path of sourceByPath.keys()) {
  if (!sanitizedByPath.has(path)) {
    findings.push({
      code: 'extra-source-cms-tip',
      path,
      message: 'Source CMS export contains a tip not present in sanitized source documents.',
    });
  }
}

for (const path of runtimeByPath.keys()) {
  if (!sanitizedByPath.has(path)) {
    findings.push({
      code: 'extra-runtime-cms-tip',
      path,
      message: 'Runtime CMS export contains a tip not present in sanitized source documents.',
    });
  }
}

const report = {
  ok: findings.length === 0,
  generatedAt: new Date().toISOString(),
  sanitizedPath,
  sourceCmsPath,
  runtimeCmsPath,
  sanitizedTips: sanitizedTips.length,
  sourceCmsTips: sourceTips.length,
  runtimeCmsTips: runtimeTips.length,
  dateDistribution: summarizeDates(sanitizedTips),
  findingCount: findings.length,
  findings,
};

if (out) {
  await writeJson(out, report);
}

console.log(JSON.stringify(report, null, 2));

if (findings.length > 0) {
  process.exit(1);
}

async function readTipPages(path: string): Promise<PageDocument[]> {
  const parsed = JSON.parse(await readFile(path, 'utf8')) as { pages?: unknown[] };

  return (parsed.pages ?? []).flatMap((page) => {
    const result = pageDocumentSchema.safeParse(page);
    return result.success && result.data.collection === 'tips' ? [result.data] : [];
  });
}

function compareDate(path: string, target: string, expected: string | undefined, actual: string | undefined): void {
  if (expected === actual) {
    return;
  }

  findings.push({
    code: 'tip-date-mismatch',
    path,
    message: `Tip publishedAt changed during ${target}.`,
    sample: `${expected ?? 'missing'} -> ${actual ?? 'missing'}`,
  });
}

function summarizeDates(documents: SanitizedDocument[]): Record<string, number> {
  return documents.reduce<Record<string, number>>((summary, document) => {
    const day = document.publishedAt?.slice(0, 10) || 'missing';
    summary[day] = (summary[day] ?? 0) + 1;
    return summary;
  }, {});
}
