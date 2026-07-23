import type { Metadata } from "next";
import { FAQPageClient } from "@/components/faq/faq-client";

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

const faqItems = [
  {
    question: "How do I get a quote?",
    answer:
      "Submit your project details through our online quote form or contact us through WhatsApp. Include the type of inflatable, approximate size, quantity, deadline, and any reference images so the project can be reviewed.",
  },
];

export default function FAQPage() {
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