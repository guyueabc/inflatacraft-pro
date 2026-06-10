"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Logo {
  name: string;
  placeholder: string;
}

const LOGOS: Logo[] = [
  { name: "PepsiCo", placeholder: "PC" },
  { name: "Ford", placeholder: "FD" },
  { name: "Coca-Cola", placeholder: "CC" },
  { name: "Nike", placeholder: "NK" },
  { name: "Toyota", placeholder: "TY" },
  { name: "Unilever", placeholder: "UL" },
  { name: "Anheuser-Busch", placeholder: "AB" },
  { name: "General Mills", placeholder: "GM" },
  { name: "Monster Energy", placeholder: "ME" },
  { name: "Target", placeholder: "TG" },
  { name: "Walmart", placeholder: "WM" },
  { name: "Budweiser", placeholder: "BW" },
];

// Duplicate for seamless scrolling
const SCROLL_LOGOS = [...LOGOS, ...LOGOS];

export function ClientLogos() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationId: number;
    let scrollPos = 0;
    const speed = 0.5; // pixels per frame

    const animate = () => {
      scrollPos += speed;
      if (scrollPos >= el.scrollWidth / 2) {
        scrollPos = 0;
      }
      el.scrollLeft = scrollPos;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <section className="border-y border-gray-200 bg-white py-16">
      <div className="container mx-auto px-4">
        <p className="mb-8 text-center text-sm font-semibold uppercase tracking-widest text-gray-400">
          Trusted by Leading Brands Worldwide
        </p>

        <div className="relative overflow-hidden">
          {/* Gradient fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />

          <div
            ref={scrollRef}
            className="flex gap-12 overflow-x-hidden whitespace-nowrap py-4"
            style={{ scrollbarWidth: "none" }}
          >
            {SCROLL_LOGOS.map((logo, i) => (
              // TODO: Replace with real client logo images when available.
              // Client logos are typically stylized brand marks (SVG/PNG),
              // not product photos. Add logo.src to the Logo interface
              // and use <img> here.
              <div
                key={`${logo.name}-${i}`}
                className="flex h-16 w-32 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100"
              >
                <span className="text-lg font-bold text-gray-400">
                  {logo.placeholder}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
