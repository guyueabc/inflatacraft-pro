import type { Metadata } from "next";
import { StatsDashboard } from "./stats-dashboard";

export const metadata: Metadata = {
  title: "数据分析看板 | InflatableModel",
  robots: { index: false, follow: false },
};

export default function AdminStatsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部栏 */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto max-w-7xl flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
            <span className="text-sm font-medium text-navy-700">管理后台</span>
          </div>
          <form action="/api/admin/logout" method="POST">
            <button type="submit" className="rounded-lg border border-gray-200 px-4 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 hover:text-red-600 transition-colors">
              退出登录
            </button>
          </form>
        </div>
      </div>
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <StatsDashboard />
      </div>
    </div>
  );
}