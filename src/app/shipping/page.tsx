import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Plane, Ship, Truck, Package, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Custom Inflatable Shipping & Logistics Guide | InflatableModel",
  description:
    "How custom inflatables are shipped worldwide. Air freight, ocean freight, and domestic delivery explained. Shipping costs, timelines, packaging, customs, and tracking.",
  alternates: { canonical: "https://www.qddjtx.com/shipping" },
  keywords: "inflatable shipping, inflatable delivery, inflatable freight, inflatable logistics, international shipping, air freight inflatable",
  openGraph: {
    title: "Shipping & Logistics Guide | InflatableModel",
    description: "How your custom inflatable gets from factory to your door.",
    url: "https://www.qddjtx.com/shipping",
    type: "article",
  },
};

const shippingMethods = [
  { icon: Plane, method: "Air Freight", speed: "3–7 days", cost: "$200–$800", bestFor: "Rush orders, trade show deadlines", notes: "Door-to-door via DHL, FedEx, or UPS" },
  { icon: Ship, method: "Ocean Freight", speed: "2–4 weeks", cost: "$50–$200", bestFor: "Budget-conscious, no deadline pressure", notes: "Port-to-port, add $50–$150 for last-mile" },
  { icon: Truck, method: "Domestic (US)", speed: "2–5 days", cost: "$50–$300", bestFor: "US-based suppliers", notes: "Ground via FedEx Freight or LTL carrier" },
];

const packaging = [
  { item: "Inflatable Unit", desc: "Folded and sealed in protective plastic" },
  { item: "Blower Motor", desc: "Separate box, includes correct voltage for your region (110V/220V)" },
  { item: "Storage Bag", desc: "Heavy-duty carry bag with handles — included free" },
  { item: "Ground Stakes & Ropes", desc: "4–12 stakes (depending on size) plus tie-down ropes" },
  { item: "Repair Kit", desc: "Patches, glue, and spare fabric swatch — included free" },
  { item: "Setup Instructions", desc: "Printed guide + QR code linking to video tutorial" },
];

const customsInfo = [
  { country: "United States", duty: "0–6% (HS code 9505.90)", time: "1–3 days", notes: "Most inflatables enter duty-free under decorations" },
  { country: "European Union", duty: "4–7% (HS code 9505.90)", time: "2–5 days", notes: "VAT (19–25%) applies on declared value" },
  { country: "United Kingdom", duty: "4–7%", time: "2–4 days", notes: "Post-Brexit, requires EORI number" },
  { country: "Canada", duty: "0–7%", time: "1–3 days", notes: "GST (5%) + provincial tax applies" },
  { country: "Australia", duty: "0–5%", time: "3–7 days", notes: "GST (10%) applies" },
];

const faqItems = [
  {
    question: "How is my inflatable packaged for shipping?",
    answer:
      "Each inflatable is fully deflated, loosely folded (never creased sharply), wrapped in protective plastic, and placed in a heavy-duty storage bag with handles. The blower motor ships in a separate box. All accessories (stakes, ropes, repair kit, instructions) are included. Total shipping weight for a 15 ft inflatable is typically 35–60 lbs (16–27 kg).",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Air freight from China to the US takes 3–7 days door-to-door. Ocean freight takes 2–4 weeks plus 1–3 days for last-mile delivery. For domestic US orders, ground shipping takes 2–5 business days. We provide tracking numbers for all shipments via DHL, FedEx, or UPS.",
  },
  {
    question: "Can you ship directly to a convention center or event venue?",
    answer:
      "Yes, we can ship to convention centers, stadiums, and event venues. For trade shows, use the event's official freight contractor for advance warehouse delivery (recommended). Provide us with the shipping labels or freight forwarder details, and we'll coordinate. Always add 5–7 extra days for venue handling.",
  },
  {
    question: "What are import duties and customs fees?",
    answer:
      "Customs duties vary by country. US: typically 0–6% (many inflatables enter duty-free as 'decorations' under HS 9505.90). EU: 4–7% plus VAT. Canada: 0–7% plus GST. We provide commercial invoices, packing lists, and certificates of origin. Your freight forwarder or DHL/FedEx handles customs clearance automatically for most shipments.",
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

export default function ShippingPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.qddjtx.com" },
      { "@type": "ListItem", position: 2, name: "Shipping", item: "https://www.qddjtx.com/shipping" },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="min-h-screen bg-white">
        <section className="bg-navy-900 px-4 py-16 text-white">
          <div className="container mx-auto max-w-4xl">
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-red-400">Logistics Guide</p>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Shipping & Logistics Guide</h1>
            <p className="text-lg text-gray-300">
              Everything you need to know about getting your custom inflatable from our factory to your event — air freight, ocean freight, customs, packaging, and tracking.
            </p>
          </div>
        </section>

        {/* Quick Answer */}
        <section className="py-12">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="rounded-xl border-l-4 border-navy-600 bg-navy-50 p-6">
              <h2 className="mb-3 text-xl font-bold text-navy-900">Quick Answer</h2>
              <p className="text-base leading-relaxed text-navy-900">
                <strong>Air freight to the US: 3–7 days, $200–$800.</strong> Ocean freight: 2–4 weeks, $50–$200. Every order includes storage bag, blower, stakes, ropes, and repair kit — no hidden costs. We ship to any address worldwide, including convention centers and event venues.
              </p>
            </div>
          </div>
        </section>

        {/* Shipping Methods */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto max-w-7xl px-4">
            <h2 className="mb-8 text-2xl font-bold tracking-tight text-navy-900">Shipping Methods Compared</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {shippingMethods.map((m, idx) => (
                <div key={idx} className="rounded-xl border border-gray-200 bg-white p-6">
                  <m.icon className="mb-4 h-10 w-10 text-red-500" />
                  <h3 className="mb-3 text-lg font-bold text-navy-900">{m.method}</h3>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between"><dt className="text-gray-500">Speed:</dt><dd className="font-semibold text-navy-900">{m.speed}</dd></div>
                    <div className="flex justify-between"><dt className="text-gray-500">Cost:</dt><dd className="font-semibold text-green-700">{m.cost}</dd></div>
                  </dl>
                  <p className="mt-3 text-sm text-gray-600">{m.bestFor}</p>
                  <p className="mt-1 text-xs text-gray-500">{m.notes}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-12">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-navy-900">What&apos;s in the Package?</h2>
            <p className="mb-8 text-sm text-gray-500">Every shipment includes these items at no extra cost</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {packaging.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-4">
                  <Package className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                  <div>
                    <p className="text-sm font-semibold text-navy-900">{item.item}</p>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Customs */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto max-w-7xl px-4">
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-navy-900">Customs & Import Duties by Country</h2>
            <p className="mb-8 text-sm text-gray-500">Estimated duties and clearance times for major markets</p>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-6 py-4 text-sm font-bold text-navy-900">Country</th>
                    <th className="px-6 py-4 text-sm font-bold text-navy-900">Duty Rate</th>
                    <th className="px-6 py-4 text-sm font-bold text-navy-900">Clearance Time</th>
                    <th className="px-6 py-4 text-sm font-bold text-navy-900">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {customsInfo.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="px-6 py-4 text-sm font-semibold text-navy-900">{row.country}</td>
                      <td className="px-6 py-4 text-sm text-green-700">{row.duty}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.time}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-navy-900">Ready to Order?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">Get a quote with shipping estimate included.</p>
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
