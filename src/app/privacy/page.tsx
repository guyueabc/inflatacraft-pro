import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | InflatableModel",
  description: "How InflatableModel collects, uses, and protects your personal information.",
  robots: { index: true, follow: true },
  canonical: "https://www.qddjtx.com/privacy",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-heading text-3xl font-bold text-navy-900">Privacy Policy</h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: June 2026</p>

      <div className="mt-8 space-y-6 text-gray-700">
        <section>
          <h2 className="text-xl font-semibold text-navy-800">1. Information We Collect</h2>
          <p className="mt-2 leading-relaxed">
            When you submit a quote request or contact us, we collect your email address,
            phone number, and any project details you voluntarily provide. We also collect
            anonymous usage data (page views, browser type) through our analytics tracking.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-navy-800">2. How We Use Your Information</h2>
          <p className="mt-2 leading-relaxed">
            We use your contact information solely to respond to your inquiry, provide quotes,
            and communicate about your project. We do not sell, rent, or share your personal
            information with third parties for marketing purposes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-navy-800">3. Cookies & Tracking</h2>
          <p className="mt-2 leading-relaxed">
            We use Google Ads and analytics cookies to understand website traffic and improve
            our services. You can disable cookies in your browser settings at any time.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-navy-800">4. Data Security</h2>
          <p className="mt-2 leading-relaxed">
            Your data is stored securely and transmitted over encrypted connections (HTTPS).
            Access to personal data is restricted to authorized personnel only.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-navy-800">5. Your Rights</h2>
          <p className="mt-2 leading-relaxed">
            You may request access to, correction of, or deletion of your personal data at
            any time by contacting us at inflatablemodel@showlovein.com.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-navy-800">6. Contact</h2>
          <p className="mt-2 leading-relaxed">
            Questions about this policy? Email us at{" "}
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
