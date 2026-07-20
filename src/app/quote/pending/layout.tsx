import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quote Request Status | InflatableModel",
  description: "Review the status and next steps for a custom inflatable quote request.",
  alternates: { canonical: "https://qddjtx.com/quote/pending" },
  robots: { index: false, follow: false },
};

export default function QuotePendingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
