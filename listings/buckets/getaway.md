# Bucket: getaway

A small, cheap, remote getaway — a weekend cabin / nature retreat,
optionally a turnkey short-term-rental play.

## Buyer profile

The same solo technical buyer, but hunting escape, not commute. The
hard gate: **no farther than 3 hours' drive from SF — the closer, the
better.** Views matter again, but so does *space in nature*: lot
acreage, trees, usable wild space, real privacy from neighbors and the
road. Small is good — a small footprint means cheap to buy, cheap to
heat, easy to lock-and-leave. Turnkey for Airbnb is even better:
furnished, styled, permitted where required, ideally with rental
history.

## Dimensions and weights

Canonical source: `WEIGHTS["getaway"]` in
`listings/tools/listing.schema.mjs`. This table is a rendering — if
they disagree, the schema wins.

| dimension | weight | calibration |
|---|---|---|
| drive_time_sf | 0.22 | from `driveTimeMin` (OSRM): ≤75 min → 5; 76–105 → 4; 106–135 → 3; 136–165 → 2; 166–180 → 1.5; >180 → 1, plus a hard flag "outside the 3h gate". If `driveTimeMin` is null, score 2.5 and mark the note "unknown — drive time unavailable" |
| view | 0.16 | same discipline as view-house: living-level vs drone-altitude; tree canopy, ridge lines, water |
| lot_nature | 0.16 | acreage, trees/meadow, usable wild space, privacy from neighbors and road noise. Sub-0.1 ac in-town lot → ≤2; multi-acre forested parcel with a sit spot → 5 |
| turnkey_airbnb | 0.12 | furnished + styled + rental history stated → 5; clean and rentable as-is → 3; needs furnishing/work → 1. Always flag "verify county STR permit rules" — many rural counties restrict or lottery short-term rentals |
| price_accessibility | 0.10 | cheap is the point: ≤$350k → 5; $350–500k → 4; $500–650k → 3; $650–800k → 2; >$650k... weigh against what else that money buys; >$800k → 1 |
| condition | 0.10 | roof, foundation/piers, water source, septic. Spring/well + septic is normal out there — flag only if failing or unknown-age; "on municipal water/sewer" is a plus |
| natural_light | 0.08 | cabins skew dark (eaves, trees); a bright great-room is a differentiator |
| character | 0.06 | A-frame, log, mid-century cabin, wood stove, loft — charm vs generic box |

## Extra listing facts

Extract into `listing` (base fields plus these; absent → `null`):

- `driveTimeMin` (number) — OSRM driving minutes, rounded to whole
  minutes.
- `driveOrigin` (string) — the SF reference point used, recorded
  verbatim (e.g. "SF Ferry Building, 37.7955,-122.3937").

## Extra enrichment

After the shared geo pass, compute driving time from SF with OSRM
(free, keyless, no account):

```bash
# SF origin: SF Ferry Building 37.7955,-122.3937 — the reference point
# for "hours from SF". To move the origin, change it here AND in this
# sentence, and record the actual origin in listing.driveOrigin.
curl -s --max-time 20 'https://router.project-osrm.org/route/v1/driving/<propLon>,<propLat>;-122.3937,37.7955?overview=false'
# -> .routes[0].duration is seconds; convert to minutes
```

Note the argument order: OSRM wants `lon,lat` for both points, SF
origin second. If OSRM is unreachable, times out, or returns no route
(island, ferry-only access), record `driveTimeMin: null` + note the
reason — never guess a drive time. Cross-check the result against the
marketing claim ("just 2.5 hours from the city!" is a classic
exaggeration) and against map sanity.

FHSZ stays fully in scope — rural/forested means MORE fire exposure,
not less; also check for seasonal road access (unplowed snow, dirt
roads) and note it.

## Photo-pass focus

Everything in the view-house risk/condition list still applies (fire
is often the dominant risk here: vegetation to structure, wood shake,
decks on slopes). In addition:

- **Setting over structure:** what the windows and deck actually face;
  tree-filtered vs open vistas; how close the nearest structure is.
- **Land character:** slope of the lot (steep unusable hillside vs
  flat meadow), cleared areas, water features, outbuildings.
- **Turnkey evidence:** staged-for-rental furniture, welcome-book
  shots, smart lock / lockbox, "sold furnished" language cross-checked
  against photos.
- **Access:** driveway condition, dirt road, steep approach, snow
  country cues, garage/carport.
- **Utilities:** propane tank, wood stove, well equipment, septic
  indicators, panel condition — rural systems are diligence items.
- **Darkness discipline:** cabins under tree canopy photograph dim —
  separate "photographed at dusk" from "always dark".

## Card template

```
🏕️ <address> — $XXX,XXX · Bbd/Bba · N,NNN sqft ($NNN/sf) · N DOM
⭐ X.X/5 — <6-10 word essence: what this getaway is>
🚗 <Nh NNmin from SF> <— flag if outside the 3h gate>
🌲 <lot acreage + nature/privacy, one line> · Views: <phrase>
🛋️ <turnkey/Airbnb status + county permit flag>
⚠️ <top 3-5 flags, terse — fire/access/utilities first when applicable>
📍 <nearest town + elevation + water/septic if known>
🔻 <verdict line: weekend cabin vs STR play vs pass>
```

## Bucket cross-check rows

| Check | Result |
|---|---|
| Drive-time claim | marketing hours vs OSRM minutes — name exaggerations |
| Turnkey/STR claim | furnished/permitted claims vs photos; county STR rules flag |
| Land usability | lot acres vs actual usable/sloped land in photos |
| Utilities | water source + septic stated or unknown; propane/wood heat |
