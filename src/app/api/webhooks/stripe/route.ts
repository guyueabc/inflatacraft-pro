import { NextResponse } from "next/server";

/**
 * Stripe event processing is disabled until signature verification, idempotent
 * event storage, and transactional order updates are implemented. Never return
 * 2xx for an event that has not been verified and processed: Stripe would stop
 * retrying and payment state could be lost.
 */
export async function POST() {
  return NextResponse.json(
    {
      received: false,
      code: "STRIPE_WEBHOOK_NOT_CONFIGURED",
      error: "Stripe webhook processing is not configured.",
    },
    { status: 501 }
  );
}
