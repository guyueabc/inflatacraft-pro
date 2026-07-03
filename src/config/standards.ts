// ─── Inflatable Industry Standards & Compliance ─────────────────────────────
//
// Authoritative reference for the safety, fire, electrical, and children's-product
// standards that govern commercial inflatables. Each entry records the standard
// code, its primary market, what it applies to, approved website/customer-facing
// copy, and a warning shown when a project may fall outside compliance.
//
// Used by:
//   - Quote flow (documentsRecommended + requiredConfirmations)
//   - Safety / compliance pages
//   - Sales replies when a lead asks "is this certified?"
//
// Source of truth: inflatablemodel (qddjtx.com) engineering documentation.
// Keep websiteCopy concise and customer-facing; keep warning actionable.

export interface InflatableStandard {
  /** Standard code, e.g. "ASTM F2374" */
  code: string;
  /** Primary geographic market the standard governs */
  market: "US" | "EU" | "UK" | "AU/NZ" | "Global";
  /** What products / scenarios the standard applies to */
  appliesTo: string;
  /** Approved customer-facing copy for the website and quotes */
  websiteCopy: string;
  /** Actionable warning when a project may not meet the standard */
  warning: string;
}

export const inflatableStandards: InflatableStandard[] = [
  {
    code: "ASTM F2374",
    market: "US",
    appliesTo:
      "Commercial inflatables intended for public use — bounce houses, slides, obstacle courses, interactive games, and any continuous-air inflatable deployed in a commercial (paid, public, or rental) setting.",
    websiteCopy:
      "All inflatablemodel commercial products are designed, tested, and certified to meet or exceed ASTM F2374 — the primary U.S. safety standard governing commercial inflatables. Compliance covers design requirements, material specifications, anchoring systems, inflation-pressure limits, and warning labeling. Each unit is wind-load tested at 25 mph sustained (1.5× safety factor), seam-strength tested at 200+ lbs per linear inch, and flammability certified per CPAI-84.",
    warning:
      "If the inflatable will be used by the general public or in a paid/rental context, ASTM F2374 compliance is effectively mandatory in the U.S. Budget suppliers that skip this standard expose the operator to liability. Confirm the deployment is commercial-grade before quoting.",
  },
  {
    code: "EN 14960",
    market: "EU",
    appliesTo:
      "Inflatable play equipment intended for use by children under 14 in the EU and UK — includes bounce houses, slides, and interactive inflatables deployed at events, FECs, or rental fleets in European markets.",
    websiteCopy:
      "For EU and UK deployments, our play inflatables are manufactured to EN 14960 — the European standard for inflatable play equipment. This governs entrapment gaps, impact-absorbing surfaces, anchor point design, maximum user numbers, and wind-speed operating limits. Documentation and declarations of conformity are provided on request for CE marking support.",
    warning:
      "EN 14960 applies specifically to inflatables used by children under 14 in EU/UK markets. If the unit will operate in the EU/UK and serve children, confirm the design meets entrapment and impact criteria — non-compliant units can be refused at customs or by venue inspectors.",
  },
  {
    code: "NFPA 701",
    market: "US",
    appliesTo:
      "Flame-retardancy certification for all textile-based inflatables deployed in U.S. venues — convention centers, stadiums, malls, arenas, hotels, and any indoor or enclosed public space requiring fire-marshal approval.",
    websiteCopy:
      "All our materials are NFPA 701 certified — the U.S. standard for flame retardancy in textiles. This certification is required by convention centers, stadiums, malls, and most event venues in the United States. We also meet EN 71 (EU) and AS/NZS (Australia/New Zealand) standards. Fire-marshal documentation is provided on request, typically within one business day.",
    warning:
      "Most U.S. indoor venues will not allow an inflatable on the show floor without NFPA 701 documentation on file. If the deployment is indoor or in an enclosed public venue, flag the certification requirement early — last-minute venue refusals are the #1 cause of event-day failures.",
  },
  {
    code: "UL / ETL / CE Blower",
    market: "Global",
    appliesTo:
      "All continuous-inflation blowers powering commercial inflatables — UL for the U.S. market, ETL (Intertek) as a recognized U.S./Canada alternative, and CE for the EU. Applies to every inflatable that requires a powered blower to maintain structure.",
    websiteCopy:
      "Every inflatablemodel unit ships with a safety-certified continuous-air blower matched to the U.S. (UL), North American (ETL), or European (CE) market. Blowers include thermal-overload protection, GFCI-compatible plugs (U.S.), and IP-rated housings for outdoor operation. Voltage and plug type are configured to the destination country at no extra cost.",
    warning:
      "Blower certification must match the destination market — a UL blower will not satisfy EU inspectors and a CE blower is not listed for U.S. commercial use. Always confirm the destination country and voltage/plug before production; retrofitting a certified blower post-shipment is costly and may delay deployment.",
  },
  {
    code: "CPSIA / ASTM F2729",
    market: "US",
    appliesTo:
      "Inflatable products marketed to or intended for use by children under 12 in the United States — CPSIA governs lead content and phthalate limits in children's products; ASTM F2729 is the consumer safety specification for constant-air inflatable play devices for home/residential use.",
    websiteCopy:
      "Children's inflatables are tested for lead content and phthalates per the CPSIA (Consumer Product Safety Improvement Act) and meet ASTM F2729 — the consumer safety specification for residential constant-air inflatable play devices. A Children's Product Certificate (CPC) and applicable test reports are available for products marketed to children under 12.",
    warning:
      "CPSIA compliance is triggered when a product is marketed to or intended for children under 12. If the inflatable will be sold to a school, daycare, or family entertainment context, children's-product testing and a CPC are required — untested products cannot legally be sold into these channels in the U.S.",
  },
];

/** Quick lookup by standard code (e.g. for quote document generation). */
export function getStandard(code: string): InflatableStandard | undefined {
  return inflatableStandards.find((s) => s.code === code);
}

/** Standards applicable to a given ISO country code (for market-aware quotes). */
export function standardsForCountry(
  countryCode: string,
): InflatableStandard[] {
  const cc = countryCode.toUpperCase();
  if (cc === "US") {
    return inflatableStandards.filter((s) =>
      ["ASTM F2374", "NFPA 701", "UL / ETL / CE Blower", "CPSIA / ASTM F2729"].includes(
        s.code,
      ),
    );
  }
  if (["GB", "UK"].includes(cc)) {
    return inflatableStandards.filter((s) =>
      ["EN 14960", "UL / ETL / CE Blower"].includes(s.code),
    );
  }
  if (["DE", "FR", "IT", "ES", "NL", "PL", "SE", "AT", "BE"].includes(cc)) {
    return inflatableStandards.filter((s) =>
      ["EN 14960", "UL / ETL / CE Blower"].includes(s.code),
    );
  }
  if (["AU", "NZ"].includes(cc)) {
    return inflatableStandards.filter((s) =>
      ["UL / ETL / CE Blower"].includes(s.code),
    );
  }
  // Default: blower standard always applies; others are market-specific.
  return inflatableStandards.filter((s) => s.code === "UL / ETL / CE Blower");
}
