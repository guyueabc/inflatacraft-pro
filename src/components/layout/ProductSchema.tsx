import type { Product } from "@/lib/data/products";

interface ProductSchemaProps {
  product: Product;
}

export function ProductSchema({ product }: ProductSchemaProps) {
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.geoSummary || product.description,
    image: product.images.slice(0, 10),
    brand: {
      "@type": "Brand",
      name: "InflatableModel",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
