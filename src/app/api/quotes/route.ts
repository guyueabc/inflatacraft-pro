import { NextResponse } from "next/server";

/**
 * Quote records require a real customer/admin ownership model. The legacy
 * endpoint used one shared `public` user and could mix unrelated projects.
 * Public inquiries remain available through /api/submit-quote.
 */
export async function GET() {
  return NextResponse.json({ code: "QUOTE_ACCOUNT_API_DISABLED", error: "Quote accounts are not available." }, { status: 501 });
}

export async function POST() {
  return NextResponse.json({ code: "QUOTE_ACCOUNT_API_DISABLED", error: "Account quote creation is not available." }, { status: 501 });
}
