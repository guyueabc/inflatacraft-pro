"use client";

export function OrganizationSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "inflatablemodel",
    description:
      "Custom inflatable manufacturing — giant product replicas, mascots, arches, costumes, tents, and games. 3-6 week turnaround. Free 3D renderings.",
    url: "https://www.qddjtx.com",
    telephone: "+86 15376427736",
    email: "inflatablemodel@showlovein.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "CN",
    },
    sameAs: [
      "https://facebook.com/inflatablemodel",
      "https://twitter.com/inflatablemodel",
      "https://instagram.com/inflatablemodel",
      "https://linkedin.com/company/inflatablemodel",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function WebSiteSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "inflatablemodel",
    url: "https://www.qddjtx.com",
    description:
      "B2B custom inflatable manufacturer: giant product replicas, mascots, arches, costumes, tents, and games. 3-6 week turnaround, free 3D renderings.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.qddjtx.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
