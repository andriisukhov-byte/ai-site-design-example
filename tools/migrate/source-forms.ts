import { argString, defaultDumpPath, forSqlRows, parseArgs, writeJson } from './source-utils';

type SourceForm = {
  sourceId: number;
  title: string;
  slug: string;
  intent: string;
  description?: string;
  fields: Array<{
    name: string;
    label: string;
    type: 'text' | 'email' | 'phone' | 'url' | 'textarea' | 'select' | 'checkbox';
    required: boolean;
    options?: Array<{ label: string; value: string }>;
  }>;
  successBehavior: {
    message: string;
    redirectPath: string;
  };
  notificationConfigKey: string;
  crmConfigKey: string;
  source: {
    sourceType: 'legacy-wordpress-form';
    mailSubject?: string;
  };
};

const args = parseArgs();
const dump = argString(args, 'dump', defaultDumpPath)!;
const out = argString(args, 'out', 'data/source/forms.json')!;

const posts = new Map<number, { title: string; slug: string; content: string; type: string; status: string }>();
const meta = new Map<number, Map<string, string>>();

await forSqlRows(dump, new Set(['wp_posts', 'wp_postmeta']), (table, tuple) => {
  if (table === 'wp_posts') {
    const id = Number(tuple[0]);
    const type = stringValue(tuple[20]);

    if (type !== 'wpcf7_contact_form') {
      return;
    }

    posts.set(id, {
      title: stringValue(tuple[5]),
      slug: stringValue(tuple[11]),
      content: stringValue(tuple[4]),
      status: stringValue(tuple[7]),
      type,
    });
    return;
  }

  if (table === 'wp_postmeta') {
    const postId = Number(tuple[1]);

    if (!Number.isFinite(postId)) {
      return;
    }

    const key = stringValue(tuple[2]);

    if (!key.startsWith('_')) {
      return;
    }

    let formMeta = meta.get(postId);

    if (!formMeta) {
      formMeta = new Map<string, string>();
      meta.set(postId, formMeta);
    }

    formMeta.set(key, stringValue(tuple[3]));
  }
});

const forms = [...posts.entries()]
  .sort(([left], [right]) => left - right)
  .map(([sourceId, post]): SourceForm => {
    const formMeta = meta.get(sourceId);
    const intent = inferIntent(post.title, post.slug);

    return {
      sourceId,
      title: decodeHtml(post.title),
      slug: post.slug,
      intent,
      description: descriptionForIntent(intent),
      fields: parseCf7Fields(post.content),
      successBehavior: {
        message: 'Thanks, your request has been received.',
        redirectPath: redirectForIntent(intent),
      },
      notificationConfigKey: intent,
      crmConfigKey: intent,
      source: {
        sourceType: 'legacy-wordpress-form',
        mailSubject: extractSerializedValue(formMeta?.get('_mail') ?? '', 'subject'),
      },
    };
  });

await writeJson(out, {
  generatedAt: new Date().toISOString(),
  source: {
    dumpFile: dump.split(/[\\/]/).pop(),
    table: 'wp_posts + wp_postmeta',
    postType: 'wpcf7_contact_form',
  },
  count: forms.length,
  forms,
});

console.log(JSON.stringify({
  ok: true,
  out,
  count: forms.length,
  forms: forms.map((form) => ({ sourceId: form.sourceId, title: form.title, intent: form.intent, fields: form.fields.length })),
}, null, 2));

function stringValue(value: unknown): string {
  if (value === null || value === undefined) {
    return '';
  }

  return String(value);
}

function parseCf7Fields(template: string): SourceForm['fields'] {
  const fieldMap = new Map<string, SourceForm['fields'][number]>();
  const tagPattern = /\[([a-zA-Z]+)\*?\s+([a-zA-Z0-9_-]+)([^\]]*)\]/g;

  for (const match of template.matchAll(tagPattern)) {
    const tag = match[1] ?? '';
    const name = match[2] ?? '';
    const rest = match[3] ?? '';

    if (!name || name.startsWith('_')) {
      continue;
    }

    const required = match[0].startsWith(`[${tag}*`);
    const type = fieldType(tag, name);

    if (!type) {
      continue;
    }

    fieldMap.set(name, {
      name,
      label: labelFromName(name),
      type,
      required,
      ...(type === 'select' ? { options: parseOptions(rest) } : {}),
    });
  }

  return [...fieldMap.values()];
}

function fieldType(tag: string, name: string): SourceForm['fields'][number]['type'] | undefined {
  if (tag === 'email') return 'email';
  if (tag === 'tel') return 'phone';
  if (tag === 'url') return 'url';
  if (tag === 'textarea') return 'textarea';
  if (tag === 'select') return 'select';
  if (tag === 'checkbox') return 'checkbox';
  if (tag === 'acceptance' || name.toLowerCase().includes('consent') || name.toLowerCase().includes('agree')) return 'checkbox';
  if (tag === 'text') return 'text';
  return undefined;
}

function parseOptions(rest: string): Array<{ label: string; value: string }> {
  const quoted = [...rest.matchAll(/"([^"]+)"/g)].map((match) => match[1] ?? '').filter(Boolean);
  return quoted.map((label) => ({ label, value: label }));
}

function labelFromName(name: string): string {
  const overrides: Record<string, string> = {
    'your-name': 'Name',
    'your-email': 'Email',
    'your-phone': 'Phone',
    'your-message': 'Message',
    company: 'Company',
    department: 'Department',
    industry: 'Industry',
  };

  return overrides[name] ?? name
    .replace(/^your-/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function inferIntent(title: string, slug: string): string {
  const value = `${title} ${slug}`.toLowerCase();

  if (value.includes('enterprise')) return 'enterprise';
  if (value.includes('custom')) return 'custom-pricing';
  if (value.includes('request') && value.includes('demo')) return 'request-demo';
  if (value.includes('free') && value.includes('trial')) return 'free-trial';
  if (value.includes('waitlist')) return 'waitlist';
  if (value.includes('blog') || value.includes('subscribe')) return 'blog-subscribe';
  return 'contact';
}

function descriptionForIntent(intent: string): string {
  const descriptions: Record<string, string> = {
    'request-demo': 'Demo request lead form.',
    'free-trial': 'Free trial lead form.',
    waitlist: 'Waitlist signup form.',
    'custom-pricing': 'Custom pricing request form.',
    enterprise: 'Enterprise upgrade request form.',
    'blog-subscribe': 'Blog subscription form.',
    contact: 'Contact lead form.',
  };

  return descriptions[intent] ?? descriptions.contact!;
}

function redirectForIntent(intent: string): string {
  return intent === 'request-demo' ? '/contact-us/demo-thanks-page/' : '/contact-us/thanks-page/';
}

function extractSerializedValue(serialized: string, key: string): string | undefined {
  const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = serialized.match(new RegExp(`s:\\d+:"${escaped}";s:\\d+:"([^"]*)"`));
  return match?.[1]?.replace(/\\"/g, '"');
}

function decodeHtml(value: string): string {
  return value
    .replace(/&#8211;/g, '-')
    .replace(/&#038;/g, '&')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
}
