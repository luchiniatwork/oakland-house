// Canonical schema for a saved listing bundle (schemaVersion 1).
// Written by /me:analyze-listing; consumed by /me:compare-listings.
import { z } from "zod";

export const WEIGHTS = {
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
};

const nullableNumber = z.number().nullable();

const dimensionScore = z.object({
  score: z.number().min(1).max(5),
  note: z.string().min(1),
});

export const ListingSchema = z.object({
  schemaVersion: z.literal(1),
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  source: z.object({
    url: z.string().url(),
    mirrorOf: z.string().url().nullable(),
    fetchedAt: z.string().datetime(),
  }),
  listing: z.object({
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
  }),
  scores: z.object({
    view: dimensionScore,
    natural_light: dimensionScore,
    character: dimensionScore,
    kitchen: dimensionScore,
    privacy: dimensionScore,
    layout_flow: dimensionScore,
    primary_suite: dimensionScore,
    outdoor_space: dimensionScore,
    condition: dimensionScore,
    lot_usability: dimensionScore,
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
});
