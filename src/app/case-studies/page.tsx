import type { Metadata } from "next";
import Link from "next/link";
import { GALLERY_DATA } from "@/lib/data/gallery";
import { ArrowRight, TrendingUp, Eye, Users, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Custom Inflatable Case Studies by Industry | InflatableModel",
  description:
    "Real results from custom inflatable campaigns. Giant product replicas, mascots, arches, and tents that drove measurable ROI for food, sports, retail, and trade show brands.",
  keywords: "inflatable case study, inflatable success story, custom inflatable results, inflatable ROI, inflatable marketing results",
  openGraph: {
    title: "Case Studies | InflatableModel",
    description: "Real campaigns, real results — custom inflatable success stories.",
    type: "website",
  },
};

// Additional case data beyond gallery
const additionalCases = [
  {
    client: "SnapChip Snacks",
    industry: "Food & Beverage",
    product: "Giant Chip Bag Replica",
    campaign: "12-State Supermarket Grand Opening Tour",
    metric: "12M",
    metricLabel: "Organic Impressions",
    result: "22% sales lift across 48 stores in 6 months",
    slug: "snapchip-case-study",
    blogSlug: true,
  },
  {
    client: "Apex Motors",
    industry: "Sports & Automotive",
    product: "Finish Line Arch",
    campaign: "NASCAR Race Weekend Activation",
    metric: "2M+",
    metricLabel: "Spectator Impressions",
    result: "Sponsor recall increased 40% post-event",
    slug: "apex-motors-finish-arch",
    blogSlug: false,
  },
  {
    client: "FrostBite Brewing",
    industry: "Food & Beverage",
    product: "20ft Beer Can Replica",
    campaign: "18 Summer Festivals Nationwide",
    metric: "3x",
    metricLabel: "Booth Traffic Increase",
    result: "Landed biggest retail partner at first festival",
    slug: "frostbite-brewing-giant-can",
    blogSlug: false,
  },
];

const industryFilter = [
  { name: "All Industries", count: 3 },
  { name: "Food & Beverage", count: 2 },
  { name: "Sports & Automotive", count: 1 },
  { name: "Retail", count: 0 },
  { name: "Trade Shows", count: 0 },
];

const metrics = [
  { icon: TrendingUp, value: "22%", label: "Average Sales Lift" },
  { icon: Eye, value: "14M+", label: "Total Impressions" },
  { icon: Users, value: "3x", label: "Avg Booth Traffic" },
  { icon: Star, value: "98%", label: "Client Satisfaction" },
];

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-navy-900 px-4 py-16 text-white">
        <div className="container mx-auto max-w-4xl">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-red-400">Case Studies</p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Real Campaigns. Real Results.</h1>
          <p className="text-lg text-gray-300">
            See how brands across industries used custom inflatables to drive measurable ROI — from 22% sales lifts to 12M organic impressions.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-gray-200 bg-white py-10">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {metrics.map((m, idx) => (
              <div key={idx} className="text-center">
                <m.icon className="mx-auto mb-2 h-8 w-8 text-red-500" />
                <p className="text-3xl font-bold text-navy-900">{m.value}</p>
                <p className="text-sm text-gray-500">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Filter */}
      <section className="border-b border-gray-200 bg-gray-50 py-6">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap gap-2">
            {industryFilter.map((f, idx) => (
              <button
                key={idx}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  idx === 0 ? "bg-navy-900 text-white" : "bg-white text-navy-700 border border-gray-200 hover:border-navy-300"
                }`}
              >
                {f.name} ({f.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Cards */}
      <section className="py-12">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            {additionalCases.map((c, idx) => (
              <div key={idx} className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                <div className="bg-gradient-to-br from-navy-700 to-navy-900 px-6 py-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">{c.industry}</span>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-red-400">{c.metric}</p>
                      <p className="text-xs text-gray-300">{c.metricLabel}</p>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white">{c.client}</h3>
                  <p className="text-sm text-gray-300">{c.product}</p>
                </div>
                <div className="p-6">
                  <p className="mb-2 text-sm font-semibold text-navy-900">{c.campaign}</p>
                  <p className="mb-4 text-sm text-gray-600">{c.result}</p>
                  {c.blogSlug ? (
                    <Link href={`/blog/${c.slug}`} className="inline-flex items-center gap-1 text-sm font-semibold text-red-600 hover:text-red-700">
                      Read Full Case Study <ArrowRight className="h-4 w-4" />
                    </Link>
                  ) : (
                    <Link href={`/gallery/${c.slug}`} className="inline-flex items-center gap-1 text-sm font-semibold text-red-600 hover:text-red-700">
                      View Details <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-navy-900">Explore by Industry</h2>
          <p className="mb-8 text-sm text-gray-500">See how inflatables work for your specific industry</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/industries/trade-shows" className="rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-navy-300 hover:shadow-lg">
              <h3 className="mb-1 text-base font-bold text-navy-900">Trade Shows</h3>
              <p className="text-sm text-gray-500">CES, NAB, SEMA booth solutions</p>
            </Link>
            <Link href="/industries/retail" className="rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-navy-300 hover:shadow-lg">
              <h3 className="mb-1 text-base font-bold text-navy-900">Retail</h3>
              <p className="text-sm text-gray-500">Grand openings & store promotions</p>
            </Link>
            <Link href="/industries/sports" className="rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-navy-300 hover:shadow-lg">
              <h3 className="mb-1 text-base font-bold text-navy-900">Sports Events</h3>
              <p className="text-sm text-gray-500">Stadium activation & fan zones</p>
            </Link>
            <Link href="/industries/food-beverage" className="rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-navy-300 hover:shadow-lg">
              <h3 className="mb-1 text-base font-bold text-navy-900">Food & Beverage</h3>
              <p className="text-sm text-gray-500">Giant product replicas that sell</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-200 bg-white py-16">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-navy-900">Your Brand Could Be Next</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">Get a custom inflatable that delivers measurable results.</p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/get-quote" className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-red-600/30 transition-all hover:bg-red-500">
              Get Free Quote <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
