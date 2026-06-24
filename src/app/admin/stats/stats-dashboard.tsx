"use client";

import { useState, useEffect } from "react";
import {
  BarChart3, Eye, Send, TrendingUp, Users, Globe, MousePointerClick,
  RefreshCw, Download, Mail, Phone, Building, Calendar, DollarSign,
  Package, MessageSquare, MapPin, Clock, ShieldCheck, AlertCircle,
} from "lucide-react";

// ============================================
// Types
// ============================================
interface TrafficStats {
  traffic: {
    today: {
      adsPV: number; organicPV: number; socialPV: number; referralPV: number; directPV: number;
      adsUV: number; organicUV: number; socialUV: number; referralUV: number; directUV: number;
      totalPV: number; totalUV: number;
      adsVisitors: number; organicVisitors: number; totalVisitors: number;
    };
  };
  daily: Array<{
    date: string; totalPV: number; totalUV: number;
    adsPV: number; adsUV: number; organicPV: number; organicUV: number;
  }>;
  topPages: Array<{ page: string; views: number }>;
  sources: Array<{ source: string; type: string; count: number }>;
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
  const [trafficStats, setTrafficStats] = useState<TrafficStats | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [partialLeads, setPartialLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTab, setSelectedTab] = useState<"traffic" | "submissions" | "leads">("traffic");
  const [expandedSubmission, setExpandedSubmission] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const [trafficRes, subsRes, partialRes] = await Promise.all([
        fetch("/api/analytics/track?stats=summary"),
        fetch("/api/submit-quote?limit=100"),
        fetch("/api/analytics/partial-lead?limit=100"),
      ]);
      if (!trafficRes.ok) throw new Error("数据加载失败");
      const tData = await trafficRes.json();
      setTrafficStats(tData);
      if (subsRes.ok) {
        const subsData = await subsRes.json();
        setSubmissions(subsData.submissions || []);
      }
      const partialData = await partialRes.json();
      setPartialLeads(partialData.partialLeads || []);
    } catch (e: any) {
      setError(e.message || "加载失败");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const exportCSV = () => {
    const headers = ["时间", "姓名", "邮箱", "电话", "公司", "产品类型", "数量", "预算", "截止日期", "描述", "IP", "来源"];
    const rows = submissions.map((s) => [
      new Date(s.createdAt).toLocaleString("zh-CN"),
      s.data?.name || "", s.data?.email || "", s.data?.phone || "",
      s.data?.company || "", s.data?.productType || "",
      s.data?.quantity || "", s.data?.budgetRange || "",
      s.data?.deadline || "", (s.data?.description || "").replace(/"/g, '""'),
      s.ipAddress || "",
      [s.utmSource, s.utmMedium, s.utmCampaign].filter(Boolean).join(" / ") || "直接访问",
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `询价列表_${new Date().toISOString().slice(0, 10)}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    const diff = Date.now() - d.getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (mins < 1) return "刚刚";
    if (mins < 60) return `${mins}分钟前`;
    if (hours < 24) return `${hours}小时前`;
    if (days < 7) return `${days}天前`;
    return d.toLocaleDateString("zh-CN");
  };

  if (loading) return <div className="flex min-h-[60vh] items-center justify-center"><RefreshCw className="h-8 w-8 animate-spin text-navy-400" /></div>;
  if (error) return <div className="flex min-h-[60vh] items-center justify-center"><div className="text-center"><p className="text-red-500 mb-4">{error}</p><button onClick={fetchData} className="rounded-lg bg-navy-700 px-4 py-2 text-sm text-white hover:bg-navy-800">重试</button></div></div>;
  if (!trafficStats) return null;

  const t = trafficStats.traffic.today;

  return (
    <div className="space-y-6">
      {/* 标题 */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">流量分析看板</h1>
          <p className="text-sm text-gray-500">已自动排除站长和测试流量</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={exportCSV} className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm text-navy-700 hover:bg-gray-50"><Download className="h-4 w-4" /> 导出CSV</button>
          <button onClick={fetchData} className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm text-navy-700 hover:bg-gray-50"><RefreshCw className="h-4 w-4" /> 刷新</button>
        </div>
      </div>

      {/* Tab */}
      <div className="flex gap-2 border-b border-gray-200">
        {([["traffic", "流量分析"], ["submissions", `询价管理 (${submissions.length})`], ["leads", `未提交线索 (${partialLeads.length})`]] as const).map(([key, label]) => (
          <button key={key} onClick={() => setSelectedTab(key)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${selectedTab === key ? "border-navy-600 text-navy-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
            {label}
          </button>
        ))}
      </div>

      {/* =========== 流量分析 Tab =========== */}
      {selectedTab === "traffic" && (
        <div className="space-y-6">
          {/* 核心指标卡 */}
          <div className="grid gap-4 sm:grid-cols-3">
            {/* 广告流量 */}
            <div className="rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-50/50 p-5">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100"><Globe className="h-5 w-5 text-blue-600" /></div>
                <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs font-bold text-white">ADS</span>
              </div>
              <p className="mt-3 text-xs text-blue-600">广告流量访客</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-blue-700">{t.adsVisitors}</p>
                <p className="text-sm text-blue-400">访客</p>
              </div>
              <div className="mt-2 flex gap-4 text-xs text-blue-500">
                <span>PV: {t.adsPV}</span>
                <span>UV: {t.adsUV}</span>
              </div>
            </div>

            {/* 自然流量 */}
            <div className="rounded-xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-green-50/50 p-5">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100"><TrendingUp className="h-5 w-5 text-green-600" /></div>
                <span className="rounded-full bg-green-600 px-2 py-0.5 text-xs font-bold text-white">ORGANIC</span>
              </div>
              <p className="mt-3 text-xs text-green-600">自然流量访客</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-green-700">{t.organicVisitors}</p>
                <p className="text-sm text-green-400">访客</p>
              </div>
              <div className="mt-2 flex gap-4 text-xs text-green-500">
                <span>PV: {t.organicPV}</span>
                <span>UV: {t.organicUV}</span>
              </div>
            </div>

            {/* 总访客 */}
            <div className="rounded-xl border-2 border-navy-200 bg-gradient-to-br from-navy-50 to-navy-50/50 p-5">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-100"><Users className="h-5 w-5 text-navy-600" /></div>
                <span className="rounded-full bg-navy-600 px-2 py-0.5 text-xs font-bold text-white">TOTAL</span>
              </div>
              <p className="mt-3 text-xs text-navy-600">总访客 (真实)</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-navy-700">{t.totalVisitors}</p>
                <p className="text-sm text-navy-400">访客</p>
              </div>
              <div className="mt-2 flex gap-4 text-xs text-navy-500">
                <span>PV: {t.totalPV}</span>
                <span>UV: {t.totalUV}</span>
              </div>
            </div>
          </div>

          {/* 过滤提示 */}
          <div className="flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 px-4 py-2.5 text-xs text-green-700">
            <ShieldCheck className="h-4 w-4 shrink-0" />
            <span>已自动过滤：站长IP、测试IP、内网IP — 以下数据均为真实访客</span>
          </div>

          {/* 流量来源明细 */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-navy-900">
              <BarChart3 className="h-5 w-5 text-navy-600" />
              今日流量来源明细
            </h2>
            <div className="space-y-3">
              <TrafficBar label="广告流量 (Google Ads)" pv={t.adsPV} uv={t.adsUV} total={t.totalPV} color="bg-blue-500" badge="ADS" badgeColor="bg-blue-100 text-blue-700" />
              <TrafficBar label="自然搜索 (Organic)" pv={t.organicPV} uv={t.organicUV} total={t.totalPV} color="bg-green-500" badge="ORGANIC" badgeColor="bg-green-100 text-green-700" />
              <TrafficBar label="社交媒体 (Social)" pv={t.socialPV} uv={t.socialUV} total={t.totalPV} color="bg-purple-500" badge="SOCIAL" badgeColor="bg-purple-100 text-purple-700" />
              <TrafficBar label="引荐流量 (Referral)" pv={t.referralPV} uv={t.referralUV} total={t.totalPV} color="bg-orange-500" badge="REFERRAL" badgeColor="bg-orange-100 text-orange-700" />
              <TrafficBar label="直接访问 (Direct)" pv={t.directPV} uv={t.directUV} total={t.totalPV} color="bg-gray-400" badge="DIRECT" badgeColor="bg-gray-100 text-gray-700" />
            </div>
          </div>

          {/* 7天趋势 */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-navy-900">
              <Clock className="h-5 w-5 text-navy-600" />
              最近 7 天趋势
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-xs text-gray-500">
                    <th className="pb-2 text-left">日期</th>
                    <th className="pb-2 text-right">总PV</th>
                    <th className="pb-2 text-right">总UV</th>
                    <th className="pb-2 text-right text-blue-600">广告PV</th>
                    <th className="pb-2 text-right text-blue-600">广告UV</th>
                    <th className="pb-2 text-right text-green-600">自然PV</th>
                    <th className="pb-2 text-right text-green-600">自然UV</th>
                  </tr>
                </thead>
                <tbody>
                  {trafficStats.daily.map((d) => (
                    <tr key={d.date} className="border-b border-gray-50">
                      <td className="py-2 text-xs text-gray-600">{d.date.slice(5)}</td>
                      <td className="py-2 text-right font-semibold text-navy-900">{d.totalPV}</td>
                      <td className="py-2 text-right text-gray-700">{d.totalUV}</td>
                      <td className="py-2 text-right text-blue-600">{d.adsPV}</td>
                      <td className="py-2 text-right text-blue-400">{d.adsUV}</td>
                      <td className="py-2 text-right text-green-600">{d.organicPV}</td>
                      <td className="py-2 text-right text-green-400">{d.organicUV}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 热门页面 + 流量来源 */}
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-navy-900">
                <MousePointerClick className="h-5 w-5 text-navy-600" />
                今日热门页面
              </h2>
              {trafficStats.topPages.length === 0 ? (
                <p className="text-sm text-gray-400">暂无数据</p>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="pb-2 text-left font-medium text-gray-500">#</th>
                      <th className="pb-2 text-left font-medium text-gray-500">页面</th>
                      <th className="pb-2 text-right font-medium text-gray-500">访问量</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trafficStats.topPages.map((p, i) => (
                      <tr key={p.page} className="border-b border-gray-50">
                        <td className="py-2 text-xs text-gray-400">{i + 1}</td>
                        <td className="py-2"><a href={p.page} target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-navy-700 hover:text-red-600">{p.page}</a></td>
                        <td className="py-2 text-right font-semibold text-navy-900">{p.views}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-navy-900">
                <Globe className="h-5 w-5 text-navy-600" />
                今日来源明细
              </h2>
              {trafficStats.sources.length === 0 ? (
                <p className="text-sm text-gray-400">暂无数据</p>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="pb-2 text-left font-medium text-gray-500">来源</th>
                      <th className="pb-2 text-left font-medium text-gray-500">类型</th>
                      <th className="pb-2 text-right font-medium text-gray-500">次数</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trafficStats.sources.map((s, i) => (
                      <tr key={i} className="border-b border-gray-50">
                        <td className="py-2 text-xs text-navy-700">{s.source || "direct"}</td>
                        <td className="py-2">
                          <span className={`rounded-full px-2 py-0.5 text-xs ${
                            s.type === "ads" ? "bg-blue-50 text-blue-700" :
                            s.type === "organic" ? "bg-green-50 text-green-700" :
                            s.type === "social" ? "bg-purple-50 text-purple-700" :
                            s.type === "referral" ? "bg-orange-50 text-orange-700" :
                            "bg-gray-50 text-gray-700"
                          }`}>{s.type}</span>
                        </td>
                        <td className="py-2 text-right font-semibold text-navy-900">{s.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========== 询价管理 Tab =========== */}
      {selectedTab === "submissions" && (
        <div className="space-y-4">
          {submissions.length === 0 ? (
            <div className="rounded-xl border border-gray-200 bg-white p-12 text-center"><Send className="mx-auto h-12 w-12 text-gray-300" /><p className="mt-4 text-gray-500">暂无询价</p></div>
          ) : (
            submissions.map((s) => (
              <div key={s.id} className="rounded-xl border border-gray-200 bg-white overflow-hidden transition-all hover:border-gray-300">
                <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => setExpandedSubmission(expandedSubmission === s.id ? null : s.id)}>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100"><Send className="h-5 w-5 text-green-600" /></div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-navy-900">{s.data?.name || "未填写姓名"}</span>
                        <span className="text-xs text-gray-400">{formatTime(s.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        {s.data?.email && <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{s.data.email}</span>}
                        {s.data?.phone && <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{s.data.phone}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {s.utmSource && <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-700">{s.utmSource} / {s.utmMedium}</span>}
                    <span className={`text-gray-400 transition-transform ${expandedSubmission === s.id ? "rotate-180" : ""}`}>▼</span>
                  </div>
                </div>
                {expandedSubmission === s.id && (
                  <div className="border-t border-gray-100 bg-gray-50 p-4">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <DetailItem icon={Building} label="公司" value={s.data?.company} />
                      <DetailItem icon={Package} label="产品类型" value={s.data?.productType} />
                      <DetailItem icon={DollarSign} label="预算范围" value={s.data?.budgetRange} />
                      <DetailItem icon={Calendar} label="截止日期" value={s.data?.deadline} />
                      <DetailItem icon={MapPin} label="IP地址" value={s.ipAddress} />
                    </div>
                    {s.data?.description && (
                      <div className="mt-4 rounded-lg bg-white p-3 border border-gray-200">
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-1"><MessageSquare className="h-3 w-3" />项目描述</div>
                        <p className="text-sm text-gray-700">{s.data.description}</p>
                      </div>
                    )}
                    <div className="mt-4 flex gap-2">
                      <a href={`mailto:${s.data?.email}`} className="inline-flex items-center gap-1 rounded-lg bg-navy-600 px-3 py-1.5 text-xs text-white hover:bg-navy-700"><Mail className="h-3 w-3" /> 发送邮件</a>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* =========== 未提交线索 Tab =========== */}
      {selectedTab === "leads" && (
        <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
          <div className="border-b border-gray-100 bg-orange-50 p-4">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-orange-500" />
              <span className="font-medium text-orange-700">未提交线索</span>
              <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs text-orange-600">{partialLeads.length} 条</span>
            </div>
            <p className="mt-1 text-xs text-orange-600">访客在表单中输入邮箱或电话但未点击提交时自动记录</p>
          </div>
          {partialLeads.length === 0 ? (
            <div className="p-12 text-center text-gray-400 text-sm">暂无数据</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-gray-500">时间</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500">邮箱</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500">电话</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500">姓名</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500">产品</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500">页面</th>
                  </tr>
                </thead>
                <tbody>
                  {partialLeads.map((l: any) => (
                    <tr key={l.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{formatTime(l.created_at)}</td>
                      <td className="px-4 py-3">{l.email ? <a href={`mailto:${l.email}`} className="text-xs text-blue-600 hover:underline">{l.email}</a> : <span className="text-xs text-gray-400">-</span>}</td>
                      <td className="px-4 py-3 text-xs text-navy-700">{l.phone || "-"}</td>
                      <td className="px-4 py-3 text-xs text-navy-700">{l.name || "-"}</td>
                      <td className="px-4 py-3 text-xs text-navy-700">{l.product_type || "-"}</td>
                      <td className="px-4 py-3 text-xs text-navy-600">{l.page || "/"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================
// Sub-components
// ============================================
function TrafficBar({ label, pv, uv, total, color, badge, badgeColor }: {
  label: string; pv: number; uv: number; total: number;
  color: string; badge: string; badgeColor: string;
}) {
  const pct = total > 0 ? (pv / total) * 100 : 0;
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${badgeColor}`}>{badge}</span>
          <span className="text-sm text-gray-700">{label}</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span>PV: <strong className="text-gray-700">{pv}</strong></span>
          <span>UV: <strong className="text-gray-700">{uv}</strong></span>
          <span className="text-gray-400">{pct.toFixed(1)}%</span>
        </div>
      </div>
      <div className="h-7 w-full rounded-lg bg-gray-100 overflow-hidden">
        <div className={`h-full rounded-lg ${color} transition-all flex items-center justify-end pr-2`} style={{ width: `${Math.max(pct, pv > 0 ? 5 : 0)}%` }}>
          {pct > 10 && <span className="text-xs font-bold text-white">{pv}</span>}
        </div>
      </div>
    </div>
  );
}

function DetailItem({ icon: Icon, label, value }: { icon: any; label: string; value?: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-gray-400" />
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm text-navy-700">{value || "-"}</p>
      </div>
    </div>
  );
}
