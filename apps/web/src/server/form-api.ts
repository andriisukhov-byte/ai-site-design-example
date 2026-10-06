import { appendFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import net from 'node:net';
import tls from 'node:tls';

type FormIntent = 'contact' | 'enterprise' | 'blog-subscribe' | 'request-demo';

type SubmissionTracking = {
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  source?: string;
  allPagesVisited?: string;
  firstPageVisited?: string;
  visitorCountry?: string;
  visitorCity?: string;
  visitorContinent?: string;
  visitorCallingCode?: string;
  visitorChannel?: string;
  currentTime?: string;
};

type FormApiEnv = {
  FORM_SUBMISSION_LOG_PATH?: string;
  FORM_CRM_WEBHOOK_URL?: string;
  FORM_CRM_WEBHOOK_SECRET?: string;
  FORM_PAYLOAD_API_URL?: string;
  FORM_SUBMISSION_SECRET?: string;
  FORMSPREE_ENDPOINT_CONTACT?: string;
  FORMSPREE_ENDPOINT_ENTERPRISE?: string;
  FORMSPREE_ENDPOINT_BLOG_SUBSCRIBE?: string;
  FORMSPREE_ENDPOINT_REQUEST_DEMO?: string;
  FORM_NOTIFICATION_TO?: string;
  FORM_NOTIFICATION_FROM?: string;
  SMTP_HOST?: string;
  SMTP_PORT?: string;
  SMTP_SECURE?: string;
  SMTP_STARTTLS?: string;
  SMTP_USER?: string;
  SMTP_PASS?: string;
  [key: string]: string | undefined;
};

type Submission = {
  intent: FormIntent;
  successRedirect?: string;
  email: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  title?: string;
  phone?: string;
  company?: string;
  companyWebsite?: string;
  industry?: string;
  department?: string;
  teamSize?: string;
  functions?: string[];
  message?: string;
  consent: boolean;
  tracking: SubmissionTracking;
  receivedAt: string;
  ip?: string;
  userAgent?: string;
};

type Delivery = {
  payloadStored: boolean;
  formspreeSent: boolean;
  emailSent: boolean;
  webhookSent: boolean;
  errors: string[];
};

type SmtpSocket = net.Socket | tls.TLSSocket;

const intentRedirects: Record<FormIntent, string> = {
  contact: '/contact-us/thanks-page/',
  enterprise: '/contact-us/thanks-page/',
  'blog-subscribe': '/contact-us/thanks-page/',
  'request-demo': '/contact-us/demo-thanks-page/',
};

const intentLabels: Record<FormIntent, string> = {
  contact: 'Contact',
  enterprise: 'Enterprise',
  'blog-subscribe': 'Blog subscribe',
  'request-demo': 'Request demo',
};

const allowedIntents = new Set<FormIntent>(Object.keys(intentRedirects) as FormIntent[]);
const requiredNameIntents = new Set<FormIntent>(['contact', 'enterprise', 'request-demo']);
const consentRequiredIntents = requiredNameIntents;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function handleFormSubmission(request: Request, env: FormApiEnv = process.env): Promise<Response> {
  if (request.method !== 'POST') {
    return json({ ok: false, message: 'Method not allowed.' }, 405);
  }

  let form: FormData;

  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, message: 'Expected a form submission.' }, 400);
  }

  const intent = normalizeIntent(readFormValue(form, 'formIntent'));

  if (readFormValue(form, 'confirmWebsite') || (intent !== 'enterprise' && readFormValue(form, 'website'))) {
    await appendSubmission({ event: 'spam-rejected', reason: 'honeypot', receivedAt: new Date().toISOString() }, env);
    return json({
      ok: true,
      message: 'Thanks, your request has been received.',
      redirectPath: safeRedirect(readFormValue(form, 'successRedirect')) ?? intentRedirects.contact,
    });
  }

  const submission = normalizeSubmission(form, request);
  const validationError = validateSubmission(submission);

  if (validationError) {
    return json({ ok: false, message: validationError }, 400);
  }

  const delivery: Delivery = {
    payloadStored: false,
    formspreeSent: false,
    emailSent: false,
    webhookSent: false,
    errors: [],
  };

  await appendSubmission({ event: 'accepted', submission }, env);
  await tryDelivery('formspree', delivery, () => postFormspree(submission, env));
  await tryDelivery('smtp', delivery, () => sendNotificationEmail(submission, env));
  await tryDelivery('webhook', delivery, () => postWebhook(submission, env));
  await tryDelivery('payload', delivery, () => storeInPayload(submission, delivery, env));
  await appendSubmission({ event: 'delivery', submission, delivery }, env);

  return json({
    ok: delivery.errors.length === 0,
    message: delivery.errors.length === 0
      ? 'Thanks, your request has been received.'
      : 'We could not send your request. Please try again.',
    redirectPath: submission.successRedirect ?? intentRedirects[submission.intent],
  });
}

function normalizeSubmission(form: FormData, request: Request): Submission {
  return {
    intent: normalizeIntent(readFormValue(form, 'formIntent')),
    successRedirect: safeRedirect(readFormValue(form, 'successRedirect')),
    email: truncate(readFormValue(form, 'email').toLowerCase(), 254),
    name: optionalValue(form, 'name', 120) ?? fullName(form),
    firstName: optionalValue(form, 'firstName', 80),
    lastName: optionalValue(form, 'lastName', 80),
    title: optionalValue(form, 'title', 120),
    phone: optionalValue(form, 'phone', 60),
    company: optionalValue(form, 'company', 160),
    companyWebsite: optionalValue(form, 'companyWebsite', 300),
    industry: optionalValue(form, 'industry', 120),
    department: optionalValue(form, 'department', 120),
    teamSize: optionalValue(form, 'teamSize', 60),
    functions: form.getAll('functions').filter((value): value is string => typeof value === 'string').map((value) => truncate(value.trim(), 160)).filter(Boolean),
    message: optionalValue(form, 'message', 3000),
    consent: readFormValue(form, 'consent') === 'yes',
    tracking: normalizeTracking(form),
    receivedAt: new Date().toISOString(),
    ip: clientIp(request),
    userAgent: truncate(request.headers.get('user-agent') || '', 500) || undefined,
  };
}

function validateSubmission(submission: Submission): string | undefined {
  if (!allowedIntents.has(submission.intent)) {
    return 'Unknown form intent.';
  }

  if (!emailPattern.test(submission.email)) {
    return 'Please enter a valid email address.';
  }

  if (requiredNameIntents.has(submission.intent) && !submission.name) {
    return 'Please enter your name.';
  }

  if (consentRequiredIntents.has(submission.intent) && !submission.consent) {
    return 'Please confirm consent to be contacted.';
  }

  return undefined;
}

async function tryDelivery(name: string, delivery: Delivery, action: () => Promise<boolean>): Promise<void> {
  try {
    const delivered = await action();

    if (name === 'formspree') {
      delivery.formspreeSent = delivered;
    } else if (name === 'smtp') {
      delivery.emailSent = delivered;
    } else if (name === 'webhook') {
      delivery.webhookSent = delivered;
    } else if (name === 'payload') {
      delivery.payloadStored = delivered;
    }
  } catch (error) {
    delivery.errors.push(`${name}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

async function appendSubmission(entry: unknown, env: FormApiEnv): Promise<void> {
  const logPath = env.FORM_SUBMISSION_LOG_PATH ?? '.tmp/form-submissions.ndjson';
  await mkdir(dirname(logPath), { recursive: true });
  await appendFile(logPath, `${JSON.stringify(entry)}\n`, 'utf8');
}

async function storeInPayload(submission: Submission, delivery: Delivery, env: FormApiEnv): Promise<boolean> {
  if (!env.FORM_PAYLOAD_API_URL || !env.FORM_SUBMISSION_SECRET) {
    return false;
  }

  const response = await fetch(`${env.FORM_PAYLOAD_API_URL.replace(/\/$/, '')}/api/form-submissions`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-acme-form-secret': env.FORM_SUBMISSION_SECRET,
    },
    body: JSON.stringify({
      intent: submission.intent,
      status: delivery.errors.length > 0 ? 'delivery-failed' : 'delivered',
      successRedirect: submission.successRedirect,
      name: submission.name,
      firstName: submission.firstName,
      lastName: submission.lastName,
      title: submission.title,
      email: submission.email,
      phone: submission.phone,
      company: submission.company,
      companyWebsite: submission.companyWebsite,
      industry: submission.industry,
      department: submission.department,
      teamSize: submission.teamSize,
      functions: submission.functions?.map((value) => ({ value })),
      message: submission.message,
      consent: submission.consent,
      tracking: submission.tracking,
      delivery: {
        payloadStored: true,
        formspreeSent: delivery.formspreeSent,
        emailSent: delivery.emailSent,
        webhookSent: delivery.webhookSent,
        error: delivery.errors.join('\n') || undefined,
      },
      metadata: {
        receivedAt: submission.receivedAt,
        ip: submission.ip,
        userAgent: submission.userAgent,
      },
      raw: submission,
    }),
  });

  if (!response.ok) {
    throw new Error(`Payload storage failed with HTTP ${response.status}: ${await response.text()}`);
  }

  return true;
}

async function postFormspree(submission: Submission, env: FormApiEnv): Promise<boolean> {
  const endpoint = formspreeEndpointFor(submission.intent, env);

  if (!endpoint) {
    return false;
  }

  const form = new FormData();
  const values: Record<string, string | undefined> = {
    formIntent: submission.intent,
    name: submission.name,
    firstName: submission.firstName,
    lastName: submission.lastName,
    title: submission.title,
    email: submission.email,
    phone: submission.phone,
    company: submission.company,
    companyWebsite: submission.companyWebsite,
    industry: submission.industry,
    department: submission.department,
    teamSize: submission.teamSize,
    message: submission.message,
    consent: submission.consent ? 'yes' : 'no',
    referrer: submission.tracking.referrer,
    utm_source: submission.tracking.utmSource,
    utm_medium: submission.tracking.utmMedium,
    utm_campaign: submission.tracking.utmCampaign,
    source: submission.tracking.source,
    allpages_visited: submission.tracking.allPagesVisited,
    first_page_visited: submission.tracking.firstPageVisited,
    visitor_country: submission.tracking.visitorCountry,
    visitor_city: submission.tracking.visitorCity,
    visitor_continent: submission.tracking.visitorContinent,
    visitor_calling_code: submission.tracking.visitorCallingCode,
    visitor_channel: submission.tracking.visitorChannel,
    'current-time': submission.tracking.currentTime,
  };

  for (const [key, value] of Object.entries(values)) {
    if (value) {
      form.set(key, value);
    }
  }

  for (const value of submission.functions ?? []) {
    form.append('functions', value);
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { accept: 'application/json' },
    body: form,
  });

  if (!response.ok) {
    throw new Error(`Formspree delivery failed with HTTP ${response.status}.`);
  }

  return true;
}

function formspreeEndpointFor(intent: FormIntent, env: FormApiEnv): string | undefined {
  const endpoints: Record<FormIntent, string | undefined> = {
    contact: env.FORMSPREE_ENDPOINT_CONTACT,
    enterprise: env.FORMSPREE_ENDPOINT_ENTERPRISE,
    'blog-subscribe': env.FORMSPREE_ENDPOINT_BLOG_SUBSCRIBE,
    'request-demo': env.FORMSPREE_ENDPOINT_REQUEST_DEMO,
  };
  const endpoint = endpoints[intent]?.trim();

  if (!endpoint) {
    return undefined;
  }

  const url = new URL(endpoint);

  if (url.protocol !== 'https:' || url.hostname !== 'formspree.io' || !url.pathname.startsWith('/f/')) {
    throw new Error('Invalid Formspree endpoint configuration.');
  }

  return endpoint;
}

async function postWebhook(submission: Submission, env: FormApiEnv): Promise<boolean> {
  if (!env.FORM_CRM_WEBHOOK_URL) {
    return false;
  }

  const response = await fetch(env.FORM_CRM_WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...(env.FORM_CRM_WEBHOOK_SECRET ? { authorization: `Bearer ${env.FORM_CRM_WEBHOOK_SECRET}` } : {}),
    },
    body: JSON.stringify(submission),
  });

  if (!response.ok) {
    throw new Error(`CRM webhook failed with HTTP ${response.status}.`);
  }

  return true;
}

async function sendNotificationEmail(submission: Submission, env: FormApiEnv): Promise<boolean> {
  if (!env.SMTP_HOST || !env.FORM_NOTIFICATION_TO || !env.FORM_NOTIFICATION_FROM) {
    return false;
  }

  const subject = `Acme ${intentLabels[submission.intent]} lead: ${submission.email}`;
  const text = [
    `Intent: ${intentLabels[submission.intent]} (${submission.intent})`,
    `Received: ${submission.receivedAt}`,
    `Source: ${submission.tracking.source ?? '-'}`,
    `Name: ${submission.name ?? '-'}`,
    `Email: ${submission.email}`,
    `Phone: ${submission.phone ?? '-'}`,
    `Company: ${submission.company ?? '-'}`,
    `Department: ${submission.department ?? '-'}`,
    `Team size: ${submission.teamSize ?? '-'}`,
    `Consent: ${submission.consent ? 'yes' : 'no'}`,
    ...trackingEmailLines(submission.tracking),
    '',
    'Message:',
    submission.message ?? '-',
  ].join('\n');

  await sendSmtp({
    host: env.SMTP_HOST,
    port: Number(env.SMTP_PORT || (env.SMTP_SECURE === 'true' ? 465 : 587)),
    secure: env.SMTP_SECURE === 'true',
    startTls: env.SMTP_STARTTLS !== 'false' && env.SMTP_SECURE !== 'true',
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
    from: env.FORM_NOTIFICATION_FROM,
    to: env.FORM_NOTIFICATION_TO,
    subject,
    text,
  });

  return true;
}

async function sendSmtp(options: {
  host: string;
  port: number;
  secure: boolean;
  startTls: boolean;
  user?: string;
  pass?: string;
  from: string;
  to: string;
  subject: string;
  text: string;
}): Promise<void> {
  let socket: SmtpSocket = options.secure
    ? tls.connect({ host: options.host, port: options.port, servername: options.host })
    : net.connect({ host: options.host, port: options.port });

  await waitForConnect(socket);
  await readSmtp(socket, 220);
  await smtpCommand(socket, `EHLO ${options.host}`, 250);

  if (options.startTls) {
    await smtpCommand(socket, 'STARTTLS', 220);
    socket = tls.connect({ socket, servername: options.host });
    await waitForConnect(socket);
    await smtpCommand(socket, `EHLO ${options.host}`, 250);
  }

  if (options.user && options.pass) {
    await smtpCommand(socket, 'AUTH LOGIN', 334);
    await smtpCommand(socket, Buffer.from(options.user).toString('base64'), 334);
    await smtpCommand(socket, Buffer.from(options.pass).toString('base64'), 235);
  }

  await smtpCommand(socket, `MAIL FROM:<${addressOnly(options.from)}>`, 250);
  await smtpCommand(socket, `RCPT TO:<${addressOnly(options.to)}>`, [250, 251]);
  await smtpCommand(socket, 'DATA', 354);
  await smtpCommand(socket, buildEmail(options), 250);
  await smtpCommand(socket, 'QUIT', 221);
  socket.end();
}

function waitForConnect(socket: SmtpSocket): Promise<void> {
  if (socket.readyState === 'open') {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    socket.once('connect', resolve);
    socket.once('secureConnect', resolve);
    socket.once('error', reject);
  });
}

function smtpCommand(socket: SmtpSocket, command: string, expected: number | number[]): Promise<string> {
  socket.write(`${command}\r\n`);
  return readSmtp(socket, expected);
}

function readSmtp(socket: SmtpSocket, expected: number | number[]): Promise<string> {
  const expectedCodes = Array.isArray(expected) ? expected : [expected];

  return new Promise((resolve, reject) => {
    let buffer = '';

    const cleanup = () => {
      socket.off('data', onData);
      socket.off('error', onError);
    };

    const onError = (error: Error) => {
      cleanup();
      reject(error);
    };

    const onData = (chunk: Buffer) => {
      buffer += chunk.toString('utf8');
      const lines = buffer.split(/\r?\n/).filter(Boolean);
      const last = lines[lines.length - 1];

      if (!last || !/^\d{3} /.test(last)) {
        return;
      }

      cleanup();
      const code = Number(last.slice(0, 3));

      if (!expectedCodes.includes(code)) {
        reject(new Error(`SMTP expected ${expectedCodes.join('/')} but received ${code}: ${buffer.trim()}`));
        return;
      }

      resolve(buffer);
    };

    socket.on('data', onData);
    socket.once('error', onError);
  });
}

function buildEmail(options: { from: string; to: string; subject: string; text: string }): string {
  const body = options.text.replace(/^\./gm, '..');

  return [
    `From: ${options.from}`,
    `To: ${options.to}`,
    `Subject: ${encodeHeader(options.subject)}`,
    `Date: ${new Date().toUTCString()}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    '',
    body,
    '.',
  ].join('\r\n');
}

function encodeHeader(value: string): string {
  return /^[\x00-\x7F]*$/.test(value) ? value : `=?UTF-8?B?${Buffer.from(value).toString('base64')}?=`;
}

function addressOnly(value: string): string {
  const match = value.match(/<([^>]+)>/);
  return (match?.[1] ?? value).trim();
}

function normalizeIntent(value: string): FormIntent {
  return (value === 'newsletter' ? 'blog-subscribe' : value) as FormIntent;
}

function safeRedirect(value: string): string | undefined {
  if (!value || value.length > 300) {
    return undefined;
  }

  if (!value.startsWith('/') || value.startsWith('//') || value.includes('\\')) {
    return undefined;
  }

  return value;
}

function optionalValue(form: FormData, name: string, maxLength: number): string | undefined {
  const value = truncate(readFormValue(form, name), maxLength);
  return value || undefined;
}

function fullName(form: FormData): string | undefined {
  const value = [readFormValue(form, 'firstName'), readFormValue(form, 'lastName')]
    .filter(Boolean)
    .join(' ');
  return truncate(value, 120) || undefined;
}

function normalizeTracking(form: FormData): SubmissionTracking {
  return {
    referrer: optionalValue(form, 'referrer', 2000),
    utmSource: optionalValue(form, 'utm_source', 500),
    utmMedium: optionalValue(form, 'utm_medium', 500),
    utmCampaign: optionalValue(form, 'utm_campaign', 500),
    source: optionalValue(form, 'source', 2000),
    allPagesVisited: optionalValue(form, 'allpages_visited', 8000),
    firstPageVisited: optionalValue(form, 'first_page_visited', 2000),
    visitorCountry: optionalValue(form, 'visitor_country', 500),
    visitorCity: optionalValue(form, 'visitor_city', 500),
    visitorContinent: optionalValue(form, 'visitor_continent', 500),
    visitorCallingCode: optionalValue(form, 'visitor_calling_code', 100),
    visitorChannel: optionalValue(form, 'visitor_channel', 500),
    currentTime: optionalValue(form, 'current-time', 120),
  };
}

function trackingEmailLines(tracking: SubmissionTracking): string[] {
  const labels: Record<keyof SubmissionTracking, string> = {
    referrer: 'Referrer',
    utmSource: 'UTM source',
    utmMedium: 'UTM medium',
    utmCampaign: 'UTM campaign',
    source: 'Source URL',
    allPagesVisited: 'All pages visited',
    firstPageVisited: 'First page visited',
    visitorCountry: 'Visitor country',
    visitorCity: 'Visitor city',
    visitorContinent: 'Visitor continent',
    visitorCallingCode: 'Visitor calling code',
    visitorChannel: 'Visitor channel',
    currentTime: 'Current time',
  };

  return (Object.entries(tracking) as Array<[keyof SubmissionTracking, string | undefined]>)
    .filter(([, value]) => Boolean(value))
    .map(([key, value]) => `${labels[key]}: ${value}`);
}

function readFormValue(form: FormData, name: string): string {
  const value = form.get(name);
  return typeof value === 'string' ? value.trim() : '';
}

function truncate(value: string, maxLength: number): string {
  return value.length > maxLength ? value.slice(0, maxLength) : value;
}

function clientIp(request: Request): string | undefined {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return truncate(forwarded || request.headers.get('x-real-ip') || '', 80) || undefined;
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}
