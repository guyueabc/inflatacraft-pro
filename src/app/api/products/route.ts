import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";


// ─── Validation Schemas ─────────────────────────────────────────────────────

const createProductSchema = z.object({
  name: z.string().min(1).max(200),
  slug: z
    .string()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase alphanumeric with hyphens"),
  description: z.string().max(5000).optional(),
  price: z.number().positive().max(10_000_000).optional(),
  category: z.string().min(1).max(100),
  images: z.array(z.string().url()).max(20).default([]),
  specs: z.record(z.string(), z.unknown()).default({}),
  inStock: z.boolean().default(true),
  leadTime: z.string().max(100).optional(),
  featured: z.boolean().default(false),
});

// ─── GET /api/products — List products ──────────────────────────────────────

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");

    const limit = Math.min(Math.max(Number(searchParams.get("limit")) || 20, 1), 100);
    const offset = Math.max(Number(searchParams.get("offset")) || 0, 0);

    const where: Prisma.ProductWhereInput = {};

    if (category) {
      where.category = category;
    }

    if (featured === "true") {
      where.featured = true;
    } else if (featured === "false") {
      where.featured = false;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: [{ featured: "desc" }, { name: "asc" }],
        take: limit,
        skip: offset,
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({ products, total, limit, offset });
  } catch (error) {
    console.error("[GET /api/products]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ─── POST /api/products — Create a product (admin only) ─────────────────────

export async function POST(request: NextRequest) {
  try {
    

    // TODO: Enforce admin role check when session carries role
    // if ((session.user as any).role !== "ADMIN") {
    //   return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    // }

    const body = await request.json();
    const parsed = createProductSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const { price, ...rest } = parsed.data;
    const product = await prisma.product.create({
      data: {
        ...rest,
        specs: rest.specs as Prisma.InputJsonValue,
        ...(price !== undefined && { price: new Prisma.Decimal(price) }),
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Unique constraint violation (e.g., duplicate slug)
      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "A product with this slug already exists." },
          { status: 409 },
        );
      }
    }

    console.error("[POST /api/products]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
