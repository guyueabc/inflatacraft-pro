"use client";

import { useState, useEffect } from "react";
import {
  BarChart3,
  Eye,
  Send,
  TrendingUp,
  Users,
  Globe,
  MousePointerClick,
  RefreshCw,
} from "lucide-react";

interface StatsSummary {
  totalPV: number;
  todayPV: number;
  weekPV: number;
  monthPV: number;
  todaySubmissions: number;
  weekSubmissions: number;
  monthSubmissions: number;
  conversionRate: string;
  totalUV: number;
  todayUV: number;
  weekUV: number;
  monthUV: number;
}

interface DailyItem {
  date: string;
  pv: number;
  uv: number;
  submissions: number;
}

interface TopPage {
  page: string;
  views: number;
}

interface TopSource {
  source: string;
  count: number;
}

interface StatsData {
  summary: StatsSummary;
  dailyPV: DailyItem[];
  topPages: TopPage[];
  topSources: TopSource[];
}

interface Submission {
  id: string;
  data: any;
  ipAddress: string;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  createdAt: string;
}

export function StatsDashboard() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [partialLeads, setPartialLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const [statsRes, subsRes] = await Promise.all([
        fetch("/api/analytics/track?stats=summary"),
        fetch("/api/submit-quote?limit=50"),
        fetch("/api/analytics/partial-lead?limit=50"),
      ]);
      if (!statsRes.ok) throw new Error("数据加载失败");
      const statsData = await statsRes.json();
      setStats(statsData);
      if (subsRes.ok) {
        const subsData = await subsRes.json();
        setSubmissions(subsData.submissions || []);
      const partialRes = await fetch("/api/analytics/partial-lead?limit=50").then(r => r.json());
      setPartialLeads(partialRes.partialLeads || []);
      }
    } catch (e: any) {
      setError(e.message || "加载失败");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <RefreshCw className="h-8 w-8 animate-spin text-navy-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button onClick={fetchData} className="rounded-lg bg-navy-700 px-4 py-2 text-sm text-white hover:bg-navy-800">重试</button>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  const maxDailyPV = Math.max(...stats.dailyPV.map((d) => d.pv), 1);

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">数据分析看板</h1>
          <p className="text-sm text-gray-500">实时流量与转化追踪</p>
        </div>
        <button onClick={fetchData} className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm text-navy-700 hover:bg-gray-50">
          <RefreshCw className="h-4 w-4" /> 刷新
        </button>
      </div>

      {/* 数据卡片 - PV */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Eye} label="今日浏览量" value={stats.summary.todayPV} color="text-blue-600" bg="bg-blue-50" />
        <StatCard icon={Eye} label="本周浏览量" value={stats.summary.weekPV} color="text-indigo-600" bg="bg-indigo-50" />
        <StatCard icon={Eye} label="本月浏览量" value={stats.summary.monthPV} color="text-purple-600" bg="bg-purple-50" />
        <StatCard icon={Globe} label="累计浏览量" value={stats.summary.totalPV} color="text-navy-600" bg="bg-navy-50" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Send} label="今日询价" value={stats.summary.todaySubmissions} color="text-green-600" bg="bg-green-50" />
        <StatCard icon={Send} label="本周询价" value={stats.summary.weekSubmissions} color="text-emerald-600" bg="bg-emerald-50" />
        <StatCard icon={Send} label="本月询价" value={stats.summary.monthSubmissions} color="text-teal-600" bg="bg-teal-50" />
        <StatCard icon={TrendingUp} label="转化率" value={stats.summary.conversionRate} color="text-red-600" bg="bg-red-50" />
      </div>

      {/* 最近7天趋势 */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-navy-900">
          <BarChart3 className="h-5 w-5 text-navy-600" />
          最近 7 天数据
        </h2>
        <div className="space-y-3">
          {stats.dailyPV.map((day) => (
            <div key={day.date} className="flex items-center gap-3">
              <span className="w-24 shrink-0 text-xs text-gray-500">{day.date.slice(5)}</span>
              <div className="relative flex-1">
                <div className="h-6 w-full rounded bg-gray-100">
                  <div
                    className="h-6 rounded bg-blue-500 transition-all"
                    style={{ width: `${(day.pv / maxDailyPV) * 100}%` }}
                  />
                </div>
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-medium text-white mix-blend-difference">
                  PV: {day.pv} / UV: {day.uv}
                </span>
              </div>
              <span className="w-16 text-right text-xs text-green-600">
                {day.submissions > 0 ? `+${day.submissions} 条` : "-"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 双列表格 */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* 热门页面 */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-navy-900">
            <MousePointerClick className="h-5 w-5 text-navy-600" />
            热门页面
          </h2>
          {stats.topPages.length === 0 ? (
            <p className="text-sm text-gray-400">暂无数据</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="pb-2 text-left font-medium text-gray-500">页面</th>
                  <th className="pb-2 text-right font-medium text-gray-500">访问量</th>
                </tr>
              </thead>
              <tbody>
                {stats.topPages.map((p) => (
                  <tr key={p.page} className="border-b border-gray-50">
                    <td className="py-2 font-mono text-xs text-navy-700">{p.page}</td>
                    <td className="py-2 text-right font-semibold text-navy-900">{p.views}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* 流量来源 */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-navy-900">
            <Users className="h-5 w-5 text-navy-600" />
            流量来源
          </h2>
          {stats.topSources.length === 0 ? (
            <p className="text-sm text-gray-400">暂无数据</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="pb-2 text-left font-medium text-gray-500">来源</th>
                  <th className="pb-2 text-right font-medium text-gray-500">访问次数</th>
                </tr>
              </thead>
              <tbody>
                {stats.topSources.map((s) => (
                  <tr key={s.source} className="border-b border-gray-50">
                    <td className="py-2 text-xs text-navy-700">{s.source}</td>
                    <td className="py-2 text-right font-semibold text-navy-900">{s.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      
      {/* 未提交线索 */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-navy-900">
          <Eye className="h-5 w-5 text-orange-500" />
          未提交线索 ({partialLeads.length})
        </h2>
        {partialLeads.length === 0 ? (
          <p className="text-sm text-gray-400">暂无未提交数据 — 当访客在表单中输入邮箱或电话但未点击提交时会自动记录</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="pb-2 text-left font-medium text-gray-500">时间</th>
                  <th className="pb-2 text-left font-medium text-gray-500">邮箱</th>
                  <th className="pb-2 text-left font-medium text-gray-500">电话</th>
                  <th className="pb-2 text-left font-medium text-gray-500">产品</th>
                  <th className="pb-2 text-left font-medium text-gray-500">页面</th>
                </tr>
              </thead>
              <tbody>
                {partialLeads.map((l: any, i: number) => (
                  <tr key={i} className="border-b border-gray-50">
                    <td className="py-2 text-xs text-gray-500 whitespace-nowrap">{new Date(l.created_at).toLocaleString("zh-CN")}</td>
                    <td className="py-2 text-xs text-navy-700">{l.email || "-"}</td>
                    <td className="py-2 text-xs text-navy-700">{l.phone || "-"}</td>
                    <td className="py-2 text-xs text-navy-700">{l.product_type || "-"}</td>
                    <td className="py-2 text-xs text-navy-700">{l.page || "/"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 最近询价 */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-navy-900">
          <Send className="h-5 w-5 text-navy-600" />
          最近询价 ({submissions.length})
        </h2>
        {submissions.length === 0 ? (
          <p className="text-sm text-gray-400">暂无询价</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="pb-2 text-left font-medium text-gray-500">时间</th>
                  <th className="pb-2 text-left font-medium text-gray-500">邮箱</th>
                  <th className="pb-2 text-left font-medium text-gray-500">电话</th>
                  <th className="pb-2 text-left font-medium text-gray-500">产品</th>
                  <th className="pb-2 text-left font-medium text-gray-500">来源</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((s) => (
                  <tr key={s.id} className="border-b border-gray-50">
                    <td className="py-2 text-xs text-gray-500 whitespace-nowrap">
                      {new Date(s.createdAt).toLocaleString("zh-CN")}
                    </td>
                    <td className="py-2 text-xs text-navy-700">{s.data?.email || "-"}</td>
                    <td className="py-2 text-xs text-navy-700">{s.data?.phone || "-"}</td>
                    <td className="py-2 text-xs text-navy-700">{s.data?.productType || "-"}</td>
                    <td className="py-2 text-xs">
                      {s.utmSource ? (
                        <span className="rounded-full bg-blue-50 px-2 py-0.5 text-blue-700 whitespace-nowrap">
                          {[s.utmSource, s.utmMedium, s.utmCampaign].filter(Boolean).join(" / ")}
                        </span>
                      ) : (
                        <span className="text-gray-400">直接访问</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
  bg,
}: {
  icon: any;
  label: string;
  value: string | number;
  color: string;
  bg: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${bg}`}>
          <Icon className={`h-5 w-5 ${color}`} />
        </div>
        <div>
          <p className="text-xs text-gray-500">{label}</p>
          <p className="text-xl font-bold text-navy-900">{value}</p>
        </div>
      </div>
    </div>
  );
}