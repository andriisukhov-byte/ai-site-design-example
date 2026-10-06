import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { chromium, type ConsoleMessage, type Page } from '@playwright/test';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

import { argString, currentBuildRevision, currentSourceEraId, parseArgs, writeJson } from '../migrate/source-utils';

type CmsPagesExport = {
  pages?: Array<{
    path?: string;
    collection?: string;
    template?: string;
    blocks?: Array<{ type?: string }>;
  }>;
};

type RouteResult = {
  path: string;
  target: CaptureResult;
  source?: CaptureResult;
  diff?: {
    pixels: number;
    ratio: number;
    threshold: number;
    imagePath: string;
  };
};

type CaptureResult = {
  ok: boolean;
  url: string;
  status?: number;
  screenshotPath: string;
  width: number;
  height: number;
  nonWhitePixels: number;
  consoleErrors: string[];
};

const args = parseArgs();
const targetBase = stripTrailingSlash(argString(args, 'target-base', 'http://localhost:4321')!);
const sourceBase = stripTrailingSlash(argString(args, 'source-base'));
const cmsPagesPath = argString(args, 'pages', 'data/cms/pages.json')!;
const outDir = argString(args, 'out', '.tmp/visual-qa')!;
const reportOut = argString(args, 'report-out');
const limit = Number(argString(args, 'limit', '12'));
const mismatchThreshold = Number(argString(args, 'threshold', '0.08'));
const explicitRoutes = argString(args, 'routes');
const viewportWidth = Number(argString(args, 'viewport-width', '1440'));
const viewportHeight = Number(argString(args, 'viewport-height', '1200'));

const routes = explicitRoutes
  ? explicitRoutes.split(',').map((route) => normalizePath(route)).filter(Boolean)
  : await selectRepresentativeRoutes(cmsPagesPath, limit);

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: viewportWidth, height: viewportHeight },
  deviceScaleFactor: 1,
});

try {
  const results: RouteResult[] = [];

  for (const path of routes) {
    const routeDir = join(outDir, safeName(path));
    await mkdir(routeDir, { recursive: true });

    const target = await capturePage(context, `${targetBase}${path}`, join(routeDir, 'target.png'));
    const result: RouteResult = { path, target };

    if (sourceBase) {
      const source = await capturePage(context, `${sourceBase}${path}`, join(routeDir, 'source.png'));
      result.source = source;

      if (target.ok && source.ok) {
        result.diff = await compareScreenshots(
          source.screenshotPath,
          target.screenshotPath,
          join(routeDir, 'diff.png'),
          mismatchThreshold,
        );
      }
    }

    results.push(result);
  }

  const findings = results.flatMap((result) => routeFindings(result));
  const summary = {
    ok: findings.length === 0,
    provenance: {
      sourceEraId: currentSourceEraId,
      buildRevision: currentBuildRevision(),
    },
    generatedAt: new Date().toISOString(),
    mode: sourceBase ? 'source-target-diff' : 'target-smoke',
    targetBase,
    sourceBase,
    routes,
    outDir,
    routeCount: routes.length,
    findingCount: findings.length,
    findings,
    results: results.map((result) => ({
      path: result.path,
      target: compactCapture(result.target),
      source: result.source ? compactCapture(result.source) : undefined,
      diff: result.diff ? {
        pixels: result.diff.pixels,
        ratio: result.diff.ratio,
        threshold: result.diff.threshold,
        imagePath: result.diff.imagePath,
      } : undefined,
    })),
  };
  const report = {
    ok: findings.length === 0,
    provenance: summary.provenance,
    generatedAt: summary.generatedAt,
    mode: sourceBase ? 'source-target-diff' : 'target-smoke',
    targetBase,
    sourceBase,
    routes,
    outDir,
    findings,
    results,
  };

  await writeJson(join(outDir, 'report.json'), report);
  if (reportOut) {
    await writeJson(reportOut, summary);
  }
  console.log(JSON.stringify(report, null, 2));

  if (findings.length > 0) {
    process.exit(1);
  }
} finally {
  await browser.close();
}

function compactCapture(capture: CaptureResult) {
  return {
    ok: capture.ok,
    url: capture.url,
    status: capture.status,
    screenshotPath: capture.screenshotPath.replace(/\\/g, '/'),
    width: capture.width,
    height: capture.height,
    nonWhitePixels: capture.nonWhitePixels,
    consoleErrorCount: capture.consoleErrors.length,
  };
}

async function capturePage(
  context: Awaited<ReturnType<typeof browser.newContext>>,
  url: string,
  screenshotPath: string,
): Promise<CaptureResult> {
  const page = await context.newPage();
  const consoleErrors: string[] = [];

  page.on('console', (message: ConsoleMessage) => {
    if (message.type() === 'error') {
      consoleErrors.push(message.text());
    }
  });

  try {
    const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30_000 });
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-duration: 0.001ms !important;
          animation-iteration-count: 1 !important;
          caret-color: transparent !important;
          scroll-behavior: auto !important;
          transition-duration: 0.001ms !important;
        }
      `,
    });
    await page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => undefined);
    await page.evaluate('document.fonts ? document.fonts.ready : Promise.resolve()');
    await resolveLazyMedia(page);

    const screenshot = await page.screenshot({ fullPage: true, path: screenshotPath });
    const png = PNG.sync.read(screenshot);

    return {
      ok: response ? response.status() < 400 : false,
      url,
      status: response?.status(),
      screenshotPath,
      width: png.width,
      height: png.height,
      nonWhitePixels: countNonWhitePixels(png),
      consoleErrors,
    };
  } finally {
    await page.close();
  }
}

async function resolveLazyMedia(page: Page): Promise<void> {
  await page.evaluate(`(async () => {
    const delay = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));
    const height = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    const step = Math.max(400, Math.floor(window.innerHeight * 0.8));

    for (let y = 0; y <= height; y += step) {
      window.scrollTo(0, y);
      await delay(60);
    }

    window.scrollTo(0, 0);
    await delay(120);
  })()`);
}

async function compareScreenshots(
  sourcePath: string,
  targetPath: string,
  diffPath: string,
  threshold: number,
): Promise<RouteResult['diff']> {
  const source = PNG.sync.read(await readFile(sourcePath));
  const target = PNG.sync.read(await readFile(targetPath));
  const width = Math.min(source.width, target.width);
  const height = Math.min(source.height, target.height);
  const sourceCrop = cropPng(source, width, height);
  const targetCrop = cropPng(target, width, height);
  const diff = new PNG({ width, height });
  const pixels = pixelmatch(sourceCrop.data, targetCrop.data, diff.data, width, height, {
    threshold: 0.1,
  });

  await writeFile(diffPath, PNG.sync.write(diff));

  return {
    pixels,
    ratio: pixels / (width * height),
    threshold,
    imagePath: diffPath,
  };
}

async function selectRepresentativeRoutes(file: string, maxRoutes: number): Promise<string[]> {
  const exportData = JSON.parse(await readFile(file, 'utf8')) as CmsPagesExport;
  const pages = (exportData.pages ?? []).filter((page) => typeof page.path === 'string');
  const selected = new Set<string>();
  const preferred = [
    '/',
    '/about/',
    '/pricing/',
    '/cognitive-ai-platform/',
    '/ai-agent-builder/',
    '/alternatives/',
    '/ai-agent-for-plumbers/',
    '/call-center-automation/',
    '/blog/what-are-ai-agents/',
    '/guides/',
    '/news/',
    '/use-cases/',
  ];

  for (const path of preferred) {
    if (pages.some((page) => page.path === path)) {
      selected.add(path);
    }
  }

  const blockPriorities = [
    'pricing-details',
    'tabs-showcase',
    'industry-expertise',
    'logo-grid',
    'testimonials',
    'faq',
    'rich-text',
  ];

  for (const blockType of blockPriorities) {
    const page = pages.find((candidate) => candidate.blocks?.some((block) => block.type === blockType));

    if (page?.path) {
      selected.add(page.path);
    }
  }

  for (const page of pages) {
    if (selected.size >= maxRoutes) {
      break;
    }

    selected.add(page.path!);
  }

  return [...selected].slice(0, maxRoutes);
}

function routeFindings(result: RouteResult): Array<{ path: string; code: string; message: string }> {
  const findings: Array<{ path: string; code: string; message: string }> = [];

  for (const [side, capture] of [['target', result.target], ['source', result.source] as const]) {
    if (!capture) {
      continue;
    }

    if (!capture.ok) {
      findings.push({
        path: result.path,
        code: `${side}-http`,
        message: `${side} returned HTTP ${capture.status ?? 'unknown'}.`,
      });
    }

    if (capture.nonWhitePixels < 500) {
      findings.push({
        path: result.path,
        code: `${side}-blank`,
        message: `${side} screenshot appears blank or mostly empty.`,
      });
    }
  }

  if (result.diff && result.diff.ratio > result.diff.threshold) {
    findings.push({
      path: result.path,
      code: 'visual-diff-threshold',
      message: `Mismatch ratio ${result.diff.ratio.toFixed(4)} exceeds ${result.diff.threshold}.`,
    });
  }

  return findings;
}

function countNonWhitePixels(png: PNG): number {
  let count = 0;

  for (let index = 0; index < png.data.length; index += 4) {
    const alpha = png.data[index + 3];
    const red = png.data[index];
    const green = png.data[index + 1];
    const blue = png.data[index + 2];

    if (alpha > 0 && (red < 245 || green < 245 || blue < 245)) {
      count += 1;
    }
  }

  return count;
}

function cropPng(png: PNG, width: number, height: number): PNG {
  if (png.width === width && png.height === height) {
    return png;
  }

  const cropped = new PNG({ width, height });

  for (let y = 0; y < height; y += 1) {
    const sourceStart = (y * png.width) * 4;
    const targetStart = (y * width) * 4;
    png.data.copy(cropped.data, targetStart, sourceStart, sourceStart + width * 4);
  }

  return cropped;
}

function stripTrailingSlash(value?: string): string | undefined {
  return value?.replace(/\/+$/, '');
}

function normalizePath(value: string): string {
  const trimmed = value.trim();

  if (!trimmed) {
    return '';
  }

  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
}

function safeName(path: string): string {
  return path === '/' ? 'home' : path.replace(/^\/|\/$/g, '').replace(/[^a-z0-9_-]+/gi, '-');
}
