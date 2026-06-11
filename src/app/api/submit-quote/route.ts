import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/submit-quote
 * 公开接口 — 无需登录，接收访客报价请求
 * 仅邮箱+电话必填，其余选填
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 提取 UTM 参数（从 sessionStorage 或 URL）
    const utmSource = body.utm_source || "";
    const utmMedium = body.utm_medium || "";
    const utmCampaign = body.utm_campaign || "";

    // 校验必填项
    if (!body.email || !body.phone) {
      return NextResponse.json({ error: "Email and phone are required" }, { status: 400 });
    }

    // 存入 form_submissions 表
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
        utmSource,
        utmMedium,
        utmCampaign,
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
 * 查看最近的提交（简单后台查看）
 * 生产环境应加密码保护
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
