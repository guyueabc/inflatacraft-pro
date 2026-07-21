import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Download,
  FileText,
  ClipboardList,
  ClipboardCheck,
  Wrench,
  PackageSearch,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Project Resources | inflatablemodel",
  description:
    "Online planning resources for custom inflatable projects, including buyer, material, setup, inspection, and maintenance guidance.",
  alternates: {
    canonical: "https://qddjtx.com/downloads",
  },
  openGraph: {
    title: "Project Resources | inflatablemodel",
    description:
      "Online planning resources for custom inflatable project review and product care.",
    url: "https://qddjtx.com/downloads",
    type: "website",
  },
};

const resources = [
  {
    title: "Supplier Evaluation Guide",
    desc: "Review offers, specifications, evidence, inspections, and delivery terms",
    href: "/buying-guide",
    icon: ClipboardList,
  },
  {
    title: "Material Planning Guide",
    desc: "Review material categories and the evidence to request for each project",
    href: "/materials",
    icon: FileText,
  },
  {
    title: "Setup & Installation Guide",
    desc: "Plan site, electrical, anchoring, operation, and teardown requirements",
    href: "/setup-guide",
    icon: ClipboardCheck,
  },
  {
    title: "Inspection Planning Guide",
    desc: "Define approval, inspection, evidence, acceptance, and packing requirements",
    href: "/quality-process",
    icon: ClipboardCheck,
  },
  {
    title: "Cleaning, Inspection & Storage Guide",
    desc: "General product-care guidance with project-specific limitations",
    href: "/blog/inflatable-maintenance-guide",
    icon: Wrench,
  },
];

export default function DownloadsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-navy-900 px-4 py-16 text-white">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-4 flex items-center gap-2">
            <Download className="h-6 w-6 text-red-400" />
            <p className="text-sm font-medium uppercase tracking-wider text-red-400">
              Project Resources
            </p>
          </div>
          <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
            Project Resources
          </h1>
          <p className="text-lg text-gray-300">
            Read the currently available planning guides for project review,
            materials, setup, inspection, and product care.
          </p>
        </div>
      </section>

      {/* Resource Cards */}
      <section className="py-12">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-navy-900">
            Online Resources
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((r, idx) => {
              const Icon = r.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col rounded-xl border border-gray-200 bg-white p-6"
                >
                  <Icon className="mb-4 h-8 w-8 text-navy-700" />
                  <h3 className="mb-2 text-lg font-bold text-navy-900">
                    {r.title}
                  </h3>
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-600">
                    {r.desc}
                  </p>
                  <Link
                    href={r.href}
                    className="inline-flex items-center gap-2 rounded-lg border border-navy-200 bg-navy-50 px-4 py-2.5 text-sm font-semibold text-navy-900 transition-all hover:bg-navy-100"
                  >
                    Open Resource
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Note */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="flex items-start gap-4 rounded-xl border-l-4 border-navy-400 bg-white p-6">
            <PackageSearch className="mt-0.5 h-6 w-6 flex-shrink-0 text-navy-500" />
            <p className="text-sm leading-relaxed text-gray-700">
              For product-specific documentation, include the required documents
              and destination requirements in your inquiry.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-200 bg-white py-16">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-navy-900">
            Need Something Specific?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
            If you need custom documentation for your project, venue, or
            compliance requirement, we can help.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-red-600/30 transition-all hover:bg-red-500"
          >
            Request Custom Documentation <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
