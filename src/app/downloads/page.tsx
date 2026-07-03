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
  title: "Downloads & Resources | inflatablemodel",
  description:
    "Downloadable resources for custom inflatable projects — project checklist, material options sheet, setup and anchoring checklist, daily inspection checklist, and maintenance and storage guide.",
};

const resources = [
  {
    title: "Inflatable Project Checklist",
    desc: "Complete checklist for planning your inflatable project",
    file: "inflatable-project-checklist",
    icon: ClipboardList,
  },
  {
    title: "Material Options Sheet",
    desc: "Compare PVC, Oxford, TPU and flame-retardant options",
    file: "material-options-sheet",
    icon: FileText,
  },
  {
    title: "Setup & Anchoring Checklist",
    desc: "Site preparation and anchoring guidelines",
    file: "setup-anchoring-checklist",
    icon: ClipboardCheck,
  },
  {
    title: "Daily Inspection Checklist",
    desc: "Pre-use inspection for safe operation",
    file: "daily-inspection-checklist",
    icon: ClipboardCheck,
  },
  {
    title: "Maintenance & Storage Guide",
    desc: "Cleaning, folding, storage and repair tips",
    file: "maintenance-storage-guide",
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
              Downloads &amp; Resources
            </p>
          </div>
          <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
            Downloads &amp; Resources
          </h1>
          <p className="text-lg text-gray-300">
            Practical guides and checklists for every stage of your inflatable
            project — from planning to daily operation and long-term
            maintenance.
          </p>
        </div>
      </section>

      {/* Resource Cards */}
      <section className="py-12">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-navy-900">
            Available Resources
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
                  <a
                    href={`/downloads/${r.file}.pdf`}
                    className="inline-flex items-center gap-2 rounded-lg border border-navy-200 bg-navy-50 px-4 py-2.5 text-sm font-semibold text-navy-900 transition-all hover:bg-navy-100"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </a>
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
              More resources coming soon. Contact us for specific documentation.
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
