import { prisma } from "@/lib/prisma";
import { OrderStatus, Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { getServerSession } from "@/lib/auth";

// ─── Validation Schemas ─────────────────────────────────────────────────────

const createOrderSchema = z.object({
  quoteId: z.string().optional(),
  items: z
    .array(
      z.object({
        productName: z.string().min(1),
        quantity: z.number().int().positive(),
        unitPrice: z.number().positive(),
      }),
    )
    .min(1),
  total: z.number().positive().max(100_000_000),
  shippingAddress: z.object({
    line1: z.string().min(1).max(200),
    line2: z.string().max(200).optional(),
    city: z.string().min(1).max(100),
    state: z.string().min(1).max(100),
    postalCode: z.string().min(1).max(20),
    country: z.string().min(1).max(100),
  }),
});

// ─── POST /api/orders — Create a new order ──────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = createOrderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    // Build initial timeline entry
    const initialTimeline = [
      {
        status: "PENDING_PAYMENT",
        timestamp: new Date().toISOString(),
        note: "Order created",
      },
    ];

    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        quoteId: parsed.data.quoteId ?? null,
        status: "PENDING_PAYMENT",
        items: parsed.data.items,
        total: new Prisma.Decimal(parsed.data.total),
        shippingAddress: parsed.data.shippingAddress,
        timeline: initialTimeline,
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("[POST /api/orders]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ─── GET /api/orders — List the current user's orders ───────────────────────

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") as OrderStatus | null;
    const limit = Math.min(Math.max(Number(searchParams.get("limit")) || 20, 1), 100);
    const offset = Math.max(Number(searchParams.get("offset")) || 0, 0);

    const where: Prisma.OrderWhereInput = { userId: session.user.id };
    if (status) {
      where.status = status;
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: offset,
        include: {
          quote: {
            select: { id: true, productType: true },
          },
        },
      }),
      prisma.order.count({ where }),
    ]);

    return NextResponse.json({ orders, total, limit, offset });
  } catch (error) {
    console.error("[GET /api/orders]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
