import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { chromium, type BrowserContext, type ConsoleMessage, type Page } from '@playwright/test';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

import { currentBuildRevision, currentSourceEraId, writeJson } from '../migrate/source-utils';

type SectionCapture = {
  type: string;
  slug: string;
  index: number;
  source?: SectionSide;
  target?: SectionSide;
  diff?: {
    pixels: number;
    ratio: number;
    threshold: number;
    imagePath: string;
    alignmentOffset: {
      x: number;
      y: number;
    };
  };
  findings: Finding[];
};

type SectionSide = {
  ok: boolean;
  screenshotPath?: string;
  width: number;
  height: number;
  textLength: number;
  imageCount: number;
  brokenImages: string[];
  emptyImageAlts: number;
  overflowElements: number;
};

type Finding = {
  type: string;
  index: number;
  side?: 'source' | 'target';
  code: string;
  message: string;
};

const sourceBase = stripTrailingSlash(readArg('--source-base') ?? 'https://dev.acme.example');
const targetBase = stripTrailingSlash(readArg('--target-base') ?? 'http://127.0.0.1:4339');
const sourcePassword = readArg('--source-password');
const route = normalizeRoute(readArg('--route') ?? '/blocks/');
const outDir = readArg('--out') ?? '.tmp/blocks-storybook-audit';
const reportOut = readArg('--report-out') ?? 'data/source/blocks-storybook-audit-report.json';
const threshold = Number(readArg('--threshold') ?? '0.01');
const noScreenshots = hasArg('--no-screenshots');
const noDiff = noScreenshots || hasArg('--no-diff');

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 1200 },
  deviceScaleFactor: 1,
});

try {
  const sourcePage = await openSettledPage(context, `${sourceBase}${route}`, sourcePassword);
  const targetPage = await openSettledPage(context, `${targetBase}${route}`);
  const sourceRefs = await sectionRefs(sourcePage.page, 'source');
  const targetRefs = await sectionRefs(targetPage.page, 'target');
  const allSlugs = [
    ...sourceRefs.map((ref) => ref.slug),
    ...targetRefs.map((ref) => ref.slug).filter((slug) => !sourceRefs.some((ref) => ref.slug === slug)),
  ];
  const sections: SectionCapture[] = [];

  if (!noScreenshots) {
    await sourcePage.page.screenshot({ fullPage: true, path: join(outDir, 'source-fullpage.png') });
    await targetPage.page.screenshot({ fullPage: true, path: join(outDir, 'target-fullpage.png') });
  }

  for (const [index, slug] of allSlugs.entries()) {
    const sourceRef = sourceRefs.find((candidate) => candidate.slug === slug);
    const targetRef = targetRefs.find((candidate) => candidate.slug === slug);
    const type = sourceRef?.type ?? targetRef?.type ?? slug;
    const safe = safeName(slug);
    const source = sourceRef ? await captureSection(sourcePage.page, sourceRef, noScreenshots ? undefined : join(outDir, `${safe}-source.png`)) : undefined;
    const target = targetRef ? await captureSection(targetPage.page, targetRef, noScreenshots ? undefined : join(outDir, `${safe}-target.png`)) : undefined;
    const section: SectionCapture = {
      type,
      slug,
      index,
      source,
      target,
      findings: [],
    };

    if (!noDiff && source?.ok && target?.ok && source.screenshotPath && target.screenshotPath) {
      section.diff = await compareScreenshots(source.screenshotPath, target.screenshotPath, join(outDir, `${safe}-diff.png`), threshold);
    }

    section.findings = sectionFindings(section, !noDiff);
    sections.push(section);
  }

  const findings: Finding[] = [
    ...inventoryFindings(sourceRefs, targetRefs),
    ...(!sourcePage.authenticated ? [{
      type: 'page',
      index: 0,
      side: 'source' as const,
      code: 'source-authentication-failed',
      message: 'The source showcase remained password-protected after the authentication attempt.',
    }] : []),
    ...(noDiff ? [{
      type: 'page',
      index: 0,
      code: 'visual-evidence-disabled',
      message: 'Visual certification requires screenshots and per-story diffs.',
    }] : []),
    ...sourcePage.consoleErrors
      .filter((message) => !isKnownSourceConsoleNoise(message))
      .map((message) => ({ type: 'page', index: 0, side: 'source' as const, code: 'console-error', message })),
    ...targetPage.consoleErrors.map((message) => ({ type: 'page', index: 0, side: 'target' as const, code: 'console-error', message })),
    ...sections.flatMap((section) => section.findings),
  ];
  const blockingFindings = findings.filter((finding) => {
    if (finding.side === 'source' && finding.code !== 'source-authentication-failed') return false;

    if (
      finding.side === 'target'
      && finding.code === 'content-overflow'
      && (
        findings.some((candidate) =>
          candidate.side === 'source'
          && candidate.code === finding.code
          && candidate.type === finding.type
          && candidate.index === finding.index
        )
        || sections.some((section) =>
          section.type === finding.type
          && section.index === finding.index
          && Boolean(section.diff && section.diff.ratio <= threshold)
        )
      )
    ) {
      return false;
    }

    return true;
  });

  const likelySourceContentIssues = findings.filter((finding) =>
    finding.side === 'source' && [
      'source-missing-section',
      'short-content',
      'empty-section',
      'broken-image',
      'image-alt-missing',
      'content-overflow',
    ].includes(finding.code),
  );

  const report = {
    ok: blockingFindings.length === 0,
    provenance: {
      sourceEraId: currentSourceEraId,
      buildRevision: currentBuildRevision(),
    },
    generatedAt: new Date().toISOString(),
    sourceBase,
    targetBase,
    route,
    sourceAuthenticated: sourcePage.authenticated,
    noScreenshots,
    noDiff,
    outDir,
    threshold,
    fullPageScreenshots: {
      source: join(outDir, 'source-fullpage.png').replace(/\\/g, '/'),
      target: join(outDir, 'target-fullpage.png').replace(/\\/g, '/'),
    },
    sourceBlockTypes: sourceRefs.map((ref) => ref.slug),
    targetBlockTypes: targetRefs.map((ref) => ref.slug),
    sourceBlockTypeCount: sourceRefs.length,
    targetBlockTypeCount: targetRefs.length,
    findingCount: findings.length,
    blockingFindingCount: blockingFindings.length,
    likelySourceContentIssueCount: likelySourceContentIssues.length,
    likelySourceContentIssues,
    findings,
    sections,
  };

  await writeJson(reportOut, report);
  await writeJson(join(outDir, 'report.json'), report);
  console.log(JSON.stringify(report, null, 2));

  if (blockingFindings.length > 0) {
    process.exit(1);
  }
} finally {
  await browser.close();
}

async function openSettledPage(context: BrowserContext, url: string, password?: string): Promise<{ page: Page; consoleErrors: string[]; authenticated: boolean }> {
  const page = await context.newPage();
  const consoleErrors: string[] = [];

  page.on('console', (message: ConsoleMessage) => {
    if (message.type() === 'error') {
      consoleErrors.push(message.text());
    }
  });

  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45_000 });
  const authenticated = password
    ? await unlockPasswordProtectedPage(page, password)
    : (await page.locator('input[type="password"]').count()) === 0;
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0.001ms !important;
        animation-iteration-count: 1 !important;
        caret-color: transparent !important;
        scroll-behavior: auto !important;
        transition-duration: 0.001ms !important;
      }
      #wpadminbar,
      #masthead,
      .site-header,
      .grecaptcha-badge,
      astro-dev-toolbar {
        display: none !important;
      }
      [data-block-audit-hidden-overlay] {
        visibility: hidden !important;
      }
    `,
  });
  await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => undefined);
  await page.evaluate('document.fonts ? document.fonts.ready : Promise.resolve()');
  await resolveLazyMedia(page);

  return { page, consoleErrors, authenticated };
}

async function unlockPasswordProtectedPage(page: Page, password: string): Promise<boolean> {
  const passwordInput = page.locator('input[type="password"]').first();

  if ((await passwordInput.count()) === 0) {
    return true;
  }

  await passwordInput.fill(password);
  const form = passwordInput.locator('xpath=ancestor::form[1]');

  if ((await form.count()) > 0) {
    await Promise.all([
      page.waitForLoadState('domcontentloaded', { timeout: 15_000 }).catch(() => undefined),
      form.evaluate((node) => (node as HTMLFormElement).requestSubmit()),
    ]);
  } else {
    await passwordInput.press('Enter');
    await page.waitForLoadState('domcontentloaded', { timeout: 15_000 }).catch(() => undefined);
  }

  return (await page.locator('input[type="password"]').count()) === 0;
}

type SectionRef = {
  type: string;
  slug: string;
  selector: string;
  index: number;
};

async function sectionRefs(page: Page, side: 'source' | 'target'): Promise<SectionRef[]> {
  if (side === 'target') {
    return page.locator('[data-block-lab-type]').evaluateAll((nodes) =>
      nodes.map((node, index) => {
        const type = node.getAttribute('data-block-lab-type') ?? '';
        const section = node.closest('section[id^="sec-"]');
        const slug = (section?.id ?? '').replace(/^sec-/, '');

        return {
          type,
          slug,
          selector: `#${section?.id} [data-block-lab-type="${type.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"]`,
          index,
        };
      }).filter((ref) => Boolean(ref.type && ref.slug)),
    );
  }

  const refs = await page.locator('section[id^="sec-"]').evaluateAll((nodes) =>
    nodes.map((node, index) => {
      const slug = (node.id ?? '').replace(/^sec-/, '');

      return {
        type: slug,
        slug,
        selector: `#${node.id}`,
        index,
      };
    }).filter((ref) => Boolean(ref.type)),
  );

  return refs;
}

async function captureSection(page: Page, ref: SectionRef, screenshotPath?: string): Promise<SectionSide | undefined> {
  const candidates = page.locator(ref.selector);
  const count = await candidates.count();

  if (count === 0) {
    return undefined;
  }

  const locator = candidates.nth(0);
  await locator.scrollIntoViewIfNeeded();
  await page.waitForTimeout(120);
  await normalizeStoryState(locator, ref.slug);
  const box = await locator.boundingBox();

  if (!box || box.width < 20 || box.height < 20) {
    return {
      ok: false,
      width: Math.round(box?.width ?? 0),
      height: Math.round(box?.height ?? 0),
      textLength: 0,
      imageCount: 0,
      brokenImages: [],
      emptyImageAlts: 0,
      overflowElements: 0,
    };
  }

  if (screenshotPath) {
    await locator.evaluate((node) => {
      document.querySelectorAll('[data-block-audit-hidden-overlay]').forEach((element) => {
        element.removeAttribute('data-block-audit-hidden-overlay');
      });
      document.querySelectorAll<HTMLElement>('section[id^="sec-"]').forEach((section) => {
        if (!section.contains(node)) {
          section.setAttribute('data-block-audit-hidden-overlay', '');
        }
      });
      document.querySelectorAll<HTMLElement>('body *').forEach((element) => {
        const position = window.getComputedStyle(element).position;
        if (!node.contains(element) && (position === 'fixed' || position === 'sticky')) {
          element.setAttribute('data-block-audit-hidden-overlay', '');
        }
      });
    });
    await locator.screenshot({ path: screenshotPath });
    await page.locator('[data-block-audit-hidden-overlay]').evaluateAll((nodes) => {
      nodes.forEach((node) => node.removeAttribute('data-block-audit-hidden-overlay'));
    });
  }
  const metrics = await locator.evaluate((node) => {
    const element = node as HTMLElement;
    const images = [...element.querySelectorAll('img')];
    const visibleText = (element.textContent ?? '').replace(/\s+/g, ' ').trim();
    const rect = element.getBoundingClientRect();
    const overflowElements = [...element.querySelectorAll<HTMLElement>('*')].filter((child) => {
      const childRect = child.getBoundingClientRect();
      if (childRect.width === 0 || childRect.height === 0) return false;
      return childRect.right > rect.right + 2 || childRect.left < rect.left - 2;
    });

    return {
      textLength: visibleText.length,
      imageCount: images.length,
      brokenImages: images
        .filter((image) => image.currentSrc && (!image.complete || image.naturalWidth === 0))
        .map((image) => image.getAttribute('src') ?? image.currentSrc),
      emptyImageAlts: images.filter((image) => image.hasAttribute('alt') && image.getAttribute('alt') === '').length,
      overflowElements: overflowElements.length,
    };
  });

  return {
    ok: true,
    screenshotPath: screenshotPath?.replace(/\\/g, '/'),
    width: Math.round(box.width),
    height: Math.round(box.height),
    ...metrics,
  };
}

async function normalizeStoryState(locator: ReturnType<Page['locator']>, slug: string): Promise<void> {
  if (slug === 'industry-expertise') {
    const firstIndustry = locator.getByText('eCommerce & Retail', { exact: true }).first();

    if (await firstIndustry.count()) {
      await firstIndustry.click({ force: true });
      await locator.page().waitForTimeout(500);
    }
  }

  if (slug.startsWith('agent-capabilities')) {
    const items = locator.locator('.agent-capabilities__item');
    const itemCount = await items.count();

    if (itemCount > 0) {
      await items.nth(0).click({ force: true });
    }

    await locator.evaluate((node) => {
      const slider = node.querySelector<HTMLElement & {
        swiper?: {
          autoplay?: { stop?: () => void };
          slideTo?: (index: number, speed?: number, runCallbacks?: boolean) => void;
        };
      }>('[data-capability-swiper], .agent-capabilities__panels.swiper');
      slider?.swiper?.autoplay?.stop?.();
      slider?.swiper?.slideTo?.(0, 0, true);
    });
  }

  if (slug === 'capability-trio') {
    await locator.evaluate((node) => {
      node.querySelector<HTMLElement>('.capability-trio__card')
        ?.dispatchEvent(new MouseEvent('mouseenter'));
    });
  }

  if (slug === 'agent-solutions') {
    await locator.evaluate((node) => {
      node.querySelector<HTMLElement>('[data-agent-solution-card]')
        ?.dispatchEvent(new MouseEvent('mouseenter'));
    });
  }

  if (slug.startsWith('how-it-works')) {
    const cards = locator.locator('.how-it-works__card');
    const count = await cards.count();

    if (count > 0) {
      await cards.nth(0).click({ force: true });
    }
  }

  if (slug === 'testimonials') {
    await locator.evaluate((node) => {
      const slider = node.querySelector<HTMLElement & {
        swiper?: {
          autoplay?: { stop?: () => void };
          slideToLoop?: (index: number, speed?: number, runCallbacks?: boolean) => void;
        };
      }>('[data-testimonial-slider]');
      slider?.swiper?.autoplay?.stop?.();
      slider?.swiper?.slideToLoop?.(0, 0, false);

      const firstSlide = slider?.querySelector<HTMLElement>('[data-testimonial-slide="0"]');
      const wrapper = slider?.querySelector<HTMLElement>('.swiper-wrapper');
      if (firstSlide && wrapper) {
        wrapper.style.height = `${firstSlide.offsetHeight}px`;
      }
    });
  }
}

function sectionFindings(section: SectionCapture, requireDiff: boolean): Finding[] {
  const findings: Finding[] = [];

  if (!section.source) {
    findings.push({
      type: section.type,
      index: section.index,
      side: 'source',
      code: 'source-missing-section',
      message: `Source /blocks page is missing this block story (${section.slug}).`,
    });
  }

  if (!section.target) {
    findings.push({
      type: section.type,
      index: section.index,
      side: 'target',
      code: 'target-missing-section',
      message: `Local /blocks page is missing this block story (${section.slug}).`,
    });
  }

  if (requireDiff && section.source?.ok && section.target?.ok && !section.diff) {
    findings.push({
      type: section.type,
      index: section.index,
      code: 'missing-visual-diff',
      message: `Visual certification is missing a diff for ${section.slug}.`,
    });
  }

  for (const sideName of ['source', 'target'] as const) {
    const side = section[sideName];

    if (!side) continue;

    if (!side.ok || side.height < 80) {
      findings.push({
        type: section.type,
        index: section.index,
        side: sideName,
        code: 'empty-section',
        message: `${sideName} block story is too small or did not render.`,
      });
    }

    if (side.textLength < 12 && side.imageCount === 0) {
      findings.push({
        type: section.type,
        index: section.index,
        side: sideName,
        code: 'short-content',
        message: `${sideName} block story has almost no text or images.`,
      });
    }

    for (const image of side.brokenImages) {
      findings.push({
        type: section.type,
        index: section.index,
        side: sideName,
        code: 'broken-image',
        message: `Broken image: ${image}`,
      });
    }

    if (side.overflowElements > 0) {
      findings.push({
        type: section.type,
        index: section.index,
        side: sideName,
        code: 'content-overflow',
        message: `${side.overflowElements} elements overflow the block story horizontally.`,
      });
    }
  }

  if (section.diff && section.diff.ratio > section.diff.threshold) {
    findings.push({
      type: section.type,
      index: section.index,
      code: 'visual-diff-threshold',
      message: `Section diff ratio ${section.diff.ratio.toFixed(4)} exceeds ${section.diff.threshold}.`,
    });
  }

  if (
    section.source
    && section.target
    && (
      Math.abs(section.source.width - section.target.width) > 2
      || Math.abs(section.source.height - section.target.height) > 2
    )
  ) {
    findings.push({
      type: section.type,
      index: section.index,
      side: 'target',
      code: 'visual-dimension-mismatch',
      message: `Source is ${section.source.width}x${section.source.height}; target is ${section.target.width}x${section.target.height}.`,
    });
  }

  return findings;
}

function inventoryFindings(sourceRefs: SectionRef[], targetRefs: SectionRef[]): Finding[] {
  const source = sourceRefs.map((ref) => ref.slug);
  const target = targetRefs.map((ref) => ref.slug);

  if (source.length === target.length && source.every((slug, index) => slug === target[index])) {
    return [];
  }

  return [{
    type: 'page',
    index: 0,
    side: 'target',
    code: 'story-inventory-mismatch',
    message: `Source story order is [${source.join(', ')}]; target story order is [${target.join(', ')}].`,
  }];
}

async function compareScreenshots(sourcePath: string, targetPath: string, diffPath: string, threshold: number) {
  const source = PNG.sync.read(await readFile(sourcePath));
  const target = PNG.sync.read(await readFile(targetPath));
  const width = Math.max(source.width, target.width);
  const height = Math.max(source.height, target.height);
  const sourceCanvas = containPng(source, width, height);
  const targetCanvas = containPng(target, width, height);
  let best: {
    pixels: number;
    diff: PNG;
    x: number;
    y: number;
  } | undefined;

  for (let y = -1; y <= 1; y += 1) {
    for (let x = -1; x <= 1; x += 1) {
      const alignedTarget = shiftPng(targetCanvas, width, height, x, y);
      const candidateDiff = new PNG({ width, height });
      const pixels = pixelmatch(sourceCanvas.data, alignedTarget.data, candidateDiff.data, width, height, { threshold: 0.1 });

      if (!best || pixels < best.pixels) {
        best = { pixels, diff: candidateDiff, x, y };
      }
    }
  }

  if (!best) {
    throw new Error('Unable to align story screenshots.');
  }

  await writeFile(diffPath, PNG.sync.write(best.diff));

  return {
    pixels: best.pixels,
    ratio: best.pixels / (width * height),
    threshold,
    imagePath: diffPath.replace(/\\/g, '/'),
    alignmentOffset: {
      x: best.x,
      y: best.y,
    },
  };
}

function containPng(png: PNG, width: number, height: number): PNG {
  if (png.width === width && png.height === height) return png;

  const canvas = new PNG({ width, height, fill: true });
  canvas.data.fill(255);

  for (let y = 0; y < png.height; y += 1) {
    const sourceStart = y * png.width * 4;
    const targetStart = y * width * 4;
    png.data.copy(canvas.data, targetStart, sourceStart, sourceStart + png.width * 4);
  }

  return canvas;
}

function shiftPng(png: PNG, width: number, height: number, x: number, y: number): PNG {
  if (x === 0 && y === 0) return png;

  const canvas = new PNG({ width, height, fill: true });
  canvas.data.fill(255);
  const sourceX = Math.max(0, -x);
  const sourceY = Math.max(0, -y);
  const targetX = Math.max(0, x);
  const targetY = Math.max(0, y);
  const copyWidth = Math.min(png.width - sourceX, width - targetX);
  const copyHeight = Math.min(png.height - sourceY, height - targetY);

  for (let row = 0; row < copyHeight; row += 1) {
    const sourceStart = ((sourceY + row) * png.width + sourceX) * 4;
    const targetStart = ((targetY + row) * width + targetX) * 4;
    png.data.copy(canvas.data, targetStart, sourceStart, sourceStart + copyWidth * 4);
  }

  return canvas;
}

function isKnownSourceConsoleNoise(message: string): boolean {
  return message.includes('tr.capterra.com/events/')
    || message.includes('requestStorageAccess: Permission denied')
    || message === 'Failed to load resource: net::ERR_FAILED';
}

async function resolveLazyMedia(page: Page): Promise<void> {
  await page.evaluate(`(async () => {
    const delay = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));
    const height = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    const step = Math.max(500, Math.floor(window.innerHeight * 0.8));

    for (let y = 0; y <= height; y += step) {
      window.scrollTo(0, y);
      await delay(70);
    }

    window.scrollTo(0, 0);
    await delay(160);
  })()`);
}

function readArg(name: string): string | undefined {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function hasArg(name: string): boolean {
  return process.argv.includes(name);
}

function normalizeRoute(value: string): string {
  const route = value.startsWith('/') ? value : `/${value}`;
  return route.endsWith('/') ? route : `${route}/`;
}

function stripTrailingSlash(value: string): string {
  return value.replace(/\/+$/, '');
}

function safeName(value: string): string {
  return value.replace(/[^a-z0-9_-]+/gi, '-');
}

function cssEscape(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}
