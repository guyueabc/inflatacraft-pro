"use client";

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
    clientName: "FrostBite Brewing",
    industry: "Food & Bev",
    productType: "Giant Can Replica",
    description: "20-foot tall beer can for nationwide summer festival tour.",
    placeholderLabel: "FrostBite Can",
    imageSrc: "/images/products/giant-soda-can-replica/giant-soda-can-replica-2.jpg",
  },
  {
    id: 2,
    clientName: "Apex Motors",
    industry: "Automotive",
    productType: "Inflatable Arch",
    description: "Branded finish-line arch for championship racing series.",
    placeholderLabel: "Apex Arch",
    imageSrc: "/images/products/finish-line-arch/finish-line-arch-1.jpg",
  },
  {
    id: 3,
    clientName: "SnapChip Snacks",
    industry: "CPG",
    productType: "Product Replica",
    description: "Giant chip bag for supermarket grand openings across 12 states.",
    placeholderLabel: "SnapChip Bag",
    imageSrc: "/images/products/giant-soda-can-replica/giant-soda-can-replica-2.jpg",
  },
  {
    id: 4,
    clientName: "Velocity Sports",
    industry: "Sports",
    productType: "Mascot",
    description: "7-foot team mascot for stadium giveaways and halftime entertainment.",
    placeholderLabel: "Velocity Mascot",
    imageSrc: "/images/products/custom-brand-mascot/custom-brand-mascot-2.jpg",
  },
  {
    id: 5,
    clientName: "LuxeMart",
    industry: "Retail",
    productType: "Inflatable Tent",
    description: "Custom-printed canopy system for 200-store sidewalk sale event.",
    placeholderLabel: "LuxeMart Tent",
    imageSrc: "/images/products/custom-inflatable-event-tent/custom-inflatable-event-tent-1.jpg",
  },
  {
    id: 6,
    clientName: "MediCare Plus",
    industry: "Medical",
    productType: "Giant Replica",
    description: "Oversized pill bottle for health awareness campaign at 50 clinics.",
    placeholderLabel: "MediCare Pill",
    imageSrc: "/images/products/pharma-pill-bottle-inflatable/pharma-pill-bottle-inflatable-1.jpg",
  },
  {
    id: 7,
    clientName: "GreenField Organics",
    industry: "Food & Bev",
    productType: "Costume",
    description: "Wearable avocado costumes for in-store sampling teams.",
    placeholderLabel: "Avocado Costume",
    imageSrc: "/images/products/inflatable-character-costume/inflatable-character-costume-1.jpg",
  },
  {
    id: 8,
    clientName: "TurboCharge Energy",
    industry: "CPG",
    productType: "Product Replica",
    description: "15-foot energy drink can for extreme sports sponsorship activation.",
    placeholderLabel: "TurboCharge Can",
    imageSrc: "/images/products/giant-soda-can-replica/giant-soda-can-replica-2.jpg",
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

        {/* Filter Tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {INDUSTRIES.map((industry) => (
            <button
              key={industry}
              type="button"
              onClick={() => setActiveFilter(industry)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all",
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
              <motion.div
                key={study.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="mb-6 break-inside-avoid overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:border-navy-300 hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gray-200">
                  <img
                    src={study.imageSrc}
                    alt={study.clientName}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <span className="relative z-10 text-sm font-medium text-gray-400">
                    {study.placeholderLabel}
                  </span>
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
                    href={`/case-studies/${study.id}`}
                    className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-red-600 hover:text-red-500"
                  >
                    Read Case Study
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.div>
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
