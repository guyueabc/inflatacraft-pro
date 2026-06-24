import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createHash } from "crypto";

let logTableReady = false;
let ipColumnReady = false;

async function ensureVisitorLogTable() {
  if (logTableReady) return;
  try {
    await prisma.$executeRawUnsafe(
      `CREATE TABLE IF NOT EXISTS visitor_logs (
        id SERIAL PRIMARY KEY, visitor_id TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )`
    );
    await prisma.$executeRawUnsafe(
      `CREATE INDEX IF NOT EXISTS idx_vl_vid_date ON visitor_logs (visitor_id, created_at)`
    );
    logTableReady = true;
  } catch (e: any) {
    console.error("[VisitorLog] table error:", e.message);
  }
}

async function ensureIpColumns() {
  if (ipColumnReady) return;
  try {
    // 添加 ip_address 列
    await prisma.$executeRawUnsafe(
      `ALTER TABLE page_views ADD COLUMN IF NOT EXISTS ip_address TEXT`
    );
    // 添加 country 列
    await prisma.$executeRawUnsafe(
      `ALTER TABLE page_views ADD COLUMN IF NOT EXISTS country TEXT`
    );
    // 创建索引
    await prisma.$executeRawUnsafe(
      `CREATE INDEX IF NOT EXISTS idx_page_views_country ON page_views (country)`
    );
    ipColumnReady = true;
  } catch (e: any) {
    console.error("[IpColumns] error:", e.message);
  }
}

function hashVisitor(ip: string, ua: string, date: string): string {
  return createHash("sha256").update(ip + "|" + ua + "|" + date).digest("hex").slice(0, 16);
}

function getClientIp(request: NextRequest): string {
  return (request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
          request.headers.get("x-real-ip") || "0.0.0.0");
}

// 中国 IP 段（主要运营商和数据中心）
const CHINA_IP_RANGES = [
  // 中国主要 IP 段（精简版，覆盖主要访问来源）
  /^1\.(0|1|2|4|5|6|8|9|10|11|12|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31|32|33|34|35|36|37|38|39|40|41|42|43|44|45|46|47|48|49|50|51|52|53|54|55|56|57|58|59|60|61|62|63|64|65|66|67|68|69|70|71|72|73|74|75|76|77|78|79|80|81|82|83|84|85|86|87|88|89|90|91|92|93|94|95|96|97|98|99|100|101|102|103|104|105|106|107|108|109|110|111|112|113|114|115|116|117|118|119|120|121|122|123|124|125|126|127)\./,
  /^14\./,
  /^27\./,
  /^36\./,
  /^39\./,
  /^42\./,
  /^49\./,
  /^58\./,
  /^59\./,
  /^60\./,
  /^61\./,
  /^106\./,
  /^110\./,
  /^111\./,
  /^112\./,
  /^113\./,
  /^114\./,
  /^115\./,
  /^116\./,
  /^117\./,
  /^118\./,
  /^119\./,
  /^120\./,
  /^121\./,
  /^122\./,
  /^123\./,
  /^124\./,
  /^125\./,
  /^126\./,
  /^171\./,
  /^175\./,
  /^180\./,
  /^182\./,
  /^183\./,
  /^202\./,
  /^210\./,
  /^211\./,
  /^218\./,
  /^219\./,
  /^220\./,
  /^221\./,
  /^222\./,
  /^223\./,
];

function isChinaIp(ip: string): boolean {
  if (!ip || ip === "0.0.0.0" || ip.startsWith("192.168.") || ip.startsWith("10.") || ip.startsWith("172.")) {
    return false; // 内网IP不算
  }
  return CHINA_IP_RANGES.some(range => range.test(ip));
}

function getCountryFromIp(ip: string): string {
  if (!ip || ip === "0.0.0.0") return "unknown";
  if (ip.startsWith("192.168.") || ip.startsWith("10.") || ip.startsWith("172.")) return "local";
  if (isChinaIp(ip)) return "CN";
  return "other";
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  if (searchParams.has("stats")) {
    try {
      const now = new Date();
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekStart = new Date(todayStart); weekStart.setDate(weekStart.getDate() - weekStart.getDay());
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

      await ensureVisitorLogTable();
      await ensureIpColumns();

      // Batch 1: PV counts (4)
      const [totalPV, todayPV, weekPV, monthPV] = await Promise.all([
        prisma.pageView.count(),
        prisma.pageView.count({ where: { createdAt: { gte: todayStart } } }),
        prisma.pageView.count({ where: { createdAt: { gte: weekStart } } }),
        prisma.pageView.count({ where: { createdAt: { gte: monthStart } } }),
      ]);

      // 今日详细统计：总PV、中国IP的PV、非中国IP的PV
      const [todayChinaPV, todayNonChinaPV, todayChinaUV, todayNonChinaUV, todayAdsClicks] = await Promise.all([
        prisma.$queryRawUnsafe<Array<{ count: bigint }>>(
          `SELECT COUNT(*)::int as count FROM page_views WHERE created_at >= $1 AND country = 'CN'`,
          todayStart
        ),
        prisma.$queryRawUnsafe<Array<{ count: bigint }>>(
          `SELECT COUNT(*)::int as count FROM page_views WHERE created_at >= $1 AND COALESCE(country, '') != 'CN'`,
          todayStart
        ),
        prisma.$queryRawUnsafe<Array<{ count: bigint }>>(
          `SELECT COUNT(DISTINCT ip_address)::int as count FROM page_views WHERE created_at >= $1 AND country = 'CN' AND ip_address IS NOT NULL`,
          todayStart
        ),
        prisma.$queryRawUnsafe<Array<{ count: bigint }>>(
          `SELECT COUNT(DISTINCT ip_address)::int as count FROM page_views WHERE created_at >= $1 AND COALESCE(country, '') != 'CN' AND ip_address IS NOT NULL`,
          todayStart
        ),
        prisma.$queryRawUnsafe<Array<{ count: bigint }>>(
          `SELECT COUNT(*)::int as count FROM page_views WHERE created_at >= $1 AND utm_source = 'google' AND utm_medium = 'cpc'`,
          todayStart
        ),
      ]);

      // Batch 2: UV + submissions + pages (7)
      const [totalUV, todayUV, weekUV, monthUV, submissionsToday, submissionsWeek, submissionsMonth, topPages] = await Promise.all([
        prisma.$queryRawUnsafe<Array<{ count: bigint }>>("SELECT COUNT(DISTINCT visitor_id)::int as count FROM visitor_logs"),
        prisma.$queryRawUnsafe<Array<{ count: bigint }>>("SELECT COUNT(DISTINCT visitor_id)::int as count FROM visitor_logs WHERE created_at >= $1", todayStart),
        prisma.$queryRawUnsafe<Array<{ count: bigint }>>("SELECT COUNT(DISTINCT visitor_id)::int as count FROM visitor_logs WHERE created_at >= $1", weekStart),
        prisma.$queryRawUnsafe<Array<{ count: bigint }>>("SELECT COUNT(DISTINCT visitor_id)::int as count FROM visitor_logs WHERE created_at >= $1", monthStart),
        prisma.formSubmission.count({ where: { formType: "quote", createdAt: { gte: todayStart } } }),
        prisma.formSubmission.count({ where: { formType: "quote", createdAt: { gte: weekStart } } }),
        prisma.formSubmission.count({ where: { formType: "quote", createdAt: { gte: monthStart } } }),
        prisma.pageView.groupBy({ by: ["page"], _count: { page: true }, orderBy: { _count: { page: "desc" } }, take: 10 }),
      ]);

      // Batch 3: sources (1)
      const topSources = await prisma.$queryRawUnsafe<Array<{ source: string; count: bigint }>>(
        `SELECT COALESCE(utm_source || ' / ' || utm_medium, 'direct') as source, COUNT(*)::int as count FROM page_views GROUP BY source ORDER BY count DESC LIMIT 10`
      );

      // Daily breakdown (sequential, 2 queries per day)
      const dailyPV: Array<{ date: string; pv: number; uv: number; submissions: number }> = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date(todayStart); d.setDate(d.getDate() - i);
        const dEnd = new Date(d); dEnd.setDate(dEnd.getDate() + 1);
        const [pv, subs, uvR] = await Promise.all([
          prisma.pageView.count({ where: { createdAt: { gte: d, lt: dEnd } } }),
          prisma.formSubmission.count({ where: { formType: "quote", createdAt: { gte: d, lt: dEnd } } }),
          prisma.$queryRawUnsafe<Array<{ count: bigint }>>("SELECT COUNT(DISTINCT visitor_id)::int as count FROM visitor_logs WHERE created_at >= $1 AND created_at < $2", d, dEnd),
        ]);
        dailyPV.push({ date: d.toISOString().slice(0, 10), pv, uv: Number(uvR[0]?.count ?? 0), submissions: subs });
      }

      const tUV = Number(totalUV[0]?.count ?? 0);
      return NextResponse.json({
        summary: {
          totalPV: Number(totalPV), todayPV: Number(todayPV), weekPV: Number(weekPV), monthPV: Number(monthPV),
          totalUV: tUV, todayUV: Number(todayUV[0]?.count ?? 0), weekUV: Number(weekUV[0]?.count ?? 0), monthUV: Number(monthUV[0]?.count ?? 0),
          todaySubmissions: Number(submissionsToday), weekSubmissions: Number(submissionsWeek), monthSubmissions: Number(submissionsMonth),
          conversionRate: tUV > 0 ? ((submissionsMonth / tUV) * 100).toFixed(2) + "%" : "0%",
          // 今日详细数据
          todayChinaPV: Number(todayChinaPV[0]?.count ?? 0),
          todayNonChinaPV: Number(todayNonChinaPV[0]?.count ?? 0),
          todayChinaUV: Number(todayChinaUV[0]?.count ?? 0),
          todayNonChinaUV: Number(todayNonChinaUV[0]?.count ?? 0),
          todayAdsClicks: Number(todayAdsClicks[0]?.count ?? 0),
        },
        dailyPV,
        topPages: topPages.map((p: any) => ({ page: p.page, views: p._count.page })),
        topSources: topSources.map((s: any) => ({ source: s.source, count: Number(s.count) })),
      });
    } catch (e: any) {
      console.error("[Stats]", e);
      return NextResponse.json({ error: "Stats unavailable" }, { status: 500 });
    }
  }

  // Beacon mode
  const ip = getClientIp(request);
  const ua = request.headers.get("user-agent") || "";
  const today = new Date().toISOString().slice(0, 10);
  const vid = searchParams.get("vid") || hashVisitor(ip, ua, today);

  try {
    await ensureVisitorLogTable();
    await ensureIpColumns();

    const country = getCountryFromIp(ip);

    // Insert page view — auto-tag gclid as google/cpc, record IP and country
    const gclid = searchParams.get("gclid") || searchParams.get("gbraid") || searchParams.get("wbraid") || "";
    await prisma.$executeRawUnsafe(
      `INSERT INTO "page_views" ("page", "referrer", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "ip_address", "country", "created_at")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())`,
      searchParams.get("p") || "/", searchParams.get("r") || "",
      gclid ? "google" : (searchParams.get("utm_source") || ""),
      gclid ? "cpc" : (searchParams.get("utm_medium") || ""),
      searchParams.get("utm_campaign") || "", searchParams.get("utm_term") || "",
      searchParams.get("utm_content") || "",
      ip, country
    );

    // Insert visitor log (upsert-style: skip if same vid today)
    if (logTableReady) {
      try {
        await prisma.$executeRawUnsafe(
          `INSERT INTO visitor_logs (visitor_id, created_at) SELECT $1, NOW() WHERE NOT EXISTS (SELECT 1 FROM visitor_logs WHERE visitor_id = $1 AND created_at::date = CURRENT_DATE)`,
          vid
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