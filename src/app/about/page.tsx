import type { Metadata } from "next";
import { AboutPageClient } from "@/components/about/about-client";

export const metadata: Metadata = {
  title: "About InflatableModel | Custom Inflatable Project Support",
  description: "Learn about InflatableModel's approach to custom inflatable project planning, design coordination, and product information.",
  openGraph: {
    title: "About InflatableModel | Custom Inflatable Project Support",
    description: "Learn about InflatableModel's approach to custom inflatable projects.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "About InflatableModel",
            url: "https://qddjtx.com/about",
          }),
        }}
      />
      <AboutPageClient />
    </>
  );
}