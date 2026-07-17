import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Sports Event Inflatable Ideas | InflatableModel",
  description:
    "Explore possible custom inflatable formats for sports entrances, race routes, fan zones, and temporary event displays. Confirm venue and product requirements per project.",
  alternates: { canonical: "https://qddjtx.com/industries/sports" },
  openGraph: {
    title: "Sports Event Inflatable Ideas | InflatableModel",
    description: "Neutral planning ideas for custom sports-event inflatables.",
    url: "https://qddjtx.com/industries/sports",
    type: "article",
  },
};

const ideas = [
  ["Run-through tunnel", "A custom entrance shape for a team or event, subject to site and operating review."],
  ["Start or finish arch", "A route marker with customizable artwork and an approved clear span."],
  ["Mascot display", "A character-shaped visual reference based on authorized team or event artwork."],
  ["Fan-zone structure", "A branded arch, tent, or temporary display planned around audience flow."],
];

const faqItems = [
  {
    question: "Which safety documents are required?",
    answer:
      "Requirements vary by product, venue, jurisdiction, and intended use. Ask the venue or authority which reports, certificates, insurance, labels, and operating instructions apply before ordering.",
  },
  {
    question: "Can a sports inflatable be used outdoors?",
    answer:
      "Outdoor suitability depends on the approved design, material, anchoring system, ground conditions, weather, supervision, and written operating limits for the specific unit.",
  },
  {
    question: "How should setup time be planned?",
    answer:
      "Setup requirements vary by configuration, access, crew, power, and anchoring. Confirm the installation sequence and estimated setup needs in the project documents rather than relying on a generic website figure.",
  },
];

export default function SportsPage() {
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
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-red-400">Industry Planning Guide</p>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Sports Event Inflatables</h1>
            <p className="mt-4 max-w-3xl text-lg text-gray-300">
              Explore possible formats without unsupported stadium-count, impression, engagement, certification, or ROI claims.
            </p>
          </div>
        </section>
        <section className="py-14">
          <div className="container mx-auto max-w-5xl px-4">
            <div className="grid gap-5 sm:grid-cols-2">
              {ideas.map(([title, description]) => (
                <article key={title} className="rounded-xl border border-gray-200 p-6">
                  <h2 className="text-lg font-bold text-navy-900">{title}</h2>
                  <p className="mt-2 text-sm text-gray-600">{description}</p>
                </article>
              ))}
            </div>
            <div className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
              Product examples do not imply venue approval or certification. Confirm the exact material, electrical equipment,
              reports, anchoring, operating limits, and instructions for the quoted configuration.
            </div>
          </div>
        </section>
        <section className="bg-gray-50 py-14">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="text-2xl font-bold text-navy-900">Planning Questions</h2>
            <div className="mt-6 space-y-4">
              {faqItems.map((faq) => (
                <article key={faq.question} className="rounded-xl border border-gray-200 bg-white p-5">
                  <h3 className="font-semibold text-navy-900">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-700">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="py-14 text-center">
          <Link href="/get-quote" className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-8 py-4 font-semibold text-white hover:bg-red-500">
            Request a Project Review <ArrowRight className="h-5 w-5" />
          </Link>
        </section>
      </main>
    </>
  );
}
