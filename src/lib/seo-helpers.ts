// SEO utility functions for new pages

export function generateBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "InflatableModel",
    url: "https://www.qddjtx.com",
    description: "Custom inflatable manufacturing - giant product replicas, mascots, arches, costumes, and tents. Made in USA.",
    email: "inflatablemodel@showlovein.com",
    areaServed: "Worldwide",
    knowsAbout: [
      "Custom Inflatables",
      "Giant Product Replicas",
      "Inflatable Mascots",
      "Inflatable Arches",
      "Inflatable Costumes",
      "Inflatable Tents",
      "Inflatable Games",
    ],
  };
}
