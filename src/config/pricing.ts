// ─── Pricing Configuration ──────────────────────────────────────────────────
//
// Single source of truth for the inflatable quote engine's tunable knobs.
// The pricing engine (src/lib/ai/pricing-engine.ts) reads these values to
// produce a recommended system, configuration list, and USD price range.
//
// Formula (see pricing-engine.ts for the full implementation):
//   basePriceUsd[productType]
//     × safetyFactor[safetyGrade]
//     × marketFactor[country]
//     × sizeFactor(inferred from targetDimensions)
//     × quantity factor (subtle bulk discount)
//   → then spread by rangeFactor { min, max } to produce a price range.
//
// All monetary values are in USD. Adjust base prices here when the cost
// sheet changes — the engine and quote UI pick up new values automatically.

export type ProductType =
  | "giant-product-replica"
  | "inflatable-arch"
  | "inflatable-tent"
  | "inflatable-mascot"
  | "inflatable-costume"
  | "bounce-house"
  | "inflatable-slide"
  | "obstacle-course"
  | "sealed-inflatable"
  | "other";

export type SafetyGrade = "rental" | "commercial" | "park";

export interface PricingConfig {
  /** Base USD price per product type, before safety/market/size multipliers. */
  basePriceUsd: Record<ProductType, number>;
  /** Safety-grade multiplier. Rental = lightest duty, park = heaviest. */
  safetyFactor: Record<SafetyGrade, number>;
  /** Geographic market multiplier by ISO country code. `default` fallback. */
  marketFactor: Record<string, number> & { default: number };
  /** Min/max spread applied to the computed midpoint to produce a range. */
  rangeFactor: { min: number; max: number };
}

export const pricingConfig: PricingConfig = {
  // Base prices reflect the inflatablemodel catalog / cost sheet.
  // These are starting points; the engine applies multipliers for safety,
  // market, and size. "other" uses a conservative mid-range default.
  basePriceUsd: {
    "giant-product-replica": 3500,
    "inflatable-arch": 2200,
    "inflatable-tent": 3400,
    "inflatable-mascot": 2800,
    "inflatable-costume": 850,
    "bounce-house": 1900,
    "inflatable-slide": 4500,
    "obstacle-course": 6500,
    "sealed-inflatable": 1600,
    other: 2500,
  },

  // Safety grade drives material spec, reinforcement, and blower duty.
  //  - rental:   light-duty, frequent setup/teardown, 210D standard
  //  - commercial: standard duty, repeated public use, 210D–420D
  //  - park:     permanent/heavy installation, 500D Cordura, industrial blower
  safetyFactor: {
    rental: 1.0,
    commercial: 1.35,
    park: 1.85,
  },

  // Market factor adjusts for regional cost-of-goods, shipping, and duty.
  // Keys are ISO 3166-1 alpha-2 country codes. `default` covers unlisted.
  marketFactor: {
    US: 1.0,
    CA: 1.08,
    GB: 1.12,
    AU: 1.18,
    DE: 1.1,
    FR: 1.1,
    default: 1.15,
  },

  // Range spread: the engine computes a midpoint then applies min/max to
  // show a realistic quote window (accounts for artwork complexity,
  // custom features, and shipping variance).
  rangeFactor: {
    min: 0.82,
    max: 1.28,
  },
};

/** Convenience: list of all product types for UI dropdowns / validation. */
export const PRODUCT_TYPES: ProductType[] = [
  "giant-product-replica",
  "inflatable-arch",
  "inflatable-tent",
  "inflatable-mascot",
  "inflatable-costume",
  "bounce-house",
  "inflatable-slide",
  "obstacle-course",
  "sealed-inflatable",
  "other",
];

/** Human-readable labels for each product type (for UI display). */
export const PRODUCT_TYPE_LABELS: Record<ProductType, string> = {
  "giant-product-replica": "Giant Product Replica",
  "inflatable-arch": "Inflatable Arch",
  "inflatable-tent": "Inflatable Tent",
  "inflatable-mascot": "Inflatable Mascot",
  "inflatable-costume": "Inflatable Costume",
  "bounce-house": "Bounce House",
  "inflatable-slide": "Inflatable Slide",
  "obstacle-course": "Obstacle Course",
  "sealed-inflatable": "Sealed Inflatable",
  other: "Custom / Other",
};
