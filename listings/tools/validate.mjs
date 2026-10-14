// Validates a listing.json against ListingSchema + cross-field invariants.
// Usage: bun listings/tools/validate.mjs <path/to/listing.json>
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { ListingSchema, WEIGHTS } from "./listing.schema.mjs";

const target = process.argv[2];
if (!target) {
  console.error("usage: bun validate.mjs <listing.json>");
  process.exit(2);
}

let data;
try {
  data = JSON.parse(readFileSync(target, "utf8"));
} catch (err) {
  console.error(`INVALID: cannot read/parse ${target}: ${err.message}`);
  process.exit(1);
}

const parsed = ListingSchema.safeParse(data);
if (!parsed.success) {
  console.error(`INVALID: ${target}`);
  for (const issue of parsed.error.issues) {
    console.error(`  - ${issue.path.join(".")}: ${issue.message}`);
  }
  process.exit(1);
}

const errors = [];

// weighted total must match the fixed weights
const recomputed = Object.entries(WEIGHTS).reduce(
  (sum, [dim, w]) => sum + parsed.data.scores[dim].score * w,
  0
);
if (Math.abs(recomputed - parsed.data.weightedTotal) > 0.051) {
  errors.push(
    `weightedTotal ${parsed.data.weightedTotal} != recomputed ${recomputed.toFixed(2)}`
  );
}

// every photo entry must exist on disk next to listing.json
const dir = dirname(target);
for (const p of parsed.data.photos) {
  if (!existsSync(join(dir, p.file))) errors.push(`missing photo file: ${p.file}`);
}

if (errors.length) {
  console.error(`INVALID: ${target}`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log(`VALID: ${target} (weightedTotal ${parsed.data.weightedTotal}, ${parsed.data.photos.length} photos)`);
