import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | InflatableModel",
  description: "Terms and conditions for using InflatableModel services and website.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://qddjtx.com/terms" },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-heading text-3xl font-bold text-navy-900">Terms of Service</h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: June 2026</p>

      <div className="mt-8 space-y-6 text-gray-700">
        <section>
          <h2 className="text-xl font-semibold text-navy-800">1. Overview</h2>
          <p className="mt-2 leading-relaxed">
            InflatableModel provides custom inflatable manufacturing services for businesses.
            By submitting a quote request or using our website, you agree to these terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-navy-800">2. Quotes & Pricing</h2>
          <p className="mt-2 leading-relaxed">
            All quotes are estimates based on the information you provide. Final pricing is
            confirmed after design approval. Quotes are valid for 30 days from the date issued.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-navy-800">3. Production Timeline</h2>
          <p className="mt-2 leading-relaxed">
            Production and delivery estimates vary by specification, approval status, quantity,
            production availability, and shipping method. Applicable timing is stated in the order documents.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-navy-800">4. Design & Intellectual Property</h2>
          <p className="mt-2 leading-relaxed">
            You are responsible for having permission to use brand assets and designs submitted
            for review. Artwork use, design-support scope, ownership, and licensing terms are
            confirmed in the applicable written agreement.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-navy-800">5. Warranty</h2>
          <p className="mt-2 leading-relaxed">
            Any warranty, component coverage, exclusions, applicable period, and claim process
            are only those stated in the final quotation or written order agreement.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-navy-800">6. Contact</h2>
          <p className="mt-2 leading-relaxed">
            Questions about these terms? Contact us through WhatsApp or the online quote form.
          </p>
        </section>
      </div>
    </div>
  );
}
