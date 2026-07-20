import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Wind } from "lucide-react";

export const metadata: Metadata = {
  title: "Inflatable Setup & Installation Guide | InflatableModel",
  description:
    "Complete setup guide for custom inflatables. Step-by-step instructions for product replicas, arches, tents, and mascots. Anchoring, blower setup, teardown, and safety tips.",
  alternates: { canonical: "https://qddjtx.com/setup-guide" },
  keywords: "inflatable setup, inflatable installation, how to set up inflatable, inflatable blower, inflatable anchoring, inflatable takedown",
  openGraph: {
    title: "Inflatable Setup & Installation Guide | InflatableModel",
    description: "Step-by-step guide to setting up your custom inflatable.",
    url: "https://qddjtx.com/setup-guide",
    type: "article",
  },
};

const setupSteps = [
  { step: 1, title: "Read the Product Instructions", desc: "Use the instructions supplied for the exact product. Confirm the components, installation plan, responsible person, venue rules, and acceptable conditions before setup." },
  { step: 2, title: "Inspect the Product & Site", desc: "Stop if the product, blower, cable, attachments, or packaging shows damage. Check the proposed area for overhead, surface, access, egress, electrical, and public-interaction hazards." },
  { step: 3, title: "Confirm Electrical Equipment", desc: "Match the blower, voltage, frequency, plug, protection, extension leads, and weather rating to the destination and site. Use a qualified person where required." },
  { step: 4, title: "Install the Specified Anchoring", desc: "Follow the product- and site-specific anchoring plan. The attachment type, location, capacity, quantity, and surface suitability must be confirmed for the installation." },
  { step: 5, title: "Inflate Under Control", desc: "Keep people clear while inflating, monitor the product and attachments, and stop if the shape, blower, seams, clearances, or site conditions are not as expected." },
  { step: 6, title: "Complete a Pre-Use Check", desc: "Before operation, verify the approved position, clearances, anchoring, electrical setup, access control, supervision, weather plan, and any venue or authority sign-off." },
];

const setupTimes = [
  { factor: "Product configuration", review: "Dimensions, mass, inflation system, number of components, and attachment layout" },
  { factor: "Site conditions", review: "Surface, access, clearance, egress, public separation, weather, and lighting" },
  { factor: "Installation resources", review: "Competent people, lifting or access equipment, ballast or anchors, and electrical supply" },
  { factor: "Approval requirements", review: "Venue method statement, responsible-person check, authority review, and documented handover" },
];

const safetyRules = [
  { rule: "Weather & Wind", detail: "Use only within the written limit for the exact product and installation. Monitor conditions and follow a documented shutdown plan; do not substitute a generic website number." },
  { rule: "Clearance & Egress", detail: "Have the venue confirm clearance from ceilings, services, sprinklers, power lines, exits, roads, and neighboring activities." },
  { rule: "Power Supply", detail: "Use the supplied or specified equipment and have voltage, current, plug, protection, extension leads, and weather exposure confirmed for the site." },
  { rule: "Supervision", detail: "Assign competent supervision and control public access according to the product, activity, venue, and applicable requirements." },
  { rule: "Site Changes", detail: "Stop operation when weather, surface, anchoring, electrical supply, public behavior, or other site conditions move outside the approved plan." },
  { rule: "Damage & Maintenance", detail: "Do not operate damaged equipment. Isolate it and obtain the appropriate inspection or repair before reuse." },
];

const teardownSteps = [
  "Close the area to users and follow the product-specific shutdown instructions.",
  "Isolate electrical equipment before disconnecting it, using a qualified person where required.",
  "Release air and attachments in the documented sequence while keeping people clear of moving fabric and hardware.",
  "Inspect and record damage, contamination, wetness, missing parts, or maintenance needs before packing.",
  "Clean, dry, fold, pack, and store the product according to its material and supplied instructions.",
  "Keep the blower, attachments, records, and other identified components with the correct product.",
];

const faqItems = [
  {
    question: "How long does it take to set up a custom inflatable?",
    answer:
      "There is no universal setup time or crew size. It depends on the exact configuration, site, access, anchoring, electrical supply, weather, competence, equipment, and approval process. Use the product-specific instructions and installation plan.",
  },
  {
    question: "What power do I need for the blower?",
    answer:
      "Use the blower and electrical specification supplied for the exact product. Confirm destination voltage and frequency, plug, current, protection, extension leads, generator compatibility, and weather exposure with the venue or a qualified person before operation.",
  },
  {
    question: "How do I anchor my inflatable outdoors?",
    answer:
      "Use a product- and site-specific anchoring plan. Confirm the supplied attachment points, loads, anchor or ballast type, capacity, quantity, surface, underground services, wind limit, inspection, and shutdown procedure. Generic ballast or stake values are not suitable for every installation.",
  },
  {
    question: "How do I take down and store my inflatable?",
    answer:
      "Follow the instructions for the exact product. Close the area, isolate power, release air and attachments in the documented sequence, inspect for damage or moisture, and clean, dry, pack, and store the material as specified. No generic lifespan is promised.",
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

export default function SetupGuidePage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://qddjtx.com" },
      { "@type": "ListItem", position: 2, name: "Setup Guide", item: "https://qddjtx.com/setup-guide" },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} />
      <div className="min-h-screen bg-white">
        <section className="bg-navy-900 px-4 py-16 text-white">
          <div className="container mx-auto max-w-4xl">
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-red-400">Setup Guide</p>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Inflatable Setup & Installation</h1>
            <p className="text-lg text-gray-300">
              A planning checklist for product-specific setup, anchoring, operation,
              teardown, and site approval—not a substitute for supplied instructions.
            </p>
          </div>
        </section>

        {/* Setup Steps */}
        <section className="py-12">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="mb-8 text-2xl font-bold tracking-tight text-navy-900">Setup in 6 Simple Steps</h2>
            <div className="space-y-4">
              {setupSteps.map((s, idx) => (
                <div key={idx} className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-navy-900 text-sm font-bold text-white">{s.step}</div>
                  <div className="flex-1">
                    <div>
                      <h3 className="text-lg font-bold text-navy-900">{s.title}</h3>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Setup Time Reference */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="mb-8 text-2xl font-bold tracking-tight text-navy-900">Factors That Determine Setup Resources</h2>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-6 py-4 text-sm font-bold text-navy-900">Factor</th>
                    <th className="px-6 py-4 text-sm font-bold text-navy-900">What to Confirm</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {setupTimes.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="px-6 py-4 text-sm font-semibold text-navy-900">{row.factor}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.review}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Safety */}
        <section className="py-12">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="mb-8 text-2xl font-bold tracking-tight text-navy-900">Safety Rules</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {safetyRules.map((s, idx) => (
                <div key={idx} className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-4">
                  <Wind className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                  <div>
                    <p className="text-sm font-semibold text-navy-900">{s.rule}</p>
                    <p className="text-sm text-gray-600">{s.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Teardown */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="mb-8 text-2xl font-bold tracking-tight text-navy-900">Teardown & Storage</h2>
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <ol className="space-y-3">
                {teardownSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                    <span className="text-sm text-gray-700">{step}</span>
                  </li>
                ))}
              </ol>
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
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-navy-900">Need Help with Setup?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">Request the instructions and installation information available for the exact product before approving an order.</p>
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
