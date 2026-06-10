"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Phone, MessageSquareText, ArrowUp } from "lucide-react";

export function FloatingCTA() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay showing the floating CTA so it doesn't flash on load
    const showTimer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Desktop: Fixed bottom-right floating buttons */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-3">
        {/* Back to Top */}
        {showBackToTop && (
          <button
            type="button"
            onClick={scrollToTop}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg border border-navy-200 text-navy-600 transition-all hover:bg-navy-50 hover:shadow-xl"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        )}

        {/* Phone Call */}
        <a
          href="tel:1-800-INFLATA"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-700 text-white shadow-lg transition-all hover:bg-navy-800 hover:shadow-xl"
          aria-label="Call us"
          title="Call 1-800-INFLATA"
        >
          <Phone className="h-5 w-5" />
        </a>

        {/* Get Free Quote */}
        <Link
          href="/request-quote"
          className="flex items-center gap-2 rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-red-500 hover:shadow-xl"
        >
          <MessageSquareText className="h-4 w-4" />
          Get Free Quote
        </Link>
      </div>

      {/* Mobile: Sticky bottom bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex items-stretch bg-white border-t border-navy-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <a
          href="tel:1-800-INFLATA"
          className="flex flex-1 items-center justify-center gap-1.5 py-3 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50"
        >
          <Phone className="h-4 w-4" />
          <span className="hidden xs:inline">Call</span>
        </a>
        <Link
          href="/request-quote"
          className="flex flex-[2] items-center justify-center gap-2 bg-red-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-500"
        >
          <MessageSquareText className="h-4 w-4" />
          Get Free Quote
        </Link>
      </div>
    </>
  );
}
