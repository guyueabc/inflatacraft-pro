import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

let tableReady = false;

async function tryCreateTable() {
  try {
    await prisma.$executeRawUnsafe(
      `CREATE TABLE IF NOT EXISTS partial_leads (
        id SERIAL PRIMARY KEY, email TEXT, phone TEXT, name TEXT,
        company TEXT, product_type TEXT, page TEXT DEFAULT '/',
        referrer TEXT DEFAULT '', utm_source TEXT, utm_medium TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )`
    );
    await prisma.$executeRawUnsafe(
      `CREATE INDEX IF NOT EXISTS idx_pl_created ON partial_leads (created_at)`
    );
    tableReady = true;
  } catch (e: any) {
    console.error("[PartialLead] table init error:", e.message);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.email && !body.phone) {
      return NextResponse.json({ saved: false, reason: "no identifiable data" });
    }

    // Dedup: skip if same email/phone within 24h
    if (body.email || body.phone) {
      const clauses: string[] = [];
      const params: string[] = [];
      let idx = 1;
      if (body.email) { clauses.push("email = $" + idx); params.push(body.email); idx++; }
      if (body.phone) { clauses.push("phone = $" + idx); params.push(body.phone); idx++; }
      const existing = await prisma.$queryRawUnsafe<Array<any>>(
        "SELECT id FROM partial_leads WHERE (" + clauses.join(" OR ") + ") AND created_at > NOW() - INTERVAL '24 hours' LIMIT 1",
        ...params
      );
      if (existing.length > 0) {
        return NextResponse.json({ saved: false, reason: "already recorded within 24h" });
      }
    }

    const insert = async () => {
      await prisma.$executeRawUnsafe(
        `INSERT INTO partial_leads (email,phone,name,company,product_type,page,referrer,utm_source,utm_medium,created_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,NOW())`,
        body.email || null, body.phone || null, body.name || null,
        body.company || null, body.productType || null,
        body.page || "/", body.referrer || "",
        body.utmSource || null, body.utmMedium || null
      );
    };

    if (!tableReady) {
      try { await insert(); tableReady = true; }
      catch { await tryCreateTable(); if (tableReady) await insert(); }
    } else {
      await insert();
    }

    return NextResponse.json({ saved: true });
  } catch (e: any) {
    console.error("[PartialLead POST]", e.message);
    return NextResponse.json({ error: "db error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(Number(searchParams.get("limit")) || 50, 200);
    const rows = await prisma.$queryRawUnsafe<Array<any>>(
      "SELECT * FROM partial_leads ORDER BY created_at DESC LIMIT $1", limit
    );
    return NextResponse.json({ partialLeads: rows, total: rows.length });
  } catch {
    return NextResponse.json({ partialLeads: [], total: 0 });
  }
}