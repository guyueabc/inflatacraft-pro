"use client";

export function OrganizationSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "InflatableModel",
    description: "Custom inflatable product options and project-specific quotation support.",
    url: "https://qddjtx.com",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      url: "https://wa.me/8615376427736",
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />;
}

export function WebSiteSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "InflatableModel",
    url: "https://qddjtx.com",
    description: "Custom inflatable product information and project-specific quotation support.",
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />;
}
