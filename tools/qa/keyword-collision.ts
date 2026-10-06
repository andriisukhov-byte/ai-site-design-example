/**
 * Does this route or focus keyword already belong to a page?
 *
 * The marketing LP skills end their intake with "check the content plan and the
 * LP tracker" - two artifacts that do not exist in this repo. What does exist is
 * better: a content snapshot, a running CMS, and the site navigation. Two cluster
 * pages splitting one keyword is the most expensive error available on these
 * pages, because they carry the paid search spend, and "the local DB has no such
 * page" has already been wrong once - the DB is seeded from a smaller, older
 * export than `data/cms/pages.json`.
 *
 * Checks, in the order they have historically failed:
 *   1. exact route taken, in any collection
 *   2. synonym route taken (/lead-qualification-agent/ vs /ai-lead-qualification/)
 *   3. keyword already owned by another page's H1 or meta title
 *   4. navigation links to the route, which means the slot was planned for you
 *
 * Usage:
 *   npm run qa:keyword-collision -- --keyword "ai receptionist for cleaning companies" --path /ai-receptionist-for-cleaning-companies/
 *   npm run qa:keyword-collision -- --path /new-route/ --api http://localhost:3000/api --token "$TOKEN"
 */
import { readFile } from 'node:fs/promises';

type Finding = { code: string; severity: 'blocker' | 'warning'; message: string; where?: string };

const args = process.argv.slice(2);
const keyword = readArg('--keyword');
const routeArg = readArg('--path');
const snapshotPath = readArg('--snapshot') ?? 'data/cms/pages.json';
const apiUrl = readArg('--api');
const token = readArg('--token') ?? process.env.PAYLOAD_TOKEN;

function readArg(flag: string): string | undefined {
  const index = args.indexOf(flag);
  if (index === -1) return undefined;
  const value = args[index + 1];
  return value && !value.startsWith('--') ? value : undefined;
}

if (!keyword && !routeArg) {
  console.error('Nothing to check. Pass --keyword and/or --path.');
  process.exit(2);
}

type PageLike = {
  path?: string;
  title?: string;
  collection?: string;
  contentKey?: string;
  status?: string;
  seo?: { metaTitle?: string; metaDescription?: string };
  blocks?: Array<Record<string, unknown>>;
};

const findings: Finding[] = [];

function normalizeRoute(value: string): string {
  return `/${value.replace(/^\/+|\/+$/g, '')}/`.toLowerCase();
}

/** Route tokens minus the words that vary between synonym routes. */
function routeTokens(route: string): string[] {
  const stop = new Set(['ai', 'for', 'the', 'a', 'an', 'and', 'with', 'your', 'agent', 'agents']);
  return normalizeRoute(route)
    .replace(/[^a-z0-9-]/g, '-')
    .split('-')
    .filter((token) => token.length > 2 && !stop.has(token));
}

function renderedH1(page: PageLike): string | undefined {
  const hero = page.blocks?.find((block) => block.type === 'hero' || block.type === 'hero-extended');
  if (!hero) return undefined;
  // The renderer promotes eyebrow to <h1> and demotes title to <p> when eyebrow is set.
  const eyebrow = typeof hero.eyebrow === 'string' ? hero.eyebrow : undefined;
  const title = typeof hero.title === 'string' ? hero.title : undefined;
  return eyebrow || title;
}

function stripMarkers(value: string): string {
  return value.replace(/\{\{|\}\}/g, '').replace(/\|\|/g, ' ').replace(/\s+/g, ' ').trim();
}

async function loadSnapshot(): Promise<PageLike[]> {
  const raw = JSON.parse(await readFile(snapshotPath, 'utf8')) as unknown;
  const pages = (Array.isArray(raw) ? raw : (raw as { pages?: unknown[] }).pages ?? []) as PageLike[];
  return pages;
}

async function loadFromApi(): Promise<PageLike[]> {
  if (!apiUrl) return [];
  const collections = ['pages', 'use-cases', 'posts', 'guides', 'news', 'tips'];
  const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};
  if (!token) {
    findings.push({
      code: 'no-token',
      severity: 'warning',
      message: 'API queried without a token - drafts are invisible, so an absent page may still exist as a draft',
    });
  }
  const out: PageLike[] = [];
  for (const collection of collections) {
    try {
      const response = await fetch(`${apiUrl}/${collection}?limit=500&depth=0`, { headers });
      if (!response.ok) {
        findings.push({ code: 'api-error', severity: 'warning', message: `${collection}: HTTP ${response.status}` });
        continue;
      }
      const body = (await response.json()) as { docs?: PageLike[] };
      for (const doc of body.docs ?? []) out.push({ ...doc, collection });
    } catch (error) {
      findings.push({ code: 'api-unreachable', severity: 'warning', message: `${collection}: ${(error as Error).message}` });
    }
  }
  return out;
}

const [snapshot, live] = await Promise.all([loadSnapshot(), loadFromApi()]);
const universe = [...snapshot, ...live];

if (routeArg) {
  const route = normalizeRoute(routeArg);
  for (const page of universe) {
    if (!page.path) continue;
    if (normalizeRoute(page.path) === route) {
      findings.push({
        code: 'route-taken',
        severity: 'blocker',
        message: `route already belongs to "${page.title ?? page.contentKey}" in ${page.collection ?? 'unknown collection'} (${page.status ?? 'unknown status'})`,
        where: page.path,
      });
    }
  }

  const target = routeTokens(route);
  if (target.length > 0) {
    for (const page of universe) {
      if (!page.path) continue;
      const other = normalizeRoute(page.path);
      if (other === route) continue;
      const otherTokens = routeTokens(other);
      const shared = target.filter((token) => otherTokens.includes(token));
      if (shared.length >= 2 && shared.length >= Math.min(target.length, otherTokens.length) - 1) {
        findings.push({
          code: 'synonym-route',
          severity: 'warning',
          message: `possible synonym route sharing [${shared.join(', ')}] - confirm these are different intents`,
          where: `${page.path} (${page.collection ?? '?'})`,
        });
      }
    }
  }
}

if (keyword) {
  const needle = keyword.toLowerCase().trim();
  for (const page of universe) {
    const h1 = renderedH1(page);
    if (h1 && stripMarkers(h1).toLowerCase() === needle) {
      findings.push({
        code: 'keyword-owned-by-h1',
        severity: 'blocker',
        message: `"${keyword}" is already the rendered H1 of another page`,
        where: `${page.path} (${page.collection ?? '?'})`,
      });
    }
    const metaTitle = page.seo?.metaTitle?.toLowerCase();
    if (metaTitle && metaTitle.includes(needle)) {
      findings.push({
        code: 'keyword-in-meta-title',
        severity: 'warning',
        message: `"${keyword}" already appears in another page's meta title`,
        where: `${page.path} (${page.collection ?? '?'})`,
      });
    }
  }
}

const report = {
  ok: findings.every((finding) => finding.severity !== 'blocker'),
  checked: { keyword: keyword ?? null, path: routeArg ?? null },
  sources: {
    snapshot: `${snapshotPath} (${snapshot.length} docs)`,
    api: apiUrl ? `${apiUrl} (${live.length} docs${token ? ', with token' : ', NO token - drafts hidden'})` : 'not queried',
  },
  reminder:
    'Route freedom needs all three sources: the running CMS with a token, this snapshot, and the site navigation in Payload → Site settings. Navigation linking to a missing route means the slot was planned.',
  findings,
};

console.log(JSON.stringify(report, null, 2));
if (!report.ok) process.exitCode = 1;
