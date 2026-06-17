export interface ProductSpecs {
  height?: string;
  width?: string;
  depth?: string;
  weight?: string;
  material?: string;
  printType?: string;
  turnaround?: string;
  includes?: string;
  power?: string;
  [key: string]: string | undefined;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price?: number;
  category: ProductCategory;
  images: string[];
  specs: ProductSpecs;
  inStock: boolean;
  leadTime?: string;
  featured: boolean;
  isCustom: boolean;
  longDescription?: string;
}

export type ProductCategory =
  | "Product Replicas"
  | "Mascots"
  | "Arches"
  | "Costumes"
  | "Tents"
  | "Games";

export const CATEGORIES: ProductCategory[] = [
  "Product Replicas",
  "Mascots",
  "Arches",
  "Costumes",
  "Tents",
  "Games",
];

export const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Newest", value: "newest" },
] as const;

export const LEAD_TIMES = [
  { label: "1-2 Weeks", value: "1-2" },
  { label: "3-4 Weeks", value: "3-4" },
  { label: "5-6 Weeks", value: "5-6" },
  { label: "Custom", value: "custom" },
] as const;

export const products: Product[] = [
  // ---- PRODUCT REPLICAS ----
  {
    id: "prod-001",
    name: "Giant Soda Can Replica",
    slug: "giant-soda-can-replica",
    description:
      "Oversized beverage can replica perfect for trade shows, stadium promotions, and retail displays. UV-resistant printing for long-lasting outdoor use.",
    longDescription:
      "Our Giant Soda Can Replica is a show-stopping promotional inflatable that commands attention at any event. Standing at an impressive height, this fully custom inflatable features photo-realistic UV-resistant printing that maintains vibrant colors even under harsh sunlight. The durable 210D oxford nylon construction ensures years of reliable use, while the internal LED lighting system makes it visible day and night. Ideal for beverage brands, sporting events, concert venues, and retail grand openings. Each unit includes tie-down stakes, repair kit, and heavy-duty blower with GFCI protection.",
    price: 2495,
    category: "Product Replicas",
    images: ["/images/products/giant-soda-can-replica/giant-soda-can-replica-1.jpg", "/images/products/giant-soda-can-replica/giant-soda-can-replica-2.jpg"],
    specs: {
      height: "15 ft",
      width: "6 ft",
      depth: "6 ft",
      weight: "45 lbs",
      material: "210D Oxford Nylon",
      printType: "UV-Resistant Digital Print",
      turnaround: "3-4 weeks",
      includes: "Blower, stakes, repair kit, storage bag",
      power: "110V / 750W blower",
    },
    inStock: true,
    leadTime: "3-4 weeks",
    featured: true,
    isCustom: false,
  },
  {
    id: "prod-002",
    name: "Pharma Pill Bottle Inflatable",
    slug: "pharma-pill-bottle-inflatable",
    description:
      "Massive pharmaceutical product replica for medical conferences and healthcare marketing events. Custom label printing available.",
    price: 3495,
    category: "Product Replicas",
    images: ["/images/products/pharma-pill-bottle-inflatable/pharma-pill-bottle-inflatable-1.jpg", "/images/products/pharma-pill-bottle-inflatable/pharma-pill-bottle-inflatable-2.jpg"],
    specs: {
      height: "12 ft",
      width: "5 ft",
      depth: "5 ft",
      weight: "38 lbs",
      material: "210D Oxford Nylon",
      printType: "Full-Color Sublimation",
      turnaround: "4-5 weeks",
      includes: "Blower, stakes, repair kit",
    },
    inStock: true,
    leadTime: "4-5 weeks",
    featured: false,
    isCustom: true,
  },
  // ---- MASCOTS ----
  {
    id: "prod-003",
    name: "Custom Brand Mascot",
    slug: "custom-brand-mascot",
    description:
      "Bring your brand character to life with a fully customized inflatable mascot. Perfect for sports teams, schools, and corporate events.",
    longDescription:
      "Our Custom Brand Mascots are designed from your character artwork and brought to life as impressive larger-than-life inflatables. We work directly with your design team to ensure every detail matches your brand guidelines. From cartoon animals to product mascots, our skilled artisans create inflatables that capture personality and movement. Each mascot is constructed with reinforced seams and high-quality materials rated for continuous outdoor use. Available with internal or external blower configurations.",
    category: "Mascots",
    images: ["/images/products/custom-brand-mascot/custom-brand-mascot-1.jpg", "/images/products/custom-brand-mascot/custom-brand-mascot-2.jpg"],
    specs: {
      height: "8-20 ft (custom)",
      material: "210D Oxford Nylon",
      printType: "Full-Color Digital Print",
      turnaround: "4-6 weeks",
      includes: "Blower, stakes, repair kit, storage bag",
    },
    inStock: true,
    leadTime: "4-6 weeks",
    featured: true,
    isCustom: true,
  },
  {
    id: "prod-004",
    name: "Dancing Tube Man",
    slug: "dancing-tube-man",
    description:
      "Classic attention-grabbing dancing inflatable tube man. Available in multiple colors and heights for retail and automotive promotions.",
    price: 499,
    category: "Mascots",
    images: ["/images/products/dancing-tube-man/dancing-tube-man-1.jpg", "/images/products/dancing-tube-man/dancing-tube-man-2.jpg"],
    specs: {
      height: "10 ft / 15 ft / 20 ft",
      width: "3 ft base",
      weight: "22 lbs",
      material: "190T Polyester",
      printType: "Solid Color or Printed",
      turnaround: "1-2 weeks",
      includes: "Blower, stakes, carry bag",
      power: "110V / 350W blower",
    },
    inStock: true,
    leadTime: "1-2 weeks",
    featured: false,
    isCustom: false,
  },
  // ---- ARCHES ----
  {
    id: "prod-005",
    name: "Finish Line Arch",
    slug: "finish-line-arch",
    description:
      "Custom-branded inflatable arch for races, marathons, triathlons, and charity events. Quick setup and takedown.",
    price: 1895,
    category: "Arches",
    images: ["/images/products/finish-line-arch/finish-line-arch-1.jpg", "/images/products/finish-line-arch/finish-line-arch-2.jpg"],
    specs: {
      height: "14 ft",
      width: "25 ft span",
      depth: "4 ft",
      weight: "65 lbs",
      material: "210D Oxford Nylon",
      printType: "Full-Color UV Print",
      turnaround: "3-4 weeks",
      includes: "Dual blowers, stakes, repair kit, storage bag",
    },
    inStock: true,
    leadTime: "3-4 weeks",
    featured: true,
    isCustom: false,
  },
  {
    id: "prod-006",
    name: "Helmet Tunnel Arch",
    slug: "helmet-tunnel-arch",
    description:
      "Sports team entry tunnel shaped like a giant helmet. Used by NFL, NCAA, and high school teams for dramatic player entrances.",
    price: 4995,
    category: "Arches",
    images: ["/images/products/helmet-tunnel-arch/helmet-tunnel-arch-1.jpg", "/images/products/helmet-tunnel-arch/helmet-tunnel-arch-2.jpg"],
    specs: {
      height: "18 ft",
      width: "30 ft",
      depth: "40 ft tunnel",
      weight: "180 lbs",
      material: "500D Cordura Nylon",
      printType: "Full-Color UV with Matte Laminate",
      turnaround: "5-6 weeks",
      includes: "Industrial blower system, stakes, repair kit, storage bags",
      power: "110V / 3 x 1HP blowers",
    },
    inStock: true,
    leadTime: "5-6 weeks",
    featured: true,
    isCustom: true,
  },
  // ---- COSTUMES ----
  {
    id: "prod-007",
    name: "Inflatable Character Costume",
    slug: "inflatable-character-costume",
    description:
      "Wearable inflatable costume with integrated battery-powered fan. Ideal for mascot appearances, parades, and promotional events.",
    price: 699,
    category: "Costumes",
    images: ["/images/products/inflatable-character-costume/inflatable-character-costume-1.jpg", "/images/products/inflatable-character-costume/inflatable-character-costume-2.jpg"],
    specs: {
      height: "Fits 5'2\" – 6'4\"",
      material: "Ripstop Polyester",
      printType: "Full-Color Digital Print",
      turnaround: "2-3 weeks",
      includes: "Costume, battery fan, charger, carry bag",
      power: "Rechargeable Li-Ion battery (4-6 hours)",
    },
    inStock: true,
    leadTime: "2-3 weeks",
    featured: false,
    isCustom: false,
  },
  {
    id: "prod-008",
    name: "Gorilla Mascot Suit",
    slug: "gorilla-mascot-suit",
    description:
      "Realistic inflatable gorilla suit with articulated arms and cooling fan. A viral marketing sensation for any brand activation.",
    price: 899,
    category: "Costumes",
    images: ["/images/products/gorilla-mascot-suit/gorilla-mascot-suit-1.jpg", "/images/products/gorilla-mascot-suit/gorilla-mascot-suit-2.jpg"],
    specs: {
      height: "Fits up to 6'6\"",
      material: "420D Oxford Nylon",
      printType: "Realistic Digital Print",
      turnaround: "2-3 weeks",
      includes: "Suit, helmet, gloves, shoe covers, battery fan, charger",
      power: "Rechargeable battery (5-7 hours)",
    },
    inStock: true,
    leadTime: "2-3 weeks",
    featured: false,
    isCustom: false,
  },
  // ---- TENTS ----
  {
    id: "prod-009",
    name: "Custom Inflatable Event Tent",
    slug: "custom-inflatable-event-tent",
    description:
      "Fully branded inflatable tent for outdoor events, farmers markets, and brand activations. No poles needed — inflates in minutes.",
    price: 3295,
    category: "Tents",
    images: ["/images/products/custom-inflatable-event-tent/custom-inflatable-event-tent-1.jpg", "/images/products/custom-inflatable-event-tent/custom-inflatable-event-tent-2.jpg"],
    specs: {
      height: "10 ft interior",
      width: "15 ft",
      depth: "15 ft",
      weight: "75 lbs",
      material: "420D Oxford Nylon",
      printType: "Full-Color UV-Resistant Print",
      turnaround: "4-5 weeks",
      includes: "Blower, stakes, repair kit, storage bag",
      power: "110V / 1HP blower",
    },
    inStock: true,
    leadTime: "4-5 weeks",
    featured: true,
    isCustom: true,
  },
  {
    id: "prod-010",
    name: "Pop-Up Dome Canopy",
    slug: "pop-up-dome-canopy",
    description:
      "Geodesic inflatable dome for immersive brand experiences, VR demos, and VIP lounges. Climate-controlled and fully enclosed.",
    category: "Tents",
    images: ["/images/products/pop-up-dome-canopy/pop-up-dome-canopy-1.jpg", "/images/products/pop-up-dome-canopy/pop-up-dome-canopy-2.jpg"],
    specs: {
      height: "12 ft",
      width: "20 ft diameter",
      depth: "20 ft diameter",
      weight: "120 lbs",
      material: "500D PVC-Coated Polyester",
      printType: "Custom Exterior Graphics",
      turnaround: "5-6 weeks",
      includes: "Blower, stakes, repair kit, storage bag, LED lighting",
      power: "110V / 1.5HP blower",
    },
    inStock: true,
    leadTime: "5-6 weeks",
    featured: false,
    isCustom: true,
  },
  // ---- GAMES ----
  {
    id: "prod-011",
    name: "Inflatable Obstacle Course",
    slug: "inflatable-obstacle-course",
    description:
      "Custom-branded inflatable obstacle course for corporate team building, festivals, and sporting events. Modular design.",
    price: 8495,
    category: "Games",
    images: ["/images/products/inflatable-obstacle-course/inflatable-obstacle-course-1.jpg", "/images/products/inflatable-obstacle-course/inflatable-obstacle-course-2.jpg"],
    specs: {
      height: "14 ft",
      width: "15 ft",
      depth: "60 ft",
      weight: "350 lbs",
      material: "500D PVC-Coated Polyester",
      printType: "Full-Color UV Print",
      turnaround: "5-6 weeks",
      includes: "Industrial blower system, stakes, repair kit, storage bags",
      power: "110V / 3 x 1.5HP blowers",
    },
    inStock: true,
    leadTime: "5-6 weeks",
    featured: false,
    isCustom: true,
  },
  {
    id: "prod-012",
    name: "Interactive Dart Board",
    slug: "interactive-dart-board",
    description:
      "Oversized inflatable dart board game with velcro balls. Great for trade show booths, carnivals, and corporate picnics.",
    price: 1895,
    category: "Games",
    images: ["/images/products/interactive-dart-board/interactive-dart-board-1.jpg", "/images/products/interactive-dart-board/interactive-dart-board-2.jpg"],
    specs: {
      height: "10 ft",
      width: "10 ft",
      depth: "3 ft",
      weight: "40 lbs",
      material: "420D Oxford Nylon",
      printType: "Full-Color Digital Print",
      turnaround: "3-4 weeks",
      includes: "Blower, stakes, velcro balls, repair kit, storage bag",
      power: "110V / 750W blower",
    },
    inStock: true,
    leadTime: "3-4 weeks",
    featured: false,
    isCustom: false,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, count = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, count)
    .concat(
      products
        .filter(
          (p) =>
            p.id !== product.id &&
            p.category !== product.category
        )
        .slice(0, Math.max(0, count - products.filter((p) => p.id !== product.id && p.category === product.category).length))
    );
}
