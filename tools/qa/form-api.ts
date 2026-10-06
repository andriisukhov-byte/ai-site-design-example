import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

import { handleFormSubmission } from '../../apps/web/src/server/form-api';
import { argString, parseArgs, writeJson } from '../migrate/source-utils';

type Finding = {
  code: string;
  message: string;
};

type SubmitResult = Awaited<ReturnType<typeof submit>>;

const findings: Finding[] = [];
const args = parseArgs();
const out = argString(args, 'out');
const tempDir = await mkdtemp(join(tmpdir(), 'acme-form-api-'));
const logPath = join(tempDir, 'submissions.ndjson');

try {
  const contact = await submit({
    formIntent: 'contact',
    source: 'https://local.test/contact-us/',
    name: 'Test User',
    email: 'test@example.com',
    consent: 'yes',
    message: 'POC validation',
  });
  expectOk(contact, 'contact');
  expectRedirect(contact, '/contact-us/thanks-page/', 'contact');

  const popup = await submit({
    formIntent: 'request-demo',
    source: 'https://local.test/pricing/',
    email: 'demo@example.com',
    name: 'Demo Lead',
    consent: 'yes',
    successRedirect: '/custom-demo-thanks/',
  });
  expectOk(popup, 'request-demo');
  expectRedirect(popup, '/custom-demo-thanks/', 'request-demo');

  const newsletter = await submit({
    formIntent: 'blog-subscribe',
    source: 'https://local.test/blog/',
    email: 'reader@example.com',
  });
  expectOk(newsletter, 'blog-subscribe');
  expectRedirect(newsletter, '/contact-us/thanks-page/', 'blog-subscribe');

  const formspreeRequests: Array<{ body: FormData; url: string }> = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (input, init) => {
    formspreeRequests.push({
      url: String(input),
      body: init?.body as FormData,
    });
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'content-type': 'application/json' } });
  };

  try {
    const forwardedDemo = await submit({
      formIntent: 'request-demo',
      source: 'https://local.test/pricing/',
      email: 'forwarded@example.com',
      name: 'Forwarded Lead',
      consent: 'yes',
      referrer: 'https://search.example/acme',
      utm_source: 'google',
      allpages_visited: '/pricing/,/contact-us/',
    }, {
      FORMSPREE_ENDPOINT_REQUEST_DEMO: 'https://formspree.io/f/testform',
    });
    expectOk(forwardedDemo, 'Formspree request-demo');

    const forwarded = formspreeRequests[0];
    if (
      forwarded?.url !== 'https://formspree.io/f/testform'
      || forwarded.body?.get('email') !== 'forwarded@example.com'
      || forwarded.body?.get('referrer') !== 'https://search.example/acme'
      || forwarded.body?.get('utm_source') !== 'google'
      || forwarded.body?.get('allpages_visited') !== '/pricing/,/contact-us/'
    ) {
      findings.push({
        code: 'formspree-forwarding-failed',
        message: 'The request-demo payload and its tracking values were not forwarded to the configured Formspree endpoint.',
      });
    }
  } finally {
    globalThis.fetch = originalFetch;
  }

  const invalid = await submit({
    formIntent: 'contact',
    source: 'https://local.test/contact-us/',
    email: 'not-an-email',
  });
  expectStatus(invalid, 400, 'invalid email should be rejected');

  const missingConsent = await submit({
    formIntent: 'request-demo',
    source: 'https://local.test/pricing/',
    email: 'demo@example.com',
    name: 'Demo Lead',
  });
  expectStatus(missingConsent, 400, 'lead form without consent should be rejected');

  const spam = await submit({
    formIntent: 'request-demo',
    source: 'https://local.test/pricing/',
    email: 'bot@example.com',
    name: 'Bot',
    consent: 'yes',
    website: 'https://spam.example',
    successRedirect: 'https://evil.example/',
  });
  expectOk(spam, 'honeypot spam soft-accept');
  expectRedirect(spam, '/contact-us/thanks-page/', 'honeypot spam soft-accept');

  const logText = await readFile(logPath, 'utf8');
  const logEntries = logText.trim().split(/\r?\n/).filter(Boolean).map((line) => JSON.parse(line) as { event?: string });
  const acceptedCount = logEntries.filter((entry) => entry.event === 'accepted').length;
  const deliveryCount = logEntries.filter((entry) => entry.event === 'delivery').length;
  const spamCount = logEntries.filter((entry) => entry.event === 'spam-rejected').length;

  if (acceptedCount !== 4 || deliveryCount !== 4 || spamCount !== 1) {
    findings.push({
      code: 'unexpected-log-events',
      message: `Expected accepted=4, delivery=4, spam-rejected=1; received accepted=${acceptedCount}, delivery=${deliveryCount}, spam-rejected=${spamCount}.`,
    });
  }
} finally {
  await rm(tempDir, { recursive: true, force: true });
}

const report = {
  ok: findings.length === 0,
  generatedAt: new Date().toISOString(),
  endpointPath: '/api/forms/submit',
  acceptedSamples: 4,
  rejectedSamples: 2,
  spamSamples: 1,
  findingCount: findings.length,
  findings,
};

if (out) {
  await writeJson(out, report);
}

console.log(JSON.stringify(report, null, 2));

if (findings.length > 0) {
  process.exit(1);
}

async function submit(fields: Record<string, string>, extraEnv: Record<string, string> = {}) {
  const form = new FormData();

  for (const [key, value] of Object.entries(fields)) {
    form.set(key, value);
  }

  const response = await handleFormSubmission(new Request('http://local.test/api/forms/submit', {
    method: 'POST',
    headers: {
      'user-agent': 'form-api-qa',
      'x-forwarded-for': '127.0.0.1',
    },
    body: form,
  }), {
    FORM_SUBMISSION_LOG_PATH: logPath,
    ...extraEnv,
  });
  const payload = await response.json() as { ok?: boolean; redirectPath?: string; message?: string };

  return {
    status: response.status,
    payload,
  };
}

function expectOk(result: SubmitResult, intent: string) {
  if (result.status !== 200 || result.payload.ok !== true) {
    findings.push({
      code: 'valid-submission-rejected',
      message: `${intent} submission should return HTTP 200 and ok=true; received HTTP ${result.status}.`,
    });
  }
}

function expectRedirect(result: SubmitResult, redirectPath: string, intent: string) {
  if (result.payload.redirectPath !== redirectPath) {
    findings.push({
      code: 'unexpected-redirect',
      message: `${intent} submission should return redirectPath ${redirectPath}; received ${result.payload.redirectPath ?? 'none'}.`,
    });
  }
}

function expectStatus(result: SubmitResult, status: number, label: string) {
  if (result.status !== status) {
    findings.push({
      code: 'unexpected-status',
      message: `${label}: expected HTTP ${status}, received HTTP ${result.status}.`,
    });
  }
}
