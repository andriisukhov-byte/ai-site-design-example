/**
 * Mechanical half of `ai/contracts/copy-rules.md`, run over a page batch.
 *
 * The 2026-08-13 review named non-determinism as the fifth defect: the same
 * brief produced differently-worded pages because the rules lived only in a
 * prompt. Anything in the rule set that a script can decide belongs here, so
 * a violation fails a gate instead of depending on whether the reviewer
 * happened to look. Everything this file cannot decide - the
 * interchangeability test, the read-aloud test, stance - stays with the human
 * reviewer, and the report says so rather than implying full coverage.
 *
 * This gate reports. It never edits copy: marketing-authored text is an input,
 * not a draft (`ai/contracts/lp-handoff.md`).
 *
 * Usage:
 *   npm run qa:copy -- --file data/ai-page-generation/<batch>/pages.json --brief data/ai-page-generation/<batch>/brief.md
 *   npm run qa:copy -- --file data/cms/pages.json --legacy   (survey mode, never fails)
 *
 * Pass --brief to check figures against the page brief as well as
 * `ai/contracts/copy-data.md`. Without it, any number the brief introduced reads
 * as unsourced.
 */
import { readFile } from 'node:fs/promises';

type Severity = 'blocker' | 'major' | 'suspicion';

type Finding = {
  code: string;
  severity: Severity;
  path: string;
  message: string;
  sample?: string;
};

type FieldHit = { path: string; value: string };

const args = process.argv.slice(2);
const filePath = readArg('--file') ?? 'data/cms/pages.json';
const legacyMode = args.includes('--legacy');
const dataPath = readArg('--data') ?? 'ai/contracts/copy-data.md';
const briefPath = readArg('--brief');
const pageFilter = readArg('--path');

function readArg(flag: string): string | undefined {
  const index = args.indexOf(flag);
  if (index === -1) return undefined;
  const value = args[index + 1];
  return value && !value.startsWith('--') ? value : undefined;
}

/**
 * Which strings are copy.
 *
 * This started as an allowlist of field names, and that was the worst bug this file
 * has had: 59 of the 94 string fields declared in `schemas.ts` were not on it, so the
 * gate reported clean while inspecting about a third of the copy surface. The whole
 * `pain-points-comparison` block - `leftTitle`, `leftDescription`, `rightTitle`,
 * `rightDescription` - was invisible, and so were `primaryNote`, `gradientText`,
 * `titleStart`, `cardTitle` and the rest. An allowlist fails silently every time a
 * block adds a field; a denylist fails loudly, which is the direction an error should
 * point.
 *
 * So: everything is copy unless its key names configuration, or its value is clearly
 * not prose.
 */
const NON_COPY_KEYS = new Set([
  'type', 'url', 'href', 'path', 'contentKey', 'collection', 'template', 'status',
  'className', 'id', 'icon', 'customIcon', 'src', 'variant', 'preset', 'background',
  'accent', 'visualType', 'canonicalUrl', 'robots', 'from', 'width', 'columns',
  'mediaSize', 'slug', 'anchor', 'category', 'publishedAt', 'updatedAt', 'target',
  'formHtml', 'included', 'openFirst', 'showStepNumbers', 'showColumnHeadings',
]);

/** Values that are not prose no matter which key they sit under. */
function looksLikeConfiguration(value: string): boolean {
  const trimmed = value.trim();
  if (trimmed.length < 2) return true;
  if (!/[a-zA-Z]/.test(trimmed)) return true;                     // "24/7" handled as a stat elsewhere
  if (/^https?:\/\/|^\/|^#|^mailto:|^tel:/.test(trimmed)) return true;
  if (/^\d{4}-\d{2}-\d{2}/.test(trimmed)) return true;            // dates
  if (/^[a-z0-9-]+$/.test(trimmed) && !trimmed.includes(' ')) return true;  // slugs, tokens
  return false;
}

const BANNED_OUTRIGHT = [
  'delve', 'tapestry', 'realm', 'testament', 'underscore', 'pivotal', 'paramount',
  'foster', 'elevate', 'harness', 'leverage', 'unlock', 'unleash', 'empower',
  'revolutioniz', 'supercharge', 'turbocharge', 'seamless', 'robust', 'cutting-edge',
  'next-generation', 'best-in-class', 'world-class', 'state-of-the-art', 'game-changing',
  'holistic', 'synergy', 'frictionless', 'effortless', 'myriad', 'plethora',
  'meticulous', 'commendable', 'unwavering', 'resonate', 'showcase', 'embark',
  'dive in', 'valuable insights', 'actionable insights', 'in the ever-evolving',
];

/** Banned only in the figurative sense, so a hit is a suspicion, not a blocker. */
const BANNED_FIGURATIVE = ['landscape', 'navigate', 'ecosystem', 'journey', 'transform'];

/** Allowed inside a customer quote only. */
const QUOTE_ONLY = ['streamline', 'intuitive', 'powerful', 'comprehensive', 'innovative', 'scalable'];

const BANNED_CONSTRUCTIONS: Array<[string, RegExp]> = [
  ['participial-tail', /,\s+(ensuring|allowing|making it|helping|enabling|driving|resulting in|keeping|leaving|giving|creating|providing)\b/i],
  ['scene-setting-opener', /^(in today'?s|as businesses increasingly|in an era where|whether you'?re|picture this)/i],
  ['summary-closer', /\b(in short|ultimately|at the end of the day|the bottom line is|when it comes to)\b/i],
  ['antithesis', /\b(it'?s not just .+, it'?s|isn'?t about .+, it'?s about)\b/i],
  ['antithesis-compact', /^[A-Z][\w\s-]{2,30}, not [\w\s-]{2,20}[:.]/],
  ['hedged-authority', /\b(can help|may allow|is designed to|works to)\b/i],
  ['transition-opener', /^(moreover|furthermore|additionally|it'?s worth noting)/i],
  ['reader-flattery', /\b(you already know that|as a savvy)\b/i],
];

/**
 * Pricing hooks and trust strips are approved verbatim in
 * `ai/contracts/copy-rules.md`. They are deliberately short and parallel
 * ("No subscription. No contracts.") so the rhythm rules do not apply.
 */
const APPROVED_VERBATIM = [
  'get started free - no card required.',
  'pay only for what you use.',
  'no subscription. no contracts.',
  'no subscription. no monthly fee.',
  'credits never expire.',
  'free plan - no card required.',
  'no credit card required.',
  'no credit card required. free plan available. production deployment activates from the first top-up.',
];

function isApprovedVerbatim(value: string): boolean {
  const normalized = plain(value).toLowerCase();
  return APPROVED_VERBATIM.some((hook) => normalized === hook || normalized.startsWith(hook));
}

const LOCKED_CTA_LABELS = new Set([
  'Get Started Free', 'Request Demo', 'Start Building Your Agent', 'See It In Action',
  'Talk to Sales', 'Contact Sales',
  // Approved 2026-08-19 alongside "Request Demo" - see copy-rules.md, project decision 8.
  'Book a Demo',
]);

const LENGTH_RULES: Array<{ code: string; keys: string[]; maxWords?: number; maxChars?: number; minWords?: number; label: string }> = [
  { code: 'heading-too-long', keys: ['title', 'titleGradient', 'heading', 'headline'], maxWords: 9, label: 'heading over the 8-9 word ceiling' },
  // card headline rule is applied by path, not by key - see the `applies` branch below
  { code: 'description-too-long', keys: ['description', 'subtitle'], maxWords: 35, label: 'description over 35 words' },
  { code: 'faq-answer-length', keys: ['answer'], maxWords: 60, minWords: 40, label: 'FAQ answer outside 40-60 words' },
  { code: 'card-headline-too-long', keys: [], maxWords: 4, label: 'card headline over the 2-4 word category label' },
  { code: 'alt-too-long', keys: ['alt'], maxChars: 125, label: 'ALT over 125 characters' },
  { code: 'meta-title-too-long', keys: ['metaTitle'], maxChars: 60, label: 'meta title over 60 characters' },
];

const findings: Finding[] = [];

function add(code: string, severity: Severity, path: string, message: string, sample?: string): void {
  findings.push({ code, severity, path, message, sample: sample?.slice(0, 200) });
}

/** Copy as a reader sees it: no tags, no gradient markers, no forced line breaks. */
function plain(value: string): string {
  return value
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\{\{|\}\}/g, ' ')
    .replace(/\|\|/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function words(value: string): string[] {
  return plain(value).split(/\s+/).filter(Boolean);
}

const ABBREVIATIONS = ['a.m.', 'p.m.', 'e.g.', 'i.e.', 'vs.', 'no.', 'inc.', 'etc.', 'u.s.'];

function sentences(value: string): string[] {
  let text = plain(value);
  ABBREVIATIONS.forEach((abbr, index) => {
    text = text.split(abbr).join(`\u0000${index}\u0000`).split(abbr.toUpperCase()).join(`\u0000${index}\u0000`);
  });
  return text
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => {
      let restored = sentence;
      ABBREVIATIONS.forEach((abbr, index) => {
        restored = restored.split(`\u0000${index}\u0000`).join(abbr);
      });
      return restored.trim();
    })
    .filter(Boolean);
}

/**
 * Simulated speech, not marketing prose. `conversation-replay` turns and
 * testimonial quotes are written to sound like a person talking, so the rhythm
 * and construction rules do not apply to them - a customer really does say
 * "I can help right here".
 */
function isSpokenLine(path: string): boolean {
  // `turns` and `outcomeRows` belong to `conversation-replay`, which is one
  // illustrated scenario end to end - its prices, times and record ids are
  // scenario detail, not claims. Testimonials are a person's own words.
  return /\.turns\[|outcomeRows|testimonial|quote/i.test(path);
}

/** Abstract nouns whose 4-in-a-row stacking is the banned construction. */
const STACK_NOUNS = new Set([
  'ai', 'platform', 'solution', 'system', 'software', 'automation', 'engagement',
  'management', 'optimization', 'customer', 'workflow', 'agent', 'agents', 'data',
  'service', 'services', 'performance', 'business', 'enterprise', 'intelligence',
  'experience', 'operations', 'communication', 'conversation', 'process', 'technology',
]);

function nounStack(sentence: string): string | undefined {
  const tokens = sentence.replace(/[^A-Za-z\s-]/g, ' ').split(/\s+/).filter(Boolean);
  let run: string[] = [];
  for (const token of tokens) {
    if (STACK_NOUNS.has(token.toLowerCase())) {
      run.push(token);
      if (run.length >= 4) return run.join(' ');
    } else {
      run = [];
    }
  }
  return undefined;
}

function collectCopy(node: unknown, path: string, out: FieldHit[]): void {
  if (typeof node === 'string') {
    const key = path.split('.').pop()?.replace(/\[\d+\]$/, '') ?? '';
    if (!NON_COPY_KEYS.has(key) && !looksLikeConfiguration(node)) out.push({ path, value: node });
    return;
  }
  if (Array.isArray(node)) {
    node.forEach((item, index) => collectCopy(item, `${path}[${index}]`, out));
    return;
  }
  if (node && typeof node === 'object') {
    for (const [key, value] of Object.entries(node)) {
      if (NON_COPY_KEYS.has(key)) continue;
      collectCopy(value, path ? `${path}.${key}` : key, out);
    }
  }
}

function checkField(hit: FieldHit): void {
  const { path, value } = hit;
  const lower = value.toLowerCase();
  const key = path.split('.').pop()?.replace(/\[\d+\]$/, '') ?? '';

  for (const word of BANNED_OUTRIGHT) {
    if (lower.includes(word)) add('banned-vocabulary', 'blocker', path, `banned word "${word}"`, value);
  }
  for (const word of BANNED_FIGURATIVE) {
    if (new RegExp(`\\b${word}`, 'i').test(value)) {
      add('banned-vocabulary-figurative', 'suspicion', path, `"${word}" is banned in the figurative sense - confirm it is literal here`, value);
    }
  }
  if (!isSpokenLine(path)) {
    for (const word of QUOTE_ONLY) {
      if (new RegExp(`\\b${word}`, 'i').test(value)) {
        add('quote-only-vocabulary', 'major', path, `"${word}" is allowed only inside a customer quote`, value);
      }
    }
  }

  if (value.includes('\u2014')) {
    add('em-dash', 'blocker', path, 'em dash - use " - "', value);
  }
  if (value.includes('\u2013')) {
    add('en-dash', 'suspicion', path, 'en dash - fine inside a numeric range, wrong as punctuation', value);
  }

  if (/\bAcme\s+(answers|picks|handles|books|calls|texts|contacts|screens|qualifies|responds|manages|sends|updates|does|delivers|automates|schedules)\b/i.test(value)) {
    // Narrow exemption, copy-rules.md project decision 13: a heading whose object is
    // a competitor category is comparing vendors, which this rule was never about.
    const comparesCategory = /title|heading|headline/i.test(key)
      && /(answering service|chatbot|IVR|call cent|Voiceflow|Botpress|Relevance AI)/i.test(value);
    if (!comparesCategory) {
      add('platform-framing', 'blocker', path, 'Acme is the platform - the agent does the work ("build an agent that...")', value);
    }
  }

  if (!isSpokenLine(path)) {
    for (const [code, pattern] of BANNED_CONSTRUCTIONS) {
      if (pattern.test(plain(value))) add(code, 'major', path, `banned construction (${code})`, value);
    }
  }

  // An authoring marker in a copy field means the page ships the seam. It happened:
  // three `[INPUT NEEDED: source URL]` placeholders rendered to the reader inside a
  // sources block, and nothing in this gate noticed.
  if (/\[INPUT NEEDED|\[CHECK WRAP|\[PLACEHOLDER|TODO|TBD/i.test(value)) {
    add('authoring-marker-in-copy', 'blocker', path, 'an authoring marker is in a rendered copy field - it belongs in the batch review, not on the page', value);
  }

  if (/\b(SOC ?2|HIPAA|GDPR|ISO ?\d{4,5}|PCI ?DSS)\b/i.test(value)) {
    add('certification-claim', 'blocker', path, 'no certification may be named - Acme holds none', value);
  }

  if (/\b600\+\s*integrations/i.test(value)) {
    add('integration-count', 'blocker', path, 'marketing copy uses 2,700+; 600+ is node-level pricing only', value);
  }

  if (/\b(Starter|Launch|Basic|Premium|Pro)\s+(plan|tier)\b/i.test(value)) {
    add('tier-name', 'blocker', path, 'tier names are locked to Pay-as-you-go and Enterprise', value);
  }

  if (/\b(the leading|#1|the best|number one)\b/i.test(value)) {
    add('unverifiable-superlative', 'major', path, 'unverifiable superlative', value);
  }

  if (/\b\d[\d,.]*\s*(credits|free credits)\b/i.test(value) && /title|heading|eyebrow|label|buttonText/i.test(key)) {
    add('credit-math-in-headline', 'blocker', path, 'credit amounts may not appear in a headline, hero line, or CTA', value);
  }

  if (/^learn more$/i.test(value.trim()) && /label|buttonText|text/i.test(key)) {
    add('learn-more-cta', 'blocker', path, '"Learn More" is never a CTA label', value);
  }

  for (const rule of LENGTH_RULES) {
    const applies = rule.code === 'card-headline-too-long'
      ? key === 'title' && /\bcards\[\d+\]\.title$/.test(path)
      : rule.keys.includes(key);
    if (!applies) continue;
    const wordCount = words(value).length;
    if (rule.maxWords && wordCount > rule.maxWords) {
      add(rule.code, 'major', path, `${rule.label}: ${wordCount} words`, value);
    }
    if (rule.minWords && wordCount < rule.minWords) {
      add(rule.code, 'major', path, `${rule.label}: ${wordCount} words`, value);
    }
    if (rule.maxChars && value.length > rule.maxChars) {
      add(rule.code, 'major', path, `${rule.label}: ${value.length} characters`, value);
    }
  }

  if (key === 'metaDescription' && (value.length < 150 || value.length > 160)) {
    add('meta-description-length', 'major', path, `meta description must be 150-160 characters, got ${value.length}`, value);
  }

  for (const sentence of sentences(value)) {
    const count = words(sentence).length;
    // A label or a heading is not a sentence. Without terminal punctuation there is
    // nothing to hold to a sentence-length rule - the length rules cover those.
    const readsAsSentence = /[.!?]/.test(plain(value));
    // The 20-word clarity ceiling and the rhythm rule (one sentence over 25 words per
    // long block) contradict each other in prose. Precedence is in copy-rules.md,
    // project decision 9: flag above 25, and above 30 inside a FAQ answer.
    const ceiling = key === 'answer' ? 30 : 25;
    if (count > ceiling && readsAsSentence && !isSpokenLine(path)) {
      add('sentence-too-long', 'suspicion', path, `sentence runs ${count} words, ceiling for this field is ${ceiling}`, sentence);
    }
    const stack = nounStack(sentence);
    if (stack) {
      add('noun-stack', 'major', path, 'four or more nouns in a row - rewrite as a verb phrase', stack);
    }
  }

  const sents = isSpokenLine(path) || isApprovedVerbatim(value) ? [] : sentences(value);
  if (sents.length >= 3) {
    for (let i = 0; i + 2 < sents.length; i += 1) {
      const lengths = [sents[i], sents[i + 1], sents[i + 2]].map((s) => words(s).length);
      if (Math.max(...lengths) - Math.min(...lengths) <= 3) {
        add('rhythm-flat', 'suspicion', path, `three consecutive sentences within 3 words of each other (${lengths.join('/')})`, sents[i]);
      }
      const openers = [sents[i], sents[i + 1]].map((s) => words(s)[0]?.toLowerCase());
      if (openers[0] && openers[0] === openers[1]) {
        add('opener-repeat', 'suspicion', path, `two consecutive sentences open with "${openers[0]}"`, sents[i]);
      }
    }
  }
}

function checkPage(page: Record<string, unknown>): void {
  const label = String(page.path ?? page.contentKey ?? 'unknown');
  const hits: FieldHit[] = [];
  collectCopy(page, '', hits);

  for (const hit of hits) checkField({ ...hit, path: `${label} ${hit.path}` });
  checkStatSourcing(hits, label);

  // Cross-field checks.
  const statPattern = /\b\d[\d,.]*(?:\.\d+)?\s?(?:%|M\+|\+|x\b)/g;
  const statCounts = new Map<string, string[]>();
  const barePattern = /\b\d{1,3}(?:,\d{3})+\b/g;
  for (const hit of hits) {
    for (const stat of [...(hit.value.match(statPattern) ?? []), ...(hit.value.match(barePattern) ?? [])]) {
      const key = stat.replace(/\s+/g, '');
      statCounts.set(key, [...(statCounts.get(key) ?? []), hit.path]);
    }
  }
  for (const [stat, paths] of statCounts) {
    const parents = new Set(paths.map((path) => path.replace(/\.[A-Za-z]+$/, '')));
    if (paths.length > 1 && parents.size > 1) {
      add('stat-repeated', 'major', `${label} ${paths[0]}`, `stat ${stat} appears ${paths.length} times - each stat is owned by one section`, paths.join(', '));
    }
  }

  if (hits.some((hit) => /92%/.test(hit.value)) && !hits.some((hit) => /chatbot|scripted|rule-based|IVR/i.test(hit.value))) {
    add('restricted-stat', 'blocker', label, 'the 92% vs 64.5% figure is comparison-only and this page does not frame Acme against scripted chatbots');
  }

  const alts = hits.filter((hit) => hit.path.endsWith('alt')).map((hit) => hit.value.trim()).filter(Boolean);
  const duplicateAlts = alts.filter((value, index) => alts.indexOf(value) !== index);
  for (const value of new Set(duplicateAlts)) {
    add('alt-duplicate', 'major', label, 'two images share the same ALT text', value);
  }
  for (const value of alts) {
    if (/^(image|photo|screenshot|picture) of/i.test(value)) {
      add('alt-prefix', 'major', label, 'ALT must not start with "image of" / "photo of" / "screenshot of"', value);
    }
  }

  const blocks = Array.isArray(page.blocks) ? (page.blocks as Array<Record<string, unknown>>) : [];
  const blockTypes = blocks.map((block) => String(block.type));

  const ctaLabels: string[] = [];
  const ctaHrefs: string[] = [];
  for (const hit of hits) {
    if (!/Action\.label$|actions\[\d+\]\.label$|button\.label$/i.test(hit.path)) continue;
    ctaLabels.push(hit.value.trim());
  }
  collectLinks(page, ctaHrefs);
  for (const label_ of ctaLabels) {
    if (!LOCKED_CTA_LABELS.has(label_)) {
      add('cta-label', 'major', label, `CTA label "${label_}" is not in the locked set`, label_);
    }
  }
  const selfServe = ctaHrefs.filter((href) => /^\/signup/.test(href));
  const otherInternal = ctaHrefs.filter((href) => /^\/(request-demo|contact|demo|book)/.test(href));
  if (selfServe.length > 0 && new Set(ctaHrefs.filter((h) => /^\/(signup|start|get-started)/.test(h))).size > 1) {
    add('cta-path-split', 'major', label, 'more than one self-serve destination on the page', [...new Set(ctaHrefs)].join(', '));
  }
  if (otherInternal.length > 2) {
    add('cta-sales-path', 'suspicion', label, `${otherInternal.length} sales-path CTAs - at most one demo and one sales CTA per page`, otherInternal.join(', '));
  }

  // Destinations, not button count. An earlier version of this gate checked labels
  // only, so a page with nine buttons across two destinations and one stray third
  // destination scored a clean pass - the count was done by hand in review, and the
  // hand count and the policy disagreed. The rule that matters is in
  // copy-rules.md -> CTA conventions: one self-serve destination, one sales
  // destination, nothing else.
  const ctaPairs: Array<{ label: string; href: string }> = [];
  collectCtaPairs(page, ctaPairs);
  const classify = (href: string): 'self-serve' | 'sales' | 'other' => {
    if (/signup|get-started|\/start-free|app\.acme\.ai\/(signup|register)/i.test(href)) return 'self-serve';
    if (/demo|contact|sales|popup/i.test(href)) return 'sales';
    return 'other';
  };
  const destinations = new Map<string, Set<string>>();
  for (const pair of ctaPairs) {
    // An off-label CTA is already reported by the label check; it must still count
    // toward the destination rule, or a page escapes the harder check by breaking
    // the easier one.
    const kind = classify(pair.href);
    const normalized = pair.href.replace(/[?#].*$/, '') || pair.href;
    destinations.set(kind, (destinations.get(kind) ?? new Set()).add(normalized));
  }
  for (const kind of ['self-serve', 'sales'] as const) {
    const set = destinations.get(kind);
    if (set && set.size > 1) {
      add('cta-destination-split', 'blocker', label, `${set.size} different ${kind} destinations on one page - the policy allows one`, [...set].join(', '));
    }
  }
  const other = destinations.get('other');
  if (other && other.size > 0) {
    add('cta-third-destination', 'major', label, 'a CTA points somewhere that is neither the self-serve nor the sales destination', [...other].join(', '));
  }
  const ctaCount = ctaPairs.filter((pair) => LOCKED_CTA_LABELS.has(pair.label)).length;
  if (ctaCount > 9) {
    add('cta-count', 'major', label, `${ctaCount} CTAs - the full framework arc tops out at 9 (six positions plus one per pricing tier)`);
  }

  const faqIndex = blockTypes.indexOf('faq');
  if (faqIndex !== -1 && blockTypes.slice(faqIndex + 1).includes('cta')) {
    add('cta-after-faq', 'blocker', label, 'no CTA block may follow the FAQ');
  }

  // Cross-sibling uniformity. `copy-rules.md` -> Rhythm: "Card sets vary internally -
  // uniform length and shape across a 6-card grid is the most common tell in LP copy",
  // and "Bullet sets break parallel construction in at least one item".
  const siblingGroups = new Map<string, FieldHit[]>();
  for (const hit of hits) {
    // Keep the block index: sets are compared within one block, never across blocks.
    const group = hit.path.replace(/^(blocks\[\d+\])/, '$1').replace(/(?<!^blocks)\[\d+\]/g, '[]');
    if (!/description$|title$|text$|answer$/i.test(group)) continue;
    siblingGroups.set(group, [...(siblingGroups.get(group) ?? []), hit]);
  }
  for (const [group, siblings] of siblingGroups) {
    if (siblings.length < 4) continue;
    const openers = siblings.map((hit) => words(hit.value).slice(0, 2).join(' ').toLowerCase());
    const counts = new Map<string, number>();
    for (const opener of openers) counts.set(opener, (counts.get(opener) ?? 0) + 1);
    for (const [opener, count] of counts) {
      if (count >= siblings.length - 1 && count >= 4) {
        add('sibling-openers-uniform', 'major', `${label} ${group}`, `${count} of ${siblings.length} items in this set open with "${opener}" - at least one has to break the pattern`, siblings[0].value);
      }
    }
    const lengths = siblings.map((hit) => words(hit.value).length);
    const isProse = /description$|answer$/i.test(group);
    if (isProse && Math.max(...lengths) - Math.min(...lengths) <= 3 && siblings.length >= 5) {
      add('sibling-lengths-uniform', 'suspicion', `${label} ${group}`, `all ${siblings.length} items in this set are within 3 words of each other (${lengths.join('/')})`);
    }
  }

  const bodyWords = hits
    .filter((hit) => !/metaTitle|metaDescription|og|twitter|alt/i.test(hit.path))
    .reduce((total, hit) => total + words(hit.value).length, 0);
  if (bodyWords > 2200) {
    add('body-too-long', 'major', label, `page body runs ${bodyWords} words, ceiling is 1,800 for a vertical page and 2,200 for a category page`);
  }
  if (bodyWords < 700 && blocks.length > 6) {
    add('body-too-short', 'suspicion', label, `page body runs ${bodyWords} words against a 900-word floor`);
  }

  // Focus keyword placement, when the hero eyebrow carries it.
  const hero = blocks.find((block) => block.type === 'hero' || block.type === 'hero-extended');
  const eyebrow = hero && typeof hero.eyebrow === 'string' ? hero.eyebrow : undefined;
  const seo = (page.seo ?? {}) as Record<string, unknown>;
  if (eyebrow) {
    const keyword = eyebrow.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
    const metaTitle = String(seo.metaTitle ?? '').toLowerCase();
    if (keyword && metaTitle && !metaTitle.includes(keyword.split(' ').slice(0, 3).join(' '))) {
      add('keyword-missing-in-meta', 'suspicion', label, `hero eyebrow renders as the H1 ("${eyebrow}") but the meta title does not lead with it`, String(seo.metaTitle ?? ''));
    }
  }
}

/** Every label/href pair on the page, which is what a CTA actually is. */
function collectCtaPairs(node: unknown, out: Array<{ label: string; href: string }>): void {
  if (Array.isArray(node)) {
    node.forEach((item) => collectCtaPairs(item, out));
    return;
  }
  if (node && typeof node === 'object') {
    const record = node as Record<string, unknown>;
    if (typeof record.label === 'string' && typeof record.href === 'string') {
      out.push({ label: record.label.trim(), href: record.href });
    }
    for (const value of Object.values(record)) collectCtaPairs(value, out);
  }
}

function collectLinks(node: unknown, out: string[]): void {
  if (Array.isArray(node)) {
    node.forEach((item) => collectLinks(item, out));
    return;
  }
  if (node && typeof node === 'object') {
    for (const [key, value] of Object.entries(node)) {
      if ((key === 'url' || key === 'href') && typeof value === 'string') out.push(value);
      else collectLinks(value, out);
    }
  }
}

/**
 * Approved facts. A figure that is not in `copy-data.md` and not in the page
 * brief is an invented number, which is the one failure the rules treat as
 * absolute: "never fill a gap with a plausible-sounding figure".
 */
const approvedSources: string[] = [];
for (const path of [dataPath, briefPath].filter(Boolean) as string[]) {
  try {
    approvedSources.push(await readFile(path, 'utf8'));
  } catch {
    if (path === briefPath) {
      add('brief-unreadable', 'suspicion', path, 'brief not readable - stat sourcing checked against copy-data.md only');
    }
  }
}
/** Thousands separators differ between sources ("2,700+" vs "2700+"), so compare without them. */
function digitsOnly(value: string): string {
  return value.replace(/(\d),(\d)/g, '$1$2');
}

const approvedText = digitsOnly(approvedSources.join('\n').toLowerCase());

/** Figures safe anywhere, per the rules' default social-proof list. */
const DEFAULT_STATS = new Set(['700+', '2300+', '3.2m+', '8', '2700+']);

function checkStatSourcing(hits: FieldHit[], label: string): void {
  if (approvedText.length === 0) return;
  const statShape = /\b\d[\d,.]*\s?(?:%|\+|x\b|M\+)|\$\d[\d,.]{2,}/gi;
  const seen = new Set<string>();
  for (const hit of hits) {
    // A replayed conversation is an illustration: its prices, addresses and times
    // are scenario detail, not claims about the world.
    if (isSpokenLine(hit.path)) continue;
    for (const match of plain(hit.value).match(statShape) ?? []) {
      const stat = digitsOnly(match.trim().toLowerCase()).replace(/\.$/, '');
      if (seen.has(stat) || DEFAULT_STATS.has(stat)) continue;
      seen.add(stat);
      const bare = stat.replace(/[^0-9.]/g, '').replace(/\.$/, '');
      if (bare.length < 2) continue;
      if (!approvedText.includes(bare)) {
        add('unsourced-figure', 'major', `${label} ${hit.path}`, `figure ${match.trim()} is not in copy-data.md${briefPath ? ' or the brief' : ''} - every number needs a source, and a missing one is written [INPUT NEEDED], never estimated`, hit.value);
      }
    }
  }
}

const raw = JSON.parse(await readFile(filePath, 'utf8')) as unknown;
const pages = (Array.isArray(raw) ? raw : (raw as { pages?: unknown[] }).pages ?? []) as Array<Record<string, unknown>>;
const selected = pageFilter ? pages.filter((page) => String(page.path) === pageFilter) : pages;

for (const page of selected) checkPage(page);

const bySeverity = {
  blocker: findings.filter((f) => f.severity === 'blocker'),
  major: findings.filter((f) => f.severity === 'major'),
  suspicion: findings.filter((f) => f.severity === 'suspicion'),
};

const report = {
  ok: bySeverity.blocker.length === 0 && bySeverity.major.length === 0,
  file: filePath,
  pagesChecked: selected.length,
  mode: legacyMode ? 'survey (never fails)' : 'gate',
  counts: {
    blocker: bySeverity.blocker.length,
    major: bySeverity.major.length,
    suspicion: bySeverity.suspicion.length,
  },
  notCheckedHere: [
    'interchangeability test - cover the brand name, could this section sit on a competitor page',
    'read-aloud test',
    'stance - one position held, one limit admitted',
    'active voice with a named actor - a verb whitelist produced four false positives out of five on a real page, so this stays with the reviewer',
    'source quality - publication, year, URL, under 3 years old',
    'desktop 2-row wrap and mobile fold, both render checks',
  ],
  findings: legacyMode
    ? summarize(findings)
    : findings.sort((a, b) => severityRank(a.severity) - severityRank(b.severity)),
};

function severityRank(severity: Severity): number {
  return severity === 'blocker' ? 0 : severity === 'major' ? 1 : 2;
}

function summarize(all: Finding[]): Array<{ code: string; count: number; sample?: string }> {
  const grouped = new Map<string, Finding[]>();
  for (const finding of all) {
    grouped.set(finding.code, [...(grouped.get(finding.code) ?? []), finding]);
  }
  return [...grouped.entries()]
    .map(([code, items]) => ({ code, count: items.length, sample: items[0].sample }))
    .sort((a, b) => b.count - a.count);
}

console.log(JSON.stringify(report, null, 2));

if (!report.ok && !legacyMode) {
  process.exitCode = 1;
}
