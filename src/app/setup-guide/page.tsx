import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, Wind, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Inflatable Setup & Installation Guide | InflatableModel",
  description:
    "Complete setup guide for custom inflatables. Step-by-step instructions for product replicas, arches, tents, and mascots. Anchoring, blower setup, teardown, and safety tips.",
  alternates: { canonical: "https://www.qddjtx.com/setup-guide" },
  keywords: "inflatable setup, inflatable installation, how to set up inflatable, inflatable blower, inflatable anchoring, inflatable takedown",
  openGraph: {
    title: "Inflatable Setup & Installation Guide | InflatableModel",
    description: "Step-by-step guide to setting up your custom inflatable.",
    url: "https://www.qddjtx.com/setup-guide",
    type: "article",
  },
};

const setupSteps = [
  { step: 1, title: "Unpack & Inspect", time: "2 min", desc: "Remove inflatable from storage bag. Inspect for any shipping damage. Unfold on a clean, flat surface." },
  { step: 2, title: "Choose Location", time: "5 min", desc: "Select a flat, debris-free area. Check for overhead obstacles (power lines, tree branches, ceiling height). Allow 3 ft clearance on all sides." },
  { step: 3, title: "Connect Blower", time: "2 min", desc: "Attach the blower tube to the inflation port on the inflatable. Secure with the included strap or zipper. Ensure the deflation zipper is fully closed." },
  { step: 4, title: "Anchor Down", time: "5 min", desc: "Place ground stakes at each anchor point (D-rings). For indoor use, use sandbags (20–50 lbs each). For hard surfaces, use water ballast bags." },
  { step: 5, title: "Inflate", time: "3–10 min", desc: "Turn on the blower. The inflatable will take shape in 3–10 minutes depending on size. Do not stand inside during inflation." },
  { step: 6, title: "Final Adjustments", time: "3 min", desc: "Once fully inflated, adjust positioning. Tighten anchor ropes. Check that all D-rings are secured. Your inflatable is ready!" },
];

const setupTimes = [
  { size: "6–8 ft replica", people: "1 person", time: "10 min" },
  { size: "10–15 ft replica", people: "1–2 people", time: "15 min" },
  { size: "15–20 ft replica", people: "2 people", time: "20 min" },
  { size: "20–30 ft replica", people: "2–3 people", time: "30 min" },
  { size: "Arch (10–20 ft)", people: "2 people", time: "20 min" },
  { size: "Event tent (10×10)", people: "2 people", time: "30 min" },
  { size: "Mascot costume", people: "1 person", time: "5 min" },
];

const safetyRules = [
  { rule: "Wind Limit", detail: "Deflate if winds exceed 25 mph (40 km/h). Sustained 30+ mph can cause damage or injury." },
  { rule: "Indoor Clearance", detail: "Maintain minimum 2 ft clearance from ceiling, lights, and sprinklers." },
  { rule: "Power Supply", detail: "Use dedicated circuit. Do not share with other high-draw equipment. Standard 110V/15A or 220V/10A." },
  { rule: "Supervision", detail: "Never leave operating inflatable unattended in public areas. Assign a staff member to monitor." },
  { rule: "Weather", detail: "Deflate during rain storms, snow, or lightning. Water accumulation can damage seams and blower." },
  { rule: "Sharp Objects", detail: "Keep away from sharp edges, thorns, and hot surfaces. Inspect area before setup." },
];

const teardownSteps = [
  "Turn off and unplug the blower",
  "Open the deflation zipper fully",
  "Press out remaining air by walking on the inflatable from top to bottom",
  "Fold loosely — never crease sharply or use tight rolling",
  "Place in storage bag with blower, stakes, and ropes",
  "Store in cool, dry place away from direct sunlight",
];

const faqItems = [
  {
    question: "How long does it take to set up a custom inflatable?",
    answer:
      "Setup time depends on size. A 6–8 ft product replica: 10 minutes with 1 person. A 15–20 ft replica: 20 minutes with 2 people. An event tent: 30 minutes with 2 people. A mascot costume: 5 minutes. The blower does most of the work — most of the time is spent on positioning and anchoring.",
  },
  {
    question: "What power do I need for the blower?",
    answer:
      "Most inflatables use a 110V blower (US) or 220V (EU/international) drawing 6–8 amps. A standard 15 amp household circuit is sufficient for most units. For 20+ ft inflatables, you may need a 1.5 HP blower drawing 10–12 amps. Always use a dedicated circuit — do not share with other equipment. Generators rated 2000W+ work for outdoor events.",
  },
  {
    question: "How do I anchor my inflatable outdoors?",
    answer:
      "Each inflatable has 4–12 D-ring anchor points. For grass/soil: drive 12-inch metal ground stakes (included) at 45° angle. For concrete/asphalt: use 20–50 lb sandbags or water ballast bags on each D-ring. For extreme wind conditions, add 200 lb sandbags and ratchet straps. Always use all anchor points — do not skip any.",
  },
  {
    question: "How do I take down and store my inflatable?",
    answer:
      "Turn off blower, open deflation zipper, press out remaining air by walking from top to bottom. Fold loosely (do not crease sharply). Place in the included storage bag with blower, stakes, and ropes. Store in a cool, dry place away from direct sunlight. Proper storage extends lifespan to 5+ years.",
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
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.qddjtx.com" },
      { "@type": "ListItem", position: 2, name: "Setup Guide", item: "https://www.qddjtx.com/setup-guide" },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="min-h-screen bg-white">
        <section className="bg-navy-900 px-4 py-16 text-white">
          <div className="container mx-auto max-w-4xl">
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-red-400">Setup Guide</p>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Inflatable Setup & Installation</h1>
            <p className="text-lg text-gray-300">
              Step-by-step guide to setting up, anchoring, and taking down your custom inflatable. No tools required — setup takes 10–30 minutes.
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
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <h3 className="text-lg font-bold text-navy-900">{s.title}</h3>
                      <span className="flex items-center gap-1 text-xs text-gray-500"><Clock className="h-3 w-3" />{s.time}</span>
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
            <h2 className="mb-8 text-2xl font-bold tracking-tight text-navy-900">Setup Time by Size</h2>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-6 py-4 text-sm font-bold text-navy-900">Inflatable Size</th>
                    <th className="px-6 py-4 text-sm font-bold text-navy-900">People Needed</th>
                    <th className="px-6 py-4 text-sm font-bold text-navy-900">Total Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {setupTimes.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="px-6 py-4 text-sm font-semibold text-navy-900">{row.size}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.people}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-green-700">{row.time}</td>
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
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">Every order includes video tutorials and printed instructions. Questions? We're here.</p>
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
