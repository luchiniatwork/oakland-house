// Nearest BART station to a coordinate (haversine, statute miles).
// Usage: bun listings/tools/bart.mjs <lat> <lon>
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const [lat, lon] = process.argv.slice(2).map(Number);
if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
  console.error("usage: bun bart.mjs <lat> <lon>");
  process.exit(2);
}

const here = dirname(fileURLToPath(import.meta.url));
let stations;
try {
  stations = JSON.parse(readFileSync(join(here, "bart-stations.json"), "utf8"));
} catch (err) {
  console.error(`cannot read bart-stations.json next to bart.mjs: ${err.message}`);
  console.error("restore it from VCS or re-run the /me:analyze-listing scaffold step");
  process.exit(1);
}

const toRad = (d) => (d * Math.PI) / 180;
const R_MI = 3958.7613;
const dist = (a, b) => {
  const dLat = toRad(b[0] - a[0]);
  const dLon = toRad(b[1] - a[1]);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a[0])) * Math.cos(toRad(b[0])) * Math.sin(dLon / 2) ** 2;
  return 2 * R_MI * Math.asin(Math.sqrt(h));
};

const ranked = stations
  .map((s) => ({ name: s.name, abbr: s.abbr, mi: dist([lat, lon], s.coords) }))
  .sort((a, b) => a.mi - b.mi);

const n = ranked[0];
console.log(`${n.name} (${n.abbr}) — ${n.mi.toFixed(2)} mi straight-line from ${lat},${lon}`);
console.log(`next: ${ranked[1].name} ${ranked[1].mi.toFixed(2)} mi, ${ranked[2].name} ${ranked[2].mi.toFixed(2)} mi`);
