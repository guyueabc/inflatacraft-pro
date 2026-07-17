import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Food & Beverage Inflatable Product Ideas | InflatableModel",
  description:
    "Explore custom inflatable product-replica ideas for food and beverage displays. Final dimensions, materials, pricing, documentation, and lead time are confirmed per quotation.",
  alternates: { canonical: "https://qddjtx.com/industries/food-beverage" },
  openGraph: {
    title: "Food & Beverage Inflatable Product Ideas | InflatableModel",
    description: "Planning ideas for custom food and beverage inflatable replicas.",
    url: "https://qddjtx.com/industries/food-beverage",
    type: "article",
  },
};

const ideas = [
  ["Beverage can or bottle", "Event display, retail promotion, or photo area"],
  ["Snack or food package", "Product-launch visual or temporary branded display"],
  ["Cup, carton, or container", "Indoor or outdoor promotional reference"],
  ["Food-shaped character", "Mascot-style display based on approved artwork"],
];

const faqItems = [
  {
    question: "Can the design follow our product packaging?",
    answer:
      "Reference photos and authorized artwork can be reviewed for a custom proposal. Final shape, print placement, colors, dimensions, and construction details are confirmed in the approved specification.",
  },
  {
    question: "How should we choose the size?",
    answer:
      "Measure the available footprint, clear height, access route, viewing distance, and nearby obstructions. The quoted size should be reviewed against the actual venue before approval.",
  },
  {
    question: "Can a product replica be used outdoors?",
    answer:
      "Outdoor suitability depends on the approved design, material, anchoring, blower, site, weather, and operating limits. Confirm the installation conditions and written instructions for the quoted unit.",
  },
];

export default function FoodBeveragePage() {
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
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Food & Beverage Inflatables</h1>
            <p className="mt-4 max-w-3xl text-lg text-gray-300">
              Explore possible product-replica formats without unsupported sales, traffic, or social-media performance claims.
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
              Images and formats are visual references only. No marketing outcome is guaranteed. Confirm artwork rights,
              configuration, accessories, documentation, production location, lead time, and delivery terms in writing.
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
