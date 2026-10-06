import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { performance } from 'node:perf_hooks';

import { argString, parseArgs, writeJson } from '../migrate/source-utils';

type GateResult = {
  name: string;
  command: string;
  ok: boolean;
  durationMs: number;
  exitCode?: number;
  stdoutTail?: string;
  stderrTail?: string;
};

const args = parseArgs();
const out = argString(args, 'out', 'data/source/poc-launch-suite-report.json')!;
const npmBin = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const execFileAsync = promisify(execFile);
const gates = [
  gate('web-build', ['--workspace', '@acme/web', 'run', 'build']),
  gate('typecheck', ['run', 'typecheck']),
  gate('content', ['run', 'qa:content']),
  gate('page-contract', ['run', 'qa:page-contract']),
  gate('no-hotlinks', ['run', 'qa:no-hotlinks']),
  gate('no-inline-block-styles', ['run', 'qa:no-inline-block-styles']),
  gate('seo', ['run', 'qa:seo']),
  gate('site-index', ['run', 'qa:site-index']),
  gate('signup-links', ['run', 'qa:signup-links']),
  gate('toc', ['run', 'qa:toc']),
  gate('tips-dates', ['run', 'qa:tips-dates', '--', '--out', 'data/source/tips-dates-report.json']),
  gate('links', ['run', 'qa:links']),
  gate('media-handoff', ['run', 'cms:media-handoff']),
  gate('media-sync-dry-run', ['run', 'cms:media-sync', '--', '--out', 'data/cms/media-sync-report.json']),
  gate('media', ['run', 'qa:media', '--', '--out', 'data/source/media-availability-report.json']),
  gate('html-structure', ['run', 'qa:html-structure', '--', '--out', 'data/source/html-structure-report.json']),
  gate('forms', ['run', 'qa:forms', '--', '--out', 'data/source/forms-report.json']),
  gate('form-api', ['run', 'qa:form-api', '--', '--out', 'data/source/form-api-report.json']),
  gate('payload-roundtrip', ['run', 'qa:payload-roundtrip', '--', '--out', 'data/source/payload-roundtrip-report.json']),
  gate('route-coverage', ['run', 'qa:route-coverage', '--', '--out', 'data/source/route-coverage-report.json']),
  gate('block-root-attrs', ['run', 'qa:block-root-attrs', '--', '--out', 'data/source/block-root-attrs-report.json']),
];
const results: GateResult[] = [];
const startedAt = new Date().toISOString();
const suiteStart = performance.now();

for (const item of gates) {
  console.log(`Running ${item.name}: ${npmBin} ${item.args.join(' ')}`);
  results.push(await runGate(item.name, item.args));
}

const failing = results.filter((result) => !result.ok);
const report = {
  ok: failing.length === 0,
  generatedAt: new Date().toISOString(),
  startedAt,
  durationMs: Math.round(performance.now() - suiteStart),
  gateCount: results.length,
  passingGateCount: results.length - failing.length,
  failingGateCount: failing.length,
  gates: results,
};

await writeJson(out, report);
console.log(JSON.stringify(report, null, 2));

if (failing.length > 0) {
  process.exit(1);
}

function gate(name: string, args: string[]) {
  return { name, args };
}

async function runGate(name: string, args: string[]): Promise<GateResult> {
  const started = performance.now();

  try {
    const { stdout, stderr } = await execFileAsync(npmBin, args, {
      cwd: process.cwd(),
      maxBuffer: 1024 * 1024 * 30,
      env: process.env,
      shell: process.platform === 'win32',
    });

    return {
      name,
      command: `${npmBin} ${args.join(' ')}`,
      ok: true,
      durationMs: Math.round(performance.now() - started),
      stdoutTail: tail(stdout),
      stderrTail: tail(stderr),
    };
  } catch (error) {
    const failure = error as {
      code?: number;
      stdout?: string;
      stderr?: string;
    };

    return {
      name,
      command: `${npmBin} ${args.join(' ')}`,
      ok: false,
      durationMs: Math.round(performance.now() - started),
      exitCode: failure.code,
      stdoutTail: tail(failure.stdout ?? ''),
      stderrTail: tail(failure.stderr ?? ''),
    };
  }
}

function tail(value: string): string | undefined {
  const trimmed = value.trim();

  if (!trimmed) {
    return undefined;
  }

  const lines = trimmed.split(/\r?\n/);
  return lines.slice(-25).join('\n');
}
