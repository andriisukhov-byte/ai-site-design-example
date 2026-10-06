import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { config as loadEnv } from 'dotenv';
import { getPayload } from 'payload';
import { siteChrome, type MegaMenuEntry, type PrimaryNavigationItem } from '@acme/config';

type NavigationOperation = {
  menuLabel: string;
  itemLabel: string;
  href: string;
};

type NavigationPlan = {
  operations?: NavigationOperation[];
};

const args = parseArgs();
const file = stringArg(args, 'file');
const target = stringArg(args, 'target', 'api');
const shouldWrite = args.write === true || args.write === 'true';

if (!file) {
  console.error('Usage: npm run cms:navigation -- --file path/to/navigation.json --write true --target api|local');
  process.exit(1);
}
if (target !== 'api' && target !== 'local') {
  throw new Error(`Unsupported --target ${target}. Use api or local.`);
}

const plan = JSON.parse(await readFile(file, 'utf8')) as NavigationPlan;
const operations = (plan.operations ?? []).map(validateOperation);
if (!operations.length) throw new Error('Navigation plan must contain at least one operation.');

if (!shouldWrite) {
  console.log(JSON.stringify({ ok: true, action: 'validated', target, file, operations, note: 'Dry run. Re-run with --write true to update Site settings.' }, null, 2));
  process.exit(0);
}

const navigation = target === 'api'
  ? await updateViaApi(operations)
  : await updateLocally(operations);
console.log(JSON.stringify({ ok: true, action: 'updated', target, file, operations, primaryNavigation: navigation }, null, 2));

async function updateViaApi(operationsToApply: NavigationOperation[]): Promise<PrimaryNavigationItem[]> {
  const apiUrl = stringArg(args, 'api-url', process.env.PAYLOAD_API_URL ?? 'http://localhost:3000/api')!;
  const token = stringArg(args, 'token', process.env.PAYLOAD_API_TOKEN);
  const headers = { accept: 'application/json', 'content-type': 'application/json', ...(token ? { authorization: `Bearer ${token}` } : {}) };
  const endpoint = `${apiUrl.replace(/\/+$/, '')}/globals/site-settings`;
  const currentResponse = await fetch(endpoint, { headers });
  if (!currentResponse.ok) throw await apiError('read', currentResponse);
  const current = await currentResponse.json() as { primaryNavigation?: unknown };
  const primaryNavigation = applyOperations(parseNavigation(current.primaryNavigation), operationsToApply);
  const response = await fetch(endpoint, { method: 'PATCH', headers, body: JSON.stringify({ primaryNavigation }) });
  if (!response.ok) throw await apiError('update', response);
  return parseNavigation((await response.json() as { primaryNavigation?: unknown }).primaryNavigation);
}

async function updateLocally(operationsToApply: NavigationOperation[]): Promise<PrimaryNavigationItem[]> {
  loadCmsEnv();
  const { default: payloadConfig } = await import('../../apps/cms/src/payload.config');
  const payload = await getPayload({ config: payloadConfig });
  try {
    const current = await payload.findGlobal({ slug: 'site-settings', depth: 0, overrideAccess: true });
    const primaryNavigation = applyOperations(parseNavigation(current.primaryNavigation), operationsToApply);
    const updated = await payload.updateGlobal({ slug: 'site-settings', data: { primaryNavigation }, overrideAccess: true });
    return parseNavigation(updated.primaryNavigation);
  } finally {
    await payload.destroy();
  }
}

function applyOperations(current: PrimaryNavigationItem[], operationsToApply: NavigationOperation[]): PrimaryNavigationItem[] {
  const navigation = structuredClone(current.length ? current : siteChrome.primaryNavigation);
  for (const operation of operationsToApply) {
    const menu = navigation.find((entry) => entry.label === operation.menuLabel);
    if (!menu) throw new Error(`Primary menu ${operation.menuLabel} does not exist.`);
    if (menu.variant !== 'mega' || !menu.items) throw new Error(`Primary menu ${operation.menuLabel} is not a mega menu.`);
    const item = menu.items.find((entry) => entry.label === operation.itemLabel);
    if (!item) throw new Error(`Menu item ${operation.itemLabel} does not exist in ${operation.menuLabel}.`);
    item.href = operation.href;
  }
  return navigation;
}

function parseNavigation(value: unknown): PrimaryNavigationItem[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== 'object' || Array.isArray(item)) return [];
    const record = item as Record<string, unknown>;
    if (typeof record.label !== 'string' || typeof record.href !== 'string') return [];
    const variant = record.variant === 'mega' ? 'mega' : 'link';
    return [{ label: record.label, href: record.href, variant, ...(variant === 'mega' ? { items: parseMegaItems(record.items) } : {}) }];
  });
}

function parseMegaItems(value: unknown): MegaMenuEntry[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== 'object' || Array.isArray(item)) return [];
    const record = item as Record<string, unknown>;
    if (typeof record.label !== 'string' || typeof record.href !== 'string') return [];
    const role = ['link', 'heading', 'span-heading', 'all'].includes(String(record.role)) ? record.role as MegaMenuEntry['role'] : 'link';
    return [{ label: record.label, href: record.href, role, ...(typeof record.icon === 'string' ? { icon: record.icon } : {}), ...(record.startColumn === true ? { startColumn: true } : {}), ...(record.startRow === true ? { startRow: true } : {}) }];
  });
}

function validateOperation(value: NavigationOperation): NavigationOperation {
  if (!value || typeof value.menuLabel !== 'string' || typeof value.itemLabel !== 'string' || typeof value.href !== 'string') {
    throw new Error('Every navigation operation requires menuLabel, itemLabel, and href.');
  }
  if (!value.href.startsWith('/') || !value.href.endsWith('/')) {
    throw new Error(`Navigation href must be an internal trailing-slash path: ${value.href}`);
  }
  return value;
}

async function apiError(action: string, response: Response): Promise<Error> {
  return new Error(`Payload API navigation ${action} failed: HTTP ${response.status} ${(await response.text()).slice(0, 600)}`);
}

function loadCmsEnv(): void {
  loadEnv({ path: resolve('apps/cms/.env') });
  if (process.env.DATABASE_URL?.startsWith('file:./')) {
    process.env.DATABASE_URL = `file:${resolve('apps/cms', process.env.DATABASE_URL.slice('file:./'.length)).replace(/\\/g, '/')}`;
  }
  process.env.PAYLOAD_MCP_DISABLED ??= 'true';
  process.env.PAYLOAD_MIGRATING ??= 'true';
}

function parseArgs(argv = process.argv.slice(2)): Record<string, string | boolean> {
  const result: Record<string, string | boolean> = {};
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (!argument?.startsWith('--')) continue;
    const key = argument.slice(2);
    const next = argv[index + 1];
    result[key] = !next || next.startsWith('--') ? true : next;
    if (typeof result[key] === 'string') index += 1;
  }
  return result;
}

function stringArg(values: Record<string, string | boolean>, key: string, fallback?: string): string | undefined {
  return typeof values[key] === 'string' ? values[key] : fallback;
}
