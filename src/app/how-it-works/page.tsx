"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  MessageSquareText,
  Boxes,
  CheckCheck,
  Factory,
  Truck,
  ChevronDown,
  ArrowRight,
  Phone,
  Clock,
  Lightbulb,
  FileCheck,
  ShieldCheck,
  Globe,
  Ruler,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────

interface ProcessStep {
  number: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  timeline: string;
}

// ── Process Data ─────────────────────────────────────────────────────────────

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: 1,
    icon: MessageSquareText,
    title: "Consultation & Discovery",
    subtitle: "Share your vision, we'll assess feasibility",
    description:
      "Every project begins with a conversation. We learn about your brand, your goals, and the experience you want to create. Our team evaluates technical requirements, material considerations, and timeline constraints so you know what's possible before you commit.",
    details: [
      "Free 30-minute consultation with a project specialist",
      "Share sketches, reference photos, or napkin drawings",
      "Receive a preliminary feasibility assessment within 24 hours",
      "Discuss budget ranges and production timelines",
    ],
    timeline: "Day 1–3",
  },
  {
    number: 2,
    icon: Boxes,
    title: "3D Design & Rendering",
    subtitle: "Our designers create photorealistic 3D renderings",
    description:
      "Our in-house design team transforms your concept into a detailed 3D model. We produce photorealistic renderings showing your inflatable from every angle — in your brand colors, with your logos, and in context so you can visualize exactly how it will look at your event or activation.",
    details: [
      "Professional 3D modeling from your reference materials",
      "Photorealistic renderings with multiple angle views",
      "Pantone-accurate color matching for brand consistency",
      "Engineering review for structural integrity and safety",
    ],
    timeline: "Day 2–5",
  },
  {
    number: 3,
    icon: CheckCheck,
    title: "Design Approval",
    subtitle: "Review, annotate, and approve your custom design",
    description:
      "You receive a private design review portal where you can inspect every detail, leave annotations directly on the 3D model, and request unlimited revisions. Nothing moves to production until you're 100% satisfied with every stitch, seam, and color.",
    details: [
      "Interactive 3D model viewer for 360° inspection",
      "Unlimited revision rounds at no extra charge",
      "Direct annotations on the design from your browser",
      "Digital sign-off triggers the production phase",
    ],
    timeline: "Day 4–7",
  },
  {
    number: 4,
    icon: Factory,
    title: "Production & Quality",
    subtitle: "3-6 week manufacturing with 24-hour inflation test",
    description:
      "Once approved, your design moves to our US manufacturing facility. Our skilled technicians cut, sew, and print using commercial-grade materials. Every inflatable undergoes a mandatory 24-hour continuous inflation test to ensure zero defects before it leaves our facility.",
    details: [
      "Premium 210D–500D fabric selection based on use case",
      "Dye-sublimation printing for vibrant, fade-resistant graphics",
      "Reinforced double-stitched seams at all stress points",
      "24-hour inflation quality test with inspection checklist",
    ],
    timeline: "Week 1–6",
  },
  {
    number: 5,
    icon: Truck,
    title: "Shipping & Delivery",
    subtitle: "Global shipping with tracking and installation support",
    description:
      "Your finished inflatable is carefully packed in a heavy-duty transport case with blower, repair kit, stakes, and printed setup guide. We ship worldwide with full tracking and insurance. Our support team provides setup assistance to ensure a flawless first deployment.",
    details: [
      "Heavy-duty wheeled transport case included",
      "Full insurance and tracking on every shipment",
      "Setup guide, video instructions, and phone support",
      "International shipping with customs documentation handled",
    ],
    timeline: "Week 6–8",
  },
];

// ── FAQ Data ──────────────────────────────────────────────────────────────────

interface ProcessFAQ {
  q: string;
  a: string;
}

const PROCESS_FAQS: ProcessFAQ[] = [
  {
    q: "How long does the entire process take from start to finish?",
    a: "From initial consultation to delivery, most projects complete within 6–10 weeks. Simple products (like standard tents) can ship in as little as 3 weeks. Complex items (like giant replicas with integrated lighting) may take 8–10 weeks. Rush production can shorten timelines to 5–14 days for an additional fee.",
  },
  {
    q: "Do I need to provide design files?",
    a: "Not at all. We can work from anything — a sketch on a napkin, a photo from your phone, an existing logo file, or just a verbal description. If you have vector files (AI, EPS, SVG), they help speed things up, but they're never required. Our design team handles everything.",
  },
  {
    q: "How many revision rounds are included?",
    a: "Unlimited. We revise until you're completely satisfied. Most clients approve after 1–3 rounds. Our interactive 3D viewer lets you annotate directly on the model, making revisions fast and precise. No extra fees, no rush charges for revisions.",
  },
  {
    q: "What if I need changes after production starts?",
    a: "We try to accommodate changes whenever possible. Changes requested before cutting and sewing are usually straightforward. Mid-production changes may incur additional costs depending on how far along we are, but we'll always be transparent about any impact on timeline or pricing.",
  },
  {
    q: "Do you offer installation support?",
    a: "Absolutely. Every order includes a printed setup guide and access to video tutorials. Our support team is available by phone during your first deployment. For large installations or high-profile events, we can send an on-site technician at an additional cost.",
  },
];

// ── Animation Variants ───────────────────────────────────────────────────────

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

// ── Components ───────────────────────────────────────────────────────────────

function ProcessStepCard({
  step,
  index,
  isLast,
}: {
  step: ProcessStep;
  index: number;
  isLast: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = step.icon;

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeInUp}
      className="relative"
    >
      {/* Connecting line (desktop) */}
      {!isLast && (
        <div className="absolute left-[39px] top-20 bottom-0 hidden w-0.5 bg-gradient-to-b from-red-500 via-red-400 to-navy-200 md:block" />
      )}

      <div className="flex gap-6">
        {/* Step number + icon column */}
        <div className="relative z-10 flex flex-col items-center flex-shrink-0">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-navy-700 to-navy-900 shadow-lg shadow-navy-900/20">
            <Icon className="h-8 w-8 text-red-400" />
          </div>
          <div className="mt-3 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white shadow-md shadow-red-600/30">
            {step.number}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 pt-2 pb-10">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h3 className="font-heading text-xl font-bold text-navy-900 md:text-2xl">
              {step.title}
            </h3>
            <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
              <Clock className="h-3 w-3" />
              {step.timeline}
            </span>
          </div>
          <p className="text-sm font-medium text-red-600 mb-3">
            {step.subtitle}
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            {step.description}
          </p>

          {/* Expandable details */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-700 hover:text-red-600 transition-colors"
          >
            {isExpanded ? "Hide details" : "What's included"}
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform",
                isExpanded && "rotate-180"
              )}
            />
          </button>

          {isExpanded && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 space-y-2 overflow-hidden"
            >
              {step.details.map((detail, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-gray-600"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500" />
                  {detail}
                </li>
              ))}
            </motion.ul>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function FAQAccordion({ faq, defaultOpen = false }: { faq: ProcessFAQ; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="rounded-xl border border-navy-200 bg-white overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-navy-50/50"
      >
        <span className="font-semibold text-navy-900 pr-4">{faq.q}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 flex-shrink-0 text-navy-400 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="overflow-hidden"
        >
          <p className="px-6 pb-5 text-gray-600 leading-relaxed">{faq.a}</p>
        </motion.div>
      )}
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ═══ Hero Section ═══ */}
      <section className="relative overflow-hidden bg-navy-900 px-4 py-20 md:py-28">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25px 25px, white 2px, transparent 0)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="container relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="mb-3 inline-block rounded-full bg-red-600/20 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-red-400">
              Our Process
            </p>
            <h1 className="font-heading text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              From Idea to Inflatable
            </h1>
            <p className="mt-4 text-xl font-semibold text-red-400">
              Our Proven 5-Step Process
            </p>
            <p className="mt-6 text-lg text-navy-300 leading-relaxed max-w-2xl mx-auto">
              We&apos;ve refined our manufacturing process over 20+ years to
              deliver exceptional quality on every project. Here&apos;s exactly
              how we bring your vision to life.
            </p>

            {/* Quick stats */}
            <div className="mt-10 grid grid-cols-3 gap-6 mx-auto max-w-lg">
              {[
                { value: "24h", label: "Initial Response" },
                { value: "3-6", label: "Weeks Production" },
                { value: "98%", label: "On-Time Delivery" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-white md:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs font-medium text-navy-400 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ 5-Step Process Timeline ═══ */}
      <section className="px-4 py-20 md:py-28">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            custom={0}
            className="mb-16 text-center"
          >
            <h2 className="font-heading text-3xl font-bold text-navy-900 md:text-4xl">
              Your Journey, Step by Step
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Every project follows a proven path — transparent, collaborative,
              and engineered for success.
            </p>
          </motion.div>

          <div>
            {PROCESS_STEPS.map((step, idx) => (
              <ProcessStepCard
                key={step.number}
                step={step}
                index={idx}
                isLast={idx === PROCESS_STEPS.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Timeline Overview ═══ */}
      <section className="bg-navy-900 px-4 py-20">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            custom={0}
            className="mb-16 text-center"
          >
            <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
              Project Timeline at a Glance
            </h2>
            <p className="mt-4 text-lg text-navy-300 max-w-2xl mx-auto">
              Average durations for each phase. Rush options available for
              time-sensitive projects.
            </p>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {PROCESS_STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  custom={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="relative rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-red-600/20">
                    <Icon className="h-6 w-6 text-red-400" />
                  </div>
                  <div className="mt-4 font-heading text-lg font-bold text-white">
                    {step.title.split(" & ")[0]}
                  </div>
                  <div className="mt-2 text-sm text-navy-300">
                    {step.timeline}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ Process Guarantees ═══ */}
      <section className="px-4 py-20">
        <div className="container mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Lightbulb,
                title: "Free 3D Renderings",
                desc: "See your inflatable before you spend a dollar. Our renderings are photorealistic and unlimited revisions are included.",
              },
              {
                icon: FileCheck,
                title: "Design Approval Required",
                desc: "Nothing enters production without your explicit sign-off. We never cut corners or skip your review.",
              },
              {
                icon: ShieldCheck,
                title: "24-Hour Quality Test",
                desc: "Every inflatable is continuously inflated for 24 hours as part of our quality control. Zero defects, guaranteed.",
              },
            ].map((guarantee, idx) => (
              <motion.div
                key={guarantee.title}
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="rounded-2xl border border-navy-200 bg-white p-8 text-center shadow-sm"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">
                  <guarantee.icon className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="mt-5 font-heading text-lg font-bold text-navy-900">
                  {guarantee.title}
                </h3>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  {guarantee.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Process FAQ ═══ */}
      <section className="bg-white px-4 py-20 border-t border-navy-100">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            custom={0}
            className="mb-12 text-center"
          >
            <h2 className="font-heading text-3xl font-bold text-navy-900 md:text-4xl">
              Questions About Our Process?
            </h2>
            <p className="mt-4 text-gray-600">
              Common questions about how we work — from timelines to revisions.
            </p>
          </motion.div>

          <div className="space-y-3">
            {PROCESS_FAQS.map((faq, idx) => (
              <FAQAccordion key={idx} faq={faq} defaultOpen={idx === 0} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 text-sm font-semibold text-navy-700 hover:text-red-600 transition-colors"
            >
              View all FAQs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ CTA Banner ═══ */}
      <section className="bg-navy-900 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-8 rounded-2xl bg-gradient-to-r from-navy-800 via-navy-900 to-navy-800 px-8 py-12 md:flex-row md:px-16">
            <div>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
                Start Your Project Today
              </h2>
              <p className="mt-3 max-w-lg text-lg text-navy-300">
                Ready to begin? Our team will create a free 3D rendering of your
                design within 48 hours. No commitment required.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <a
                href="tel:+86 1576427736"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 px-6 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/60 hover:bg-white/10"
              >
                <Phone className="h-5 w-5" />
                +86 1576427736
              </a>
              <Link
                href="/get-quote"
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-red-600/30 transition-all hover:bg-red-500 hover:shadow-red-500/40 active:scale-95"
              >
                Get Free Quote
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
