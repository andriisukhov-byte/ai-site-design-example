import { readFile, readdir, writeFile } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';

type Finding = {
  code: string;
  file: string;
  message: string;
  sample?: string;
};

const distDir = argString('dist', 'apps/web/dist')!;
const out = argString('out');
const files = (await listFiles(distDir)).filter((file) => extname(file) === '.html');
const findings: Finding[] = [];
let formCount = 0;
let acmeFormCount = 0;

for (const file of files) {
  const html = await readFile(file, 'utf8');
  const forms = [...html.matchAll(/<form\b[^>]*>[\s\S]*?<\/form>/gi)].map((match) => match[0]);

  formCount += forms.length;

  if (/\bwpcf7\b|contact-form-7|wp-json\/contact-form-7|wp-content\/plugins\/contact-form-7/i.test(html)) {
    findings.push({
      code: 'wordpress-form-trace',
      file: normalizePath(relative(process.cwd(), file)),
      message: 'Built form HTML must not expose Contact Form 7 or WordPress form runtime traces.',
    });
  }

  for (const form of forms) {
    const attrs = formStartTag(form);
    const isAcmeForm = /\bdata-acme-form\b/i.test(attrs);

    if (!isAcmeForm) {
      continue;
    }

    acmeFormCount += 1;
    checkAcmeForm(file, attrs, form);
  }
}

if (acmeFormCount === 0) {
  findings.push({
    code: 'missing-acme-forms',
    file: distDir,
    message: 'At least one first-party form must render in the built site.',
  });
}

const result = {
  ok: findings.length === 0,
  distDir,
  htmlFiles: files.length,
  formCount,
  acmeFormCount,
  findingCount: findings.length,
  findings,
};

if (out) {
  await writeFile(out, `${JSON.stringify(result, null, 2)}\n`, 'utf8');
}

console.log(JSON.stringify(result, null, 2));

if (findings.length > 0) {
  process.exit(1);
}

function checkAcmeForm(file: string, attrs: string, form: string) {
  const normalizedFile = normalizePath(relative(process.cwd(), file));

  if (!/\bmethod=(["'])post\1/i.test(attrs)) {
    findings.push({
      code: 'missing-post-method',
      file: normalizedFile,
      message: 'First-party forms must submit with method="post".',
      sample: attrs,
    });
  }

  const action = attrValue(attrs, 'action');
  if (!action || action === '/contact-us/' || action.includes('wp-json') || action.includes('admin-ajax.php')) {
    findings.push({
      code: 'invalid-form-action',
      file: normalizedFile,
      message: 'First-party forms must point to the product-owned form endpoint, not a page redirect or WordPress endpoint.',
      sample: action,
    });
  }

  if (!/<input\b[^>]*\btype=(["'])hidden\1[^>]*\bname=(["'])formIntent\2/i.test(form)) {
    findings.push({
      code: 'missing-form-intent',
      file: normalizedFile,
      message: 'First-party forms must include hidden formIntent for routing submissions.',
    });
  }

  const requiredTrackingFields = [
    'referrer',
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'source',
    'allpages_visited',
    'first_page_visited',
    'visitor_country',
    'visitor_city',
    'visitor_continent',
    'visitor_calling_code',
    'visitor_channel',
    'current-time',
  ];

  for (const name of requiredTrackingFields) {
    if (!new RegExp(`<input\\b[^>]*\\btype=(["'])hidden\\1[^>]*\\bname=(["'])${name}\\2`, 'i').test(form)) {
      findings.push({
        code: 'missing-tracking-field',
        file: normalizedFile,
        message: `First-party forms must include the hidden ${name} tracking field.`,
      });
    }
  }

  if (!/\bdata-form-status\b/i.test(form)) {
    findings.push({
      code: 'missing-status-region',
      file: normalizedFile,
      message: 'First-party forms must include an aria-live status region for client-side submission feedback.',
    });
  }
}

function formStartTag(form: string): string {
  return form.match(/^<form\b[^>]*>/i)?.[0] ?? '';
}

function attrValue(attrs: string, name: string): string | undefined {
  const match = attrs.match(new RegExp(`\\s${name}=(["'])(.*?)\\1`, 'i'));
  return match?.[2];
}

async function listFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const results: string[] = [];

  for (const entry of entries) {
    const path = join(dir, entry.name);

    if (entry.isDirectory()) {
      results.push(...await listFiles(path));
    } else if (entry.isFile()) {
      results.push(path);
    }
  }

  return results;
}

function argString(name: string, fallback?: string): string | undefined {
  const index = process.argv.indexOf(`--${name}`);

  if (index === -1) {
    return fallback;
  }

  return process.argv[index + 1] ?? fallback;
}

function normalizePath(path: string): string {
  return path.replace(/\\/g, '/');
}
