/**
 * Export the block registry as a plain-language catalog for the marketing LP skills.
 *
 * Those skills run in Claude.ai without this repository, so they cannot read
 * `registry.ts`. Without a catalog they ask for sections the site cannot render,
 * which lands on the page pipeline as an unbuildable brief. This keeps one
 * generated file in sync instead of a hand-maintained list that drifts.
 *
 * Usage: npm run ai:block-catalog
 */
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const repoRoot = join(import.meta.dirname, '..', '..');
const registryPath = join(repoRoot, 'packages/blocks/src/registry.ts');
const outPath = join(repoRoot, 'ai/marketing-skills/acme-lp-handoff/references/blocks-available.md');

const registry = await readFile(registryPath, 'utf8');

type Entry = { type: string; role: string; summary: string; guidance: string; idealItems?: string };

const entries: Entry[] = [];
const blockPattern = /\{\s*type: '([a-z0-9-]+)',([\s\S]*?)\n {2}\}/g;

for (const match of registry.matchAll(blockPattern)) {
  const [, type, body] = match;
  const role = body.match(/role: '([a-z-]+)'/)?.[1] ?? 'unknown';
  const guidance = body.match(/aiGuidance:\s*'([^']*)'/)?.[1] ?? body.match(/aiGuidance:\s*"([^"]*)"/)?.[1] ?? '';
  const description = body.match(/description:\s*'([^']*)'/)?.[1] ?? '';
  const items = body.match(/idealItems:\s*\{\s*field: '([a-zA-Z]+)',\s*min: (\d+),\s*max: (\d+)/);
  entries.push({
    type,
    role,
    summary: (description || guidance).replace(/\s+/g, ' ').slice(0, 240),
    guidance: guidance.replace(/\s+/g, ' ').slice(0, 240),
    idealItems: items ? `${items[1]}: ${items[2]}-${items[3]}` : undefined,
  });
}

const byRole = new Map<string, Entry[]>();
for (const entry of entries) {
  byRole.set(entry.role, [...(byRole.get(entry.role) ?? []), entry]);
}

const lines: string[] = [
  '# Sections the site can render',
  '',
  `Generated from \`packages/blocks/src/registry.ts\` - ${entries.length} registered block types. Do not edit by hand; run \`npm run ai:block-catalog\`.`,
  '',
  'A page is composed only from these. If a section you want to write has no entry here, the site cannot render it - say so in the brief instead of describing the visual, and the design side will either map it to the closest entry or grow a new block through its own approval track.',
  '',
];

for (const [role, roleEntries] of [...byRole.entries()].sort()) {
  lines.push(`## ${role}`, '');
  lines.push('| Block | What it is | How many items | When to use it |');
  lines.push('|---|---|---|---|');
  for (const entry of roleEntries.sort((a, b) => a.type.localeCompare(b.type))) {
    const cell = (value: string) => value.replace(/\|/g, '\\|') || '-';
    lines.push(`| \`${entry.type}\` | ${cell(entry.summary)} | ${entry.idealItems ?? '-'} | ${cell(entry.guidance)} |`);
  }
  lines.push('');
}

await writeFile(outPath, `${lines.join('\n')}\n`, 'utf8');
console.log(JSON.stringify({ ok: true, blocks: entries.length, out: outPath }, null, 2));
