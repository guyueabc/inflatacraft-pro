import type { Metadata } from "next";
import { AboutPageClient } from "@/components/about/about-client";

export const metadata: Metadata = {
  title: "About Us | InflatableModel - USA Custom Inflatable Manufacturer",
  description: "InflatableModel is a USA-based custom inflatable manufacturer. Giant product replicas, mascots, arches, costumes, tents, and games for brands worldwide. Free 3D renderings, 3-6 week turnaround.",
  openGraph: {
    title: "About InflatableModel | USA Custom Inflatables",
    description: "USA-based custom inflatable manufacturer. Free 3D renderings. 3-6 week turnaround.",
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
            url: "https://inflatablemodel.com.cn/about",
          }),
        }}
      />
      <AboutPageClient />
    </>
  );
}