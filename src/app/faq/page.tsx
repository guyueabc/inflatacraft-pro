import type { Metadata } from "next";
import { FAQPageClient } from "@/components/faq/faq-client";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | InflatableModel",
  description: "Answers to common questions about custom inflatables - pricing, turnaround time, materials, design process, shipping, and more.",
  openGraph: {
    title: "FAQ | InflatableModel",
    description: "Answers to common questions about custom inflatables.",
    type: "website",
  },
};

const faqItems = [
  { question: "What is the minimum order quantity?", answer: "We accept orders starting from a single unit. Whether you need one custom inflatable or a fleet of 200, we can accommodate your needs." },
  { question: "How long does production take?", answer: "Standard turnaround time is 3-6 weeks depending on complexity and order volume. Rush orders can be accommodated for an additional fee." },
  { question: "What materials do you use?", answer: "We use commercial-grade 210D and 420D Oxford nylon with UV-resistant coatings. For heavy-duty applications, we offer 500D PVC-coated polyester." },
  { question: "Can I see a design before production?", answer: "Yes! We provide free 3D renderings so you can visualize your inflatable before we begin manufacturing. Revisions are included." },
  { question: "Do you ship internationally?", answer: "Yes, we ship worldwide. Shipping costs vary based on destination, size, and quantity. Our team can provide a shipping quote with your order." },
  { question: "What warranty do you offer?", answer: "All inflatables come with a 1-year warranty against manufacturing defects. Extended warranties are available for high-use commercial deployments." },
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
          }),
        }}
      />
      <FAQPageClient />
    </>
  );
}