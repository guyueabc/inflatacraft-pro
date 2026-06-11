"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, ShieldCheck, Flag, Star } from "lucide-react";

interface Slide {
  id: number;
  headline: string;
  subheadline: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
  placeholderLabel: string;
  imageSrc: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    headline: "Scale Your Brand 100×",
    subheadline: "Custom Inflatable Manufacturing — 3–6 Week Turnaround",
    ctaPrimary: { label: "Get Free Quote", href: "/request-quote" },
    ctaSecondary: { label: "View Gallery", href: "/gallery" },
    placeholderLabel: "Giant Product Replica",
    imageSrc: "/images/products/hero-slide-1.jpg?v=2",
  },
  {
    id: 2,
    headline: "Turn Your Product Into a Landmark",
    subheadline: "Giant Inflatable Replicas That Stop Traffic & Drive Sales",
    ctaPrimary: { label: "Get Free Quote", href: "/request-quote" },
    ctaSecondary: { label: "View Gallery", href: "/gallery" },
    placeholderLabel: "Inflatable Mascot",
    imageSrc: "/images/products/custom-brand-mascot/custom-brand-mascot-2.jpg",
  },
  {
    id: 3,
    headline: "From Sketch to Spectacle in Weeks",
    subheadline: "Free 3D Renderings — Made in USA — BBB A+ Rated",
    ctaPrimary: { label: "Get Free Quote", href: "/request-quote" },
    ctaSecondary: { label: "View Gallery", href: "/gallery" },
    placeholderLabel: "Custom Inflatable Arch",
    imageSrc: "/images/products/finish-line-arch/finish-line-arch-1.jpg",
  },
];

const TRUST_BADGES = [
  { icon: Flag, label: "Made in USA" },
  { icon: Star, label: "20+ Years" },
  { icon: ShieldCheck, label: "BBB A+" },
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const goTo = useCallback(
    (index: number) => {
      setCurrent((index + SLIDES.length) % SLIDES.length);
    },
    []
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Auto-rotate
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const slide = SLIDES[current];

  return (
    <section
      className="relative flex min-h-[600px] items-center overflow-hidden bg-navy-900 md:min-h-[700px]"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Hero carousel"
    >
      {/* Background image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
          aria-hidden="true"
        >
          <img
            src={slide.imageSrc}
            alt={slide.placeholderLabel}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 via-navy-900/70 to-navy-900/40" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-20 md:py-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="max-w-3xl font-heading text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
              {slide.headline}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-navy-200 md:text-xl">
              {slide.subheadline}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={slide.ctaPrimary.href}
                className="inline-flex items-center rounded-lg bg-red-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-red-600/30 transition-all hover:bg-red-500 hover:shadow-red-500/40 active:scale-95"
              >
                {slide.ctaPrimary.label}
              </Link>
              <Link
                href={slide.ctaSecondary.href}
                className="inline-flex items-center rounded-lg border-2 border-white/30 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/60 hover:bg-white/10 active:scale-95"
              >
                {slide.ctaSecondary.label}
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Trust Badges */}
        <div className="mt-14 flex flex-wrap gap-8">
          {TRUST_BADGES.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2 text-white/80"
            >
              <badge.icon className="h-5 w-5 text-red-400" />
              <span className="text-sm font-medium">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        type="button"
        onClick={prev}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white backdrop-blur-sm transition-all hover:bg-white/25 md:left-6"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white backdrop-blur-sm transition-all hover:bg-white/25 md:right-6"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            className={cn(
              "h-2.5 rounded-full transition-all duration-300",
              i === current
                ? "w-8 bg-red-500"
                : "w-2.5 bg-white/40 hover:bg-white/60"
            )}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === current ? "true" : undefined}
          />
        ))}
      </div>
    </section>
  );
}
