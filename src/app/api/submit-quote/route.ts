import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createHmac } from "crypto";

const MAX_SUBMISSIONS_PER_IP = 5;

const optionalText = z.string().max(5000).optional().default("");
const optionalShortText = z.string().trim().max(500).optional().default("");
const submitQuoteSchema = z.object({
  email: z.string().trim().email().max(320),
  phone: z.string().trim().max(100).optional().default(""),
  name: z.string().trim().max(200).optional().default(""),
  company: z.string().trim().max(300).optional().default(""),
  productType: z.string().trim().max(300).optional().default(""),
  description: optionalText,
  size: z.string().trim().max(200).optional().default(""),
  quantity: z.string().trim().max(50).optional().default(""),
  budgetRange: z.string().trim().max(100).optional().default(""),
  deadline: z.string().trim().max(100).optional().default(""),
  country: optionalShortText,
  intendedUse: optionalShortText,
  indoorOutdoor: optionalShortText,
  peopleInteract: optionalShortText,
  userAgeRange: optionalShortText,
  installationSurface: optionalShortText,
  voltagePlug: optionalShortText,
  artworkReady: optionalShortText,
  requiredDocuments: z.array(z.string().max(500)).max(50).optional().default([]),
  formType: z.enum(["quote", "contact", "newsletter"]).optional().default("quote"),
  website: z.string().optional().default(""),
  gclid: z.string().max(500).optional().default(""),
  utm_source: z.string().max(500).optional().default(""),
  utm_medium: z.string().max(500).optional().default(""),
  utm_campaign: z.string().max(500).optional().default(""),
});

type SubmitQuoteData = z.infer<typeof submitQuoteSchema>;

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "0.0.0.0"
  );
}

async function notifyDingTalk(data: SubmitQuoteData) {
  if (data.formType === "newsletter") return "skipped";

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
  if (data.productType) vals["Product"] = data.productType;
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

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const rawBody: unknown = await request.json().catch(() => null);
    if (
      typeof rawBody === "object" &&
      rawBody !== null &&
      "website" in rawBody &&
      typeof rawBody.website === "string" &&
      rawBody.website.length > 0
    ) {
      return NextResponse.json({ error: "Spam detected." }, { status: 400 });
    }
    const parsed = submitQuoteSchema.safeParse(rawBody);
    if (!parsed.success) {
      return NextResponse.json({ error: "Please provide a valid email and check the form fields." }, { status: 400 });
    }
    const body = parsed.data;
    if (body.formType !== "newsletter" && !body.phone) {
      return NextResponse.json({ error: "Please provide a valid email and check the form fields." }, { status: 400 });
    }
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentCount = await prisma.formSubmission.count({
      where: { ipAddress: ip, createdAt: { gte: twentyFourHoursAgo } },
    });
    if (recentCount >= MAX_SUBMISSIONS_PER_IP) {
      return NextResponse.json({ error: "Too many submissions." }, { status: 429 });
    }
    const submission = await prisma.formSubmission.create({
      data: {
        formType: body.formType,
        data: {
          email: body.email, phone: body.phone, name: body.name || "",
          company: body.company || "", productType: body.productType || "",
          description: body.description || "", size: body.size || "",
          quantity: body.quantity || "", budgetRange: body.budgetRange || "",
          deadline: body.deadline || "", country: body.country || "",
          intendedUse: body.intendedUse || "", indoorOutdoor: body.indoorOutdoor || "",
          peopleInteract: body.peopleInteract || "", userAgeRange: body.userAgeRange || "",
          installationSurface: body.installationSurface || "", voltagePlug: body.voltagePlug || "",
          artworkReady: body.artworkReady || "", requiredDocuments: body.requiredDocuments,
        },
        ipAddress: ip,
        gclid: body.gclid || "",
        utmSource: body.utm_source || "",
        utmMedium: body.utm_medium || "",
        utmCampaign: body.utm_campaign || "",
      },
    });
    const dingtalkResult = await notifyDingTalk(body);
    if (dingtalkResult !== "ok" && dingtalkResult !== "skipped") {
      console.error("[DingTalk notification unsuccessful]", dingtalkResult);
    }
    return NextResponse.json({ success: true, id: submission.id }, { status: 201 });
  } catch (error) {
    console.error('[POST /api/submit-quote]', error);
    return NextResponse.json({ error: 'Unable to submit right now. Please try again.' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(Math.max(Number(searchParams.get("limit")) || 50, 1), 200);
    const submissions = await prisma.formSubmission.findMany({
      where: { formType: { in: ["quote", "contact"] } },
      orderBy: { createdAt: "desc" },
      take: limit,
      select: { id: true, data: true, ipAddress: true, utmSource: true, utmMedium: true, utmCampaign: true, createdAt: true },
    });
    return NextResponse.json({ submissions, total: submissions.length });
  } catch (error) {
    console.error("[GET /api/submit-quote]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
