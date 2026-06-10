import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

/**
 * POST /api/webhooks/stripe — Stripe webhook handler placeholder.
 *
 * Receives events from Stripe, verifies the signature, and processes
 * them (e.g., payment_intent.succeeded → mark order as PAID).
 *
 * ⚠️  The raw body is required for signature verification. Next.js App Router
 *     disables body parsing in this route so we can access the raw Buffer.
 */

export const dynamic = "force-dynamic";

// Disable body parsing — Stripe needs the raw body for signature verification
export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const sig = request.headers.get("stripe-signature") ?? "";

    // ── Placeholder — replace with real Stripe SDK ──
    //
    // import Stripe from "stripe";
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-06-15.acacia" as any });
    //
    // let event: Stripe.Event;
    // try {
    //   event = stripe.webhooks.constructEvent(
    //     rawBody,
    //     sig,
    //     process.env.STRIPE_WEBHOOK_SECRET!,
    //   );
    // } catch (err) {
    //   return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    // }

    // Placeholder event handling
    // const event = JSON.parse(rawBody); // Insecure — only for placeholder
    //
    // switch (event.type) {
    //   case "payment_intent.succeeded": {
    //     const paymentIntent = event.data.object;
    //     // Update order status to PAYMENT_CONFIRMED
    //     // Send confirmation email
    //     break;
    //   }
    //   case "payment_intent.payment_failed": {
    //     // Notify customer
    //     break;
    //   }
    //   default:
    //     console.log(`Unhandled event type: ${event.type}`);
    // }

    return NextResponse.json(
      {
        received: true,
        message: "Webhook placeholder — integrate Stripe SDK for production",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[POST /api/webhooks/stripe]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
