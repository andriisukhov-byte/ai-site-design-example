import { readFile } from 'node:fs/promises';

import { pageDocumentSchema, type PageDocument } from '@acme/blocks';

import { argString, parseArgs, writeJson } from './source-utils';

type ContentAuditReport = {
  productionBase?: string;
  results?: Array<{
    path?: string;
    localOnly?: boolean;
    production?: {
      ok?: boolean;
      title?: string;
      description?: string;
    };
  }>;
};

type CmsExport = {
  generatedAt?: string;
  source?: string;
  pages?: unknown[];
  [key: string]: unknown;
};

const args = parseArgs();
const reportFile = argString(args, 'report', 'data/source/production-content-parity-report.json')!;
const input = argString(args, 'input', 'data/cms/pages.json')!;
const out = argString(args, 'out', input)!;

const report = JSON.parse(await readFile(reportFile, 'utf8')) as ContentAuditReport;
const cms = JSON.parse(await readFile(input, 'utf8')) as CmsExport;
const productionBase = (report.productionBase ?? 'https://acme.example').replace(/\/+$/, '');
const productionMetadata = new Map(
  (report.results ?? [])
    .filter((result) =>
      !result.localOnly
      && result.production?.ok
      && typeof result.path === 'string'
      && typeof result.production.title === 'string'
      && typeof result.production.description === 'string',
    )
    .map((result) => [normalizePath(result.path!), {
      title: result.production!.title!,
      description: result.production!.description!,
    }]),
);

let updated = 0;
let unchanged = 0;
const pages: PageDocument[] = [];

for (const candidate of cms.pages ?? []) {
  const page = pageDocumentSchema.parse(candidate);
  const metadata = productionMetadata.get(normalizePath(page.path));

  if (!metadata || page.status !== 'published') {
    pages.push(page);
    unchanged += 1;
    continue;
  }

  const canonicalUrl = new URL(page.path, `${productionBase}/`).toString();
  const { metaDescription: _currentDescription, ...seoWithoutDescription } = page.seo;
  const next = pageDocumentSchema.parse({
    ...page,
    seo: {
      ...seoWithoutDescription,
      metaTitle: metadata.title,
      ...(metadata.description ? { metaDescription: metadata.description } : {}),
      canonicalUrl,
    },
  });

  if (
    page.seo.metaTitle === next.seo.metaTitle
    && page.seo.metaDescription === next.seo.metaDescription
    && page.seo.canonicalUrl === next.seo.canonicalUrl
  ) {
    unchanged += 1;
  } else {
    updated += 1;
  }

  pages.push(next);
}

await writeJson(out, {
  ...cms,
  generatedAt: new Date().toISOString(),
  pages,
});

console.log(JSON.stringify({
  ok: true,
  report: reportFile,
  input,
  out,
  productionMetadata: productionMetadata.size,
  updated,
  unchanged,
}, null, 2));

function normalizePath(value: string): string {
  const pathname = value.split(/[?#]/)[0].replace(/\/{2,}/g, '/');
  if (!pathname || pathname === '/') return '/';
  const withLeadingSlash = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${withLeadingSlash.replace(/\/+$/, '')}/`;
}
