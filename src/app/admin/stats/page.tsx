import type { Metadata } from "next";
import { StatsDashboard } from "./stats-dashboard";

export const metadata: Metadata = {
  title: "数据分析看板 | InflatableModel",
  robots: { index: false, follow: false },
};

export default function AdminStatsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* 顶部栏 */}
      <div className="border-b border-gray-200 bg-white shadow-sm">
        <div className="container mx-auto max-w-7xl flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-700 text-xs font-bold text-white">
              IP
            </div>
            <span className="text-sm font-semibold text-navy-700">inflatablemodel 管理后台</span>
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50"
            >
              访问网站
            </a>
            <form action="/api/admin/logout" method="POST">
              <button
                type="submit"
                className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
              >
                退出登录
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="container mx-auto max-w-7xl px-4 py-6">
        <StatsDashboard />
      </div>
    </div>
  );
}
