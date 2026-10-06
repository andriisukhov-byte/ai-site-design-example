/**
 * Every block type the schema accepts must also appear in the block registry.
 *
 * The registry is the only catalog the page-generation skills read. A type that
 * validates and renders but is missing from the registry is invisible to them,
 * so the generator invents a new block for a section that already had a home.
 * That is exactly how `media-showcase` — used on 15 live pages — went missing
 * and a net-new block was designed for the "in action" slot.
 */
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const repoRoot = join(import.meta.dirname, '..', '..');
const schemasPath = join(repoRoot, 'packages/blocks/src/schemas.ts');
const registryPath = join(repoRoot, 'packages/blocks/src/registry.ts');
const rendererPath = join(repoRoot, 'apps/web/src/components/BlockRenderer.astro');

function unique(values: string[]): string[] {
  return [...new Set(values)].sort();
}

function matchAll(source: string, pattern: RegExp): string[] {
  return [...source.matchAll(pattern)].map((match) => match[1]);
}

const [schemas, registry, renderer] = await Promise.all([
  readFile(schemasPath, 'utf8'),
  readFile(registryPath, 'utf8'),
  readFile(rendererPath, 'utf8'),
]);

const schemaTypes = unique(matchAll(schemas, /type: z\.literal\('([a-z0-9-]+)'\)/g));
const registryTypes = unique(matchAll(registry, /^\s{4}type: '([a-z0-9-]+)',$/gm));
const renderedTypes = unique(matchAll(renderer, /^\s*'?([a-z0-9-]+)'?: \w+Block,$/gm));

const missingFromRegistry = schemaTypes.filter((type) => !registryTypes.includes(type));
const missingFromSchema = registryTypes.filter((type) => !schemaTypes.includes(type));
const registeredButNotRendered = registryTypes.filter((type) => !renderedTypes.includes(type));

const findings: string[] = [];
for (const type of missingFromRegistry) {
  findings.push(`${type}: in schemas.ts but not in registry.ts — the page generator cannot see it`);
}
for (const type of missingFromSchema) {
  findings.push(`${type}: in registry.ts but not in schemas.ts — the generator can emit it and validation will reject it`);
}
for (const type of registeredButNotRendered) {
  findings.push(`${type}: in registry.ts but not dispatched in BlockRenderer.astro — it would render as nothing`);
}

const report = {
  ok: findings.length === 0,
  counts: {
    schema: schemaTypes.length,
    registry: registryTypes.length,
    rendered: renderedTypes.length,
  },
  findings,
};

console.log(JSON.stringify(report, null, 2));

if (!report.ok) {
  process.exitCode = 1;
}
