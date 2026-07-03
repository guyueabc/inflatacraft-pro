import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Project Builder | InflatableModel",
  description: "Build your custom inflatable project and get a budgetary estimate in 2 minutes.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}