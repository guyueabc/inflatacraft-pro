"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
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
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────

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

// ── Mock Data ────────────────────────────────────────────────────────────────

const BLOG_DATA: Record<string, BlogDetail> = {
  "roi-of-custom-inflatables-2026": {
    slug: "roi-of-custom-inflatables-2026",
    title: "The ROI of Custom Inflatables: Why Brands Are Scaling 100x in 2026",
    excerpt:
      "Discover how top brands are achieving unprecedented ROI through custom inflatable marketing.",
    category: "Industry Trends",
    author: "James Morrison",
    authorBio:
      "James Morrison is the VP of Marketing Strategy at InflataCraft Pro. With 15 years in experiential marketing, he's helped over 200 brands deploy inflatable activations that drive measurable business results.",
    authorAvatar: "JM",
    date: "2026-06-01",
    readTime: "8 min read",
    heroGradient: "from-navy-700 via-navy-600 to-navy-500",
    sections: [
      {
        heading: "The Numbers Don't Lie",
        content: [
          "In an era where digital advertising costs continue to climb and consumer attention spans shrink, brands are rediscovering the power of physical presence. Custom inflatables — once considered novelty items — have emerged as one of the highest-ROI marketing investments available to brand managers today.",
          "According to our internal data tracking over 500 campaigns, the average custom inflatable activation generates a 14:1 return on investment within the first 90 days of deployment. For context, that outperforms display advertising (2:1), social media ads (4:1), and even influencer marketing (6:1) by significant margins.",
          "Why? Because inflatables create what we call the 'triple-threat effect': they stop foot traffic visually, they're inherently shareable on social media, and they create lasting brand memories that influence purchasing decisions weeks after the event.",
        ],
      },
      {
        heading: "Breaking Down the ROI Equation",
        content: [
          "Let's look at a real example. FrostBite Brewing invested approximately $18,000 in a 20-foot custom beer can replica for their summer festival tour. Here's how the math worked out:",
        ],
        list: [
          "Direct impressions at 18 festivals: ~540,000 people saw the inflatable in person",
          "Social media impressions: 2.3 million organic impressions from attendee photos",
          "Media coverage: Featured in 3 industry publications and 2 local TV segments",
          "Business impact: 4 major retail distribution deals signed within 90 days, representing an estimated $1.2M in new annual revenue",
          "Brand recall: Post-event survey showed 78% aided recall among festival attendees vs. 12% for booth-only competitors",
        ],
        blockquote:
          "The inflatable paid for itself 66 times over in new distribution deals alone — and that doesn't count the brand equity built from 2.3 million organic impressions.",
      },
      {
        heading: "The Social Media Amplification Effect",
        content: [
          "Perhaps the most powerful — and most overlooked — aspect of inflatable marketing is the organic social media amplification. People can't resist taking photos with giant objects. It's a fundamental human behavior that marketers can harness systematically.",
          "Our data shows that each inflatable generates an average of 50-150 social media posts per day of deployment, with each post reaching 150-400 people on average. Over a multi-city tour, this compounds into millions of impressions — all without spending a dollar on media.",
          "SnapChip Snacks experienced this firsthand during their 12-state supermarket tour. Their giant chip bag inflatable generated over 50,000 social media posts organically, reaching an estimated 12 million unique users. The campaign hashtag trended in three local markets.",
        ],
        image: { gradient: "from-yellow-300 via-orange-400 to-red-400", label: "Social Media Impact Infographic" },
      },
      {
        heading: "Durability = Long-Term ROI",
        content: [
          "Unlike a digital ad that disappears when the budget runs out, a well-made inflatable is a capital asset. Professional-grade inflatables from InflataCraft Pro come with 2-3 year warranties and can last 5+ years with proper care.",
          "This means the ROI calculation should span multiple events, multiple years, and multiple campaigns. A single inflatable deployed at 4 events per year over 5 years can generate 20x or more the initial investment.",
          "Consider LuxeMart's canopy tent order: 200 custom-printed tents produced for a sidewalk sale event. Two years later, those same tents are still in active use at store locations nationwide, having participated in dozens of events each. The cost-per-impression has dropped to fractions of a cent.",
        ],
      },
      {
        heading: "Getting Started: What to Expect",
        content: [
          "If you're considering your first custom inflatable, here's what you should expect in terms of investment and returns:",
          "Most mid-size inflatables (7-15 feet) range from $2,000-$8,000 depending on complexity, materials, and features. Large-scale installations (20+ feet) range from $8,000-$25,000. While this may seem significant compared to a digital ad buy, the long-term ROI tells a different story.",
          "The fastest path to success: start with a clear objective (trade show traffic? social media buzz? retail foot traffic?), work with a manufacturer that offers 3D renderings before production, and plan a multi-event deployment schedule to maximize your asset's value.",
          "Ready to explore what a custom inflatable could do for your brand? Our team offers free consultations and 3D renderings to help you visualize the possibilities.",
        ],
      },
    ],
    relatedPosts: [
      { slug: "choosing-right-inflatable-type", title: "How to Choose the Right Inflatable Type", gradient: "from-red-500 via-red-600 to-red-700" },
      { slug: "designing-effective-inflatable", title: "7 Design Principles from Our Creative Director", gradient: "from-pink-400 via-rose-500 to-red-500" },
      { slug: "snapchip-case-study", title: "SnapChip: 12M Impressions Case Study", gradient: "from-amber-400 via-orange-500 to-red-400" },
    ],
  },

  "choosing-right-inflatable-type": {
    slug: "choosing-right-inflatable-type",
    title: "How to Choose the Right Inflatable Type for Your Brand Activation",
    excerpt: "Our comprehensive guide walks you through the decision matrix.",
    category: "How-To Guides",
    author: "Sarah Kim",
    authorBio:
      "Sarah Kim is Lead Product Designer at InflataCraft Pro. She has designed over 300 custom inflatables for brands ranging from startups to Fortune 500 companies.",
    authorAvatar: "SK",
    date: "2026-05-28",
    readTime: "6 min read",
    heroGradient: "from-red-500 via-red-600 to-red-700",
    sections: [
      {
        heading: "Start with Your Objective",
        content: [
          "Before you think about shapes, sizes, or colors, clarify what you want your inflatable to achieve. Different inflatable types serve different purposes, and choosing the wrong type can undermine even the most creative design.",
          "Ask yourself: Is your primary goal to draw a crowd from across a trade show floor? To create photo opportunities for social sharing? To provide branded shelter at outdoor events? Or to have a walking, interactive brand character?",
        ],
        list: [
          "Product Replicas: Best for brand awareness and social sharing — nothing beats a giant version of your product for stopping power",
          "Mascots: Best for engagement and interaction — a character creates emotional connection with audiences",
          "Arches: Best for defining spaces and creating Instagram-worthy entrance moments",
          "Costumes: Best for guerrilla marketing and sampling — wearable inflatables go where fixed installations can't",
          "Tents: Best for practical branded shelter with high visibility — combines function with marketing",
        ],
      },
      {
        heading: "The Venue Factor",
        content: [
          "Where will your inflatable live? Indoor trade shows have height restrictions and fire-safety requirements. Outdoor festivals require wind-rated tie-downs and UV-resistant materials. Retail environments need compact footprints that don't block aisles.",
          "For indoor venues, consider smaller-scale replicas (6-10 feet) or mascots that can navigate crowds. For outdoor events, arches and large replicas shine — they're visible from hundreds of yards away and hold up well in weather.",
        ],
      },
      {
        heading: "Budget and Timeline Realities",
        content: [
          "Custom inflatables typically range from $2,000 to $25,000 depending on size, complexity, and material grade. Product replicas with photo-realistic printing are at the higher end; simpler arches and standard tents are more accessible.",
          "Lead times range from 2-8 weeks. If you have a hard event deadline, communicate it early — rush production is available for most product types, though it may incur an additional fee.",
        ],
        blockquote:
          "The most common mistake we see: choosing based on price alone rather than matching the inflatable type to the activation objective. A $2,000 tent won't create the same buzz as an $8,000 product replica — but a tent might be exactly what you need.",
      },
      {
        heading: "Making the Final Decision",
        content: [
          "Once you've defined your objective, venue, and budget, our team can help refine your choice. We offer free 3D renderings so you can see exactly what each inflatable type would look like in your brand's colors and context.",
          "The best part: you don't have to choose just one. Many of our most successful clients deploy multiple inflatable types across a single campaign — a product replica as the anchor, costumes for the street team, and branded tents for the sampling station.",
        ],
      },
    ],
    relatedPosts: [
      { slug: "roi-of-custom-inflatables-2026", title: "The ROI of Custom Inflatables", gradient: "from-navy-700 via-navy-600 to-navy-500" },
      { slug: "trade-show-booth-ideas-2026", title: "10 Trade Show Booth Ideas for 2026", gradient: "from-purple-500 via-violet-500 to-indigo-500" },
      { slug: "designing-effective-inflatable", title: "7 Design Principles", gradient: "from-pink-400 via-rose-500 to-red-500" },
    ],
  },
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ── Page Component ───────────────────────────────────────────────────────────

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = BLOG_DATA[slug];

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
      {/* ── Breadcrumb ── */}
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

      {/* ── Hero ── */}
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

      {/* ── Content Area ── */}
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
          {/* ── Article Body ── */}
          <article className="min-w-0">
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

            {/* ── Author Bio ── */}
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

            {/* ── Share Section ── */}
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

          {/* ── Sidebar: Table of Contents ── */}
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

      {/* ── Related Posts ── */}
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

      {/* ── Back Link ── */}
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
