"use client";
import Image from "next/image";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Lightbulb,
  Heart,

  CheckCircle2,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────

interface ValueProp {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}


// ── Data ─────────────────────────────────────────────────────────────────────

const VALUES: ValueProp[] = [
  {
    icon: Lightbulb,
    title: "Project Planning",
    description:
      "Share the intended use, approximate size, branding requirements, deadline, and reference images so the project can be reviewed before specifications are confirmed.",
  },
  {
    icon: Heart,
    title: "Clear Communication",
    description:
      "Use the online quote form or WhatsApp to discuss project-specific requirements and confirm the next steps.",
  },
];


const TRUST_BADGES = [
  { label: "Contact", value: "WhatsApp", icon: MessageCircle },
  { label: "Planning", value: "Project-specific", icon: CheckCircle2 },
];

// ── Animation Variants ───────────────────────────────────────────────────────

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" as const },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

// ── Main Page ────────────────────────────────────────────────────────────────

export function AboutPageClient() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-navy-900 px-4 py-20 md:py-32">
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
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Text column */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="mb-3 inline-block rounded-full bg-red-600/20 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-red-400">
                About Us
              </p>
              <h1 className="font-heading text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                Custom Inflatable Project Support
              </h1>
              <p className="mt-6 text-lg text-navy-300 leading-relaxed max-w-xl">
                Explore project-planning information for custom inflatable products and share your requirements through the online quote form or WhatsApp.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {TRUST_BADGES.map((badge) => (
                  <span
                    key={badge.label}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm"
                  >
                    <badge.icon className="h-4 w-4 text-red-400" />
                    {badge.label}:{" "}
                    <span className="font-bold text-red-400">
                      {badge.value}
                    </span>
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Hero image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-2xl bg-gradient-to-br from-navy-800 to-navy-700 border border-white/10 overflow-hidden">
                <Image
                  src="/images/products/custom-inflatable-event-tent/custom-inflatable-event-tent-1.jpg?v=1"
                  alt="Custom inflatable event tent example"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                width={800} height={600} unoptimized />
              </div>
              {/* Decorative accent */}
              <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-2xl bg-red-600/20 border border-red-600/30 backdrop-blur-sm hidden lg:block" />
              <div className="absolute -top-4 -left-4 h-16 w-16 rounded-2xl bg-navy-600/50 border border-white/10 backdrop-blur-sm hidden lg:block" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="px-4 py-20 md:py-28">
        <div className="container mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Image */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-2xl bg-gradient-to-br from-navy-100 to-navy-50 border border-navy-200 overflow-hidden">
                <Image
                  src="/images/products/pop-up-dome-canopy/pop-up-dome-canopy-1.jpg?v=1"
                  alt="Custom inflatable canopy example"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                width={800} height={600} unoptimized />
              </div>
              <div className="absolute -bottom-3 -right-3 h-20 w-20 rounded-2xl bg-red-100 border border-red-200 hidden lg:block" />
            </motion.div>

            {/* Story text */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              custom={0}
            >
              <h2 className="font-heading text-3xl font-bold text-navy-900 md:text-4xl">
                Plan Around Your Requirements
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Custom inflatable projects vary by intended use, scale, artwork, installation conditions, deadline, and destination requirements.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Share these details before production so materials, accessories, documentation, and delivery expectations can be reviewed for the specific project.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-navy-900 px-4 py-20 md:py-28">
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
              What We Stand For
            </h2>
            <p className="mt-4 text-lg text-navy-300 max-w-2xl mx-auto">
              Four principles that guide every decision we make and every
              inflatable we build.
            </p>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2">
            {VALUES.map((value, idx) => (
              <motion.div
                key={value.title}
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-red-600/20">
                  <value.icon className="h-7 w-7 text-red-400" />
                </div>
                <h3 className="mt-5 font-heading text-xl font-bold text-white">
                  {value.title}
                </h3>
                <p className="mt-3 text-navy-300 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Review Section */}
      <section className="px-4 py-20 md:py-28">
        <div className="container mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              custom={0}
            >
              <h2 className="font-heading text-3xl font-bold text-navy-900 md:text-4xl">
                Confirm Specifications Before Production
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Product dimensions, materials, anchoring, accessories, artwork, safety documentation, production timing, and delivery arrangements should be confirmed for each order.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-6">
                {[
                  { value: "Use", label: "Intended Application" },
                  { value: "Size", label: "Required Dimensions" },
                  { value: "Date", label: "Project Deadline" },
                  { value: "Files", label: "Artwork & References" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-navy-200 bg-white p-5 text-center shadow-sm"
                  >
                    <div className="font-heading text-2xl font-bold text-red-600">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-xs font-medium text-navy-500 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="relative"
            >
              <div className="relative aspect-[3/4] rounded-2xl bg-gradient-to-br from-navy-100 to-navy-50 border border-navy-200 overflow-hidden">
                <Image
                  src="/images/products/pop-up-dome-canopy/pop-up-dome-canopy-1.jpg?v=1"
                  alt="Custom inflatable project example"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                width={800} height={600} unoptimized />
              </div>
              <div className="absolute -bottom-4 -left-4 h-16 w-16 rounded-2xl bg-red-100 border border-red-200 hidden lg:block" />
            </motion.div>
          </div>
        </div>
      </section>


      <section className="bg-navy-900 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-8 rounded-2xl bg-gradient-to-r from-navy-800 via-navy-900 to-navy-800 px-8 py-12 md:flex-row md:px-16">
            <div>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
                Let&apos;s Build Something Massive Together
              </h2>
              <p className="mt-3 max-w-lg text-lg text-navy-300">
                Share your project requirements through WhatsApp or the online quote form.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <a
                href="https://wa.me/8615376427736" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 px-6 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/60 hover:bg-white/10"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                
              </a>
              <Link
                href="/get-quote"
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-red-600/30 transition-all hover:bg-red-500 hover:shadow-red-500/40 active:scale-95"
              >
                Request Quote
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
