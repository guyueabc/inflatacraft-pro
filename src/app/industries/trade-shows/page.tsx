import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Users, Eye, DollarSign, Clock, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Custom Inflatables for Trade Shows | Maximize Booth Traffic | InflatableModel",
  description:
    "Trade show inflatables that stop attendees in their tracks. Giant product replicas, arches, mascots, and tents designed for CES, NAB, SEMA, and industry expos. 3–6 week turnaround. Free 3D renderings.",
  keywords: "trade show inflatable, booth inflatable, expo inflatable, CES inflatable, trade show booth ideas, inflatable display, convention center inflatable",
  openGraph: {
    title: "Trade Show Inflatables | InflatableModel",
    description: "Stand out at CES, NAB, SEMA, and industry expos with custom inflatables.",
    type: "article",
  },
};

const stats = [
  { icon: Users, value: "3x", label: "More booth visitors vs standard booth" },
  { icon: Eye, value: "85%", label: "Attendees recall inflatable displays" },
  { icon: DollarSign, value: "$500", label: "Cost per 1,000 impressions" },
  { icon: Clock, value: "3–6 wk", label: "Production turnaround" },
];

const productTypes = [
  {
    type: "Giant Product Replicas",
    description: "15–30 ft tall inflatable versions of your product that can be seen from across the expo hall.",
    bestFor: "Product launches, brand recognition, photo opportunities",
    price: "$4,000–$15,000",
    image: "/images/products/giant-soda-can-replica/giant-soda-can-replica-1.jpg",
  },
  {
    type: "Inflatable Arches & Tunnels",
    description: "Entrance arches or helmet tunnels that guide attendees to your booth.",
    bestFor: "Sports brands, automotive, entrance markers",
    price: "$3,000–$10,000",
    image: "/images/products/finish-line-arch/finish-line-arch-1.jpg",
  },
  {
    type: "Custom Mascots",
    description: "Walk-around mascot costumes or stationary inflatable characters.",
    bestFor: "Consumer brands, family products, engagement",
    price: "$2,000–$6,000",
    image: "/images/products/custom-brand-mascot/custom-brand-mascot-1.jpg",
  },
  {
    type: "Event Tents & Booths",
    description: "Fully branded inflatable tents that create an instant presence.",
    bestFor: "Outdoor expos, hospitality areas, VIP sections",
    price: "$2,500–$12,000",
    image: "/images/products/custom-inflatable-event-tent/custom-inflatable-event-tent-1.jpg",
  },
];

const useCases = [
  {
    event: "CES (Consumer Electronics Show)",
    venue: "Las Vegas Convention Center",
    products: "Giant phone replicas, tech mascots, branded tunnels",
    attendees: "180,000+",
  },
  {
    event: "NAB Show (Broadcasting)",
    venue: "Las Vegas Convention Center",
    products: "Camera replicas, media arches, broadcast booth tents",
    attendees: "100,000+",
  },
  {
    event: "SEMA (Automotive)",
    venue: "Las Vegas Convention Center",
    products: "Helmet tunnels, car replicas, tire inflatables",
    attendees: "160,000+",
  },
  {
    event: "Natural Products Expo",
    venue: "Anaheim & Baltimore",
    products: "Food product replicas, beverage cans, mascot costumes",
    attendees: "80,000+",
  },
  {
    event: "IAAPA (Attractions)",
    venue: "Orlando",
    products: "Park mascots, ride replicas, event tents",
    attendees: "40,000+",
  },
];

const tips = [
  "Order 8–12 weeks before the show to allow for design, production, and shipping buffer",
  "Check venue ceiling height — some convention centers limit inflatable height to 20–25 ft",
  "Bring a backup blower — convention center power can be unreliable",
  "Request production photos at 30%, 60%, and 90% completion to catch issues early",
  "Add internal LED lighting for photo ops and social media engagement",
  "Position inflatable at booth corner or entrance to maximize visibility from main aisles",
  "Create a hashtag and encourage attendees to take photos — user-generated content is free marketing",
];

const faqItems = [
  {
    question: "Are inflatables allowed at trade shows like CES and NAB?",
    answer:
      "Yes, inflatables are permitted at most major trade shows including CES, NAB, SEMA, and IAAPA. However, each venue has specific rules about height limits (typically 20–25 ft), fire retardancy (NFPA 701 certification required), and power consumption. We provide documentation and certification upon request. Always confirm with show management 60+ days before the event.",
  },
  {
    question: "How long does it take to set up a trade show inflatable?",
    answer:
      "Setup time depends on size. A 10 ft product replica takes 10–15 minutes with one person. A 20 ft replica requires 20–30 minutes and two people. Arches and tunnels take 15–45 minutes. Event tents require 30–60 minutes. We provide setup instructions and video tutorials with every order.",
  },
  {
    question: "What power is required for convention center inflatables?",
    answer:
      "Most inflatables use standard 110V or 220V blowers. A 15 ft replica typically needs a 1 HP blower drawing 6–8 amps. Larger 20–30 ft units may require 1.5–2 HP blowers at 10–15 amps. Convention centers usually provide 15 amp circuits at each booth. We include the correct blower for your region (US 110V, EU 220V).",
  },
  {
    question: "Can I ship my inflatable directly to the convention center?",
    answer:
      "Yes, most convention centers accept advance freight shipments. Use the show's official freight contractor for drayage services. Typical shipping cost to Las Vegas Convention Center from China is $300–$600 by air (7–10 days) or $100–$200 by ocean (4–6 weeks). We provide commercial invoices and packing lists for customs.",
  },
  {
    question: "How do I store my inflatable after the trade show?",
    answer:
      "Deflate completely, fold loosely (do not crease sharply), and store in the included storage bag in a cool, dry place away from direct sunlight. Proper storage extends lifespan to 5+ years. For frequent use, we recommend annual inspection and cleaning. Storage bags are included free with every order.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function TradeShowsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-navy-900 px-4 py-16 text-white">
          <div className="container mx-auto max-w-4xl">
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-red-400">
              Industry Solution
            </p>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Trade Show Inflatables
            </h1>
            <p className="text-lg text-gray-300">
              Stand out at CES, NAB, SEMA, and industry expos. Custom inflatables stop attendees
              in their tracks — 3x more booth visitors than standard displays.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b border-gray-200 bg-white py-10">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <stat.icon className="mx-auto mb-2 h-8 w-8 text-red-500" />
                  <p className="text-3xl font-bold text-navy-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Types */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto max-w-7xl px-4">
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-navy-900">
              Best Inflatables for Trade Shows
            </h2>
            <p className="mb-8 text-sm text-gray-500">
              Proven solutions that drive booth traffic at major expos
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              {productTypes.map((item, idx) => (
                <div
                  key={idx}
                  className="overflow-hidden rounded-xl border border-gray-200 bg-white"
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="h-40 w-full bg-gray-100 sm:h-auto sm:w-40">
                      <img
                        src={item.image}
                        alt={item.type}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-5">
                      <h3 className="mb-1 text-lg font-bold text-navy-900">{item.type}</h3>
                      <p className="mb-2 text-sm text-gray-600">{item.description}</p>
                      <p className="mb-1 text-xs text-gray-500">
                        <strong>Best for:</strong> {item.bestFor}
                      </p>
                      <p className="text-sm font-semibold text-green-700">{item.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases by Event */}
        <section className="py-12">
          <div className="container mx-auto max-w-7xl px-4">
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-navy-900">
              Proven at Major Trade Shows
            </h2>
            <p className="mb-8 text-sm text-gray-500">
              Our inflatables have appeared at these industry-leading events
            </p>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-6 py-4 text-sm font-bold text-navy-900">Event</th>
                    <th className="px-6 py-4 text-sm font-bold text-navy-900">Venue</th>
                    <th className="px-6 py-4 text-sm font-bold text-navy-900">Recommended Products</th>
                    <th className="px-6 py-4 text-sm font-bold text-navy-900">Attendees</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {useCases.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="px-6 py-4 text-sm font-semibold text-navy-900">{row.event}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.venue}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.products}</td>
                      <td className="px-6 py-4 text-sm font-medium text-navy-700">{row.attendees}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Tips */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-navy-900">
              Trade Show Inflatable Tips
            </h2>
            <p className="mb-8 text-sm text-gray-500">
              From setup to teardown — get the most from your investment
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {tips.map((tip, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  <span className="text-sm text-gray-700">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Inflatables */}
        <section className="py-12">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="mb-8 text-2xl font-bold tracking-tight text-navy-900">
              Why Trade Show Exhibitors Choose Inflatables
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <Zap className="mb-4 h-10 w-10 text-red-500" />
                <h3 className="mb-2 text-lg font-bold text-navy-900">Instant Attention</h3>
                <p className="text-sm text-gray-600">
                  A 20 ft product replica is visible from across the expo hall. Attendees stop to take photos —
                  free social media exposure.
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <DollarSign className="mb-4 h-10 w-10 text-red-500" />
                <h3 className="mb-2 text-lg font-bold text-navy-900">Cost-Effective</h3>
                <p className="text-sm text-gray-600">
                  $5,000 inflatable used across 5 shows = $1,000 per event. Compare to $15,000 custom booth build
                  that ends up in a landfill.
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <Clock className="mb-4 h-10 w-10 text-red-500" />
                <h3 className="mb-2 text-lg font-bold text-navy-900">Quick Setup</h3>
                <p className="text-sm text-gray-600">
                  15–30 minute setup with one or two people. No union labor required at most venues.
                  Deflate, pack, and ship to the next show.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="mb-8 text-2xl font-bold tracking-tight text-navy-900">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqItems.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-gray-200 bg-white p-5"
                >
                  <h3 className="mb-2 text-base font-semibold text-navy-900">{faq.question}</h3>
                  <p className="text-sm leading-relaxed text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-gray-200 bg-white py-16">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-navy-900">
              Get a Free Quote for Your Next Trade Show
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
              Tell us which show you&apos;re exhibiting at. We&apos;ll design a custom inflatable that
              stops attendees in their tracks.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/get-quote"
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-red-600/30 transition-all hover:bg-red-500"
              >
                Get Free Quote
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-navy-300 px-8 py-4 text-base font-semibold text-navy-700 transition-all hover:border-navy-700 hover:bg-navy-50"
              >
                View Case Studies
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
