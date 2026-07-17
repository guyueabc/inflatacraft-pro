import { NextResponse } from "next/server";

/**
 * The account/order prototype has no customer authentication model. Keeping it
 * active with a shared `public` user would mix unrelated customer records.
 */
export async function GET() {
  return NextResponse.json({ code: "ORDER_API_DISABLED", error: "Order accounts are not available." }, { status: 501 });
}

export async function POST() {
  return NextResponse.json({ code: "ORDER_API_DISABLED", error: "Order creation is not available." }, { status: 501 });
}
