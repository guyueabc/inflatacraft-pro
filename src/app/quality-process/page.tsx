import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ClipboardCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Custom Inflatable Inspection Planning | InflatableModel",
  description:
    "A neutral checklist for defining product-specific approval, inspection, documentation, acceptance, and packing requirements.",
  alternates: { canonical: "https://qddjtx.com/quality-process" },
};

const steps = [
  ["Define the controlling specification", "Identify the approved dimensions, artwork, material, construction, accessories, documentation, operating assumptions, and packaging."],
  ["Agree on acceptance criteria", "State measurable criteria, tolerances, visual expectations, required evidence, and which deviations require buyer approval."],
  ["Confirm material evidence", "Specify which supplier declarations, test reports, samples, color references, or batch records are required for the exact order."],
  ["Approve artwork and configuration", "Use a written approval document and record revisions. A visual rendering alone should not replace the production specification."],
  ["Plan in-process checks", "Decide whether dimensions, printing, seams, reinforcement, components, or other features need documented checks during production."],
  ["Plan final inspection", "Agree on inflation or functional checks, measurement scope, photos or video, accessory verification, and any independent inspection."],
  ["Handle nonconformity", "Define review, correction, reinspection, waiver, replacement, refund, and evidence requirements in the written terms."],
  ["Approve packing and handoff", "Confirm the packing list, labels, packaging evidence, freight handoff, condition reporting, and record retention."],
];

export default function QualityProcessPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-navy-900 px-4 py-16 text-white"><div className="container mx-auto max-w-4xl"><div className="mb-4 flex items-center gap-2"><ClipboardCheck className="h-6 w-6 text-red-400" /><p className="text-sm font-medium uppercase tracking-wider text-red-400">Inspection Planning</p></div><h1 className="text-4xl font-bold tracking-tight md:text-5xl">Define Quality in the Order Documents</h1><p className="mt-4 text-lg text-gray-300">Inspection scope and acceptance evidence vary by product. This page does not claim that every order follows a fixed process or automatically includes specified tests or certificates.</p></div></section>
      <section className="py-14"><div className="container mx-auto max-w-4xl px-4"><div className="space-y-5">{steps.map(([title, description], index) => <article key={title} className="flex gap-5 rounded-xl border border-gray-200 p-6"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-900 font-bold text-white">{index + 1}</div><div><h2 className="font-bold text-navy-900">{title}</h2><p className="mt-2 text-sm leading-relaxed text-gray-700">{description}</p></div></article>)}</div></div></section>
      <section className="bg-gray-50 px-4 py-14 text-center"><h2 className="text-2xl font-bold text-navy-900">Request a written inspection scope</h2><p className="mx-auto mt-3 max-w-2xl text-gray-600">Confirm the exact product, responsible parties, criteria, evidence, timing, and remedy before approval.</p><Link href="/get-quote" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-red-600 px-8 py-4 font-semibold text-white hover:bg-red-500">Request a Proposal <ArrowRight className="h-5 w-5" /></Link></section>
    </main>
  );
}
