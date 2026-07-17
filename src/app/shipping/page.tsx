import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Custom Inflatable Shipping Planning Guide | InflatableModel",
  description:
    "A neutral checklist for packaging, freight, customs, venue delivery, insurance, inspection, and written delivery terms for custom inflatable orders.",
  alternates: { canonical: "https://qddjtx.com/shipping" },
  openGraph: {
    title: "Custom Inflatable Shipping Planning Guide | InflatableModel",
    description: "Plan packaging, freight, customs, and destination access for a custom inflatable order.",
    url: "https://qddjtx.com/shipping",
    type: "article",
  },
};

const planningItems = [
  ["Packed dimensions and weight", "Request the estimated number of packages, dimensions, gross weight, and handling needs for the approved order."],
  ["Included items", "Confirm the exact unit, blower or inflator, anchoring, storage case, repair items, instructions, and any spare components in writing."],
  ["Freight method", "Compare courier, air, ocean, road, advance warehouse, and venue freight options based on destination and deadline."],
  ["Delivery terms", "Confirm the named destination, Incoterm or equivalent risk allocation, freight payer, insurance, and delivery responsibility."],
  ["Customs", "Confirm tariff classification, declared value, importer of record, broker, duties, taxes, licenses, and required documents with qualified parties."],
  ["Venue access", "Check receiving hours, appointment rules, labels, material-handling contractor, dock limits, storage fees, drayage, and return freight."],
  ["Schedule contingency", "Allow time for production approval, inspection, packing, handoff, transit, customs, venue handling, and unexpected delay."],
  ["Condition on arrival", "Agree on packaging evidence, delivery inspection, damage reporting, carrier claim steps, and remedy under the written terms."],
];

const faqItems = [
  {
    question: "How much will shipping cost?",
    answer:
      "Cost depends on packed dimensions and weight, origin, destination, service level, fuel and carrier charges, customs, duties, taxes, access, and delivery terms. Use a current project-specific freight quotation.",
  },
  {
    question: "How long will delivery take?",
    answer:
      "Transit estimates vary by origin, destination, mode, carrier, customs, weather, congestion, and venue handling. The written quotation should distinguish production time from freight time and include contingency.",
  },
  {
    question: "Can delivery be made to an event venue?",
    answer:
      "Possibly, but the organizer or venue may require an official contractor, advance warehouse, labels, appointments, drayage, and special insurance. Confirm those requirements before booking freight.",
  },
  {
    question: "Are all accessories automatically included?",
    answer:
      "No universal package contents should be assumed. Only the items listed in the approved quotation, packing list, and order documents are included.",
  },
];

export default function ShippingPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} />
      <main className="min-h-screen bg-white">
        <section className="bg-navy-900 px-4 py-16 text-white">
          <div className="container mx-auto max-w-4xl">
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-red-400">Logistics Planning Guide</p>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Plan Shipping in Writing</h1>
            <p className="mt-4 max-w-3xl text-lg text-gray-300">
              Freight cost, transit time, package contents, insurance, customs, and venue delivery vary by order and are not guaranteed by a generic website estimate.
            </p>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto max-w-5xl px-4">
            <div className="grid gap-5 sm:grid-cols-2">
              {planningItems.map(([title, description]) => (
                <article key={title} className="rounded-xl border border-gray-200 p-6"><h2 className="font-bold text-navy-900">{title}</h2><p className="mt-2 text-sm leading-relaxed text-gray-700">{description}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-14">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="text-2xl font-bold text-navy-900">Before dispatch</h2>
            <ul className="mt-6 space-y-3">
              {["Approve the final packing list and shipping marks.", "Verify receiver details, destination access, and contact availability.", "Confirm insurance scope and the evidence needed for a carrier claim.", "Retain inspection, packing, handoff, tracking, and delivery records."].map((item) => <li key={item} className="flex gap-3 rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-700"><CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />{item}</li>)}
            </ul>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="text-2xl font-bold text-navy-900">Shipping Questions</h2>
            <div className="mt-6 space-y-4">{faqItems.map((faq) => <article key={faq.question} className="rounded-xl border border-gray-200 p-5"><h3 className="font-semibold text-navy-900">{faq.question}</h3><p className="mt-2 text-sm leading-relaxed text-gray-700">{faq.answer}</p></article>)}</div>
          </div>
        </section>

        <section className="bg-navy-900 px-4 py-14 text-center text-white">
          <Link href="/get-quote" className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-8 py-4 font-semibold hover:bg-red-500">Request Project-Specific Delivery Terms <ArrowRight className="h-5 w-5" /></Link>
        </section>
      </main>
    </>
  );
}
