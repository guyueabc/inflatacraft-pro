import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createHash } from "crypto";

let logTableReady = false;
let advancedColumnsReady = false;

// ============================================
// 配置：需要排除的流量
// ============================================
const OWNER_IPS = [
  "43.255.191.13",    // 你的IP
  "127.0.0.1",
  "::1",
];

const TEST_IP_PATTERNS = [
  /^10\./,
  /^192\.168\./,
  /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
  /^169\.254\./,
];

const TEST_EMAIL_DOMAINS = [
  "test.com",
  "example.com",
  "test.org",
  "sample.com",
  "localhost",
];

// 中国IP段（精简版）
const CHINA_IP_RANGES = [
  /^1\.(0|1|2|4|5|6|8|9|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9]|10[0-9]|11[0-9]|12[0-7])\./,
  /^14\./, /^27\./, /^36\./, /^39\./, /^42\./, /^49\./,
  /^58\./, /^59\./, /^60\./, /^61\./,
  /^10[6-9]\./, /^11[0-9]\./, /^12[0-6]\./,
  /^171\./, /^175\./, /^180\./, /^182\./, /^183\./,
  /^202\./, /^210\./, /^211\./,
  /^21[8-9]\./, /^22[0-3]\./,
];

// ============================================
// 数据库初始化
// ============================================
async function ensureVisitorLogTable() {
  if (logTableReady) return;
  try {
    await prisma.$executeRawUnsafe(
      `CREATE TABLE IF NOT EXISTS visitor_logs (
        id SERIAL PRIMARY KEY,
        visitor_id TEXT NOT NULL,
        ip_address TEXT,
        is_owner BOOLEAN DEFAULT FALSE,
        is_test BOOLEAN DEFAULT FALSE,
        traffic_type TEXT DEFAULT 'direct',
        created_at TIMESTAMPTZ DEFAULT NOW()
      )`
    );
    await prisma.$executeRawUnsafe(
      `CREATE INDEX IF NOT EXISTS idx_vl_vid_date ON visitor_logs (visitor_id, created_at)`
    );
    await prisma.$executeRawUnsafe(
      `CREATE INDEX IF NOT EXISTS idx_vl_traffic ON visitor_logs (traffic_type, created_at)`
    );
    logTableReady = true;
  } catch (e: any) {
    console.error("[VisitorLog] table error:", e.message);
  }
}

async function ensureAdvancedColumns() {
  if (advancedColumnsReady) return;
  try {
    // 添加基础字段
    await prisma.$executeRawUnsafe(`ALTER TABLE page_views ADD COLUMN IF NOT EXISTS ip_address TEXT`);
    await prisma.$executeRawUnsafe(`ALTER TABLE page_views ADD COLUMN IF NOT EXISTS country TEXT`);
    
    // 添加高级字段
    await prisma.$executeRawUnsafe(`ALTER TABLE page_views ADD COLUMN IF NOT EXISTS session_id TEXT`);
    await prisma.$executeRawUnsafe(`ALTER TABLE page_views ADD COLUMN IF NOT EXISTS traffic_type TEXT DEFAULT 'direct'`);
    await prisma.$executeRawUnsafe(`ALTER TABLE page_views ADD COLUMN IF NOT EXISTS is_owner BOOLEAN DEFAULT FALSE`);
    await prisma.$executeRawUnsafe(`ALTER TABLE page_views ADD COLUMN IF NOT EXISTS is_test BOOLEAN DEFAULT FALSE`);
    await prisma.$executeRawUnsafe(`ALTER TABLE page_views ADD COLUMN IF NOT EXISTS referrer_domain TEXT`);
    await prisma.$executeRawUnsafe(`ALTER TABLE page_views ADD COLUMN IF NOT EXISTS device_type TEXT`);
    await prisma.$executeRawUnsafe(`ALTER TABLE page_views ADD COLUMN IF NOT EXISTS browser TEXT`);
    await prisma.$executeRawUnsafe(`ALTER TABLE page_views ADD COLUMN IF NOT EXISTS os TEXT`);
    
    // 创建索引
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS idx_pv_traffic ON page_views (traffic_type, created_at)`);
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS idx_pv_session ON page_views (session_id, created_at)`);
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS idx_pv_owner_test ON page_views (is_owner, is_test, created_at)`);
    
    advancedColumnsReady = true;
  } catch (e: any) {
    console.error("[AdvancedColumns] error:", e.message);
  }
}

// ============================================
// 流量分类函数
// ============================================
function getClientIp(request: NextRequest): string {
  return (request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
          request.headers.get("x-real-ip") || "0.0.0.0");
}

function isChinaIp(ip: string): boolean {
  if (!ip || ip === "0.0.0.0") return false;
  return CHINA_IP_RANGES.some(range => range.test(ip));
}

function getCountryFromIp(ip: string): string {
  if (!ip || ip === "0.0.0.0") return "unknown";
  if (TEST_IP_PATTERNS.some(p => p.test(ip))) return "local";
  if (isChinaIp(ip)) return "CN";
  return "US"; // 默认美国（目标市场）
}

function isOwnerIp(ip: string): boolean {
  return OWNER_IPS.includes(ip);
}

function isTestIp(ip: string): boolean {
  return TEST_IP_PATTERNS.some(p => p.test(ip));
}

function getTrafficType(utmSource: string | null, utmMedium: string | null, gclid: string): string {
  // Google Ads 点击
  if (gclid || (utmSource === "google" && utmMedium === "cpc")) return "ads";
  // 其他广告平台
  if (["facebook", "linkedin", "twitter", "bing", "tiktok"].includes(utmSource || "") && utmMedium === "cpc") return "ads";
  // 自然搜索
  if (["google", "bing", "yahoo", "baidu", "duckduckgo"].includes(utmSource || "") && utmMedium === "organic") return "organic";
  // 社交媒体自然流量
  if (["facebook", "linkedin", "twitter", "instagram", "youtube"].includes(utmSource || "") && !utmMedium?.includes("cpc")) return "social";
  // 引荐流量
  if (utmSource && !utmMedium?.includes("cpc")) return "referral";
  // 直接访问
  return "direct";
}

function parseUserAgent(ua: string): { device: string; browser: string; os: string } {
  const device = /Mobile|Android|iPhone|iPad/i.test(ua) ? "mobile" : "desktop";
  
  let browser = "unknown";
  if (ua.includes("Chrome") && !ua.includes("Edg")) browser = "Chrome";
  else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";
  else if (ua.includes("Firefox")) browser = "Firefox";
  else if (ua.includes("Edg")) browser = "Edge";
  else if (ua.includes("MSIE") || ua.includes("Trident")) browser = "IE";
  
  let os = "unknown";
  if (ua.includes("Windows")) os = "Windows";
  else if (ua.includes("Mac OS")) os = "macOS";
  else if (ua.includes("Linux")) os = "Linux";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";
  
  return { device, browser, os };
}

function extractReferrerDomain(referrer: string): string {
  if (!referrer) return "";
  try {
    const url = new URL(referrer);
    return url.hostname;
  } catch {
    return referrer.substring(0, 100);
  }
}

function hashVisitor(ip: string, ua: string, date: string): string {
  return createHash("sha256").update(ip + "|" + ua + "|" + date).digest("hex").slice(0, 16);
}

function generateSessionId(ip: string, ua: string): string {
  const today = new Date().toISOString().slice(0, 10);
  return createHash("sha256").update(ip + "|" + ua + "|" + today).digest("hex").slice(0, 24);
}

// ============================================
// 统计查询函数
// ============================================
async function getTrafficStats(todayStart: Date, weekStart: Date, monthStart: Date) {
  // 今日详细统计（排除owner和test）
  const [
    todayAdsPV, todayOrganicPV, todaySocialPV, todayReferralPV, todayDirectPV,
    todayAdsUV, todayOrganicUV, todaySocialUV, todayReferralUV, todayDirectUV,
    todayTotalPV, todayTotalUV,
    todayAdsSessions, todayOrganicSessions, todayTotalSessions,
  ] = await Promise.all([
    // PV by traffic type (excluding owner and test)
    prisma.$queryRawUnsafe<Array<{ count: bigint }>>(
      `SELECT COUNT(*)::int as count FROM page_views 
       WHERE created_at >= $1 AND is_owner = FALSE AND is_test = FALSE AND traffic_type = 'ads'`,
      todayStart
    ),
    prisma.$queryRawUnsafe<Array<{ count: bigint }>>(
      `SELECT COUNT(*)::int as count FROM page_views 
       WHERE created_at >= $1 AND is_owner = FALSE AND is_test = FALSE AND traffic_type = 'organic'`,
      todayStart
    ),
    prisma.$queryRawUnsafe<Array<{ count: bigint }>>(
      `SELECT COUNT(*)::int as count FROM page_views 
       WHERE created_at >= $1 AND is_owner = FALSE AND is_test = FALSE AND traffic_type = 'social'`,
      todayStart
    ),
    prisma.$queryRawUnsafe<Array<{ count: bigint }>>(
      `SELECT COUNT(*)::int as count FROM page_views 
       WHERE created_at >= $1 AND is_owner = FALSE AND is_test = FALSE AND traffic_type = 'referral'`,
      todayStart
    ),
    prisma.$queryRawUnsafe<Array<{ count: bigint }>>(
      `SELECT COUNT(*)::int as count FROM page_views 
       WHERE created_at >= $1 AND is_owner = FALSE AND is_test = FALSE AND traffic_type = 'direct'`,
      todayStart
    ),
    // UV by traffic type
    prisma.$queryRawUnsafe<Array<{ count: bigint }>>(
      `SELECT COUNT(DISTINCT session_id)::int as count FROM page_views 
       WHERE created_at >= $1 AND is_owner = FALSE AND is_test = FALSE AND traffic_type = 'ads' AND session_id IS NOT NULL`,
      todayStart
    ),
    prisma.$queryRawUnsafe<Array<{ count: bigint }>>(
      `SELECT COUNT(DISTINCT session_id)::int as count FROM page_views 
       WHERE created_at >= $1 AND is_owner = FALSE AND is_test = FALSE AND traffic_type = 'organic' AND session_id IS NOT NULL`,
      todayStart
    ),
    prisma.$queryRawUnsafe<Array<{ count: bigint }>>(
      `SELECT COUNT(DISTINCT session_id)::int as count FROM page_views 
       WHERE created_at >= $1 AND is_owner = FALSE AND is_test = FALSE AND traffic_type = 'social' AND session_id IS NOT NULL`,
      todayStart
    ),
    prisma.$queryRawUnsafe<Array<{ count: bigint }>>(
      `SELECT COUNT(DISTINCT session_id)::int as count FROM page_views 
       WHERE created_at >= $1 AND is_owner = FALSE AND is_test = FALSE AND traffic_type = 'referral' AND session_id IS NOT NULL`,
      todayStart
    ),
    prisma.$queryRawUnsafe<Array<{ count: bigint }>>(
      `SELECT COUNT(DISTINCT session_id)::int as count FROM page_views 
       WHERE created_at >= $1 AND is_owner = FALSE AND is_test = FALSE AND traffic_type = 'direct' AND session_id IS NOT NULL`,
      todayStart
    ),
    // Total
    prisma.$queryRawUnsafe<Array<{ count: bigint }>>(
      `SELECT COUNT(*)::int as count FROM page_views 
       WHERE created_at >= $1 AND is_owner = FALSE AND is_test = FALSE`,
      todayStart
    ),
    prisma.$queryRawUnsafe<Array<{ count: bigint }>>(
      `SELECT COUNT(DISTINCT session_id)::int as count FROM page_views 
       WHERE created_at >= $1 AND is_owner = FALSE AND is_test = FALSE AND session_id IS NOT NULL`,
      todayStart
    ),
    // Sessions (for accurate visitor count)
    prisma.$queryRawUnsafe<Array<{ count: bigint }>>(
      `SELECT COUNT(DISTINCT session_id)::int as count FROM page_views 
       WHERE created_at >= $1 AND is_owner = FALSE AND is_test = FALSE AND traffic_type = 'ads'`,
      todayStart
    ),
    prisma.$queryRawUnsafe<Array<{ count: bigint }>>(
      `SELECT COUNT(DISTINCT session_id)::int as count FROM page_views 
       WHERE created_at >= $1 AND is_owner = FALSE AND is_test = FALSE AND traffic_type IN ('organic', 'social', 'referral', 'direct')`,
      todayStart
    ),
    prisma.$queryRawUnsafe<Array<{ count: bigint }>>(
      `SELECT COUNT(DISTINCT session_id)::int as count FROM page_views 
       WHERE created_at >= $1 AND is_owner = FALSE AND is_test = FALSE`,
      todayStart
    ),
  ]);

  return {
    today: {
      adsPV: Number(todayAdsPV[0]?.count ?? 0),
      organicPV: Number(todayOrganicPV[0]?.count ?? 0),
      socialPV: Number(todaySocialPV[0]?.count ?? 0),
      referralPV: Number(todayReferralPV[0]?.count ?? 0),
      directPV: Number(todayDirectPV[0]?.count ?? 0),
      adsUV: Number(todayAdsUV[0]?.count ?? 0),
      organicUV: Number(todayOrganicUV[0]?.count ?? 0),
      socialUV: Number(todaySocialUV[0]?.count ?? 0),
      referralUV: Number(todayReferralUV[0]?.count ?? 0),
      directUV: Number(todayDirectUV[0]?.count ?? 0),
      totalPV: Number(todayTotalPV[0]?.count ?? 0),
      totalUV: Number(todayTotalUV[0]?.count ?? 0),
      adsVisitors: Number(todayAdsSessions[0]?.count ?? 0),
      organicVisitors: Number(todayOrganicSessions[0]?.count ?? 0),
      totalVisitors: Number(todayTotalSessions[0]?.count ?? 0),
    },
  };
}

async function getDailyBreakdown(todayStart: Date) {
  const daily: Array<{
    date: string;
    totalPV: number;
    totalUV: number;
    adsPV: number;
    adsUV: number;
    organicPV: number;
    organicUV: number;
  }> = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date(todayStart);
    d.setDate(d.getDate() - i);
    const dEnd = new Date(d);
    dEnd.setDate(dEnd.getDate() + 1);

    const [totalPV, totalUV, adsPV, adsUV, organicPV, organicUV] = await Promise.all([
      prisma.$queryRawUnsafe<Array<{ count: bigint }>>(
        `SELECT COUNT(*)::int as count FROM page_views 
         WHERE created_at >= $1 AND created_at < $2 AND is_owner = FALSE AND is_test = FALSE`,
        d, dEnd
      ),
      prisma.$queryRawUnsafe<Array<{ count: bigint }>>(
        `SELECT COUNT(DISTINCT session_id)::int as count FROM page_views 
         WHERE created_at >= $1 AND created_at < $2 AND is_owner = FALSE AND is_test = FALSE`,
        d, dEnd
      ),
      prisma.$queryRawUnsafe<Array<{ count: bigint }>>(
        `SELECT COUNT(*)::int as count FROM page_views 
         WHERE created_at >= $1 AND created_at < $2 AND is_owner = FALSE AND is_test = FALSE AND traffic_type = 'ads'`,
        d, dEnd
      ),
      prisma.$queryRawUnsafe<Array<{ count: bigint }>>(
        `SELECT COUNT(DISTINCT session_id)::int as count FROM page_views 
         WHERE created_at >= $1 AND created_at < $2 AND is_owner = FALSE AND is_test = FALSE AND traffic_type = 'ads'`,
        d, dEnd
      ),
      prisma.$queryRawUnsafe<Array<{ count: bigint }>>(
        `SELECT COUNT(*)::int as count FROM page_views 
         WHERE created_at >= $1 AND created_at < $2 AND is_owner = FALSE AND is_test = FALSE AND traffic_type IN ('organic', 'social', 'referral', 'direct')`,
        d, dEnd
      ),
      prisma.$queryRawUnsafe<Array<{ count: bigint }>>(
        `SELECT COUNT(DISTINCT session_id)::int as count FROM page_views 
         WHERE created_at >= $1 AND created_at < $2 AND is_owner = FALSE AND is_test = FALSE AND traffic_type IN ('organic', 'social', 'referral', 'direct')`,
        d, dEnd
      ),
    ]);

    daily.push({
      date: d.toISOString().slice(0, 10),
      totalPV: Number(totalPV[0]?.count ?? 0),
      totalUV: Number(totalUV[0]?.count ?? 0),
      adsPV: Number(adsPV[0]?.count ?? 0),
      adsUV: Number(adsUV[0]?.count ?? 0),
      organicPV: Number(organicPV[0]?.count ?? 0),
      organicUV: Number(organicUV[0]?.count ?? 0),
    });
  }

  return daily;
}

// ============================================
// API Handler
// ============================================
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  if (searchParams.has("stats")) {
    try {
      const now = new Date();
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekStart = new Date(todayStart);
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

      await ensureVisitorLogTable();
      await ensureAdvancedColumns();

      // 获取流量统计
      const trafficStats = await getTrafficStats(todayStart, weekStart, monthStart);
      
      // 获取每日明细
      const dailyBreakdown = await getDailyBreakdown(todayStart);

      // 获取热门页面（排除owner/test）
      const topPages = await prisma.$queryRawUnsafe<Array<{ page: string; views: bigint }>>(
        `SELECT page, COUNT(*)::int as views FROM page_views 
         WHERE created_at >= $1 AND is_owner = FALSE AND is_test = FALSE
         GROUP BY page ORDER BY views DESC LIMIT 10`,
        todayStart
      );

      // 获取流量来源明细
      const trafficSources = await prisma.$queryRawUnsafe<
        Array<{ source: string; traffic_type: string; count: bigint }>
      >(
        `SELECT 
           COALESCE(utm_source, 'direct') as source,
           traffic_type,
           COUNT(*)::int as count 
         FROM page_views 
         WHERE created_at >= $1 AND is_owner = FALSE AND is_test = FALSE
         GROUP BY source, traffic_type 
         ORDER BY count DESC 
         LIMIT 20`,
        todayStart
      );

      return NextResponse.json({
        traffic: trafficStats,
        daily: dailyBreakdown,
        topPages: topPages.map((p: any) => ({ page: p.page, views: Number(p.views) })),
        sources: trafficSources.map((s: any) => ({
          source: s.source,
          type: s.traffic_type,
          count: Number(s.count),
        })),
      });
    } catch (e: any) {
      console.error("[TrafficStats]", e);
      return NextResponse.json({ error: "Stats unavailable", detail: e.message }, { status: 500 });
    }
  }

  // Beacon mode - 记录访问
  const ip = getClientIp(request);
  const ua = request.headers.get("user-agent") || "";
  const today = new Date().toISOString().slice(0, 10);
  const vid = searchParams.get("vid") || hashVisitor(ip, ua, today);
  const sessionId = generateSessionId(ip, ua);

  try {
    await ensureVisitorLogTable();
    await ensureAdvancedColumns();

    // 判断流量属性
    const isOwner = isOwnerIp(ip);
    const isTest = isTestIp(ip);
    const gclid = searchParams.get("gclid") || searchParams.get("gbraid") || searchParams.get("wbraid") || "";
    const utmSource = searchParams.get("utm_source");
    const utmMedium = searchParams.get("utm_medium");
    const trafficType = getTrafficType(utmSource, utmMedium, gclid);
    const country = getCountryFromIp(ip);
    const { device, browser, os } = parseUserAgent(ua);
    const referrer = searchParams.get("r") || "";
    const referrerDomain = extractReferrerDomain(referrer);

    // 插入页面访问记录
    await prisma.$executeRawUnsafe(
      `INSERT INTO page_views 
       (page, referrer, referrer_domain, utm_source, utm_medium, utm_campaign, utm_term, utm_content,
        ip_address, country, session_id, traffic_type, is_owner, is_test, device_type, browser, os, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, NOW())`,
      searchParams.get("p") || "/",
      referrer,
      referrerDomain,
      gclid ? "google" : (utmSource || ""),
      gclid ? "cpc" : (utmMedium || ""),
      searchParams.get("utm_campaign") || "",
      searchParams.get("utm_term") || "",
      searchParams.get("utm_content") || "",
      ip,
      country,
      sessionId,
      trafficType,
      isOwner,
      isTest,
      device,
      browser,
      os
    );

    // 更新visitor_logs
    if (logTableReady) {
      try {
        await prisma.$executeRawUnsafe(
          `INSERT INTO visitor_logs (visitor_id, ip_address, is_owner, is_test, traffic_type, created_at)
           SELECT $1, $2, $3, $4, $5, NOW()
           WHERE NOT EXISTS (SELECT 1 FROM visitor_logs WHERE visitor_id = $1 AND created_at::date = CURRENT_DATE)`,
          vid, ip, isOwner, isTest, trafficType
        );
      } catch {}
    }
  } catch (e: any) {
    console.error("[Beacon]", e.message);
  }

  return new NextResponse(
    Buffer.from("R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", "base64"),
    { headers: { "Content-Type": "image/gif", "Cache-Control": "no-cache, no-store, must-revalidate" } }
  );
}
