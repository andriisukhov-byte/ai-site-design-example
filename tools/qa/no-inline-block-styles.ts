import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const repoRoot = process.cwd();
const blocksDir = path.join(
  repoRoot,
  "apps",
  "web",
  "src",
  "components",
  "blocks",
);
const violations: Array<{
  file: string;
  line: number;
  rule: string;
  text: string;
}> = [];

async function collectFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) return collectFiles(fullPath);
      if (!/\.(astro|tsx)$/.test(entry.name)) return [];
      return [fullPath];
    }),
  );

  return files.flat();
}

function recordMatches(
  file: string,
  source: string,
  pattern: RegExp,
  rule: string,
) {
  const lines = source.split(/\r?\n/);
  lines.forEach((line, index) => {
    if (pattern.test(line)) {
      violations.push({
        file: path.relative(repoRoot, file),
        line: index + 1,
        rule,
        text: line.trim(),
      });
    }
  });
}

const files = await collectFiles(blocksDir);

for (const file of files) {
  const source = await readFile(file, "utf8");

  recordMatches(file, source, /<style\b/, "no-style-tags-in-block-renderers");
  recordMatches(
    file,
    source,
    /\bstyle\s*=/,
    "no-inline-style-attributes-in-block-renderers",
  );
}

if (violations.length > 0) {
  console.error(JSON.stringify({ ok: false, violations }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({ ok: true, scanned: files.length }, null, 2));
