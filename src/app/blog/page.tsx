"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Search,
  X,
  ArrowRight,
  Calendar,
  Clock,
  User,
  BookOpen,
  TrendingUp,
  Lightbulb,
  FileText,
  Wrench,
  CalendarDays,
  Tag,
  ChevronRight,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  gradient: string;
  imageSrc: string;
  featured: boolean;
}

type BlogCategory =
  | "All"
  | "Industry Trends"
  | "How-To Guides"
  | "Case Studies"
  | "Product Care"
  | "Events";

// ── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES: BlogCategory[] = [
  "All",
  "Industry Trends",
  "How-To Guides",
  "Case Studies",
  "Product Care",
  "Events",
];

const CATEGORY_ICONS: Record<Exclude<BlogCategory, "All">, React.ReactNode> = {
  "Industry Trends": <TrendingUp className="h-4 w-4" />,
  "How-To Guides": <Lightbulb className="h-4 w-4" />,
  "Case Studies": <FileText className="h-4 w-4" />,
  "Product Care": <Wrench className="h-4 w-4" />,
  Events: <CalendarDays className="h-4 w-4" />,
};

const BLOG_POSTS: BlogPost[] = [
  {
    slug: "roi-of-custom-inflatables-2026",
    title: "The ROI of Custom Inflatables: Why Brands Are Scaling 100x in 2026",
    excerpt:
      "Discover how top brands are achieving unprecedented ROI through custom inflatable marketing. From trade shows to retail activations, inflatables deliver measurable results that traditional advertising can't match.",
    category: "Industry Trends",
    author: "James Morrison",
    authorAvatar: "JM",
    date: "2026-06-01",
    readTime: "8 min read",
    gradient: "from-navy-700 via-navy-600 to-navy-500",
    imageSrc: "/images/products/giant-soda-can-replica/giant-soda-can-replica-1.jpg",
    featured: true,
  },
  {
    slug: "choosing-right-inflatable-type",
    title: "How to Choose the Right Inflatable Type for Your Brand Activation",
    excerpt:
      "Product replica, mascot, arch, or costume? Our comprehensive guide walks you through the decision matrix so you pick the inflatable that maximizes your event impact.",
    category: "How-To Guides",
    author: "Sarah Kim",
    authorAvatar: "SK",
    date: "2026-05-28",
    readTime: "6 min read",
    gradient: "from-red-500 via-red-600 to-red-700",
    imageSrc: "/images/products/pharma-pill-bottle-inflatable/pharma-pill-bottle-inflatable-1.jpg?v=1",
    featured: false,
  },
  {
    slug: "snapchip-case-study",
    title: "Case Study: How SnapChip Snacks Generated 12M Organic Impressions with a Giant Chip Bag",
    excerpt:
      "A deep dive into SnapChip's 12-state supermarket grand opening campaign. Learn how a single inflatable product replica drove 22% sales lift and 50,000+ social media posts.",
    category: "Case Studies",
    author: "David Park",
    authorAvatar: "DP",
    date: "2026-05-20",
    readTime: "10 min read",
    gradient: "from-amber-400 via-orange-500 to-red-400",
    imageSrc: "/images/products/custom-brand-mascot/custom-brand-mascot-1.jpg",
    featured: false,
  },
  {
    slug: "inflatable-maintenance-guide",
    title: "The Complete Inflatable Maintenance Guide: Extend Your Investment's Lifespan",
    excerpt:
      "Proper care can double the lifespan of your inflatable. Learn cleaning techniques, storage best practices, repair tips, and seasonal maintenance schedules.",
    category: "Product Care",
    author: "Mike Torres",
    authorAvatar: "MT",
    date: "2026-05-15",
    readTime: "7 min read",
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    imageSrc: "/images/products/pop-up-dome-canopy/pop-up-dome-canopy-1.jpg",
    featured: false,
  },
  {
    slug: "trade-show-booth-ideas-2026",
    title: "10 Trade Show Booth Ideas That Will Dominate in 2026",
    excerpt:
      "From interactive inflatable experiences to Instagram-worthy installations, these booth concepts are proven to increase foot traffic and qualified leads at industry events.",
    category: "Industry Trends",
    author: "James Morrison",
    authorAvatar: "JM",
    date: "2026-05-08",
    readTime: "9 min read",
    gradient: "from-purple-500 via-violet-500 to-indigo-500",
    imageSrc: "/images/products/custom-inflatable-event-tent/custom-inflatable-event-tent-1.jpg",
    featured: false,
  },
  {
    slug: "designing-effective-inflatable",
    title: "Designing an Effective Inflatable: 7 Principles from Our Creative Director",
    excerpt:
      "Our Creative Director shares the seven design principles that separate forgettable inflatables from iconic brand moments. Includes real-world examples from our portfolio.",
    category: "How-To Guides",
    author: "Angela Reeves",
    authorAvatar: "AR",
    date: "2026-05-01",
    readTime: "12 min read",
    gradient: "from-pink-400 via-rose-500 to-red-500",
    imageSrc: "/images/products/helmet-tunnel-arch/helmet-tunnel-arch-1.jpg",
    featured: false,
  },
  {
    slug: "nascar-sponsorship-activation",
    title: "How Apex Motors Used an Inflatable Arch to Dominate NASCAR Sponsorship",
    excerpt:
      "When Apex Motors needed to stand out among dozens of sponsors, a 40-foot finish-line arch delivered. This case study reveals the strategy, execution, and measured results.",
    category: "Case Studies",
    author: "David Park",
    authorAvatar: "DP",
    date: "2026-04-22",
    readTime: "8 min read",
    gradient: "from-blue-600 via-blue-700 to-indigo-800",
    imageSrc: "/images/products/finish-line-arch/finish-line-arch-1.jpg",
    featured: false,
  },
  {
    slug: "inflatable-safety-standards",
    title: "Inflatable Safety Standards: What Every Brand Manager Needs to Know",
    excerpt:
      "Understanding ASTM and CPSC safety standards for commercial inflatables. Our engineering team breaks down compliance requirements, testing procedures, and what sets professional-grade apart.",
    category: "Product Care",
    author: "Mike Torres",
    authorAvatar: "MT",
    date: "2026-04-15",
    readTime: "6 min read",
    gradient: "from-sky-400 via-blue-500 to-cyan-500",
    imageSrc: "/images/products/inflatable-obstacle-course/inflatable-obstacle-course-1.jpg",
    featured: false,
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ── Page Component ───────────────────────────────────────────────────────────

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<BlogCategory>("All");

  const filteredPosts = useMemo(() => {
    let posts = [...BLOG_POSTS];

    if (activeCategory !== "All") {
      posts = posts.filter((p) => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.author.toLowerCase().includes(q)
      );
    }

    return posts;
  }, [searchQuery, activeCategory]);

  const featuredPost = BLOG_POSTS.find((p) => p.featured);
  const regularPosts = filteredPosts.filter((p) => !p.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Page Header ── */}
      <section className="bg-navy-900 px-4 py-16 text-white">
        <div className="container mx-auto max-w-7xl">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-red-400">
            Insights
          </p>
          <h1 className="mb-4 font-heading text-4xl font-bold tracking-tight md:text-5xl">
            Blog &amp; Resources
          </h1>
          <p className="max-w-2xl text-lg text-gray-300">
            Expert insights on inflatable marketing, design tips, industry trends,
            and behind-the-scenes case studies from the world of giant brand
            activations.
          </p>
        </div>
      </section>

      {/* ── Search Bar ── */}
      <div className="sticky top-[73px] z-30 border-b border-gray-200 bg-white shadow-sm">
        <div className="container mx-auto max-w-7xl px-4 py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
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

            {/* Category Chips (scrollable on mobile) */}
            <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all whitespace-nowrap",
                    activeCategory === cat
                      ? "bg-navy-700 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-navy-700"
                  )}
                >
                  {cat !== "All" && CATEGORY_ICONS[cat]}
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-col gap-10 lg:flex-row">
          {/* ── Main Content ── */}
          <div className="flex-1 min-w-0">
            {/* Featured Post */}
            {featuredPost && activeCategory === "All" && !searchQuery && (
              <motion.div
                layout
                className="mb-12 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
              >
                <Link href={`/blog/${featuredPost.slug}`} className="group block">
                  <div className="grid md:grid-cols-2">
                    {/* Featured Image */}
                    <div
                      className={cn(
                        "relative flex min-h-[250px] items-center justify-center bg-gradient-to-br md:min-h-[350px]",
                        featuredPost.gradient
                      )}
                    >
                      <img
                        src={`${featuredPost.imageSrc}?v=1`}
                        alt={featuredPost.title}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </div>

                    {/* Featured Content */}
                    <div className="flex flex-col justify-center p-6 md:p-10">
                      <span className="mb-3 inline-flex w-fit items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
                        <StarIcon />
                        Featured
                      </span>
                      <h2 className="mb-3 font-heading text-xl font-bold text-navy-900 transition-colors group-hover:text-red-600 md:text-2xl">
                        {featuredPost.title}
                      </h2>
                      <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600">
                        {featuredPost.excerpt}
                      </p>
                      <div className="mt-auto flex flex-wrap items-center gap-4 text-xs text-gray-500">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {formatDate(featuredPost.date)}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {featuredPost.readTime}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <User className="h-3.5 w-3.5" />
                          {featuredPost.author}
                        </span>
                      </div>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-red-600 transition-colors group-hover:text-red-500">
                        Read Article
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-semibold text-navy-900">
                  {filteredPosts.length}
                </span>{" "}
                article{filteredPosts.length !== 1 ? "s" : ""}
                {activeCategory !== "All" && (
                  <>
                    {" "}
                    in{" "}
                    <span className="font-semibold text-navy-900">
                      {activeCategory}
                    </span>
                  </>
                )}
              </p>
            </div>

            {/* Empty State */}
            {filteredPosts.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-white py-20 text-center">
                <Search className="mb-4 h-12 w-12 text-gray-300" />
                <h3 className="mb-2 text-lg font-semibold text-navy-900">
                  No articles found
                </h3>
                <p className="mb-4 max-w-sm text-sm text-gray-500">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("All");
                  }}
                  className="rounded-lg bg-navy-700 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              /* Post Grid */
              <motion.div layout className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {filteredPosts.map((post) => (
                    <motion.div
                      key={post.slug}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Link
                        href={`/blog/${post.slug}`}
                        className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:border-navy-300 hover:shadow-lg"
                      >
                        {/* Image */}
                        <div
                          className={cn(
                            "relative flex h-48 items-center justify-center bg-gradient-to-br",
                            post.gradient
                          )}
                        >
                          <img
                            src={`${post.imageSrc}?v=1`}
                            alt={post.title}
                            loading="lazy"
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex flex-1 flex-col p-5">
                          {/* Category Badge */}
                          <span className="mb-3 inline-flex w-fit items-center gap-1 rounded-full bg-navy-100 px-2.5 py-0.5 text-xs font-semibold text-navy-700">
                            <Tag className="h-3 w-3" />
                            {post.category}
                          </span>

                          <h3 className="mb-2 font-heading text-base font-bold text-navy-900 line-clamp-2 transition-colors group-hover:text-red-600">
                            {post.title}
                          </h3>
                          <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600">
                            {post.excerpt}
                          </p>

                          {/* Meta */}
                          <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-gray-100 pt-4 text-xs text-gray-500">
                            <span className="inline-flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(post.date)}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {post.readTime}
                            </span>
                          </div>

                          <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-red-600 transition-colors group-hover:text-red-500">
                            Read More
                            <ArrowRight className="h-3 w-3" />
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>

          {/* ── Sidebar ── */}
          <aside className="w-full shrink-0 lg:w-72">
            <div className="sticky top-[130px] space-y-8">
              {/* Categories */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 flex items-center gap-2 font-heading text-base font-bold text-navy-900">
                  <BookOpen className="h-4 w-4 text-navy-400" />
                  Categories
                </h3>
                <nav className="space-y-1">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                        activeCategory === cat
                          ? "bg-navy-50 font-semibold text-navy-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-navy-700"
                      )}
                    >
                      <span className="flex items-center gap-2">
                        {cat !== "All" && CATEGORY_ICONS[cat]}
                        {cat}
                      </span>
                      {activeCategory === cat && (
                        <ChevronRight className="h-4 w-4 text-navy-500" />
                      )}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Newsletter */}
              <div className="rounded-2xl bg-navy-900 p-6 text-white shadow-sm">
                <h3 className="mb-2 font-heading text-base font-bold">
                  Stay Updated
                </h3>
                <p className="mb-4 text-sm text-navy-300">
                  Get the latest inflatable marketing insights delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-navy-700 bg-navy-800 px-3 py-2 text-sm text-white placeholder-navy-400 focus:border-navy-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold transition-colors hover:bg-red-500"
                  >
                    Subscribe
                  </button>
                </div>
              </div>

              {/* Quick Links */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 font-heading text-base font-bold text-navy-900">
                  Quick Links
                </h3>
                <ul className="space-y-2 text-sm">
                  {[
                    { label: "View Our Gallery", href: "/gallery" },
                    { label: "Request a Quote", href: "/get-quote" },
                    { label: "Browse Products", href: "/products" },
                    { label: "Contact Sales", href: "/contact" },
                  ].map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="flex items-center gap-2 text-gray-600 transition-colors hover:text-red-600"
                      >
                        <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <section className="bg-navy-900 py-16">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
            Ready to Scale Your Brand?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-navy-300">
            The strategies we cover in our blog — our team can implement for you. Let's talk about your next activation.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/get-quote"
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-red-600/30 transition-all hover:bg-red-500"
            >
              Get Free Consultation
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Small inline icon since we didn't import Star
function StarIcon() {
  return (
    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}
