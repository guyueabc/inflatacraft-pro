// ─── Inflatable Quote Review Helper ─────────────────────────────────────────
//
// Pure TypeScript review helper — NO OpenAI / LLM dependency.
// Given a QuoteInput, it produces an internal, non-customer-facing planning
// aid. Project-specific materials, equipment, schedules, freight, prices, and
// documents remain unconfirmed until staff verifies them in writing.
//
// Usage:
//   import { buildQuoteReview } from "@/lib/ai/pricing-engine";
//   const review = buildQuoteReview(input);

import type { ProductType } from "@/config/pricing";

// ─── Types ──────────────────────────────────────────────────────────────────

export type ReviewCategory = "baseline" | "public-interaction" | "installation";

export type IntendedUse =
  | "one-time-event"
  | "recurring-rental"
  | "permanent-installation"
  | "retail-display"
  | "parade"
  | "other";

export type IndoorOutdoor = "indoor" | "outdoor" | "both";

export interface TargetDimensions {
  /** Height in feet (optional; retained for confirmation checks). */
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
  /** Destination supplied by the form; retained for staff review. */
  country: string;
  /** Optional internal review category. If omitted, inferred for staff triage. */
  reviewCategory?: ReviewCategory;
  /** Whether people will physically interact with / climb on the inflatable. */
  peopleInteract: boolean;
  /** Voltage / plug requirement supplied by the customer, if known. */
  voltagePlug?: string;
  /** Whether final artwork files are ready for staff review. */
  artworkReady: boolean;
  /** Compliance documents the customer explicitly requires. */
  requiredDocuments?: string[];
}

export interface ProductConfiguration {
  label: string;
  detail: string;
}

export interface QuoteReview {
  planningStatus: "staff-review-required";
  productConfiguration: ProductConfiguration[];
  reviewCategory: ReviewCategory;
  requiredConfirmations: string[];
  documentsToVerify: string[];
  notes: string[];
}

// ─── Inference helpers ──────────────────────────────────────────────────────

/**
 * Infer a coarse internal review category. This is triage only and is not a
 * safety, compliance, construction, or suitability determination.
 */
export function inferReviewCategory(input: QuoteInput): ReviewCategory {
  // Explicit internal category wins for routing purposes only.
  if (input.reviewCategory) return input.reviewCategory;

  const { intendedUse, peopleInteract } = input;

  if (intendedUse === "permanent-installation") return "installation";
  if (peopleInteract) {
    // Public interaction raises the internal review category.
    if (intendedUse === "recurring-rental") return "installation";
    return "public-interaction";
  }
  if (intendedUse === "recurring-rental") return "public-interaction";
  if (intendedUse === "retail-display") return "public-interaction";
  // Other uses enter the baseline review queue.
  return "baseline";
}

// ─── Planning questions ──────────────────────────────────────────────────────

function recommendedSystem(
  productType: ProductType,
  reviewCategory: ReviewCategory,
  indoorOutdoor: IndoorOutdoor,
): { system: string; config: ProductConfiguration[] } {
  const config: ProductConfiguration[] = [
    {
      label: "Material",
      detail: "Confirm material, weight or denier, coating, construction, and intended-use suitability in the written specification.",
    },
    {
      label: "Inflation and electrical equipment",
      detail: "Confirm the inflation system, equipment model, voltage, plug, protection, and destination requirements in writing.",
    },
    {
      label: "Print",
      detail: "Confirm artwork, print method, color-approval process, finish, and applicable care limitations.",
    },
    {
      label: "Venue and document review",
      detail: indoorOutdoor === "indoor" || indoorOutdoor === "both"
        ? "Ask the venue or authority which fire-performance and electrical documents apply, then verify availability for the exact supplied configuration."
        : "Ask the venue or authority which reports, labels, or approvals apply, then verify availability for the exact supplied configuration.",
    },
    {
      label: "Accessories and anchoring",
      detail: "Confirm included accessories, site-specific anchoring, installation limits, repair items, and packing in the written quotation.",
    },
  ];

  let system = `${reviewCategory} review category; final construction is unconfirmed`;
  if (productType === "sealed-inflatable") {
    system = "Sealed-air concept review; final construction is unconfirmed";
    config[1] = {
      label: "Inflation equipment",
      detail: "Confirm valve, inflation equipment, operating pressure, inspection, and maintenance requirements in writing.",
    };
  }
  if (productType === "inflatable-costume") {
    system = "Wearable inflatable concept review; final construction is unconfirmed";
    config[1] = {
      label: "Power and fan",
      detail: "Confirm the exact fan, power source, runtime conditions, charging instructions, and destination requirements in writing.",
    };
  }

  return { system, config };
}

// ─── Documents & confirmations ──────────────────────────────────────────────

function recommendedDocuments(
  input: QuoteInput,
  reviewCategory: ReviewCategory,
): string[] {
  const docs: string[] = [
    "Ask the venue, authority, insurer, or qualified adviser which requirements apply to the exact product, destination, and intended use.",
    "Verify that any offered report, certificate, label, or declaration matches the exact material, equipment, manufacturer, date, market, and supplied configuration.",
  ];
  if (input.indoorOutdoor === "indoor" || input.indoorOutdoor === "both") {
    docs.push("Confirm the venue's fire-performance and electrical documentation requirements before approving the specification.");
  }
  if (input.peopleInteract) {
    docs.push("Obtain qualified advice on requirements for public interaction, participant age, operation, inspection, and supervision.");
  }
  if (reviewCategory === "installation") {
    docs.push("Confirm whether project-specific engineering, anchoring, permitting, inspection, or installation documentation is required.");
  }
  docs.push(...(input.requiredDocuments ?? []).map((document) => `Customer-requested document to verify: ${document}`));
  return Array.from(new Set(docs));
}

function requiredConfirmations(input: QuoteInput): string[] {
  const conf: string[] = [];

  if (!input.artworkReady) {
    conf.push("Final vector artwork (AI/EPS/SVG) or approved 3D rendering");
  }
  if (!input.voltagePlug) {
    conf.push("Destination electrical requirements, voltage, plug type, and applicable equipment documentation");
  }
  if (input.indoorOutdoor === "indoor" || input.indoorOutdoor === "both") {
    conf.push("Venue or authority requirements and the deadline for any applicable fire-performance documentation");
  }
  if (input.targetDimensions.heightFt && input.targetDimensions.heightFt > 25) {
    conf.push("Venue height clearance confirmation (>25 ft structure)");
  }
  conf.push("Exact delivery address and required date for a written production and delivery review");

  return conf;
}

// ─── Main entry: buildQuoteReview ───────────────────────────────────────────

export function buildQuoteReview(input: QuoteInput): QuoteReview {
  const reviewCategory = inferReviewCategory(input);

  const { system, config } = recommendedSystem(
    input.productType,
    reviewCategory,
    input.indoorOutdoor,
  );

  const notes: string[] = [];
  if (!input.artworkReady) {
    notes.push("Artwork is not yet ready; confirm the available design-support and approval scope before scheduling production.");
  }
  return {
    planningStatus: "staff-review-required",
    productConfiguration: config,
    reviewCategory,
    requiredConfirmations: requiredConfirmations(input),
    documentsToVerify: recommendedDocuments(input, reviewCategory),
    notes: [
      `Internal category: ${system}. This is not a product specification, compliance determination, price, production schedule, or delivery commitment.`,
      ...notes,
    ],
  };
}
