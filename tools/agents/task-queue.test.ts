import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { run } from "./task-queue";

const root = await mkdtemp(join(tmpdir(), "acme-task-queue-"));
const resultFile = join(root, "result.json");
const reviewFile = join(root, "review.json");
const originalLog = console.log;
const originalTable = console.table;

console.log = () => undefined;
console.table = () => undefined;

try {
  await run([
    "enqueue",
    "--root",
    root,
    "--actor",
    "main",
    "--id",
    "WEB-001",
    "--title",
    "Queue smoke test",
    "--lane",
    "web",
    "--role",
    "frontend-integration",
    "--allowed-file",
    "apps/web/example.ts",
    "--acceptance",
    "npm.cmd run typecheck",
  ]);

  await run([
    "claim",
    "--root",
    root,
    "--actor",
    "web-worker",
    "--id",
    "WEB-001",
    "--lease-minutes",
    "10",
  ]);
  await run([
    "heartbeat",
    "--root",
    root,
    "--actor",
    "web-worker",
    "--id",
    "WEB-001",
  ]);

  await writeFile(
    resultFile,
    JSON.stringify({
      summary: "Implemented the smoke-test slice.",
      commit: "abc1234",
      changedFiles: ["apps/web/example.ts"],
      checks: [{ command: "npm.cmd run typecheck", status: "passed" }],
      sharedChangesRequested: [],
    }),
    "utf8",
  );
  await run([
    "submit",
    "--root",
    root,
    "--actor",
    "web-worker",
    "--id",
    "WEB-001",
    "--result",
    resultFile,
  ]);
  await assert.rejects(
    run(["accept", "--root", root, "--actor", "main", "--id", "WEB-001"]),
    /requires an approved review/,
  );
  await writeFile(
    reviewFile,
    JSON.stringify({
      verdict: "approved",
      summary: "Scope and checks are acceptable.",
      findings: [],
    }),
    "utf8",
  );
  await run([
    "review",
    "--root",
    root,
    "--actor",
    "code-reviewer",
    "--id",
    "WEB-001",
    "--result",
    reviewFile,
  ]);
  await run(["accept", "--root", root, "--actor", "main", "--id", "WEB-001"]);

  const completed = JSON.parse(
    await readFile(join(root, "done", "WEB-001.json"), "utf8"),
  );
  assert.equal(completed.status, "done");
  assert.equal(completed.owner, "web-worker");
  assert.equal(completed.result.commit, "abc1234");
  assert.deepEqual(
    completed.history.map((event: { action: string }) => event.action),
    ["enqueued", "claimed", "heartbeat", "submitted", "reviewed", "accepted"],
  );

  await assert.rejects(
    run(["purge", "--root", root, "--older-than-days", "0"]),
    /without --yes/,
  );

  await run([
    "enqueue",
    "--root",
    root,
    "--actor",
    "main",
    "--id",
    "CMS-002",
    "--title",
    "Blocked task recovery",
    "--lane",
    "cms",
    "--role",
    "cms-mapper",
  ]);
  await run([
    "claim",
    "--root",
    root,
    "--actor",
    "cms-worker",
    "--id",
    "CMS-002",
  ]);
  await assert.rejects(
    run([
      "heartbeat",
      "--root",
      root,
      "--actor",
      "other-worker",
      "--id",
      "CMS-002",
    ]),
    /belongs to cms-worker/,
  );
  await run([
    "block",
    "--root",
    root,
    "--actor",
    "cms-worker",
    "--id",
    "CMS-002",
    "--reason",
    "Missing field decision",
    "--question",
    "Which product-native field should be used?",
  ]);
  await run([
    "requeue",
    "--root",
    root,
    "--actor",
    "main",
    "--id",
    "CMS-002",
    "--reason",
    "Field decision supplied",
  ]);

  const requeued = JSON.parse(
    await readFile(join(root, "queued", "CMS-002.json"), "utf8"),
  );
  assert.equal(requeued.owner, null);
  assert.equal(requeued.blocker, undefined);

  await run([
    "enqueue",
    "--root",
    root,
    "--actor",
    "main",
    "--id",
    "QA-003",
    "--title",
    "Atomic claim",
    "--lane",
    "qa",
    "--role",
    "visual-qa",
  ]);
  const claims = await Promise.allSettled([
    run(["claim", "--root", root, "--actor", "qa-worker-a", "--id", "QA-003"]),
    run(["claim", "--root", root, "--actor", "qa-worker-b", "--id", "QA-003"]),
  ]);
  assert.equal(
    claims.filter((claim) => claim.status === "fulfilled").length,
    1,
    "exactly one concurrent claim must succeed",
  );

  const claimedPath = join(root, "claimed", "QA-003.json");
  const expired = JSON.parse(await readFile(claimedPath, "utf8"));
  expired.leaseUntil = "2000-01-01T00:00:00.000Z";
  await writeFile(claimedPath, JSON.stringify(expired), "utf8");
  await run(["sweep", "--root", root, "--actor", "dispatcher"]);
  assert.equal(
    JSON.parse(await readFile(join(root, "queued", "QA-003.json"), "utf8"))
      .owner,
    null,
  );
} finally {
  console.log = originalLog;
  console.table = originalTable;
  await rm(root, { recursive: true, force: true });
}

console.log("agent task queue smoke test passed");
