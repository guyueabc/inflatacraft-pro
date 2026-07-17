import { NextResponse } from "next/server";

/**
 * GET /api/ads — ads.txt
 * Google Ads 发布者验证 + 广告平台授权
 * 访问地址: https://qddjtx.com/ads.txt
 */
export async function GET() {
  const adsTxt = [
    "# qddjtx.com — ads.txt",
    "# No authorized advertising sellers are published until a verified publisher ID is configured.",
  ].join("\n");

  return new NextResponse(adsTxt, {
    headers: { "Content-Type": "text/plain" },
  });
}
