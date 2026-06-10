"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Tag,
  Star,
  Quote,
  CheckCircle,
  Clock,
  Ruler,
  Package,
  Share2,
  Mail,
  Phone,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────

interface GalleryDetail {
  slug: string;
  clientName: string;
  industry: string;
  productType: string;
  description: string;
  fullDescription: string;
  gradient: string;
  gradientLight: string;
  features: string[];
  specs: { label: string; value: string }[];
  testimonial: string;
  testimonialAuthor: string;
  testimonialRole: string;
  testimonialCompany: string;
  images: { gradient: string; label: string }[];
  timeline: { phase: string; description: string }[];
  result: string;
}

// ── Mock Data ────────────────────────────────────────────────────────────────

const GALLERY_DATA: Record<string, GalleryDetail> = {
  "frostbite-brewing-giant-can": {
    slug: "frostbite-brewing-giant-can",
    clientName: "FrostBite Brewing Co.",
    industry: "Food & Beverage",
    productType: "Product Replicas",
    description:
      "20-foot tall realistic beer can replica for nationwide summer festival tour.",
    fullDescription:
      "FrostBite Brewing approached InflataCraft Pro with an ambitious vision: a 20-foot tall, photo-realistic replica of their flagship FrostBite Lager can that would tour 18 major summer festivals across the United States. The challenge was creating an inflatable that could withstand the rigors of constant setup, teardown, and transport while maintaining showroom-quality appearance under intense festival lighting conditions — both day and night.",
    gradient: "from-amber-400 via-orange-500 to-red-500",
    gradientLight: "from-amber-100 via-orange-100 to-red-100",
    features: [
      "20ft total height",
      "UV-resistant dye-sublimated printing",
      "Internal RGB LED lighting system",
      "Rapid inflation (under 3 minutes)",
      "Reinforced base with wind tie-downs",
      "Custom transport case with wheels",
    ],
    specs: [
      { label: "Height", value: "20 ft (6.1 m)" },
      { label: "Diameter", value: "6 ft (1.8 m)" },
      { label: "Inflation Time", value: "< 3 minutes" },
      { label: "Material", value: "210D Oxford Polyester" },
      { label: "Print Method", value: "Dye-Sublimation UV" },
      { label: "Lighting", value: "96 RGB LED array" },
      { label: "Lead Time", value: "4 weeks" },
      { label: "Warranty", value: "2 years" },
    ],
    testimonial:
      "InflataCraft Pro turned our product into a 30-foot spectacle. The trade show booth traffic tripled, and we landed our biggest retail partner within two weeks of the event. The attention to detail on the can's labeling was extraordinary — it looked like a real can blown up to impossible proportions.",
    testimonialAuthor: "Marcus Chen",
    testimonialRole: "VP Marketing",
    testimonialCompany: "FrostBite Brewing",
    images: [
      { gradient: "from-amber-500 to-orange-600", label: "Festival Night View" },
      { gradient: "from-amber-300 to-yellow-400", label: "Daytime Setup" },
      { gradient: "from-orange-500 to-red-600", label: "Close-Up Detail" },
      { gradient: "from-amber-400 to-amber-600", label: "Event Crowd Shot" },
    ],
    timeline: [
      {
        phase: "Discovery & Design",
        description:
          "Our design team met with FrostBite's marketing department to understand their festival tour requirements. We produced 3D renderings within 48 hours, iterating on the label positioning and lighting placement to maximize visibility from all angles.",
      },
      {
        phase: "Engineering & Prototyping",
        description:
          "Engineers developed a custom internal frame to maintain the can's cylindrical shape even in windy conditions. A quarter-scale prototype was built and tested for structural integrity, print quality, and LED diffusion.",
      },
      {
        phase: "Production & QA",
        description:
          "Full-scale production commenced with premium 210D oxford polyester. Each panel was dye-sublimated individually for perfect color matching. The integrated LED system was pressure-tested across 100+ inflation cycles.",
      },
      {
        phase: "Delivery & Tour Support",
        description:
          "Delivered in a custom wheeled transport case with full setup documentation. Our support team remained on-call throughout the 18-city tour, providing same-day replacement parts when needed (zero incidents reported).",
      },
    ],
    result:
      "FrostBite Brewing reported a 270% increase in festival booth traffic, 4 major retail distribution deals signed within 90 days, and over 2.3 million social media impressions from festival-goer photos with the can.",
  },

  "apex-motors-finish-arch": {
    slug: "apex-motors-finish-arch",
    clientName: "Apex Motors",
    industry: "Automotive",
    productType: "Arches",
    description:
      "Branded finish-line arch for championship racing series. Twin-tunnel design with reinforced tie-down points.",
    fullDescription:
      "Apex Motors needed a commanding visual centerpiece for their sponsored racing championship series. The finish-line arch had to span 40 feet across the track, withstand high wind conditions, and feature bold branding visible from the grandstands 200 yards away. The twin-tunnel design allowed two lanes of traffic to pass through simultaneously.",
    gradient: "from-blue-600 via-blue-700 to-indigo-800",
    gradientLight: "from-blue-100 via-blue-200 to-indigo-200",
    features: [
      "40ft span width",
      "Twin-tunnel dual-lane design",
      "Category-3 wind rated tie-down system",
      "Reflective brand panels for night visibility",
      "2-hour setup by 2-person crew",
      "Modular sections for transport",
    ],
    specs: [
      { label: "Span Width", value: "40 ft (12.2 m)" },
      { label: "Height", value: "25 ft (7.6 m)" },
      { label: "Wind Rating", value: "Category 3 (130 mph)" },
      { label: "Material", value: "500D Cordura Nylon" },
      { label: "Print Method", value: "UV Direct-to-Fabric" },
      { label: "Setup Crew", value: "2 people, 2 hours" },
      { label: "Lead Time", value: "3 weeks" },
      { label: "Warranty", value: "3 years" },
    ],
    testimonial:
      "The arch withstood 40mph gusts during our final race weekend. Engineers really know what they're doing over there. The twin-tunnel design was a game-changer — cars could race through while fans took photos on both sides.",
    testimonialAuthor: "Derek Lawson",
    testimonialRole: "Events Director",
    testimonialCompany: "Apex Motors",
    images: [
      { gradient: "from-blue-700 to-indigo-800", label: "Race Day Arch" },
      { gradient: "from-blue-500 to-cyan-500", label: "Night Event" },
      { gradient: "from-blue-600 to-blue-800", label: "Setup Detail" },
      { gradient: "from-indigo-600 to-purple-700", label: "Crowd Perspective" },
    ],
    timeline: [
      {
        phase: "Site Survey & Engineering",
        description:
          "Team visited the racetrack to measure dimensions, assess wind patterns, and determine optimal anchor points. CAD models simulated wind loads up to 150 mph.",
      },
      {
        phase: "Fabrication",
        description:
          "500D Cordura nylon selected for extreme durability. Modular sections designed for compact transport in a single cargo van.",
      },
      {
        phase: "On-Site Installation",
        description:
          "Two-person crew completed full assembly in under 2 hours on race day morning. Wind tie-downs deployed in 15 minutes.",
      },
      {
        phase: "Event Support",
        description:
          "On-site technician monitored conditions throughout the 3-day event. Zero structural issues reported despite gusty conditions.",
      },
    ],
    result:
      "The arch became an iconic part of the race series branding, appearing in ESPN broadcast footage for all 8 championship races. Apex Motors renewed for a 3-year contract with additional arches for new venues.",
  },

  "snapchip-giant-bag": {
    slug: "snapchip-giant-bag",
    clientName: "SnapChip Snacks",
    industry: "CPG",
    productType: "Product Replicas",
    description:
      "Giant chip bag inflatable for supermarket grand openings across 12 states.",
    fullDescription:
      "SnapChip Snacks was launching a new product line and planned a 12-state supermarket grand opening tour. They needed a larger-than-life product replica that would stop shoppers in their tracks and create shareable photo moments. The challenge: the inflatable needed to look delicious up close while being durable enough for daily setup and teardown by store staff.",
    gradient: "from-yellow-300 via-yellow-400 to-orange-400",
    gradientLight: "from-yellow-100 via-amber-100 to-orange-100",
    features: [
      "Photo-realistic food product printing",
      "Weatherproof sealed seams",
      "Compact storage (fits in sedan trunk)",
      "Electric pump included",
      "Internal LED for evening events",
      "Damage-resistant lower panels",
    ],
    specs: [
      { label: "Height", value: "8 ft (2.4 m)" },
      { label: "Width", value: "5 ft (1.5 m)" },
      { label: "Depth", value: "3 ft (0.9 m)" },
      { label: "Material", value: "210D Oxford Polyester" },
      { label: "Print Resolution", value: "720 DPI" },
      { label: "Packaged Weight", value: "32 lbs" },
      { label: "Lead Time", value: "3 weeks" },
      { label: "Quantity", value: "200 units" },
    ],
    testimonial:
      "The giant chip bag was the talk of our grand opening tour. Kids lined up for photos, parents posted on social media — organic reach went through the roof. Worth every penny. We're already planning the next flavor launch.",
    testimonialAuthor: "Emily Takahashi",
    testimonialRole: "Trade Marketing Lead",
    testimonialCompany: "SnapChip Snacks",
    images: [
      { gradient: "from-yellow-400 to-orange-500", label: "Store Display" },
      { gradient: "from-yellow-300 to-amber-400", label: "Customer Photo Op" },
      { gradient: "from-orange-400 to-red-400", label: "Detail Closeup" },
      { gradient: "from-yellow-400 to-lime-400", label: "Night LED View" },
    ],
    timeline: [
      {
        phase: "Design & Sampling",
        description:
          "Received SnapChip's packaging artwork and created a 3D model within 24 hours. Physical color swatches approved before full production.",
      },
      {
        phase: "Mass Production",
        description:
          "All 200 units produced in 3 weeks using parallel production lines. Each unit individually QC-checked for print alignment and seam integrity.",
      },
      {
        phase: "Distribution",
        description:
          "Units drop-shipped directly to 200 store locations in 12 states. Each package included a setup guide, electric pump, and spare repair kit.",
      },
      {
        phase: "Campaign Results",
        description:
          "Store managers reported 35% higher foot traffic during grand opening weeks compared to previous launches. Over 50,000 social media posts tagged #SnapChipGiantBag.",
      },
    ],
    result:
      "The campaign generated 50,000+ social media posts, 12 million organic impressions, and a 22% sales lift across participating stores in the first month post-launch.",
  },
};

// ── Page Component ───────────────────────────────────────────────────────────

export default function GalleryDetailPage() {
  const params = useParams();
  const slug = params.id as string;
  const detail = GALLERY_DATA[slug];

  // If slug not found, show fallback with generic render from first item
  if (!detail) {
    const fallbackItem = Object.values(GALLERY_DATA)[0];
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 py-20 text-center">
          <h1 className="font-heading text-3xl font-bold text-navy-900">
            Project Not Found
          </h1>
          <p className="mt-4 text-gray-500">
            The gallery project you're looking for doesn't exist or has been moved.
          </p>
          <Link
            href="/gallery"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-navy-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Gallery
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Breadcrumb ── */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-navy-700 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/gallery" className="hover:text-navy-700 transition-colors">
              Gallery
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="font-medium text-navy-900">{detail.clientName}</span>
          </nav>
        </div>
      </div>

      {/* ── Hero Section ── */}
      <section className="bg-navy-900 text-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid gap-0 lg:grid-cols-2 lg:gap-12">
            {/* Hero Image */}
            <div
              className={cn(
                "flex min-h-[300px] items-center justify-center bg-gradient-to-br lg:min-h-[500px]",
                detail.gradient
              )}
            >
              <span className="text-center text-2xl font-bold text-white/80 drop-shadow-lg lg:text-3xl">
                {detail.clientName}
              </span>
            </div>

            {/* Hero Content */}
            <div className="flex flex-col justify-center px-4 py-10 lg:py-16">
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                  <Building2 className="h-3 w-3" />
                  {detail.industry}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-red-500/30 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                  <Tag className="h-3 w-3" />
                  {detail.productType}
                </span>
              </div>
              <h1 className="mb-4 font-heading text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                {detail.clientName}
              </h1>
              <p className="mb-6 text-lg leading-relaxed text-navy-300">
                {detail.description}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/get-quote"
                  className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold shadow-md shadow-red-600/30 transition-all hover:bg-red-500"
                >
                  Start Your Project
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="tel:1-800-INFLATA"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 px-6 py-3 text-sm font-semibold backdrop-blur-sm transition-all hover:border-white/60 hover:bg-white/10"
                >
                  <Phone className="h-4 w-4" />
                  1-800-INFLATA
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* ── Main Content ── */}
          <div className="lg:col-span-2 space-y-12">
            {/* Full Description */}
            <section>
              <h2 className="mb-4 font-heading text-2xl font-bold text-navy-900">
                Project Overview
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {detail.fullDescription}
              </p>
            </section>

            {/* Image Gallery */}
            <section>
              <h2 className="mb-6 font-heading text-2xl font-bold text-navy-900">
                Project Gallery
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {detail.images.map((img, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={cn(
                      "flex h-40 items-center justify-center rounded-xl bg-gradient-to-br sm:h-52",
                      img.gradient,
                      idx === 3 && "col-span-2 sm:h-64"
                    )}
                  >
                    <span className="text-sm font-semibold text-white/70 drop-shadow">
                      {img.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Production Timeline */}
            <section>
              <h2 className="mb-6 font-heading text-2xl font-bold text-navy-900">
                Production Timeline
              </h2>
              <div className="relative space-y-8">
                {/* Vertical line */}
                <div className="absolute left-5 top-2 bottom-2 w-0.5 bg-navy-200" />
                {detail.timeline.map((phase, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative pl-14"
                  >
                    <div className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-navy-700 text-sm font-bold text-white shadow">
                      {idx + 1}
                    </div>
                    <h3 className="mb-2 font-heading text-lg font-bold text-navy-900">
                      {phase.phase}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {phase.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Results */}
            <section className="rounded-2xl border-2 border-red-200 bg-red-50 p-6 sm:p-8">
              <div className="mb-3 flex items-center gap-2">
                <Star className="h-5 w-5 fill-red-500 text-red-500" />
                <h2 className="font-heading text-2xl font-bold text-navy-900">
                  Campaign Results
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed">{detail.result}</p>
            </section>

            {/* Testimonial */}
            <section>
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                <Quote className="mb-4 h-8 w-8 text-red-200" />
                <blockquote className="mb-6 text-lg leading-relaxed text-gray-700 italic">
                  &ldquo;{detail.testimonial}&rdquo;
                </blockquote>
                <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-700 text-lg font-bold text-white">
                    {detail.testimonialAuthor.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-navy-900">
                      {detail.testimonialAuthor}
                    </p>
                    <p className="text-sm text-gray-500">
                      {detail.testimonialRole}, {detail.testimonialCompany}
                    </p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Share + CTA */}
            <section className="flex flex-col gap-4 rounded-2xl bg-navy-900 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <h2 className="font-heading text-xl font-bold text-white">
                  Inspired by This Project?
                </h2>
                <p className="mt-1 text-navy-300">
                  Let's build something incredible for your brand.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/get-quote"
                  className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-red-500"
                >
                  Request a Quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </button>
              </div>
            </section>
          </div>

          {/* ── Sidebar ── */}
          <aside className="space-y-8">
            {/* Specs Card */}
            <div className="sticky top-[130px] rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 flex items-center gap-2 font-heading text-lg font-bold text-navy-900">
                <Ruler className="h-5 w-5 text-navy-400" />
                Technical Specs
              </h3>
              <div className="space-y-3">
                {detail.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2.5"
                  >
                    <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
                      {spec.label}
                    </span>
                    <span className="text-sm font-semibold text-navy-900">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Quick Features */}
              <h3 className="mb-4 mt-8 flex items-center gap-2 font-heading text-lg font-bold text-navy-900">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Key Features
              </h3>
              <ul className="space-y-2.5">
                {detail.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                    {feat}
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-gray-100 pt-6">
                <Link
                  href="/get-quote"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-red-500 shadow-md shadow-red-600/20"
                >
                  <Mail className="h-4 w-4" />
                  Request Similar Project
                </Link>
                <p className="mt-3 text-center text-xs text-gray-400">
                  Free consultation &amp; 3D rendering included
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ── Related Projects CTA ── */}
      <section className="border-t border-gray-200 bg-white py-12">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-navy-700 px-8 py-3 text-sm font-semibold text-navy-700 transition-all hover:bg-navy-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Gallery
          </Link>
        </div>
      </section>
    </div>
  );
}
