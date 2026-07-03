// ─── Inflatable Quote Estimation Engine ─────────────────────────────────────
//
// Pure TypeScript pricing engine — NO OpenAI / LLM dependency.
// Deterministic, testable, and fast. Given a QuoteInput, it infers the
// appropriate safety grade, size factor, and country factor, then produces
// a QuoteEstimate with a recommended system, configuration list, USD price
// range, production time, shipping estimate, required confirmations, and
// recommended compliance documents.
//
// The engine reads tunable knobs from @/config/pricing (base price, safety
// factor, market factor, range spread). Update pricing.ts to change outputs.
//
// Usage:
//   import { estimateInflatableQuote } from "@/lib/ai/pricing-engine";
//   const estimate = estimateInflatableQuote(input);

import { pricingConfig, type ProductType } from "@/config/pricing";

// ─── Types ──────────────────────────────────────────────────────────────────

export type SafetyGrade = "rental" | "commercial" | "park";

export type IntendedUse =
  | "one-time-event"
  | "recurring-rental"
  | "permanent-installation"
  | "retail-display"
  | "parade"
  | "other";

export type IndoorOutdoor = "indoor" | "outdoor" | "both";

export interface TargetDimensions {
  /** Height in feet (optional — engine infers size factor from available dims). */
  heightFt?: number;
  /** Width/span in feet. */
  widthFt?: number;
  /** Depth/length in feet. */
  depthFt?: number;
}

export interface QuoteInput {
  productType: ProductType;
  intendedUse: IntendedUse;
  indoorOutdoor: IndoorOutdoor;
  targetDimensions: TargetDimensions;
  quantity: number;
  /** ISO 3166-1 alpha-2 country code, e.g. "US", "GB", "AU". */
  country: string;
  /** Explicit safety grade. If omitted, inferred via inferSafetyGrade(). */
  safetyGrade?: SafetyGrade;
  /** Whether people will physically interact with / climb on the inflatable. */
  peopleInteract: boolean;
  /** Voltage / plug requirement, e.g. "110V US", "230V EU", "240V AU". */
  voltagePlug?: string;
  /** Whether final artwork files are ready (affects production time). */
  artworkReady: boolean;
  /** Compliance documents the customer explicitly requires. */
  requiredDocuments?: string[];
}

export interface ProductConfiguration {
  label: string;
  detail: string;
}

export interface QuoteEstimate {
  recommendedSystem: string;
  productConfiguration: ProductConfiguration[];
  safetyLevel: SafetyGrade;
  priceRangeUsd: { min: number; max: number };
  productionTime: string;
  shippingEstimate: string;
  requiredConfirmations: string[];
  documentsRecommended: string[];
  notes: string[];
}

// ─── Inference helpers ──────────────────────────────────────────────────────

/**
 * Infer the safety grade from intended use and whether people interact.
 *  - park:         permanent installation OR people climb on it regularly
 *  - commercial:   recurring rental OR retail display with public contact
 *  - rental:       one-time event / parade / no public climbing
 */
export function inferSafetyGrade(input: QuoteInput): SafetyGrade {
  // Explicit override always wins.
  if (input.safetyGrade) return input.safetyGrade;

  const { intendedUse, peopleInteract } = input;

  if (intendedUse === "permanent-installation") return "park";
  if (peopleInteract) {
    // People climbing/bouncing → needs commercial-grade or park-grade.
    if (intendedUse === "recurring-rental") return "park";
    return "commercial";
  }
  if (intendedUse === "recurring-rental") return "commercial";
  if (intendedUse === "retail-display") return "commercial";
  // one-time-event, parade, other → rental spec is sufficient.
  return "rental";
}

/**
 * Infer a size multiplier from the largest available dimension.
 * Baseline (1.0) is a ~10 ft unit. Larger structures cost proportionally
 * more in material, blower capacity, and labor.
 */
export function inferSizeFactor(targetDimensions: TargetDimensions): number {
  const dims = [
    targetDimensions.heightFt,
    targetDimensions.widthFt,
    targetDimensions.depthFt,
  ].filter((d): d is number => typeof d === "number" && d > 0);

  if (dims.length === 0) return 1.0; // unknown size → baseline

  const largest = Math.max(...dims);

  if (largest <= 6) return 0.75; // tabletop / small
  if (largest <= 10) return 1.0; // baseline
  if (largest <= 15) return 1.25;
  if (largest <= 20) return 1.6;
  if (largest <= 30) return 2.1;
  if (largest <= 40) return 2.8;
  return 3.5; // >40 ft — stadium / tunnel scale
}

/**
 * Look up the market factor for a country code, falling back to default.
 */
export function countryFactor(country: string): number {
  const cc = country.toUpperCase();
  const factor = pricingConfig.marketFactor[cc];
  return typeof factor === "number" ? factor : pricingConfig.marketFactor.default;
}

// ─── Quantity factor (subtle bulk discount) ─────────────────────────────────

function quantityFactor(qty: number): number {
  if (qty <= 1) return 1.0;
  if (qty === 2) return 0.97; // 3% on 2nd unit
  if (qty <= 4) return 0.94; // 6%
  if (qty <= 9) return 0.9; // 10%
  return 0.85; // 15% for 10+
}

// ─── Production time ────────────────────────────────────────────────────────

function productionTimeFor(
  productType: ProductType,
  safetyGrade: SafetyGrade,
  artworkReady: boolean,
): string {
  // Base weeks by product complexity.
  const baseWeeks: Record<ProductType, number> = {
    "giant-product-replica": 4,
    "inflatable-arch": 3,
    "inflatable-tent": 4,
    "inflatable-mascot": 5,
    "inflatable-costume": 2,
    "bounce-house": 3,
    "inflatable-slide": 4,
    "obstacle-course": 6,
    "sealed-inflatable": 3,
    other: 4,
  };

  let weeks = baseWeeks[productType] ?? 4;

  // Park-grade adds material sourcing + extra reinforcement time.
  if (safetyGrade === "park") weeks += 2;
  else if (safetyGrade === "commercial") weeks += 1;

  // Artwork not ready adds design/approval cycle.
  if (!artworkReady) weeks += 1;

  return `${weeks}–${weeks + 1} weeks`;
}

// ─── Recommended system + configuration ─────────────────────────────────────

function recommendedSystem(
  productType: ProductType,
  safetyGrade: SafetyGrade,
  indoorOutdoor: IndoorOutdoor,
): { system: string; config: ProductConfiguration[] } {
  // Material recommendation by safety grade.
  const material =
    safetyGrade === "park"
      ? "500D PVC-coated polyester / Cordura"
      : safetyGrade === "commercial"
        ? "420D Oxford nylon"
        : "210D Oxford nylon";

  // Blower recommendation.
  const blower =
    safetyGrade === "park"
      ? "Industrial 1.5HP continuous-air blower (110V/230V per destination)"
      : safetyGrade === "commercial"
        ? "1HP continuous-air blower with GFCI"
        : "750W continuous-air blower";

  const config: ProductConfiguration[] = [
    { label: "Material", detail: material },
    { label: "Blower system", detail: blower },
    {
      label: "Print",
      detail: "Full-color UV-resistant digital print (3–5 yr fade resistance)",
    },
    {
      label: "Fire retardancy",
      detail: indoorOutdoor === "indoor" || indoorOutdoor === "both"
        ? "NFPA 701 certified (required for indoor venues)"
        : "NFPA 701 certified (standard on all units)",
    },
    { label: "Accessories", detail: "Tie-down stakes, anchor straps, repair kit, storage bag" },
  ];

  // Product-type-specific recommendations.
  let system = `${safetyGrade}-grade custom inflatable`;
  if (productType === "sealed-inflatable") {
    system = "Sealed-air inflatable (no continuous blower — internal blower valve)";
    config[1] = { label: "Blower system", detail: "Sealed-air valve + rechargeable inflator pump" };
  }
  if (productType === "inflatable-costume") {
    system = "Wearable inflatable costume with battery-powered fan";
    config[1] = { label: "Power", detail: "Rechargeable Li-Ion battery (4–7 hrs)" };
    config[0] = { label: "Material", detail: "Ripstop polyester / 420D Oxford nylon" };
  }

  return { system, config };
}

// ─── Shipping estimate ──────────────────────────────────────────────────────

function shippingEstimate(
  country: string,
  safetyGrade: SafetyGrade,
  productType: ProductType,
): string {
  const cc = country.toUpperCase();
  const domestic = cc === "US" || cc === "CA";

  // Rough freight classes.
  const heavy =
    safetyGrade === "park" ||
    ["inflatable-tent", "obstacle-course", "inflatable-slide"].includes(
      productType,
    );

  if (domestic) {
    return heavy
      ? "Freight (LTL), 5–10 business days, $450–$950"
      : "Ground freight, 4–7 business days, $180–$420";
  }
  // International
  return heavy
    ? "Ocean freight (crated), 18–28 days, $1,200–$2,400"
    : "Air or express freight, 7–14 days, $380–$780";
}

// ─── Documents & confirmations ──────────────────────────────────────────────

function recommendedDocuments(
  input: QuoteInput,
  safetyGrade: SafetyGrade,
): string[] {
  const docs: string[] = [];
  const cc = input.country.toUpperCase();

  // NFPA 701 always relevant for indoor/both, and standard on all units.
  docs.push("NFPA 701 fire-retardancy certificate");

  if (cc === "US") {
    docs.push("ASTM F2374 commercial compliance documentation");
    if (input.peopleInteract) {
      docs.push("CPSIA / ASTM F2729 children's product test report (if under-12 use)");
    }
  }
  if (["GB", "UK", "DE", "FR", "IT", "ES", "NL"].includes(cc)) {
    docs.push("EN 14960 declaration of conformity (CE marking support)");
  }

  docs.push("UL/ETL/CE blower certification (matched to destination market)");

  if (safetyGrade === "park") {
    docs.push("Engineering load calc + anchoring specification (permanent install)");
  }

  // Dedupe while preserving order.
  return Array.from(new Set(docs));
}

function requiredConfirmations(input: QuoteInput): string[] {
  const conf: string[] = [];

  if (!input.artworkReady) {
    conf.push("Final vector artwork (AI/EPS/SVG) or approved 3D rendering");
  }
  if (!input.voltagePlug) {
    conf.push("Destination voltage & plug type (110V US / 230V EU / 240V AU)");
  }
  if (input.indoorOutdoor === "indoor" || input.indoorOutdoor === "both") {
    conf.push("Venue fire-marshal NFPA 701 documentation deadline");
  }
  if (input.targetDimensions.heightFt && input.targetDimensions.heightFt > 25) {
    conf.push("Venue height clearance confirmation (>25 ft structure)");
  }
  conf.push("Exact delivery address + event date for production scheduling");

  return conf;
}

// ─── Main entry: estimateInflatableQuote ────────────────────────────────────

export function estimateInflatableQuote(input: QuoteInput): QuoteEstimate {
  const basePrice = pricingConfig.basePriceUsd[input.productType] ?? pricingConfig.basePriceUsd.other;
  const safetyGrade = inferSafetyGrade(input);
  const sFactor = pricingConfig.safetyFactor[safetyGrade];
  const mFactor = countryFactor(input.country);
  const sizeFactor = inferSizeFactor(input.targetDimensions);
  const qFactor = quantityFactor(input.quantity);

  // Midpoint in USD.
  const midpoint = basePrice * sFactor * mFactor * sizeFactor * qFactor * input.quantity;

  const min = Math.round((midpoint * pricingConfig.rangeFactor.min) / 10) * 10;
  const max = Math.round((midpoint * pricingConfig.rangeFactor.max) / 10) * 10;

  const { system, config } = recommendedSystem(
    input.productType,
    safetyGrade,
    input.indoorOutdoor,
  );

  const notes: string[] = [];
  if (input.quantity > 1) {
    notes.push(`Quantity ${input.quantity} includes a bulk discount applied to the unit price.`);
  }
  if (!input.artworkReady) {
    notes.push("Artwork not yet ready — production timeline includes a design/approval cycle. Submit vector files to compress lead time.");
  }
  if (input.safetyGrade && input.safetyGrade !== safetyGrade) {
    notes.push(`Requested safety grade "${input.safetyGrade}" overridden to "${safetyGrade}" based on intended use and people-interaction.`);
  }

  return {
    recommendedSystem: system,
    productConfiguration: config,
    safetyLevel: safetyGrade,
    priceRangeUsd: { min, max },
    productionTime: productionTimeFor(input.productType, safetyGrade, input.artworkReady),
    shippingEstimate: shippingEstimate(input.country, safetyGrade, input.productType),
    requiredConfirmations: requiredConfirmations(input),
    documentsRecommended: recommendedDocuments(input, safetyGrade),
    notes,
  };
}
