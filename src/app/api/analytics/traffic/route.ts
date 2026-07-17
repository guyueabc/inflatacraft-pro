import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

type AggregateRow = {
  total_pv: number;
  total_uv: number;
  ads_pv: number;
  ads_uv: number;
  organic_pv: number;
  organic_uv: number;
  direct_pv: number;
  social_pv: number;
  referral_pv: number;
};

type DailyRow = AggregateRow & { date: Date };
type HourRow = { hour: number; pv: number };

const FILTER = "is_owner = FALSE AND is_test = FALSE AND country IS DISTINCT FROM 'CN'";
const MAX_RANGE_DAYS = 366;

function validDate(value: string | null, fallback = new Date()): Date {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return fallback;
  const date = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime())) throw new Error("Invalid date");
  return date;
}

function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setUTCDate(result.getUTCDate() + days);
  return result;
}

async function aggregate(start: Date, end: Date): Promise<AggregateRow> {
  const rows = await prisma.$queryRawUnsafe<AggregateRow[]>(
    `SELECT COUNT(*)::int AS total_pv,
      COUNT(DISTINCT visitor_id)::int AS total_uv,
      COUNT(*) FILTER (WHERE traffic_type='ads')::int AS ads_pv,
      COUNT(DISTINCT visitor_id) FILTER (WHERE traffic_type='ads')::int AS ads_uv,
      COUNT(*) FILTER (WHERE traffic_type='organic')::int AS organic_pv,
      COUNT(DISTINCT visitor_id) FILTER (WHERE traffic_type='organic')::int AS organic_uv,
      COUNT(*) FILTER (WHERE traffic_type='direct')::int AS direct_pv,
      COUNT(*) FILTER (WHERE traffic_type='social')::int AS social_pv,
      COUNT(*) FILTER (WHERE traffic_type='referral')::int AS referral_pv
     FROM page_views WHERE created_at >= $1 AND created_at < $2 AND ${FILTER}`,
    start, end
  );
  return rows[0] || { total_pv: 0, total_uv: 0, ads_pv: 0, ads_uv: 0, organic_pv: 0, organic_uv: 0, direct_pv: 0, social_pv: 0, referral_pv: 0 };
}

async function daily(start: Date, end: Date) {
  const rows = await prisma.$queryRawUnsafe<DailyRow[]>(
    `SELECT date_trunc('day', created_at) AS date,
      COUNT(*)::int AS total_pv, COUNT(DISTINCT visitor_id)::int AS total_uv,
      COUNT(*) FILTER (WHERE traffic_type='ads')::int AS ads_pv,
      COUNT(DISTINCT visitor_id) FILTER (WHERE traffic_type='ads')::int AS ads_uv,
      COUNT(*) FILTER (WHERE traffic_type='organic')::int AS organic_pv,
      COUNT(DISTINCT visitor_id) FILTER (WHERE traffic_type='organic')::int AS organic_uv,
      COUNT(*) FILTER (WHERE traffic_type='direct')::int AS direct_pv,
      COUNT(*) FILTER (WHERE traffic_type='social')::int AS social_pv,
      COUNT(*) FILTER (WHERE traffic_type='referral')::int AS referral_pv
     FROM page_views WHERE created_at >= $1 AND created_at < $2 AND ${FILTER}
     GROUP BY 1 ORDER BY 1`, start, end
  );
  return rows.map((r) => ({ date: r.date.toISOString().slice(0, 10), pv: Number(r.total_pv), uv: Number(r.total_uv), adsPV: Number(r.ads_pv), organicPV: Number(r.organic_pv), directPV: Number(r.direct_pv), socialPV: Number(r.social_pv), referralPV: Number(r.referral_pv) }));
}

function stats(row: AggregateRow, dayCount: number) {
  return {
    totalPV: Number(row.total_pv), totalUV: Number(row.total_uv), adsPV: Number(row.ads_pv), adsUV: Number(row.ads_uv),
    organicPV: Number(row.organic_pv), organicUV: Number(row.organic_uv), directPV: Number(row.direct_pv), socialPV: Number(row.social_pv), referralPV: Number(row.referral_pv),
    avgDailyPV: Math.round(Number(row.total_pv) / Math.max(dayCount, 1)),
  };
}

export async function GET(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  try {
    const params = new URL(request.url).searchParams;
    const view = params.get("view") || "day";
    if (!["day", "week", "month", "range"].includes(view)) return NextResponse.json({ error: "Invalid view" }, { status: 400 });
    const target = validDate(params.get("date"));
    let start = target;
    let end = addDays(start, 1);
    if (view === "week") {
      const weekday = start.getUTCDay() || 7;
      start = addDays(start, 1 - weekday);
      end = addDays(start, 7);
    } else if (view === "month") {
      start = new Date(Date.UTC(target.getUTCFullYear(), target.getUTCMonth(), 1));
      end = new Date(Date.UTC(target.getUTCFullYear(), target.getUTCMonth() + 1, 1));
    } else if (view === "range") {
      start = validDate(params.get("start"));
      end = addDays(validDate(params.get("end")), 1);
    }
    const days = Math.ceil((end.getTime() - start.getTime()) / 86400000);
    if (days < 1 || days > MAX_RANGE_DAYS) return NextResponse.json({ error: `Range must be 1-${MAX_RANGE_DAYS} days` }, { status: 400 });

    const compare = params.get("compare") === "true";
    const previousStart = addDays(start, -days);
    const [current, series, previous] = await Promise.all([aggregate(start, end), daily(start, end), compare ? aggregate(previousStart, start) : null]);
    const currentStats = stats(current, days);
    const peak = series.reduce((best, item) => item.pv > (best?.pv || -1) ? item : best, series[0]);

    let hourly: HourRow[] | undefined;
    if (view === "day") {
      hourly = await prisma.$queryRawUnsafe<HourRow[]>(
        `SELECT EXTRACT(HOUR FROM created_at)::int AS hour, COUNT(*)::int AS pv FROM page_views
         WHERE created_at >= $1 AND created_at < $2 AND ${FILTER} GROUP BY 1 ORDER BY 1`, start, end
      );
    }

    return NextResponse.json({
      view, timezone: "UTC", start: start.toISOString(), end: end.toISOString(),
      date: start.toISOString().slice(0, 10),
      stats: view === "day" ? { pv: currentStats.totalPV, uv: currentStats.totalUV, adsPV: currentStats.adsPV, organicPV: currentStats.organicPV, directPV: currentStats.directPV, socialPV: currentStats.socialPV, referralPV: currentStats.referralPV } : { ...currentStats, peakPV: peak?.pv || 0, peakDate: peak?.date || "" },
      daily: series, hourly,
      compare: previous ? { previous: stats(previous, days), pvGrowth: Number(previous.total_pv) ? ((Number(current.total_pv) - Number(previous.total_pv)) / Number(previous.total_pv) * 100).toFixed(1) : null, uvGrowth: Number(previous.total_uv) ? ((Number(current.total_uv) - Number(previous.total_uv)) / Number(previous.total_uv) * 100).toFixed(1) : null } : null,
    });
  } catch (error: unknown) {
    console.error("[TrafficAPI]", error);
    return NextResponse.json({ code: "TRAFFIC_READ_FAILED", error: "Traffic data unavailable" }, { status: 500 });
  }
}
