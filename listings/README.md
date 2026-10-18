# Listings

Oakland hills house hunt — one folder per listing, comparisons in [`comparisons/`](comparisons/), validation tooling in [`tools/`](tools/).

## Folder layout

Each listing folder contains:

| File | Purpose |
|---|---|
| `card.txt` | One-line summary card: price, stats, score, tradeoffs |
| `listing.json` | Structured scored record (`ListingSchema`, score out of 5) |
| `crosscheck.md` | Verification notes / claims cross-checked against the listing |
| `photos/` | Listing photos (`p_NN.jpg`) |
| `STRATEGY.md` | Pursuit playbook (only where one exists) |

## Listings by score

| | Score | Address | Price | Bd/Ba | Sqft | $/sf | Status |
|---|---|---|---|---|---|---|---|
| [`6401-snake/`](6401-snake/) | 4.2 | 6401 Snake Rd | $998,000 | 2/2 | 1,379 | $724 | PENDING |
| [`6833-snake/`](6833-snake/) | 4.0 | 6833 Snake Rd | $1,675,000 | 4/2 | 2,023 | $828 | SOLD 10/8 (+86% over ask) |
| [`15-north/`](15-north/) | 3.8 | 15 North Cir | $1,149,000 | 4/2.5 | 2,410 | $477 | |
| [`6773-wilton/`](6773-wilton/) | 3.5 | 6773 Wilton Dr | $1,099,000 | 3/2 | 1,710 | $643 | |
| [`6931-pinehaven/`](6931-pinehaven/) | 3.5 | 6931 Pinehaven Rd | $1,049,000 | 4/3.5 | 2,336 | $449 | short sale — see [STRATEGY.md](6931-pinehaven/STRATEGY.md) |
| [`7094-pinehaven/`](7094-pinehaven/) | 3.4 | 7094 Pinehaven Rd | $795,000 | 3/2 | 1,530 | $520 | |
| [`33-eastwood/`](33-eastwood/) | 3.2 | 33 Eastwood Ct | $988,000 | 3/2 | 1,547 | $639 | |
| [`5924-balboa/`](5924-balboa/) | 3.2 | 5924 Balboa Dr | $699,000 | 2/2 | 923 | $757 | |

## Comparisons

All 2-way and multi-way comps are benchmarked against 6401 Snake (top score):

| Date | Matchup |
|---|---|
| 2026-10-15 | [6401 Snake vs 33 Eastwood](comparisons/20261015T070635Z-6401-snake-vs-33-eastwood.md) |
| 2026-10-15 | [6401 Snake vs 6773 Wilton](comparisons/20261015T073306Z-6401-snake-vs-6773-wilton.md) |
| 2026-10-15 | [6401 Snake vs 6833 Snake](comparisons/20261015T075717Z-6401-snake-vs-6833-snake.md) |
| 2026-10-18 | [6401 Snake vs 6931 Pinehaven vs 5924 Balboa](comparisons/20261018T022735Z-6401-snake-vs-6931-pinehaven-vs-5924-balboa.md) |
