# Cross-check — 33940 Jennifer Way, Coarsegold, CA 93614 (getaway)

| Check | Result |
|---|---|
| Marketing claims vs photos | **Verified — honest listing.** Furnished (p_02, p_08), two lofts (p_08, p_12, p_35), walk-in shower (p_04, p_06), outdoor cooking area (p_27, p_32), shed (p_18, p_22), shared well/septic/power (p_53), outdoor furniture (p_28, p_30), turnkey smart lock (p_13). One stretch: "mountain(s)" view claim — photos show foothill/oak vistas, no high mountains. W/D inside shed claimed but shed interior not photographed. |
| Geocoder vs page coords | **DISAGREE ~670 ft** — census (-119.728134, 37.242650) vs page (-119.730194, 37.241825). Flagged; both points fall within/near the irregular 2.85-ac parcel. |
| Elevation / micro-market | 2,373.7 ft — Sierra foothills above Coarsegold village (Hwy 41 corridor toward Yosemite), rural large-lot residential, Madera County. |
| Orientation | West/southwest-facing glazing + deck corroborated by multiple sunset photos (p_63, p_66, p_75) + window reflections (p_68, p_70). **Inference.** |
| FHSZ / insurance | verify on CAL FIRE map — foothill oak woodland with brush fuels adjacent to a wood-sided structure; active fire-pit use on gravel (p_70). Insurance availability/cost flag raised. |
| Amenity claims | Rural community — verified (p_17, p_37). Solar — verified on roof (p_16, p_21). Deck — verified (p_25, p_30). Gravel driveway — verified (p_37). Paved county road to gate — verified (p_19). |
| Drive-time claim | Listing makes **no** hours-from-SF claim to fact-check. OSRM independently computes 239 min (3h59m) free-flow from SF Ferry Building — **outside the 3h gate**. |
| Turnkey/STR claim | Furnished + styled verified in photos (smart lock p_13, amenity bottles p_06, furniture p_02, p_30, grill p_32); **no rental history stated**; Madera County STR permit rules must be verified before assuming Airbnb income. |
| Land usability | 2.85 ac claimed (assessor). Photos: cabin site + large gravel flat + fenced meadow are flat/usable (~1/3 of parcel); remainder is gentle-to-moderate oak/brush slope with paths — recreationally usable, not buildable flat (p_15, p_42, p_43, p_50). |
| Utilities | Water: **shared well** w/ two storage tanks (p_53) — well-share agreement + yield unknown. Sewer: conventional septic (claimed; age unknown, not visible). Power: grid + rooftop solar (p_16) + portable generator backup (p_53). Heat/cool: ductless mini-split (p_08). Grill propane-cabinet style. No wood stove despite firewood storage (p_13, p_71). |

## Extraction notes

- Source fetched: Coldwell Banker mirror (`coldwellbankerhomes.com`, 200 OK, 294 KB). Original Compass URL returned an AWS WAF challenge (202 + `x-amzn-waf-action: challenge`) — one mirror fallback applied per procedure.
- JSON-LD (`Product`/`RealEstateListing` + `SingleFamilyResidence`) supplied price, address, geo, baths, sqft, lot, year built, utilities, and 75 photos. Page body supplied DOM (300), status (Active), MLS ID MD26005613, and 0 bedrooms.
- **Price conflict:** this page $197,000 (updated 8/25/2026) vs $210,000/$220,000 on other mirrors (Movoto, older CB pid, Bennion Deville) — stale snapshots after reductions; the fetched page is the source of truth.
- **Beds conflict:** this page 0 bedrooms; Zillow/Movoto 1 bed. MLS reality: two ladder-access lofts, no legal bedroom. Recorded 0.
- Structure type: JSON-LD says "Cabin", foundation "Pier Jacks"; Zillow classifies Mobile/Manufactured. Photos confirm trailer tongue + jack (p_36) → tiny house on wheels.
- 75/75 photos downloaded and analyzed (all valid images).
