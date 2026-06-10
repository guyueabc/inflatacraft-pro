"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  FileText,
  LayoutDashboard,
  Package,
  Palette,
  Settings,
  LogOut,
  ChevronRight,
  CheckCircle2,
  Circle,
  Clock,
  Truck,
  PackageCheck,
} from "lucide-react";

type OrderStatus =
  | "design_review"
  | "material_prep"
  | "cutting"
  | "sewing"
  | "printing"
  | "quality_check"
  | "packaging"
  | "shipped";

interface Order {
  id: string;
  title: string;
  productType: string;
  status: OrderStatus;
  currentStage: number;
  orderDate: string;
  estimatedShip: string;
  quantity: number;
  total: string;
}

const STAGES: { key: OrderStatus; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "design_review", label: "Design Review", icon: Palette },
  { key: "material_prep", label: "Material Prep", icon: Package },
  { key: "cutting", label: "Cutting", icon: FileText },
  { key: "sewing", label: "Sewing", icon: Clock },
  { key: "printing", label: "Printing", icon: Palette },
  { key: "quality_check", label: "Quality Check", icon: CheckCircle2 },
  { key: "packaging", label: "Packaging", icon: Package },
  { key: "shipped", label: "Shipped", icon: Truck },
];

const STATUS_BADGE: Record<OrderStatus, { label: string; color: string }> = {
  design_review: { label: "Design Review", color: "bg-purple-100 text-purple-700" },
  material_prep: { label: "Material Prep", color: "bg-blue-100 text-blue-700" },
  cutting: { label: "Cutting", color: "bg-cyan-100 text-cyan-700" },
  sewing: { label: "Sewing", color: "bg-teal-100 text-teal-700" },
  printing: { label: "Printing", color: "bg-indigo-100 text-indigo-700" },
  quality_check: { label: "Quality Check", color: "bg-amber-100 text-amber-700" },
  packaging: { label: "Packaging", color: "bg-orange-100 text-orange-700" },
  shipped: { label: "Shipped", color: "bg-green-100 text-green-700" },
};

const ORDERS: Order[] = [
  {
    id: "ORD-2024-0015",
    title: "Custom Arch — Finish Line 20ft",
    productType: "Inflatable Arch",
    status: "sewing",
    currentStage: 4,
    orderDate: "2026-05-28",
    estimatedShip: "2026-06-18",
    quantity: 1,
    total: "$6,800.00",
  },
  {
    id: "ORD-2024-0012",
    title: "Dinosaur Costume Set — Triceratops",
    productType: "Inflatable Costume",
    status: "quality_check",
    currentStage: 6,
    orderDate: "2026-05-15",
    estimatedShip: "2026-06-10",
    quantity: 3,
    total: "$7,800.00",
  },
  {
    id: "ORD-2024-0008",
    title: "Giant Soda Can — 12ft",
    productType: "Giant Product Replica",
    status: "shipped",
    currentStage: 8,
    orderDate: "2026-04-05",
    estimatedShip: "2026-05-05",
    quantity: 1,
    total: "$4,200.00",
  },
  {
    id: "ORD-2024-0003",
    title: "Trade Show Tent — 20x20",
    productType: "Inflatable Tent",
    status: "shipped",
    currentStage: 8,
    orderDate: "2026-03-10",
    estimatedShip: "2026-04-10",
    quantity: 2,
    total: "$9,600.00",
  },
];

const SIDEBAR_LINKS = [
  { href: "/account", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/account/quotes", label: "My Quotes", icon: FileText, exact: false },
  { href: "/account/orders", label: "My Orders", icon: Package, exact: false },
  { href: "/account/design-review", label: "Design Review", icon: Palette, exact: false },
  { href: "/account/settings", label: "Settings", icon: Settings, exact: false },
] as const;

export default function OrdersPage() {
  const pathname = usePathname();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(
    ORDERS[0]?.id ?? null
  );

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
            <div className="mb-8">
              <h1 className="font-heading text-2xl font-bold text-navy-900">
                My Orders
              </h1>
              <p className="mt-1 text-gray-600">
                Track your production orders through every stage
              </p>
            </div>

            {/* Orders List */}
            <div className="space-y-6">
              {ORDERS.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  isExpanded={expandedOrder === order.id}
                  onToggle={() =>
                    setExpandedOrder(
                      expandedOrder === order.id ? null : order.id
                    )
                  }
                />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function OrderCard({
  order,
  isExpanded,
  onToggle,
}: {
  order: Order;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const badge = STATUS_BADGE[order.status];

  return (
    <div className="rounded-xl border border-navy-200 bg-white shadow-sm overflow-hidden">
      {/* Order Header */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-navy-50/50 transition-colors"
      >
        <div className="flex items-center gap-4 min-w-0">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-700">
            <PackageCheck className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-navy-800 truncate">
              {order.title}
            </p>
            <div className="flex items-center gap-3 mt-0.5">
              <span className="text-xs text-gray-400">{order.id}</span>
              <span className="text-xs text-gray-400">
                Qty: {order.quantity}
              </span>
              <span className="text-xs font-medium text-navy-700">
                {order.total}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
              badge.color
            )}
          >
            {badge.label}
          </span>
          <ChevronRight
            className={cn(
              "h-5 w-5 text-gray-400 transition-transform",
              isExpanded && "rotate-90"
            )}
          />
        </div>
      </button>

      {/* Expanded: 8-Stage Timeline */}
      {isExpanded && (
        <div className="border-t border-navy-100 px-6 py-6">
          {/* Order Info */}
          <div className="grid gap-4 sm:grid-cols-3 mb-8 pb-6 border-b border-navy-100">
            <div>
              <p className="text-xs text-gray-400">Order Date</p>
              <p className="text-sm font-medium text-navy-800">
                {new Date(order.orderDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Estimated Ship Date</p>
              <p className="text-sm font-medium text-navy-800">
                {new Date(order.estimatedShip).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Product Type</p>
              <p className="text-sm font-medium text-navy-800">
                {order.productType}
              </p>
            </div>
          </div>

          {/* 8-Stage Timeline */}
          <h3 className="text-sm font-semibold text-navy-700 mb-4">
            Production Timeline
          </h3>
          <div className="relative">
            {STAGES.map((stage, idx) => {
              const isCompleted = idx + 1 < order.currentStage;
              const isCurrent = idx + 1 === order.currentStage;
              const isFuture = idx + 1 > order.currentStage;

              return (
                <div key={stage.key} className="flex gap-4">
                  {/* Timeline Track */}
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all",
                        isCompleted
                          ? "bg-green-500 border-green-500 text-white"
                          : isCurrent
                          ? "bg-red-600 border-red-600 text-white ring-4 ring-red-100"
                          : "bg-white border-navy-300 text-navy-400"
                      )}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <Circle className="h-4 w-4" />
                      )}
                    </div>
                    {/* Connector Line */}
                    {idx < STAGES.length - 1 && (
                      <div
                        className={cn(
                          "w-0.5 h-8",
                          isCompleted
                            ? "bg-green-400"
                            : isCurrent
                            ? "bg-gradient-to-b from-red-500 to-navy-200"
                            : "bg-navy-200"
                        )}
                      />
                    )}
                  </div>

                  {/* Stage Content */}
                  <div className={cn("pb-4 flex-1", idx === STAGES.length - 1 && "pb-0")}>
                    <div className="flex items-center gap-2">
                      <stage.icon
                        className={cn(
                          "h-4 w-4",
                          isCompleted
                            ? "text-green-600"
                            : isCurrent
                            ? "text-red-600"
                            : "text-gray-400"
                        )}
                      />
                      <p
                        className={cn(
                          "text-sm font-medium",
                          isCompleted
                            ? "text-green-700"
                            : isCurrent
                            ? "text-red-700"
                            : "text-gray-500"
                        )}
                      >
                        {stage.label}
                      </p>
                      {isCurrent && (
                        <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-700 uppercase">
                          Current
                        </span>
                      )}
                      {isCompleted && (
                        <span className="text-[10px] text-green-600">
                          Completed
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
