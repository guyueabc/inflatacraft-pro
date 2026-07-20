import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";
import {
  buildQuoteReview,
  type IntendedUse,
  type IndoorOutdoor,
  type QuoteInput,
  type TargetDimensions,
} from "@/lib/ai/pricing-engine";
import { scoreLead, type LeadContactInput, type LeadSignals } from "@/lib/ai/lead-scoring";
import { PRODUCT_TYPES, type ProductType } from "@/config/pricing";
import { z } from "zod";

const MAX_SUBMISSIONS_PER_IP = 5;
const intendedUses: IntendedUse[] = [
  "one-time-event",
  "recurring-rental",
  "permanent-installation",
  "retail-display",
  "parade",
  "other",
];

const quoteRequestSchema = z.object({
  email: z.string().trim().email().max(320),
  phone: z.string().trim().min(1).max(100),
  name: z.string().trim().max(200).optional().default(""),
  company: z.string().trim().max(300).optional().default(""),
  country: z.string().trim().max(500).optional().default(""),
  productType: z.string().trim().max(300).optional().default(""),
  intendedUse: z.string().trim().max(500).optional().default(""),
  indoorOutdoor: z.string().trim().max(100).optional().default(""),
  peopleInteract: z.string().trim().max(100).optional().default(""),
  userAgeRange: z.string().trim().max(500).optional().default(""),
  installationSurface: z.string().trim().max(500).optional().default(""),
  voltagePlug: z.string().trim().max(500).optional().default(""),
  artworkReady: z.string().trim().max(500).optional().default(""),
  description: z.string().max(5000).optional().default(""),
  message: z.string().max(5000).optional().default(""),
  size: z.string().trim().max(200).optional().default(""),
  quantity: z.string().trim().regex(/^[1-9]\d*$/).max(9).optional().default("1"),
  budgetRange: z.string().trim().max(100).optional().default(""),
  deadline: z.string().trim().max(100).optional().default(""),
  requiredDocuments: z.array(z.string().max(500)).max(50).optional().default([]),
  website: z.string().max(500).optional().default(""),
  gclid: z.string().max(500).optional().default(""),
  utm_source: z.string().max(500).optional().default(""),
  utm_medium: z.string().max(500).optional().default(""),
  utm_campaign: z.string().max(500).optional().default(""),
});

function normalizeEnumValue(value: unknown): string {
  return typeof value === "string"
    ? value.trim().toLowerCase().replace(/\s*\/\s*/g, "-").replace(/\s+/g, "-")
    : "";
}

function parseProductType(value: unknown): ProductType {
  const normalized = normalizeEnumValue(value);
  return PRODUCT_TYPES.includes(normalized as ProductType) ? normalized as ProductType : "other";
}

function parseIntendedUse(value: unknown): IntendedUse {
  const normalized = normalizeEnumValue(value);
  return intendedUses.includes(normalized as IntendedUse) ? normalized as IntendedUse : "other";
}

function parseIndoorOutdoor(value: unknown): IndoorOutdoor {
  const normalized = normalizeEnumValue(value);
  return normalized === "indoor" || normalized === "outdoor" || normalized === "both"
    ? normalized
    : "both";
}

function parseDimensions(value: unknown): TargetDimensions {
  if (typeof value !== "string") return {};
  const dimensions = value.match(/\d+(?:\.\d+)?/g)?.map(Number) ?? [];
  return { heightFt: dimensions[0], widthFt: dimensions[1], depthFt: dimensions[2] };
}

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "0.0.0.0"
  );
}

// ── DingTalk Notification ─────────────────────────────────────────────────

async function notifyDingTalk(data: Record<string, unknown>) {
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
  const textValue = (value: unknown, fallback = ""): string =>
    typeof value === "string" || typeof value === "number" ? String(value) : fallback;
  vals["Email"] = textValue(data.email, "-");
  vals["Phone"] = textValue(data.phone, "-");
  if (data.name) vals["Name"] = textValue(data.name);
  if (data.company) vals["Company"] = textValue(data.company);
  if (data.country) vals["Country"] = textValue(data.country);
  if (data.productType) vals["Product"] = textValue(data.productType);
  if (data.intendedUse) vals["Use"] = textValue(data.intendedUse);
  if (data.indoorOutdoor) vals["In/Out"] = textValue(data.indoorOutdoor);
  if (data.size) vals["Size"] = textValue(data.size);
  if (data.quantity) vals["Qty"] = textValue(data.quantity);
  if (data.budgetRange) vals["Budget"] = textValue(data.budgetRange);
  if (data.deadline) vals["Deadline"] = textValue(data.deadline);
  if (data.description) vals["Desc"] = textValue(data.description);
  const utm = [data.utm_source, data.utm_medium, data.utm_campaign]
    .map((value) => textValue(value))
    .filter(Boolean)
    .join(" / ");
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
      signal: AbortSignal.timeout(8000),
    });
    const resBody = await res.text();
    console.log("[DingTalk] SENT", res.status, resBody.substring(0, 200));
    return res.ok ? "ok" : `http_${res.status}`;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[DingTalk] FETCH_ERR", message);
    return "error:" + message;
  }
}

// ── POST Handler ──────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  let dbSubmissionId: string | null = null;

  try {
    const ip = getClientIp(request);
    const rawBody: unknown = await request.json().catch(() => null);
    const parsed = quoteRequestSchema.safeParse(rawBody);
    if (!parsed.success) {
      return NextResponse.json({
        success: false,
        error: "Please provide a valid email and WhatsApp number.",
      }, { status: 400 });
    }
    const body = parsed.data;
    const description = body.description || body.message;

    // Honeypot check
    if (body.website) {
      return NextResponse.json({ message: "Spam detected." }, { status: 400 });
    }

    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentCount = await prisma.formSubmission.count({
      where: {
        ipAddress: ip,
        createdAt: { gte: twentyFourHoursAgo },
      },
    });
    if (recentCount >= MAX_SUBMISSIONS_PER_IP) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again tomorrow." },
        { status: 429 },
      );
    }

    // Generate an internal planning aid (pure calculation, no external dependency).
    // Values are stored with the lead for staff review; they are not returned to
    // the public form because project details require written confirmation.
    const quoteInput: QuoteInput = {
      productType: parseProductType(body.productType),
      intendedUse: parseIntendedUse(body.intendedUse),
      indoorOutdoor: parseIndoorOutdoor(body.indoorOutdoor),
      targetDimensions: parseDimensions(body.size),
      quantity: body.quantity ? parseInt(body.quantity) : 1,
      country: body.country || "",
      peopleInteract: typeof body.peopleInteract === "string" && body.peopleInteract.startsWith("Yes"),
      voltagePlug: body.voltagePlug || "",
      artworkReady: typeof body.artworkReady === "string" && body.artworkReady.startsWith("Yes"),
      requiredDocuments: body.requiredDocuments || [],
    };

    const quoteReview = buildQuoteReview(quoteInput);

    // Generate lead score
    const leadContact: LeadContactInput = {
      name: body.name,
      email: body.email,
      phone: body.phone,
      company: body.company,
      productType: body.productType,
      quantity: Number.parseInt(body.quantity, 10) || 1,
      deadline: body.deadline,
      budget: body.budgetRange,
      message: description,
      whatsapp: body.phone,
    };
    const leadSignals: LeadSignals = {
      quoteSubmitted: true,
      quoteViewed: false,
      productPagesViewed: 0,
      safetyPageViewed: false,
      downloadsClicked: false,
      repeatVisits: 0,
      hasDeadline: Boolean(body.deadline),
      hasArtwork: Boolean(body.artworkReady?.includes("Yes")),
      hasBudget: Boolean(body.budgetRange),
      whatsappProvided: Boolean(body.phone),
      messageLength: description.length,
    };
    const leadScore = scoreLead(leadContact, leadSignals);

    const quoteReviewJson = {
      ...quoteReview,
      productConfiguration: quoteReview.productConfiguration.map((item) => ({ ...item })),
    } satisfies Prisma.InputJsonObject;
    const leadScoreJson = { ...leadScore } satisfies Prisma.InputJsonObject;

    // Extract UTM params
    const utmSource = body.utm_source || "";
    const utmMedium = body.utm_medium || "";
    const utmCampaign = body.utm_campaign || "";

    // The submission is only successful after durable persistence.
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
            userAgeRange: body.userAgeRange || "",
            installationSurface: body.installationSurface || "",
            voltagePlug: body.voltagePlug || "",
            artworkReady: body.artworkReady || "",
            description,
            size: body.size || "",
            quantity: body.quantity || "",
            budgetRange: body.budgetRange || "",
            deadline: body.deadline || "",
            requiredDocuments: body.requiredDocuments,
            estimate: quoteReviewJson,
            leadScore: leadScoreJson,
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
      console.error("[DB save failed]", dbErr);
      return NextResponse.json({
        success: false,
        error: "Unable to submit your quote right now. Please try again.",
      }, { status: 503 });
    }

    // Persistence is the success condition; notification is best-effort.
    const dingtalkResult = await notifyDingTalk(body);
    if (dingtalkResult !== "ok") {
      console.error("[DingTalk notification unsuccessful]", dingtalkResult);
    }

    return NextResponse.json({
      success: true,
      quoteId: dbSubmissionId,
      nextUrl: `/quote/pending?id=${dbSubmissionId}`,
    }, { status: 201 });

  } catch (error) {
    console.error("[POST /api/quote]", error);
    return NextResponse.json({
      success: false,
      error: "Unable to submit your quote right now. Please try again.",
    }, { status: 500 });
  }
}
