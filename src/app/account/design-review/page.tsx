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
  Check,
  X,
  RotateCcw,
  MessageSquare,
  Maximize2,
} from "lucide-react";

const SIDEBAR_LINKS = [
  { href: "/account", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/account/quotes", label: "My Quotes", icon: FileText, exact: false },
  { href: "/account/orders", label: "My Orders", icon: Package, exact: false },
  { href: "/account/design-review", label: "Design Review", icon: Palette, exact: false },
  { href: "/account/settings", label: "Settings", icon: Settings, exact: false },
] as const;

const PENDING_REVIEWS = [
  {
    id: "DR-2024-0018",
    title: "Giant Coffee Cup Replica — Render v2",
    orderId: "ORD-2024-0015",
    submittedDate: "2026-06-07",
    notes: "Updated the handle position and adjusted the logo size per your request.",
    status: "awaiting_review",
  },
  {
    id: "DR-2024-0015",
    title: "Dinosaur Costume — Triceratops Design",
    orderId: "ORD-2024-0012",
    submittedDate: "2026-06-02",
    notes: "Color scheme updated to match brand guidelines. Added ventilation details.",
    status: "awaiting_review",
  },
];

const ANNOTATIONS = [
  { id: 1, x: 35, y: 25, text: "Logo placement — OK" },
  { id: 2, x: 60, y: 70, text: "Handle here?" },
  { id: 3, x: 20, y: 55, text: "Check seam line" },
];

export default function DesignReviewPage() {
  const pathname = usePathname();
  const [activeReview, setActiveReview] = useState<string | null>(
    PENDING_REVIEWS[0]?.id ?? null
  );
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [feedback, setFeedback] = useState("");

  const activeItem = PENDING_REVIEWS.find((r) => r.id === activeReview);

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
                Design Review
              </h1>
              <p className="mt-1 text-gray-600">
                Review and approve 3D renderings of your inflatables before
                production
              </p>
            </div>

            {PENDING_REVIEWS.length === 0 ? (
              <div className="rounded-xl border border-navy-200 bg-white p-12 text-center">
                <Palette className="mx-auto h-12 w-12 text-navy-300" />
                <h3 className="mt-4 font-semibold text-navy-700">
                  No Pending Reviews
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  You don&apos;t have any designs awaiting review right now.
                </p>
              </div>
            ) : (
              <div className="grid gap-8 lg:grid-cols-3">
                {/* Review List */}
                <div className="lg:col-span-1">
                  <div className="rounded-xl border border-navy-200 bg-white shadow-sm overflow-hidden">
                    <div className="border-b border-navy-100 px-4 py-3 bg-navy-50/50">
                      <h3 className="text-sm font-semibold text-navy-700">
                        Pending Reviews ({PENDING_REVIEWS.length})
                      </h3>
                    </div>
                    <div className="divide-y divide-navy-100">
                      {PENDING_REVIEWS.map((review) => (
                        <button
                          key={review.id}
                          type="button"
                          onClick={() => setActiveReview(review.id)}
                          className={cn(
                            "w-full px-4 py-3 text-left transition-colors",
                            activeReview === review.id
                              ? "bg-red-50 border-l-2 border-red-600"
                              : "hover:bg-navy-50 border-l-2 border-transparent"
                          )}
                        >
                          <p className="text-sm font-medium text-navy-800 truncate">
                            {review.title}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {review.orderId} ·{" "}
                            {new Date(review.submittedDate).toLocaleDateString(
                              "en-US",
                              { month: "short", day: "numeric" }
                            )}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Design Viewer */}
                <div className="lg:col-span-2">
                  {activeItem ? (
                    <div className="rounded-xl border border-navy-200 bg-white shadow-sm overflow-hidden">
                      {/* Rendering Placeholder */}
                      <div className="relative bg-navy-900 aspect-video flex items-center justify-center">
                        {/* Mock 3D rendering */}
                        <div className="text-center relative w-full h-full">
                          {/* Grid background */}
                          <div
                            className="absolute inset-0 opacity-10"
                            style={{
                              backgroundImage:
                                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                              backgroundSize: "30px 30px",
                            }}
                          />
                          {/* Inflatable silhouette */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <div className="mx-auto w-32 h-48 rounded-3xl bg-gradient-to-b from-red-400 to-red-600 border-4 border-red-300/50 shadow-2xl" />
                              <p className="mt-4 text-sm text-white/60">
                                3D Rendering Preview
                              </p>
                            </div>
                          </div>

                          {/* Annotations */}
                          {showAnnotations &&
                            ANNOTATIONS.map((ann) => (
                              <div
                                key={ann.id}
                                className="absolute group cursor-pointer"
                                style={{
                                  left: `${ann.x}%`,
                                  top: `${ann.y}%`,
                                }}
                              >
                                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white ring-2 ring-white animate-pulse">
                                  {ann.id}
                                </div>
                                <div className="absolute left-6 top-0 hidden group-hover:block bg-white text-xs text-navy-800 rounded-lg shadow-lg px-3 py-2 whitespace-nowrap border border-navy-200 z-10">
                                  {ann.text}
                                </div>
                              </div>
                            ))}

                          {/* Controls */}
                          <div className="absolute top-3 right-3 flex gap-2">
                            <button
                              type="button"
                              onClick={() => setShowAnnotations(!showAnnotations)}
                              className={cn(
                                "rounded-md p-2 text-xs font-medium transition-colors",
                                showAnnotations
                                  ? "bg-red-600 text-white"
                                  : "bg-white/20 text-white hover:bg-white/30"
                              )}
                            >
                              <MessageSquare className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              className="rounded-md bg-white/20 p-2 text-white hover:bg-white/30 transition-colors"
                            >
                              <Maximize2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Design Info & Feedback */}
                      <div className="p-6">
                        <h3 className="font-heading text-lg font-bold text-navy-900">
                          {activeItem.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {activeItem.notes}
                        </p>

                        {/* Feedback Textarea */}
                        <div className="mt-6">
                          <label
                            htmlFor="design-feedback"
                            className="block text-sm font-medium text-navy-700 mb-2"
                          >
                            Your Feedback
                          </label>
                          <textarea
                            id="design-feedback"
                            rows={3}
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="Add notes, change requests, or feedback for the design team..."
                            className="w-full rounded-lg border border-navy-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all focus:border-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-500/20 resize-y"
                          />
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-4 flex flex-col sm:flex-row gap-3">
                          <button
                            type="button"
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-green-700 active:scale-[0.98]"
                          >
                            <Check className="h-4 w-4" />
                            Approve Design
                          </button>
                          <button
                            type="button"
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-navy-300 bg-white px-4 py-3 text-sm font-semibold text-navy-700 transition-all hover:bg-navy-50 active:scale-[0.98]"
                          >
                            <RotateCcw className="h-4 w-4" />
                            Request Revisions
                          </button>
                          <button
                            type="button"
                            className="flex items-center justify-center gap-2 rounded-lg border border-red-300 bg-white px-4 py-3 text-sm font-medium text-red-600 transition-all hover:bg-red-50 active:scale-[0.98]"
                          >
                            <X className="h-4 w-4" />
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-xl border border-navy-200 bg-white p-12 text-center">
                      <Palette className="mx-auto h-12 w-12 text-navy-300" />
                      <p className="mt-4 text-sm text-gray-500">
                        Select a design from the list to review it
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
