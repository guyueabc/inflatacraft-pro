import { z } from "zod";

// 邮箱+电话必填，其余全部可选 — 新增行业采购场景字段
export const quoteSchema = z.object({
  // Required
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().optional().or(z.literal("")),
  // Basic info
  name: z.string().optional().or(z.literal("")),
  company: z.string().optional().or(z.literal("")),
  country: z.string().optional().or(z.literal("")),
  productType: z.string().optional().or(z.literal("")),
  description: z.string().optional().or(z.literal("")),
  size: z.string().optional().or(z.literal("")),
  quantity: z.string().optional().or(z.literal("")),
  budgetRange: z.string().optional().or(z.literal("")),
  deadline: z.string().optional().or(z.literal("")),
  // Industry scenario fields (for pricing engine)
  intendedUse: z.string().optional().or(z.literal("")),
  indoorOutdoor: z.string().optional().or(z.literal("")),
  peopleInteract: z.string().optional().or(z.literal("")),
  userAgeRange: z.string().optional().or(z.literal("")),
  installationSurface: z.string().optional().or(z.literal("")),
  voltagePlug: z.string().optional().or(z.literal("")),
  artworkReady: z.string().optional().or(z.literal("")),
  requiredDocuments: z.array(z.string()).optional().default([]),
  // Honeypot
  website: z.string().optional().or(z.literal("")),
});

export type QuoteFormData = z.infer<typeof quoteSchema>;

export const PRODUCT_TYPES = [
  "Giant Product Replica",
  "Inflatable Mascot",
  "Inflatable Arch",
  "Inflatable Costume",
  "Inflatable Tent",
  "Inflatable Game / Obstacle",
  "Custom Shape / Other",
] as const;

export const BUDGET_RANGES = [
  "Under $1,000",
  "$1,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000+",
  "Not sure yet",
] as const;

export const DEADLINES = [
  "ASAP (within 2 weeks)",
  "2–4 weeks",
  "1–2 months",
  "3–6 months",
  "6+ months",
  "No specific deadline",
] as const;

export const INTENDED_USES = [
  "Brand activation",
  "Retail promotion",
  "Trade show",
  "Sports event",
  "Festival",
  "Rental / Amusement",
  "Children's play",
  "Indoor display",
  "Other",
] as const;

export const INDOOR_OUTDOOR = [
  "Indoor",
  "Outdoor",
  "Both",
  "Not sure",
] as const;

export const PEOPLE_INTERACT = [
  "Yes — people will climb, jump, slide or enter",
  "No — display only",
  "Not sure",
] as const;

export const COUNTRIES = [
  "United States", "Canada", "United Kingdom", "Australia",
  "Germany", "France", "Spain", "Italy", "Netherlands",
  "UAE", "Saudi Arabia", "Brazil", "Mexico",
  "Japan", "Singapore", "Other",
] as const;

export const VOLTAGE_PLUGS = [
  "110V / US plug",
  "220V / EU plug",
  "220V / UK plug",
  "220V / AU plug",
  "Not sure",
] as const;

export const ARTWORK_STATUS = [
  "Yes — artwork ready",
  "No — need design help",
  "In progress",
] as const;

export const INSTALLATION_SURFACES = [
  "Grass",
  "Concrete",
  "Asphalt",
  "Indoor floor",
  "Rooftop",
  "Not sure",
] as const;
