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
    "Materials and printing options for custom inflatables. PVC tarpaulin, Oxford fabric, PVC-coated polyester, TPU, flame-retardant options. Dye-sublimation, digital, and screen printing. Seam reinforcement and blower power options.",
};

const materials = [
  {
    name: "PVC Tarpaulin",
    desc: "Heavy-duty vinyl-coated fabric (0.55mm typical). Waterproof, tear-resistant, and the industry standard for large outdoor inflatables, slides, and bouncers. Available in flame-retardant grades.",
    icon: Layers,
  },
  {
    name: "Oxford Fabric",
    desc: "Lightweight woven nylon/polyester (210D–500D). Easy to fold, transport, and store. Ideal for product replicas, mascots, arches, and promotional inflatables used at events.",
    icon: Layers,
  },
  {
    name: "PVC-Coated Polyester",
    desc: "Polyester scrim coated with PVC on both sides. Combines high tensile strength with waterproofing. Used for permanent installations, water slides, and extreme-duty applications.",
    icon: Layers,
  },
  {
    name: "TPU",
    desc: "Thermoplastic polyurethane — lightweight, flexible, and environmentally friendlier than PVC. Used for medical-grade, food-safe, or eco-conscious applications requiring transparent or soft-touch surfaces.",
    icon: Layers,
  },
  {
    name: "Flame-Retardant Options",
    desc: "NFPA 701-certified flame-retardant materials available across PVC and Oxford fabric lines. Certificates of compliance provided on request. Required by most US venues and insurers.",
    icon: Layers,
  },
];

const printingMethods = [
  {
    name: "Dye-Sublimation",
    desc: "Ink is heat-transferred into the fabric fibers for vibrant, permanent color. Best for Oxford fabric. Resistant to cracking and peeling. 2–4 year outdoor fade resistance.",
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
  "Double-stitched seams at all primary panel joins using nylon bonding thread",
  "High-frequency (HF) welding for PVC tarpaulin — creates airtight, waterproof bonds",
  "Reinforcement webbing at anchor D-rings, inflation ports, and high-stress corners",
  "Stress test: every seam verified during the 30-minute inflation test",
];

const powerOptions = [
  { label: "Voltage", value: "110V (US) / 220V (EU / international)" },
  { label: "Plug Types", value: "US / EU / UK / AU" },
  { label: "Blower Certification", value: "UL / ETL / CE available" },
  { label: "Circuit Requirement", value: "Dedicated 15A circuit recommended" },
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
            The right material and printing method determine durability, weight,
            and visual impact. Here&apos;s what we offer — and how to choose.
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
            Contact us for a full material specification sheet tailored to your
            project.
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
