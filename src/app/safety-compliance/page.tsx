import type { Metadata } from "next";
import Link from "next/link";
import {
  Shield,
  ShieldCheck,
  FileText,
  Flame,
  Zap,
  Wind,
  Anchor,
  PackageCheck,
  Truck,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Safety & Compliance | inflatablemodel",
  description:
    "Inflatable safety documentation and compliance standards. ASTM F2374, EN 14960, NFPA 701, UL/ETL/CE, CPSIA. Materials, flame retardancy, electrical safety, anchoring, and pre-shipment documentation.",
};

const standards = [
  {
    code: "ASTM F2374",
    name: "Standard Practice for Fencing/Anchoring of Inflatable Amusement Devices",
    applies: "US amusement inflatables, bounce houses, interactive games",
  },
  {
    code: "EN 14960",
    name: "European Standard for Inflatable Play Equipment",
    applies: "EU market — play inflatables, slides, interactive structures",
  },
  {
    code: "NFPA 701",
    name: "Standard Methods of Fire Tests for Flame Propagation of Textiles",
    applies: "Flame retardancy certification for fabrics and materials",
  },
  {
    code: "UL / ETL / CE",
    name: "Electrical Safety Certification for Blowers and Components",
    applies: "Blower motors, electrical wiring, power supplies",
  },
  {
    code: "CPSIA",
    name: "Consumer Product Safety Improvement Act (US)",
    applies: "Lead content and phthalate limits for children's products",
  },
];

const preProduction = [
  "Material specification sheet with flame retardancy ratings",
  "Digital artwork proof for final design confirmation",
  "Engineering notes on size, structure, and anchor points",
  "Blower and power configuration (110V / 220V, plug type)",
  "Estimated production timeline and milestone schedule",
];

const preShipment = [
  "Inflation test photo and video documentation",
  "Final measurement and weight verification",
  "Material certification copies (flame retardancy, CPSIA)",
  "Packing list with accessories (blower, stakes, ropes, repair kit)",
  "Care and maintenance instruction sheet",
];

export default function SafetyCompliancePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-navy-900 px-4 py-16 text-white">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-4 flex items-center gap-2">
            <Shield className="h-6 w-6 text-red-400" />
            <p className="text-sm font-medium uppercase tracking-wider text-red-400">
              Safety & Compliance
            </p>
          </div>
          <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
            Safety &amp; Compliance
          </h1>
          <p className="text-lg text-gray-300">
            Documentation and standards support for custom inflatable products.
            We work with recognized safety frameworks and provide the paperwork
            you need for venues, insurers, and regulators — before production
            and before shipment.
          </p>
        </div>
      </section>

      {/* Why Safety Documentation Matters */}
      <section className="py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-navy-900">
            Why Safety Documentation Matters
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <ShieldCheck className="mb-3 h-8 w-8 text-navy-700" />
              <h3 className="mb-2 text-lg font-bold text-navy-900">
                Venue &amp; Insurance Approval
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Convention centers, stadiums, malls, and event venues routinely
                require flame retardancy certificates, anchoring specifications,
                and electrical safety documentation before allowing an inflatable
                on site. Insurers ask for the same.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <FileText className="mb-3 h-8 w-8 text-navy-700" />
              <h3 className="mb-2 text-lg font-bold text-navy-900">
                Regulatory Alignment
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Different countries, states, and product categories carry
                different legal requirements. Proper documentation helps you
                demonstrate due diligence and avoid last-minute compliance
                failures at customs or inspection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Standards We Can Work With */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-navy-900">
            Standards We Can Work With
          </h2>
          <p className="mb-8 text-sm text-gray-500">
            These frameworks guide our material selection, construction, and
            documentation. Applicability depends on your product and market.
          </p>
          <div className="space-y-3">
            {standards.map((s, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5"
              >
                <Shield className="mt-0.5 h-6 w-6 flex-shrink-0 text-red-500" />
                <div>
                  <h3 className="text-base font-bold text-navy-900">
                    {s.code}
                  </h3>
                  <p className="text-sm text-gray-600">{s.name}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    <strong>Applies to:</strong> {s.applies}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials, Flame Retardancy and Electrical Safety */}
      <section className="py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-navy-900">
            Materials, Flame Retardancy and Electrical Safety
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <Flame className="mb-3 h-8 w-8 text-red-500" />
              <h3 className="mb-2 text-lg font-bold text-navy-900">
                Flame Retardancy
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                We offer NFPA 701-certified flame-retardant PVC tarpaulin and
                Oxford fabric options. Certificates of compliance can be provided
                with your shipment. For EU markets, EN 71-compatible materials
                are available on request.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <Zap className="mb-3 h-8 w-8 text-amber-500" />
              <h3 className="mb-2 text-lg font-bold text-navy-900">
                Electrical Safety
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Blowers are available with UL, ETL, or CE certifications depending
                on destination. We configure voltage (110V / 220V) and plug type
                (US / EU / UK / AU) to match your local power infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Anchoring, Wind and Site Conditions */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-navy-900">
            Anchoring, Wind and Site Conditions
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <Anchor className="mb-3 h-8 w-8 text-navy-700" />
              <h3 className="mb-2 text-base font-bold text-navy-900">
                Anchor Points
              </h3>
              <p className="text-sm text-gray-600">
                Every inflatable includes D-ring anchor points sized to the
                product. Ground stakes, sandbags, and water ballast options are
                documented in the setup guide.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <Wind className="mb-3 h-8 w-8 text-navy-700" />
              <h3 className="mb-2 text-base font-bold text-navy-900">
                Wind Ratings
              </h3>
              <p className="text-sm text-gray-600">
                We provide recommended wind limits and deflation guidance.
                General guidance: deflate if sustained winds exceed 25 mph
                (40 km/h).
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <Shield className="mb-3 h-8 w-8 text-navy-700" />
              <h3 className="mb-2 text-base font-bold text-navy-900">
                Site Conditions
              </h3>
              <p className="text-sm text-gray-600">
                Setup checklists cover surface type, overhead clearance,
                drainage, and crowd separation. Indoor and outdoor configurations
                are addressed separately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Provide Before Production */}
      <section className="py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-navy-900">
            What We Provide Before Production
          </h2>
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <ul className="space-y-3">
              {preProduction.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <PackageCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  <span className="text-sm text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* What We Provide Before Shipment */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-navy-900">
            What We Provide Before Shipment
          </h2>
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <ul className="space-y-3">
              {preShipment.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Truck className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  <span className="text-sm text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="flex items-start gap-4 rounded-xl border-l-4 border-amber-400 bg-amber-50 p-6">
            <AlertTriangle className="mt-0.5 h-6 w-6 flex-shrink-0 text-amber-500" />
            <p className="text-sm leading-relaxed text-amber-900">
              <strong>Disclaimer:</strong> Final compliance requirements depend
              on the country, state, city, venue, product type, and intended
              use. Buyers should confirm local requirements before production and
              operation.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-200 bg-white py-16">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-navy-900">
            Ready to Start Your Project?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
            Tell us your product, market, and compliance needs. We&apos;ll
            configure materials and documentation accordingly.
          </p>
          <Link
            href="/get-quote"
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-red-600/30 transition-all hover:bg-red-500"
          >
            Get a Project Quote <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
