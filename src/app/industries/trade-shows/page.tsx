import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Trade Show Inflatable Planning Ideas | InflatableModel",
  description:
    "Plan custom inflatable product replicas, arches, mascots, and event structures for exhibitions. Confirm show rules, documentation, installation, and delivery per project.",
  alternates: { canonical: "https://qddjtx.com/industries/trade-shows" },
  openGraph: {
    title: "Trade Show Inflatable Planning Ideas | InflatableModel",
    description: "Neutral planning guidance for custom trade-show inflatable displays.",
    url: "https://qddjtx.com/industries/trade-shows",
    type: "article",
  },
};

const ideas = [
  ["Product replica", "An enlarged product or packaging form for a booth or approved display area."],
  ["Arch or tunnel", "An entrance or route marker designed around the available span and clear height."],
  ["Mascot or character", "A stationary or wearable visual concept based on authorized artwork."],
  ["Inflatable tent or structure", "A temporary branded space planned around access, power, and venue rules."],
];

const checklist = [
  "Obtain the exhibitor manual and written venue rules.",
  "Measure booth footprint, clear height, access doors, and nearby obstructions.",
  "Confirm required fire, electrical, insurance, and engineering documents.",
  "Confirm power, rigging restrictions, anchoring, supervision, and operating hours.",
  "Include production and freight contingency in the project schedule.",
  "Approve artwork, dimensions, accessories, packed size, and delivery scope in writing.",
];

const faqItems = [
  {
    question: "Are inflatables permitted at a particular trade show?",
    answer:
      "Permission and requirements depend on the show organizer and venue. Review the current exhibitor manual and obtain written approval before committing to a configuration.",
  },
  {
    question: "Which documents may be requested?",
    answer:
      "A venue may request product dimensions, material information, electrical information, fire-related documentation, anchoring or rigging details, insurance, and setup instructions. Confirm availability for the exact quoted unit.",
  },
  {
    question: "Can the order ship directly to the venue?",
    answer:
      "Delivery may require an official freight contractor, advance warehouse, labels, customs paperwork, appointment scheduling, and drayage. Final arrangements and costs must be confirmed with the show contractor and quotation.",
  },
];

export default function TradeShowsPage() {
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
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Trade Show Inflatables</h1>
            <p className="mt-4 max-w-3xl text-lg text-gray-300">
              Plan around actual booth and venue requirements without unsupported visitor, recall, cost-per-impression, or event-history claims.
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
              These formats are planning references, not evidence that a product has appeared at a named event. Venue approval,
              documentation, installation, freight, and operating requirements must be confirmed for each project.
            </div>
          </div>
        </section>
        <section className="bg-gray-50 py-14">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="text-2xl font-bold text-navy-900">Pre-Show Checklist</h2>
            <ul className="mt-6 space-y-3">
              {checklist.map((item) => (
                <li key={item} className="rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-700">{item}</li>
              ))}
            </ul>
            <h2 className="mt-12 text-2xl font-bold text-navy-900">Planning Questions</h2>
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
