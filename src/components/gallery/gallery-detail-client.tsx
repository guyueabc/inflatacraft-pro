"use client";
import type { GalleryDetail } from '@/lib/data/gallery';
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

export function GalleryDetailClient({ item }: { item: GalleryDetail }) {
  const detail = item;

  if (!detail) {
    return null;
  }



  return (
    <div className="min-h-screen bg-gray-50">
      {/* 閳光偓閳光偓 Breadcrumb 閳光偓閳光偓 */}
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

      {/* 閳光偓閳光偓 Hero Section 閳光偓閳光偓 */}
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
                  href="https://wa.me/8615376427736" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 px-6 py-3 text-sm font-semibold backdrop-blur-sm transition-all hover:border-white/60 hover:bg-white/10"
                >
                  <Phone className="h-4 w-4" />
                  
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* 閳光偓閳光偓 Main Content 閳光偓閳光偓 */}
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

          {/* 閳光偓閳光偓 Sidebar 閳光偓閳光偓 */}
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

      {/* 閳光偓閳光偓 Related Projects CTA 閳光偓閳光偓 */}
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
