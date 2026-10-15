# Cross-check — 6833 Snake Rd, Oakland, CA 94611

| Check | Result |
|---|---|
| Marketing claims vs photos | Mostly verified, honest listing: glass wall/beams/cedar (p_02, p_03), updated kitchen (p_09–p_15), wrap decks on both levels (p_20, p_43), "both bridges" verified by telephoto (p_50, p_51). Overstated: "unobstructed 180°" — eye-level views are tree-framed (p_31); "Waterfront" amenity tag false. Drone p_48 flatters but is corroborated by deck-level p_31/p_44. |
| Geocoder vs page coords | FLAG: ~237 ft apart. Census 37.8350493,-122.2022966 (1,100 ft) vs Compass parcel 37.8356171,-122.201897 (1,118 ft). Parcel pin kept; verify on county GIS. |
| Elevation / micro-market | 1,118 ft on Snake Rd; ~120 ft above 6401-snake comp (998 ft, $998K/1,379sf = $724/sf ask, wt 4.2). This: $1.675M closed = $828/sf. Same-street closed comps: $2.1M (4bd/3ba, 2,110sf) and $1.35M (3bd/2ba, 2,002sf) → ~$790–995/sf band; in-band. |
| Orientation | W-WNW facing view side: sunset-over-bay (p_01), bridge telephotos (p_49–p_51), plan N-arrow puts balconies west, garage east (p_53). Afternoon sun, tree-filtered. Inference from photos+plan. |
| FHSZ / insurance | Very High FHSZ (presumptive) — 94611 Montclair, 1991 firestorm footprint corridor. Wood decks + shake/T1-11 cladding + dry slope below decks (p_43) → raised fuel load at structure. Insurance-availability flag MANDATORY; FAIR-Plan risk real. |
| Amenity claims | Montclair Village ~1.5 mi → "minutes" plausible (area amenity). Hwy 13 immediate. Sibley/Huckleberry trails ~2 mi up-ridge by car. Bonus uncredited: terraced vineyard across canyon (p_47). |
| Bed/bath count legitimacy | Real 4bd (plan p_53 + four distinct staged rooms p_18/p_23/p_33–35/p_37–40), no office fudge. Only 2 baths → 4bd/2ba is bath-scarce at this price. True en-suite reads as lower-level primary (plan "ENS" + p_40/p_41). |
| Photo provenance | Sold-listing gallery collapse: Compass/CB/realtor had 1 photo. 53/53 recovered from agent site (cushrealestate.com) incl. floor plan; Zillow's claimed 55 includes 2 cropped variants not separately recovered. Confidence: high. |

## Extraction notes
- Sources: Compass JSON-LD (price $1,675,000 — wins per rule) + `window.__INITIAL_DATA__` (beds 4, baths 2, sqft 2,023, lot 9,447 sf / 0.22 AC, DOM 8, status Sold, both geo pins' provenance).
- Conflict: JSON-LD has no beds/baths/lot/coords → taken from INITIAL_DATA, no disagreement on shared fields (sqft 2,023 in both).
- Status chain (MLS events): listed 2026-08-27 @ $899,000 → pending 2026-09-04 (8 DOM) → closed 2026-10-08 @ $1,675,000 (+86.4%). Prior sale 2013 @ $699,000.
- DOWNGRADE note: listing is SOLD — record kept as benchmark comp per recall>precision rule.
