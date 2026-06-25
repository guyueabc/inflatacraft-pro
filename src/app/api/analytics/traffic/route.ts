import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ============================================
// 流量分析API - 支持多维度时间查询
// ============================================

interface DailyStats {
  date: string;
  pv: number;
  uv: number;
  adsPV: number;
  organicPV: number;
  directPV: number;
  socialPV: number;
  referralPV: number;
}

interface PeriodStats {
  totalPV: number;
  totalUV: number;
  adsPV: number;
  adsUV: number;
  organicPV: number;
  organicUV: number;
  avgDailyPV: number;
  peakPV: number;
  peakDate: string;
  bounceRate: number;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  const view = searchParams.get("view") || "day"; // day, week, month
  const dateStr = searchParams.get("date") || new Date().toISOString().slice(0, 10);
  const compare = searchParams.get("compare") === "true"; // 是否对比上一周期
  
  try {
    const targetDate = new Date(dateStr);
    
    let data: any = {};
    
    switch (view) {
      case "day":
        data = await getDayStats(targetDate, compare);
        break;
      case "week":
        data = await getWeekStats(targetDate, compare);
        break;
      case "month":
        data = await getMonthStats(targetDate, compare);
        break;
      case "range":
        const start = searchParams.get("start") || dateStr;
        const end = searchParams.get("end") || dateStr;
        data = await getRangeStats(new Date(start), new Date(end));
        break;
      default:
        data = await getDayStats(targetDate, compare);
    }
    
    return NextResponse.json(data);
  } catch (e: any) {
    console.error("[TrafficAPI]", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// ============================================
// 按日统计
// ============================================
async function getDayStats(date: Date, compare: boolean) {
  const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const dayEnd = new Date(dayStart);
  dayEnd.setDate(dayEnd.getDate() + 1);
  
  // 当日统计
  const [pvRows, uvRows, hourlyData] = await Promise.all([
    // PV by traffic type
    prisma.$queryRawUnsafe<Array<{ traffic_type: string; count: bigint }>>(
      `SELECT traffic_type, COUNT(*)::int as count 
       FROM page_views 
       WHERE created_at >= $1 AND created_at < $2 AND is_owner = FALSE AND is_test = FALSE
       GROUP BY traffic_type`,
      dayStart, dayEnd
    ),
    // UV
    prisma.$queryRawUnsafe<Array<{ count: bigint }>>(
      `SELECT COUNT(DISTINCT session_id)::int as count 
       FROM page_views 
       WHERE created_at >= $1 AND created_at < $2 AND is_owner = FALSE AND is_test = FALSE`,
      dayStart, dayEnd
    ),
    // 按小时分布
    prisma.$queryRawUnsafe<Array<{ hour: number; pv: number }>>(
      `SELECT EXTRACT(HOUR FROM created_at)::int as hour, COUNT(*)::int as pv
       FROM page_views 
       WHERE created_at >= $1 AND created_at < $2 AND is_owner = FALSE AND is_test = FALSE
       GROUP BY hour ORDER BY hour`,
      dayStart, dayEnd
    ),
  ]);
  
  const stats = {
    pv: pvRows.reduce((sum, r) => sum + Number(r.count), 0),
    uv: Number(uvRows[0]?.count || 0),
    adsPV: Number(pvRows.find(r => r.traffic_type === "ads")?.count || 0),
    organicPV: Number(pvRows.find(r => r.traffic_type === "organic")?.count || 0),
    directPV: Number(pvRows.find(r => r.traffic_type === "direct")?.count || 0),
    socialPV: Number(pvRows.find(r => r.traffic_type === "social")?.count || 0),
    referralPV: Number(pvRows.find(r => r.traffic_type === "referral")?.count || 0),
  };
  
  // 对比昨日
  let compareData = null;
  if (compare) {
    const prevDayStart = new Date(dayStart);
    prevDayStart.setDate(prevDayStart.getDate() - 1);
    const prevDayEnd = new Date(prevDayStart);
    prevDayEnd.setDate(prevDayEnd.getDate() + 1);
    
    const [prevPV, prevUV] = await Promise.all([
      prisma.$queryRawUnsafe<Array<{ count: bigint }>>(
        `SELECT COUNT(*)::int as count FROM page_views 
         WHERE created_at >= $1 AND created_at < $2 AND is_owner = FALSE AND is_test = FALSE`,
        prevDayStart, prevDayEnd
      ),
      prisma.$queryRawUnsafe<Array<{ count: bigint }>>(
        `SELECT COUNT(DISTINCT session_id)::int as count FROM page_views 
         WHERE created_at >= $1 AND created_at < $2 AND is_owner = FALSE AND is_test = FALSE`,
        prevDayStart, prevDayEnd
      ),
    ]);
    
    const prevStats = {
      pv: Number(prevPV[0]?.count || 0),
      uv: Number(prevUV[0]?.count || 0),
    };
    
    compareData = {
      prevDate: prevDayStart.toISOString().slice(0, 10),
      prevPV: prevStats.pv,
      prevUV: prevStats.uv,
      pvGrowth: prevStats.pv > 0 ? ((stats.pv - prevStats.pv) / prevStats.pv * 100).toFixed(1) : null,
      uvGrowth: prevStats.uv > 0 ? ((stats.uv - prevStats.uv) / prevStats.uv * 100).toFixed(1) : null,
    };
  }
  
  return {
    view: "day",
    date: dayStart.toISOString().slice(0, 10),
    stats,
    hourly: hourlyData,
    compare: compareData,
  };
}

// ============================================
// 按周统计
// ============================================
async function getWeekStats(date: Date, compare: boolean) {
  // 找到该日期所在周的周一
  const weekStart = new Date(date);
  const dayOfWeek = weekStart.getDay();
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  weekStart.setDate(weekStart.getDate() + diff);
  weekStart.setHours(0, 0, 0, 0);
  
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 7);
  
  // 每日明细
  const dailyData: DailyStats[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    const dEnd = new Date(d);
    dEnd.setDate(dEnd.getDate() + 1);
    
    const [pv, uv, typeRows] = await Promise.all([
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
      prisma.$queryRawUnsafe<Array<{ traffic_type: string; count: bigint }>>(
        `SELECT traffic_type, COUNT(*)::int as count FROM page_views 
         WHERE created_at >= $1 AND created_at < $2 AND is_owner = FALSE AND is_test = FALSE
         GROUP BY traffic_type`,
        d, dEnd
      ),
    ]);
    
    dailyData.push({
      date: d.toISOString().slice(0, 10),
      pv: Number(pv[0]?.count || 0),
      uv: Number(uv[0]?.count || 0),
      adsPV: Number(typeRows.find(r => r.traffic_type === "ads")?.count || 0),
      organicPV: Number(typeRows.find(r => r.traffic_type === "organic")?.count || 0),
      directPV: Number(typeRows.find(r => r.traffic_type === "direct")?.count || 0),
      socialPV: Number(typeRows.find(r => r.traffic_type === "social")?.count || 0),
      referralPV: Number(typeRows.find(r => r.traffic_type === "referral")?.count || 0),
    });
  }
  
  // 汇总
  const stats = {
    totalPV: dailyData.reduce((s, d) => s + d.pv, 0),
    totalUV: dailyData.reduce((s, d) => s + d.uv, 0),
    adsPV: dailyData.reduce((s, d) => s + d.adsPV, 0),
    organicPV: dailyData.reduce((s, d) => s + d.organicPV, 0),
    avgDailyPV: 0,
    peakPV: Math.max(...dailyData.map(d => d.pv)),
    peakDate: dailyData.find(d => d.pv === Math.max(...dailyData.map(x => x.pv)))?.date || "",
  };
  stats.avgDailyPV = Math.round(stats.totalPV / 7);
  
  // 对比上周
  let compareData = null;
  if (compare) {
    const prevWeekStart = new Date(weekStart);
    prevWeekStart.setDate(prevWeekStart.getDate() - 7);
    
    const prevDaily: DailyStats[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(prevWeekStart);
      d.setDate(d.getDate() + i);
      const dEnd = new Date(d);
      dEnd.setDate(dEnd.getDate() + 1);
      
      const [pv, uv] = await Promise.all([
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
      ]);
      
      prevDaily.push({
        date: d.toISOString().slice(0, 10),
        pv: Number(pv[0]?.count || 0),
        uv: Number(uv[0]?.count || 0),
      } as DailyStats);
    }
    
    const prevStats = {
      totalPV: prevDaily.reduce((s, d) => s + d.pv, 0),
      totalUV: prevDaily.reduce((s, d) => s + d.uv, 0),
    };
    
    compareData = {
      prevWeekStart: prevWeekStart.toISOString().slice(0, 10),
      prevTotalPV: prevStats.totalPV,
      prevTotalUV: prevStats.totalUV,
      pvGrowth: prevStats.totalPV > 0 ? ((stats.totalPV - prevStats.totalPV) / prevStats.totalPV * 100).toFixed(1) : null,
      uvGrowth: prevStats.totalUV > 0 ? ((stats.totalUV - prevStats.totalUV) / prevStats.totalUV * 100).toFixed(1) : null,
      prevDaily,
    };
  }
  
  return {
    view: "week",
    weekStart: weekStart.toISOString().slice(0, 10),
    weekEnd: new Date(weekEnd.getTime() - 1).toISOString().slice(0, 10),
    stats,
    daily: dailyData,
    compare: compareData,
  };
}

// ============================================
// 按月统计
// ============================================
async function getMonthStats(date: Date, compare: boolean) {
  const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
  const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  
  // 每日明细
  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const dailyData: DailyStats[] = [];
  
  for (let i = 0; i < daysInMonth; i++) {
    const d = new Date(monthStart);
    d.setDate(d.getDate() + i);
    const dEnd = new Date(d);
    dEnd.setDate(dEnd.getDate() + 1);
    
    const [pv, uv] = await Promise.all([
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
    ]);
    
    dailyData.push({
      date: d.toISOString().slice(0, 10),
      pv: Number(pv[0]?.count || 0),
      uv: Number(uv[0]?.count || 0),
    } as DailyStats);
  }
  
  // 汇总
  const stats = {
    totalPV: dailyData.reduce((s, d) => s + d.pv, 0),
    totalUV: dailyData.reduce((s, d) => s + d.uv, 0),
    avgDailyPV: Math.round(dailyData.reduce((s, d) => s + d.pv, 0) / daysInMonth),
    peakPV: Math.max(...dailyData.map(d => d.pv)),
    peakDate: dailyData.find(d => d.pv === Math.max(...dailyData.map(x => x.pv)))?.date || "",
  };
  
  // 按周汇总
  const weeklyData: Array<{ week: number; pv: number; uv: number }> = [];
  for (let w = 0; w < 5; w++) {
    const weekDays = dailyData.slice(w * 7, (w + 1) * 7);
    if (weekDays.length > 0) {
      weeklyData.push({
        week: w + 1,
        pv: weekDays.reduce((s, d) => s + d.pv, 0),
        uv: weekDays.reduce((s, d) => s + d.uv, 0),
      });
    }
  }
  
  // 对比上月
  let compareData = null;
  if (compare) {
    const prevMonthStart = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    const prevMonthEnd = new Date(date.getFullYear(), date.getMonth(), 1);
    
    const [prevPV, prevUV] = await Promise.all([
      prisma.$queryRawUnsafe<Array<{ count: bigint }>>(
        `SELECT COUNT(*)::int as count FROM page_views 
         WHERE created_at >= $1 AND created_at < $2 AND is_owner = FALSE AND is_test = FALSE`,
        prevMonthStart, prevMonthEnd
      ),
      prisma.$queryRawUnsafe<Array<{ count: bigint }>>(
        `SELECT COUNT(DISTINCT session_id)::int as count FROM page_views 
         WHERE created_at >= $1 AND created_at < $2 AND is_owner = FALSE AND is_test = FALSE`,
        prevMonthStart, prevMonthEnd
      ),
    ]);
    
    const prevStats = {
      totalPV: Number(prevPV[0]?.count || 0),
      totalUV: Number(prevUV[0]?.count || 0),
    };
    
    compareData = {
      prevMonth: prevMonthStart.toISOString().slice(0, 7),
      prevTotalPV: prevStats.totalPV,
      prevTotalUV: prevStats.totalUV,
      pvGrowth: prevStats.totalPV > 0 ? ((stats.totalPV - prevStats.totalPV) / prevStats.totalPV * 100).toFixed(1) : null,
      uvGrowth: prevStats.totalUV > 0 ? ((stats.totalUV - prevStats.totalUV) / prevStats.totalUV * 100).toFixed(1) : null,
    };
  }
  
  return {
    view: "month",
    month: monthStart.toISOString().slice(0, 7),
    stats,
    daily: dailyData,
    weekly: weeklyData,
    compare: compareData,
  };
}

// ============================================
// 自定义范围统计
// ============================================
async function getRangeStats(startDate: Date, endDate: Date) {
  const endPlus1 = new Date(endDate);
  endPlus1.setDate(endPlus1.getDate() + 1);
  
  const days = Math.ceil((endPlus1.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  const dailyData: DailyStats[] = [];
  for (let i = 0; i < days; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    const dEnd = new Date(d);
    dEnd.setDate(dEnd.getDate() + 1);
    
    const [pv, uv] = await Promise.all([
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
    ]);
    
    dailyData.push({
      date: d.toISOString().slice(0, 10),
      pv: Number(pv[0]?.count || 0),
      uv: Number(uv[0]?.count || 0),
    } as DailyStats);
  }
  
  return {
    view: "range",
    startDate: startDate.toISOString().slice(0, 10),
    endDate: endDate.toISOString().slice(0, 10),
    stats: {
      totalPV: dailyData.reduce((s, d) => s + d.pv, 0),
      totalUV: dailyData.reduce((s, d) => s + d.uv, 0),
      avgDailyPV: Math.round(dailyData.reduce((s, d) => s + d.pv, 0) / days),
      peakPV: Math.max(...dailyData.map(d => d.pv)),
      peakDate: dailyData.find(d => d.pv === Math.max(...dailyData.map(x => x.pv)))?.date || "",
    },
    daily: dailyData,
  };
}
