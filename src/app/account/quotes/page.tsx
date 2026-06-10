"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  FileText,
  ExternalLink,
  PlusCircle,
  LayoutDashboard,
  Package,
  Palette,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

type QuoteStatus =
  | "draft"
  | "submitted"
  | "reviewed"
  | "quoted"
  | "approved"
  | "rejected"
  | "in_production";

interface Quote {
  id: string;
  title: string;
  productType: string;
  status: QuoteStatus;
  createdAt: string;
  updatedAt: string;
  estimatedCost?: string;
}

const STATUS_CONFIG: Record<
  QuoteStatus,
  { label: string; color: string; step: number }
> = {
  draft: {
    label: "Draft",
    color: "bg-gray-100 text-gray-700 border-gray-300",
    step: 1,
  },
  submitted: {
    label: "Submitted",
    color: "bg-blue-100 text-blue-700 border-blue-300",
    step: 2,
  },
  reviewed: {
    label: "Reviewed",
    color: "bg-purple-100 text-purple-700 border-purple-300",
    step: 3,
  },
  quoted: {
    label: "Quoted",
    color: "bg-amber-100 text-amber-700 border-amber-300",
    step: 4,
  },
  approved: {
    label: "Approved",
    color: "bg-green-100 text-green-700 border-green-300",
    step: 5,
  },
  rejected: {
    label: "Rejected",
    color: "bg-red-100 text-red-700 border-red-300",
    step: -1,
  },
  in_production: {
    label: "In Production",
    color: "bg-indigo-100 text-indigo-700 border-indigo-300",
    step: 6,
  },
};

const QUOTES: Quote[] = [
  {
    id: "Q-2024-0042",
    title: "Giant Coffee Cup Replica — 8ft",
    productType: "Giant Product Replica",
    status: "reviewed",
    createdAt: "2026-06-01",
    updatedAt: "2026-06-08",
    estimatedCost: "$4,200 – $5,800",
  },
  {
    id: "Q-2024-0038",
    title: "Eagle Mascot Character",
    productType: "Inflatable Mascot",
    status: "quoted",
    createdAt: "2026-05-20",
    updatedAt: "2026-06-05",
    estimatedCost: "$3,100 – $4,500",
  },
  {
    id: "Q-2024-0031",
    title: "Trade Show Arch — 20ft Span",
    productType: "Inflatable Arch",
    status: "approved",
    createdAt: "2026-05-10",
    updatedAt: "2026-05-25",
    estimatedCost: "$6,800",
  },
  {
    id: "Q-2024-0027",
    title: "Custom Dinosaur Costume Set",
    productType: "Inflatable Costume",
    status: "in_production",
    createdAt: "2026-04-28",
    updatedAt: "2026-05-18",
    estimatedCost: "$2,600",
  },
  {
    id: "Q-2024-0020",
    title: "Promotional Tent — 10x10",
    productType: "Inflatable Tent",
    status: "rejected",
    createdAt: "2026-04-10",
    updatedAt: "2026-04-15",
  },
  {
    id: "Q-2024-0015",
    title: "Beach Ball Obstacle Course",
    productType: "Inflatable Game / Obstacle",
    status: "draft",
    createdAt: "2026-03-22",
    updatedAt: "2026-03-22",
  },
];

const SIDEBAR_LINKS = [
  { href: "/account", label: "Dashboard", icon: LayoutDashboard, exact: true as const },
  { href: "/account/quotes", label: "My Quotes", icon: FileText, exact: false as const },
  { href: "/account/orders", label: "My Orders", icon: Package, exact: false as const },
  { href: "/account/design-review", label: "Design Review", icon: Palette, exact: false as const },
  { href: "/account/settings", label: "Settings", icon: Settings, exact: false as const },
];

export default function QuotesPage() {
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
                  const isActive = link.exact
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

          {/* Main */}
          <main className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-heading text-2xl font-bold text-navy-900">
                  My Quotes
                </h1>
                <p className="mt-1 text-gray-600">
                  Track your quote requests and their statuses
                </p>
              </div>
              <Link
                href="/get-quote"
                className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-red-700 active:scale-[0.98]"
              >
                <PlusCircle className="h-4 w-4" />
                New Quote
              </Link>
            </div>

            {/* Quotes Table */}
            <div className="rounded-xl border border-navy-200 bg-white shadow-sm overflow-hidden">
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-navy-200 bg-navy-50/50">
                      <th className="px-6 py-3.5 text-left font-semibold text-navy-700">
                        Quote
                      </th>
                      <th className="px-6 py-3.5 text-left font-semibold text-navy-700">
                        Product Type
                      </th>
                      <th className="px-6 py-3.5 text-left font-semibold text-navy-700">
                        Status
                      </th>
                      <th className="px-6 py-3.5 text-left font-semibold text-navy-700">
                        Est. Cost
                      </th>
                      <th className="px-6 py-3.5 text-left font-semibold text-navy-700">
                        Updated
                      </th>
                      <th className="px-6 py-3.5 text-right font-semibold text-navy-700">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-navy-100">
                    {QUOTES.map((quote) => {
                      const status = STATUS_CONFIG[quote.status];
                      return (
                        <tr
                          key={quote.id}
                          className="transition-colors hover:bg-navy-50/50"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-700">
                                <FileText className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="font-medium text-navy-800">
                                  {quote.title}
                                </p>
                                <p className="text-xs text-gray-400">
                                  {quote.id}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            {quote.productType}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={cn(
                                "inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
                                status.color
                              )}
                            >
                              {status.label}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-navy-700">
                            {quote.estimatedCost || (
                              <span className="text-gray-400">—</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-gray-500">
                            {new Date(quote.updatedAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Link
                              href={`/account/quotes/${quote.id}`}
                              className="inline-flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                            >
                              View
                              <ExternalLink className="h-3 w-3" />
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="divide-y divide-navy-100 md:hidden">
                {QUOTES.map((quote) => {
                  const status = STATUS_CONFIG[quote.status];
                  return (
                    <div key={quote.id} className="px-4 py-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-700">
                            <FileText className="h-4 w-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-navy-800 truncate">
                              {quote.title}
                            </p>
                            <p className="text-xs text-gray-400">{quote.id}</p>
                          </div>
                        </div>
                        <span
                          className={cn(
                            "flex-shrink-0 rounded-full border px-2 py-0.5 text-xs font-medium capitalize",
                            status.color
                          )}
                        >
                          {status.label}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                        <span>{quote.productType}</span>
                        <span>
                          {new Date(quote.updatedAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </div>
                      {quote.estimatedCost && (
                        <p className="mt-1 text-xs font-medium text-navy-700">
                          Est: {quote.estimatedCost}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
