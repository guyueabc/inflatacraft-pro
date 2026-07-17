import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Custom Inflatable Application Ideas | InflatableModel",
  description:
    "Explore neutral application ideas for custom inflatable product replicas, arches, mascots, tents, and event displays. Examples are illustrative and do not represent verified customer results.",
  alternates: { canonical: "https://qddjtx.com/case-studies" },
  openGraph: {
    title: "Custom Inflatable Application Ideas | InflatableModel",
    description: "Illustrative custom inflatable application ideas without customer or performance claims.",
    url: "https://qddjtx.com/case-studies",
    type: "website",
  },
};

const applications = [
  {
    title: "Product Replica Display",
    description:
      "An oversized three-dimensional representation of product packaging for an event, retail display, or photo area.",
    considerations: "Confirm available space, artwork, viewing direction, power access, and installation conditions.",
  },
  {
    title: "Entrance Arch or Tunnel",
    description:
      "A customizable entrance structure for a race, fan zone, exhibition, or temporary event route.",
    considerations: "Confirm span, clear height, ground surface, anchoring options, and venue approval requirements.",
  },
  {
    title: "Mascot or Character Display",
    description:
      "A stationary or wearable character concept based on approved artwork and intended audience interaction.",
    considerations: "Confirm proportions, operator needs, visibility, access points, and the approved specification.",
  },
  {
    title: "Inflatable Event Tent",
    description:
      "A branded temporary space that may be configured for product information, sampling, or event shelter.",
    considerations: "Confirm footprint, weather exposure, installation surface, accessories, and local venue rules.",
  },
];

export default function ApplicationIdeasPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://qddjtx.com" },
      { "@type": "ListItem", position: 2, name: "Application Ideas", item: "https://qddjtx.com/case-studies" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }}
      />
      <main className="min-h-screen bg-white">
        <section className="bg-navy-900 px-4 py-16 text-white">
          <div className="container mx-auto max-w-4xl">
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-red-400">Planning Reference</p>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Custom Inflatable Application Ideas</h1>
            <p className="max-w-3xl text-lg text-gray-300">
              These are illustrative product applications, not verified customer case studies, endorsements, or guaranteed marketing results.
            </p>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto max-w-5xl px-4">
            <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-900">
              Images and concepts on this website are visual references. Final size, construction, accessories, documentation,
              delivery terms, and installation requirements must be confirmed in the written quotation and approved specification.
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {applications.map((item) => (
                <article key={item.title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-navy-900">{item.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.description}</p>
                  <h3 className="mt-5 text-sm font-semibold text-navy-900">Confirm before ordering</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">{item.considerations}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-gray-200 bg-gray-50 py-14">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-3xl font-bold text-navy-900">Discuss Your Requirements</h2>
            <p className="mx-auto mt-3 max-w-2xl text-gray-600">
              Share the intended use, venue, approximate size, artwork, destination, and deadline for a project-specific review.
            </p>
            <Link
              href="/get-quote"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-red-600 px-8 py-4 font-semibold text-white transition-colors hover:bg-red-500"
            >
              Request a Quote <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
