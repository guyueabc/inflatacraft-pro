import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/** 每 IP 每 24 小时最大提交次数 */
const MAX_SUBMISSIONS_PER_IP = 5;

function getClientIp(request: NextRequest): string {
  // Vercel 代理会设置 x-forwarded-for / x-real-ip
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "0.0.0.0"
  );
}

/**
 * POST /api/submit-quote
 * 公开接口 — 无需登录，接收访客报价请求
 * 防滥用：每 IP 每 24 小时最多 5 次提交
 */
export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const body = await request.json();

    // 校验必填项
    if (!body.email || !body.phone) {
      return NextResponse.json({ error: "Email and phone are required" }, { status: 400 });
    }

    // 检查 24 小时内提交次数
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

    // 存入 form_submissions
    const submission = await prisma.formSubmission.create({
      data: {
        formType: "quote",
        data: {
          email: body.email,
          phone: body.phone,
          name: body.name || "",
          company: body.company || "",
          productType: body.productType || "",
          description: body.description || "",
          size: body.size || "",
          quantity: body.quantity || "",
          budgetRange: body.budgetRange || "",
          deadline: body.deadline || "",
        },
        ipAddress: ip,
        gclid: body.gclid || "",
        utmSource: body.utm_source || "",
        utmMedium: body.utm_medium || "",
        utmCampaign: body.utm_campaign || "",
      },
    });

    return NextResponse.json({ success: true, id: submission.id }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/submit-quote]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * GET /api/submit-quote
 * 查看最近的提交
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(Math.max(Number(searchParams.get("limit")) || 50, 1), 200);

    const submissions = await prisma.formSubmission.findMany({
      where: { formType: "quote" },
      orderBy: { createdAt: "desc" },
      take: limit,
      select: {
        id: true,
        data: true,
        ipAddress: true,
        utmSource: true,
        utmMedium: true,
        utmCampaign: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ submissions, total: submissions.length });
  } catch (error) {
    console.error("[GET /api/submit-quote]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
