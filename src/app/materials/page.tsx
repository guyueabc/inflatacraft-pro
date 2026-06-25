import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Inflatable Materials Explained: 210D vs 420D vs 500D | InflatableModel",
  description:
    "Complete guide to inflatable materials. Compare 210D, 420D, 500D Oxford nylon, PVC, and Cordura. Understand denier ratings, UV resistance, fire retardancy, and lifespan.",
  keywords: "inflatable material, 210D Oxford nylon, 500D PVC, inflatable durability, denier rating, inflatable fabric, NFPA 701",
  openGraph: {
    title: "Inflatable Materials Guide | InflatableModel",
    description: "210D vs 420D vs 500D — which material is right for your inflatable?",
    type: "article",
  },
};

const materials = [
  {
    grade: "Commercial Standard",
    fabric: "210D Oxford Nylon",
    denier: "210D",
    lifespan: "2–3 years",
    bestFor: "Product replicas, mascots, indoor use, occasional outdoor",
    price: "Included (no upgrade cost)",
    uvResistance: "Moderate (2–3 yr fade resistance)",
    weight: "Lightweight, easy to transport",
  },
  {
    grade: "Heavy Duty",
    fabric: "420D Oxford Nylon",
    denier: "420D",
    lifespan: "3–5 years",
    bestFor: "Frequent outdoor use, sports events, stadium installations",
    price: "+$200–$500 per unit",
    uvResistance: "High (3–5 yr fade resistance)",
    weight: "Heavier, more rigid structure",
  },
  {
    grade: "Extreme Duty",
    fabric: "500D PVC-Coated Polyester / Cordura",
    denier: "500D",
    lifespan: "5+ years",
    bestFor: "Permanent installations, extreme weather, rental fleet",
    price: "+$500–$2,000 per unit",
    uvResistance: "Excellent (5+ yr fade resistance)",
    weight: "Heavy, requires stronger blower",
  },
];

const comparison = [
  { factor: "Fabric Weight (per m²)", d70: "~45 g/m²", d210: "~70 g/m²", d420: "~110 g/m²", d500: "~150 g/m²" },
  { factor: "Tear Strength", d70: "Very low", d210: "Moderate", d420: "High", d500: "Excellent" },
  { factor: "UV Fade Resistance", d70: "3–6 months", d210: "2–3 years", d420: "3–5 years", d500: "5+ years" },
  { factor: "Water Resistance", d70: "Poor", d210: "Good", d420: "Very good", d500: "Excellent" },
  { factor: "Fire Retardant (NFPA 701)", d70: "No", d210: "Yes (certified)", d420: "Yes (certified)", d500: "Yes (certified)" },
  { factor: "Typical Lifespan", d70: "1 season", d210: "2–3 years", d420: "3–5 years", d500: "5+ years" },
];

const printTypes = [
  {
    type: "Digital UV Printing",
    quality: "Photorealistic, full-color, CMYK + spot colors",
    durability: "3–5 year fade resistance outdoors",
    price: "Included (standard on all our products)",
    bestFor: "Logos, product replicas, complex designs, photography",
  },
  {
    type: "Dye-Sublimation",
    quality: "Vibrant colors, ink absorbed into fabric",
    durability: "2–4 year fade resistance",
    price: "+$100–$300",
    bestFor: "Simple logos, large solid color areas",
  },
  {
    type: "Silk-Screen Printing",
    quality: "Limited colors, visible dot pattern up close",
    durability: "6–12 month fade resistance",
    price: "$0–$200 (budget suppliers)",
    bestFor: "Budget products, single-color logos, indoor only",
  },
];

const faqItems = [
  {
    question: "What does the 'D' in 210D mean?",
    answer:
      "The 'D' stands for Denier, which measures the thickness of individual fibers in the fabric. Higher Denier = thicker, stronger, heavier fabric. 70D is thin (like a lightweight rain jacket). 210D is moderate (like a backpack). 500D is heavy (like luggage). For commercial inflatables, 210D is the minimum standard. Avoid 70D — it tears easily and lasts only one season.",
  },
  {
    question: "Is Oxford nylon better than PVC for inflatables?",
    answer:
      "Oxford nylon (210D–500D) is the industry standard for most commercial inflatables because it's lightweight, flexible, and easy to pack. PVC-coated polyester is heavier and more rigid — better for permanent installations or water-based inflatables but less convenient for events that require frequent setup/teardown. For 90% of brand activations, Oxford nylon is the right choice.",
  },
  {
    question: "Do your inflatables meet NFPA 701 fire safety standards?",
    answer:
      "Yes, all our materials are NFPA 701 certified — the US standard for flame retardancy in textiles. This is required by convention centers, stadiums, malls, and most event venues in the United States. We also meet EN 71 (EU) and AS/NZS (Australia/New Zealand) standards. Documentation is provided on request.",
  },
  {
    question: "How do I clean and maintain my inflatable?",
    answer:
      "Wipe with mild soap and water. Do not machine wash. Allow to fully dry before storing. For stubborn stains, use isopropyl alcohol on a cloth. Store in the included storage bag in a cool, dry place away from direct sunlight. Annual professional cleaning extends lifespan by 1–2 years. See our Setup & Maintenance Guide for detailed instructions.",
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

export default function MaterialsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="min-h-screen bg-white">
        <section className="bg-navy-900 px-4 py-16 text-white">
          <div className="container mx-auto max-w-4xl">
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-red-400">Technical Guide</p>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Inflatable Materials Explained</h1>
            <p className="text-lg text-gray-300">
              210D vs 420D vs 500D — understand denier ratings, fabric types, print quality, and fire safety. Choose the right material for your inflatable investment.
            </p>
          </div>
        </section>

        {/* Quick Answer */}
        <section className="py-12">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="rounded-xl border-l-4 border-navy-600 bg-navy-50 p-6">
              <h2 className="mb-3 text-xl font-bold text-navy-900">Quick Answer</h2>
              <p className="text-base leading-relaxed text-navy-900">
                <strong>210D Oxford nylon</strong> is the commercial standard — included at no extra cost, good for 2–3 years. <strong>420D</strong> for heavy outdoor use (+$200–$500). <strong>500D Cordura</strong> for permanent installations (+$500–$2,000). <strong>Avoid 70D</strong> polyester — it's single-season only. All our materials are NFPA 701 fire retardant certified.
              </p>
            </div>
          </div>
        </section>

        {/* Material Grades */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto max-w-7xl px-4">
            <h2 className="mb-8 text-2xl font-bold tracking-tight text-navy-900">Material Grades We Offer</h2>
            <div className="grid gap-6 lg:grid-cols-3">
              {materials.map((m, idx) => (
                <div key={idx} className="rounded-xl border border-gray-200 bg-white p-6">
                  <div className="mb-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${idx === 0 ? "bg-green-100 text-green-700" : idx === 1 ? "bg-orange-100 text-orange-700" : "bg-red-100 text-red-700"}`}>
                      {m.grade}
                    </span>
                  </div>
                  <h3 className="mb-1 text-lg font-bold text-navy-900">{m.fabric}</h3>
                  <p className="mb-4 text-sm text-gray-500">{m.denier}</p>
                  <dl className="space-y-2 text-sm">
                    <div><dt className="font-semibold text-navy-900">Lifespan:</dt><dd className="text-gray-700">{m.lifespan}</dd></div>
                    <div><dt className="font-semibold text-navy-900">Best for:</dt><dd className="text-gray-700">{m.bestFor}</dd></div>
                    <div><dt className="font-semibold text-navy-900">Price:</dt><dd className="text-green-700">{m.price}</dd></div>
                    <div><dt className="font-semibold text-navy-900">UV Resistance:</dt><dd className="text-gray-700">{m.uvResistance}</dd></div>
                  </dl>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Denier Comparison Table */}
        <section className="py-12">
          <div className="container mx-auto max-w-7xl px-4">
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-navy-900">Denier Comparison: 70D vs 210D vs 420D vs 500D</h2>
            <p className="mb-8 text-sm text-gray-500">Why higher Denier matters for commercial inflatables</p>
            <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
              <table className="w-full min-w-[800px] text-left">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-6 py-4 text-sm font-bold text-navy-900">Property</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-400">70D (Budget)</th>
                    <th className="px-6 py-4 text-sm font-bold text-green-700">210D (Standard)</th>
                    <th className="px-6 py-4 text-sm font-bold text-navy-700">420D (Heavy)</th>
                    <th className="px-6 py-4 text-sm font-bold text-red-700">500D (Extreme)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {comparison.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="px-6 py-4 text-sm font-semibold text-navy-900">{row.factor}</td>
                      <td className="px-6 py-4 text-sm text-gray-400">{row.d70}</td>
                      <td className="px-6 py-4 text-sm text-green-700">{row.d210}</td>
                      <td className="px-6 py-4 text-sm text-navy-700">{row.d420}</td>
                      <td className="px-6 py-4 text-sm text-red-700">{row.d500}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Print Quality */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="mb-8 text-2xl font-bold tracking-tight text-navy-900">Print Quality Comparison</h2>
            <div className="space-y-4">
              {printTypes.map((p, idx) => (
                <div key={idx} className="rounded-xl border border-gray-200 bg-white p-5">
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                    <h3 className="text-lg font-bold text-navy-900">{p.type}</h3>
                    <span className={`text-sm font-semibold ${p.price.includes("Included") || p.price.includes("standard") ? "text-green-700" : "text-gray-600"}`}>{p.price}</span>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <p className="text-sm text-gray-600"><strong>Quality:</strong> {p.quality}</p>
                    <p className="text-sm text-gray-600"><strong>Durability:</strong> {p.durability}</p>
                  </div>
                  <p className="mt-2 text-xs text-gray-500"><strong>Best for:</strong> {p.bestFor}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="mb-8 text-2xl font-bold tracking-tight text-navy-900">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqItems.map((faq, idx) => (
                <div key={idx} className="rounded-xl border border-gray-200 bg-gray-50/50 p-5">
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
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-navy-900">Questions About Materials?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">Our team will help you choose the right material for your use case.</p>
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
