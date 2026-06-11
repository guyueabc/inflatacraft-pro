import { z } from "zod";

// 只需要邮箱和电话 — 其余全部可选
export const quoteSchema = z.object({
  email: z.string().email("请输入有效的邮箱地址"),
  phone: z.string().min(7, "请输入有效的电话号码"),
  name: z.string().optional().or(z.literal("")),
  company: z.string().optional().or(z.literal("")),
  productType: z.string().optional().or(z.literal("")),
  description: z.string().optional().or(z.literal("")),
  size: z.string().optional().or(z.literal("")),
  quantity: z.string().optional().or(z.literal("")),
  budgetRange: z.string().optional().or(z.literal("")),
  deadline: z.string().optional().or(z.literal("")),
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
