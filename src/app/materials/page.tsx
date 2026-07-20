import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Layers,
  Paintbrush,
  Link2,
  Plug,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Materials & Printing | inflatablemodel",
  description:
    "A project-planning guide to discussing custom inflatable materials, printing, seams, electrical equipment, and documentation before they are confirmed in a quotation.",
  alternates: { canonical: "https://qddjtx.com/materials" },
};

const materials = [
  {
    name: "PVC Tarpaulin",
    desc: "A vinyl-coated fabric option often considered for applications that need welded seams or a heavier construction. Confirm thickness, weight, coating, intended use, and any test documentation for the exact order.",
    icon: Layers,
  },
  {
    name: "Oxford Fabric",
    desc: "A woven nylon or polyester option commonly considered where packability and lower weight matter. Confirm fiber, denier, coating, print method, and intended indoor or outdoor use for the project.",
    icon: Layers,
  },
  {
    name: "PVC-Coated Polyester",
    desc: "Polyester scrim with a PVC coating can be considered for selected structures. Suitability depends on the construction, seam method, loading, environment, maintenance, and product-specific specification.",
    icon: Layers,
  },
  {
    name: "TPU",
    desc: "Thermoplastic polyurethane can be discussed for projects needing particular flexibility, transparency, or surface characteristics. Any environmental, medical, or food-contact suitability requires separate evidence for the exact material and use.",
    icon: Layers,
  },
  {
    name: "Fire-Performance Documentation",
    desc: "Ask the venue or responsible authority which test method and documents apply. Confirm that any report or certificate matches the exact material, manufacturer, date, market, and intended use before ordering.",
    icon: Layers,
  },
];

const printingMethods = [
  {
    name: "Dye-Sublimation",
    desc: "A heat-transfer process used with compatible fabrics. Color, finish, weather exposure, cleaning limits, and expected service conditions should be confirmed from a project-specific sample or specification.",
  },
  {
    name: "Digital Print",
    desc: "Full-color CMYK printing directly onto the material surface. Photorealistic detail and gradient capability. Ideal for complex artwork, product replicas, and photographic imagery.",
  },
  {
    name: "Screen Print",
    desc: "Ink pressed through a mesh stencil. Cost-effective for large runs with simple, solid-color designs. Limited color count but excellent opacity on dark fabrics.",
  },
];

const seamInfo = [
  "Confirm whether each panel joint is sewn, welded, bonded, or uses another documented construction method.",
  "Match the seam method to the exact material, inflation system, intended environment, and maintenance plan.",
  "Identify reinforcement and attachment details for inflation ports, anchor points, and other project-specific load paths.",
  "Agree in writing on inspection scope, acceptance criteria, records, and any independent testing before production.",
];

const powerOptions = [
  { label: "Electrical Supply", value: "Confirm destination voltage, frequency, available current, and venue supply." },
  { label: "Plug & Connection", value: "Confirm the exact plug, extension lead, protection, and weather exposure for the site." },
  { label: "Equipment Documents", value: "Verify the supplied blower model, marking or listing, and matching documents in writing." },
  { label: "Site Review", value: "Have the venue or a qualified person confirm circuit and installation requirements." },
];

export default function MaterialsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-navy-900 px-4 py-16 text-white">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-4 flex items-center gap-2">
            <Layers className="h-6 w-6 text-red-400" />
            <p className="text-sm font-medium uppercase tracking-wider text-red-400">
              Materials &amp; Printing
            </p>
          </div>
          <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
            Materials &amp; Printing
          </h1>
          <p className="text-lg text-gray-300">
            Use this guide to discuss material, printing, construction, and
            documentation. Final selections must be confirmed for the exact project.
          </p>
        </div>
      </section>

      {/* Material Cards */}
      <section className="py-12">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-navy-900">
            Material Options
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {materials.map((m, idx) => {
              const Icon = m.icon;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-gray-200 bg-white p-6"
                >
                  <Icon className="mb-4 h-8 w-8 text-navy-700" />
                  <h3 className="mb-2 text-lg font-bold text-navy-900">
                    {m.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {m.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Printing Methods */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-navy-900">
            Printing Methods
          </h2>
          <div className="space-y-4">
            {printingMethods.map((p, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-gray-200 bg-white p-5"
              >
                <div className="mb-2 flex items-center gap-2">
                  <Paintbrush className="h-5 w-5 text-red-500" />
                  <h3 className="text-lg font-bold text-navy-900">{p.name}</h3>
                </div>
                <p className="text-sm leading-relaxed text-gray-600">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seam and Reinforcement */}
      <section className="py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-navy-900">
            Seams &amp; Reinforcement
          </h2>
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <ul className="space-y-3">
              {seamInfo.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Link2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-navy-600" />
                  <span className="text-sm text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Blower and Power Options */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-navy-900">
            Blower &amp; Power Options
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {powerOptions.map((p, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-gray-200 bg-white p-5"
              >
                <Plug className="mb-3 h-6 w-6 text-amber-500" />
                <h3 className="mb-1 text-sm font-bold uppercase tracking-wide text-navy-900">
                  {p.label}
                </h3>
                <p className="text-sm text-gray-600">{p.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-200 bg-white py-16">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-navy-900">
            Need Detailed Material Specs?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
            Request the available material specification and supporting documents
            for your intended product, venue, and destination.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-red-600/30 transition-all hover:bg-red-500"
          >
            Get Material Specs <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
