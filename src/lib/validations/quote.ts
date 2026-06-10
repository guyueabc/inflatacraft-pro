import { z } from "zod";

// ---- Phase 1 ----
export const quotePhase1Schema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(7, "Please enter a valid phone number")
    .max(20, "Phone number is too long"),
  productType: z
    .string()
    .min(1, "Please select a product type"),
});

export type QuotePhase1Data = z.infer<typeof quotePhase1Schema>;

// ---- Phase 2 ----
export const quotePhase2Schema = z.object({
  company: z.string().max(200, "Company name is too long").optional().or(z.literal("")),
  description: z
    .string()
    .min(20, "Please provide at least 20 characters describing your project")
    .max(5000, "Description is too long"),
  size: z.string().min(1, "Please enter approximate size"),
  quantity: z
    .string()
    .min(1, "Please enter a quantity")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      "Quantity must be a positive number"
    ),
  budgetRange: z.string().min(1, "Please select a budget range"),
  deadline: z.string().min(1, "Please select a deadline"),
  captcha: z
    .string()
    .min(1, "Please answer the security question")
    .refine((val) => String(val).trim() === "7", {
      message: "Incorrect answer — please try again",
    }),
});

export type QuotePhase2Data = z.infer<typeof quotePhase2Schema>;

// ---- Combined ----
export const quoteFullSchema = quotePhase1Schema.merge(quotePhase2Schema);
export type QuoteFormData = z.infer<typeof quoteFullSchema>;

// ---- Constants ----
export const PRODUCT_TYPES = [
  "Giant Product Replica",
  "Inflatable Mascot",
  "Inflatable Arch",
  "Inflatable Costume",
  "Inflatable Tent",
  "Inflatable Game / Obstacle",
  "Inflatable Slide",
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
