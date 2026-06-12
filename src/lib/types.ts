// ─── inflatablemodel — Shared TypeScript Types ──────────────────────────────
//
// These types mirror the Prisma schema but live in the application layer.
// They are used by API routes, server components, and form handling.
//
// When using Prisma-generated types for queries, prefer:
//   import type { User, Quote, ... } from "@prisma/client";
// These application types are for DTOs, form payloads, and API responses.

import type {
  UserRole,
  QuoteStatus,
  RenderingStatus,
  OrderStatus,
} from "@prisma/client";

// ─── Re-exports ─────────────────────────────────────────────────────────────

export type { UserRole, QuoteStatus, RenderingStatus, OrderStatus };

// ─── User ───────────────────────────────────────────────────────────────────

export interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  company: string | null;
  phone: string | null;
  role: UserRole;
  verified: boolean;
  createdAt: string;
}

// ─── Quote ──────────────────────────────────────────────────────────────────

export interface QuoteSummary {
  id: string;
  status: QuoteStatus;
  productType: string | null;
  description: string;
  images: string[];
  size: string | null;
  quantity: number | null;
  budget: number | null;
  deadline: string | null;
  quotedPrice: number | null;
  createdAt: string;
  updatedAt: string;
  renderings?: Pick<RenderingSummary, "id" | "imageUrl" | "status">[];
}

export interface QuoteFormData {
  productType?: string;
  description: string;
  images?: string[];
  size?: string;
  quantity?: number;
  budget?: number;
  deadline?: string; // ISO 8601
}

// ─── Rendering ──────────────────────────────────────────────────────────────

export interface RenderingSummary {
  id: string;
  imageUrl: string;
  annotations: Record<string, unknown>;
  status: RenderingStatus;
  createdAt: string;
}

export interface DesignAnnotation {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  color?: string;
  note?: string;
}

// ─── Order ──────────────────────────────────────────────────────────────────

export interface OrderSummary {
  id: string;
  status: OrderStatus;
  items: OrderLineItem[];
  total: number;
  shippingAddress: ShippingAddress;
  trackingNumber: string | null;
  timeline: OrderTimelineEntry[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderLineItem {
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface ShippingAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface OrderTimelineEntry {
  status: OrderStatus | string;
  timestamp: string; // ISO 8601
  note?: string;
}

// ─── Product ────────────────────────────────────────────────────────────────

export interface ProductSummary {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number | null;
  category: string;
  images: string[];
  specs: Record<string, unknown>;
  inStock: boolean;
  leadTime: string | null;
  featured: boolean;
}

// ─── Gallery ────────────────────────────────────────────────────────────────

export interface GalleryItemSummary {
  id: string;
  title: string;
  clientName: string;
  industry: string;
  productType: string;
  images: string[];
  videoUrl: string | null;
  description: string | null;
  testimonial: string | null;
  featured: boolean;
}

// ─── API Response Helpers ───────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  limit: number;
  offset: number;
}

export interface ApiError {
  error: string;
  details?: Record<string, string[]>;
}

// ─── NextAuth Session Augmentation ──────────────────────────────────────────
//
// Extend the default NextAuth session types so that `session.user.role`
// and `session.user.id` are recognised by TypeScript throughout the app.

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string | null;
      role: UserRole;
    };
  }

  interface User {
    role?: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
    provider?: string;
  }
}
