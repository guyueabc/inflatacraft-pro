"use client";
import Image from "next/image";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface CaseStudy {
  id: number;
  clientName: string;
  industry: string;
  productType: string;
  description: string;
  placeholderLabel: string;
  imageSrc: string;
  slug: string;
  href?: string;
}

const INDUSTRIES = [
  "All",
  "Food & Bev",
  "Automotive",
  "CPG",
  "Sports",
  "Retail",
  "Medical",
] as const;

type Industry = (typeof INDUSTRIES)[number];

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 1,
    clientName: "Wildlife Theme Park",
    industry: "Sports",
    productType: "Inflatable Animals",
    description: "Giant inflatable animal sculptures for theme park entrance and safari zone displays.",
    placeholderLabel: "Dinosaur Display",
    imageSrc: "/images/products/inflatable-animals/充气恐龙_1.jpg",
    slug: "dinosaur-theme-park",
  },
  {
    id: 2,
    clientName: "NightSky Cinema",
    industry: "Retail",
    productType: "Movie Screen",
    description: "Inflatable movie screen for outdoor community cinema nights and corporate events.",
    placeholderLabel: "Outdoor Cinema",
    imageSrc: "/images/products/inflatable-movie-screen/1.jpg",
    slug: "outdoor-cinema-night",
  },
  {
    id: 3,
    clientName: "Disco Nights Co.",
    industry: "CPG",
    productType: "Mirror Ball",
    description: "Inflatable mirror ball decoration for concert tours and nightclub brand activations.",
    placeholderLabel: "Mirror Ball",
    imageSrc: "/images/products/inflatable-mirror-ball/10.jpg",
    slug: "mirror-ball-concert",
  },
  {
    id: 4,
    clientName: "Halloween Horror Fest",
    industry: "Retail",
    productType: "Halloween Inflatable",
    description: "Seasonal Halloween inflatable display for retail storefront and haunted house events.",
    placeholderLabel: "Halloween Display",
    imageSrc: "/images/products/halloween-inflatable/1.png",
    slug: "halloween-pop-up",
  },
  {
    id: 5,
    clientName: "Holiday Santa Village",
    industry: "Retail",
    productType: "Santa Claus",
    description: "Giant inflatable Santa Claus for shopping mall holiday displays and winter festivals.",
    placeholderLabel: "Santa Display",
    imageSrc: "/images/products/inflatable-santa-claus/1.png",
    slug: "santa-holiday-display",
  },
  {
    id: 6,
    clientName: "Crystal Dome Events",
    industry: "CPG",
    productType: "Bubble House",
    description: "Transparent inflatable bubble house for VIP lounge and product launch events.",
    placeholderLabel: "Bubble House",
    imageSrc: "/images/products/inflatable-bubble-house/1.jpg",
    slug: "inflatable-bubble-house",
    href: "/products/inflatable-bubble-house",
  },
  {
    id: 7,
    clientName: "Garden Light Festival",
    industry: "Food & Bev",
    productType: "Light Column",
    description: "Inflatable light columns for outdoor garden festival and nighttime brand illumination.",
    placeholderLabel: "Light Columns",
    imageSrc: "/images/products/inflatable-light-column/1.png",
    slug: "light-column-installation",
  },
  {
    id: 8,
    clientName: "TurboCharge Energy",
    industry: "Food & Bev",
    productType: "Food Replica",
    description: "Giant inflatable food replicas for trade show booth and retail grand opening displays.",
    placeholderLabel: "Food Replicas",
    imageSrc: "/images/products/inflatable-food-replica/充气冰淇淋_1.jpg",
    slug: "food-replica-display",
  },
];

export function FeaturedCases() {
  const [activeFilter, setActiveFilter] = useState<Industry>("All");

  const filtered =
    activeFilter === "All"
      ? CASE_STUDIES
      : CASE_STUDIES.filter((c) => c.industry === activeFilter);

  return (
    <section className="bg-white py-12 sm:py-16 md:py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl md:text-4xl">
            Featured Case Studies
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            See how brands across industries use custom inflatables to dominate
            their markets.
          </p>
        </div>

        {/* Filter Tabs - mobile scrollable */}
        <div className="mt-8 flex gap-2 overflow-x-auto pb-2 sm:mt-10 sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {INDUSTRIES.map((industry) => (
            <button
              key={industry}
              type="button"
              onClick={() => setActiveFilter(industry)}
              className={cn(
                "whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-all sm:px-4 sm:py-2 sm:text-sm",
                activeFilter === industry
                  ? "bg-navy-700 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-navy-700"
              )}
            >
              {industry}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div
          layout
          className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((study) => (
              <motion.article
                key={study.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="mb-6 break-inside-avoid overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:border-navy-300 hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                  <Image
                    src={study.imageSrc}
                    alt={study.clientName}
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="h-full w-full object-contain"
                  width={800} height={600} unoptimized />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2">
                    <span className="inline-block rounded-full bg-navy-100 px-2.5 py-0.5 text-xs font-semibold text-navy-700">
                      {study.industry}
                    </span>
                    <span className="text-xs text-gray-500">
                      {study.productType}
                    </span>
                  </div>
                  <h3 className="mt-3 font-heading text-base font-bold text-navy-900">
                    {study.clientName}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {study.description}
                  </p>
                  <Link
                    href={study.href ?? (study.slug ? `/gallery/${study.slug}` : "/gallery")}
                    className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-red-600 hover:text-red-500"
                  >
                    View Case Study
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-gray-500">
            No case studies found for this industry.
          </p>
        )}
      </div>
    </section>
  );
}
