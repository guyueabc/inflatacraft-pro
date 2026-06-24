import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, XCircle, ArrowRight, Phone, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Custom Inflatable Buying Guide: China Factory vs Local Maker | InflatableModel",
  description:
    "Complete buyer's guide for custom inflatables. Compare China factory direct vs local makers vs trading companies on price, quality, lead time, MOQ, warranty, and after-sales support.",
  openGraph: {
    title: "Custom Inflatable Buying Guide | InflatableModel",
    description:
      "China factory vs local maker: price, quality, lead time, MOQ, warranty compared.",
    type: "article",
  },
};

const comparisonData = [
  {
    feature: "Unit Price (15ft replica)",
    chinaFactory: "$1,500–$4,000",
    localMaker: "$4,000–$8,000",
    tradingCompany: "$3,000–$6,000 (markup)",
  },
  {
    feature: "Material Quality",
    chinaFactory: "210D–500D Oxford/Cordura (specify grade)",
    localMaker: "210D–500D (similar, locally sourced)",
    tradingCompany: "Varies — often 70D to cut cost",
  },
  {
    feature: "Lead Time",
    chinaFactory: "3–6 weeks (production + shipping)",
    localMaker: "2–6 weeks (no shipping)",
    tradingCompany: "4–8 weeks (factory + middleman)",
  },
  {
    feature: "Minimum Order Quantity",
    chinaFactory: "1 unit (most factories)",
    localMaker: "1 unit",
    tradingCompany: "1–10 units (varies)",
  },
  {
    feature: "Custom Design (3D Renderings)",
    chinaFactory: "Usually free, 48–72 hr turnaround",
    localMaker: "Free or $200–$500",
    tradingCompany: "Often $300–$800",
  },
  {
    feature: "Warranty",
    chinaFactory: "1–3 years (verify written policy)",
    localMaker: "1–2 years",
    tradingCompany: "30 days–1 year (inconsistent)",
  },
  {
    feature: "After-Sales Support",
    chinaFactory: "Email/WhatsApp, response within 24 hr",
    localMaker: "Phone/in-person same day",
    tradingCompany: "Delayed (relays to factory)",
  },
  {
    feature: "Shipping Cost",
    chinaFactory: "$200–$800 (air) or $50–$200 (sea, slower)",
    localMaker: "$50–$300 (domestic)",
    tradingCompany: "$200–$600",
  },
  {
    feature: "Payment Security",
    chinaFactory: "T/T 50% deposit, trade assurance available",
    localMaker: "Credit card, PO, Net-30",
    tradingCompany: "T/T, PayPal (buyer protection)",
  },
  {
    feature: "Communication",
    chinaFactory: "English via WhatsApp/WeChat, time zone gap",
    localMaker: "Native English, same time zone",
    tradingCompany: "English, but adds communication lag",
  },
];

const checklistItems = [
  "Request material specs in writing (fabric weight in Denier, e.g. 210D vs 70D)",
  "Ask for 3D renderings before paying — reputable factories provide this free",
  "Verify warranty terms in writing: duration, what's covered, return policy",
  "Request production photos at 30%, 60%, and 90% completion milestones",
  "Confirm total landed cost: unit price + shipping + duties + insurance",
  "Check if factory has actual manufacturing photos/videos (not just renderings)",
  "Ask for 2–3 past client references in your industry",
  "Confirm packaging includes storage bag, repair kit, and setup instructions",
  "Verify electrical specs match your country (110V vs 220V, plug type)",
  "Get a firm delivery date in writing, not just '3–4 weeks'",
];

// FAQPage JSON-LD for AI citation
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is it cheaper to buy custom inflatables directly from a China factory?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Buying factory-direct from China typically saves 40–60% compared to local makers, because you eliminate the distributor markup. A 15-foot custom inflatable replica costs $1,500–$4,000 factory-direct vs $4,000–$8,000 from a local maker. However, you must factor in shipping ($200–$800 by air), import duties, and a 3–6 week lead time including transit.",
      },
    },
    {
      "@type": "Question",
      name: "What is the minimum order quantity for custom inflatables from a China factory?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most China inflatable factories accept orders starting from 1 unit. There is no minimum order quantity for custom inflatables. Whether you need one giant product replica for a trade show or 500 branded tents for a nationwide rollout, factories handle both. Volume discounts typically apply at 10+ units.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to manufacture and ship a custom inflatable from China?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Production takes 2–6 weeks depending on complexity. Shipping adds 3–7 days by air freight or 2–4 weeks by ocean freight. Total lead time is typically 3–6 weeks by air or 5–10 weeks by sea. Rush production (7–14 days) is available from most factories at an additional fee.",
      },
    },
    {
      "@type": "Question",
      name: "How can I verify a China inflatable factory's quality before placing an order?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Request material samples to verify fabric weight (210D+ for commercial grade), ask for 3D renderings before paying, require production photos at 30/60/90% milestones, check for real factory photos (not just product images), and ask for 2–3 client references in your industry. Use Alibaba Trade Assurance or escrow for payment protection on first orders.",
      },
    },
    {
      "@type": "Question",
      name: "What materials should I look for in a quality custom inflatable?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For commercial-grade inflatables, look for 210D Oxford nylon (standard), 420D Oxford nylon (heavy-duty), or 500D Cordura nylon (extreme duty). Avoid 70D polyester — it is thin and single-season only. All materials should be UV-resistant, water-repellent, and fire-retardant certified (NFPA 701 for US venues). Print should be UV-resistant digital or dye-sublimation, not basic silk-screen.",
      },
    },
    {
      "@type": "Question",
      name: "What warranty should a custom inflatable manufacturer offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Reputable manufacturers offer 1–3 years covering manufacturing defects, seam failures, and print delamination. Budget manufacturers offer 30 days or no warranty. Blower motors typically carry a separate 1-year manufacturer warranty. Always get warranty terms in writing before placing an order.",
      },
    },
  ],
};

export default function BuyingGuidePage() {
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
              Buyer's Guide
            </p>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Custom Inflatable Buying Guide
            </h1>
            <p className="text-lg text-gray-300">
              China Factory vs. Local Maker vs. Trading Company — an objective
              comparison to help B2B buyers make informed decisions when sourcing
              custom inflatables worldwide.
            </p>
          </div>
        </section>

        {/* Intro — conclusion first for GEO */}
        <section className="py-12">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="rounded-xl border-l-4 border-navy-600 bg-navy-50 p-6">
              <h2 className="mb-3 text-xl font-bold text-navy-900">
                Quick Answer
              </h2>
              <p className="text-base leading-relaxed text-navy-900">
                For most B2B buyers, a <strong>China factory-direct</strong>{" "}
                purchase offers the best value: 40–60% lower unit prices, no MOQ,
                free 3D renderings, and 2–6 week production. The trade-offs are
                longer shipping times and communication across time zones.{" "}
                <strong>Local makers</strong> are better for rush orders under 2
                weeks and when you need in-person service.{" "}
                <strong>Trading companies</strong> add 30–50% markup and
                communication lag without adding quality — avoid them when
                possible.
              </p>
            </div>
          </div>
        </section>

        {/* Three-Way Comparison Table */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto max-w-7xl px-4">
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-navy-900">
              Comparison: China Factory vs Local Maker vs Trading Company
            </h2>
            <p className="mb-8 text-sm text-gray-500">
              Based on 2024–2025 market data for custom inflatable manufacturing
            </p>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <table className="w-full min-w-[768px] text-left">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="px-4 sm:px-6 py-4 text-sm font-bold text-navy-900">
                        Factor
                      </th>
                      <th className="px-4 sm:px-6 py-4 text-sm font-bold text-green-700">
                        China Factory Direct
                      </th>
                      <th className="px-4 sm:px-6 py-4 text-sm font-bold text-navy-700">
                        Local Maker (US/EU)
                      </th>
                      <th className="px-4 sm:px-6 py-4 text-sm font-bold text-gray-400">
                        Trading Company
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {comparisonData.map((row, idx) => (
                      <tr
                        key={idx}
                        className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}
                      >
                        <td className="px-4 sm:px-6 py-4 text-sm font-semibold text-navy-900">
                          {row.feature}
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-sm text-green-800">
                          {row.chinaFactory}
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-sm text-navy-700">
                          {row.localMaker}
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-sm text-gray-500">
                          {row.tradingCompany}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Buyer's Checklist */}
        <section className="py-12">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-navy-900">
              Buyer's Checklist: 10 Things to Verify Before Ordering
            </h2>
            <p className="mb-8 text-sm text-gray-500">
              Use this checklist regardless of which sourcing route you choose
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {checklistItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Honest pros/cons */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="mb-8 text-2xl font-bold tracking-tight text-navy-900">
              Honest Pros & Cons by Sourcing Route
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {/* China Factory */}
              <div className="rounded-xl border border-green-200 bg-green-50/50 p-6">
                <h3 className="mb-4 text-lg font-bold text-green-800">
                  China Factory Direct
                </h3>
                <div className="mb-4 space-y-2">
                  {["40–60% cheaper", "No MOQ", "Free design support", "Large production capacity"].map((pro) => (
                    <div key={pro} className="flex items-center gap-2 text-sm text-green-700">
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                      {pro}
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  {["3–6 week shipping", "Time zone communication gap", "Import duties apply"].map((con) => (
                    <div key={con} className="flex items-center gap-2 text-sm text-red-600">
                      <XCircle className="h-4 w-4 flex-shrink-0" />
                      {con}
                    </div>
                  ))}
                </div>
              </div>

              {/* Local Maker */}
              <div className="rounded-xl border border-navy-200 bg-navy-50/50 p-6">
                <h3 className="mb-4 text-lg font-bold text-navy-800">
                  Local Maker (US/EU)
                </h3>
                <div className="mb-4 space-y-2">
                  {["Fastest delivery (<2 wk)", "Same time zone", "In-person service", "No import duties"].map((pro) => (
                    <div key={pro} className="flex items-center gap-2 text-sm text-navy-700">
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                      {pro}
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  {["2–3× more expensive", "Limited capacity", "Fewer material options"].map((con) => (
                    <div key={con} className="flex items-center gap-2 text-sm text-red-600">
                      <XCircle className="h-4 w-4 flex-shrink-0" />
                      {con}
                    </div>
                  ))}
                </div>
              </div>

              {/* Trading Company */}
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                <h3 className="mb-4 text-lg font-bold text-gray-600">
                  Trading Company
                </h3>
                <div className="mb-4 space-y-2">
                  {["Easy to find online", "Handles logistics", "English-speaking reps"].map((pro) => (
                    <div key={pro} className="flex items-center gap-2 text-sm text-gray-500">
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                      {pro}
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  {["30–50% markup", "Communication lag", "No quality control", "Often misrepresents factory"].map((con) => (
                    <div key={con} className="flex items-center gap-2 text-sm text-red-600">
                      <XCircle className="h-4 w-4 flex-shrink-0" />
                      {con}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="mb-8 text-2xl font-bold tracking-tight text-navy-900">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqJsonLd.mainEntity.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-gray-200 bg-gray-50/50 p-5"
                >
                  <h3 className="mb-2 text-base font-semibold text-navy-900">
                    {faq.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-700">
                    {faq.acceptedAnswer.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-gray-200 bg-white py-16">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-navy-900">
              Ready to Get a Quote?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
              Get a free, no-obligation quote with complimentary 3D renderings.
              Most quotes returned within 24 hours.
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
                href="https://wa.me/8615376427736" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-navy-300 px-8 py-4 text-base font-semibold text-navy-700 transition-all hover:border-navy-700 hover:bg-navy-50"
              >
                <Phone className="h-5 w-5" />
                
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
