import type { Metadata } from "next";
import { GalleryPageClient } from "@/components/gallery/gallery-client";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Custom Inflatable Product Gallery | InflatableModel",
  description: "Browse visual references for custom inflatable product forms. Examples do not represent verified customer cases, endorsements, or guaranteed results.",
  openGraph: {
    title: "Custom Inflatable Product Gallery | InflatableModel",
    description: "Visual references for custom inflatable product forms and customization directions.",
    type: "website",
  },
};

export default function GalleryPage() {
  return <GalleryPageClient />;
}