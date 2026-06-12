import { NextResponse } from "next/server";

/**
 * GET /api/ads — ads.txt
 * Google Ads 发布者验证 + 广告平台授权
 * 访问地址: https://inflatablemodel.com.cn/ads.txt
 */
export async function GET() {
  const adsTxt = [
    "# inflatablemodel.com.cn — ads.txt",
    "# ====================================================",
    "# Google Ads — 将 PUB_ID 替换为你的 Google 发布商 ID",
    "# 获取地址: Google Ads → 工具 → 发布商 ID",
    "google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0",
    "",
    "# 认证卖家 (如果开通了 Google 认证卖家)",
    "# google.com, pub-0000000000000000, RESELLER, f08c47fec0942fa0",
    "",
    "# ====================================================",
    "# 操作步骤:",
    "# 1. 打开 Google Ads 后台 → 工具与设置 → 规划 → 发布商 ID",
    "# 2. 复制你的 pub-xxxxxxxx 替换上方 000000000",
    "# 3. 等待 Google 验证 (24-48 小时)",
  ].join("\n");

  return new NextResponse(adsTxt, {
    headers: { "Content-Type": "text/plain" },
  });
}
