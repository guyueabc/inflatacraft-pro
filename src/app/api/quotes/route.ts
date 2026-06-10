import { prisma } from "@/lib/prisma";
import { QuoteStatus, Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { getServerSession } from "@/lib/auth";

// ─── Validation Schemas ─────────────────────────────────────────────────────

const createQuoteSchema = z.object({
  productType: z.string().min(1).max(200).optional(),
  description: z.string().min(1).max(5000),
  images: z.array(z.string().url()).max(20).default([]),
  size: z.string().max(100).optional(),
  quantity: z.number().int().positive().max(100_000).optional(),
  budget: z.number().positive().max(100_000_000).optional(),
  deadline: z.string().datetime().optional(),
});

// ─── POST /api/quotes — Create a new quote ──────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = createQuoteSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const quote = await prisma.quote.create({
      data: {
        userId: session.user.id,
        status: "DRAFT",
        ...parsed.data,
        deadline: parsed.data.deadline ? new Date(parsed.data.deadline) : undefined,
        budget: parsed.data.budget ? new Prisma.Decimal(parsed.data.budget) : undefined,
      },
    });

    return NextResponse.json(quote, { status: 201 });
  } catch (error) {
    console.error("[POST /api/quotes]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ─── GET /api/quotes — List the current user's quotes ───────────────────────

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") as QuoteStatus | null;
    const limit = Math.min(Math.max(Number(searchParams.get("limit")) || 20, 1), 100);
    const offset = Math.max(Number(searchParams.get("offset")) || 0, 0);

    const where: Prisma.QuoteWhereInput = { userId: session.user.id };
    if (status) {
      where.status = status;
    }

    const [quotes, total] = await Promise.all([
      prisma.quote.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: offset,
        include: {
          renderings: { orderBy: { createdAt: "desc" }, take: 1 },
        },
      }),
      prisma.quote.count({ where }),
    ]);

    return NextResponse.json({ quotes, total, limit, offset });
  } catch (error) {
    console.error("[GET /api/quotes]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
