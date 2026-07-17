import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Custom Inflatable Supplier Evaluation Guide | InflatableModel",
  description:
    "A neutral checklist for reviewing custom inflatable suppliers, quotations, specifications, documentation, inspections, and delivery terms.",
  alternates: { canonical: "https://qddjtx.com/buying-guide" },
  openGraph: {
    title: "Custom Inflatable Supplier Evaluation Guide | InflatableModel",
    description: "Questions to ask before approving a custom inflatable order.",
    url: "https://qddjtx.com/buying-guide",
    type: "article",
  },
};

const checklist = [
  ["Legal identity", "Confirm the contracting entity, payment beneficiary, invoice details, and customer-service channel."],
  ["Written specification", "Require dimensions, material, construction, printing, accessories, electrical equipment, anchoring, packaging, and intended use."],
  ["Artwork rights", "Confirm that submitted logos, characters, packaging, and other intellectual property are authorized for use."],
  ["Visual approval", "Confirm which drawings or renderings are included, the revision scope, and which document controls production."],
  ["Evidence and documents", "Identify which reports, certificates, labels, or declarations are required for the exact product, venue, and destination."],
  ["Inspection", "Agree on inspection timing, acceptance criteria, photos or video, defect handling, and whether an independent inspection is needed."],
  ["Commercial terms", "Confirm price, currency, taxes, duties, payment milestones, cancellation, warranty if any, and dispute terms."],
  ["Production and delivery", "Confirm production location, schedule estimate, packed size, freight method, customs responsibilities, delivery terms, and contingency."],
];

const warningSigns = [
  "Claims of universal certification without a product-specific report",
  "Guaranteed sales, traffic, impressions, ROI, lifespan, or weather performance without evidence and conditions",
  "A generic photo presented as proof of an exact supplied product",
  "Unclear contracting entity, production location, payment beneficiary, or delivery terms",
  "Pressure to pay before the written specification and scope are complete",
  "Warranty or replacement promises that are absent from the order documents",
];

const faqItems = [
  {
    question: "Is one supplier type always better than another?",
    answer:
      "No. Evaluate the actual contracting entity, production arrangement, documented specification, evidence, price, communication, inspection, and delivery terms rather than relying on a generic country or supplier label.",
  },
  {
    question: "How should certification claims be checked?",
    answer:
      "First ask the venue or authority what requirement applies. Then verify that the report or certificate matches the exact material, product, model, manufacturer, date, market, and intended use.",
  },
  {
    question: "What should be approved before production?",
    answer:
      "Approve the controlling artwork, dimensions, construction, material, colors, print placement, accessories, electrical setup, anchoring, documentation, inspection scope, packaging, and commercial terms in writing.",
  },
];

export default function BuyingGuidePage() {
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
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-red-400">Buyer Checklist</p>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Evaluate the Actual Offer</h1>
            <p className="mt-4 max-w-3xl text-lg text-gray-300">
              Compare suppliers using evidence and written project terms—not unverified price, lead-time, quality, factory, certification, or customer claims.
            </p>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto max-w-5xl px-4">
            <div className="grid gap-5 sm:grid-cols-2">
              {checklist.map(([title, description]) => (
                <article key={title} className="rounded-xl border border-gray-200 p-6"><h2 className="font-bold text-navy-900">{title}</h2><p className="mt-2 text-sm leading-relaxed text-gray-700">{description}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-14">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="text-2xl font-bold text-navy-900">Warning signs</h2>
            <ul className="mt-6 space-y-3">
              {warningSigns.map((item) => <li key={item} className="flex gap-3 rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-700"><CheckCircle2 className="h-5 w-5 shrink-0 text-red-600" />{item}</li>)}
            </ul>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="text-2xl font-bold text-navy-900">Buyer Questions</h2>
            <div className="mt-6 space-y-4">
              {faqItems.map((faq) => <article key={faq.question} className="rounded-xl border border-gray-200 p-5"><h3 className="font-semibold text-navy-900">{faq.question}</h3><p className="mt-2 text-sm leading-relaxed text-gray-700">{faq.answer}</p></article>)}
            </div>
          </div>
        </section>

        <section className="bg-navy-900 px-4 py-14 text-center text-white">
          <Link href="/get-quote" className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-8 py-4 font-semibold hover:bg-red-500">Request a Written Proposal <ArrowRight className="h-5 w-5" /></Link>
        </section>
      </main>
    </>
  );
}
