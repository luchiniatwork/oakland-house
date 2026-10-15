# Cross-check — 33 Eastwood Ct, Oakland, CA 94611

| Check | Result |
|---|---|
| Marketing claims vs photos | **Mostly verified.** "Treetop views" real (p_08, p_12, p_25); kitchen remodel real (p_16–p_22); new siding + windows visible (p_02, p_20); "majestic redwood" real (p_02, p_50). **Overstated:** "generous closet space" = double reach-in closets (p_31); "cozy, private patio" is directly overlooked by the uphill neighbor's elevated deck (p_38, p_40); amenity tag "Valley Views" = tree canopy only — the Bay/SF vista exists solely at drone altitude (p_48), not from any room. **Unverifiable from photos:** tankless water heater, Carrier furnace, new appliances. |
| Geocoder vs page coords | **Flagged.** Census pin (37.83528, -122.18653) is ~169 ft NW of the Compass MLS pin (37.83501, -122.18606) — just past the ~150 ft rule. Both sit on the same short cul-de-sac; this is parcel-pin noise, not a mislocation. |
| Elevation / micro-market | 1,087 ft at geocoder pin; 1,125 ft at page pin (USGS EPQS). True Oakland hills — Shepherd Canyon / Montclair (MLS neighborhood "MONTCLAIR"). Steep lot confirmed by drone (p_44, p_45). |
| Orientation | View side (living-room window wall + deck) faces roughly **W/WNW down the Shepherd Canyon draw** — drone (p_48) ties the Bay/SF horizon to the street side; canyon drains to the flats. Rear patios face the uphill slope → eastern morning light. **Inference** (no dusk shots in the set). |
| FHSZ / insurance | **Very High FHSZ (presumptive)** — 94611 is inside the 1991 Oakland firestorm footprint; insurance availability must be quoted before an offer. Photos corroborate fuel context: dense canopy over the roof, dry grass slope, wood deck, wood T1-11 siding (p_44–p_46, p_50). |
| Amenity claims | "Just minutes from Montclair Village" plausible from the map (Shepherd Canyon corridor, ~1–1.5 mi). Drone imagery is of the actual site; no borrowed scenery. Cul-de-sac setting confirmed (p_47). |
| Bed/bath count legitimacy | **Real 3BR/2BA.** Measured floorplan (p_51): top level = primary 14'x17' + bedroom 11'x13' + bedroom 10'x16' + baths 9'x5' + 13'x5' + laundry 7'x10'. No office fudge. JSON-LD `numberOfRooms: "3"` = bedrooms; INITIAL_DATA `legalRoomCount: 5` = total rooms — counting convention difference, not a data conflict. |

**Extraction cross-validation:** JSON-LD and `window.__INITIAL_DATA__` agree on price ($988,000), sqft (1,547), baths (2). Beds from INITIAL_DATA (`size.bedrooms: 3`) + floorplan; JSON-LD omits beds. No field conflicts required JSON-LD precedence.
