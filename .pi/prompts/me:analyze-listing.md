---
description: Analyze a for-sale listing — photos, geo, bucket rubric, alert card
argument-hint: "[view-house|multifamily|getaway] <listing URL or street address>"
---
Run a full buyer-side diligence pass on the single residential listing
named by `$ARGUMENTS` (a listing URL or a bare street address,
optionally preceded by a bucket name) and produce three deliverables,
in order: a structured rubric JSON, a Telegram-ready alert card, and a
cross-check table — then persist the canonical, schema-validated bundle
(downscaled photos included) to the project at `listings/<slug>/`
(Section 12).

The analysis runs in one of three **buckets** — the buyer hunts in
three distinct modes with different rubrics: `view-house` (the original
hunt: detached house with a view, the default), `multifamily`
(investment: 2–4 units, BART proximity, occupancy), and `getaway`
(small, cheap, ≤3h from SF, nature, turnkey-STR potential). Section 1
resolves the bucket; the bucket's overlay file then supplies the buyer
profile, dimensions, weights, photo focus, card template, and
bucket-specific enrichment and checks.

**Recall > precision.** Listings pend in days; missing a candidate is
far worse than surfacing a marginal one. Never silently drop a listing
— score it and flag doubts instead. When uncertain between "skip" and
"flag", flag.

Everything below is validated procedure. Follow it exactly; do not
redesign it. Where a fact cannot be obtained, record `null` — never
guess or interpolate. The whole point of the pipeline is trust. This
command works in a fresh session: everything you need is in this
template or discoverable from the argument and the project.

## 1. Resolve the bucket and read its overlay

If the first whitespace-separated token of `$ARGUMENTS` is exactly
`view-house`, `multifamily`, or `getaway`, that is the bucket — strip
it; the rest of `$ARGUMENTS` is the URL or address. Otherwise the
bucket is `view-house` (the default; every listing saved before
buckets existed is a view-house record). Only exact bucket names are
recognized — never guess a bucket from a synonym or from the listing
itself.

Read `listings/buckets/<bucket>.md`. It defines everything the rubric
needs: buyer profile, dimension/weight table, photo-pass focus, card
template, extra listing facts, extra enrichment, bucket cross-check
rows. If the file does not exist, stop and say so — bucket overlays
are project data (they live in the oakland-house project's repo); this
command cannot run a rubric without one.

The weights table in the overlay is a rendering for readability. The
CANONICAL weights live in `listings/tools/listing.schema.mjs`
(`WEIGHTS["<bucket>"]`). If they ever disagree, the schema wins — the
validator recomputes `weightedTotal` from the schema and rejects a
record built from drifted overlay weights. Never retune weights.

## 2. Resolve the input to a fetchable URL

Classify the URL-or-address portion of `$ARGUMENTS` and act:

1. **A URL on compass.com** — fetch it directly (Section 3).
2. **A URL on coldwellbanker.com or another IDX/brokerage mirror** —
   fetch it directly.
3. **A URL on redfin.com or zillow.com** — DO NOT FETCH IT. Redfin
   serves AWS WAF 405 CAPTCHAs on property pages and 403s API
   endpoints from datacenter IPs; Zillow is behind PerimeterX.
   Instead, parse the street address out of the URL path, then
   web-search `"<address>" compass OR coldwellbanker` and use a
   fetchable mirror URL. Note the substitution in the output.
4. **A bare address** (e.g. `6064 Colton Blvd, Oakland, CA 94611`) —
   web-search it, prefer a Compass or Coldwell Banker result, and fall
   back to any fetchable IDX mirror. If no fetchable page exists, stop
   and say so; never fabricate listing facts.

If multiple distinct candidate properties match a bare address, stop,
list the candidates, and ask the user to pick.

## 3. Fetch

Work in `/tmp/analyze-listing/<slug>/` (slug = street number + name,
e.g. `6064-colton`). Keep every raw artifact there (page.html, full-res
photos) — the /tmp dir is the scratch audit trail. The durable,
schema-validated bundle lands in the project at `listings/<slug>/`
(Section 12). Print both paths in the final output.

```bash
mkdir -p /tmp/analyze-listing/<slug> && cd /tmp/analyze-listing/<slug>
curl -sL -A 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36' \
  '<listing-url>' -o page.html
```

Verify a non-trivial size (>100 KB for Compass). On 403/404/405 or a
CAPTCHA page: apply the mirror-fallback rule from Section 2 once; if
still blocked, stop and report. Never retry-loop anti-bot pages.

## 4. Extract listing facts

Compass pages carry two structured sources; use both and
cross-validate (other mirrors usually have JSON-LD too):

- **JSON-LD**: the `<script type="application/ld+json">` block(s)
  containing a schema.org graph typed `SingleFamilyResidence` /
  `RealEstateListing` / `Product` (price, address, geo where present).
- **`window.__INITIAL_DATA__`**: embedded JSON with fields such as
  `bathrooms`, `squareFeet`, `lotSizeInSquareFeet`,
  `formattedLotSize` ("0.12 AC / 5,036 SF"), `daysOnMarket`, `price`,
  plus room counts. Beds/baths also appear in the description text.

Save both extractions as artifacts (e.g. `jsonld.json`,
`initial-data.json`). Extract at minimum: **address, price, beds,
baths, sqft, lot size, DOM, status, and the full marketing
description** — plus the bucket's extra facts as defined in the
overlay's "Extra listing facts" section (e.g. `units` and `occupancy`
for multifamily). If a field is absent, record `null` — never guess.
When the sources disagree, JSON-LD wins; note the extraction source
per conflicting field and flag the conflict in the cross-check table.

## 5. Extract and download ALL photos

Validated recipe for Compass (39/39 photos recovered live):

```bash
grep -o 'https://[^"]*compass\.com/m/[a-f0-9]*/origin\.webp' page.html | sort -u > photos.txt
```

If that yield looks low against the gallery (some Compass pages embed
only sized derivatives like `640x480.jpg`), derive origins from every
unique photo hash instead:

```bash
grep -o 'https://[^"]*compass\.com/m/[a-f0-9]\{64\}/' page.html | sort -u | sed 's#$#origin.webp#' > photos.txt
```

For other mirrors, adapt the pattern — photos usually live on a CDN
with a stable path shape. Download every URL, naming the files
`p_01.jpg … p_NN.jpg` (zero-padded, in page order). Validate each:
non-empty and a decodable image (`file` + size). Report
`N downloaded / M found`. Missing photos degrade confidence — note it
and continue with what downloaded.

## 6. Geo enrichment (free, keyless)

```bash
# 1. Census geocoder: address -> coords
curl -s 'https://geocoding.geo.census.gov/geocoder/locations/address?street=<urlencoded>&city=<city>&state=CA&benchmark=Public_AR_Current&format=json'
#    -> .result.addressMatches[0].coordinates  {x: lon, y: lat}

# 2. USGS EPQS: coords -> elevation in feet
curl -s 'https://epqs.nationalmap.gov/v1/json?x=<lon>&y=<lat>&units=Feet&wkid=4326&includeDate=False'
#    -> .value
```

If the page already provides coords, still run the geocoder and
cross-check; flag a disagreement of more than ~150 ft. Then record
known fire-zone context for the area: 94611 (Montclair) is
presumptive **Very High FHSZ**, inside the 1991 Oakland firestorm
footprint — always raise the insurance-availability flag for Oakland
hills zips. For other areas, state FHSZ as "verify on CAL FIRE map"
unless known. For non-California addresses the pipeline still runs,
but the FHSZ line becomes "out of scope — verify local hazard zones".
Record the zone statement verbatim in `listing.fhsz` of the canonical
record.

Then run the bucket's extra enrichment as defined in the overlay's
"Extra enrichment" section (multifamily: `bun listings/tools/bart.mjs
<lat> <lon>`; getaway: OSRM drive time from SF; view-house: none). If
an enrichment tool or endpoint fails, record the corresponding facts
as `null` + note the failure — never guess.

## 7. Downscale every photo (NON-NEGOTIABLE)

```bash
mkdir -p small
for f in p_*.jpg; do ffmpeg -y -loglevel error -i "$f" -vf "scale=1024:-1" -q:v 4 "small/$f"; done
```

Full-res listing photos run ~1.5–3 MB each; at ~35 photos the model
request body exceeded the proxy limit and the run died with
`413 Request Entity Too Large`. Downscaled to 1024px/q4, photos are
~100–220 KB — a ~90% reduction with zero rubric-relevant detail loss.
Only `small/` images are ever read by the model. **Never read the
originals.**

## 8. Photo rubric pass

Read the `small/` images **2–3 per batch, never more** (same 413
lesson). For each photo, record one line: room/subject, light quality,
notable features, risk signals. Keep each line paired with its filename
(`p_07`, …) — these one-liners become the `photos[]` entries of the
canonical record (Section 9), and `/me:compare-listings` leans on them.

Apply the photo-pass focus list from the bucket overlay — it defines
what matters for this rubric (view-house: views/light/character/
privacy; multifamily: per-unit attribution, entrances, meters, parking;
getaway: setting, land character, turnkey evidence, access, utilities).
Two principles apply in every bucket:

- **Living-level vs drone-altitude:** agents include drone shots that
  imply views/setting the property does not have — call this out
  explicitly.
- **Orientation inference:** combine dusk/sunset shots, drone horizon
  landmarks (SF skyline / bridges are west), and the map to state the
  view-side compass facing (e.g. "W-WNW, afternoon sun,
  tree-filtered"). Always label it as inference.

Then synthesize the rubric scores.

## 9. Deliverable A — rubric JSON (canonical record)

Score EVERY dimension of the record's bucket — exactly the dimensions
in `WEIGHTS["<bucket>"]`, no more, no fewer — each 1–5 with a one-line
evidence note citing photo numbers. Weights are FIXED — do not retune.

`weightedTotal` = Σ(score × weight), rounded to one decimal. Show the
weighted math once (each dimension × weight) so the score is
auditable.

The JSON below is the **canonical record**: print it in chat AND save
it verbatim as `listings/<slug>/listing.json` (Section 12). It must
conform to the Zod schema in Section 12 — missing facts are `null`,
never guesses. `source.mirrorOf` is the original redfin/zillow URL
when Section 2 substituted a mirror, otherwise `null`. `fetchedAt` is
UTC (`date -u +%Y-%m-%dT%H:%M:%SZ`). `listing` carries the base fields
below plus the bucket's extra facts from the overlay (multifamily adds
`units`, `occupancy`, `nearestBart`, `bartDistanceMi`; getaway adds
`driveTimeMin`, `driveOrigin`). Structure:

```json
{
  "schemaVersion": 2,
  "bucket": "view-house",
  "slug": "6064-colton",
  "source": { "url": "https://www.compass.com/...", "mirrorOf": null,
              "fetchedAt": "2026-10-13T20:55:00Z" },
  "listing": { "address": "6064 Colton Blvd, Oakland, CA 94611", "price": 998000,
               "beds": 3, "baths": 2, "sqft": 1888, "pricePerSqft": 529,
               "lotAc": 0.12, "dom": 6, "status": "New", "fhsz": "Very High FHSZ (presumptive)",
               "coords": [37.832185, -122.207719], "elevationFt": 950.8,
               "style": "...", "description": "full marketing description" },
  "scores": { "view": { "score": 2.5, "note": "...cites p_06, p_21..." },
              "<dimension>": { "score": 3, "note": "exactly the bucket's dimensions" } },
  "weightedTotal": 3.3,
  "verdict": "one paragraph, plain English, says what trade-off this property IS",
  "flags": ["emoji-prefixed risk lines"],
  "positives": ["verified upside lines"],
  "orientationInference": "facing + light pattern + 'inference' label",
  "photos": [ { "file": "photos/p_01.jpg", "note": "one-line VLM observation" } ],
  "crosschecks": [ { "check": "Marketing claims vs photos", "result": "..." } ]
}
```

## 10. Deliverable B — Telegram card

Use the card template from the bucket overlay's "Card template"
section. One compact block, skimmable on a phone. This command only
*formats* the card; it does not send it anywhere.

## 11. Deliverable C — cross-check table

The shared rows below, plus the bucket overlay's "Bucket cross-check
rows":

| Check | Result |
|---|---|
| Marketing claims vs photos | Verified / contradicted, with photo refs (reward honest listings; name dishonest ones) |
| Geocoder vs page coords | agreement or flag |
| Elevation / micro-market | context (e.g. "~350 ft from <reference comp>") |
| Orientation | photo+drone corroboration of inferred facing |
| FHSZ / insurance | zone statement + flag |
| Amenity claims | drone/marketing claims verified against map |

## 12. Persist to the project and validate

Chat output is ephemeral. The durable record lives in the project
where this command runs, in a standardized layout that
`/me:compare-listings` consumes:

```
package.json               # root workspace manifest (workspaces: ["listings/tools"])
bun.lock                   # bun lockfile, generated by bun install (commit it)
listings/
  buckets/
    <bucket>.md            # bucket overlays — project data, committed to VCS
  tools/
    listing.schema.mjs     # Zod schema (canonical, versioned)
    validate.mjs           # validator CLI
    bart.mjs               # nearest-BART CLI (multifamily bucket)
    bart-stations.json     # official BART station coords
    package.json           # { type: module, deps: zod } — workspace member
  <slug>/
    listing.json           # Deliverable A, verbatim
    photos/p_01.jpg ...    # downscaled 1024px copies (from small/)
    card.txt               # Deliverable B
    crosscheck.md          # Deliverable C
```

Steps, in order:

1. **Scaffold on first run in this project** (skip if
   `listings/tools/validate.mjs` already exists): write the three
   `.mjs` files below verbatim, regenerate `bart-stations.json` with
   the recipe below, write the member `listings/tools/package.json`:

   ```json
   {
     "name": "listing-tools",
     "private": true,
     "type": "module",
     "dependencies": { "zod": "^3.23.8" }
   }
   ```

   and write the root workspace manifest (project root `package.json`):

   ```json
   {
     "name": "<project-dir-name>",
     "private": true,
     "type": "module",
     "workspaces": ["listings/tools"],
     "scripts": { "validate": "bun listings/tools/validate.mjs" }
   }
   ```

   If a root `package.json` already exists, do not overwrite it — add
   `"listings/tools"` to its `workspaces` array. Ensure `.gitignore`
   contains `node_modules/`. If legacy npm artifacts exist
   (`listings/tools/package-lock.json`, or a `node_modules/` created
   before this switch), delete them first — never mix npm and bun
   artifacts.

   Then run from the project root:
   `bun install --cache-dir /tmp/bun-cache`
   (bun resolves the workspace, writes `bun.lock` at the root, and
   links zod into `listings/tools/node_modules` via its isolated
   layout. The explicit cache dir keeps the install working in
   sandboxed sessions where the global bun cache
   `~/.bun/install/cache` is read-only; the cache is disposable.)

   Regenerate `bart-stations.json` from the official BART API
   (the key below is BART's published public demo key):

   ```bash
   curl -s --max-time 20 \
     'https://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y' \
   | jq -r '"[\n" + ([.root.stations.station[] | "  {\"name\": \(.name|tojson), \"abbr\": \(.abbr|tojson), \"coords\": [\(.gtfs_latitude|tonumber), \(.gtfs_longitude|tonumber)]}"] | join(",\n")) + "\n]"' \
   > listings/tools/bart-stations.json
   jq 'length' listings/tools/bart-stations.json   # expect ~50
   ```

   `listing.schema.mjs`:

   ```js
   // Canonical schema for a saved listing bundle (schemaVersion 2).
   // Written by /me:analyze-listing; consumed by /me:compare-listings.
   import { z } from "zod";

   export const BUCKETS = ["view-house", "multifamily", "getaway"];

   // Weights are FIXED — do not retune. The overlays in listings/buckets/
   // render these tables for readability; if they ever disagree, THIS file
   // wins (the validator recomputes weightedTotal from these weights).
   export const WEIGHTS = {
     "view-house": {
       view: 0.18,
       natural_light: 0.14,
       character: 0.10,
       kitchen: 0.10,
       privacy: 0.10,
       layout_flow: 0.08,
       primary_suite: 0.08,
       outdoor_space: 0.08,
       condition: 0.08,
       lot_usability: 0.06,
     },
     multifamily: {
       location_bart: 0.20,
       units_config: 0.18,
       unit_condition: 0.14,
       natural_light: 0.12,
       occupancy_deal: 0.10,
       rent_potential: 0.10,
       building_systems: 0.10,
       outdoor_space: 0.06,
     },
     getaway: {
       drive_time_sf: 0.22,
       view: 0.16,
       lot_nature: 0.16,
       turnkey_airbnb: 0.12,
       price_accessibility: 0.10,
       condition: 0.10,
       natural_light: 0.08,
       character: 0.06,
     },
   };

   const nullableNumber = z.number().nullable();

   const dimensionScore = z.object({
     score: z.number().min(1).max(5),
     note: z.string().min(1),
   });

   // Exactly the bucket's dimensions, no others — strict so a record can
   // never mix dimensions across buckets.
   const scoresObject = (bucket) => {
     const shape = {};
     for (const dim of Object.keys(WEIGHTS[bucket])) shape[dim] = dimensionScore;
     return z.object(shape).strict();
   };

   const baseListing = z.object({
     address: z.string().min(1),
     price: nullableNumber,
     beds: nullableNumber,
     baths: nullableNumber,
     sqft: nullableNumber,
     pricePerSqft: nullableNumber,
     lotAc: nullableNumber,
     dom: nullableNumber,
     status: z.string().nullable(),
     fhsz: z.string().nullable(),
     coords: z.tuple([z.number(), z.number()]).nullable(),
     elevationFt: nullableNumber,
     style: z.string().nullable(),
     description: z.string().nullable(),
   });

   const common = {
     schemaVersion: z.literal(2),
     slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
     source: z.object({
       url: z.string().url(),
       mirrorOf: z.string().url().nullable(),
       fetchedAt: z.string().datetime(),
     }),
     weightedTotal: z.number().min(1).max(5),
     verdict: z.string().min(1),
     flags: z.array(z.string()),
     positives: z.array(z.string()),
     orientationInference: z.string(),
     photos: z
       .array(z.object({ file: z.string().min(1), note: z.string().min(1) }))
       .min(1),
     crosschecks: z
       .array(z.object({ check: z.string().min(1), result: z.string().min(1) }))
       .min(1),
   };

   export const ListingSchema = z.discriminatedUnion("bucket", [
     z.object({
       ...common,
       bucket: z.literal("view-house"),
       listing: baseListing,
       scores: scoresObject("view-house"),
     }),
     z.object({
       ...common,
       bucket: z.literal("multifamily"),
       listing: baseListing.extend({
         units: nullableNumber,
         occupancy: z.string().nullable(),
         nearestBart: z.string().nullable(),
         bartDistanceMi: nullableNumber,
       }),
       scores: scoresObject("multifamily"),
     }),
     z.object({
       ...common,
       bucket: z.literal("getaway"),
       listing: baseListing.extend({
         driveTimeMin: nullableNumber,
         driveOrigin: z.string().nullable(),
       }),
       scores: scoresObject("getaway"),
     }),
   ]);
   ```

   `validate.mjs`:

   ```js
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

   // weighted total must match the fixed weights for the record's bucket
   const weights = WEIGHTS[parsed.data.bucket];
   const recomputed = Object.entries(weights).reduce(
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

   console.log(`VALID: ${target} (${parsed.data.bucket}, weightedTotal ${parsed.data.weightedTotal}, ${parsed.data.photos.length} photos)`);
   ```

   `bart.mjs`:

   ```js
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
   ```

2. **Write the bundle**: `listings/<slug>/listing.json` (the exact
   JSON from Section 9), copy `small/p_*.jpg` into
   `listings/<slug>/photos/`, save Deliverable B as `card.txt` and
   Deliverable C as `crosscheck.md`. Do NOT copy the full-res
   originals — they stay in the /tmp audit trail.

3. **Validate**:
   `bun listings/tools/validate.mjs listings/<slug>/listing.json`
   must print `VALID`. If it does not, fix the record — never weaken
   the schema — and re-run until valid. The validator re-checks the
   weighted math against the fixed weights for the record's bucket and
   confirms every `photos[]` entry exists on disk. If bun is not on
   PATH, enter the project's dev shell (`nix develop`) or install bun;
   do not substitute node/npm install — mixing package managers
   corrupts the workspace layout.

4. **Print both paths**: the /tmp scratch audit trail and the
   canonical `listings/<slug>/` bundle.

## Failure handling

| Failure | Behavior |
|---|---|
| 403/404/405 or CAPTCHA on fetch | One mirror-fallback per Section 2; then stop with a clear message. Never retry-loop anti-bot pages. |
| `413 Request Entity Too Large` mid-run | You violated Section 7/8 (full-res read, or batch >3). Downscale, restart the photo pass with batches of 2. |
| Bucket overlay file missing | Stop and say so — overlays are project data; the command cannot run a rubric without one (Section 1). |
| First token not an exact bucket name | Not a failure — it is part of the address; bucket defaults to `view-house` (Section 1). |
| Bucket enrichment fails (bart.mjs / OSRM) | Record the affected facts as `null` + note the failure; continue. Never guess a distance or drive time. |
| Missing listing field | `null` + note in cross-checks. Never interpolate. |
| Photo download failures | Report N/M, continue with what downloaded, add a lower-confidence note. |
| Ambiguous bare address (multiple matches) | Stop, list candidates, ask the user. |
| Non-California address | Pipeline still runs; FHSZ line becomes "out of scope — verify local hazard zones". |

## Hard rules

1. **Never fetch redfin.com or zillow.com directly.** Mirrors only.
2. **Never read a full-res listing photo into the model.** 1024px/q4
   downscale first.
3. **Never more than 3 images per read batch.**
4. **Never fabricate.** `null` beats a guess; the whole point is
   trust.
5. Recall > precision: when uncertain between "skip" and "flag",
   flag.
6. Keep the raw audit trail in `/tmp/analyze-listing/<slug>/` AND the
   canonical bundle in `listings/<slug>/`; print both paths.
7. Show the weighted math once (dimension × weight) so the score is
   auditable.
8. `listing.json` must pass `listings/tools/validate.mjs` before the
   command reports success. Fix the record, never the schema.
9. Every record carries a `bucket`, and its `scores` contain exactly
   that bucket's dimensions — never mix dimensions across buckets.
   Buckets are only ever the exact names `view-house`, `multifamily`,
   `getaway`; `view-house` is the default.
10. Weights are canonical in `listings/tools/listing.schema.mjs`;
    overlay tables are renderings. Never retune.
