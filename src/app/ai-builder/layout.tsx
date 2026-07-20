import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Project Builder | InflatableModel",
  description: "Submit custom inflatable project details for project-specific quotation review and written confirmation.",
  alternates: { canonical: "https://qddjtx.com/ai-builder" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}