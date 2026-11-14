# Listings

The buyer hunts in three distinct modes, each with its own rubric and
weights (see [`buckets/`](buckets/) — canonical weights in
[`tools/listing.schema.mjs`](tools/listing.schema.mjs)):

| Bucket | Hunt | Analyze command |
|---|---|---|
| `view-house` | Oakland/Berkeley hills detached house with a view (the default) | `/me:analyze-view-house` |
| `multifamily` | Investment: 2–4 units, BART proximity, occupancy | `/me:analyze-multifamily` |
| `getaway` | Small, cheap, ≤3h from SF, nature, turnkey-STR potential | `/me:analyze-getaway` |

**Scores are only comparable within a bucket** — each rubric has
different dimensions and weights, so this README keeps one leaderboard
per bucket. Every listing folder below contains a `bucket` field in its
`listing.json`; folders saved before buckets existed are all
`view-house` records.

## Folder layout

Each listing folder contains:

| File | Purpose |
|---|---|
| `card.txt` | One-line summary card: price, stats, score, tradeoffs |
| `listing.json` | Structured scored record (`ListingSchema`, score out of 5) |
| `crosscheck.md` | Verification notes / claims cross-checked against the listing |
| `photos/` | Listing photos (`p_NN.jpg`) |
| `STRATEGY.md` | Pursuit playbook (only where one exists) |
| `web-research.md` | Supplemental web research (only where one exists) |
| `disclosure-analysis.md` | Disclosure-package analysis (only where one exists) |
| `visit-notes.md` | Open-house / tour notes (only where one exists) |

## View-house

Oakland/Berkeley hills detached house with a view — the original hunt.
Statuses/DOM re-verified against Compass (via Jina proxy), MLSListings, and Coldwell Banker/Homefinder IDX mirrors on 2026-11-14. Ask = current/last list price; Sold = closing price; $/sf computed on ask (sold rows carry closing $/sf in the Sold cell).

| | Score | Address | Ask | Sold | Bd/Ba | Sqft | $/sf (ask) | Status |
|---|---|---|---|---|---|---|---|---|
| [`6401-snake/`](6401-snake/) | 4.2 | 6401 Snake Rd | $998,000 | $1,260,000 ($914/sf) | 2/2 | 1,379 | $724 | SOLD 10/26 (+26% over ask) |
| [`6944-snake/`](6944-snake/) | 4.1 | 6944 Snake Rd | $995,000 | — | 4/3 | 2,364 | $421 | Active, 9 DOM (listed 11/5; OH 11/14–15); SFAR RESFAR #426174132, fetched via Jina proxy (Compass WAF-blocked); verified panoramic Bay/SF views + rare flat garden; Very High FHSZ (presumptive) — quote insurance first; shared driveway via 58 Hemlock Ln; lower level unphotographed — verify in person; $421/sf vs Snake comps' $828–914/sf closes = list-low/bid-up |
| [`6833-snake/`](6833-snake/) | 4.0 | 6833 Snake Rd | $899,000 | $1,675,000 ($828/sf) | 4/2 | 2,023 | $444 | SOLD 10/8 (+86% over ask) |
| [`318-capricorn/`](318-capricorn/) | 3.8 | 318 Capricorn Ave | $895,000 | — | 2/2 | 1,655 | $541 | PENDING 11/10 (12 DOM) — agent-owned, $835K seller-carryback — see [STRATEGY.md](318-capricorn/STRATEGY.md); '76 Sea Ranch–style treehouse + studio; FHSZ "NonWildland" per 2025 LRA map but '91 firestorm footprint — quote insurance first |
| [`15-north/`](15-north/) | 3.8 | 15 North Cir | $1,149,000 | — | 4/2.5 | 2,410 | $477 | PENDING 10/28 (13 DOM) — still pending 11/14 |
| [`5970-rincon/`](5970-rincon/) | 3.8 | 5970 Rincon Dr | $895,000 | — | 2/1 | 1,192 | $751 | PENDING 10/27 (12 DOM) — still pending 11/14 |
| [`6077-skyline/`](6077-skyline/) | 3.7 | 6077 Skyline Blvd | $1,250,000 | — | 3/3 | 1,551 | $806 | flip — see [STRATEGY.md](6077-skyline/STRATEGY.md); 73 CDOM (IDX 11/14, OH 11/14); still $1.25M after 2nd cut 10/22 ($145K off Jul ask) + fallen escrow |
| [`1488-summit/`](1488-summit/) | 3.6 | 1488 Summit Rd, Berkeley | $1,460,000 | — | 3/2.5 | 1,320 | $1,106 | 28 DOM (OH 11/14–15); cut $20K to $1.46M ~11/12 after teaser pulled — repriced +48% ($999,999 → $1.48M) on 10/30; sold $1.8M '21 |
| [`1076-grizzly-peak/`](1076-grizzly-peak/) | 3.5 | 1076 Grizzly Peak Blvd, Berkeley | $1,049,000 | — | 3/3* | 1,866 | $562 | PENDING by 11/4 (listed 10/26; ≤9 DOM) — still pending 11/14; *3rd bd/ba = detached cottage, non-conforming (MLS duplex); $186K under 2021 sale |
| [`6773-wilton/`](6773-wilton/) | 3.5 | 6773 Wilton Dr | $1,099,000 | — | 3/2 | 1,710 | $643 | PENDING 10/15 (14 DOM) — still pending 11/14 (30 days in escrow) |
| [`6931-pinehaven/`](6931-pinehaven/) | 3.5 | 6931 Pinehaven Rd | $1,049,000 | — | 4/3.5 | 2,336 | $449 | short sale — see [STRATEGY.md](6931-pinehaven/STRATEGY.md); 28 DOM |
| [`7099-pinehaven/`](7099-pinehaven/) | 3.5 | 7099 Pinehaven Rd | $899,000 | — | 5/3 | 2,492 | $361 | PENDING 11/5 (16 DOM); 3bd main + detached 2bd ADU; $476K under '20 sale ($1.375M) |
| [`6625-snake/`](6625-snake/) | 3.4 | 6625 Snake Rd | $849,000 | — | 4/2 | 1,512 | $561 | PENDING 11/11 (13 DOM) — see [visit-notes.md](6625-snake/visit-notes.md); '59 MCM treehouse, canyon view only; $100K under 2022 sale |
| [`3615-brunell/`](3615-brunell/) | 3.4 | 3615 Brunell Dr | $899,000 | — | 3/1.5 | 1,748* | $514 | PENDING ~11/13 (12 DOM per MLSListings); '54 MCM post-and-beam time capsule w/ real bay views; Very High FHSZ confirmed (2025 LRA) — quote insurance first; *marketed sqft vs 1,252 public record (lower level incl., disclosed) |
| [`7094-pinehaven/`](7094-pinehaven/) | 3.4 | 7094 Pinehaven Rd | $795,000 | $1,150,000 ($752/sf) | 3/2 | 1,530 | $520 | SOLD 11/10 (+45% over ask) |
| [`33-eastwood/`](33-eastwood/) | 3.3 | 33 Eastwood Ct | $988,000 | — | 3/2 | 1,547 | $639 | 36 DOM; flip — seller paid $770K on 7/14/26 (+28% ask) |
| [`5924-balboa/`](5924-balboa/) | 3.2 | 5924 Balboa Dr | $699,000 | — | 2/2 | 923 | $757 | 66 DOM; contingent-show since 11/9 |
| [`177-diablo/`](177-diablo/) | 2.1 | 177 Diablo Dr | $950,000 | — | 2/2 | 1,631* | $582 | off-MLS Compass Private Exclusive — login-gated, 0 public photos, DOM n/a (still active per 11/11 sync); Very High FHSZ (presumptive) — call the agent; *public-record sqft |

## Multifamily

Investment hunt: 2–4 units, BART proximity, occupancy. No listings yet — analyze one with `/me:analyze-multifamily`.

## Getaway

Small, cheap retreat ≤3h from SF (hard gate), nature, turnkey-STR potential.

| | Score | Address | Ask | Bd/Ba | Sqft | Lot | Drive from SF | Status |
|---|---|---|---|---|---|---|---|---|
| [`33940-jennifer/`](33940-jennifer/) | 3.2 | 33940 Jennifer Way, Coarsegold | $197,000 | 0 (2 lofts)/1 | 240 | 2.85 ac | 3h59m OSRM ⚠️ outside gate | Active, 304 DOM (price unchanged since 8/25 cut to $197K); turnkey furnished tiny house on wheels on 2.85 gated oak acres w/ sunset views — shared well + tanks + generator, septic; verify Madera Co. STR permit + title; Compass WAF-blocked, fetched via Coldwell Banker mirror |
| [`2329-woodland/`](2329-woodland/) | 3.2 | 2329 Woodland Dr, Pine Mountain Club | $260,000 | 2/1 | 960 | 0.25 ac | 6h09m OSRM ⚠️ outside gate | Active, 16 DOM (listed 10/29; CB daysOnMarket=1 anomaly flagged); fully furnished "Pilgrim Cottage" knotty-pine cabin w/ living-level ridge views from deck + gazebo; verified HOA amenities (golf/tennis/pool/fishing lake); snow country at 5,504 ft, wall+pellet heat only; water/septic unstated; verify Kern Co STR permit + PMC POA CC&Rs; Compass WAF-blocked, fetched via Coldwell Banker mirror |
| [`32774-road/`](32774-road/) | 2.9 | 32774 Road 400, Coarsegold | $400,000 | 3/3* | 2,300* | 1.00 ac | 3h55m OSRM ⚠️ outside gate | Active, 177 DOM (listed 5/21, cut $25K from $425K on 10/3); second CRMLS record #FR26243595 synced 11/13 (2bd/3ba/2,300sf) — still $400K; 1972 custom cabin on 1-ac oak knoll w/ living-level ridge views, 2 stone fireplaces, detached 725sf 2-bay garage w/ power+water; *agent-entered 3bd/3ba/2,300sf (Fresno MLS) vs 2bd/1+2ba/1,529sf assessor (MRMLS dup listing) — possible unpermitted lower level, verify; 93614 = 43% Very High/49% High FHSZ — quote insurance first; unfurnished/not turnkey — verify Madera Co. STR permit; Compass WAF-blocked, fetched via Homefinder mirror |

## Comparisons

Comparisons run within a bucket only: every matchup below is
view-house except the 11-10 comp, the first getaway matchup. The
10-15/10-18 comps are benchmarked
against 6401 Snake (top score); the 10-26 set compares the active
mid-tier listings head-to-head, plus a clearing-price scenario overlay
(not a validated comparison); the 10-27 comp pits 6077 Skyline against
the new 1076 Grizzly Peak; the 10-30 comps pit the new 318 Capricorn
against 6077 Skyline (pick: Capricorn) and 7099 Pinehaven against the
new 6625 Snake (pick: Pinehaven); the 11-05 comp pits 33 Eastwood
against 7094 Pinehaven (pick: Pinehaven — pending since 10/21, so
Eastwood is the actionable active alternative); the second 11-05 comp
pits the two highest-scored active listings, 6944 Snake and 318
Capricorn, head-to-head (pick: 6944 Snake — its verified panoramic
Bay/SF view beats Capricorn's 5.0 character on the fixed weights,
though Capricorn wins on weighted-points-per-$M); the 11-10 comp pits
33940 Jennifer against 32774 Road (pick: 33940 Jennifer — its
turnkey-furnished $197k tiny-home package on 2.85 gated oak acres
beats Road's unfurnished $400k cabin on the getaway weights; the whole
margin lives in the turnkey_airbnb dimension, and both fail the 3h
gate, so the pick only stands if the buyer relaxes it to ~4h):

| Date | Matchup |
|---|---|
| 2026-10-15 | [6401 Snake vs 33 Eastwood](comparisons/20261015T070635Z-6401-snake-vs-33-eastwood.md) |
| 2026-10-15 | [6401 Snake vs 6773 Wilton](comparisons/20261015T073306Z-6401-snake-vs-6773-wilton.md) |
| 2026-10-15 | [6401 Snake vs 6833 Snake](comparisons/20261015T075717Z-6401-snake-vs-6833-snake.md) |
| 2026-10-18 | [6401 Snake vs 6931 Pinehaven vs 5924 Balboa](comparisons/20261018T022735Z-6401-snake-vs-6931-pinehaven-vs-5924-balboa.md) |
| 2026-10-26 | [5970 Rincon vs 6077 Skyline vs 7099 Pinehaven](comparisons/20261026T031201Z-5970-rincon-vs-6077-skyline-vs-7099-pinehaven.md) |
| 2026-10-26 | [Scenario: Rincon/Skyline/Pinehaven clearing prices](comparisons/20261026T032338Z-scenario-rincon-skyline-pinehaven-clearing-prices.md) (overlay, not validated) |
| 2026-10-27 | [6077 Skyline vs 1076 Grizzly Peak](comparisons/20261027T165453Z-6077-skyline-vs-1076-grizzly-peak.md) |
| 2026-10-28 | [6401 Snake vs 6077 Skyline vs 6625 Snake](comparisons/20261028T030907Z-6401-snake-vs-6077-skyline-vs-6625-snake.md) |
| 2026-10-30 | [318 Capricorn vs 6077 Skyline](comparisons/20261030T192618Z-318-capricorn-vs-6077-skyline.md) |
| 2026-10-30 | [7099 Pinehaven vs 6625 Snake](comparisons/20261030T235117Z-7099-pinehaven-vs-6625-snake.md) |
| 2026-11-05 | [33 Eastwood vs 7094 Pinehaven](comparisons/20261105T064936Z-33-eastwood-vs-7094-pinehaven.md) |
| 2026-11-05 | [6944 Snake vs 318 Capricorn](comparisons/20261105T230527Z-6944-snake-vs-318-capricorn.md) |
| 2026-11-10 | [33940 Jennifer vs 32774 Road](comparisons/20261110T183137Z-33940-jennifer-vs-32774-road.md) (getaway) |
