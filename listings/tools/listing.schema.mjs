// Canonical schema for a saved listing bundle (schemaVersion 2).
// Written by /me:analyze-listing; consumed by /me:compare-listings.
import { z } from "zod";

export const BUCKETS = ["view-house", "multifamily", "getaway"];

// Weights are FIXED — do not retune. The overlays in listings/buckets/
// render these tables for readability; if they ever disagree, THIS file
// wins (the validator recomputes weightedTotal from these weights).
export const WEIGHTS = {
  "view-house": {
    view: 0.18,
    natural_light: 0.14,
    character: 0.10,
    kitchen: 0.10,
    privacy: 0.10,
    layout_flow: 0.08,
    primary_suite: 0.08,
    outdoor_space: 0.08,
    condition: 0.08,
    lot_usability: 0.06,
  },
  multifamily: {
    location_bart: 0.20,
    units_config: 0.18,
    unit_condition: 0.14,
    natural_light: 0.12,
    occupancy_deal: 0.10,
    rent_potential: 0.10,
    building_systems: 0.10,
    outdoor_space: 0.06,
  },
  getaway: {
    drive_time_sf: 0.22,
    view: 0.16,
    lot_nature: 0.16,
    turnkey_airbnb: 0.12,
    price_accessibility: 0.10,
    condition: 0.10,
    natural_light: 0.08,
    character: 0.06,
  },
};

const nullableNumber = z.number().nullable();

const dimensionScore = z.object({
  score: z.number().min(1).max(5),
  note: z.string().min(1),
});

// Exactly the bucket's dimensions, no others — strict so a record can
// never mix dimensions across buckets.
const scoresObject = (bucket) => {
  const shape = {};
  for (const dim of Object.keys(WEIGHTS[bucket])) shape[dim] = dimensionScore;
  return z.object(shape).strict();
};

const baseListing = z.object({
  address: z.string().min(1),
  price: nullableNumber,
  beds: nullableNumber,
  baths: nullableNumber,
  sqft: nullableNumber,
  pricePerSqft: nullableNumber,
  lotAc: nullableNumber,
  dom: nullableNumber,
  status: z.string().nullable(),
  fhsz: z.string().nullable(),
  coords: z.tuple([z.number(), z.number()]).nullable(),
  elevationFt: nullableNumber,
  style: z.string().nullable(),
  description: z.string().nullable(),
});

const common = {
  schemaVersion: z.literal(2),
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  source: z.object({
    url: z.string().url(),
    mirrorOf: z.string().url().nullable(),
    fetchedAt: z.string().datetime(),
  }),
  weightedTotal: z.number().min(1).max(5),
  verdict: z.string().min(1),
  flags: z.array(z.string()),
  positives: z.array(z.string()),
  orientationInference: z.string(),
  photos: z
    .array(z.object({ file: z.string().min(1), note: z.string().min(1) }))
    .min(1),
  crosschecks: z
    .array(z.object({ check: z.string().min(1), result: z.string().min(1) }))
    .min(1),
};

export const ListingSchema = z.discriminatedUnion("bucket", [
  z.object({
    ...common,
    bucket: z.literal("view-house"),
    listing: baseListing,
    scores: scoresObject("view-house"),
  }),
  z.object({
    ...common,
    bucket: z.literal("multifamily"),
    listing: baseListing.extend({
      units: nullableNumber,
      occupancy: z.string().nullable(),
      nearestBart: z.string().nullable(),
      bartDistanceMi: nullableNumber,
    }),
    scores: scoresObject("multifamily"),
  }),
  z.object({
    ...common,
    bucket: z.literal("getaway"),
    listing: baseListing.extend({
      driveTimeMin: nullableNumber,
      driveOrigin: z.string().nullable(),
    }),
    scores: scoresObject("getaway"),
  }),
]);
