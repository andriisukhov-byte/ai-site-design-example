import { argString, parseArgs, writeJson } from './source-utils';

type GuideRecord = { id: number; slug: string; guide_tag?: number[] };
type TagRecord = { id: number; name: string };

const args = parseArgs();
const sourceBase = argString(args, 'source-base', 'https://dev.acme.example')!.replace(/\/+$/, '');
const out = argString(args, 'out', 'data/source/guide-taxonomy-reference.json')!;
const guides = await fetchJson<GuideRecord[]>(`${sourceBase}/wp-json/wp/v2/guide?per_page=100&_fields=id,slug,guide_tag`);
const tags = await fetchJson<TagRecord[]>(`${sourceBase}/wp-json/wp/v2/guide_tag?per_page=100&_fields=id,name`);
const tagById = new Map(tags.map((tag) => [tag.id, tag.name]));

await writeJson(out, {
  generatedAt: new Date().toISOString(),
  source: `${sourceBase}/wp-json/wp/v2/guide`,
  records: guides.map((guide) => ({
    sourceId: guide.id,
    slug: guide.slug,
    tags: (guide.guide_tag ?? []).map((id) => tagById.get(id)).filter((name): name is string => Boolean(name)),
  })),
});

console.log(JSON.stringify({ ok: true, out, guides: guides.length, tagged: guides.filter((guide) => guide.guide_tag?.length).length }, null, 2));

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Source request failed (${response.status}): ${url}`);
  return response.json() as Promise<T>;
}
