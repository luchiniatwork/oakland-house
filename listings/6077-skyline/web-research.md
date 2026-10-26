# Web research — 6077 Skyline Blvd, Oakland, CA 94611

Compiled 2026-10-26 from online sources. Extends `listing.json` / `crosscheck.md` with public-record and market data. Photo-based scores unchanged — nothing here re-reads photos.

## Official records (City of Oakland GIS + Alameda County parcel data)

Queried City of Oakland ArcGIS REST (`gisapps1.mapoakland.com`) and parcel layer at the listing coordinates (37.85148, -122.21245):

- **APN: 48G-7428-2**. Situs: 6077 SKYLINE BLVD OAKLAND 94611.
- **Owner of record (snapshot): KIRSTEIN JOYCE D TR** — a trust; last recorded doc 2015-12-22 (doc #2015-334244). Consistent with a long-held family property sold out of a trust to the flipper in Feb 2026. County snapshot predates the Feb 2026 sale, so the flipper entity is not named here — pull the Feb 2026 grant deed from Alameda Clerk-Recorder (audtaxpublic.alamedacountyca.gov) to name the seller's buyer.
- **Assessed value in snapshot: $32,230** (land $11,657 + improvements $27,573, $7,000 homeowner exemption) — a decades-old Prop 13 base. Buyer at ~$1.25–1.29M should budget **~$15–17K/yr property tax** (~1.15–1.3% of purchase price incl. direct assessments), vs the ~$8K/yr the flipper carries on their $655K base.
- County characteristics: 1,280 sqft, 1 story, 1 building, **year built 1962** (MLS says 1961), use code 1100 (SFR).
- **Zoning: RH-3** (Hillside Residential), per CEDA layer (updated 2024-08-29).

## Hazard designations — verified against official GIS (replaces "presumptive")

| Designation | Result | Source |
|---|---|---|
| Fire Hazard Severity Zone | **CONFIRMED "Very High" (VHFHSZ), LRA, incorporated** — no longer presumptive | City of Oakland CEDA layer 41 |
| Alquist-Priolo Earthquake Fault Zone | **NOT in zone** (0 features at point); Hayward fault traces run through Montclair ~0.5–0.8 mi west | CEDA layers 44/45 |
| CGS Earthquake-Induced Landslide Zone | **IN ZONE — "Landslide Seismic Hazard, Zone of Required Investigation"** (Oakland East quad, 2003 EZRIM) | CEDA layer 46 |
| Liquefaction susceptibility | **Very Low** (bedrock); study-zone layer says "Area Not Yet Evaluated" (normal for hills) | CEDA layers 47/48 |
| FEMA/mapped flood zone | **None** | CEDA layer 43 |

**The CGS landslide-zone hit is the headline upgrade to the record's foundation flag:** it is a state-mandated Natural Hazard Disclosure item and means any significant construction requires a geotech investigation. Combined with the 12–15 ft downslope foundation wall and cantilevered deck already flagged, a geotechnical review is not optional here. Map/report links: gmw.conservation.ca.gov/SHP/EZRIM/Maps/OAKLAND_EAST_EZRIM.pdf.

## The flip, documented across two MLS listings

| | Pre-flip (ML82032296) | Current (41145475) |
|---|---|---|
| Listing | Joe Polyak, Rise Homes (Burlingame) | Christopher Toy, Realty ONE Group TODAY (DRE 01440357, 925-858-4452, chris@christoyrealty.com) |
| Price | $655,000 — closed Feb 2026 (16th per MLS history, 19th per agent site) | $1,289,000 ask |
| Config | 3bd / **2ba** / **1,280 sqft** / **1-car detached garage** | 3bd / 3ba / 1,551 sqft / 2-car detached garage |
| Facts | Roof: **tar & gravel**; central forced-air heat; **no A/C**; fireplace in family room; marketed explicitly as a fixer ("unique chance to reimagine and personalize") | Turnkey reno; new water heater; rebuilt glass-railed deck |

**Renovation delta: +271 sqft, +1 full bath, +1 garage space, in ~5 months.** The county still shows 1,280 sqft. The sqft/bath/garage expansion almost certainly required building permits with finals — demand the permit history from the Oakland Online Permit Center (aca-prod.accela.com/oakland) and match every added foot to a finaled permit. Unpermitted expansion is the single biggest documentary risk in this deal. (Could not scrape Accela — search must be run interactively.)

## Price/status — possible fresh cut, VERIFY

- Local record (captured 2026-10-19): $1,289,000, 48 DOM; history $1.395M (Jul 14) → withdrawn Aug 14 → $1.289M (Sep 1) → contingent Sep 22 → Active Sep 28.
- **Two independent IDX aggregators (cushrealestate, beachcitybrokers) currently show $1,250,000** with an open house Oct 25 1–4pm — indicating a likely further cut of ~$39K around Oct 20–25. Zillow/Coldwell Banker/metrorea still show $1,289,000. **Confirm current list price with the MLS before any offer math**; at $1.25M the value-per-point improves to 2.96, and the break-even target vs Rincon@$1.2M ($1.167M) is only ~6.6% under the new ask.
- Dedicated property site: 6077skylineblvd.com. Its AB-723 compliance note discloses that **some marketing images "may be Digitally Altered or Virtually Staged"**, with Dropbox folders of originals (Premium Package + Aerial Photography). Zillow also labels a "Virtual staging" thumbnail. Local record scored staging as benign, but re-check staged shots against the Dropbox originals before relying on room feel.
- Open houses held: Sep 5, Oct 10–11, Oct 25.

## Insurance market context (94611)

- ~**2,800 homes in 94611 are on the CA FAIR Plan** (FAIR Plan data as of Mar 2026) — one of the top-40 FAIR Plan ZIPs in the state; Orinda's 94563 went from ~160 to ~2,700 in five years for comparison (casa.insure).
- 94611 admitted-market average premium **$3,226/yr** (US Treasury FIO 2022 filings, +16.1% YoY, 5.48% nonrenewal rate — plaininsure.com/zip/94611).
- Montclair hills anecdote (r/oakland, May 2025): FAIR Plan ~$6K/yr + ~$2K/yr wrap (DIC) for homes ≤$1M.
- Mitigation context: Skyline Blvd is a designated **evacuation corridor** with CAL FIRE-funded fuel reduction (Shepherd Canyon–Keller Ave). There IS a Firewise USA-recognized "Skyline Blvd" community, but its boundary is **Hansom Dr–Parkridge Dr (south Skyline by Leona Canyon/Anthony Chabot, approved Sep 2023) — several miles south; 6077 Skyline at Broadway Terrace is NOT inside it.** Yearly OFD vegetation inspections apply regardless (VHFHSZ).

## Street/neighborhood parcel context (from parcel layer)

- 6045 Skyline: 2011 build, 4,079 sqft, assessed $1.726M (post-fire-rebuild-era construction across the street).
- 6039 Skyline: 1994, 2,561 sqft, assessed $1.40M.
- 6050 Skyline: 2001, 2,275 sqft, assessed $1.01M.
- 6059 Skyline: 2005, 2,799 sqft 3-story, assessed $1.40M.
- 6085 Skyline (next door): 1970, 2,349 sqft, sold 2022, assessed $595K.
- Multiple **vacant parcels cluster at 6100 Skyline / Broadway Ter** (Eckert family owns several; one Renten lot) — uphill construction nearby is possible long-term; typical Montclair rebuild pattern (note 1994/2001/2005/2011 build years = steady infill).

## Schools & amenities (OUSD, ATTOM-sourced distances)

- Thornhill Elementary (K-5) ~1.1 mi; Montera Middle (6-8) ~2.2 mi; Skyline High ~4.6 mi.
- Sibley Volcanic Regional Preserve ~0.5 mi; neighborhood name appears as **Merriewood/Montclair**.

## Diligence checklist added by this research

1. Pull Accela permit history for 6077 Skyline — verify the +271 sqft / +1 bath / garage expansion has finals. (In-person/online: aca-prod.accela.com/oakland)
2. Confirm current list price ($1,289,000 vs $1,250,000 IDX discrepancy).
3. NHD report should show: VHFHSZ yes, fault zone no, **landslide Zone of Required Investigation YES** — reconcile with seller disclosures.
4. Pull Alameda grant deed for the Feb 2026 $655K sale to name the flipper entity; check for other flips by the same entity.
5. Compare Dropbox "original" photos vs virtually staged marketing shots.
6. Budget: property tax ~$15–17K/yr at ask; insurance realistically $6–9K/yr (FAIR Plan + wrap) pending quotes.

## Sources

- City of Oakland ArcGIS REST: gisapps1.mapoakland.com/oakgis/rest/services/Prod (CEDA_report_PRODGIS_October_2024; parcels)
- Pre-flip listing ML82032296: homesbyrise.com/properties/6077-skyline-boulevard-oakland-ca-us-94611-ml82032296; coldwellbankerhomes.com (pid_69316543); sereno.com/82032296
- Current listing 41145475: zillow.com (zpid 24818646); coldwellbankerhomes.com (pid_73380416); bhhs.com; metrorea.com; cushrealestate.com; beachcitybrokers.net
- Property site: 6077skylineblvd.com (AB-723 disclosure + Dropbox originals)
- Insurance: plaininsure.com/zip/94611; casa.insure/learn/home-insurance-oakland-orinda-hills; reddit r/oakland FAIR Plan thread (May 2025)
- Fire: oaklandfiresafecouncil.org (Firewise Skyline site; July 2025 newsletter — Oakland hills remain VHFHSZ under 2025 LRA maps); claremontcanyon.org (Skyline Evacuation Corridor)
- CGS seismic hazard zones: gmw.conservation.ca.gov/SHP/EZRIM (Oakland East quad)
- Blocked (403/405): Redfin, Trulia, Movoto, Intero, BuildZoom — estimates and full portal price history not independently retrieved.
