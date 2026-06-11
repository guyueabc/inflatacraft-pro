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
  ExternalLink,
  Eye,
  Filter,
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
    id: 1, slug: "frostbite-brewing-giant-can", clientName: "FrostBite Brewing Co.",
    industry: "Food & Beverage", productType: "Product Replicas",
    description: "20-foot giant beverage can replica for nationwide summer festival tour. Featuring UV-resistant printing and internal LED lighting for night events.",
    testimonial: "InflataCraft Pro turned our product into a 30-foot spectacle. The trade show booth traffic tripled, and we landed our biggest retail partner within two weeks of the event.",
    testimonialAuthor: "Marcus Chen", testimonialRole: "VP Marketing, FrostBite Brewing",
    gradient: "from-amber-400 via-orange-500 to-red-500",
    imageSrc: "/images/products/giant-soda-can-replica/giant-soda-can-replica-1.jpg?v=1",
    features: ["20ft height", "UV-resistant printing", "Internal LED lighting", "Rapid inflation system"],
  },
  {
    id: 2, slug: "apex-motors-finish-arch", clientName: "Apex Motors",
    industry: "Automotive", productType: "Arches",
    description: "Custom-branded inflatable arch for community runs, racing events, and outdoor festivals. Twin-tunnel design with reinforced tie-down points.",
    testimonial: "The arch withstood 40mph gusts during our final race weekend. Engineers really know what they're doing over there.",
    testimonialAuthor: "Derek Lawson", testimonialRole: "Events Director, Apex Motors",
    gradient: "from-blue-600 via-blue-700 to-indigo-800",
    imageSrc: "/images/products/finish-line-arch/finish-line-arch-1.jpg?v=1",
    features: ["Twin-tunnel design", "Reinforced tie-downs", "Custom brand colors", "3-week turnaround"],
  },
  {
    id: 3, slug: "snapchip-giant-bag", clientName: "SnapChip Snacks",
    industry: "CPG", productType: "Product Replicas",
    description: "Giant chip bag inflatable for supermarket grand openings across 12 states. Weatherproof construction with photo-realistic print quality.",
    testimonial: "The giant chip bag was the talk of our grand opening tour. Kids lined up for photos, parents posted on social media — organic reach went through the roof.",
    testimonialAuthor: "Emily Takahashi", testimonialRole: "Trade Marketing Lead, SnapChip",
    gradient: "from-yellow-300 via-yellow-400 to-orange-400",
    imageSrc: "/images/products/snapchip-bag.jpg?v=1",
    features: ["Photo-realistic print", "Weatherproof", "12-location tour", "Quick setup/teardown"],
  },
  {
    id: 4, slug: "velocity-sports-mascot", clientName: "Velocity Sports",
    industry: "Sports", productType: "Mascots",
    description: "7-foot custom character mascot for stadium events and halftime entertainment. Articulated arms and removable jersey for sponsor rotations.",
    testimonial: "From the first sketch to final delivery, the team was incredible. They hit our tight deadline and the mascot looked exactly like the 3D rendering.",
    testimonialAuthor: "Sarah Rodriguez", testimonialRole: "Brand Director, Velocity Sports",
    gradient: "from-blue-500 via-cyan-400 to-teal-400",
    imageSrc: "/images/products/custom-brand-mascot/custom-brand-mascot-2.jpg?v=1",
    features: ["7ft height", "Articulated arms", "Removable jersey", "Carry case included"],
  },
  {
    id: 5, slug: "luxemart-canopy-system", clientName: "LuxeMart",
    industry: "Retail", productType: "Tents",
    description: "Custom-printed canopy system for 200-store sidewalk sale event. Heavy-duty frame with full-wrap dye-sublimated graphics.",
    testimonial: "We needed 200 custom tents in six weeks for a nationwide rollout. Not only did they deliver on time, but the quality was outstanding.",
    testimonialAuthor: "James Okonkwo", testimonialRole: "National Events Manager, LuxeMart",
    gradient: "from-purple-500 via-purple-600 to-fuchsia-600",
    imageSrc: "/images/products/custom-inflatable-event-tent/custom-inflatable-event-tent-2.jpg?v=1",
    features: ["200 units", "6-week delivery", "Dye-sublimated graphics", "Heavy-duty frame"],
  },
  {
    id: 6, slug: "medicare-pill-bottle", clientName: "MediCare Plus",
    industry: "Medical", productType: "Product Replicas",
    description: "Oversized pill bottle for health awareness campaign at 50 clinics nationwide. Medical-grade materials with easy-clean surface.",
    testimonial: "The oversized pill bottle was a conversation starter at every clinic. Patients actually asked about our services after seeing it.",
    testimonialAuthor: "Dr. Patricia Nguyen", testimonialRole: "CMO, MediCare Plus",
    gradient: "from-emerald-400 via-green-500 to-teal-500",
    imageSrc: "/images/products/pharma-pill-bottle-inflatable/pharma-pill-bottle-inflatable-2.jpg?v=1",
    features: ["Medical-grade materials", "Easy-clean surface", "50-clinic tour", "Compact storage"],
  },
  {
    id: 7, slug: "greenfield-avocado-costume", clientName: "GreenField Organics",
    industry: "Food & Beverage", productType: "Costumes",
    description: "Wearable inflatable character costumes for in-store sampling teams and promotional events. Lightweight breathable fabric with integrated fan.",
    testimonial: "Our sampling team wore these for 8-hour shifts and stayed comfortable the whole time. Plus, shoppers couldn't resist taking selfies with them.",
    testimonialAuthor: "Lisa Kowalski", testimonialRole: "Field Marketing Manager, GreenField",
    gradient: "from-green-400 via-lime-500 to-yellow-300",
    imageSrc: "/images/products/inflatable-character-costume/inflatable-character-costume-1.jpg?v=1",
    features: ["Lightweight design", "Integrated cooling fan", "Breathable fabric", "One-size adjustable"],
  },
  {
    id: 8, slug: "turbocharge-energy-can", clientName: "TurboCharge Energy",
    industry: "CPG", productType: "Product Replicas",
    description: "15-foot giant beverage can replica for extreme sports sponsorship activation. High-visibility metallic finish with sponsor logo integration.",
    testimonial: "Working with InflataCraft Pro felt like having an extension of our creative team. They suggested improvements that made the inflatable more impactful.",
    testimonialAuthor: "David Park", testimonialRole: "Creative Director, TurboCharge",
    gradient: "from-lime-400 via-green-500 to-emerald-600",
    imageSrc: "/images/products/giant-soda-can-replica/giant-soda-can-replica-2.jpg?v=1",
    features: ["15ft height", "Metallic finish", "Sponsor logo panels", "Extreme weather rated"],
  },
  {
    id: 9, slug: "nike-shoe-replica", clientName: "Nike Running",
    industry: "Sports", productType: "Product Replicas",
    description: "8-foot giant inflatable display replica for marathon expos and retail flagship launches. Dynamic attention-grabbing presence with LED accents.",
    testimonial: "The giant display stopped runners in their tracks at the expo. We saw a 40% increase in booth engagement compared to previous years.",
    testimonialAuthor: "Tom Hendricks", testimonialRole: "Experiential Lead, Nike Running",
    gradient: "from-orange-500 via-red-500 to-pink-500",
    imageSrc: "/images/products/dancing-tube-man/dancing-tube-man-1.jpg?v=1",
    features: ["8ft height", "Dynamic presence", "LED accents", "Portable case"],
  },
  {
    id: 10, slug: "coca-cola-bottle-arch", clientName: "Coca-Cola Bottling Co.",
    industry: "Food & Beverage", productType: "Arches",
    description: "Iconic contour bottle archway for concert venue entrances. Programmable RGB lighting synchronized to music for immersive brand experiences.",
    testimonial: "We deployed 12 of these arches across our summer concert series. The synchronized lighting was a massive hit on social media.",
    testimonialAuthor: "Angela Reeves", testimonialRole: "Brand Activation Director, Coca-Cola",
    gradient: "from-red-500 via-red-600 to-red-700",
    imageSrc: "/images/products/finish-line-arch/finish-line-arch-2.jpg?v=1",
    features: ["Music-synced RGB", "12-unit deployment", "Weather sealed", "Custom controller app"],
  },
  {
    id: 11, slug: "target-bullseye-tent", clientName: "Target Corporation",
    industry: "Retail", productType: "Tents",
    description: "Bullseye-branded event tents for community outreach programs. Retractable sidewalls and integrated counter for product demonstrations.",
    testimonial: "These tents transformed our community events. The integrated counters made product sampling effortless, and the branding was spot-on.",
    testimonialAuthor: "Michael Torres", testimonialRole: "Community Relations, Target",
    gradient: "from-red-500 via-red-600 to-white",
    imageSrc: "/images/products/custom-inflatable-event-tent/custom-inflatable-event-tent-1.jpg?v=1",
    features: ["Retractable sidewalls", "Integrated demo counter", "Brand-matched colors", "10x10 and 10x20 sizes"],
  },
  {
    id: 12, slug: "pfizer-health-mascot", clientName: "Pfizer Health",
    industry: "Medical", productType: "Mascots",
    description: "Friendly heart character mascot for cardiovascular health awareness campaigns. Soft-touch exterior with internal support harness.",
    testimonial: "The heart mascot was a gentle, approachable way to start conversations about heart health. Kids and adults alike loved it.",
    testimonialAuthor: "Dr. Robert Kim", testimonialRole: "Public Health Director, Pfizer",
    gradient: "from-red-400 via-pink-400 to-rose-400",
    imageSrc: "/images/products/custom-brand-mascot/custom-brand-mascot-1.jpg?v=1",
    features: ["Soft-touch exterior", "Internal harness", "Child-safe materials", "Machine washable cover"],
  },
  {
    id: 13, slug: "ford-f150-replica", clientName: "Ford Motor Company",
    industry: "Automotive", productType: "Product Replicas",
    description: "Half-scale giant vehicle replica for dealership grand openings. Detailed exterior panels with interactive light-up features for maximum curb appeal.",
    testimonial: "We ordered three of these for our top dealerships. Each one drove a measurable increase in foot traffic during launch weekends.",
    testimonialAuthor: "Chris Hammond", testimonialRole: "Dealer Marketing Manager, Ford",
    gradient: "from-blue-700 via-blue-800 to-gray-800",
    imageSrc: "/images/products/dancing-tube-man/dancing-tube-man-2.jpg?v=1",
    features: ["Half-scale size", "Interactive features", "Detailed panels", "Indoor/outdoor rated"],
  },
  {
    id: 14, slug: "pepsi-superbowl-costume", clientName: "PepsiCo",
    industry: "Food & Beverage", productType: "Costumes",
    description: "Pepsi can costumes for Super Bowl halftime promotional team. 360-degree print with integrated beverage holder pocket.",
    testimonial: "The halftime crew was the most photographed team on the field — and they weren't even playing. The costumes stole the show.",
    testimonialAuthor: "Jenna Weiss", testimonialRole: "Sports Marketing, PepsiCo",
    gradient: "from-blue-500 via-blue-600 to-red-500",
    imageSrc: "/images/products/inflatable-character-costume/inflatable-character-costume-2.jpg?v=1",
    features: ["360° print", "Integrated pocket", "Quick-release buckles", "Event-grade durability"],
  },
  {
    id: 15, slug: "redbull-extreme-sports-arch", clientName: "Red Bull GmbH",
    industry: "Sports", productType: "Arches",
    description: "High-energy branded arch for Red Bull extreme sports events. Dynamic blue-and-silver design with integrated smoke machine ports.",
    testimonial: "The arch became the iconic backdrop for every winner's photo. Our social media team couldn't keep up with the content requests.",
    testimonialAuthor: "Felix Bauer", testimonialRole: "Events Director, Red Bull",
    gradient: "from-blue-600 via-silver-400 to-red-600",
    imageSrc: "/images/products/helmet-tunnel-arch/helmet-tunnel-arch-1.jpg?v=1",
    features: ["Smoke machine ports", "Weather-resistant", "Quick-deploy frame", "LED accent lighting"],
  },
  {
    id: 16, slug: "mcdonalds-playland-dome", clientName: "McDonald's Corporation",
    industry: "Food & Beverage", productType: "Tents",
    description: "Custom inflatable dome for Ronald McDonald House charity events and community fundraisers. Bright, child-friendly design with interactive window displays.",
    testimonial: "Kids ran straight to our inflatable dome at every event. It became the heart of our community activation program.",
    testimonialAuthor: "Rosa Martinez", testimonialRole: "Community Impact Lead, McDonald's",
    gradient: "from-red-500 via-yellow-400 to-red-500",
    imageSrc: "/images/products/pop-up-dome-canopy/pop-up-dome-canopy-2.jpg?v=1",
    features: ["Child-safe materials", "Interactive displays", "Easy-clean surfaces", "Compact storage"],
  },
];

// ── Page Component ───────────────────────────────────────────────────────────

export default function GalleryPage() {
  const [industryFilter, setIndustryFilter] = useState<Industry>("All");
  const [productFilter, setProductFilter] = useState<ProductType>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [imageLoaded, setImageLoaded] = useState<Record<number, boolean>>({});

  const filtered = useMemo(() => {
    let items = [...GALLERY_ITEMS];
    if (industryFilter !== "All") items = items.filter((i) => i.industry === industryFilter);
    if (productFilter !== "All") items = items.filter((i) => i.productType === productFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (i) =>
          i.clientName.toLowerCase().includes(q) ||
          i.industry.toLowerCase().includes(q) ||
          i.productType.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q)
      );
    }
    return items;
  }, [industryFilter, productFilter, searchQuery]);

  const activeFilters = [industryFilter !== "All", productFilter !== "All", !!searchQuery.trim()].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-white">
      {/* ── Hero Header ── */}
      <section className="relative overflow-hidden bg-navy-900 px-4 pb-20 pt-24 text-white">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle at 20px 20px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        <div className="container relative mx-auto max-w-7xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-red-400">Our Portfolio</p>
          <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Project Gallery
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-navy-300">
            16 projects. 6 industries. Infinite brand impact.
          </p>
        </div>
      </section>

      {/* ── Compact Filter Bar ── */}
      <div className="sticky top-[73px] z-30 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur">
        <div className="container mx-auto max-w-7xl px-4 py-3">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text" placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-8 text-sm transition-colors focus:border-navy-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-500/20"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            {/* Industry pills */}
            <div className="flex flex-wrap gap-1.5">
              {INDUSTRIES.map((ind) => (
                <button key={ind} onClick={() => setIndustryFilter(ind)}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                    industryFilter === ind
                      ? "bg-navy-700 text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  )}>{ind}</button>
              ))}
            </div>
            {/* Product type pills */}
            <div className="flex flex-wrap gap-1.5">
              {PRODUCT_TYPES.map((pt) => (
                <button key={pt} onClick={() => setProductFilter(pt)}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                    productFilter === pt
                      ? "bg-red-600 text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  )}>{pt}</button>
              ))}
            </div>
            {/* Clear all */}
            {activeFilters > 0 && (
              <button onClick={() => { setIndustryFilter("All"); setProductFilter("All"); setSearchQuery(""); }}
                className="ml-auto rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-500 hover:bg-gray-50">
                Clear ({activeFilters})
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="container mx-auto max-w-7xl px-4 py-10">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Filter className="mb-4 h-12 w-12 text-gray-300" />
            <h3 className="mb-2 text-lg font-semibold text-navy-900">No projects match</h3>
            <p className="mb-4 text-sm text-gray-500">Try adjusting your filters.</p>
            <button onClick={() => { setIndustryFilter("All"); setProductFilter("All"); setSearchQuery(""); }}
              className="rounded-lg bg-navy-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-navy-800">
              Clear All Filters
            </button>
          </div>
        ) : (
          <>
            <p className="mb-6 text-sm text-gray-500">
              Showing <span className="font-semibold text-navy-900">{filtered.length}</span> project{filtered.length !== 1 ? "s" : ""}
            </p>
            <motion.div layout
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <AnimatePresence mode="popLayout">
                {filtered.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-xl hover:-translate-y-1"
                  >
                    {/* Image */}
                    <button
                      type="button"
                      onClick={() => setSelectedItem(item)}
                      className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-navy-50 to-navy-100"
                    >
                      {/* Skeleton placeholder */}
                      {!imageLoaded[item.id] && (
                        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-navy-100 via-navy-50 to-navy-100" />
                      )}
                      <img
                        src={item.imageSrc}
                        alt={item.clientName}
                        onLoad={() => setImageLoaded((prev) => ({ ...prev, [item.id]: true }))}
                        className={cn(
                          "h-full w-full object-cover transition-all duration-500 group-hover:scale-110",
                          imageLoaded[item.id] ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-navy-900/0 transition-all group-hover:bg-navy-900/30">
                        <span className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-navy-900 opacity-0 shadow-lg transition-all group-hover:opacity-100">
                          <Eye className="h-4 w-4" /> View Details
                        </span>
                      </div>
                      {/* Industry badge */}
                      <span className="absolute left-3 top-3 rounded-full bg-navy-700/85 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur">
                        {item.industry}
                      </span>
                    </button>

                    {/* Card body */}
                    <div className="flex flex-1 flex-col p-5">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-red-600">
                          {item.productType}
                        </span>
                      </div>
                      <h3 className="font-heading text-base font-bold text-navy-900 line-clamp-1">
                        {item.clientName}
                      </h3>
                      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-gray-500 line-clamp-2">
                        {item.description}
                      </p>

                      {/* Features */}
                      <div className="mt-3 flex flex-wrap gap-1">
                        {item.features.slice(0, 3).map((f) => (
                          <span key={f} className="rounded-md bg-gray-50 px-2 py-0.5 text-[10px] text-gray-500">{f}</span>
                        ))}
                      </div>

                      <Link
                        href={`/gallery/${item.slug}`}
                        className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-red-600 transition-colors hover:text-red-500"
                      >
                        View Project <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </div>

      {/* ── Lightbox Modal ── */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white backdrop-blur transition-colors hover:bg-black/70"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Image */}
              <div className="relative aspect-video w-full bg-gradient-to-br from-navy-100 to-navy-200">
                <img src={selectedItem.imageSrc} alt={selectedItem.clientName}
                  className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                    {selectedItem.industry}
                  </span>
                  <h2 className="mt-3 font-heading text-2xl font-bold text-white md:text-3xl">
                    {selectedItem.clientName}
                  </h2>
                </div>
              </div>

              {/* Content */}
              <div className="overflow-y-auto p-6 md:p-8">
                <div className="mb-6 flex flex-wrap gap-2">
                  <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                    {selectedItem.productType}
                  </span>
                  {selectedItem.features.map((f) => (
                    <span key={f} className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">{f}</span>
                  ))}
                </div>

                <p className="mb-6 leading-relaxed text-gray-700">{selectedItem.description}</p>

                {/* Testimonial */}
                <blockquote className="relative rounded-xl border border-red-100 bg-red-50/50 p-5">
                  <Quote className="mb-2 h-5 w-5 text-red-300" />
                  <p className="text-sm italic leading-relaxed text-gray-700">"{selectedItem.testimonial}"</p>
                  <footer className="mt-3 flex items-center gap-2">
                    <Star className="h-3.5 w-3.5 fill-red-400 text-red-400" />
                    <span className="text-sm font-semibold text-navy-900">{selectedItem.testimonialAuthor}</span>
                    <span className="text-xs text-gray-400">— {selectedItem.testimonialRole}</span>
                  </footer>
                </blockquote>

                <div className="mt-6 flex gap-3">
                  <Link href={`/gallery/${selectedItem.slug}`}
                    className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700">
                    Full Project Details <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                  <Link href="/get-quote"
                    className="inline-flex items-center gap-2 rounded-lg border border-navy-300 px-5 py-2.5 text-sm font-semibold text-navy-700 transition-colors hover:bg-navy-50">
                    Start Your Project
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CTA Section ── */}
      <section className="bg-navy-900 px-4 py-16 text-white">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
            Ready to Create Your Own?
          </h2>
          <p className="mt-4 text-lg text-navy-300">
            Let's build an inflatable that makes your brand impossible to ignore.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/get-quote" className="rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700">
              Start Your Project
            </Link>
            <Link href="/contact" className="rounded-lg border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
