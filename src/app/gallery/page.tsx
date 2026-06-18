import type { Metadata } from "next";
import { GalleryPageClient } from "@/components/gallery/gallery-client";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Gallery | Custom Inflatables in Action | InflatableModel",
  description: "See our custom inflatables in action at events, trade shows, sports stadiums, and retail activations worldwide. Giant product replicas, mascots, arches, and more.",
  openGraph: {
    title: "Gallery | InflatableModel",
    description: "See our custom inflatables in action at events worldwide.",
    type: "website",
  },
};

export default function GalleryPage() {
  return <GalleryPageClient />;
}