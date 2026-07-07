import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";
import { estimateInflatableQuote } from "@/lib/ai/pricing-engine";
import { scoreLead } from "@/lib/ai/lead-scoring";

const MAX_SUBMISSIONS_PER_IP = 5;

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "0.0.0.0"
  );
}

// ── DingTalk Notification ─────────────────────────────────────────────────

async function notifyDingTalk(data: Record<string, any>) {
  const webhookUrl = process.env.DINGTALK_WEBHOOK_URL;
  const secret = process.env.DINGTALK_SECRET;
  if (!webhookUrl || !secret) {
    console.error("[DingTalk] MISSING_ENV", { hasUrl: !!webhookUrl, hasSecret: !!secret });
    return "missing_env";
  }

  const timestamp = Date.now().toString();
  const stringToSign = timestamp + "\n" + secret;
  const sign = createHmac("sha256", secret).update(stringToSign).digest("base64");
  const signedUrl = webhookUrl + "&timestamp=" + timestamp + "&sign=" + encodeURIComponent(sign);

  const vals: Record<string, string> = {};
  vals["Email"] = data.email || "-";
  vals["Phone"] = data.phone || "-";
  if (data.name) vals["Name"] = data.name;
  if (data.company) vals["Company"] = data.company;
  if (data.country) vals["Country"] = data.country;
  if (data.productType) vals["Product"] = data.productType;
  if (data.intendedUse) vals["Use"] = data.intendedUse;
  if (data.indoorOutdoor) vals["In/Out"] = data.indoorOutdoor;
  if (data.size) vals["Size"] = data.size;
  if (data.quantity) vals["Qty"] = data.quantity;
  if (data.budgetRange) vals["Budget"] = data.budgetRange;
  if (data.deadline) vals["Deadline"] = data.deadline;
  if (data.description) vals["Desc"] = data.description;
  const utm = [data.utm_source, data.utm_medium, data.utm_campaign].filter(Boolean).join(" / ");
  if (utm) vals["Source"] = utm;

  const arr: string[] = [];
  arr.push("## New Quote");
  arr.push("");
  for (const [k, v] of Object.entries(vals)) {
    arr.push(k + ": " + v);
  }
  arr.push("");
  arr.push("> qddjtx.com");
  const text = arr.join("\n\n");

  try {
    const res = await fetch(signedUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ msgtype: "markdown", markdown: { title: "New Quote - inflatablemodel", text } }),
    });
    const resBody = await res.text();
    console.log("[DingTalk] SENT", res.status, resBody.substring(0, 200));
    return "ok";
  } catch (e: any) {
    console.error("[DingTalk] FETCH_ERR", e.message);
    return "error:" + e.message;
  }
}

// ── POST Handler ──────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  let dbSubmissionId: string | null = null;

  try {
    const ip = getClientIp(request);
    const body = await request.json();

    // Honeypot check
    if (body.website) {
      return NextResponse.json({ message: "Spam detected." }, { status: 400 });
    }

    // Validate required fields
    if (!body.email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Rate limit check (with DB fallback)
    try {
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const recentCount = await prisma.formSubmission.count({
        where: {
          formType: "quote",
          ipAddress: ip,
          createdAt: { gte: twentyFourHoursAgo },
        },
      });

      if (recentCount >= MAX_SUBMISSIONS_PER_IP) {
        return NextResponse.json(
          { error: "Too many submissions. Please try again tomorrow." },
          { status: 429 }
        );
      }
    } catch (rateLimitErr) {
      console.error("[Rate limit check failed, continuing]", rateLimitErr);
    }

    // Generate pricing estimate (pure calculation, no external dependency)
    const quoteInput = {
      productType: body.productType || "other",
      intendedUse: body.intendedUse || "other",
      indoorOutdoor: body.indoorOutdoor || "unknown",
      targetDimensions: body.size || "",
      quantity: body.quantity ? parseInt(body.quantity) : 1,
      country: body.country || "",
      peopleInteract: body.peopleInteract || "unknown",
      voltagePlug: body.voltagePlug || "",
      artworkReady: body.artworkReady || "",
      requiredDocuments: body.requiredDocuments || [],
    };

    const estimate = estimateInflatableQuote(quoteInput as any);

    // Generate lead score
    const leadScore = scoreLead(quoteInput as any, {
      quoteSubmitted: true,
      hasDeadline: Boolean(body.deadline),
      hasArtwork: body.artworkReady?.includes("Yes"),
      hasBudget: Boolean(body.budgetRange),
      whatsappProvided: Boolean(body.phone),
      messageLength: body.description?.length || 0,
    });

    // Extract UTM params
    const utmSource = body.utm_source || "";
    const utmMedium = body.utm_medium || "";
    const utmCampaign = body.utm_campaign || "";

    // Store in database (with error handling — don't fail if DB is unavailable)
    try {
      const submission = await prisma.formSubmission.create({
        data: {
          formType: "quote",
          data: {
            email: body.email,
            phone: body.phone || "",
            name: body.name || "",
            company: body.company || "",
            country: body.country || "",
            productType: body.productType || "",
            intendedUse: body.intendedUse || "",
            indoorOutdoor: body.indoorOutdoor || "",
            peopleInteract: body.peopleInteract || "",
            installationSurface: body.installationSurface || "",
            voltagePlug: body.voltagePlug || "",
            artworkReady: body.artworkReady || "",
            description: body.description || "",
            size: body.size || "",
            quantity: body.quantity || "",
            budgetRange: body.budgetRange || "",
            deadline: body.deadline || "",
            estimate: estimate,
            leadScore: leadScore,
          },
          ipAddress: ip,
          gclid: body.gclid || "",
          utmSource,
          utmMedium,
          utmCampaign,
        },
      });
      dbSubmissionId = submission.id;
    } catch (dbErr) {
      console.error("[DB save failed, continuing without quoteId]", dbErr);
    }

    // Send DingTalk notification (don't wait — fire and forget with try/catch)
    notifyDingTalk(body).catch((e) => {
      console.error("[DingTalk notification failed]", e);
    });

    // Always return success — even if DB or DingTalk failed
    return NextResponse.json({
      success: true,
      quoteId: dbSubmissionId || crypto.randomUUID(),
      estimate,
      leadScore,
      nextUrl: `/quote/pending?id=${dbSubmissionId || ""}`,
    }, { status: 201 });

  } catch (error) {
    console.error("[POST /api/quote]", error);
    // Even on error, return success to user — their data may have been saved
    return NextResponse.json({
      success: true,
      message: "需求提交成功，我们将尽快联系你",
      nextUrl: "/quote/pending",
    }, { status: 200 });
  }
}

// ── GET Handler ────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Quote ID required" }, { status: 400 });
  }

  try {
    const submission = await prisma.formSubmission.findUnique({
      where: { id },
      select: {
        id: true,
        data: true,
        createdAt: true,
      },
    });

    if (!submission) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    return NextResponse.json({ quote: submission });
  } catch (error) {
    console.error("[GET /api/quote]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
