"use client";

import { useState, useEffect, useCallback } from "react";
import {
  RefreshCw, Calendar, ChevronLeft, ChevronRight, TrendingUp, TrendingDown,
  Users, Eye, Globe, BarChart3, ArrowUpRight, ArrowDownRight, Minus,
} from "lucide-react";

// ============================================
// Types
// ============================================
interface DailyStats {
  date: string;
  pv: number;
  uv: number;
  adsPV?: number;
  organicPV?: number;
}

interface TrafficData {
  view: string;
  date?: string;
  weekStart?: string;
  month?: string;
  stats: {
    totalPV: number;
    totalUV: number;
    avgDailyPV?: number;
    peakPV?: number;
    peakDate?: string;
    pv?: number;
    uv?: number;
    adsPV?: number;
    organicPV?: number;
  };
  daily?: DailyStats[];
  hourly?: Array<{ hour: number; pv: number }>;
  weekly?: Array<{ week: number; pv: number; uv: number }>;
  compare?: {
    pvGrowth?: string | null;
    uvGrowth?: string | null;
    prevTotalPV?: number;
    prevTotalUV?: number;
    prevPV?: number;
    prevUV?: number;
    prevDaily?: DailyStats[];
  };
}

// ============================================
// Main Component
// ============================================
export function TrafficAnalysis() {
  const [view, setView] = useState<"day" | "week" | "month">("day");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [showCompare, setShowCompare] = useState(false);
  const [data, setData] = useState<TrafficData | null>(null);
  const [loading, setLoading] = useState(true);
  const [chartHover, setChartHover] = useState<{ index: number; x: number; y: number } | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        view,
        date: selectedDate,
        compare: showCompare.toString(),
      });
      const res = await fetch(`/api/analytics/traffic?${params}`);
      const json = await res.json();
      setData(json);
    } catch (e) {
      console.error("Traffic fetch error:", e);
    } finally {
      setLoading(false);
    }
  }, [view, selectedDate, showCompare]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 日期导航
  const navigateDate = (direction: "prev" | "next") => {
    const d = new Date(selectedDate);
    if (view === "day") {
      d.setDate(d.getDate() + (direction === "next" ? 1 : -1));
    } else if (view === "week") {
      d.setDate(d.getDate() + (direction === "next" ? 7 : -7));
    } else {
      d.setMonth(d.getMonth() + (direction === "next" ? 1 : -1));
    }
    setSelectedDate(d.toISOString().slice(0, 10));
  };

  const goToToday = () => {
    setSelectedDate(new Date().toISOString().slice(0, 10));
  };

  // 图表配置
  const getChartData = () => {
    if (!data?.daily) return [];
    return data.daily;
  };

  const maxPV = Math.max(...getChartData().map(d => d.pv), 1);

  return (
    <div className="space-y-6">
      {/* 控制栏 */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* 左侧：视图切换 */}
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-gray-200 bg-white p-1">
            {(["day", "week", "month"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                  view === v
                    ? "bg-navy-700 text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {v === "day" ? "按日" : v === "week" ? "按周" : "按月"}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setShowCompare(!showCompare)}
            className={`ml-2 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
              showCompare
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-gray-200 bg-white text-gray-600 hover:text-gray-900"
            }`}
          >
            对比分析
          </button>
        </div>

        {/* 右侧：日期导航 */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateDate("prev")}
            className="rounded-lg border border-gray-200 bg-white p-2 hover:bg-gray-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          
          <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5">
            <Calendar className="h-4 w-4 text-gray-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="text-sm font-medium text-gray-900 outline-none"
            />
          </div>
          
          <button
            onClick={() => navigateDate("next")}
            className="rounded-lg border border-gray-200 bg-white p-2 hover:bg-gray-50"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          
          <button
            onClick={goToToday}
            className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            今天
          </button>
          
          <button
            onClick={fetchData}
            className="rounded-lg border border-gray-200 bg-white p-2 hover:bg-gray-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* 日期标题 */}
      <div className="rounded-lg bg-gradient-to-r from-navy-800 to-navy-700 px-6 py-4 text-white">
        <h2 className="text-lg font-semibold">
          {view === "day" && `${selectedDate} 流量报告`}
          {view === "week" && data?.weekStart && `${data.weekStart} 起 本周流量报告`}
          {view === "month" && data?.month && `${data.month} 月流量报告`}
        </h2>
        <p className="mt-1 text-sm text-navy-300">
          {view === "day" && "当日24小时流量分析"}
          {view === "week" && "周一至周日完整数据"}
          {view === "month" && "整月数据汇总与趋势"}
        </p>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      ) : data ? (
        <>
          {/* 核心指标卡 */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              icon={Eye}
              label="总访问量 (PV)"
              value={data.stats.totalPV || data.stats.pv || 0}
              growth={data.compare?.pvGrowth}
              prevValue={data.compare?.prevTotalPV || data.compare?.prevPV}
              color="blue"
            />
            <MetricCard
              icon={Users}
              label="独立访客 (UV)"
              value={data.stats.totalUV || data.stats.uv || 0}
              growth={data.compare?.uvGrowth}
              prevValue={data.compare?.prevTotalUV || data.compare?.prevUV}
              color="green"
            />
            {data.stats.avgDailyPV !== undefined && (
              <MetricCard
                icon={BarChart3}
                label="日均访问量"
                value={data.stats.avgDailyPV}
                color="purple"
              />
            )}
            {data.stats.peakPV !== undefined && (
              <MetricCard
                icon={TrendingUp}
                label="峰值访问量"
                value={data.stats.peakPV}
                subLabel={data.stats.peakDate}
                color="orange"
              />
            )}
            {data.stats.adsPV !== undefined && (
              <MetricCard
                icon={Globe}
                label="广告流量 PV"
                value={data.stats.adsPV}
                color="blue"
              />
            )}
            {data.stats.organicPV !== undefined && (
              <MetricCard
                icon={TrendingUp}
                label="自然流量 PV"
                value={data.stats.organicPV}
                color="green"
              />
            )}
          </div>

          {/* 折线图 */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold text-navy-900">
              {view === "day" ? "24小时流量分布" : view === "week" ? "每日流量趋势" : "每日流量趋势"}
            </h3>
            <div className="relative h-64">
              {/* Y轴 */}
              <div className="absolute left-0 top-0 h-full w-12 flex flex-col justify-between text-xs text-gray-400">
                <span>{maxPV}</span>
                <span>{Math.round(maxPV * 0.75)}</span>
                <span>{Math.round(maxPV * 0.5)}</span>
                <span>{Math.round(maxPV * 0.25)}</span>
                <span>0</span>
              </div>
              
              {/* 图表区域 */}
              <div className="ml-14 h-full">
                {/* 网格线 */}
                <div className="absolute inset-0 ml-14 flex flex-col justify-between pointer-events-none">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-px w-full bg-gray-100" />
                  ))}
                </div>
                
                {/* SVG 图表 */}
                <svg className="h-full w-full overflow-visible">
                  {/* 折线 */}
                  <path
                    d={getChartData()
                      .map((d, i) => {
                        const x = (i / Math.max(getChartData().length - 1, 1)) * 100;
                        const y = 100 - (d.pv / maxPV) * 100;
                        return `${i === 0 ? "M" : "L"} ${x}% ${y}%`;
                      })
                      .join(" ")}
                    fill="none"
                    stroke="rgb(37, 99, 235)"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                  />
                  
                  {/* 渐变填充 */}
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgb(37, 99, 235)" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="rgb(37, 99, 235)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d={
                      getChartData()
                        .map((d, i) => {
                          const x = (i / Math.max(getChartData().length - 1, 1)) * 100;
                          const y = 100 - (d.pv / maxPV) * 100;
                          return `${i === 0 ? "M" : "L"} ${x}% ${y}%`;
                        })
                        .join(" ") + " L 100% 100% L 0% 100% Z"
                    }
                    fill="url(#gradient)"
                  />
                  
                  {/* 数据点 */}
                  {getChartData().map((d, i) => {
                    const x = (i / Math.max(getChartData().length - 1, 1)) * 100;
                    const y = 100 - (d.pv / maxPV) * 100;
                    return (
                      <g key={i}>
                        <circle
                          cx={`${x}%`}
                          cy={`${y}%`}
                          r={chartHover?.index === i ? 6 : 4}
                          fill="rgb(37, 99, 235)"
                          stroke="white"
                          strokeWidth="2"
                          className="cursor-pointer transition-all"
                          onMouseEnter={(e) => {
                            const rect = e.currentTarget.ownerSVGElement?.getBoundingClientRect();
                            if (rect) {
                              setChartHover({
                                index: i,
                                x: (rect.width * x) / 100,
                                y: (rect.height * y) / 100,
                              });
                            }
                          }}
                          onMouseLeave={() => setChartHover(null)}
                        />
                      </g>
                    );
                  })}
                </svg>
                
                {/* 悬浮提示 */}
                {chartHover !== null && getChartData()[chartHover.index] && (
                  <div
                    className="pointer-events-none absolute z-10 rounded-lg bg-navy-900 px-3 py-2 text-xs text-white shadow-lg"
                    style={{
                      left: chartHover.x,
                      top: chartHover.y - 50,
                      transform: "translateX(-50%)",
                    }}
                  >
                    <div className="font-medium">{getChartData()[chartHover.index].date}</div>
                    <div className="mt-1">
                      PV: <strong>{getChartData()[chartHover.index].pv}</strong>
                    </div>
                    <div>
                      UV: <strong>{getChartData()[chartHover.index].uv}</strong>
                    </div>
                  </div>
                )}
              </div>
              
              {/* X轴标签 */}
              <div className="mt-2 flex justify-between text-xs text-gray-400">
                {getChartData()
                  .filter((_, i) => i % Math.ceil(getChartData().length / 7) === 0 || i === getChartData().length - 1)
                  .map((d, i) => (
                    <span key={i}>{d.date.slice(5)}</span>
                  ))}
              </div>
            </div>
          </div>

          {/* 对比数据 */}
          {showCompare && data.compare && (
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
              <h3 className="mb-4 text-lg font-semibold text-blue-900">
                对比分析
              </h3>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-blue-700">访问量 (PV)</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-2xl font-bold text-blue-900">{data.stats.totalPV || data.stats.pv}</span>
                    {data.compare.pvGrowth !== null && (
                      <span className={`flex items-center gap-1 text-sm font-medium ${
                        parseFloat(data.compare.pvGrowth) >= 0 ? "text-green-600" : "text-red-600"
                      }`}>
                        {parseFloat(data.compare.pvGrowth) >= 0 ? (
                          <ArrowUpRight className="h-4 w-4" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4" />
                        )}
                        {Math.abs(parseFloat(data.compare.pvGrowth))}%
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-blue-600">
                    上期: {data.compare.prevTotalPV || data.compare.prevPV || 0}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-blue-700">独立访客 (UV)</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-2xl font-bold text-blue-900">{data.stats.totalUV || data.stats.uv}</span>
                    {data.compare.uvGrowth !== null && (
                      <span className={`flex items-center gap-1 text-sm font-medium ${
                        parseFloat(data.compare.uvGrowth) >= 0 ? "text-green-600" : "text-red-600"
                      }`}>
                        {parseFloat(data.compare.uvGrowth) >= 0 ? (
                          <ArrowUpRight className="h-4 w-4" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4" />
                        )}
                        {Math.abs(parseFloat(data.compare.uvGrowth))}%
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-blue-600">
                    上期: {data.compare.prevTotalUV || data.compare.prevUV || 0}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 详细数据表格 */}
          <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
            <div className="border-b border-gray-100 bg-gray-50 px-6 py-3">
              <h3 className="font-semibold text-gray-900">详细数据</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-xs text-gray-500">
                    <th className="px-6 py-3 text-left font-medium">日期</th>
                    <th className="px-6 py-3 text-right font-medium">PV</th>
                    <th className="px-6 py-3 text-right font-medium">UV</th>
                    {data.daily?.[0]?.adsPV !== undefined && (
                      <th className="px-6 py-3 text-right font-medium text-blue-600">广告PV</th>
                    )}
                    {data.daily?.[0]?.organicPV !== undefined && (
                      <th className="px-6 py-3 text-right font-medium text-green-600">自然PV</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {getChartData().map((d, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-6 py-3 text-gray-900">{d.date}</td>
                      <td className="px-6 py-3 text-right font-medium text-gray-900">{d.pv}</td>
                      <td className="px-6 py-3 text-right text-gray-700">{d.uv}</td>
                      {d.adsPV !== undefined && (
                        <td className="px-6 py-3 text-right text-blue-600">{d.adsPV}</td>
                      )}
                      {d.organicPV !== undefined && (
                        <td className="px-6 py-3 text-right text-green-600">{d.organicPV}</td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

// ============================================
// Metric Card Component
// ============================================
function MetricCard({
  icon: Icon,
  label,
  value,
  growth,
  prevValue,
  subLabel,
  color,
}: {
  icon: any;
  label: string;
  value: number;
  growth?: string | null;
  prevValue?: number;
  subLabel?: string;
  color: "blue" | "green" | "purple" | "orange";
}) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    green: "bg-green-50 text-green-600 border-green-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100",
    orange: "bg-orange-50 text-orange-600 border-orange-100",
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg border ${colorClasses[color]}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <p className="text-xs text-gray-500">{label}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold text-gray-900">{value.toLocaleString()}</p>
            {growth !== undefined && growth !== null && (
              <span className={`flex items-center gap-0.5 text-xs font-medium ${
                parseFloat(growth) >= 0 ? "text-green-600" : "text-red-600"
              }`}>
                {parseFloat(growth) >= 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {Math.abs(parseFloat(growth))}%
              </span>
            )}
          </div>
          {subLabel && <p className="text-xs text-gray-400 mt-0.5">{subLabel}</p>}
        </div>
      </div>
    </div>
  );
}
