import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

const partialLeadSchema = z
  .object({
    email: z.string().trim().email().max(254).optional().or(z.literal("")),
    phone: z.string().trim().max(40).optional().or(z.literal("")),
    name: z.string().trim().max(120).optional(),
    company: z.string().trim().max(160).optional(),
    productType: z.string().trim().max(160).optional(),
    page: z.string().trim().max(500).optional(),
    referrer: z.string().trim().max(1000).optional(),
    utmSource: z.string().trim().max(200).optional(),
    utmMedium: z.string().trim().max(200).optional(),
  })
  .strict()
  .refine((value) => Boolean(value.email || value.phone), {
    message: "email or phone is required",
  });

type ExistingLeadRow = { id: number };

type PartialLeadRow = {
  id: number;
  email: string | null;
  phone: string | null;
  name: string | null;
  company: string | null;
  product_type: string | null;
  page: string;
  referrer: string;
  utm_source: string | null;
  utm_medium: string | null;
  created_at: Date;
};

export async function POST(request: NextRequest) {
  try {
    const parsed = partialLeadSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        { saved: false, code: "VALIDATION_ERROR", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const body = parsed.data;
    const clauses: string[] = [];
    const params: string[] = [];
    if (body.email) {
      params.push(body.email);
      clauses.push(`email = $${params.length}`);
    }
    if (body.phone) {
      params.push(body.phone);
      clauses.push(`phone = $${params.length}`);
    }

    const existing = await prisma.$queryRawUnsafe<ExistingLeadRow[]>(
      `SELECT id FROM partial_leads
       WHERE (${clauses.join(" OR ")})
         AND created_at > NOW() - INTERVAL '24 hours'
       LIMIT 1`,
      ...params
    );
    if (existing.length > 0) {
      return NextResponse.json({ saved: false, reason: "already recorded within 24h" });
    }

    await prisma.$executeRawUnsafe(
      `INSERT INTO partial_leads
       (email, phone, name, company, product_type, page, referrer, utm_source, utm_medium, created_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,NOW())`,
      body.email || null,
      body.phone || null,
      body.name || null,
      body.company || null,
      body.productType || null,
      body.page || "/",
      body.referrer || "",
      body.utmSource || null,
      body.utmMedium || null
    );

    return NextResponse.json({ saved: true });
  } catch (error: unknown) {
    console.error("[PartialLead POST]", error);
    return NextResponse.json(
      { saved: false, code: "PARTIAL_LEAD_WRITE_FAILED", error: "Unable to save partial lead" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const { searchParams } = new URL(request.url);
    const rawLimit = Number(searchParams.get("limit"));
    const limit = Number.isFinite(rawLimit) ? Math.min(Math.max(Math.trunc(rawLimit), 1), 200) : 50;
    const rows = await prisma.$queryRawUnsafe<PartialLeadRow[]>(
      "SELECT * FROM partial_leads ORDER BY created_at DESC LIMIT $1",
      limit
    );
    return NextResponse.json({ partialLeads: rows, total: rows.length });
  } catch (error: unknown) {
    console.error("[PartialLead GET]", error);
    return NextResponse.json(
      { code: "PARTIAL_LEAD_READ_FAILED", error: "Unable to load partial leads" },
      { status: 500 }
    );
  }
}
