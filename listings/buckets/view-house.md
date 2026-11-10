# Bucket: view-house (default)

The original hunt: a detached house (or condo/SFR) with a view, for
owner-occupancy. This is the default bucket — every listing saved before
buckets existed is a view-house record.

## Buyer profile

A solo technical buyer house-hunting in Lamorinda and the
Oakland/Berkeley hills (e.g. Moraga, Montclair 94611); condos and SFRs
are both in scope. They care about views, natural light, architectural
character, indoor-outdoor flow, and privacy, and they are sensitive to
wildfire risk (FHSZ), insurance availability, flat roofs, stilt/pier
foundations, jalousie windows, and power lines.

## Dimensions and weights

Canonical source: `WEIGHTS["view-house"]` in
`listings/tools/listing.schema.mjs`. This table is a rendering — if
they disagree, the schema wins.

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

## Extra listing facts

None beyond the base fields.

## Extra enrichment

None beyond the shared geo pass.

## Photo-pass focus

Calibrated on real runs:

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

## Card template

```
🏡 <address> — $XXX,XXX · Bbd/Bba · N,NNN sqft ($NNN/sf) · N DOM
⭐ X.X/5 — <6-10 word essence: what trade-off this house is>
☀️ Light: <stars/phrase> · Views: <stars/phrase>
🌲 <character + outdoor + standout amenity, one line>
⚠️ <top 3-5 flags, terse — FHSZ/insurance always first when applicable>
📍 <elevation, notable proximity, orientation inference>
🔻 <verdict line: who this is for / vs the current reference comp if one exists>
```

## Bucket cross-check rows

| Check | Result |
|---|---|
| Bed/bath count legitimacy | "real 3rd bedroom" vs "office fudge" — judge from photos |
