import { chromium, type Page } from '@playwright/test';

import { argString, parseArgs } from '../migrate/source-utils';

type Finding = {
  code: string;
  message: string;
  selector?: string;
};

const args = parseArgs();
const baseUrl = argString(args, 'base', 'http://127.0.0.1:4321')!;
const route = argString(args, 'route', '/')!;
const selector = argString(args, 'selector');
const expectedClass = argString(args, 'expected-class');
const minCards = argNumber('min-cards', 0);
const minGradients = argNumber('min-gradients', 0);
const minChannels = argNumber('min-channels', 0);
const requireNote = argFlag('require-note');
const findings: Finding[] = [];

if (!selector) {
  findings.push({
    code: 'missing-selector-arg',
    message: 'Pass --selector with the block root selector to smoke.',
  });
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1600 } });

try {
  const response = await page.goto(new URL(route, baseUrl).toString(), { waitUntil: 'networkidle' });

  if (!response?.ok()) {
    findings.push({
      code: 'route-not-ok',
      message: `Block smoke route returned ${response?.status() ?? 'no response'}.`,
    });
  }

  await resolveLazyMedia(page);

  if (selector) {
    await assertBlock(page, selector);
  }
} finally {
  await browser.close();
}

const result = {
  ok: findings.length === 0,
  baseUrl,
  route,
  selector,
  expectedClass,
  minCards,
  minGradients,
  minChannels,
  requireNote,
  findingCount: findings.length,
  findings,
};

console.log(JSON.stringify(result, null, 2));

if (findings.length > 0) {
  process.exit(1);
}

async function assertBlock(page: Page, rootSelector: string): Promise<void> {
  const block = page.locator(rootSelector).first();
  const count = await block.count();

  if (count === 0) {
    findings.push({
      code: 'missing-block',
      message: `Block root was not found: ${rootSelector}.`,
      selector: rootSelector,
    });
    return;
  }

  if (!(await block.isVisible())) {
    findings.push({
      code: 'hidden-block',
      message: `Block root exists but is hidden: ${rootSelector}.`,
      selector: rootSelector,
    });
  }

  await block.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.evaluate(`(async function() {
    const element = document.querySelector(${JSON.stringify(rootSelector)});

    if (!element) {
      return;
    }

    const wait = function(ms) {
      return new Promise(function(resolve) {
        window.setTimeout(resolve, ms);
      });
    };

    const images = Array.from(element.querySelectorAll('img'));

    await Promise.race([
      Promise.all(images.map(async function(image) {
        if (image.complete && image.naturalWidth > 0) {
          return;
        }

        if ('decode' in image) {
          try {
            await image.decode();
            return;
          } catch {
            // Fall back to load/error listeners below.
          }
        }

        await new Promise(function(resolve) {
          image.addEventListener('load', function() { resolve(); }, { once: true });
          image.addEventListener('error', function() { resolve(); }, { once: true });
        });
      })),
      wait(3000),
    ]);
  })()`);

  const state = await page.evaluate(`(async function() {
    const root = document.querySelector(${JSON.stringify(rootSelector)});

    if (!root) {
      return undefined;
    }

    const images = await Promise.all(
      Array.from(root.querySelectorAll('img')).map(async function(image) {
        const src = image.currentSrc || image.getAttribute('src') || '';
        const isVector = /\.svg(?:[?#]|$)/i.test(src);
        let fetchOk = false;

        if (src && isVector) {
          try {
            const response = await fetch(src, { method: 'HEAD' });
            fetchOk = response.ok;
          } catch {
            fetchOk = false;
          }
        }

        return {
          src,
          complete: image.complete,
          naturalHeight: image.naturalHeight,
          naturalWidth: image.naturalWidth,
          fetchOk,
          isVector,
        };
      }),
    );

    return {
      className: root.className,
      cardCount: Array.from(root.querySelectorAll('*')).filter((element) => {
        return Array.from(element.classList).some((className) => {
          return /(?:__card|__item|__stat|__logo|^metric-card)$/.test(className);
        });
      }).length,
      channelCount: root.querySelectorAll('[class*="__channels"]').length,
      gradientCount: root.querySelectorAll('.ca-gradient-text').length,
      hasNote: Boolean(root.querySelector('[class*="__note"]')),
      imageFailures: images.filter((image) => {
        const hasIntrinsicSize = image.naturalWidth > 0 && image.naturalHeight > 0;
        return !image.complete || (!hasIntrinsicSize && !(image.isVector && image.fetchOk));
      }),
    };
  })()`);

  if (!state) {
    findings.push({
      code: 'missing-block-state',
      message: `Block root disappeared before state inspection: ${rootSelector}.`,
      selector: rootSelector,
    });
    return;
  }

  if (expectedClass && !String(state.className).includes(expectedClass)) {
    findings.push({
      code: 'missing-expected-class',
      message: `Expected block class "${expectedClass}", rendered "${state.className}".`,
      selector: rootSelector,
    });
  }

  if (state.cardCount < minCards) {
    findings.push({
      code: 'not-enough-cards',
      message: `Expected at least ${minCards} cards, found ${state.cardCount}.`,
      selector: rootSelector,
    });
  }

  if (state.gradientCount < minGradients) {
    findings.push({
      code: 'not-enough-gradient-spans',
      message: `Expected at least ${minGradients} gradient spans, found ${state.gradientCount}.`,
      selector: rootSelector,
    });
  }

  if (state.channelCount < minChannels) {
    findings.push({
      code: 'not-enough-channel-rows',
      message: `Expected at least ${minChannels} channel rows, found ${state.channelCount}.`,
      selector: rootSelector,
    });
  }

  if (requireNote && !state.hasNote) {
    findings.push({
      code: 'missing-note',
      message: 'Expected a block note, but no note element was rendered.',
      selector: rootSelector,
    });
  }

  for (const image of state.imageFailures) {
    findings.push({
      code: 'broken-block-image',
      message: `Block image did not load: ${image.src || '<empty src>'}.`,
      selector: rootSelector,
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
          image.addEventListener('load', function() { resolve(undefined); }, { once: true });
          image.addEventListener('error', function() { resolve(undefined); }, { once: true });
        });
      });

    await Promise.race([
      Promise.all(pendingImages),
      wait(1500),
    ]);
  })()`);
}

function argNumber(key: string, fallback: number): number {
  const raw = argString(args, key);
  const value = raw ? Number(raw) : NaN;

  return Number.isFinite(value) ? value : fallback;
}

function argFlag(key: string): boolean {
  return args[key] === true || args[key] === 'true';
}
