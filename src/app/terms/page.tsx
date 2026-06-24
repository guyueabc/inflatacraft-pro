import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | InflatableModel",
  description: "Terms and conditions for using InflatableModel services and website.",
  robots: { index: true, follow: true },
  canonical: "https://www.qddjtx.com/terms",
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
            Standard production takes 3–6 weeks from design approval. Timelines may vary
            based on project complexity and order volume. We will communicate any delays promptly.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-navy-800">4. Design & Intellectual Property</h2>
          <p className="mt-2 leading-relaxed">
            You retain ownership of your brand assets and designs submitted to us. We provide
            free 3D renderings for approved projects. Renderings remain our intellectual property
            until a production order is placed.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-navy-800">5. Warranty</h2>
          <p className="mt-2 leading-relaxed">
            All inflatables come with a manufacturer's warranty covering defects in materials
            and workmanship. Contact us for specific warranty terms related to your product.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-navy-800">6. Contact</h2>
          <p className="mt-2 leading-relaxed">
            Questions about these terms? Email us at{" "}
            <a href="mailto:inflatablemodel@showlovein.com" className="text-red-600 underline">
              inflatablemodel@showlovein.com
            </a>{" "}
            or call +86 153****7736.
          </p>
        </section>
      </div>
    </div>
  );
}
