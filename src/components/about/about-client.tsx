"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Shield,
  MapPin,
  Lightbulb,
  Heart,
  ArrowRight,
  Phone,
  Award,
  Factory,
  Users,
  Globe,
  Star,
  CheckCircle2,
  Building2,
} from "lucide-react";

// 鈹€鈹€ Types 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€

interface ValueProp {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
}

interface Milestone {
  year: string;
  title: string;
  description: string;
}

// 鈹€鈹€ Data 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€

const VALUES: ValueProp[] = [
  {
    icon: Shield,
    title: "Quality First",
    description:
      "Every product undergoes a mandatory 24-hour continuous inflation test before it leaves our facility. We use premium 210D鈥?00D fabrics, reinforced double-stitched seams, and dye-sublimation printing for vibrant, long-lasting results. Zero defects is our standard.",
  },
  {
    icon: MapPin,
    title: "Made in USA",
    description:
      "All design, engineering, and manufacturing happens right here in our United States facility. This means faster turnaround, tighter quality control, easier communication, and the confidence that comes from American craftsmanship.",
  },
  {
    icon: Lightbulb,
    title: "Innovation Driven",
    description:
      "We invest continuously in the latest 3D design software, dye-sublimation printing technology, and manufacturing equipment. Our interactive 3D model viewer lets clients inspect and annotate designs from any browser before production begins.",
  },
  {
    icon: Heart,
    title: "Customer Obsessed",
    description:
      "Every project gets a dedicated project manager 鈥?a single point of contact from first sketch to final delivery. Unlimited design revisions, 24-hour response times, and installation support are standard. Your success is our reputation.",
  },
];

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Michael Reynolds",
    role: "Founder & CEO",
    bio: "Founded inflatablemodel in 2003 after 15 years in industrial textile manufacturing. A hands-on leader who still reviews every major project design.",
    initials: "MR",
  },
  {
    name: "Sarah Chen",
    role: "VP of Design & Engineering",
    bio: "20+ years in 3D industrial design. Leads our team of 12 designers and engineers. Pioneered our interactive 3D model review platform.",
    initials: "SC",
  },
  {
    name: "David Okonkwo",
    role: "Director of Manufacturing",
    bio: "Oversees our 50,000 sq ft facility. 18 years in textile manufacturing. Certified in Six Sigma Black Belt 鈥?drives our quality metrics.",
    initials: "DO",
  },
  {
    name: "Jennifer Walsh",
    role: "Head of Client Success",
    bio: "Ensures every client has an exceptional experience. Leads a team of 8 dedicated project managers. Former marketing director at a Fortune 500 brand.",
    initials: "JW",
  },
  {
    name: "Carlos Mendez",
    role: "Lead Design Engineer",
    bio: "Specializes in complex structural inflatables. Background in aerospace engineering brings unique perspective to large-scale inflatable design.",
    initials: "CM",
  },
  {
    name: "Amanda Foster",
    role: "Director of Partnerships",
    bio: "Manages distributor relationships and strategic partnerships. 12 years in B2B sales. Has onboarded over 200 brand partners.",
    initials: "AF",
  },
];

const MILESTONES: Milestone[] = [
  {
    year: "2003",
    title: "Founded in Detroit, MI",
    description:
      "Michael Reynolds launches inflatablemodel from a 2,000 sq ft workshop with three employees, focusing on custom inflatable mascots for local sports teams.",
  },
  {
    year: "2006",
    title: "First Fortune 500 Client",
    description:
      "Lands first major brand partnership with a national food & beverage company. The project 鈥?a 15-foot product replica 鈥?becomes a trade show sensation.",
  },
  {
    year: "2010",
    title: "Expanded to 20,000 sq ft Facility",
    description:
      "Moved to a larger manufacturing space to accommodate growing demand. Added dye-sublimation printing capabilities and expanded the design team to 8.",
  },
  {
    year: "2013",
    title: "Launched Distributor Program",
    description:
      "Created the inflatablemodel distributor network, enabling agencies and promotional product companies to offer custom inflatables under their own brand.",
  },
  {
    year: "2016",
    title: "Reached 1,000 Projects Milestone",
    description:
      "Completed our 1,000th project. Expanded into international markets with dedicated shipping and customs support for global clients.",
  },
  {
    year: "2019",
    title: "Moved to 50,000 sq ft Facility",
    description:
      "Opened our current state-of-the-art manufacturing facility with expanded production lines, an in-house photo studio, and a dedicated quality testing lab.",
  },
  {
    year: "2021",
    title: "3D Interactive Design Platform",
    description:
      "Launched our proprietary 3D model viewer, allowing clients to inspect, rotate, and annotate designs in real-time from any browser. Industry first.",
  },
  {
    year: "2024",
    title: "5,000+ Projects & 200+ Brands",
    description:
      "Crossed 5,000 completed projects and 200 active brand partners. Expanded team to 85+ employees. Continued investment in sustainable manufacturing practices.",
  },
];

const TRUST_BADGES = [
  { label: "BBB Rating", value: "A+", icon: Award },
  { label: "Made in", value: "USA", icon: MapPin },
  { label: "Projects Completed", value: "5,000+", icon: CheckCircle2 },
  { label: "Brand Partners", value: "200+", icon: Users },
];

// 鈹€鈹€ Animation Variants 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€

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

// 鈹€鈹€ Main Page 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€

export function AboutPageClient() {
  return (
    <div className="min-h-screen bg-white">
      {/* 鈺愨晲鈺?Hero Section 鈺愨晲鈺?*/}
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
                Crafting Giant Impressions Since 2003
              </h1>
              <p className="mt-6 text-lg text-navy-300 leading-relaxed max-w-xl">
                For over 20 years, inflatablemodel has been the trusted
                manufacturing partner for brands that demand the extraordinary.
                From Fortune 500 product launches to Super Bowl halftime shows,
                we engineer inflatables that stop crowds and make headlines.
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
                <img
                  src="/images/products/custom-inflatable-event-tent/custom-inflatable-event-tent-1.jpg?v=1"
                  alt="inflatablemodel Manufacturing Facility"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              {/* Decorative accent */}
              <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-2xl bg-red-600/20 border border-red-600/30 backdrop-blur-sm hidden lg:block" />
              <div className="absolute -top-4 -left-4 h-16 w-16 rounded-2xl bg-navy-600/50 border border-white/10 backdrop-blur-sm hidden lg:block" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 鈺愨晲鈺?Company Story 鈺愨晲鈺?*/}
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
                <img
                  src="/images/products/pop-up-dome-canopy/pop-up-dome-canopy-1.jpg?v=1"
                  alt="inflatablemodel Headquarters"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
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
                From Workshop to Industry Leader
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                inflatablemodel started in 2003 in a small Detroit workshop with a
                single industrial sewing machine and a belief that brands
                deserved better inflatables. Founder Michael Reynolds, a veteran
                of industrial textile manufacturing, saw an industry dominated by
                overseas production, inconsistent quality, and long lead times.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                He set out to build something different: a US-based
                manufacturing operation that combined old-world craftsmanship
                with cutting-edge design technology. The goal was simple 鈥?
                deliver better inflatables, faster, with a level of service that
                made clients feel like partners, not order numbers.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Today, inflatablemodel operates from a 50,000 square foot
                facility with over 85 employees. We&apos;ve completed more than
                5,000 projects for 200+ brands across 30+ countries. But our
                founding principle hasn&apos;t changed: every single inflatable
                gets the same obsessive attention to detail that Michael insisted
                on from day one.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 鈺愨晲鈺?Values Section 鈺愨晲鈺?*/}
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

      {/* 鈺愨晲鈺?Facility Section 鈺愨晲鈺?*/}
      <section className="px-4 py-20 md:py-28">
        <div className="container mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Stats */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              custom={0}
            >
              <h2 className="font-heading text-3xl font-bold text-navy-900 md:text-4xl">
                Our 50,000 sq ft Manufacturing Facility
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Every inflatablemodel product is designed, engineered, and
                manufactured under one roof in the United States. Our facility
                combines advanced technology with skilled craftsmanship to
                deliver exceptional quality on every project.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-6">
                {[
                  { value: "50,000", label: "Square Feet" },
                  { value: "85+", label: "Team Members" },
                  { value: "12", label: "Design Engineers" },
                  { value: "24", label: "Production Lines" },
                  { value: "5,000+", label: "Projects Completed" },
                  { value: "30+", label: "Countries Served" },
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

            {/* Facility image placeholder */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="relative"
            >
              <div className="relative aspect-[3/4] rounded-2xl bg-gradient-to-br from-navy-100 to-navy-50 border border-navy-200 overflow-hidden">
                <img
                  src="/images/products/pop-up-dome-canopy/pop-up-dome-canopy-1.jpg?v=1"
                  alt="inflatablemodel Production Floor"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 h-16 w-16 rounded-2xl bg-red-100 border border-red-200 hidden lg:block" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 鈺愨晲鈺?Team Section 鈺愨晲鈺?*/}
      <section className="bg-gray-50 px-4 py-20 md:py-28 border-t border-navy-100">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            custom={0}
            className="mb-16 text-center"
          >
            <h2 className="font-heading text-3xl font-bold text-navy-900 md:text-4xl">
              Meet the Leadership Team
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              The people behind the giant inflatables. A team of designers,
              engineers, and manufacturing experts dedicated to your success.
            </p>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM_MEMBERS.map((member, idx) => (
              <motion.div
                key={member.name}
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="rounded-2xl border border-navy-200 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md"
              >
                {/* Avatar placeholder */}
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-navy-700 to-navy-900 text-2xl font-bold text-white shadow-lg">
                  {member.initials}
                </div>
                <h3 className="mt-5 font-heading text-lg font-bold text-navy-900">
                  {member.name}
                </h3>
                <p className="text-sm font-semibold text-red-600">
                  {member.role}
                </p>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 鈺愨晲鈺?Company Timeline 鈺愨晲鈺?*/}
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
              Our Journey
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Key milestones from a small workshop to an industry leader.
            </p>
          </motion.div>

          <div className="relative">
            {/* Center line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-navy-200 md:-translate-x-px" />

            <div className="space-y-12">
              {MILESTONES.map((milestone, idx) => (
                <motion.div
                  key={milestone.year}
                  custom={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={fadeInUp}
                  className={cn(
                    "relative pl-12 md:pl-0",
                    idx % 2 === 0
                      ? "md:pr-[calc(50%+2rem)] md:text-right"
                      : "md:pl-[calc(50%+2rem)] md:text-left"
                  )}
                >
                  {/* Dot */}
                  <div
                    className={cn(
                      "absolute top-1.5 h-4 w-4 rounded-full border-4 border-red-600 bg-white z-10",
                      "left-[calc(1rem-6px)] md:left-1/2 md:-translate-x-1/2"
                    )}
                  />

                  <div className="rounded-xl border border-navy-200 bg-white p-5 shadow-sm">
                    <span className="inline-block rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-700">
                      {milestone.year}
                    </span>
                    <h3 className="mt-2 font-heading text-lg font-bold text-navy-900">
                      {milestone.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 鈺愨晲鈺?CTA 鈺愨晲鈺?*/}
      <section className="bg-navy-900 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-8 rounded-2xl bg-gradient-to-r from-navy-800 via-navy-900 to-navy-800 px-8 py-12 md:flex-row md:px-16">
            <div>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
                Let&apos;s Build Something Massive Together
              </h2>
              <p className="mt-3 max-w-lg text-lg text-navy-300">
                Ready to create an inflatable that makes your brand impossible
                to ignore? Our team is standing by.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <a
                href="tel:+86 15376427736"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 px-6 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/60 hover:bg-white/10"
              >
                <Phone className="h-5 w-5" />
                +86 15376427736
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
