"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Search,
  X,
  ArrowRight,
  Quote,
  Star,
  Building2,
  Tag,
  ExternalLink,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────

type Industry =
  | "All"
  | "Food & Beverage"
  | "Automotive"
  | "CPG"
  | "Sports"
  | "Retail"
  | "Medical";

type ProductType =
  | "All"
  | "Product Replicas"
  | "Mascots"
  | "Arches"
  | "Costumes"
  | "Tents";

interface GalleryItem {
  id: number;
  slug: string;
  clientName: string;
  industry: Exclude<Industry, "All">;
  productType: Exclude<ProductType, "All">;
  description: string;
  testimonial: string;
  testimonialAuthor: string;
  testimonialRole: string;
  gradient: string;
  imageSrc: string;
  features: string[];
}

// ── Constants ────────────────────────────────────────────────────────────────

const INDUSTRIES: Industry[] = [
  "All",
  "Food & Beverage",
  "Automotive",
  "CPG",
  "Sports",
  "Retail",
  "Medical",
];

const PRODUCT_TYPES: ProductType[] = [
  "All",
  "Product Replicas",
  "Mascots",
  "Arches",
  "Costumes",
  "Tents",
];

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    slug: "frostbite-brewing-giant-can",
    clientName: "FrostBite Brewing Co.",
    industry: "Food & Beverage",
    productType: "Product Replicas",
    description:
      "20-foot giant beverage can replica for nationwide summer festival tour. Featuring UV-resistant printing and internal LED lighting for night events.",
    testimonial:
      "InflataCraft Pro turned our product into a 30-foot spectacle. The trade show booth traffic tripled, and we landed our biggest retail partner within two weeks of the event.",
    testimonialAuthor: "Marcus Chen",
    testimonialRole: "VP Marketing, FrostBite Brewing",
    gradient: "from-amber-400 via-orange-500 to-red-500",
    imageSrc: "/images/products/giant-soda-can-replica/giant-soda-can-replica-1.jpg?v=1",
    features: ["20ft height", "UV-resistant printing", "Internal LED lighting", "Rapid inflation system"],
  },
  {
    id: 2,
    slug: "apex-motors-finish-arch",
    clientName: "Apex Motors",
    industry: "Automotive",
    productType: "Arches",
    description:
      "Custom-branded inflatable arch for community runs, racing events, and outdoor festivals. Twin-tunnel design with reinforced tie-down points for outdoor durability.",
    testimonial:
      "The arch withstood 40mph gusts during our final race weekend. Engineers really know what they're doing over there.",
    testimonialAuthor: "Derek Lawson",
    testimonialRole: "Events Director, Apex Motors",
    gradient: "from-blue-600 via-blue-700 to-indigo-800",
    imageSrc: "/images/products/finish-line-arch/finish-line-arch-1.jpg?v=1",
    features: ["Twin-tunnel design", "Reinforced tie-downs", "Custom brand colors", "3-week turnaround"],
  },
  {
    id: 3,
    slug: "snapchip-giant-bag",
    clientName: "SnapChip Snacks",
    industry: "CPG",
    productType: "Product Replicas",
    description:
      "Giant chip bag inflatable for supermarket grand openings across 12 states. Weatherproof construction with photo-realistic print quality.",
    testimonial:
      "The giant chip bag was the talk of our grand opening tour. Kids lined up for photos, parents posted on social media — organic reach went through the roof.",
    testimonialAuthor: "Emily Takahashi",
    testimonialRole: "Trade Marketing Lead, SnapChip",
    gradient: "from-yellow-300 via-yellow-400 to-orange-400",
    imageSrc: "/images/products/snapchip-bag.jpg?v=1",
    features: ["Photo-realistic print", "Weatherproof", "12-location tour", "Quick setup/teardown"],
  },
  {
    id: 4,
    slug: "velocity-sports-mascot",
    clientName: "Velocity Sports",
    industry: "Sports",
    productType: "Mascots",
    description:
      "7-foot custom character mascot for stadium events and halftime entertainment. Articulated arms and removable jersey for sponsor rotations.",
    testimonial:
      "From the first sketch to final delivery, the team was incredible. They hit our tight deadline and the mascot looked exactly like the 3D rendering.",
    testimonialAuthor: "Sarah Rodriguez",
    testimonialRole: "Brand Director, Velocity Sports",
    gradient: "from-blue-500 via-cyan-400 to-teal-400",
    imageSrc: "/images/products/custom-brand-mascot/custom-brand-mascot-2.jpg?v=1",
    features: ["7ft height", "Articulated arms", "Removable jersey", "Carry case included"],
  },
  {
    id: 5,
    slug: "luxemart-canopy-system",
    clientName: "LuxeMart",
    industry: "Retail",
    productType: "Tents",
    description:
      "Custom-printed canopy system for 200-store sidewalk sale event. Heavy-duty frame with full-wrap dye-sublimated graphics.",
    testimonial:
      "We needed 200 custom tents in six weeks for a nationwide rollout. Not only did they deliver on time, but the quality was outstanding.",
    testimonialAuthor: "James Okonkwo",
    testimonialRole: "National Events Manager, LuxeMart",
    gradient: "from-purple-500 via-purple-600 to-fuchsia-600",
    imageSrc: "/images/products/custom-inflatable-event-tent/custom-inflatable-event-tent-2.jpg?v=1",
    features: ["200 units", "6-week delivery", "Dye-sublimated graphics", "Heavy-duty frame"],
  },
  {
    id: 6,
    slug: "medicare-pill-bottle",
    clientName: "MediCare Plus",
    industry: "Medical",
    productType: "Product Replicas",
    description:
      "Oversized pill bottle for health awareness campaign at 50 clinics nationwide. Medical-grade materials with easy-clean surface.",
    testimonial:
      "The oversized pill bottle was a conversation starter at every clinic. Patients actually asked about our services after seeing it.",
    testimonialAuthor: "Dr. Patricia Nguyen",
    testimonialRole: "CMO, MediCare Plus",
    gradient: "from-emerald-400 via-green-500 to-teal-500",
    imageSrc: "/images/products/pharma-pill-bottle-inflatable/pharma-pill-bottle-inflatable-2.jpg?v=1",
    features: ["Medical-grade materials", "Easy-clean surface", "50-clinic tour", "Compact storage"],
  },
  {
    id: 7,
    slug: "greenfield-avocado-costume",
    clientName: "GreenField Organics",
    industry: "Food & Beverage",
    productType: "Costumes",
    description:
      "Wearable inflatable character costumes for in-store sampling teams and promotional events. Lightweight breathable fabric with integrated fan for all-day comfort.",
    testimonial:
      "Our sampling team wore these for 8-hour shifts and stayed comfortable the whole time. Plus, shoppers couldn't resist taking selfies with them.",
    testimonialAuthor: "Lisa Kowalski",
    testimonialRole: "Field Marketing Manager, GreenField",
    gradient: "from-green-400 via-lime-500 to-yellow-300",
    imageSrc: "/images/products/inflatable-character-costume/inflatable-character-costume-1.jpg?v=1",
    features: ["Lightweight design", "Integrated cooling fan", "Breathable fabric", "One-size adjustable"],
  },
  {
    id: 8,
    slug: "turbocharge-energy-can",
    clientName: "TurboCharge Energy",
    industry: "CPG",
    productType: "Product Replicas",
    description:
      "15-foot giant beverage can replica for extreme sports sponsorship activation. High-visibility metallic finish with sponsor logo integration.",
    testimonial:
      "Working with InflataCraft Pro felt like having an extension of our creative team. They suggested improvements that made the inflatable more impactful.",
    testimonialAuthor: "David Park",
    testimonialRole: "Creative Director, TurboCharge",
    gradient: "from-lime-400 via-green-500 to-emerald-600",
    imageSrc: "/images/products/giant-soda-can-replica/giant-soda-can-replica-2.jpg?v=1",
    features: ["15ft height", "Metallic finish", "Sponsor logo panels", "Extreme weather rated"],
  },
  {
    id: 9,
    slug: "nike-shoe-replica",
    clientName: "Nike Running",
    industry: "Sports",
    productType: "Product Replicas",
    description:
      "8-foot giant inflatable display replica for marathon expos and retail flagship launches. Anatomically detailed with dynamic attention-grabbing presence.",
    testimonial:
      "The giant display stopped runners in their tracks at the expo. We saw a 40% increase in booth engagement compared to previous years.",
    testimonialAuthor: "Tom Hendricks",
    testimonialRole: "Experiential Lead, Nike Running",
    gradient: "from-orange-500 via-red-500 to-pink-500",
    imageSrc: "/images/products/dancing-tube-man/dancing-tube-man-1.jpg?v=1",
    features: ["8ft height", "Dynamic presence", "LED accents", "Portable case"],
  },
  {
    id: 10,
    slug: "coca-cola-bottle-arch",
    clientName: "Coca-Cola Bottling Co.",
    industry: "Food & Beverage",
    productType: "Arches",
    description:
      "Iconic contour bottle archway for concert venue entrances. Programmable RGB lighting synchronized to music for immersive brand experiences.",
    testimonial:
      "We deployed 12 of these arches across our summer concert series. The synchronized lighting was a massive hit on social media.",
    testimonialAuthor: "Angela Reeves",
    testimonialRole: "Brand Activation Director, Coca-Cola",
    gradient: "from-red-500 via-red-600 to-red-700",
    imageSrc: "/images/products/finish-line-arch/finish-line-arch-2.jpg?v=1",
    features: ["Music-synced RGB lighting", "12-unit deployment", "Weather sealed", "Custom controller app"],
  },
  {
    id: 11,
    slug: "target-bullseye-tent",
    clientName: "Target Corporation",
    industry: "Retail",
    productType: "Tents",
    description:
      "Bullseye-branded event tents for community outreach programs. Retractable sidewalls and integrated counter for product demonstrations.",
    testimonial:
      "These tents transformed our community events. The integrated counters made product sampling effortless, and the branding was spot-on.",
    testimonialAuthor: "Michael Torres",
    testimonialRole: "Community Relations, Target",
    gradient: "from-red-500 via-red-600 to-white",
    imageSrc: "/images/products/custom-inflatable-event-tent/custom-inflatable-event-tent-1.jpg?v=1",
    features: ["Retractable sidewalls", "Integrated demo counter", "Brand-matched colors", "10x10 and 10x20 sizes"],
  },
  {
    id: 12,
    slug: "pfizer-health-mascot",
    clientName: "Pfizer Health",
    industry: "Medical",
    productType: "Mascots",
    description:
      "Friendly heart character mascot for cardiovascular health awareness campaigns. Soft-touch exterior with internal support harness.",
    testimonial:
      "The heart mascot was a gentle, approachable way to start conversations about heart health. Kids and adults alike loved it.",
    testimonialAuthor: "Dr. Robert Kim",
    testimonialRole: "Public Health Director, Pfizer",
    gradient: "from-red-400 via-pink-400 to-rose-400",
    imageSrc: "/images/products/custom-brand-mascot/custom-brand-mascot-1.jpg?v=1",
    features: ["Soft-touch exterior", "Internal harness", "Child-safe materials", "Machine washable cover"],
  },
  {
    id: 13,
    slug: "ford-f150-replica",
    clientName: "Ford Motor Company",
    industry: "Automotive",
    productType: "Product Replicas",
    description:
      "Half-scale giant vehicle replica for dealership grand openings. Detailed exterior panels with interactive light-up features for maximum curb appeal.",
    testimonial:
      "We ordered three of these for our top dealerships. Each one drove a measurable increase in foot traffic during launch weekends.",
    testimonialAuthor: "Chris Hammond",
    testimonialRole: "Dealer Marketing Manager, Ford",
    gradient: "from-blue-700 via-blue-800 to-gray-800",
    imageSrc: "/images/products/dancing-tube-man/dancing-tube-man-2.jpg?v=1",
    features: ["Half-scale size", "Interactive features", "Detailed panels", "Indoor/outdoor rated"],
  },
  {
    id: 14,
    slug: "pepsi-superbowl-costume",
    clientName: "PepsiCo",
    industry: "Food & Beverage",
    productType: "Costumes",
    description:
      "Pepsi can costumes for Super Bowl halftime promotional team. 360-degree print with integrated beverage holder pocket.",
    testimonial:
      "The halftime crew was the most photographed team on the field — and they weren't even playing. The costumes stole the show.",
    testimonialAuthor: "Jenna Weiss",
    testimonialRole: "Sports Marketing, PepsiCo",
    gradient: "from-blue-500 via-blue-600 to-red-500",
    imageSrc: "/images/products/inflatable-character-costume/inflatable-character-costume-2.jpg?v=1",
    features: ["360° print", "Integrated pocket", "Quick-release buckles", "Event-grade durability"],
  },
  {
    id: 15,
    slug: "redbull-extreme-sports-arch",
    clientName: "Red Bull GmbH",
    industry: "Sports",
    productType: "Arches",
    description:
      "High-energy branded arch for Red Bull extreme sports events. Dynamic blue-and-silver design with integrated smoke machine ports for dramatic athlete entrances.",
    testimonial:
      "The arch became the iconic backdrop for every winner's photo. Our social media team couldn't keep up with the content requests.",
    testimonialAuthor: "Felix Bauer",
    testimonialRole: "Events Director, Red Bull",
    gradient: "from-blue-600 via-silver-400 to-red-600",
    imageSrc: "/images/products/helmet-tunnel-arch/helmet-tunnel-arch-1.jpg?v=1",
    features: ["Smoke machine ports", "Weather-resistant", "Quick-deploy frame", "LED accent lighting"],
  },
  {
    id: 16,
    slug: "mcdonalds-playland-dome",
    clientName: "McDonald's Corporation",
    industry: "Food & Beverage",
    productType: "Tents",
    description:
      "Custom inflatable dome for Ronald McDonald House charity events and community fundraisers. Bright, child-friendly design with interactive window displays.",
    testimonial:
      "Kids ran straight to our inflatable dome at every event. It became the heart of our community activation program.",
    testimonialAuthor: "Rosa Martinez",
    testimonialRole: "Community Impact Lead, McDonald's",
    gradient: "from-red-500 via-yellow-400 to-red-500",
    imageSrc: "/images/products/pop-up-dome-canopy/pop-up-dome-canopy-2.jpg?v=1",
    features: ["Child-safe materials", "Interactive displays", "Easy-clean surfaces", "Compact storage"],
  },
];

// ── Page Component ───────────────────────────────────────────────────────────

export default function GalleryPage() {
  const [industryFilter, setIndustryFilter] = useState<Industry>("All");
  const [productTypeFilter, setProductTypeFilter] = useState<ProductType>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const filteredItems = useMemo(() => {
    let items = [...GALLERY_ITEMS];

    if (industryFilter !== "All") {
      items = items.filter((item) => item.industry === industryFilter);
    }

    if (productTypeFilter !== "All") {
      items = items.filter((item) => item.productType === productTypeFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.clientName.toLowerCase().includes(q) ||
          item.industry.toLowerCase().includes(q) ||
          item.productType.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
      );
    }

    return items;
  }, [industryFilter, productTypeFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Page Header ── */}
      <section className="bg-navy-900 px-4 py-16 text-white">
        <div className="container mx-auto max-w-7xl">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-red-400">
            Our Work
          </p>
          <h1 className="mb-4 font-heading text-4xl font-bold tracking-tight md:text-5xl">
            Project Gallery
          </h1>
          <p className="max-w-2xl text-lg text-gray-300">
            Explore our portfolio of custom inflatables built for the world's
            most demanding brands. Every project is engineered for impact,
            durability, and flawless brand representation.
          </p>
        </div>
      </section>

      {/* ── Filters Bar ── */}
      <div className="sticky top-[73px] z-30 border-b border-gray-200 bg-white shadow-sm">
        <div className="container mx-auto max-w-7xl px-4 py-4">
          {/* Search */}
          <div className="relative mb-4 max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search gallery..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2 pl-9 pr-4 text-sm text-navy-900 placeholder-gray-400 transition-colors focus:border-navy-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-500/20"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Industry Tabs */}
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Industry:
            </span>
            {INDUSTRIES.map((ind) => (
              <button
                key={ind}
                onClick={() => setIndustryFilter(ind)}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-xs font-medium transition-all",
                  industryFilter === ind
                    ? "bg-navy-700 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-navy-700"
                )}
              >
                {ind}
              </button>
            ))}
          </div>

          {/* Product Type Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Type:
            </span>
            {PRODUCT_TYPES.map((pt) => (
              <button
                key={pt}
                onClick={() => setProductTypeFilter(pt)}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-xs font-medium transition-all",
                  productTypeFilter === pt
                    ? "bg-red-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-red-700"
                )}
              >
                {pt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Masonry Grid ── */}
      <div className="container mx-auto max-w-7xl px-4 py-10">
        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-white py-20 text-center">
            <Search className="mb-4 h-12 w-12 text-gray-300" />
            <h3 className="mb-2 text-lg font-semibold text-navy-900">
              No projects found
            </h3>
            <p className="mb-4 max-w-sm text-sm text-gray-500">
              Try adjusting your filters to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setIndustryFilter("All");
                setProductTypeFilter("All");
                setSearchQuery("");
              }}
              className="rounded-lg bg-navy-700 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <>
            <p className="mb-6 text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-navy-900">
                {filteredItems.length}
              </span>{" "}
              project{filteredItems.length !== 1 ? "s" : ""}
            </p>

            <motion.div
              layout
              className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4"
            >
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="mb-6 break-inside-avoid overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:border-navy-300 hover:shadow-lg"
                  >
                    {/* Image */}
                    <button
                      type="button"
                      onClick={() => setLightboxItem(item)}
                      className="relative block w-full cursor-pointer overflow-hidden"
                    >
                      <div
                        className={cn(
                          "relative flex h-48 items-center justify-center bg-gradient-to-br sm:h-56",
                          item.gradient
                        )}
                      >
                        <img
                          src={item.imageSrc}
                          alt={item.clientName}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      </div>
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 flex items-center justify-center bg-navy-900/0 transition-all hover:bg-navy-900/40">
                        <ExternalLink className="h-8 w-8 text-white opacity-0 transition-opacity hover:opacity-100" />
                      </div>
                    </button>

                    {/* Card Content */}
                    <div className="p-5">
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span className="inline-block rounded-full bg-navy-100 px-2.5 py-0.5 text-xs font-semibold text-navy-700">
                          {item.industry}
                        </span>
                        <span className="inline-block rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-red-700">
                          {item.productType}
                        </span>
                      </div>
                      <h3 className="mb-2 font-heading text-lg font-bold text-navy-900">
                        {item.clientName}
                      </h3>
                      <p className="mb-3 line-clamp-3 text-sm leading-relaxed text-gray-600">
                        {item.description}
                      </p>
                      <Link
                        href={`/gallery/${item.slug}`}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-red-600 transition-colors hover:text-red-500"
                      >
                        View Project Details
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </div>

      {/* ── Lightbox Overlay ── */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/90 p-4 backdrop-blur-sm"
            onClick={() => setLightboxItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setLightboxItem(null)}
                className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 text-gray-600 shadow-md transition-colors hover:bg-white hover:text-navy-900"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Hero Image */}
              <div
                className={cn(
                  "relative flex h-64 items-center justify-center bg-gradient-to-br sm:h-80",
                  lightboxItem.gradient
                )}
              >
                <img
                  src={lightboxItem.imageSrc}
                  alt={lightboxItem.clientName}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8">
                {/* Badges */}
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-navy-100 px-3 py-1 text-xs font-semibold text-navy-700">
                    <Building2 className="h-3 w-3" />
                    {lightboxItem.industry}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
                    <Tag className="h-3 w-3" />
                    {lightboxItem.productType}
                  </span>
                </div>

                <h2 className="mb-3 font-heading text-2xl font-bold text-navy-900 sm:text-3xl">
                  {lightboxItem.clientName}
                </h2>
                <p className="mb-6 text-gray-600 leading-relaxed">
                  {lightboxItem.description}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
                    Project Specs
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {lightboxItem.features.map((feat) => (
                      <span
                        key={feat}
                        className="rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-navy-700"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Testimonial */}
                <div className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-5">
                  <Quote className="mb-3 h-6 w-6 text-red-300" />
                  <blockquote className="mb-4 text-base leading-relaxed text-gray-700 italic">
                    &ldquo;{lightboxItem.testimonial}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3 border-t border-gray-200 pt-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-700 text-sm font-bold text-white">
                      {lightboxItem.testimonialAuthor.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-navy-900">
                        {lightboxItem.testimonialAuthor}
                      </p>
                      <p className="text-xs text-gray-500">
                        {lightboxItem.testimonialRole}
                      </p>
                    </div>
                    <div className="ml-auto flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={`/gallery/${lightboxItem.slug}`}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-navy-700 px-6 py-3 text-sm font-semibold text-navy-700 transition-colors hover:bg-navy-50"
                  >
                    View Full Details
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/get-quote"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-red-600/20 transition-all hover:bg-red-500 hover:shadow-red-500/30"
                  >
                    Make Something Similar
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bottom CTA ── */}
      <section className="bg-navy-900 py-16">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
            Ready to Create Your Own?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-navy-300">
            Every project starts with a conversation. Tell us about your brand,
            your event, and your vision — we'll handle the rest.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/get-quote"
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-red-600/30 transition-all hover:bg-red-500"
            >
              Start Your Project
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/60 hover:bg-white/10"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
