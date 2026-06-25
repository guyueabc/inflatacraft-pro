import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, XCircle, ArrowRight, Mail, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Custom Inflatable Pricing Guide 2026 | Cost Breakdown & Quotes | InflatableModel",
  description:
    "Complete pricing guide for custom inflatables in 2026. Compare costs for product replicas, mascots, arches, tents, and games. Get instant quote for your project.",
  openGraph: {
    title: "Custom Inflatable Pricing Guide 2026 | InflatableModel",
    description:
      "How much does a custom inflatable cost? Full pricing breakdown by type, size, and material.",
    type: "article",
  },
};

const pricingByType = [
  {
    type: "Product Replica",
    sizes: [
      { size: "6–8 ft", price: "$1,500–$3,000" },
      { size: "10–12 ft", price: "$2,500–$5,000" },
      { size: "15–20 ft", price: "$4,000–$10,000" },
      { size: "25–30 ft", price: "$8,000–$20,000" },
    ],
    examples: "Giant soda can, beer bottle, snack bag, pill bottle",
  },
  {
    type: "Mascot Costume",
    sizes: [
      { size: "Standard (one size)", price: "$2,000–$4,000" },
      { size: "Custom fit", price: "$3,000–$6,000" },
      { size: "Premium (LED, sound)", price: "$5,000–$8,000" },
    ],
    examples: "Brand mascot, sports mascot, gorilla suit, character costume",
  },
  {
    type: "Finish Line Arch",
    sizes: [
      { size: "10 ft wide", price: "$2,500–$4,500" },
      { size: "15 ft wide", price: "$3,500–$6,000" },
      { size: "20 ft wide", price: "$5,000–$9,000" },
      { size: "30+ ft wide", price: "$8,000–$15,000" },
    ],
    examples: "Race finish arch, start line arch, helmet tunnel",
  },
  {
    type: "Event Tent",
    sizes: [
      { size: "10×10 ft", price: "$2,000–$4,000" },
      { size: "10×15 ft", price: "$3,000–$5,500" },
      { size: "15×15 ft", price: "$4,500–$8,000" },
      { size: "20×20 ft", price: "$7,000–$12,000" },
    ],
    examples: "Promotional tent, dome canopy, pop-up booth",
  },
  {
    type: "Inflatable Game",
    sizes: [
      { size: "Small (interactive)", price: "$2,500–$5,000" },
      { size: "Medium (obstacle)", price: "$5,000–$12,000" },
      { size: "Large (course)", price: "$10,000–$25,000" },
    ],
    examples: "Dart board, obstacle course, sports game",
  },
];

const costFactors = [
  { factor: "Height / Size", impact: "Larger = more material + labor", range: "+$500 to +$10,000" },
  { factor: "Complexity", impact: "Custom shapes, multiple components", range: "+$500 to +$5,000" },
  { factor: "Material Grade", impact: "210D standard vs 500D heavy-duty", range: "+$200 to +$2,000" },
  { factor: "Print Type", impact: "Digital UV vs silk-screen", range: "+$100 to +$1,500" },
  { factor: "Internal LED Lighting", impact: "Night visibility, brand impact", range: "+$300 to +$1,500" },
  { factor: "Blower System", impact: "Quiet vs standard, included", range: "$0 to +$300" },
  { factor: "Rush Production", impact: "< 2 weeks turnaround", range: "+20% to +50%" },
  { factor: "Shipping (Air)", impact: "International delivery", range: "$200–$800" },
  { factor: "Shipping (Ocean)", impact: "Slower but cheaper", range: "$50–$200" },
];

const hiddenCosts = [
  { cost: "Import Duties", us: "0–25% of declared value", china: "Included in FOB price" },
  { cost: "Storage Bag", us: "Usually included", china: "Always included" },
  { cost: "Repair Kit", us: "$30–$75 extra", china: "Included" },
  { cost: "Setup Instructions", us: "Often extra", china: "Included" },
  { cost: "Design Revisions", us: "$50–$200 per round", china: "Free (most factories)" },
];

const faqItems = [
  {
    question: "How much does a custom inflatable cost?",
    answer:
      "Custom inflatables range from $1,500 for a small 6-foot product replica to $50,000+ for a 30-foot complex installation. The average B2B order for a 15-foot product replica with digital printing costs $4,000–$6,000 including shipping. Mascot costumes run $2,000–$6,000, event tents $2,500–$12,000, and inflatable games $5,000–$25,000.",
  },
  {
    question: "What is the minimum order quantity for custom inflatables?",
    answer:
      "Most manufacturers, including inflatablemodel, have no minimum order quantity. You can order a single custom inflatable. Volume discounts typically start at 5+ units (10–15% off) and increase at 10+ units (15–25% off).",
  },
  {
    question: "How does material choice affect price?",
    answer:
      "Material accounts for 15–25% of total cost. 210D Oxford nylon is standard for most commercial inflatables at no extra charge. Upgrading to 420D adds approximately $200–$500, and 500D PVC-coated polyester adds $500–$2,000 depending on size. Heavier materials extend lifespan from 2–3 years to 5+ years of commercial use.",
  },
  {
    question: "Are design and 3D renderings included in the price?",
    answer:
      "Reputable manufacturers provide free 3D renderings and design revisions before production. This is standard at inflatablemodel and most China factory-direct suppliers. Some US/EU makers charge $200–$500 for design work. Always confirm design is included before placing an order.",
  },
  {
    question: "What is the typical payment structure?",
    answer:
      "Industry standard is 50% deposit to start production, 50% before shipping. For orders under $3,000, some suppliers require 100% upfront. Use Trade Assurance (Alibaba) or escrow services for payment protection on first-time orders. Wire transfer (T/T), PayPal, and credit cards are commonly accepted.",
  },
  {
    question: "How much should I budget for shipping?",
    answer:
      "Air freight to the US costs $200–$800 for a 15-foot inflatable (3–7 days). Ocean freight is $50–$200 but takes 4–6 weeks. Domestic shipping within the US runs $50–$300. Always get a shipping quote before finalizing your order—international shipping can add 10–20% to total cost.",
  },
  {
    question: "What is the ROI of a custom inflatable?",
    answer:
      "B2B brands typically see 3–10x ROI from trade show inflatables through increased booth traffic and lead generation. Retail activations with product replicas have documented 15–25% sales lift during campaigns. A $5,000 inflatable used across 5 events over 3 years costs $1,000 per event—far cheaper than $10,000+ print or digital campaigns with similar reach.",
  },
];

// FAQPage JSON-LD for AI citation
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

export default function PricingGuidePage() {
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
              Pricing Guide
            </p>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Custom Inflatable Pricing Guide
            </h1>
            <p className="text-lg text-gray-300">
              Complete cost breakdown for 2026. Product replicas, mascots, arches, tents, and games —
              understand what you&apos;re paying for and how to get the best value.
            </p>
          </div>
        </section>

        {/* Quick Answer */}
        <section className="py-12">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="rounded-xl border-l-4 border-navy-600 bg-navy-50 p-6">
              <h2 className="mb-3 text-xl font-bold text-navy-900">Quick Answer</h2>
              <p className="text-base leading-relaxed text-navy-900">
                <strong>Small product replicas (6–8 ft): $1,500–$3,000.</strong> Medium (10–12 ft): $2,500–$5,000.
                Large (15–20 ft): $4,000–$10,000. Mascot costumes: $2,000–$6,000. Event tents: $2,500–$12,000.
                Inflatable games: $5,000–$25,000. Add 10–20% for shipping. No MOQ — single units accepted.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing by Type */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto max-w-7xl px-4">
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-navy-900">
              Pricing by Type &amp; Size
            </h2>
            <p className="mb-8 text-sm text-gray-500">
              Base prices for custom inflatables from a China factory-direct supplier (2026)
            </p>
            <div className="grid gap-6 lg:grid-cols-2">
              {pricingByType.map((category, idx) => (
                <div
                  key={idx}
                  className="overflow-hidden rounded-xl border border-gray-200 bg-white"
                >
                  <div className="bg-navy-900 px-6 py-4">
                    <h3 className="text-lg font-bold text-white">{category.type}</h3>
                    <p className="mt-1 text-sm text-gray-300">{category.examples}</p>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {category.sizes.map((row, i) => (
                      <div key={i} className="flex items-center justify-between px-6 py-3">
                        <span className="text-sm font-medium text-gray-700">{row.size}</span>
                        <span className="text-sm font-semibold text-green-700">{row.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What Affects Price */}
        <section className="py-12">
          <div className="container mx-auto max-w-7xl px-4">
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-navy-900">
              What Affects the Price?
            </h2>
            <p className="mb-8 text-sm text-gray-500">
              Key factors that increase or decrease your final quote
            </p>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] text-left">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="px-6 py-4 text-sm font-bold text-navy-900">Factor</th>
                      <th className="px-6 py-4 text-sm font-bold text-navy-900">Impact</th>
                      <th className="px-6 py-4 text-sm font-bold text-navy-900">Price Range</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {costFactors.map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                        <td className="px-6 py-4 text-sm font-semibold text-navy-900">{row.factor}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{row.impact}</td>
                        <td className="px-6 py-4 text-sm font-medium text-green-700">{row.range}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Hidden Costs */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-navy-900">
              Watch for Hidden Costs
            </h2>
            <p className="mb-8 text-sm text-gray-500">
              Some suppliers charge extra for items others include free
            </p>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-6 py-4 text-sm font-bold text-navy-900">Item</th>
                    <th className="px-6 py-4 text-sm font-bold text-navy-700">Local Maker (US/EU)</th>
                    <th className="px-6 py-4 text-sm font-bold text-green-700">China Factory Direct</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {hiddenCosts.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="px-6 py-4 text-sm font-semibold text-navy-900">{row.cost}</td>
                      <td className="px-6 py-4 text-sm text-navy-700">{row.us}</td>
                      <td className="px-6 py-4 text-sm text-green-700">{row.china}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Value Comparison */}
        <section className="py-12">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="mb-8 text-2xl font-bold tracking-tight text-navy-900">
              Value Comparison: Cheap vs Quality
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                <h3 className="mb-4 text-lg font-bold text-gray-600">Budget Option</h3>
                <div className="mb-4 space-y-2">
                  {["70D thin polyester", "Single-season lifespan", "Basic silk-screen print", "No warranty", "No design support"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-gray-500">
                      <XCircle className="h-4 w-4 flex-shrink-0 text-red-500" />
                      {item}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  Total: <span className="font-semibold">$800–$2,000</span> (rebuy every year)
                </p>
              </div>
              <div className="rounded-xl border border-green-200 bg-green-50/50 p-6">
                <h3 className="mb-4 text-lg font-bold text-green-800">Commercial Grade</h3>
                <div className="mb-4 space-y-2">
                  {["210D–500D Oxford nylon", "3–5 year lifespan", "UV-resistant digital print", "2–3 year warranty", "Free 3D renderings"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-green-700">
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-green-700">
                  Total: <span className="font-semibold">$2,000–$6,000</span> (invest once)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
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
                  <h3 className="mb-2 flex items-start gap-2 text-base font-semibold text-navy-900">
                    <HelpCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                    {faq.question}
                  </h3>
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
              Get a Free Quote in 24 Hours
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
              Tell us your project details. We&apos;ll send you a detailed quote with 3D renderings — no commitment required.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/get-quote"
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-red-600/30 transition-all hover:bg-red-500"
              >
                Get Free Quote
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="https://wa.me/8615376427736"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-navy-300 px-8 py-4 text-base font-semibold text-navy-700 transition-all hover:border-navy-700 hover:bg-navy-50"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
              <a
                href="mailto:inflatablemodel@showlovein.com"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-navy-300 px-8 py-4 text-base font-semibold text-navy-700 transition-all hover:border-navy-700 hover:bg-navy-50"
              >
                <Mail className="h-5 w-5" />
                Email Us
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
