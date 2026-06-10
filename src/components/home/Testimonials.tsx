"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: number;
  quote: string;
  clientName: string;
  company: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote:
      "InflataCraft Pro turned our product into a 30-foot spectacle. The trade show booth traffic tripled, and we landed our biggest retail partner within two weeks of the event.",
    clientName: "Marcus Chen",
    company: "VP Marketing, FrostBite Brewing",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "From the first sketch to final delivery, the team was incredible. They hit our tight deadline and the inflatable mascot looked exactly like the 3D rendering. Couldn't be happier.",
    clientName: "Sarah Rodriguez",
    company: "Brand Director, Velocity Sports",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "We needed 200 custom tents in six weeks for a nationwide rollout. Not only did they deliver on time, but the quality was outstanding. Our field team still uses them two years later.",
    clientName: "James Okonkwo",
    company: "National Events Manager, LuxeMart",
    rating: 5,
  },
  {
    id: 4,
    quote:
      "The giant chip bag was the talk of our grand opening tour. Kids lined up for photos, parents posted on social media — organic reach went through the roof. Worth every penny.",
    clientName: "Emily Takahashi",
    company: "Trade Marketing Lead, SnapChip Snacks",
    rating: 4,
  },
  {
    id: 5,
    quote:
      "Working with InflataCraft Pro felt like having an extension of our creative team. They suggested improvements to our design that made the inflatable more impactful and more durable.",
    clientName: "David Park",
    company: "Creative Director, TurboCharge Energy",
    rating: 5,
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % TESTIMONIALS.length),
    []
  );
  const prev = useCallback(
    () =>
      setCurrent(
        (c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
      ),
    []
  );

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const testimonial = TESTIMONIALS[current];

  return (
    <section className="bg-gray-50 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-navy-900 md:text-4xl">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Don't take our word for it — hear from the brands we've helped
            scale.
          </p>
        </div>

        <div
          className="relative mx-auto mt-16 max-w-3xl"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm md:p-12"
            >
              <Quote className="h-10 w-10 text-red-200" />

              <blockquote className="mt-4 text-lg leading-relaxed text-gray-700 md:text-xl">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Star Rating */}
              <div className="mt-6 flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-5 w-5",
                      i < testimonial.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-200"
                    )}
                  />
                ))}
              </div>

              <div className="mt-4 border-t border-gray-100 pt-4">
                <p className="font-heading font-bold text-navy-900">
                  {testimonial.clientName}
                </p>
                <p className="text-sm text-gray-500">{testimonial.company}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <button
            type="button"
            onClick={prev}
            className="absolute -left-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-gray-200 bg-white p-2.5 text-gray-500 shadow-sm transition-all hover:border-navy-300 hover:text-navy-700 md:block"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute -right-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-gray-200 bg-white p-2.5 text-gray-500 shadow-sm transition-all hover:border-navy-300 hover:text-navy-700 md:block"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="mt-8 flex justify-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-300",
                  i === current
                    ? "w-8 bg-red-500"
                    : "w-2.5 bg-gray-300 hover:bg-gray-400"
                )}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={i === current ? "true" : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
