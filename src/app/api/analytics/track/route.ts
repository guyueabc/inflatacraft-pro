import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/analytics/track
 * 轻量级追踪端点 — 记录 PV + UTM 参数
 * 前端在页面加载时发送 1px 信标
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const data = {
    page: searchParams.get("p") || "/",
    referrer: searchParams.get("r") || "",
    utm_source: searchParams.get("utm_source") || "",
    utm_medium: searchParams.get("utm_medium") || "",
    utm_campaign: searchParams.get("utm_campaign") || "",
    utm_term: searchParams.get("utm_term") || "",
    utm_content: searchParams.get("utm_content") || "",
    timestamp: new Date().toISOString(),
  };

  // 异步写入数据库 (不阻塞响应)
  try {
    const { prisma } = await import("@/lib/prisma");
    await prisma.$executeRawUnsafe(
      `INSERT INTO "page_views" ("page", "referrer", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "created_at")
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())`,
      data.page, data.referrer, data.utm_source, data.utm_medium,
      data.utm_campaign, data.utm_term, data.utm_content
    );
  } catch {
    // 静默失败 — 追踪不应影响用户体验
  }

  // 返回 1px 透明 GIF
  return new NextResponse(
    Buffer.from("R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", "base64"),
    {
      headers: {
        "Content-Type": "image/gif",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    }
  );
}
