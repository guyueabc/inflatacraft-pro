import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";

const MAX_SUBMISSIONS_PER_IP = 5;

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "0.0.0.0"
  );
}

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
  arr.push("> inflatablemodel.com.cn");
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

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const body = await request.json();
    if (!body.email || !body.phone) {
      return NextResponse.json({ error: "Email and phone are required" }, { status: 400 });
    }
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentCount = await prisma.formSubmission.count({
      where: { formType: "quote", ipAddress: ip, createdAt: { gte: twentyFourHoursAgo } },
    });
    if (recentCount >= MAX_SUBMISSIONS_PER_IP) {
      return NextResponse.json({ error: "Too many submissions." }, { status: 429 });
    }
    const submission = await prisma.formSubmission.create({
      data: {
        formType: "quote",
        data: {
          email: body.email, phone: body.phone, name: body.name || "",
          company: body.company || "", productType: body.productType || "",
          description: body.description || "", size: body.size || "",
          quantity: body.quantity || "", budgetRange: body.budgetRange || "",
          deadline: body.deadline || "",
        },
        ipAddress: ip,
        gclid: body.gclid || "",
        utmSource: body.utm_source || "",
        utmMedium: body.utm_medium || "",
        utmCampaign: body.utm_campaign || "",
      },
    });
    const dingtalkResult = await notifyDingTalk(body);
    return NextResponse.json({ success: true, id: submission.id, dingtalk: dingtalkResult }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/submit-quote]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(Math.max(Number(searchParams.get("limit")) || 50, 1), 200);
    const submissions = await prisma.formSubmission.findMany({
      where: { formType: "quote" },
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
