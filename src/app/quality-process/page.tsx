import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ClipboardCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Quality Process | inflatablemodel",
  description:
    "Our 10-step quality process for custom inflatables — from material check to pre-shipment documentation. Every stage is documented and verified.",
};

const steps = [
  {
    title: "Material Check",
    desc: "Incoming fabric and components are inspected for denier weight, coating consistency, color matching, and flame retardancy certification before any cutting begins.",
  },
  {
    title: "Digital Artwork Confirmation",
    desc: "A digital proof with exact dimensions, colors (Pantone matched), logo placement, and structural details is sent for your written approval before production starts.",
  },
  {
    title: "Cutting",
    desc: "Fabric panels are precision-cut using plotted patterns and CNC cutting tables to ensure consistent panel sizes and clean edges across every unit.",
  },
  {
    title: "Printing",
    desc: "Graphics are applied using dye-sublimation, digital UV, or screen printing depending on the material and design. Color accuracy is checked against the approved proof.",
  },
  {
    title: "Sewing or Welding",
    desc: "Panels are joined using industrial sewing machines (double-stitched) or high-frequency welding, selected based on material type and structural requirements.",
  },
  {
    title: "Reinforcement",
    desc: "High-stress areas — anchor points, inflation ports, seams, and corners — receive additional reinforcement layers and webbing to extend product lifespan.",
  },
  {
    title: "Inflation Test",
    desc: "Every unit is fully inflated and held under pressure for a minimum of 30 minutes to verify structural integrity, seam sealing, and blower compatibility.",
  },
  {
    title: "Cleaning",
    desc: "The finished inflatable is wiped down and inspected for loose threads, adhesive residue, and print defects before entering the packing stage.",
  },
  {
    title: "Packing",
    desc: "The product is loosely folded (never creased sharply), placed in a durable storage bag with the blower, stakes, ropes, and repair kit, then boxed for shipping.",
  },
  {
    title: "Pre-Shipment Documentation",
    desc: "Final photos, measurements, material certificates, and packing list are compiled and sent to the buyer for approval before the shipment leaves our facility.",
  },
];

export default function QualityProcessPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-navy-900 px-4 py-16 text-white">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-4 flex items-center gap-2">
            <ClipboardCheck className="h-6 w-6 text-red-400" />
            <p className="text-sm font-medium uppercase tracking-wider text-red-400">
              Quality Process
            </p>
          </div>
          <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
            Quality Process
          </h1>
          <p className="text-lg text-gray-300">
            Every custom inflatable passes through a documented 10-step quality
            process — from incoming material inspection to pre-shipment
            documentation. No unit ships without a full inflation test and buyer
            approval.
          </p>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-navy-900">
            10-Step Production Process
          </h2>
          <div className="relative space-y-6">
            {/* Vertical line */}
            <div className="absolute left-5 top-2 h-full w-0.5 bg-gray-200 md:left-6" />
            {steps.map((s, idx) => (
              <div
                key={idx}
                className="relative flex items-start gap-4 md:gap-6"
              >
                <div className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-navy-900 text-sm font-bold text-white md:h-12 md:w-12 md:text-base">
                  {idx + 1}
                </div>
                <div className="flex-1 rounded-xl border border-gray-200 bg-white p-5">
                  <h3 className="mb-1 text-lg font-bold text-navy-900">
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-200 bg-white py-16">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-navy-900">
            Ready to See It in Action?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
            Start your project today and follow each step from material check to
            shipment.
          </p>
          <Link
            href="/get-quote"
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-red-600/30 transition-all hover:bg-red-500"
          >
            Start Your Project <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
