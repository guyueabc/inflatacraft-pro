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
  | "Tents"
  | "Games";

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
  "Games",
];

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1, slug: "giant-beverage-can-replica", clientName: "Giant Beverage Can",
    industry: "Food & Beverage", productType: "Product Replicas",
    description: "Massive inflatable beverage can standing outdoors at a promotional event, demonstrating how product replicas create instant brand recognition at trade shows and festivals.",
    testimonial: "The giant can replica became our most photographed marketing asset. Event attendees couldn't walk past without taking a selfie.",
    testimonialAuthor: "Brandon Miller", testimonialRole: "Events Director",
    gradient: "from-amber-400 via-orange-500 to-red-500",
    imageSrc: "/images/products/giant-soda-can-replica/giant-soda-can-replica-1.jpg?v=1",
    features: ["20ft height", "UV-resistant print", "LED lighting", "Rapid setup"],
  },
  {
    id: 2, slug: "event-finish-arch", clientName: "Outdoor Event Arch",
    industry: "Sports", productType: "Arches",
    description: "Large branded inflatable arch spanning across an outdoor venue entrance, ideal for marathons, charity walks, and community festivals needing a standout gateway.",
    testimonial: "The arch held up perfectly through wind and rain all weekend. Our sponsors were thrilled with the visibility.",
    testimonialAuthor: "Sarah Collins", testimonialRole: "Race Coordinator",
    gradient: "from-blue-600 via-blue-700 to-indigo-800",
    imageSrc: "/images/products/finish-line-arch/finish-line-arch-1.jpg?v=1",
    features: ["Weather-resistant", "Quick inflate", "Branded panels", "Stake kit included"],
  },
  {
    id: 3, slug: "giant-chip-bag-display", clientName: "Giant Snack Bag Display",
    industry: "Food & Beverage", productType: "Product Replicas",
    description: "Oversized snack chip bag inflatable used for supermarket grand openings and retail promotions, turning an everyday product into a crowd-drawing attraction.",
    testimonial: "We placed these at store entrances and saw foot traffic increase 35% on launch day. Kids dragged their parents straight to the display.",
    testimonialAuthor: "Lisa Park", testimonialRole: "Retail Marketing Manager",
    gradient: "from-yellow-300 via-yellow-400 to-orange-400",
    imageSrc: "/images/products/snapchip-bag.jpg?v=1",
    features: ["Photo-realistic print", "Weatherproof", "Indoor/outdoor", "Compact storage"],
  },
  {
    id: 4, slug: "cartoon-mascot-character", clientName: "Custom Cartoon Mascot",
    industry: "Sports", productType: "Mascots",
    description: "Friendly cartoon-style inflatable mascot character perfect for sports teams, schools, and brand activations needing a larger-than-life ambassador.",
    testimonial: "Kids ran up to hug our mascot at every game. It became the face of our team's community outreach program.",
    testimonialAuthor: "Mike Donovan", testimonialRole: "Community Relations",
    gradient: "from-blue-500 via-cyan-400 to-teal-400",
    imageSrc: "/images/products/custom-brand-mascot/custom-brand-mascot-2.jpg?v=1",
    features: ["7ft tall", "Custom design", "Indoor/outdoor", "Blower included"],
  },
  {
    id: 5, slug: "branded-event-tent", clientName: "Custom Branded Event Tent",
    industry: "Retail", productType: "Tents",
    description: "Fully custom-printed inflatable event tent with full-wrap graphics, serving as a portable branded space for product demos, sampling, and outdoor activations.",
    testimonial: "We deployed these at 200 locations simultaneously. Setup took 15 minutes per tent and the branding looked flawless.",
    testimonialAuthor: "Jennifer Walsh", testimonialRole: "National Events Manager",
    gradient: "from-purple-500 via-purple-600 to-fuchsia-600",
    imageSrc: "/images/products/custom-inflatable-event-tent/custom-inflatable-event-tent-2.jpg?v=1",
    features: ["Full-wrap print", "15min setup", "UV-resistant", "Multiple sizes"],
  },
  {
    id: 6, slug: "inflatable-gorilla-suit", clientName: "Inflatable Gorilla Suit",
    industry: "Retail", productType: "Costumes",
    description: "Realistic inflatable gorilla costume worn at promotional events, instantly turning any staff member into a viral-worthy attention magnet.",
    testimonial: "We sent a gorilla-suited team member to our store opening and the photos went viral locally. Best $900 we ever spent.",
    testimonialAuthor: "Frank Delgado", testimonialRole: "Store Owner",
    gradient: "from-gray-600 via-gray-700 to-gray-800",
    imageSrc: "/images/products/gorilla-mascot-suit/gorilla-mascot-suit-1.jpg?v=1",
    features: ["Battery fan", "Fits up to 6'6\"", "Realistic print", "5-7hr runtime"],
  },
  {
    id: 7, slug: "inflatable-walking-costume", clientName: "Inflatable Character Costume",
    industry: "Food & Beverage", productType: "Costumes",
    description: "Wearable inflatable costume with built-in battery fan, transforming brand ambassadors into walking attention magnets at parades, store openings, and festivals.",
    testimonial: "Our street team wore these for 6-hour shifts — comfortable, eye-catching, and generated hundreds of photos every hour.",
    testimonialAuthor: "Carlos Herrera", testimonialRole: "Field Marketing Lead",
    gradient: "from-green-400 via-lime-500 to-yellow-300",
    imageSrc: "/images/products/inflatable-character-costume/inflatable-character-costume-1.jpg?v=1",
    features: ["Battery fan", "Lightweight", "Breathable", "One-size adjustable"],
  },
  {
    id: 8, slug: "giant-obstacle-course", clientName: "Giant Obstacle Course",
    industry: "Sports", productType: "Games",
    description: "Massive inflatable obstacle course set up at an outdoor festival, providing competitive fun for corporate team building, school events, and community festivals.",
    testimonial: "Our company retreat had actual adults racing through this like kids. Team morale went through the roof.",
    testimonialAuthor: "Rachel Dunn", testimonialRole: "HR Director",
    gradient: "from-blue-500 via-purple-500 to-pink-500",
    imageSrc: "/images/products/inflatable-obstacle-course/inflatable-obstacle-course-1.jpg?v=1",
    features: ["60ft length", "Multiple obstacles", "Industrial blowers", "Safety certified"],
  },
  {
    id: 9, slug: "sky-dancer-tube-man", clientName: "Sky Dancer Tube Man",
    industry: "Automotive", productType: "Product Replicas",
    description: "Classic attention-grabbing sky dancer inflatable — the flailing arm tube man that's been drawing eyes to car dealerships, retail stores, and events for decades.",
    testimonial: "People literally pull off the highway when they see the tube man. Best advertising investment we've made.",
    testimonialAuthor: "Tony Russo", testimonialRole: "Dealership Owner",
    gradient: "from-orange-500 via-red-500 to-pink-500",
    imageSrc: "/images/products/dancing-tube-man/dancing-tube-man-1.jpg?v=1",
    features: ["10-20ft options", "Continuous motion", "All-weather", "Low power usage"],
  },
  {
    id: 10, slug: "inflatable-carnival-game", clientName: "Inflatable Carnival Game",
    industry: "Sports", productType: "Games",
    description: "Large interactive inflatable play attraction set up at an outdoor carnival, providing engaging entertainment for families, school fairs, amusement parks, and corporate fun days.",
    testimonial: "We brought this to our annual company picnic and it was the star of the show. Three hours of nonstop laughter and friendly competition.",
    testimonialAuthor: "Kevin O'Brien", testimonialRole: "Event Organizer",
    gradient: "from-red-500 via-yellow-500 to-blue-500",
    imageSrc: "/images/products/interactive-dart-board/interactive-dart-board-1.jpg?v=1",
    features: ["Interactive gameplay", "All ages", "Quick inflation", "Indoor/outdoor"],
  },
  {
    id: 11, slug: "retail-outreach-tent", clientName: "Community Event Tent",
    industry: "Retail", productType: "Tents",
    description: "Branded inflatable tent set up at a community outreach event, providing shade and a welcoming branded space for product sampling and customer engagement.",
    testimonial: "These tents made our pop-up events feel professional and inviting. Setup was so easy our volunteers could handle it.",
    testimonialAuthor: "Patricia Owens", testimonialRole: "Community Outreach Director",
    gradient: "from-red-500 via-red-600 to-white",
    imageSrc: "/images/products/custom-inflatable-event-tent/custom-inflatable-event-tent-1.jpg?v=1",
    features: ["Retractable sides", "Demo counter", "Brand-matched", "10x10 / 10x20"],
  },
  {
    id: 12, slug: "character-mascot-outdoor", clientName: "Outdoor Character Mascot",
    industry: "Medical", productType: "Mascots",
    description: "Friendly character inflatable mascot displayed at an outdoor health awareness event, creating a soft, approachable presence that draws families and children.",
    testimonial: "The mascot was the perfect icebreaker. Families who'd normally walk past stopped to learn about our health screening program.",
    testimonialAuthor: "Nurse Angela Diaz", testimonialRole: "Public Health Educator",
    gradient: "from-red-400 via-pink-400 to-rose-400",
    imageSrc: "/images/products/custom-brand-mascot/custom-brand-mascot-1.jpg?v=1",
    features: ["Soft-touch exterior", "Child-friendly", "Easy transport", "Indoor/outdoor"],
  },
  {
    id: 13, slug: "portable-event-dome", clientName: "Portable Event Dome",
    industry: "Retail", productType: "Tents",
    description: "Compact inflatable dome structure providing an enclosed branded environment for VIP experiences, product demos, and immersive pop-up activations.",
    testimonial: "The dome gave our pop-up store a premium feel that customers didn't expect. It elevated the entire brand experience.",
    testimonialAuthor: "Marco Silva", testimonialRole: "Pop-Up Experience Designer",
    gradient: "from-teal-400 via-cyan-500 to-blue-500",
    imageSrc: "/images/products/pop-up-dome-canopy/pop-up-dome-canopy-1.jpg?v=1",
    features: ["12ft diameter", "Climate control", "LED lighting", "Quick deploy"],
  },
  {
    id: 14, slug: "wearable-can-costume", clientName: "Wearable Can Costume",
    industry: "Food & Beverage", productType: "Costumes",
    description: "Inflatable beverage can costume worn by promotional staff at a major sports event, turning team members into living advertisements that fans love to photograph.",
    testimonial: "The halftime crew in these costumes generated more social media impressions than our entire season's digital ad spend.",
    testimonialAuthor: "Derek Foster", testimonialRole: "Sponsorship Manager",
    gradient: "from-blue-500 via-blue-600 to-red-500",
    imageSrc: "/images/products/inflatable-character-costume/inflatable-character-costume-2.jpg?v=1",
    features: ["360掳 print", "Quick-release", "Event-grade", "Rechargeable fan"],
  },
  {
    id: 15, slug: "sports-tunnel-arch", clientName: "Sports Entry Tunnel",
    industry: "Sports", productType: "Arches",
    description: "Massive inflatable entry tunnel built for high-energy sports events, creating dramatic player entrances and an unforgettable spectator experience.",
    testimonial: "When our team ran through this tunnel, the crowd erupted. It set the tone for the entire event.",
    testimonialAuthor: "Coach Williams", testimonialRole: "Athletic Director",
    gradient: "from-blue-600 via-silver-400 to-red-600",
    imageSrc: "/images/products/helmet-tunnel-arch/helmet-tunnel-arch-1.jpg?v=1",
    features: ["Industrial blowers", "Heavy-duty fabric", "Custom colors", "Pro-grade stitching"],
  },
  {
    id: 16, slug: "giant-shoe-replica", clientName: "Giant Shoe Replica",
    industry: "Sports", productType: "Product Replicas",
    description: "Massive inflatable sneaker model displayed at a sports expo, turning footwear into a towering landmark that draws crowds and generates social media buzz.",
    testimonial: "The giant shoe was the most photographed object at the marathon expo. Every runner wanted a picture next to it.",
    testimonialAuthor: "Jordan Blake", testimonialRole: "Brand Experience Director",
    gradient: "from-orange-500 via-red-500 to-pink-500",
    imageSrc: "/images/products/helmet-tunnel-arch/helmet-tunnel-arch-2.jpg?v=1",
    features: ["Photo-realistic", "Indoor/outdoor", "Custom design", "Quick setup"],
  },
];

// ── Page Component ───────────────────────────────────────────────────────────

export function GalleryPageClient() {
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
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
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
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            {/* Search */}
            <div className="relative w-full sm:flex-1 sm:min-w-[200px] sm:max-w-sm">
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
            <div className="flex gap-1.5 overflow-x-auto pb-1 sm:flex-wrap sm:pb-0">
              {INDUSTRIES.map((ind) => (
                <button key={ind} onClick={() => setIndustryFilter(ind)}
                  className={cn(
                    "rounded-full px-2 py-1 text-[10px] font-medium transition-all sm:px-3 sm:py-1.5 sm:text-xs",
                    industryFilter === ind
                      ? "bg-navy-700 text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  )}>{ind}</button>
              ))}
            </div>
            {/* Product type pills */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 sm:flex-wrap sm:pb-0">
              {PRODUCT_TYPES.map((pt) => (
                <button key={pt} onClick={() => setProductFilter(pt)}
                  className={cn(
                    "rounded-full px-2 py-1 text-[10px] font-medium transition-all sm:px-3 sm:py-1.5 sm:text-xs",
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
                    className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 w-full"
                  >
                    {/* Image */}
                    <button
                      type="button"
                      onClick={() => setSelectedItem(item)}
                      className="relative aspect-video sm:aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-navy-50 to-navy-100"
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
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
                className="absolute right-4 top-4 z-10 rounded-full bg-black/60 p-2 text-white transition-colors hover:bg-black/80"
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
                    <span className="text-xs text-gray-400">—{selectedItem.testimonialRole}</span>
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
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <Link href="/get-quote" className="w-full rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700 sm:w-auto">
              Start Your Project
            </Link>
            <Link href="/contact" className="w-full rounded-lg border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20 sm:w-auto">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
