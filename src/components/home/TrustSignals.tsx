import Link from "next/link";
import { Shield, Settings, Layers, Download } from "lucide-react";

const trustItems = [
  {
    icon: Shield,
    title: "Safety & Compliance",
    desc: "ASTM, EN, NFPA standards documentation",
    href: "/safety-compliance",
  },
  {
    icon: Settings,
    title: "Quality Process",
    desc: "10-step production quality control",
    href: "/quality-process",
  },
  {
    icon: Layers,
    title: "Materials & Printing",
    desc: "PVC, Oxford, TPU + dye-sublimation printing",
    href: "/materials",
  },
  {
    icon: Download,
    title: "Downloads",
    desc: "Project checklists, setup guides, specs",
    href: "/downloads",
  },
];

export function TrustSignals() {
  return (
    <section className="bg-navy-900 py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Built to the Highest Standards
          </h2>
          <p className="mt-3 text-sm text-navy-200 sm:text-base">
            Transparency at every stage — from materials and manufacturing to
            safety certifications and downloadable resources.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col items-start rounded-xl bg-white p-6 shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-navy-50 transition-colors group-hover:bg-red-50">
                  <Icon className="h-6 w-6 text-navy-700 transition-colors group-hover:text-red-600" />
                </div>
                <h3 className="text-base font-semibold text-navy-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-500">
                  {item.desc}
                </p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-red-600">
                  Learn more
                  <svg
                    className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
