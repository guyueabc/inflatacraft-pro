import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { classifyCountry, sanitizeAnalyticsValue, sanitizePath, sanitizeVisitorId } from "@/lib/analytics/collection";
import { prisma } from "@/lib/prisma";

type SummaryRow = {
  total_pv: number;
  total_uv: number;
  ads_pv: number;
  ads_uv: number;
  organic_pv: number;
  organic_uv: number;
  social_pv: number;
  social_uv: number;
  referral_pv: number;
  referral_uv: number;
  direct_pv: number;
  direct_uv: number;
};

type DailyRow = SummaryRow & { date: Date };
type PageRow = { page: string; views: number };
type SourceRow = { source: string; traffic_type: string; count: number };

const GIF = Buffer.from("R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", "base64");
const VALID_TRAFFIC_TYPES = new Set(["ads", "organic", "social", "referral", "direct"]);

function clientIp(request: NextRequest): string {
  return request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || "0.0.0.0";
}

function trafficType(source: string, medium: string, clickId: string): string {
  if (clickId || medium === "cpc" || medium === "ppc" || medium === "paid") return "ads";
  if (["google", "bing", "yahoo", "baidu", "duckduckgo"].includes(source) && medium === "organic") return "organic";
  if (["facebook", "linkedin", "twitter", "instagram", "youtube", "tiktok"].includes(source)) return "social";
  if (source) return "referral";
  return "direct";
}

function userAgentInfo(ua: string) {
  const device = /Mobile|Android|iPhone|iPad/i.test(ua) ? "mobile" : "desktop";
  const browser = ua.includes("Edg") ? "Edge" : ua.includes("Firefox") ? "Firefox" : ua.includes("Chrome") ? "Chrome" : ua.includes("Safari") ? "Safari" : "unknown";
  const os = /iPhone|iPad/.test(ua) ? "iOS" : ua.includes("Android") ? "Android" : ua.includes("Windows") ? "Windows" : ua.includes("Mac OS") ? "macOS" : ua.includes("Linux") ? "Linux" : "unknown";
  return { device, browser, os };
}

function fallbackVisitor(ip: string, ua: string): string {
  return createHash("sha256").update(`${ip}|${ua}`).digest("hex").slice(0, 32);
}

function fallbackSession(visitorId: string): string {
  const bucket = Math.floor(Date.now() / (30 * 60 * 1000));
  return createHash("sha256").update(`${visitorId}|${bucket}`).digest("hex").slice(0, 32);
}

function publicFilter() {
  return `is_owner = FALSE AND is_test = FALSE AND country IS DISTINCT FROM 'CN'`;
}

async function statsResponse() {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekStart = new Date(todayStart);
  weekStart.setDate(weekStart.getDate() - 6);

  const [summaryRows, dailyRows, topPages, sources] = await Promise.all([
    prisma.$queryRawUnsafe<SummaryRow[]>(
      `SELECT
        COUNT(*)::int AS total_pv,
        COUNT(DISTINCT visitor_id)::int AS total_uv,
        COUNT(*) FILTER (WHERE traffic_type='ads')::int AS ads_pv,
        COUNT(DISTINCT visitor_id) FILTER (WHERE traffic_type='ads')::int AS ads_uv,
        COUNT(*) FILTER (WHERE traffic_type='organic')::int AS organic_pv,
        COUNT(DISTINCT visitor_id) FILTER (WHERE traffic_type='organic')::int AS organic_uv,
        COUNT(*) FILTER (WHERE traffic_type='social')::int AS social_pv,
        COUNT(DISTINCT visitor_id) FILTER (WHERE traffic_type='social')::int AS social_uv,
        COUNT(*) FILTER (WHERE traffic_type='referral')::int AS referral_pv,
        COUNT(DISTINCT visitor_id) FILTER (WHERE traffic_type='referral')::int AS referral_uv,
        COUNT(*) FILTER (WHERE traffic_type='direct')::int AS direct_pv,
        COUNT(DISTINCT visitor_id) FILTER (WHERE traffic_type='direct')::int AS direct_uv
       FROM page_views WHERE created_at >= $1 AND ${publicFilter()}`,
      todayStart
    ),
    prisma.$queryRawUnsafe<DailyRow[]>(
      `SELECT date_trunc('day', created_at) AS date,
        COUNT(*)::int AS total_pv,
        COUNT(DISTINCT visitor_id)::int AS total_uv,
        COUNT(*) FILTER (WHERE traffic_type='ads')::int AS ads_pv,
        COUNT(DISTINCT visitor_id) FILTER (WHERE traffic_type='ads')::int AS ads_uv,
        COUNT(*) FILTER (WHERE traffic_type IN ('organic','social','referral','direct'))::int AS organic_pv,
        COUNT(DISTINCT visitor_id) FILTER (WHERE traffic_type IN ('organic','social','referral','direct'))::int AS organic_uv,
        0::int AS social_pv, 0::int AS social_uv, 0::int AS referral_pv, 0::int AS referral_uv, 0::int AS direct_pv, 0::int AS direct_uv
       FROM page_views WHERE created_at >= $1 AND ${publicFilter()}
       GROUP BY 1 ORDER BY 1`,
      weekStart
    ),
    prisma.$queryRawUnsafe<PageRow[]>(
      `SELECT page, COUNT(*)::int AS views FROM page_views
       WHERE created_at >= $1 AND ${publicFilter()} GROUP BY page ORDER BY views DESC LIMIT 10`,
      todayStart
    ),
    prisma.$queryRawUnsafe<SourceRow[]>(
      `SELECT COALESCE(NULLIF(utm_source,''),'direct') AS source, traffic_type, COUNT(*)::int AS count
       FROM page_views WHERE created_at >= $1 AND ${publicFilter()}
       GROUP BY 1,2 ORDER BY count DESC LIMIT 20`,
      todayStart
    ),
  ]);

  const s = summaryRows[0] || {} as SummaryRow;
  return NextResponse.json({
    period: { start: todayStart.toISOString(), end: now.toISOString(), timezone: Intl.DateTimeFormat().resolvedOptions().timeZone },
    generatedAt: now.toISOString(),
    traffic: { today: {
      adsPV: Number(s.ads_pv || 0), organicPV: Number(s.organic_pv || 0), socialPV: Number(s.social_pv || 0), referralPV: Number(s.referral_pv || 0), directPV: Number(s.direct_pv || 0),
      adsUV: Number(s.ads_uv || 0), organicUV: Number(s.organic_uv || 0), socialUV: Number(s.social_uv || 0), referralUV: Number(s.referral_uv || 0), directUV: Number(s.direct_uv || 0),
      totalPV: Number(s.total_pv || 0), totalUV: Number(s.total_uv || 0), adsVisitors: Number(s.ads_uv || 0), organicVisitors: Number((s.organic_uv || 0) + (s.social_uv || 0) + (s.referral_uv || 0) + (s.direct_uv || 0)), totalVisitors: Number(s.total_uv || 0),
    }},
    daily: dailyRows.map((r) => ({ date: r.date.toISOString().slice(0, 10), totalPV: Number(r.total_pv), totalUV: Number(r.total_uv), adsPV: Number(r.ads_pv), adsUV: Number(r.ads_uv), organicPV: Number(r.organic_pv), organicUV: Number(r.organic_uv) })),
    topPages: topPages.map((r) => ({ page: r.page, views: Number(r.views) })),
    sources: sources.map((r) => ({ source: r.source, type: VALID_TRAFFIC_TYPES.has(r.traffic_type) ? r.traffic_type : "direct", count: Number(r.count) })),
  });
}

function isOwnerIp(ip: string): boolean {
  const configured = (process.env.ANALYTICS_OWNER_IPS || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  return ip === "127.0.0.1" || ip === "::1" || configured.includes(ip);
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  if (searchParams.has("stats")) {
    const unauthorized = await requireAdmin();
    if (unauthorized) return unauthorized;
    try {
      return await statsResponse();
    } catch (error: unknown) {
      console.error("[TrafficStats]", error);
      return NextResponse.json({ code: "ANALYTICS_READ_FAILED", error: "Statistics unavailable" }, { status: 500 });
    }
  }

  if (request.headers.get("sec-fetch-site") === "cross-site") {
    return NextResponse.json({ code: "CROSS_SITE_TRACKING_REJECTED" }, { status: 403 });
  }

  const ip = clientIp(request);
  const ua = sanitizeAnalyticsValue(request.headers.get("user-agent"), 500);
  const suppliedVisitor = sanitizeVisitorId(searchParams.get("vid"));
  const visitorId = suppliedVisitor || fallbackVisitor(ip, ua);
  const sessionId = sanitizeVisitorId(searchParams.get("sid")) || fallbackSession(visitorId);
  const clickId = sanitizeAnalyticsValue(searchParams.get("gclid") || searchParams.get("gbraid") || searchParams.get("wbraid"), 200);
  const source = sanitizeAnalyticsValue(searchParams.get("utm_source"), 100).toLowerCase();
  const medium = sanitizeAnalyticsValue(searchParams.get("utm_medium"), 100).toLowerCase();
  const type = trafficType(source, medium, clickId);
  const referrer = sanitizeAnalyticsValue(searchParams.get("r"), 1000);
  let referrerDomain = "";
  try { referrerDomain = referrer ? new URL(referrer).hostname.slice(0, 253) : ""; } catch { referrerDomain = ""; }
  const headerCountry = sanitizeAnalyticsValue(request.headers.get("x-vercel-ip-country"), 2).toUpperCase();
  const country = /^[A-Z]{2}$/.test(headerCountry) ? headerCountry : classifyCountry(ip);
  const isOwner = isOwnerIp(ip);
  const isTest = country === "local" || country === "CN" || ip === "0.0.0.0";
  const { device, browser, os } = userAgentInfo(ua);

  try {
    await prisma.$transaction([
      prisma.$executeRawUnsafe(
        `INSERT INTO page_views
         (page, referrer, referrer_domain, utm_source, utm_medium, utm_campaign, utm_term, utm_content,
          visitor_id, ip_address, country, session_id, traffic_type, is_owner, is_test, device_type, browser, os, created_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,NOW())`,
        sanitizePath(searchParams.get("p")), referrer, referrerDomain, clickId ? "google" : source,
        clickId ? "cpc" : medium, sanitizeAnalyticsValue(searchParams.get("utm_campaign"), 200),
        sanitizeAnalyticsValue(searchParams.get("utm_term"), 200), sanitizeAnalyticsValue(searchParams.get("utm_content"), 500),
        visitorId, ip, country, sessionId, type, isOwner, isTest, device, browser, os
      ),
    ]);
  } catch (error: unknown) {
    console.error("[AnalyticsWrite]", error);
    return NextResponse.json({ code: "ANALYTICS_WRITE_FAILED" }, { status: 503 });
  }

  return new NextResponse(GIF, { headers: { "Content-Type": "image/gif", "Cache-Control": "no-store" } });
}
