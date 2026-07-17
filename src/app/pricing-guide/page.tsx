import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Custom Inflatable Quote & Cost Planning Guide | InflatableModel",
  description:
    "Understand which project variables affect a custom inflatable quotation. No generic website price or marketing return is guaranteed.",
  alternates: { canonical: "https://qddjtx.com/pricing-guide" },
  openGraph: {
    title: "Custom Inflatable Quote & Cost Planning Guide | InflatableModel",
    description: "Project-specific quotation factors for custom inflatable requirements.",
    url: "https://qddjtx.com/pricing-guide",
    type: "article",
  },
};

const factors = [
  ["Dimensions and shape", "Overall size, geometry, internal structure, openings, and required clearances affect the scope."],
  ["Material and construction", "The approved material, seam method, reinforcement, and intended operating environment affect the quotation."],
  ["Artwork and printing", "Artwork preparation, color requirements, print coverage, and approval workflow affect the design scope."],
  ["Accessories and electrical equipment", "Blowers, inflators, lighting, anchoring, cases, repair items, and plug requirements must be specified."],
  ["Quantity and revisions", "Quantity, prototypes if any, revision scope, and approval cycles can affect price and timing."],
  ["Testing and documentation", "Only product-specific reports or certificates stated in the quotation should be treated as included."],
  ["Production and inspection", "Production location, inspection scope, approval status, and current availability affect the schedule."],
  ["Freight and delivery", "Packed size, destination, customs responsibilities, delivery terms, and event access affect the landed cost."],
];

const quoteChecklist = [
  "Product type and intended use",
  "Approximate dimensions and available installation area",
  "Quantity, destination, and required date",
  "Authorized artwork and reference images",
  "Indoor or outdoor conditions and audience interaction",
  "Venue, electrical, anchoring, documentation, and insurance requirements",
  "Requested accessories, packaging, and delivery scope",
];

const faqItems = [
  {
    question: "Can a final price be calculated from size alone?",
    answer:
      "No. Shape, material, printing, construction, accessories, documentation, quantity, production, freight, and commercial terms can materially change the quotation.",
  },
  {
    question: "Are the website images priced configurations?",
    answer:
      "No. Images are visual references and do not establish an exact specification, included scope, inventory item, price, certification, or delivery commitment.",
  },
  {
    question: "Does a custom inflatable guarantee sales, traffic, impressions, or ROI?",
    answer:
      "No. Marketing outcomes depend on the campaign, product, venue, audience, placement, creative execution, and measurement method. No outcome is guaranteed.",
  },
  {
    question: "How long is a quotation valid?",
    answer:
      "The applicable validity period, currency, taxes, duties, payment terms, and delivery terms must be stated on the issued quotation.",
  },
];

export default function PricingGuidePage() {
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
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-red-400">Quote Planning Guide</p>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Custom Inflatable Cost Factors</h1>
            <p className="mt-4 max-w-3xl text-lg text-gray-300">
              Use the checklist below to request a project-specific quotation. Generic price bands and ROI claims are intentionally not presented as verified facts.
            </p>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto max-w-5xl px-4">
            <h2 className="text-2xl font-bold text-navy-900">What affects the quotation?</h2>
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              {factors.map(([title, description]) => (
                <article key={title} className="rounded-xl border border-gray-200 p-6">
                  <h3 className="font-bold text-navy-900">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-700">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-14">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="text-2xl font-bold text-navy-900">Information to include</h2>
            <ul className="mt-6 space-y-3">
              {quoteChecklist.map((item) => (
                <li key={item} className="flex gap-3 rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-700"><CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="text-2xl font-bold text-navy-900">Pricing Questions</h2>
            <div className="mt-6 space-y-4">
              {faqItems.map((faq) => (
                <article key={faq.question} className="rounded-xl border border-gray-200 p-5"><h3 className="font-semibold text-navy-900">{faq.question}</h3><p className="mt-2 text-sm leading-relaxed text-gray-700">{faq.answer}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-navy-900 px-4 py-14 text-center text-white">
          <Link href="/get-quote" className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-8 py-4 font-semibold hover:bg-red-500">Request a Project-Specific Quote <ArrowRight className="h-5 w-5" /></Link>
        </section>
      </main>
    </>
  );
}
