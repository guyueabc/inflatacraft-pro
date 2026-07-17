export interface InflatableStandard {
  code: string;
  market: "US" | "EU" | "UK" | "AU/NZ" | "Global";
  appliesTo: string;
  websiteCopy: string;
  warning: string;
}

export const inflatableStandards: InflatableStandard[] = [
  {
    code: "ASTM F2374",
    market: "US",
    appliesTo: "May apply to certain commercial inflatable amusement devices in the United States.",
    websiteCopy:
      "Ask the venue, authority, insurer, or qualified advisor whether ASTM F2374 applies to the intended product and use. Confirm any product-specific testing or documentation in writing before ordering.",
    warning: "Do not represent a product as compliant or certified without documentation for the exact configuration.",
  },
  {
    code: "EN 14960",
    market: "EU",
    appliesTo: "May apply to certain inflatable play equipment used by children in European markets.",
    websiteCopy:
      "Confirm whether EN 14960 applies with the relevant market and venue, then verify documentation availability for the exact quoted product.",
    warning: "Requirements vary by product, age group, market, and operation. Obtain qualified advice where needed.",
  },
  {
    code: "NFPA 701",
    market: "US",
    appliesTo: "A venue may request flame-related textile documentation for an indoor or public installation.",
    websiteCopy:
      "Ask the venue or fire authority which flame-related reports or certificates are required and confirm availability for the exact material and order.",
    warning: "Do not assume a material or finished product is certified based on generic website copy.",
  },
  {
    code: "UL / ETL / CE Blower",
    market: "Global",
    appliesTo: "Electrical equipment requirements depend on destination, voltage, plug, product, and local rules.",
    websiteCopy:
      "Confirm the blower model, voltage, plug, listing or marking, and documentation in the final quotation for the destination market.",
    warning: "Do not promise a certification or destination suitability until the exact supplied equipment is documented.",
  },
  {
    code: "CPSIA / ASTM F2729",
    market: "US",
    appliesTo: "Additional requirements may apply when a product is intended or marketed for children in the United States.",
    websiteCopy:
      "Obtain qualified advice on children's-product requirements and confirm any required product-specific reports or certificates before ordering.",
    warning: "Do not market a product for children or claim compliance without the required evidence for the exact product.",
  },
];

export function getStandard(code: string): InflatableStandard | undefined {
  return inflatableStandards.find((standard) => standard.code === code);
}

export function standardsForCountry(countryCode: string): InflatableStandard[] {
  const code = countryCode.toUpperCase();
  if (code === "US") return inflatableStandards.filter((item) => ["ASTM F2374", "NFPA 701", "UL / ETL / CE Blower", "CPSIA / ASTM F2729"].includes(item.code));
  if (["GB", "UK", "DE", "FR", "IT", "ES", "NL", "PL", "SE", "AT", "BE"].includes(code)) {
    return inflatableStandards.filter((item) => ["EN 14960", "UL / ETL / CE Blower"].includes(item.code));
  }
  return inflatableStandards.filter((item) => item.code === "UL / ETL / CE Blower");
}
