import { chromium, type Page } from '@playwright/test';

import { siteChrome } from '@acme/config';

import { argString, parseArgs, writeJson } from '../migrate/source-utils';

type Finding = {
  code: string;
  message: string;
  selector?: string;
};

type RouteResult = {
  route: string;
  ok: boolean;
  status?: number;
  findingCount: number;
  findings: Finding[];
};

const args = parseArgs();
const baseUrl = argString(args, 'base', 'http://127.0.0.1:4321')!;
const route = argString(args, 'route', '/')!;
const routesArg = argString(args, 'routes');
const out = argString(args, 'out');
const routes = routesArg
  ? routesArg.split(',').map((item) => normalizeRoute(item)).filter(Boolean)
  : [normalizeRoute(route)];
const browser = await chromium.launch();
const results: RouteResult[] = [];

try {
  for (const currentRoute of routes) {
    results.push(await smokeRoute(currentRoute));
  }
} finally {
  await browser.close();
}

const findings = results.flatMap((result) => result.findings.map((finding) => ({
  route: result.route,
  ...finding,
})));
const result = {
  ok: findings.length === 0,
  baseUrl,
  routes,
  findingCount: findings.length,
  findings,
  results,
};

if (out) {
  await writeJson(out, result);
}

console.log(JSON.stringify(result, null, 2));

if (findings.length > 0) {
  process.exit(1);
}

async function smokeRoute(currentRoute: string): Promise<RouteResult> {
  const findings: Finding[] = [];
  const page = await browser.newPage({ viewport: { width: 1440, height: 1400 } });
  let status: number | undefined;

  try {
    const response = await page.goto(new URL(currentRoute, baseUrl).toString(), { waitUntil: 'networkidle' });
    status = response?.status();

    if (!response?.ok()) {
      findings.push({
        code: 'route-not-ok',
        message: `Chrome smoke route returned ${response?.status() ?? 'no response'}.`,
      });
    }

    await assertVisible(findings, page, '.site-header', 'missing-header', 'Site header is missing.');
    await assertVisible(findings, page, '.footer', 'missing-footer', 'Site footer is missing.');
    await resolveLazyMedia(page);
    await assertImageLoaded(findings, page, '.site-header__logo', siteChrome.logo.src);
    await settleFooter(page);
    await assertImageLoaded(findings, page, '.footer__logo', siteChrome.footerLogo.src);
    await assertLinks(findings, page, '.site-header__menu-link', 'missing-header-navigation', siteChrome.primaryNavigation.length);
    await assertLinks(findings, page, '.footer__menu .sub-menu a', 'missing-footer-navigation', siteChrome.footerColumns.reduce((count, column) => count + column.links.length, 0));
    await assertLinks(findings, page, '.footer__legal-link', 'missing-footer-legal-links', siteChrome.legalLinks.length);
    await assertLinks(findings, page, '.footer__social-link', 'missing-footer-social-links', siteChrome.socialLinks.length);
    await assertSocialPlatforms(findings, page);
  } finally {
    await page.close();
  }

  return {
    route: currentRoute,
    ok: findings.length === 0,
    status,
    findingCount: findings.length,
    findings,
  };
}

async function assertVisible(findings: Finding[], page: Page, selector: string, code: string, message: string): Promise<void> {
  const count = await page.locator(selector).count();

  if (count === 0) {
    findings.push({ code, message, selector });
    return;
  }

  if (!(await page.locator(selector).first().isVisible())) {
    findings.push({ code: `${code}-hidden`, message: `${message} Element exists but is hidden.`, selector });
  }
}

async function assertImageLoaded(findings: Finding[], page: Page, selector: string, expectedSrc: string): Promise<void> {
  const image = page.locator(selector).first();
  const count = await image.count();

  if (count === 0) {
    findings.push({
      code: 'missing-chrome-image',
      message: `Expected chrome image ${expectedSrc} is missing.`,
      selector,
    });
    return;
  }

  const state = await image.evaluate((node) => {
    const img = node as HTMLImageElement;
    return {
      complete: img.complete,
      naturalHeight: img.naturalHeight,
      naturalWidth: img.naturalWidth,
      src: img.getAttribute('src') ?? '',
    };
  });

  if (!state.src.includes(expectedSrc)) {
    findings.push({
      code: 'unexpected-chrome-image-src',
      message: `Expected ${expectedSrc}, rendered ${state.src}.`,
      selector,
    });
  }

  if (!state.complete || state.naturalWidth <= 0 || state.naturalHeight <= 0) {
    findings.push({
      code: 'broken-chrome-image',
      message: `Chrome image did not load: ${state.src || expectedSrc}.`,
      selector,
    });
  }
}

async function resolveLazyMedia(page: Page): Promise<void> {
  await page.evaluate(`(async function() {
    const wait = function(ms) {
      return new Promise(function(resolve) {
        window.setTimeout(resolve, ms);
      });
    };
    const steps = Math.max(2, Math.ceil(document.documentElement.scrollHeight / window.innerHeight));

    for (let index = 0; index <= steps; index += 1) {
      window.scrollTo(0, (document.documentElement.scrollHeight * index) / steps);
      await wait(80);
    }

    window.scrollTo(0, 0);

    const pendingImages = Array.from(document.images)
      .filter(function(image) {
        return !image.complete;
      })
      .map(function(image) {
        return new Promise(function(resolve) {
          image.addEventListener('load', function() { resolve(); }, { once: true });
          image.addEventListener('error', function() { resolve(); }, { once: true });
        });
      });

    await Promise.race([
      Promise.all(pendingImages),
      wait(1500),
    ]);
  })()`);
}

async function settleFooter(page: Page): Promise<void> {
  await page.locator('.footer').scrollIntoViewIfNeeded();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(500);
}

async function assertLinks(findings: Finding[], page: Page, selector: string, code: string, expectedMinimum: number): Promise<void> {
  const links = page.locator(selector);
  const count = await links.count();

  if (count < expectedMinimum) {
    findings.push({
      code,
      message: `Expected at least ${expectedMinimum} links, found ${count}.`,
      selector,
    });
    return;
  }

  for (let index = 0; index < count; index += 1) {
    const href = await links.nth(index).getAttribute('href');

    if (!href || href.trim() === '') {
      findings.push({
        code: 'empty-chrome-link',
        message: `Chrome link ${selector}[${index}] has no href.`,
        selector,
      });
    }
  }
}

async function assertSocialPlatforms(findings: Finding[], page: Page): Promise<void> {
  for (const link of siteChrome.socialLinks) {
    const selector = `.footer__social-link[data-social-platform="${link.platform}"]`;
    const count = await page.locator(selector).count();

    if (count === 0) {
      findings.push({
        code: 'missing-footer-social-platform',
        message: `Footer social platform is missing: ${link.platform}.`,
        selector,
      });
      continue;
    }

    const href = await page.locator(selector).first().getAttribute('href');

    if (href !== link.href) {
      findings.push({
        code: 'wrong-footer-social-href',
        message: `Footer ${link.platform} href mismatch. Expected ${link.href}, rendered ${href ?? '<empty>'}.`,
        selector,
      });
    }

    await assertImageLoaded(findings, page, `${selector} .footer__social-icon`, link.icon.src);
  }
}

function normalizeRoute(value: string): string {
  const trimmed = value.trim();

  if (!trimmed) {
    return '';
  }

  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
}
