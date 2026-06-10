"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  Package,
  Palette,
  Settings,
  LogOut,
  ChevronRight,
  Clock,
  CheckCircle2,
  Wrench,
} from "lucide-react";

const SIDEBAR_LINKS = [
  {
    href: "/account",
    label: "Dashboard",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    href: "/account/quotes",
    label: "My Quotes",
    icon: FileText,
  },
  {
    href: "/account/orders",
    label: "My Orders",
    icon: Package,
  },
  {
    href: "/account/design-review",
    label: "Design Review",
    icon: Palette,
  },
  {
    href: "/account/settings",
    label: "Settings",
    icon: Settings,
  },
];

const STATS = [
  {
    label: "Active Quotes",
    value: 3,
    icon: FileText,
    color: "bg-blue-50 text-blue-700",
    href: "/account/quotes",
  },
  {
    label: "Orders in Progress",
    value: 2,
    icon: Wrench,
    color: "bg-amber-50 text-amber-700",
    href: "/account/orders",
  },
  {
    label: "Completed Orders",
    value: 12,
    icon: CheckCircle2,
    color: "bg-green-50 text-green-700",
    href: "/account/orders",
  },
];

const RECENT_ACTIVITY = [
  {
    id: "Q-2024-0042",
    type: "quote",
    title: "Giant Product Replica — Coffee Cup",
    status: "reviewed",
    date: "Jun 8, 2026",
  },
  {
    id: "Q-2024-0038",
    type: "quote",
    title: "Inflatable Mascot — Eagle Character",
    status: "quoted",
    date: "Jun 5, 2026",
  },
  {
    id: "ORD-2024-0015",
    type: "order",
    title: "Custom Arch — Finish Line",
    status: "in_production",
    date: "May 28, 2026",
  },
];

const STATUS_COLORS: Record<string, string> = {
  draft: "bg-gray-100 text-gray-700",
  submitted: "bg-blue-100 text-blue-700",
  reviewed: "bg-purple-100 text-purple-700",
  quoted: "bg-amber-100 text-amber-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  in_production: "bg-indigo-100 text-indigo-700",
};

export default function AccountPage() {
  const pathname = usePathname();

  return (
    <div className="min-h-[calc(100vh-200px)] bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <nav className="rounded-xl border border-navy-200 bg-white p-3 shadow-sm lg:sticky lg:top-24">
              <div className="px-3 py-4 border-b border-navy-100 mb-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Account
                </p>
                <p className="mt-1 font-heading text-lg font-bold text-navy-900">
                  Hello, Alex
                </p>
                <p className="text-sm text-gray-500">alex@acmecorp.com</p>
              </div>

              <ul className="space-y-1">
                {SIDEBAR_LINKS.map((link) => {
                  const isActive =
                    link.exact
                      ? pathname === link.href
                      : pathname.startsWith(link.href);

                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                          isActive
                            ? "bg-red-600 text-white"
                            : "text-navy-700 hover:bg-navy-50 hover:text-navy-900"
                        )}
                      >
                        <link.icon className="h-4 w-4" />
                        {link.label}
                        {isActive && (
                          <ChevronRight className="ml-auto h-4 w-4" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-4 pt-4 border-t border-navy-100">
                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-500 transition-all hover:bg-red-50 hover:text-red-600"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Welcome */}
            <div className="mb-8">
              <h1 className="font-heading text-2xl font-bold text-navy-900">
                Welcome back, Alex
              </h1>
              <p className="mt-1 text-gray-600">
                Here&apos;s what&apos;s happening with your inflatable projects.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 sm:grid-cols-3 mb-8">
              {STATS.map((stat) => (
                <Link
                  key={stat.label}
                  href={stat.href}
                  className="rounded-xl border border-navy-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-navy-400"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-lg",
                        stat.color
                      )}
                    >
                      <stat.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-navy-900">
                        {stat.value}
                      </p>
                      <p className="text-xs text-gray-500">{stat.label}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="rounded-xl border border-navy-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-navy-100 px-6 py-4">
                <h2 className="font-heading text-lg font-bold text-navy-900">
                  Recent Activity
                </h2>
                <Link
                  href="/account/quotes"
                  className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                >
                  View all
                </Link>
              </div>
              <div className="divide-y divide-navy-100">
                {RECENT_ACTIVITY.map((item) => (
                  <Link
                    key={item.id}
                    href={
                      item.type === "quote"
                        ? "/account/quotes"
                        : "/account/orders"
                    }
                    className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-navy-50"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={cn(
                          "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md text-xs font-bold",
                          item.type === "quote"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-green-50 text-green-700"
                        )}
                      >
                        {item.type === "quote" ? "Q" : "O"}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-navy-800 truncate">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-400">
                          {item.id} · {item.date}
                        </p>
                      </div>
                    </div>
                    <span
                      className={cn(
                        "flex-shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ml-3",
                        STATUS_COLORS[item.status]
                      )}
                    >
                      {item.status.replace("_", " ")}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Link
                href="/get-quote"
                className="flex items-center gap-4 rounded-xl border-2 border-dashed border-navy-300 bg-white p-5 transition-all hover:border-red-500 hover:bg-red-50/30"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-600">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-800">
                    Request a New Quote
                  </h3>
                  <p className="text-sm text-gray-500">
                    Get pricing for your custom inflatable project
                  </p>
                </div>
              </Link>
              <Link
                href="/gallery"
                className="flex items-center gap-4 rounded-xl border-2 border-dashed border-navy-300 bg-white p-5 transition-all hover:border-red-500 hover:bg-red-50/30"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy-700">
                  <Palette className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-800">
                    Browse Gallery
                  </h3>
                  <p className="text-sm text-gray-500">
                    Get inspired by our past projects
                  </p>
                </div>
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
