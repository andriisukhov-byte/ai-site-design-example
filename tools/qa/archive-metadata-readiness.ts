import { readFile } from 'node:fs/promises';

import { argString, currentBuildRevision, currentSourceEraId, parseArgs, writeJson } from '../migrate/source-utils';

type PageDocument = {
  path?: string;
  title?: string;
  collection?: string;
  template?: string;
  status?: string;
  publishedAt?: string;
  blocks?: Array<{ type?: string; [key: string]: unknown }>;
  seo?: {
    ogImage?: unknown;
    twitterImage?: unknown;
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

type SourceExportReport = {
  pages?: Array<Record<string, unknown>>;
  totals?: Record<string, unknown>;
};

type Finding = {
  code: string;
  severity: 'warning';
  message: string;
  path?: string;
  collection?: string;
};

const archiveCollections = ['posts', 'guides', 'tips', 'news'] as const;
const recoveredDetailRoutes = [
  '/cart-abandonment-recovery-agent/',
  '/consultation-booking-agent/',
  '/follow-up-for-estimate-approval/',
  '/multi-channel-chatbot-deployment/',
  '/offer-communication-agent/',
  '/product-recommendation-agent/',
];

const taxonomyKeys = [
  'taxonomy',
  'taxonomies',
  'category',
  'categories',
  'tags',
  'terms',
  'guideCategory',
  'guideCategories',
  'postCategory',
  'postCategories',
  'tipCategory',
  'tipCategories',
  'tip_category',
  'archiveWidth',
  'archive_width',
];

const args = parseArgs();
const cmsPagesPath = argString(args, 'cms-pages', 'data/cms/pages.json')!;
const sourcePagesPath = argString(args, 'source-pages', 'data/source/cms-pages.json')!;
const sourceReportPath = argString(args, 'source-report', 'data/source/cms-export-report.json')!;
const outPath = argString(args, 'out', 'data/cms/archive-metadata-readiness-report.json')!;

const cmsPages = await readPages(cmsPagesPath);
const sourcePages = await readPages(sourcePagesPath);
const sourceReport = JSON.parse(await readFile(sourceReportPath, 'utf8')) as SourceExportReport;
const sourceReportPages = sourceReport.pages ?? [];
const findings: Finding[] = [];

const archiveReadiness = Object.fromEntries(
  archiveCollections.map((collection) => {
    const docs = cmsPages.filter((page) => page.collection === collection);
    const sourceDocs = sourcePages.filter((page) => page.collection === collection);
    const docsWithTaxonomy = docs.filter((page) => hasAnyKey(page, taxonomyKeys));
    const docsWithSeoImage = docs.filter((page) => Boolean(page.seo?.ogImage || page.seo?.twitterImage));
    const richTextOnly = docs.filter((page) => (page.blocks ?? []).length === 1 && page.blocks?.[0]?.type === 'rich-text');

    if (docs.length > 0 && docsWithTaxonomy.length === 0) {
      findings.push({
        code: 'archive-taxonomy-contract-missing',
        severity: 'warning',
        collection,
        message: `${collection} documents are routable but do not expose durable taxonomy/category/tag fields in the runtime CMS export.`,
      });
    }

    if (collection === 'tips') {
      const tipsWithCardShape = docs.filter((page) => hasAnyKey(page, ['tip_category', 'archive_width', 'archiveWidth']));

      if (tipsWithCardShape.length === 0) {
        findings.push({
          code: 'tips-card-metadata-missing',
          severity: 'warning',
          collection,
          message: 'Tips documents do not expose tip_category, archive_width/archiveWidth, or icon rows; the archive must keep source-compatible default cards until source data or product approval exists.',
        });
      }
    }

    return [
      collection,
      {
        cmsDocumentCount: docs.length,
        sourceDocumentCount: sourceDocs.length,
        publishedCmsDocuments: docs.filter((page) => page.status === 'published').length,
        docsWithTaxonomyContract: docsWithTaxonomy.length,
        docsWithSeoImage: docsWithSeoImage.length,
        richTextOnlyDocuments: richTextOnly.length,
        observedDocumentKeys: sortedUnique(docs.flatMap((page) => Object.keys(page))),
        observedBlockTypes: sortedUnique(docs.flatMap((page) => (page.blocks ?? []).map((block) => block.type).filter(Boolean) as string[])),
        sampleRoutes: docs.slice(0, 5).map((page) => ({
          path: page.path,
          title: page.title,
          template: page.template,
          status: page.status,
          publishedAt: page.publishedAt,
          blockTypes: (page.blocks ?? []).map((block) => block.type).filter(Boolean),
        })),
      },
    ];
  }),
);

const recoveredRoutes = recoveredDetailRoutes.map((path) => {
  const cmsPage = cmsPages.find((page) => page.path === path);
  const sourcePage = sourcePages.find((page) => page.path === path);
  const sourceReportPage = sourceReportPages.find((page) => valueEqualsPath(page.path, path) || valueEqualsPath(page.url, path));
  const recoveredFrom = firstValue(sourceReportPage, ['recoveredFrom', 'recovered_from', 'sourceRecoveryPath']);

  if (!cmsPage) {
    findings.push({
      code: 'recovered-detail-route-missing',
      severity: 'warning',
      path,
      message: `${path} is in the recovered detail route watchlist but is missing from the runtime CMS export.`,
    });
  }

  if (cmsPage) {
    findings.push({
      code: 'recovered-detail-standalone-source-unproven',
      severity: 'warning',
      path,
      message: recoveredFrom
        ? `${path} renders from linked-card recovery evidence, but not from a standalone route artifact. Keep it in final certification until standalone source-era evidence or product approval exists.`
        : `${path} renders in the runtime CMS export, but the source report does not prove a standalone route artifact. Keep it in final certification until source-era evidence or product approval exists.`,
    });
  }

  return {
    path,
    inRuntimeCms: Boolean(cmsPage),
    inSourceCms: Boolean(sourcePage),
    status: cmsPage?.status,
    collection: cmsPage?.collection,
    template: cmsPage?.template,
    title: cmsPage?.title,
    blockTypes: (cmsPage?.blocks ?? []).map((block) => block.type).filter(Boolean),
    sourceReportRecoveryEvidence: recoveredFrom ?? null,
    sourceReportKeys: sourceReportPage ? Object.keys(sourceReportPage).sort() : [],
  };
});

const report = {
  ok: true,
  status: 'poc-ready-final-gaps-documented',
  provenance: {
    sourceEraId: currentSourceEraId,
    buildRevision: currentBuildRevision(),
  },
  generatedAt: new Date().toISOString(),
  inputs: {
    cmsPagesPath,
    sourcePagesPath,
    sourceReportPath,
  },
  summary: {
    archiveCollections: archiveCollections.length,
    archiveDocuments: Object.values(archiveReadiness).reduce((sum, value) => sum + value.cmsDocumentCount, 0),
    recoveredDetailRoutes: recoveredRoutes.length,
    warningCount: findings.length,
    blockerCount: 0,
  },
  archiveReadiness,
  recoveredRoutes,
  findings,
  notes: [
    'This report is intentionally warning-only for POC readiness.',
    'Do not invent taxonomy, tips card icons, archive widths, or recovered standalone content from presentation shape alone.',
    'Use this report to decide the next source-era acquisition or Payload schema/import task before final certification.',
  ],
};

await writeJson(outPath, report);
console.log(JSON.stringify({
  ok: report.ok,
  status: report.status,
  out: outPath,
  archiveDocuments: report.summary.archiveDocuments,
  recoveredDetailRoutes: report.summary.recoveredDetailRoutes,
  warningCount: report.summary.warningCount,
}, null, 2));

async function readPages(file: string): Promise<PageDocument[]> {
  const raw = JSON.parse(await readFile(file, 'utf8')) as PageDocument[] | { pages?: PageDocument[] };
  return Array.isArray(raw) ? raw : raw.pages ?? [];
}

function hasAnyKey(value: unknown, keys: string[]): boolean {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const record = value as Record<string, unknown>;

  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(record, key) && record[key] !== undefined && record[key] !== null) {
      return true;
    }
  }

  return Object.values(record).some((child) => Array.isArray(child) ? child.some((item) => hasAnyKey(item, keys)) : hasAnyKey(child, keys));
}

function sortedUnique(values: string[]): string[] {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

function valueEqualsPath(value: unknown, path: string): boolean {
  return typeof value === 'string' && normalizePath(value) === path;
}

function normalizePath(value: string): string {
  const urlPath = value.startsWith('http') ? new URL(value).pathname : value;
  return `/${urlPath.replace(/^\/+/, '').replace(/\/?$/, '/')}`;
}

function firstValue(record: unknown, keys: string[]): unknown {
  if (!record || typeof record !== 'object') {
    return undefined;
  }

  for (const key of keys) {
    const value = (record as Record<string, unknown>)[key];

    if (typeof value === 'string' && value.trim()) {
      return value;
    }

    if (value && typeof value === 'object') {
      return value;
    }
  }

  return undefined;
}
