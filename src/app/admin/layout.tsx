import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | InflatableModel",
  alternates: { canonical: null },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
