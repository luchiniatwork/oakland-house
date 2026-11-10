---
description: Compare saved listings side-by-side and rank them
argument-hint: "<slug, slug, ...> — directory names under listings/"
---
Compare the previously saved listings named by `$ARGUMENTS` and rank
them for the buyer. Every saved listing belongs to exactly one
**bucket** — `view-house`, `multifamily`, or `getaway` — recorded in
its `listing.json`, and buckets use different rubrics, so a comparison
is only ever run WITHIN one bucket (Section 3 enforces this). The
buyer profile, weighting rationale, and rubric calibration for the
bucket being compared live in `listings/buckets/<bucket>.md`; the
canonical weights live in `listings/tools/listing.schema.mjs`
(`WEIGHTS["<bucket>"]`).

Disk is the only source of truth. This command never fetches listings
and never compares from memory: it reads validated bundles from
`listings/` in the project root. It works in a fresh session —
everything it needs is on disk.

## 1. Resolve inputs

- `$ARGUMENTS` is a comma- and/or space-separated list of slugs —
  directory names under `listings/` (e.g. `6064-colton, 6401-snake`).
- Run `ls listings/` first. Resolve each argument by exact or unique
  prefix match. If an argument matches nothing, stop and print the
  available slugs. If a prefix is ambiguous, stop and ask the user.
- Fewer than two resolved listings → stop. A comparison needs at
  least two; suggest running `/me:analyze-listing` on more listings
  first.

## 2. Load and validate

For each slug:

1. `listings/<slug>/listing.json` must exist.
2. Validate it:

   ```bash
   bun listings/tools/validate.mjs listings/<slug>/listing.json
   ```

   If `listings/tools/` is missing, this project has never saved a
   listing — stop and say so. If a record fails validation, stop,
   name the corrupt or legacy listing, and suggest re-saving it with
   `/me:analyze-listing <url>`. Never compare unvalidated data.
   If validation fails because zod cannot be resolved, run
   `bun install` at the project root and retry — a fresh clone or
   `jj restore` may not have installed workspace deps yet.
3. Read the full record: `bucket`, the facts (base fields plus the
   bucket's extra facts), all dimension scores with their evidence
   notes, verdict, flags, positives, orientation inference, per-photo
   notes, and cross-checks.

## 3. Bucket gate (NON-NEGOTIABLE)

All resolved records MUST share the same `bucket`. If they do not,
stop: print each slug with its bucket, and explain that weightedTotals
from different rubrics are not comparable — a multifamily investment,
a view-house home, and a remote getaway answer different questions, so
a single ranking across them would be false precision. Suggest running
the command once per bucket. Then read the matching overlay
`listings/buckets/<bucket>.md` — it carries the buyer profile and
calibration notes the ranking analysis leans on.

## 4. Photos (tie-breaks only)

The per-photo notes in each record usually suffice. When they are too
thin to break a tie on a specific dimension, you may read the saved
images — `listings/<slug>/photos/*.jpg` are already downscaled to
1024px — **maximum 3 per batch**, and cite the filenames you relied
on. Never hunt for full-res originals; there are none in the bundle.

## 5. Side-by-side table

One markdown table, one column per listing (ordered by
`weightedTotal`, best first), in this row order:

- shared fact rows: address, price, $/sqft, beds/baths, sqft,
  lot (ac), DOM, status, elevation (ft), FHSZ zone
- bucket fact rows (from the overlay's "Extra listing facts"):
  multifamily adds units, occupancy, nearest BART, BART distance (mi);
  getaway adds drive time from SF (min) and drive origin; view-house
  adds none
- the bucket's rubric dimensions in weight order, taken from
  `WEIGHTS["<bucket>"]` in `listings/tools/listing.schema.mjs` — read
  the file, do not recall weights from memory
- `weighted_total`, value (`weightedTotal` ÷ price in $M)

**Bold** the best value in each row. Render nulls as `—` with a
footnote — never interpolate.

## 6. Ranked analysis

1. **Ranking** — 1..N: slug, `weightedTotal`, and one sentence naming
   the trade-off the property is and why it sits at that rank.
2. **Head-to-head callouts** — for each meaningful pair: which
   dimensions separate them, and what the separator costs (price and
   $/sqft delta).
3. **Flags** — split into SHARED (apply to every listing, e.g. the
   same FHSZ zone → insurance risk cancels out as a differentiator)
   and DIFFERENTIATING (apply to some — these drive the ranking).
4. **Cross-check contradictions** — name any listing whose marketing
   was contradicted by its photos; proven dishonesty discounts trust
   in every other field of that record.

## 7. Verdict and sensitivity

- Overall pick in 2–3 sentences: which listing, for which posture,
  and the single reason it wins.
- Sensitivity: name the one or two judgment changes that would flip
  the ranking, phrased with THIS bucket's actual dimensions and
  weights (e.g. "if the `drive_time_sf` weight rose from 0.22 to 0.30,
  `<slug>` overtakes `<slug>`").

## 8. Save the comparison

Write the full report (side-by-side table + ranked analysis +
verdict) to
`listings/comparisons/<yyyymmddThhmmssZ>-<slugA>-vs-<slugB>[-...].md`
(UTC timestamp) and print the path.

## Hard rules

1. Compare only validated on-disk records — never fetch, never work
   from memory.
2. Missing field = `—` + footnote; never interpolate.
3. Photos: only `listings/<slug>/photos/` (already downscaled), max 3
   per batch, and cite filenames.
4. Every comparative claim traces to `listing.json` fields or cited
   photos.
5. Save the report under `listings/comparisons/` and print the path.
6. Never compare across buckets (Section 3), and never render a
   dimension that is not in the record's bucket — the dimension set
   and weights come from the schema, not from memory.
