// One-shot migration: schemaVersion 1 -> 2. Adds bucket "view-house"
// (every pre-buckets record was analyzed under the view-house rubric).
// Usage: bun listings/tools/migrate.mjs listings/<slug>/listing.json [...]
import { readFileSync, writeFileSync } from "node:fs";

const targets = process.argv.slice(2);
if (!targets.length) {
  console.error("usage: bun migrate.mjs <listing.json> [...]");
  process.exit(2);
}

let migrated = 0, skipped = 0, failed = 0;
for (const target of targets) {
  try {
    const data = JSON.parse(readFileSync(target, "utf8"));
    if (data.schemaVersion === 2) {
      console.log(`SKIP: ${target} (already v2)`);
      skipped++;
      continue;
    }
    if (data.schemaVersion !== 1) {
      throw new Error(`unknown schemaVersion ${JSON.stringify(data.schemaVersion)}`);
    }
    const { schemaVersion: _discarded, ...rest } = data;
    const out = { schemaVersion: 2, bucket: "view-house", ...rest };
    writeFileSync(target, JSON.stringify(out, null, 2) + "\n");
    console.log(`MIGRATED: ${target}`);
    migrated++;
  } catch (err) {
    console.error(`FAILED: ${target}: ${err.message}`);
    failed++;
  }
}

console.log(`migrated ${migrated}, skipped ${skipped}, failed ${failed}`);
process.exit(failed ? 1 : 0);
