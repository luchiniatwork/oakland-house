# Bucket: multifamily

An investment hunt: a small multi-family property (duplex, triplex,
fourplex — 2–4 units), bought for rental income with optionality, not
for owner-occupancy of the whole property.

## Buyer profile

The same solo technical buyer, but wearing an investor hat. What makes
the deal: number and mix of units, quality of the units, and whether
they are delivered vacant or tenant-occupied (vacant = financeable on
better terms, immediately flexible, no eviction exposure). Location is
scored primarily on BART proximity — car-optional transit access is
what rents units fast at good prices in the East Bay. Sunlight matters
too — at least one unit must be genuinely bright; a building where
every unit is dim rents slowly and turns over. The usual risk
sensitivities still apply (FHSZ, insurance, foundations) plus
investor-specific ones: soft-story/brick buildings, unpermitted units,
rent-control drag.

## Dimensions and weights

Canonical source: `WEIGHTS["multifamily"]` in
`listings/tools/listing.schema.mjs`. This table is a rendering — if
they disagree, the schema wins.

| dimension | weight | calibration |
|---|---|---|
| location_bart | 0.20 | from `bartDistanceMi`, sanity-checked against the map for walkability (freeway cuts, steep hills): ≤0.3 mi walkable → 5; ≤0.6 → 4; ≤1.0 → 3; ≤2.0 → 2; >2.0 → 1 |
| units_config | 0.18 | count + bed/bath mix + separate entrances + separate meters + laundry. 2–4 legal units, separately metered/entered → high. A house with an "in-law unit" fudge, shared meters, or an unpermitted unit → low, and flag the permit question |
| unit_condition | 0.14 | finishes tier across ALL units (flip-grade vs custom), appliance brands, window age, deferred maintenance per unit |
| natural_light | 0.12 | at least one unit genuinely bright → 4–5; light in some but not the best unit → 3; every unit dim → ≤2 |
| occupancy_deal | 0.10 | delivered fully vacant → 5; partial vacancy / owner unit only → 3; fully tenant-occupied at below-market rents → 1–2. Note Oakland/Berkeley rent control + just-cause eviction; Costa-Hawkins vacancy decontrol means vacated units reset to market |
| rent_potential | 0.10 | if rents are stated: gross yield = annual gross rent ÷ price — ≥7% → 5; 5–7% → 4; 4–5% → 3; 3–4% → 2; <3% → 1. If not stated, judge from unit count/config and label the note as inference |
| building_systems | 0.10 | roof, foundation, plumbing/electrical age, seismic. Soft-story (tuck-under parking) or unreinforced brick → ≤2 + flag; evidence of seismic retrofit → credit it |
| outdoor_space | 0.06 | yard usability for tenants, parking count (parking rents!), storage, shared vs private outdoor areas |

## Extra listing facts

Extract into `listing` (base fields plus these; absent → `null`):

- `units` (number) — from structured data or the description.
- `occupancy` (string) — e.g. "delivered vacant", "2 of 3 units
  tenant-occupied", "owner occupies one unit". Quote the listing's own
  claim.
- `nearestBart` (string) — station name from the enrichment tool.
- `bartDistanceMi` (number) — straight-line miles from the enrichment
  tool, rounded to 2 decimals.

## Extra enrichment

After the shared geo pass, run:

```bash
bun listings/tools/bart.mjs <lat> <lon>
```

It prints the nearest BART station and straight-line miles (haversine
over the official BART station list). Record both in `listing`. Then
verify walkability against the map: straight-line distance lies when a
freeway or a steep hill sits between the property and the station —
note the verdict in the cross-check table. If the tool fails, record
`null` + note — never guess.

## Photo-pass focus

Everything in the view-house risk/condition list still applies (fire,
foundations, power lines, renovation tier). In addition:

- **Attribute photos to units.** When determinable (agent captions,
  floor-plan order, style breaks), label which unit each photo shows
  in the one-line note ("unit 2 kitchen…"). If the photos only show
  one unit, say so — the others may be tenant-occupied and
  unphotographable, which is itself evidence for `occupancy`.
- **Per-unit light:** which units get real windows and sun; basement
  or tuck-under units are usually the dim ones.
- **Separate entrances and meters:** photograph evidence of separate
  entries, meter banks, panels — supports `units_config` legality.
- **Parking and approach:** tuck-under parking = soft-story question;
  count spaces.
- **Common/utility areas:** laundry, storage, yards — who uses them.

## Card template

```
🏘️ <address> — $XXX,XXX · N units (<mix: 2×1bd + 1×2bd>) · N,NNN sqft ($NNN/sf) · N DOM
⭐ X.X/5 — <6-10 word essence: what kind of deal this is>
🚇 <nearest BART: name, X.X mi, walkable or not>
👤 <occupancy status> · Yield: <stated or est., or "not stated">
☀️ Light: <which units bright, one phrase>
⚠️ <top 3-5 flags — soft-story/permits/rent-control first when applicable>
📍 <neighborhood + elevation>
🔻 <verdict line: who this pencils for / what breaks the deal>
```

## Bucket cross-check rows

| Check | Result |
|---|---|
| Unit count legitimacy | claimed units vs photo evidence + permit question — name suspected unpermitted units |
| Occupancy claim vs evidence | vacant-staging photos, single-unit-only photo sets, worn vs staged |
| BART walkability | straight-line distance verified against the map (freeways, hills) |
| Rent/yield claims | stated rents → computed yield; flag if absurd vs market |
