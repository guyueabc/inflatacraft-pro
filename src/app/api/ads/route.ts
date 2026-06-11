import { NextResponse } from "next/server";

/**
 * GET /api/ads
 * 返回 ads.txt 内容 (广告平台验证)
 * Vercel rewrites: /ads.txt → /api/ads
 */
export async function GET() {
  const adsTxt = [
    "# InflataCraft Pro — Ads.txt",
    "# Google Ads",
    "google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0",
    "# Add your verified seller IDs here",
  ].join("\n");

  return new NextResponse(adsTxt, {
    headers: { "Content-Type": "text/plain" },
  });
}
