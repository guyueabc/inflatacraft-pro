// ─── Quote product types ─────────────────────────────────────────────────────
//
// Keep public form options here, but do not embed price, capacity, schedule,
// freight, or compliance assumptions. Those details require current business
// evidence and project-specific written confirmation.

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
