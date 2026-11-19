# 7279 Snake Rd — Insurance Analysis (VHFHSZ)

_Compiled 2026-11-19 · sources: `research/insurance-montclair-fire-zone.md` (market research + sources), `disclosure-analysis.md`, Accela pull 11/18 PM, FHDS, kin.com quote-flow walkthrough 11/19._

**Verdict: conditionally good prospects — not eligible-as-is for the cheapest market.** The flip's 2026 systems stack (roof/windows/electrical, all city-finaled) clears the two biggest underwriting gates, but the FHDS admits two hardening failures (ember vents, Zone 0) that block the best admitted rates today. Both are cheap to fix (~$2–10K) and already priced into the STRATEGY.md §2 credit model — the insurance path and the negotiation path are the same path.

## 1. Property risk profile (what an underwriter sees)

- **Location:** 94611, Montclair ridge (1,212 ft). VHFHSZ **confirmed** (NHD 11/2/26) + City VHFHSZ + Tier 2/3 fire threat; inside the 1991 Oakland firestorm footprint. CGS Landslide SHZ (earth movement is excluded from every HO policy → separate self-insured reserve; does not change fire pricing).
- **Construction:** 1959 post-and-beam, wood siding + wood ceilings; below-street lot, stairs to entry; wood decks (repaired 1959 framing, Yan-certified 11/17) cantilevered over downslope brush — the classic ember-trap architecture parcel-level models (Delos, Kin, Zesty/Stand) penalize.
- **Coverage A basis:** 1,585 sf public record → ~$700–950K dwelling coverage. Below the $1.5M home behind the $7–12K market examples; 94611 FAIR average reflects ~$1.6M homes. Lower Coverage A = lower premium across every option.
- **Systems (all 2026, city-finaled — the strong suit):** electrical panels + full rewire (RE2601746) — retires the #1 non-fire objection for 1959 stock AND the unpermitted-electrical claim-denial vector · furnace (RM2600986, HERS pass) · tankless (RP2600874) · windows/doors (RBC2601971 — 2026 = dual-pane) · kitchen/bath (RBC2602269). Fireplace/chimney removed (marginal ignition-source plus).
- **Roof:** **torch-down modified bitumen membrane** on a low-slope/flat deck — tear-off of old built-up roof (June aerials verify), installed ~8/18/26 (TDS "~90 days" at 11/16), permit R2600853 finaled 7/09, roofer All Weather C-39 #833347 (CSLB-verified, 22-yr local). Granule cap sheet. Age zero = the biggest single rating lever. **v4 (11/19) caveat:** the seller's own termite report documents leakage findings on this 3-month roof (10B sheathing stains, 10D skylight leakage, 10G bedroom-sheathing fungus damage "due to roof leakage") — no change to the age-zero underwriting answer (2026 tear-off, finaled), but the roofer adjudication + workmanship warranty (STRATEGY §5 item 5) should land before binding, and any pre-existing-damage disclosure questions on applications get answered from the roofer's letter, not from memory.
- **Class A:** near-certain by code (Class A is effectively mandatory for permitted reroofs in CA VHFHSZ; granulated mod-bit cap sheets routinely carry UL 790 Class A listings) but **undocumented** — FHDS 2C(1) left blank. Demand: manufacturer spec sheet / UL assembly listing from All Weather. Cheapest premium lever in the entire file.
- **FHDS defects (the liability sheet):** mis-checks "built on/after 2010" for a 1959 house; admits **non-ember-resistant vents** (2B/2C) + **combustibles within 5 ft / under decks** (Zone 0 fail); roof Class A blank; **1-yr defensible-space duty on buyer** (3C(3), AB 38). No usable hardening documentation transfers — buyer builds their own package.
- **Claims history:** SPQ 6.H "No claims" covers only the LLC's 5-month window — order the **CLUE report** on the property.
- **Open CE#2604338:** not a binding blocker per se, but answer application questions about open violations accurately (seller can't claim ignorance — concealment documented). Main claim-denial vector (electrical) already retired by finaled permit. **v4 (11/19):** GT termite report p.13 opines several repairs need building permits — more open-violation surface to answer accurately; WDO/pest findings themselves don't feed fire underwriting, but the deck-safety conflict (§0e) is a condition question for the inspection contingency, not the application.
- **Recurring:** OFD annual vegetation inspections (SPQ 17.G); WILDFIRE PREV-MM $103.94/yr on the tax bill. OFD 7/1/26 vegetation cert predates flip landscaping — request fresh Authorized-Inspector report pre-close.

## 2. Market context (94611, late 2026)

- **Admitted carriers writing/expanding:** Mercury (first SIS approval, fire-zone growth commitment, published hardening minimums), Farmers (cap removed 11/25), CSAA/AAA, Travelers, Liberty Mutual, Pacific Specialty, California Casualty. **State Farm / Allstate still closed** to new business (both filed 2026 to reopen; SF's re-entry requires a wildfire-safety designation). PURE only for $2M+ homes — n/a here.
- **Delos** (SF MGA, parcel-level wildfire model, broker-only, <5 min/address): claims >50% of FAIR Plan homes are eligible for a single comprehensive policy. Strong candidate for this address; ask "whose paper" (Homesite = admitted/CIGA-backed vs Lloyd's = surplus).
- **FAIR Plan 94611 ZIP data (6/2026):** 2,822 policies, avg premium **$5,020/yr → ~$6,481** after the +29.1% increase (10/15/26). Averages reflect ~$1.6M homes — this house should price below.
- **FAIR+DIC benchmarks:** $7–12K/yr for a $1.5M hills home; at this house's Coverage A, realistic floor ≈ **$4.5–7K/yr** (FAIR ~$3–4.5K + DIC ~$1.5–2.5K from Mercury/CSAA/Farmers/Nationwide/Travelers/Zurich/Foremost).
- **Discounts:** Safer from Wildfires mandated discounts (FAIR: up to 16.4% off wildfire portion with all 12 measures); IBHS Wildfire Prepared Home designation increasingly gates admitted eligibility.

## 3. Eligibility scorecard vs Mercury minimums (cheapest realistic admitted path)

| Mercury minimum | Status | Evidence |
| --- | --- | --- |
| Class A roof | **PASS pending docs** | 2026 torch-down, finaled permit; spec sheet demanded |
| Dual-pane windows | **PASS** | RBC2601971 windows/doors finaled 7/13 (2026 = dual-pane) |
| Non-combustible first 6" of siding | **UNKNOWN** | verify at inspection (new siding scope rode RBC2602285) |
| Ember-resistant vents | **FAIL today** | FHDS admits non-ember vents — retrofit ~$1–3K |
| Zone Zero 5-ft buffer | **FAIL today** | FHDS admits combustibles within 5 ft / under decks — ~$1–7K |

**Score: 2 pass, 2 fixable fail, 1 unknown.** Unlock cost ~$2–10K, already in STRATEGY.md §2 ("fire hardening (ember vents…)") credit line — ask seller to fix or credit.

## 4. Quoting decisions (kin.com walkthrough, 11/19)

- **Roof type dropdown** (composition shingle / metal / slate / tile / wood shingle) → **composition shingle**. Torch-down mod-bit is an asphalt-based, granule-surfaced covering — same family + same Class A class. Metal/slate/tile false (misprice rebuild); **wood shingle = never** (false + near-guaranteed decline/punitive rate in VHFHSZ + misrepresentation hook). At binding, tell the rep the roof is actually torch-down modified bitumen, new 2026, so the policy record is precise.
- **Roof age/year: 2026** (tear-off + new roof, R2600853 finaled). Age-zero is one of the strongest levers.
- Kin writes all 58 CA counties incl. every wildfire zone; instant address-level quote = real premium ceiling, free, before the 11/24 offer date.

## 5. Estimated outcomes (this house, ~$750–950K Coverage A)

| Path | Est. annual | Notes |
| --- | --- | --- |
| Kin (instant, bindable) | ~$2.5–5K | estimate until quoted; mitigation features auto-credited |
| Admitted post-hardening (Mercury/Farmers/CSAA) | ~$2.5–4.5K | requires vents + Zone 0 + Class A doc; best long-term home |
| Delos (broker, parcel model) | quote-dependent | decks-over-brush may price either way; worth the 5 min |
| FAIR Plan + DIC (floor) | ~$4.5–7K | satisfies lender hazard + liability; no hardening needed |

All figures are model-based estimates, not quotes. **STRATEGY.md's $6–9K budget reads conservative** → surplus capacity is offer-model leverage. Walk-trigger (FAIR+DIC > ~$9K/yr) unlikely to trip at this Coverage A.

## 6. Action sequence

1. **Kin quote TODAY** — composition shingle, roof year 2026 → establishes the real ceiling while it's still free (offer date 11/24).
2. **Broker fan-out in parallel** — Delos (<5 min) + Mercury, Farmers, CSAA, Travelers, Liberty Mutual; ask each in writing what the ember-vent + Zone-0 fixes do to the quote, and whether the FHDS-admitted vulnerabilities change pricing.
3. **Demand the Class A documentation** (manufacturer spec / UL listing from All Weather) — bundle with the Gate 1 "roof package" ask — **v4: plus the roofer's adjudication of GT 10B/10D/10G and the All Weather workmanship warranty.**
4. **Hardening = seller credit** — ember-vent retrofit, Zone 0 conversion, under-deck combustible removal, deck-to-wall flashing, gutter covers (STRATEGY §2 line, $5–15K with bids).
5. **CLUE report** on the property + ask the LLC's current renovation-policy carrier/premium.
6. **Fresh OFD/defensible-space inspection report** pre-close (cheap for seller; retires the AB 38 1-yr clock cleanly).
7. **Bind before contingency removal; re-shop admitted at renewal** once hardening completes.
8. Lender: FAIR+DIC or Kin/admitted HO-3 both satisfy hazard + liability requirements (see `lender-email-draft.md` insurance row).

## 7. Cross-references

- `STRATEGY.md` §4 Gate 2 (fire & insurance checklist), §2 (credit model), walk-triggers (FAIR+DIC >$9K)
- `disclosure-analysis.md` — roof/Class A row, FHDS §2B/2C findings, CE#2604338 §0d, termite-report roof-leak + permit findings §0e (v4)
- `research/insurance-montclair-fire-zone.md` — full market research, carrier table, online tools, sources
- `crosscheck.md` — FHSZ/insurance row; `correspondence.md` — roof Class A + LLC insurance/claims asks
