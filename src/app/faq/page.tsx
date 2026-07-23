import type { Metadata } from "next";
import { FAQPageClient } from "@/components/faq/faq-client";
import { FAQ_DATA } from "@/lib/data/faq";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | InflatableModel",
  description: "Answers to common questions about custom inflatables - pricing, turnaround time, materials, design process, shipping, and more.",
  openGraph: {
    title: "FAQ | InflatableModel",
    description: "Answers to common questions about custom inflatables.",
    url: "https://qddjtx.com/faq",
    type: "website",
  },
};

export default function FAQPage() {
  const faqItems = FAQ_DATA.flatMap((category) => category.items);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }).replace(/</g, "\u003c"),
        }}
      />
      <FAQPageClient />
    </>
  );
}