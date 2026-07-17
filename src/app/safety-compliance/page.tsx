import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ArrowRight, FileText, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Custom Inflatable Safety Requirement Planning | InflatableModel",
  description:
    "General guidance for identifying product-specific venue, electrical, fire, anchoring, accessibility, insurance, and regulatory requirements.",
  alternates: { canonical: "https://qddjtx.com/safety-compliance" },
};

const topics = [
  ["Product category and intended use", "Advertising displays, wearable products, temporary structures, amusement devices, and audience-interactive products may be governed differently."],
  ["Venue and local authority", "Ask the venue, event organizer, insurer, fire authority, electrical authority, and other responsible parties what documents and limits apply."],
  ["Material and fire evidence", "Verify any report against the exact material, manufacturer, test method, date, market, and product use. A generic certificate name is not proof for every order."],
  ["Electrical equipment", "Confirm voltage, frequency, plug, current, protection, weather rating, extension leads, generator use, and relevant component certification for the destination."],
  ["Anchoring and environment", "Use a product- and site-specific plan that considers surface, available anchors, clearance, weather, wind, public access, egress, and supervision."],
  ["Interactive use", "Products used by children or the public may require additional design, operation, inspection, staffing, hygiene, accessibility, and legal review."],
  ["Insurance and responsibility", "Confirm who owns, installs, operates, supervises, inspects, maintains, and removes the product and what insurance the venue requires."],
  ["Product-specific evidence", "Only reports, labels, declarations, drawings, manuals, and inspection records stated for the exact order should be treated as included."],
];

export default function SafetyCompliancePage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-navy-900 px-4 py-16 text-white"><div className="container mx-auto max-w-4xl"><div className="mb-4 flex items-center gap-2"><Shield className="h-6 w-6 text-red-400" /><p className="text-sm font-medium uppercase tracking-wider text-red-400">Safety Requirement Planning</p></div><h1 className="text-4xl font-bold tracking-tight md:text-5xl">Requirements Depend on the Exact Product and Site</h1><p className="mt-4 text-lg text-gray-300">This page provides general planning prompts. It does not certify a product, promise document availability, or replace advice from the responsible venue, authority, engineer, insurer, or qualified safety professional.</p></div></section>
      <section className="py-14"><div className="container mx-auto max-w-5xl px-4"><div className="grid gap-5 sm:grid-cols-2">{topics.map(([title, description]) => <article key={title} className="rounded-xl border border-gray-200 p-6"><FileText className="h-6 w-6 text-navy-700" /><h2 className="mt-3 font-bold text-navy-900">{title}</h2><p className="mt-2 text-sm leading-relaxed text-gray-700">{description}</p></article>)}</div><div className="mt-8 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm leading-relaxed text-amber-900"><AlertTriangle className="h-6 w-6 shrink-0" /><p>Do not rely on a standard name, website statement, sample report, or visual similarity. Verify applicability and evidence for the exact item before purchase, installation, or operation.</p></div></div></section>
      <section className="bg-gray-50 px-4 py-14 text-center"><h2 className="text-2xl font-bold text-navy-900">Include requirements in your inquiry</h2><p className="mx-auto mt-3 max-w-2xl text-gray-600">Share the destination, venue rules, intended audience, operating conditions, electrical setup, and required evidence.</p><Link href="/get-quote" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-red-600 px-8 py-4 font-semibold text-white hover:bg-red-500">Request a Project Review <ArrowRight className="h-5 w-5" /></Link></section>
    </main>
  );
}
