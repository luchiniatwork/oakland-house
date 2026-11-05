# Cross-checks — 3615 Brunell Dr, Oakland, CA 94602

| Check | Result |
|---|---|
| Marketing claims vs photos | **Verified honest.** "Remarkable views" = real living-level bay/city views (p_16, p_17, p_26, p_42, p_58, p_68) — no drone shots in the entire 84-photo set. "Original kitchen" accurate (p_28–30). "Wood-paneled walls, high ceilings, brick fireplace, period features" confirmed (p_10, p_22, p_47). "Lush garden, generous patio" confirmed (p_66–69). Sqft discrepancy asterisked in the description itself. A notably honest listing. |
| Geocoder vs page coords | **Agree.** Census geocoder 37.803292, -122.182367 vs MLS/sereno 37.8031584, -122.1824887 → 60 ft apart (threshold 150 ft). |
| Elevation / micro-market | 923.7 ft (USGS EPQS). Woodminster / Joaquin Miller area, Oakland hills 94602; above Park Blvd (Glenview), near Joaquin Miller Park open space. |
| Orientation | View side **W–WSW** (SF Bay, city flats, peninsula hills: p_68, p_71, p_72); afternoon sun patches corroborate (p_24); clerestories pull E morning light. Inference, not compass-verified. |
| FHSZ / insurance | **Very High FHSZ — CONFIRMED** via CAL FIRE FHSZLRA25 (2025 LRA) feature-service point query at parcel coords (`FHSZ_Description: "Very High"`). Oakland WUI Fire Area → Zone 0 rules + annual vegetation-management inspections. **Quote insurance before contingency removal; FAIR Plan possible.** |
| Amenity claims | "Glenview and Montclair shops/restaurants" plausible: Glenview village (Park Blvd) ~1.5 mi downhill, Montclair village ~2 mi; Joaquin Miller Park adjacent. Credited as area amenities, not property features. |
| Bed/bath count legitimacy | **Real 3 bedrooms** (floorplan: 13'3"×13'8", 9'9"×12'9", 10'2"×9'3"; photos p_39, p_47, p_50). True 1.5 baths (vintage pink full p_44 + half p_37). Lower-level family room is bonus space, not an office-fudge bedroom. Legit. |
| Sqft conflict | Marketed **1,748 sf** vs public records **1,252 sf**; agent discloses "*sq. ft and room count differ from public records". Delta ≈ finished lower-level family room + kitchenette (~496 sf). $514/sf on marketed basis; $718/sf on public-records basis. **Verify lower-level permits.** Record carries 1,748 (JSON-LD/marketing) with this note. |
| Photo recovery | **84/90** MLS-gallery photos recovered from the agent's property site CDN + floor plan; 6-photo gap likely branded/MLS variants. Confidence high. |
| Source substitution | Original Compass URL blocked by AWS WAF challenge (HTTP 202, `x-amzn-waf-action: challenge`) from this IP. Facts + photos sourced from agent's own property site (3615brunell.com), cross-validated vs sereno.com JSON-LD and mlslistings.com — all sources agree on price/beds/baths/sqft/coords. |
