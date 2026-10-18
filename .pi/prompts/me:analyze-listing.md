---
description: Analyze a for-sale listing — photos, geo, VLM rubric, alert card
argument-hint: "<listing URL or street address>"
---
Run a full buyer-side diligence pass on the single residential listing
named by `$ARGUMENTS` (a listing URL or a bare street address) and
produce three deliverables, in order: a structured rubric JSON, a
Telegram-ready alert card, and a cross-check table — then persist the
canonical, schema-validated bundle (downscaled photos included) to the
project at `listings/<slug>/` (Section 11).

Buyer profile (why the rubric is weighted this way): a solo technical
buyer house-hunting in Lamorinda and the Oakland/Berkeley hills (e.g.
Moraga, Montclair 94611); condos and SFRs are both in scope. They care
about views, natural light, architectural character, indoor-outdoor
flow, and privacy, and they are sensitive to wildfire risk (FHSZ),
insurance availability, flat roofs, stilt/pier foundations, jalousie
windows, and power lines.

**Recall > precision.** Listings pend in days; missing a candidate is
far worse than surfacing a marginal one. Never silently drop a listing
— score it and flag doubts instead. When uncertain between "skip" and
"flag", flag.

Everything below is validated procedure. Follow it exactly; do not
redesign it. Where a fact cannot be obtained, record `null` — never
guess or interpolate. The whole point of the pipeline is trust. This
command works in a fresh session: everything you need is in this
template or discoverable from the argument.

## 1. Resolve the input to a fetchable URL

Classify `$ARGUMENTS` and act:

1. **A URL on compass.com** — fetch it directly (Section 2).
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

## 2. Fetch

Work in `/tmp/analyze-listing/<slug>/` (slug = street number + name,
e.g. `6064-colton`). Keep every raw artifact there (page.html, full-res
photos) — the /tmp dir is the scratch audit trail. The durable,
schema-validated bundle lands in the project at `listings/<slug>/`
(Section 11). Print both paths in the final output.

```bash
mkdir -p /tmp/analyze-listing/<slug> && cd /tmp/analyze-listing/<slug>
curl -sL -A 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36' \
  '<listing-url>' -o page.html
```

Verify a non-trivial size (>100 KB for Compass). On 403/404/405 or a
CAPTCHA page: apply the mirror-fallback rule from Section 1 once; if
still blocked, stop and report. Never retry-loop anti-bot pages.

## 3. Extract listing facts

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
description**. If a field is absent, record `null` — never guess. When
the sources disagree, JSON-LD wins; note the extraction source per
conflicting field and flag the conflict in the cross-check table.

## 4. Extract and download ALL photos

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

## 5. Geo enrichment (free, keyless)

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

## 6. Downscale every photo (NON-NEGOTIABLE)

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

## 7. Photo rubric pass

Read the `small/` images **2–3 per batch, never more** (same 413
lesson). For each photo, record one line: room/subject, light quality,
notable features, risk signals. Keep each line paired with its filename
(`p_07`, …) — these one-liners become the `photos[]` entries of the
canonical record (Section 8), and `/me:compare-listings` leans on them.
Then synthesize the rubric.

What to look for (calibrated on real runs):

- **Views:** what is actually visible from living level — bay/water/
  city, hills, trees, or neighbors' walls. Distinguish *living-level*
  views from *drone-altitude* views: agents include drone shots that
  imply views the house does not have — call this out explicitly.
- **Light:** window sizes/orientation, skylights, sun patches on
  floors, dusk vs midday shots. Bedrooms relying on high clerestories
  are "moderate", not "bright".
- **Character:** post-and-beam, wood ceilings, glass walls,
  Eichler/MCM elements vs generic.
- **Privacy:** neighbor distance (stilted hills homes can sit 15–40 ft
  away) and what kitchen-sink and bedroom windows face.
- **Risk signals:** eucalyptus/vegetation touching structure, dry
  grass slopes, wood decks + siding in fire country, flat roof,
  skylights, jalousie windows, power lines, stilt foundations,
  scaffolding/construction next door.
- **Condition:** renovation quality tier (flip-grade vs custom),
  appliance brands, original vs updated windows, deferred maintenance.
- **Amenity honesty:** drone shots of a nearby village/parks are
  marketing — verify plausibility against the map and credit them as
  "area amenity", not a property feature.
- **Orientation inference:** combine dusk/sunset shots, drone horizon
  landmarks (SF skyline / bridges are west), and the map to state the
  view-side compass facing (e.g. "W-WNW, afternoon sun,
  tree-filtered"). Always label it as inference.

## 8. Deliverable A — rubric JSON (canonical record)

Ten dimensions, each scored 1–5 with a one-line evidence note citing
photo numbers. Weights are FIXED — do not retune:

| dimension | weight |
|---|---|
| view | 0.18 |
| natural_light | 0.14 |
| character | 0.10 |
| kitchen | 0.10 |
| privacy | 0.10 |
| layout_flow | 0.08 |
| primary_suite | 0.08 |
| outdoor_space | 0.08 |
| condition | 0.08 |
| lot_usability | 0.06 |

`weightedTotal` = Σ(score × weight), rounded to one decimal. Show the
weighted math once (each dimension × weight) so the score is
auditable.

The JSON below is the **canonical record**: print it in chat AND save
it verbatim as `listings/<slug>/listing.json` (Section 11). It must
conform to the Zod schema in Section 11 — missing facts are `null`,
never guesses. `source.mirrorOf` is the original redfin/zillow URL
when Section 1 substituted a mirror, otherwise `null`. `fetchedAt` is
UTC (`date -u +%Y-%m-%dT%H:%M:%SZ`). Structure:

```json
{
  "schemaVersion": 1,
  "slug": "6064-colton",
  "source": { "url": "https://www.compass.com/...", "mirrorOf": null,
              "fetchedAt": "2026-10-13T20:55:00Z" },
  "listing": { "address": "6064 Colton Blvd, Oakland, CA 94611", "price": 998000,
               "beds": 3, "baths": 2, "sqft": 1888, "pricePerSqft": 529,
               "lotAc": 0.12, "dom": 6, "status": "New", "fhsz": "Very High FHSZ (presumptive)",
               "coords": [37.832185, -122.207719], "elevationFt": 950.8,
               "style": "...", "description": "full marketing description" },
  "scores": { "view": { "score": 2.5, "note": "...cites p_06, p_21..." } },
  "weightedTotal": 3.3,
  "verdict": "one paragraph, plain English, says what trade-off this house IS",
  "flags": ["emoji-prefixed risk lines"],
  "positives": ["verified upside lines"],
  "orientationInference": "facing + light pattern + 'inference' label",
  "photos": [ { "file": "photos/p_01.jpg", "note": "one-line VLM observation" } ],
  "crosschecks": [ { "check": "Marketing claims vs photos", "result": "..." } ]
}
```

## 9. Deliverable B — Telegram card

One compact block, skimmable on a phone. This command only *formats*
the card; it does not send it anywhere. Template:

```
🏡 <address> — $XXX,XXX · Bbd/Bba · N,NNN sqft ($NNN/sf) · N DOM
⭐ X.X/5 — <6-10 word essence: what trade-off this house is>
☀️ Light: <stars/phrase> · Views: <stars/phrase>
🌲 <character + outdoor + standout amenity, one line>
⚠️ <top 3-5 flags, terse — FHSZ/insurance always first when applicable>
📍 <elevation, notable proximity, orientation inference>
🔻 <verdict line: who this is for / vs the current reference comp if one exists>
```

## 10. Deliverable C — cross-check table

| Check | Result |
|---|---|
| Marketing claims vs photos | Verified / contradicted, with photo refs (reward honest listings; name dishonest ones) |
| Geocoder vs page coords | agreement or flag |
| Elevation / micro-market | context (e.g. "~350 ft from <reference comp>") |
| Orientation | photo+drone corroboration of inferred facing |
| FHSZ / insurance | zone statement + flag |
| Amenity claims | drone/marketing claims verified against map |
| Bed/bath count legitimacy | "real 3rd bedroom" vs "office fudge" — judge from photos |

## 11. Persist to the project and validate

Chat output is ephemeral. The durable record lives in the project
where this command runs, in a standardized layout that
`/me:compare-listings` consumes:

```
package.json               # root workspace manifest (workspaces: ["listings/tools"])
bun.lock                   # bun lockfile, generated by bun install (commit it)
listings/
  tools/
    listing.schema.mjs     # Zod schema (canonical, versioned)
    validate.mjs           # validator CLI
    package.json           # { type: module, deps: zod } — workspace member
  <slug>/
    listing.json           # Deliverable A, verbatim
    photos/p_01.jpg ...    # downscaled 1024px copies (from small/)
    card.txt               # Deliverable B
    crosscheck.md          # Deliverable C
```

Steps, in order:

1. **Scaffold on first run in this project** (skip if
   `listings/tools/validate.mjs` already exists): write the two `.mjs`
   files below verbatim, write the member `listings/tools/package.json`:

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

   `listing.schema.mjs`:

   ```js
   // Canonical schema for a saved listing bundle (schemaVersion 1).
   // Written by /me:analyze-listing; consumed by /me:compare-listings.
   import { z } from "zod";

   export const WEIGHTS = {
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
   };

   const nullableNumber = z.number().nullable();

   const dimensionScore = z.object({
     score: z.number().min(1).max(5),
     note: z.string().min(1),
   });

   export const ListingSchema = z.object({
     schemaVersion: z.literal(1),
     slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
     source: z.object({
       url: z.string().url(),
       mirrorOf: z.string().url().nullable(),
       fetchedAt: z.string().datetime(),
     }),
     listing: z.object({
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
     }),
     scores: z.object({
       view: dimensionScore,
       natural_light: dimensionScore,
       character: dimensionScore,
       kitchen: dimensionScore,
       privacy: dimensionScore,
       layout_flow: dimensionScore,
       primary_suite: dimensionScore,
       outdoor_space: dimensionScore,
       condition: dimensionScore,
       lot_usability: dimensionScore,
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
   });
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
   ```

2. **Write the bundle**: `listings/<slug>/listing.json` (the exact
   JSON from Section 8), copy `small/p_*.jpg` into
   `listings/<slug>/photos/`, save Deliverable B as `card.txt` and
   Deliverable C as `crosscheck.md`. Do NOT copy the full-res
   originals — they stay in the /tmp audit trail.

3. **Validate**:
   `bun listings/tools/validate.mjs listings/<slug>/listing.json`
   must print `VALID`. If it does not, fix the record — never weaken
   the schema — and re-run until valid. The validator re-checks the
   weighted math against the fixed weights and confirms every
   `photos[]` entry exists on disk. If bun is not on PATH, enter the
   project's dev shell (`nix develop`) or install bun; do not
   substitute node/npm install — mixing package managers corrupts the
   workspace layout.

4. **Print both paths**: the /tmp scratch audit trail and the
   canonical `listings/<slug>/` bundle.

## Failure handling

| Failure | Behavior |
|---|---|
| 403/404/405 or CAPTCHA on fetch | One mirror-fallback per Section 1; then stop with a clear message. Never retry-loop anti-bot pages. |
| `413 Request Entity Too Large` mid-run | You violated Section 6/7 (full-res read, or batch >3). Downscale, restart the photo pass with batches of 2. |
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
