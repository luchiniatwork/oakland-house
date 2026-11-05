# Listings

Oakland/Berkeley hills house hunt — one folder per listing, comparisons in [`comparisons/`](comparisons/), validation tooling in [`tools/`](tools/).

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

## Listings by score

Statuses/DOM re-verified against MLS IDX mirrors (CRMLS/bridgeMLS syncs of 11/3–11/4) on 2026-11-05. Ask = current/last list price; Sold = closing price; $/sf computed on ask (sold rows carry closing $/sf in the Sold cell).

| | Score | Address | Ask | Sold | Bd/Ba | Sqft | $/sf (ask) | Status |
|---|---|---|---|---|---|---|---|---|
| [`6401-snake/`](6401-snake/) | 4.2 | 6401 Snake Rd | $998,000 | $1,260,000 ($914/sf) | 2/2 | 1,379 | $724 | SOLD 10/26 (+26% over ask) |
| [`6833-snake/`](6833-snake/) | 4.0 | 6833 Snake Rd | $899,000 | $1,675,000 ($828/sf) | 4/2 | 2,023 | $444 | SOLD 10/8 (+86% over ask) |
| [`318-capricorn/`](318-capricorn/) | 3.8 | 318 Capricorn Ave | $895,000 | — | 2/2 | 1,655 | $541 | agent-owned, $835K seller-carryback — see [STRATEGY.md](318-capricorn/STRATEGY.md); 7 DOM (OH 11/7); '76 Sea Ranch–style treehouse + studio; FHSZ "NonWildland" per 2025 LRA map but '91 firestorm footprint — quote insurance first |
| [`15-north/`](15-north/) | 3.8 | 15 North Cir | $1,149,000 | — | 4/2.5 | 2,410 | $477 | PENDING 10/28 (13 DOM) — still pending per 11/3 CRMLS sync |
| [`5970-rincon/`](5970-rincon/) | 3.8 | 5970 Rincon Dr | $895,000 | — | 2/1 | 1,192 | $751 | PENDING 10/27 (12 DOM) — still pending |
| [`6077-skyline/`](6077-skyline/) | 3.7 | 6077 Skyline Blvd | $1,250,000 | — | 3/3 | 1,551 | $806 | flip — see [STRATEGY.md](6077-skyline/STRATEGY.md); 64 CDOM (IDX 11/4); still $1.25M after 2nd cut 10/22 ($145K off Jul ask) + fallen escrow |
| [`1488-summit/`](1488-summit/) | 3.6 | 1488 Summit Rd, Berkeley | $1,480,000 | — | 3/2.5 | 1,320 | $1,121 | 19 DOM; teaser pulled — repriced +48% ($999,999 → $1.48M) on 10/30; sold $1.8M '21 |
| [`1076-grizzly-peak/`](1076-grizzly-peak/) | 3.5 | 1076 Grizzly Peak Blvd, Berkeley | $1,049,000 | — | 3/3* | 1,866 | $562 | PENDING by 11/4 (listed 10/26; ≤9 DOM); *3rd bd/ba = detached cottage, non-conforming (MLS duplex); $186K under 2021 sale |
| [`6773-wilton/`](6773-wilton/) | 3.5 | 6773 Wilton Dr | $1,099,000 | — | 3/2 | 1,710 | $643 | PENDING 10/15 (14 DOM) — still pending |
| [`6931-pinehaven/`](6931-pinehaven/) | 3.5 | 6931 Pinehaven Rd | $1,049,000 | — | 4/3.5 | 2,336 | $449 | short sale — see [STRATEGY.md](6931-pinehaven/STRATEGY.md); 20 DOM |
| [`7099-pinehaven/`](7099-pinehaven/) | 3.5 | 7099 Pinehaven Rd | $899,000 | — | 5/3 | 2,492 | $361 | 16 DOM; 3bd main + detached 2bd ADU; $476K under '20 sale ($1.375M) |
| [`6625-snake/`](6625-snake/) | 3.4 | 6625 Snake Rd | $849,000 | — | 4/2 | 1,512 | $561 | 7 DOM (OH 11/8) — see [visit-notes.md](6625-snake/visit-notes.md); '59 MCM treehouse, canyon view only; $100K under 2022 sale |
| [`3615-brunell/`](3615-brunell/) | 3.4 | 3615 Brunell Dr | $899,000 | — | 3/1.5 | 1,748* | $514 | New, 1 DOM (OH 11/7–8); '54 MCM post-and-beam time capsule w/ real bay views; Very High FHSZ confirmed (2025 LRA) — quote insurance first; *marketed sqft vs 1,252 public record (lower level incl., disclosed) |
| [`7094-pinehaven/`](7094-pinehaven/) | 3.4 | 7094 Pinehaven Rd | $795,000 | — | 3/2 | 1,530 | $520 | PENDING 10/21 (14 DOM) — close scheduled 11/11 |
| [`33-eastwood/`](33-eastwood/) | 3.2 | 33 Eastwood Ct | $988,000 | — | 3/2 | 1,547 | $639 | 27 DOM; flip — seller paid $770K on 7/14/26 (+28% ask) |
| [`5924-balboa/`](5924-balboa/) | 3.2 | 5924 Balboa Dr | $699,000 | — | 2/2 | 923 | $757 | 56 DOM |
| [`177-diablo/`](177-diablo/) | 2.1 | 177 Diablo Dr | $950,000 | — | 2/2 | 1,631* | $582 | off-MLS Compass Private Exclusive — login-gated, 0 public photos, DOM n/a; Very High FHSZ (presumptive) — call the agent; *public-record sqft |

## Comparisons

The 10-15/10-18 comps are benchmarked against 6401 Snake (top score); the 10-26 set compares the active mid-tier listings head-to-head, plus a clearing-price scenario overlay (not a validated comparison); the 10-27 comp pits 6077 Skyline against the new 1076 Grizzly Peak; the 10-30 comps pit the new 318 Capricorn against 6077 Skyline (pick: Capricorn) and 7099 Pinehaven against the new 6625 Snake (pick: Pinehaven); the 11-05 comp pits 33 Eastwood against 7094 Pinehaven (pick: Pinehaven — pending since 10/21, so Eastwood is the actionable active alternative):

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
