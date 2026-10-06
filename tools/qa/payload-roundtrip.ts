import { readFile } from 'node:fs/promises';

import { pageDocumentSchema, type PageDocument } from '@acme/blocks';
import { argString, parseArgs, writeJson } from '../migrate/source-utils';

type CmsPagesExport = {
  generatedAt?: string;
  pages?: unknown[];
};

type ImageDescriptor = {
  id?: string;
  src: string;
};

type Finding = {
  code: string;
  path?: string;
  message: string;
  sample?: string;
};

const args = parseArgs();
const sourcePath = argString(args, 'source', 'data/source/cms-pages.json')!;
const cmsPath = argString(args, 'cms', 'data/cms/pages.json')!;
const routePath = argString(args, 'path');
const out = argString(args, 'out');
const scopeSourcePaths = args['scope-source-paths'] === true || args['scope-source-paths'] === 'true';
const sourceExport = await readPages(sourcePath);
const cmsExport = await readPages(cmsPath);
if (routePath) {
  sourceExport.pages = sourceExport.pages.filter((page) => page.path === routePath);
  cmsExport.pages = cmsExport.pages.filter((page) => page.path === routePath);
}
if (scopeSourcePaths) {
  const sourcePaths = new Set(sourceExport.pages.map((page) => page.path));
  cmsExport.pages = cmsExport.pages.filter((page) => sourcePaths.has(page.path));
}
const findings: Finding[] = [...sourceExport.findings, ...cmsExport.findings];
const sourceByPath = new Map(sourceExport.pages.map((page) => [page.path, page]));
const cmsByPath = new Map(cmsExport.pages.map((page) => [page.path, page]));

auditContentKeys('source', sourceExport.pages);
auditContentKeys('cms', cmsExport.pages);

for (const path of sourceByPath.keys()) {
  if (!cmsByPath.has(path)) {
    findings.push({
      code: 'missing-cms-path',
      path,
      message: 'Source-exported page path is missing from Payload-exported runtime cache.',
    });
  }
}

for (const path of cmsByPath.keys()) {
  if (!sourceByPath.has(path)) {
    findings.push({
      code: 'extra-cms-path',
      path,
      message: 'Payload-exported runtime cache contains a page path not present in source export.',
    });
  }
}

for (const [path, sourcePage] of sourceByPath.entries()) {
  const cmsPage = cmsByPath.get(path);

  if (!cmsPage) {
    continue;
  }

  compareScalar(path, 'collection', sourcePage.collection, cmsPage.collection);
  compareScalar(path, 'status', sourcePage.status, cmsPage.status);
  compareScalar(path, 'template', sourcePage.template, cmsPage.template);
  compareScalar(path, 'title', sourcePage.title, cmsPage.title);
  compareScalar(path, 'block-count', String(sourcePage.blocks.length), String(cmsPage.blocks.length));

  if (!sourcePage.contentKey) {
    findings.push({
      code: 'missing-source-content-key',
      path,
      message: 'Source-exported page is missing the stable contentKey identity field.',
    });
  }

  if (!cmsPage.contentKey) {
    findings.push({
      code: 'missing-cms-content-key',
      path,
      message: 'Payload-exported runtime cache is missing the stable contentKey identity field.',
    });
  }

  if (sourcePage.contentKey && cmsPage.contentKey) {
    compareScalar(path, 'contentKey', sourcePage.contentKey, cmsPage.contentKey);
  }

  const sourceImages = importedImages(sourcePage);
  const cmsImages = importedImages(cmsPage);
  const sourceImageKeys = new Set(sourceImages.map(imageKey));
  const cmsImageKeys = new Set(cmsImages.map(imageKey));

  for (const key of sourceImageKeys) {
    if (!cmsImageKeys.has(key)) {
      findings.push({
        code: 'lost-imported-image-id',
        path,
        message: 'Imported image descriptor from source export is missing after Payload round-trip.',
        sample: key,
      });
    }
  }

  for (const key of cmsImageKeys) {
    if (!sourceImageKeys.has(key)) {
      findings.push({
        code: 'extra-imported-image-id',
        path,
        message: 'Payload export contains an imported image descriptor not present in source export.',
        sample: key,
      });
    }
  }
}

const sourceImportedImages = sourceExport.pages.flatMap(importedImages);
const cmsImportedImages = cmsExport.pages.flatMap(importedImages);
const report = {
  ok: findings.length === 0,
  generatedAt: new Date().toISOString(),
  sourcePath,
  cmsPath,
  routePath,
  scopeSourcePaths,
  sourceGeneratedAt: sourceExport.generatedAt,
  cmsGeneratedAt: cmsExport.generatedAt,
  sourceDocuments: sourceExport.pages.length,
  cmsDocuments: cmsExport.pages.length,
  sourcePaths: sourceByPath.size,
  cmsPaths: cmsByPath.size,
  sourceContentKeys: new Set(sourceExport.pages.map((page) => page.contentKey).filter(Boolean)).size,
  cmsContentKeys: new Set(cmsExport.pages.map((page) => page.contentKey).filter(Boolean)).size,
  sourceImportedImageDescriptors: sourceImportedImages.length,
  cmsImportedImageDescriptors: cmsImportedImages.length,
  sourceImportedImageIds: new Set(sourceImportedImages.map(imageKey)).size,
  cmsImportedImageIds: new Set(cmsImportedImages.map(imageKey)).size,
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

async function readPages(path: string): Promise<{ generatedAt?: string; pages: PageDocument[]; findings: Finding[] }> {
  const parsed = JSON.parse(await readFile(path, 'utf8')) as CmsPagesExport;
  const pages: PageDocument[] = [];
  const findings: Finding[] = [];

  for (const [index, rawPage] of (parsed.pages ?? []).entries()) {
    const page = pageDocumentSchema.safeParse(rawPage);

    if (page.success) {
      pages.push(page.data);
      continue;
    }

    findings.push({
      code: 'schema-invalid',
      message: `${path} page ${index} is not a valid PageDocument.`,
      sample: page.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join('; '),
    });
  }

  return { generatedAt: parsed.generatedAt, pages, findings };
}

function compareScalar(path: string, field: string, expected: string, actual: string) {
  if (expected === actual) {
    return;
  }

  findings.push({
    code: 'roundtrip-field-mismatch',
    path,
    message: `Payload round-trip changed ${field}.`,
    sample: `${expected} -> ${actual}`,
  });
}

function auditContentKeys(label: 'source' | 'cms', pages: PageDocument[]): void {
  const byKey = new Map<string, string[]>();

  for (const page of pages) {
    if (!page.contentKey) {
      continue;
    }

    byKey.set(page.contentKey, [...(byKey.get(page.contentKey) ?? []), page.path]);
  }

  for (const [contentKey, paths] of byKey.entries()) {
    if (paths.length <= 1) {
      continue;
    }

    findings.push({
      code: `duplicate-${label}-content-key`,
      message: `${label} export has a duplicate stable contentKey identity field.`,
      sample: `${contentKey}: ${paths.join(', ')}`,
    });
  }
}

function importedImages(value: unknown): ImageDescriptor[] {
  if (Array.isArray(value)) {
    return value.flatMap(importedImages);
  }

  if (!value || typeof value !== 'object') {
    return [];
  }

  const record = value as Record<string, unknown>;
  const images: ImageDescriptor[] = [];

  if (typeof record.src === 'string' && record.src.startsWith('/media/')) {
    images.push({
      id: typeof record.id === 'string' ? record.id : undefined,
      src: record.src,
    });
  }

  for (const child of Object.values(record)) {
    images.push(...importedImages(child));
  }

  return images;
}

function imageKey(image: ImageDescriptor): string {
  return `${image.id ?? 'missing-id'}::${image.src}`;
}
