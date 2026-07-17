import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Retail Inflatable Display Ideas | InflatableModel",
  description:
    "Explore custom inflatable display ideas for retail entrances, temporary promotions, product launches, and photo areas without guaranteed traffic or sales claims.",
  alternates: { canonical: "https://qddjtx.com/industries/retail" },
  openGraph: {
    title: "Retail Inflatable Display Ideas | InflatableModel",
    description: "Neutral planning ideas for custom retail inflatable displays.",
    url: "https://qddjtx.com/industries/retail",
    type: "article",
  },
};

const ideas = [
  ["Entrance marker", "An arch or product-shaped display near an approved entrance location."],
  ["Product-launch reference", "An enlarged representation of packaging or a product silhouette."],
  ["Seasonal display", "A temporary themed character, object, or branded structure."],
  ["Photo-area concept", "A visual centerpiece designed around the available footprint and audience flow."],
];

const faqItems = [
  {
    question: "What should be confirmed with the venue?",
    answer:
      "Confirm permitted dimensions, location, access, anchoring, power, fire-safety documentation, insurance requirements, installation hours, and any local approval process directly with the venue.",
  },
  {
    question: "Which format is suitable for a retail entrance?",
    answer:
      "The choice depends on clear height, footprint, viewing direction, pedestrian flow, outdoor exposure, and whether the structure must remain clear of doors and emergency routes.",
  },
  {
    question: "How long can the display remain installed?",
    answer:
      "Permitted operating duration depends on the specific product, blower, site, supervision, weather, venue rules, and written operating instructions supplied for the approved configuration.",
  },
];

export default function RetailPage() {
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
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Retail Inflatables</h1>
            <p className="mt-4 max-w-3xl text-lg text-gray-300">
              Explore possible display formats without unsupported foot-traffic, sales-lift, recall, or ROI claims.
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
              These are illustrative applications, not verified customer cases or guaranteed outcomes. Final configuration,
              documentation, operating limits, production, and delivery details must be confirmed for each order.
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
