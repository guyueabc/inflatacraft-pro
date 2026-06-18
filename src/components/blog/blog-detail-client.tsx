"use client";


import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  User,
  Tag,
  Share2,
  Globe,
  Building2,
  ExternalLink,
  Link2,
  ChevronRight,
  BookOpen,
  ChevronDown,
  List,
} from "lucide-react";

// 閳光偓閳光偓 Types 閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓

interface BlogDetail {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorBio: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  heroGradient: string;
  sections: BlogSection[];
  relatedPosts: { slug: string; title: string; gradient: string }[];
}

interface BlogSection {
  heading: string;
  content: string[];
  image?: { gradient: string; label: string } | null;
  list?: string[];
  blockquote?: string;
}

// 閳光偓閳光偓 Mock Data 閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓



// 閳光偓閳光偓 Helpers 閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// 閳光偓閳光偓 Page Component 閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓閳光偓

export function BlogDetailClient({ post }: { post: any }) {
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 py-20 text-center">
          <h1 className="font-heading text-3xl font-bold text-navy-900">
            Article Not Found
          </h1>
          <p className="mt-4 text-gray-500">
            The article you're looking for doesn't exist or has been moved.
          </p>
          <Link
            href="/blog"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-navy-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Build table of contents from sections
  const toc = post.sections.map((s) => s.heading);

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
            <Link href="/blog" className="hover:text-navy-700 transition-colors">
              Blog
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="font-medium text-navy-900 line-clamp-1">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* 閳光偓閳光偓 Hero 閳光偓閳光偓 */}
      <section className="bg-navy-900 py-16">
        <div className="container mx-auto max-w-4xl px-4">
          {/* Category Badge */}
          <span className="mb-4 inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            <Tag className="h-3 w-3" />
            {post.category}
          </span>

          <h1 className="mb-6 font-heading text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <p className="mb-8 text-lg text-navy-300 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Author + Meta */}
          <div className="flex flex-wrap items-center gap-4 border-t border-white/10 pt-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">
              {post.authorAvatar}
            </div>
            <div className="mr-4">
              <p className="text-sm font-semibold text-white">{post.author}</p>
              <p className="text-xs text-navy-300">Author</p>
            </div>
            <div className="flex items-center gap-1 text-xs text-navy-300">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(post.date)}
            </div>
            <div className="flex items-center gap-1 text-xs text-navy-300">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </div>
          </div>
        </div>
      </section>

      {/* 閳光偓閳光偓 Content Area 閳光偓閳光偓 */}
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
          {/* 閳光偓閳光偓 Article Body 閳光偓閳光偓 */}
          <article className="min-w-0">
            {/* Mobile TOC (collapsible) */}
            <div className="mb-8 lg:hidden">
              <button
                onClick={() => setMobileTocOpen(!mobileTocOpen)}
                className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm text-left"
              >
                <span className="flex items-center gap-2 font-heading text-base font-bold text-navy-900">
                  <List className="h-4 w-4 text-navy-400" />
                  Table of Contents
                </span>
                <ChevronDown className={cn(
                  "h-5 w-5 text-gray-400 transition-transform",
                  mobileTocOpen && "rotate-180"
                )} />
              </button>
              {mobileTocOpen && (
                <nav className="mt-2 rounded-xl border border-gray-200 bg-white p-4 shadow-sm space-y-1">
                  {toc.map((heading, idx) => (
                    <a
                      key={idx}
                      href={`#section-${idx}`}
                      onClick={() => setMobileTocOpen(false)}
                      className="block rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-navy-50 hover:text-navy-700"
                    >
                      {idx + 1}. {heading}
                    </a>
                  ))}
                </nav>
              )}
            </div>

            <div className="prose-custom space-y-10">
              {post.sections.map((section, idx) => (
                <motion.div
                  key={idx}
                  id={`section-${idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <h2 className="mb-4 font-heading text-2xl font-bold text-navy-900">
                    {section.heading}
                  </h2>

                  {section.content.map((para, pIdx) => (
                    <p
                      key={pIdx}
                      className="mb-4 text-gray-700 leading-relaxed"
                    >
                      {para}
                    </p>
                  ))}

                  {/* Optional Image Placeholder */}
                  {section.image && (
                    <div
                      className={cn(
                        "my-6 flex h-48 items-center justify-center rounded-xl bg-gradient-to-br sm:h-64",
                        section.image.gradient
                      )}
                    >
                      <span className="text-sm font-semibold text-white/70 drop-shadow">
                        {section.image.label}
                      </span>
                    </div>
                  )}

                  {/* Optional List */}
                  {section.list && (
                    <ul className="mb-4 space-y-2 rounded-xl bg-gray-50 p-5">
                      {section.list.map((item, lIdx) => (
                        <li
                          key={lIdx}
                          className="flex items-start gap-2 text-sm text-gray-700"
                        >
                          <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Optional Blockquote */}
                  {section.blockquote && (
                    <blockquote className="my-6 rounded-xl border-l-4 border-red-500 bg-red-50 p-5 text-gray-700 italic leading-relaxed">
                      &ldquo;{section.blockquote}&rdquo;
                    </blockquote>
                  )}
                </motion.div>
              ))}
            </div>

            {/* 閳光偓閳光偓 Author Bio 閳光偓閳光偓 */}
            <div className="mt-12 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-navy-700 text-lg font-bold text-white">
                  {post.authorAvatar}
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-navy-900">
                    About {post.author}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {post.authorBio}
                  </p>
                </div>
              </div>
            </div>

            {/* 閳光偓閳光偓 Share Section 閳光偓閳光偓 */}
            <div className="mt-8 flex flex-wrap items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5">
              <span className="text-sm font-semibold text-gray-500">
                Share this article:
              </span>
              <div className="flex gap-2">
                {[
                  { icon: <Globe className="h-4 w-4" />, label: "Twitter" },
                  { icon: <Building2 className="h-4 w-4" />, label: "LinkedIn" },
                  { icon: <ExternalLink className="h-4 w-4" />, label: "Facebook" },
                  { icon: <Link2 className="h-4 w-4" />, label: "Copy Link" },
                ].map((btn) => (
                  <button
                    key={btn.label}
                    type="button"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-2 text-xs font-medium text-gray-600 transition-colors hover:border-navy-300 hover:bg-navy-50 hover:text-navy-700"
                    title={btn.label}
                  >
                    {btn.icon}
                    <span className="hidden sm:inline">{btn.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </article>

          {/* 閳光偓閳光偓 Sidebar: Table of Contents 閳光偓閳光偓 */}
          <aside className="hidden lg:block">
            <div className="sticky top-[130px] space-y-8">
              {/* TOC */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 flex items-center gap-2 font-heading text-base font-bold text-navy-900">
                  <BookOpen className="h-4 w-4 text-navy-400" />
                  Table of Contents
                </h3>
                <nav className="space-y-1">
                  {toc.map((heading, idx) => (
                    <a
                      key={idx}
                      href={`#section-${idx}`}
                      className="block rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-navy-50 hover:text-navy-700"
                    >
                      {idx + 1}. {heading}
                    </a>
                  ))}
                </nav>
              </div>

              {/* CTA */}
              <div className="rounded-2xl bg-navy-900 p-6 text-white shadow-sm">
                <h3 className="mb-2 font-heading text-base font-bold">
                  Need Help with Your Project?
                </h3>
                <p className="mb-4 text-sm text-navy-300">
                  Our team can help you apply these strategies to your next brand activation.
                </p>
                <Link
                  href="/get-quote"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold transition-colors hover:bg-red-500"
                >
                  Get Free Consultation
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* 閳光偓閳光偓 Related Posts 閳光偓閳光偓 */}
      <section className="border-t border-gray-200 bg-white py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="mb-8 font-heading text-2xl font-bold text-navy-900">
            Related Articles
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {post.relatedPosts.map((rp) => (
              <Link
                key={rp.slug}
                href={`/blog/${rp.slug}`}
                className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:border-navy-300 hover:shadow-lg"
              >
                <div
                  className={cn(
                    "flex h-36 items-center justify-center bg-gradient-to-br",
                    rp.gradient
                  )}
                >
                  <span className="text-xs font-bold text-white/50 drop-shadow">
                    Read Article
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-sm font-bold text-navy-900 transition-colors group-hover:text-red-600">
                    {rp.title}
                  </h3>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-red-600">
                    Read More
                    <ExternalLink className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 閳光偓閳光偓 Back Link 閳光偓閳光偓 */}
      <div className="border-t border-gray-200 bg-white py-8">
        <div className="container mx-auto max-w-7xl px-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-navy-700 transition-colors hover:text-red-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Articles
          </Link>
        </div>
      </div>
    </div>
  );
}
