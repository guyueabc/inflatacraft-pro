import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Trophy, Eye, Users, Megaphone } from "lucide-react";

export const metadata: Metadata = {
  title: "Sports Event Inflatables | Stadium Activation & Fan Engagement | InflatableModel",
  description:
    "Custom inflatables for sports events, stadiums, and fan zones. Finish line arches, helmet tunnels, team mascots, and player run-throughs. NFPA 701 certified. Free 3D renderings.",
  keywords: "sports inflatable, stadium inflatable, finish line arch, helmet tunnel, team mascot inflatable, fan engagement, race inflatable",
  openGraph: {
    title: "Sports Event Inflatables | InflatableModel",
    description: "Stadium and sports event inflatables for fan engagement.",
    type: "article",
  },
};

const stats = [
  { icon: Trophy, value: "50+", label: "Stadiums equipped" },
  { icon: Eye, value: "12M+", label: "Spectator impressions" },
  { icon: Users, value: "4x", label: "Social media engagement" },
  { icon: Megaphone, value: "$800", label: "Cost per event (5-year life)" },
];

const productTypes = [
  { type: "Player Run-Through Tunnels", price: "$5,000–$15,000", desc: "Inflatable team tunnels for player entrances — the highlight of any game day." },
  { type: "Finish Line Arches", price: "$3,000–$10,000", desc: "Branded arches for 5K, marathon, cycling, and obstacle course finishes." },
  { type: "Helmet Tunnels", price: "$5,000–$12,000", desc: "Giant team helmets that players run through — iconic stadium moments." },
  { type: "Team Mascots", price: "$2,000–$8,000", desc: "Walk-around mascot costumes and stationary inflatable characters." },
  { type: "Sponsor Branded Arches", price: "$3,500–$9,000", desc: "Sponsor logos on finish lines, fan zones, and entrance gates." },
  { type: "Interactive Games", price: "$5,000–$25,000", desc: "Inflatable obstacle courses, target toss, and fan challenge zones." },
];

const sportsUseCases = [
  { sport: "Football & NFL", products: "Helmet tunnels, player run-throughs, team mascots" },
  { sport: "Basketball & NBA", products: "Player tunnels, sponsor arches, halftime inflatables" },
  { sport: "Soccer & MLS", products: "Goal arches, sponsor gates, mascot costumes" },
  { sport: "Motorsport (NASCAR/IndyCar)", products: "Finish line arches, car replicas, sponsor tunnels" },
  { sport: "Marathon & Running", products: "Finish line arches, start gates, branded kilometer markers" },
  { sport: "Baseball & MLB", products: "Mascot inflatables, sponsor arches, fan zone tents" },
  { sport: "Golf Tournaments", products: "Branded entrance arches, sponsor tunnels, photo backdrops" },
  { sport: "Esports Events", products: "Team logos, player walk-throughs, sponsor displays" },
];

const faqItems = [
  {
    question: "Are inflatables NFPA 701 fire retardant certified?",
    answer:
      "Yes, all our stadium-grade inflatables use NFPA 701 certified fire-retardant materials. This certification is required by major US venues including NFL, NBA, and MLB stadiums. We provide documentation upon request. For international venues, we also meet EN 71 (EU) and AS/NZS (Australia) standards.",
  },
  {
    question: "Can inflatables withstand outdoor stadium conditions?",
    answer:
      "Our sports inflatables use 420D–500D heavy-duty Oxford nylon with UV-resistant coating. They are rated for sustained winds up to 25 mph. For extreme conditions, we offer anchor systems with 12+ ground stakes and 200 lb sandbags. Always deflate during severe weather (lightning, winds 30+ mph).",
  },
  {
    question: "How fast can we set up a player run-through tunnel?",
    answer:
      "A standard 12 ft player tunnel inflates in 3–5 minutes using a 1.5 HP blower. Two crew members can position and anchor it in under 15 minutes. Teardown is equally fast — deflate in 2 minutes, fold and pack in 10 minutes. Perfect for tight game-day timelines.",
  },
  {
    question: "Can you make a replica of our team helmet or logo?",
    answer:
      "Yes, we create exact 3D replicas of team helmets, logos, and mascots. Our design team works from photos and brand guidelines to create accurate, recognizable inflatables. We provide free 3D renderings for approval before production. Typical turnaround is 4–6 weeks for custom designs.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function SportsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="min-h-screen bg-white">
        <section className="bg-navy-900 px-4 py-16 text-white">
          <div className="container mx-auto max-w-4xl">
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-red-400">Industry Solution</p>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Sports Event Inflatables</h1>
            <p className="text-lg text-gray-300">
              From helmet tunnels to finish line arches — create unforgettable game-day moments with NFPA 701 certified inflatables for stadiums, races, and fan zones.
            </p>
          </div>
        </section>

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

        <section className="py-12 bg-gray-50">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-navy-900">Sports Inflatable Products</h2>
            <p className="mb-8 text-sm text-gray-500">Engineered for stadium conditions and game-day energy</p>
            <div className="space-y-4">
              {productTypes.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5">
                  <div className="flex-1">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <h3 className="text-lg font-bold text-navy-900">{item.type}</h3>
                      <span className="text-sm font-semibold text-green-700">{item.price}</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-navy-900">Solutions by Sport</h2>
            <p className="mb-8 text-sm text-gray-500">Tailored inflatable solutions for each sport</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {sportsUseCases.map((row, idx) => (
                <div key={idx} className="rounded-lg border border-gray-200 bg-white p-4">
                  <h3 className="mb-1 text-sm font-bold text-navy-900">{row.sport}</h3>
                  <p className="text-xs text-gray-600">{row.products}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="mb-8 text-2xl font-bold tracking-tight text-navy-900">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqItems.map((faq, idx) => (
                <div key={idx} className="rounded-xl border border-gray-200 bg-white p-5">
                  <h3 className="mb-2 text-base font-semibold text-navy-900">{faq.question}</h3>
                  <p className="text-sm leading-relaxed text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-gray-200 bg-white py-16">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-navy-900">Build Your Stadium Moment</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">Get a custom inflatable that electrifies your fans.</p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/get-quote" className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-red-600/30 transition-all hover:bg-red-500">
                Get Free Quote <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
