/**
 * Prove the pipeline did not rewrite the author's copy.
 *
 * Marketing-written text is transported byte for byte (mode R1 in
 * `ai/contracts/lp-handoff.md`). "We did not touch it" is worth nothing as a
 * claim, because the failure mode is invisible: a tightened sentence, a
 * normalized dash, a dropped article all look like better copy in review. So the
 * guarantee is mechanical - every value in `lp.md` must appear in the built page
 * unchanged, and anything that does not is reported as an alteration with the
 * closest match, so the diff is obvious.
 *
 * The reverse direction is reported too: copy in the page that the author never
 * wrote. That is legitimate for mechanical fields (step labels, icons, ALT the
 * author omitted) and it is exactly what has to be declared in the batch review
 * under "Written by the pipeline" - so the check lists it rather than failing it.
 *
 * Usage:
 *   npm run qa:copy-fidelity -- --lp data/ai-page-generation/<batch>/lp.md --file data/ai-page-generation/<batch>/pages.json
 */
import { readFile } from 'node:fs/promises';

type Field = { section: string; key: string; value: string };
type Finding = { code: string; severity: 'blocker' | 'note'; section?: string; key?: string; message: string; expected?: string; found?: string };

const args = process.argv.slice(2);
const lpPath = readArg('--lp');
const pagesPath = readArg('--file');

function readArg(flag: string): string | undefined {
  const index = args.indexOf(flag);
  if (index === -1) return undefined;
  const value = args[index + 1];
  return value && !value.startsWith('--') ? value : undefined;
}

if (!lpPath || !pagesPath) {
  console.error('Usage: qa:copy-fidelity -- --lp <lp.md> --file <pages.json>');
  process.exit(2);
}

/** Lines that describe the page rather than appear on it. */
const META_KEYS = new Set([
  'focus keyword', 'secondary', 'long-tail', 'lsi', 'target audience', 'buyer intent',
  'gtm angle', 'keywords', 'technology cluster link', 'sibling cluster pages',
  'sections skipped', 'open inputs', 'lp tracker reference', 'category / term',
  'primary audience type', 'canonical url', 'primary cta', 'secondary cta',
]);

function parseLp(source: string): Field[] {
  const fields: Field[] = [];
  let section = 'header';
  let inBriefHeader = false;

  for (const rawLine of source.split('\n')) {
    const line = rawLine.trim();
    if (!line) continue;

    const heading = line.match(/^#{2,3}\s*(S\d+|Sources|Category Definition)\b\s*-?\s*(.*)$/i);
    if (heading) {
      section = heading[1].toUpperCase();
      inBriefHeader = false;
      continue;
    }
    if (/^-{3,}$/.test(line) || /^LP BRIEF/i.test(line)) {
      inBriefHeader = !inBriefHeader;
      continue;
    }
    if (inBriefHeader) continue;
    if (line.startsWith('#')) continue;

    const field = line.match(/^([A-Za-z][A-Za-z0-9 /]{1,40}?):\s*(.+)$/);
    if (!field) continue;

    const key = field[1].trim();
    const value = field[2].trim();
    if (META_KEYS.has(key.toLowerCase())) continue;
    // "Get Started Free -> /signup" carries a label and a route; only the label is copy.
    const label = value.split('->')[0].trim();
    if (label.length < 2) continue;
    fields.push({ section, key, value: label });
  }
  return fields;
}

/** Every string the built page shows a reader, flattened with its JSON path. */
function collectStrings(node: unknown, path: string, out: Map<string, string[]>): void {
  if (typeof node === 'string') {
    if (node.trim().length > 1 && !/^[\/#.]/.test(node) && !/^https?:/.test(node)) {
      out.set(node, [...(out.get(node) ?? []), path]);
    }
    return;
  }
  if (Array.isArray(node)) {
    node.forEach((item, index) => collectStrings(item, `${path}[${index}]`, out));
    return;
  }
  if (node && typeof node === 'object') {
    for (const [key, value] of Object.entries(node)) {
      collectStrings(value, path ? `${path}.${key}` : key, out);
    }
  }
}

/** Renderer markup the author's plain sentence is allowed to acquire. */
function unmark(value: string): string {
  return value
    .replace(/<[^>]+>/g, '')
    .replace(/\{\{\s*/g, '')
    .replace(/\s*\}\}/g, '')
    .replace(/\|\|/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function similarity(a: string, b: string): number {
  const left = new Set(a.toLowerCase().split(/\s+/));
  const right = new Set(b.toLowerCase().split(/\s+/));
  if (left.size === 0 || right.size === 0) return 0;
  let shared = 0;
  for (const word of left) if (right.has(word)) shared += 1;
  return shared / Math.max(left.size, right.size);
}

const [lpSource, pagesRaw] = await Promise.all([readFile(lpPath, 'utf8'), readFile(pagesPath, 'utf8')]);
const parsed = JSON.parse(pagesRaw) as unknown;
const pages = (Array.isArray(parsed) ? parsed : (parsed as { pages?: unknown[] }).pages ?? []) as unknown[];

const pageStrings = new Map<string, string[]>();
for (const page of pages) collectStrings(page, '', pageStrings);
const normalized = new Map<string, string>();
for (const value of pageStrings.keys()) normalized.set(unmark(value), value);

const fields = parseLp(lpSource);
const findings: Finding[] = [];
const matched = new Set<string>();

for (const field of fields) {
  const target = unmark(field.value);
  const exact = normalized.get(target);
  if (exact) {
    matched.add(exact);
    continue;
  }

  let best: { value: string; score: number } | undefined;
  for (const [candidate, original] of normalized) {
    const score = similarity(target, candidate);
    if (score > (best?.score ?? 0)) best = { value: original, score };
  }

  if (best && best.score >= 0.55) {
    matched.add(best.value);
    findings.push({
      code: 'copy-altered',
      severity: 'blocker',
      section: field.section,
      key: field.key,
      message: `the author wrote this, the page shows something else (${Math.round(best.score * 100)}% of words shared)`,
      expected: field.value,
      found: best.value,
    });
  } else {
    findings.push({
      code: 'copy-missing',
      severity: 'blocker',
      section: field.section,
      key: field.key,
      message: 'the author wrote this and it is not on the page',
      expected: field.value,
    });
  }
}

const authored = new Set(fields.map((field) => unmark(field.value)));
const generated: Array<{ path: string; value: string }> = [];
for (const [value, paths] of pageStrings) {
  if (matched.has(value)) continue;
  if (authored.has(unmark(value))) continue;
  if (unmark(value).split(/\s+/).length < 2) continue;
  generated.push({ path: paths[0], value });
}
if (generated.length > 0) {
  findings.push({
    code: 'written-by-pipeline',
    severity: 'note',
    message: `${generated.length} strings on the page are not in lp.md - list every one in the batch review under "Written by the pipeline" for the author to approve`,
  });
}

const report = {
  ok: findings.every((finding) => finding.severity !== 'blocker'),
  lp: lpPath,
  page: pagesPath,
  counts: {
    authoredFields: fields.length,
    transportedVerbatim: fields.length - findings.filter((f) => f.severity === 'blocker').length,
    altered: findings.filter((f) => f.code === 'copy-altered').length,
    missing: findings.filter((f) => f.code === 'copy-missing').length,
    writtenByPipeline: generated.length,
  },
  findings,
  writtenByPipeline: generated.slice(0, 60),
};

console.log(JSON.stringify(report, null, 2));
if (!report.ok) process.exitCode = 1;
