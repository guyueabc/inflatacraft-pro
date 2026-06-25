import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ShoppingBag, TrendingUp, MapPin, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Retail Inflatables | Drive Foot Traffic & Sales Lift | InflatableModel",
  description:
    "Inflatables for retail grand openings, store promotions, and shopping centers. Giant product replicas, mascots, and arches that increase foot traffic 25%+. Free 3D renderings.",
  keywords: "retail inflatable, store opening inflatable, grand opening inflatable, shopping center inflatable, retail promotion, inflatable product replica",
  openGraph: {
    title: "Retail Inflatables | InflatableModel",
    description: "Drive foot traffic and sales with custom inflatables for retail.",
    type: "article",
  },
};

const stats = [
  { icon: TrendingUp, value: "25%+", label: "Sales lift during campaigns" },
  { icon: MapPin, value: "2x", label: "Visibility vs standard signage" },
  { icon: ShoppingBag, value: "$500", label: "Cost per 1,000 impressions" },
  { icon: Users, value: "85%", label: "Shoppers recall inflatable" },
];

const useCases = [
  { scenario: "Grand Opening", solution: "20 ft product replica at entrance", result: "Lines around the block, local press coverage" },
  { scenario: "Seasonal Sale", solution: "Branded arch over parking entrance", result: "18% increase in parking lot traffic" },
  { scenario: "Product Launch", solution: "Inflatable product display in atrium", result: "3x social media mentions" },
  { scenario: "Holiday Campaign", solution: "Giant gift box inflatable", result: "32% increase in gift card sales" },
  { scenario: "Clearance Event", solution: "Dancing tube man with sale message", result: "45% more visitors vs signage" },
  { scenario: "Store Anniversary", solution: "Mascot costume for photo ops", result: "500+ photos shared on social" },
];

const productTypes = [
  { type: "Giant Product Replicas", price: "$2,000–$10,000", bestFor: "Food brands, electronics, consumer goods" },
  { type: "Entrance Arches", price: "$3,000–$8,000", bestFor: "Grand openings, parking lot markers" },
  { type: "Mascot Costumes", price: "$2,000–$5,000", bestFor: "Kids stores, family events, photo ops" },
  { type: "Dancing Tube Men", price: "$300–$800", bestFor: "Clearance, quick attention, outdoor" },
  { type: "Event Tents", price: "$2,500–$8,000", bestFor: "Outdoor mall events, popup shops" },
];

const faqItems = [
  {
    question: "How do inflatables increase retail foot traffic?",
    answer:
      "Inflatables create a visual landmark that can be seen from 100+ yards away. A 20 ft product replica at a mall entrance or store front attracts attention from passing cars and pedestrians. Studies show inflatables increase foot traffic by 15–30% compared to standard signage. They also encourage photo-taking, generating free social media exposure.",
  },
  {
    question: "Are inflatables allowed in shopping centers?",
    answer:
      "Most shopping centers permit inflatables with advance approval. Requirements typically include: proof of liability insurance, fire retardancy certification (NFPA 701), size restrictions (usually under 25 ft), and placement approval. We provide all necessary documentation. Always get written approval from mall management 30+ days before installation.",
  },
  {
    question: "What's the best inflatable for a grand opening?",
    answer:
      "A 15–20 ft giant product replica or brand mascot at the entrance is most effective for grand openings. It creates a photo opportunity, signals 'something special is happening,' and can be seen from the parking lot. Budget $3,000–$8,000 for a high-quality piece that can be reused at future locations or annual events.",
  },
  {
    question: "How long can I keep an inflatable inflated?",
    answer:
      "Commercial-grade inflatables are designed for continuous use. A properly sized blower keeps it inflated indefinitely. For outdoor installations, monitor wind conditions — deflate if winds exceed 25 mph. For indoor malls, inflatables can stay inflated for weeks with minimal power consumption (typical blower uses $2–$5/day in electricity).",
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

export default function RetailPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="min-h-screen bg-white">
        <section className="bg-navy-900 px-4 py-16 text-white">
          <div className="container mx-auto max-w-4xl">
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-red-400">Industry Solution</p>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Retail Inflatables</h1>
            <p className="text-lg text-gray-300">
              Drive foot traffic, increase sales, and create social media buzz with custom inflatables for retail grand openings, store promotions, and shopping centers.
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
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-navy-900">Proven Retail Use Cases</h2>
            <p className="mb-8 text-sm text-gray-500">Real results from retail inflatable campaigns</p>
            <div className="space-y-4">
              {useCases.map((row, idx) => (
                <div key={idx} className="rounded-xl border border-gray-200 bg-white p-5">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">{row.scenario}</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-1"><strong>Solution:</strong> {row.solution}</p>
                  <p className="text-sm text-green-700"><strong>Result:</strong> {row.result}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-navy-900">Best Inflatables for Retail</h2>
            <p className="mb-8 text-sm text-gray-500">Solutions ranked by ROI for retail environments</p>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-6 py-4 text-sm font-bold text-navy-900">Type</th>
                    <th className="px-6 py-4 text-sm font-bold text-navy-900">Price Range</th>
                    <th className="px-6 py-4 text-sm font-bold text-navy-900">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {productTypes.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="px-6 py-4 text-sm font-semibold text-navy-900">{row.type}</td>
                      <td className="px-6 py-4 text-sm text-green-700">{row.price}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-navy-900">Ready for Your Grand Opening?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">Get a custom inflatable that brings shoppers to your door.</p>
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
