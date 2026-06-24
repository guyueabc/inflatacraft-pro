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

export interface ProductFAQ {
  question: string;
  answer: string;
}

export interface ComparisonRow {
  feature: string;
  inflatablemodel: string;
  budgetAlternative: string;
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
  // GEO fields
  geoSummary?: string;
  faqs?: ProductFAQ[];
  comparison?: ComparisonRow[];
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

// Shared comparison data for all products
const STANDARD_COMPARISON: ComparisonRow[] = [
  { feature: "Material Quality", inflatablemodel: "210D–500D Oxford/Cordura nylon (commercial grade)", budgetAlternative: "70D thin polyester (single-season)" },
  { feature: "Print Durability", inflatablemodel: "UV-resistant digital print, 3–5 yr fade resistance", budgetAlternative: "Basic silk-screen, fades in 3–6 months" },
  { feature: "Lead Time", inflatablemodel: "2–6 weeks with 98% on-time delivery", budgetAlternative: "6–16 weeks, frequent delays" },
  { feature: "Warranty", inflatablemodel: "2–3 years covering seams & print", budgetAlternative: "30-day or none" },
  { feature: "Design Support", inflatablemodel: "Free 3D renderings before purchase", budgetAlternative: "No pre-sale design service" },
  { feature: "After-Sales", inflatablemodel: "Dedicated project manager + repair kits", budgetAlternative: "No support after delivery" },
];

export const products: Product[] = [
  // ---- PRODUCT REPLICAS ----
  {
    id: "prod-001",
    name: "Giant Soda Can Replica",
    slug: "giant-soda-can-replica",
    description:
      "Oversized beverage can replica perfect for trade shows, stadium promotions, and retail displays. UV-resistant printing for long-lasting outdoor use.",
    longDescription:
      "Our Giant Soda Can Replica is a show-stopping promotional inflatable that commands attention at any event. Standing at an impressive height, this fully custom inflatable features photo-realistic UV-resistant printing that maintains vibrant colors even under harsh sunlight. The durable 210D oxford nylon construction ensures years of reliable use, while the internal LED lighting system makes it visible day and night. Ideal for beverage brands, sporting events, concert venues, and retail grand openings. Each unit includes tie down stakes, repair kit, and heavy-duty blower with GFCI protection.",
    geoSummary:
      "The Giant Soda Can Replica by inflatablemodel is a 15-foot tall custom inflatable beverage can with UV-resistant digital printing, 210D Oxford nylon construction, and optional internal LED lighting. It is designed for beverage brands, stadiums, trade shows, and retail grand openings that need high-impact visual advertising. Production takes 3–4 weeks and includes blower, stakes, and repair kit.",
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
    comparison: STANDARD_COMPARISON,
    faqs: [
      {
        question: "Can I get a 15-foot tall soda can replica with my brand logo printed on all sides for a trade show next month?",
        answer: "Yes. The Giant Soda Can Replica is available at 15 ft tall with full-wrap UV-resistant digital printing on all sides. Standard production is 3–4 weeks. If your trade show is sooner, rush production (7–14 days) is available. We provide free 3D renderings within 48 hours so you can approve the design before production begins.",
      },
      {
        question: "Will the colors fade if I use this inflatable outdoors for multiple events?",
        answer: "No. We use UV-resistant digital print technology rated for 3–5 years of outdoor use without significant fading. The 210D Oxford nylon substrate is also water-repellent and fire-retardant certified. Many clients use the same replica across 50+ events over several years with minimal wear.",
      },
      {
        question: "How long does it take to set up and take down the giant soda can at an event?",
        answer: "Setup takes approximately 10–15 minutes with one person. The included 110V/750W blower inflates the unit in 3–5 minutes; the remaining time is for positioning and securing with the included tie-down stakes. Takedown and packing into the storage bag takes about 15 minutes.",
      },
    ],
  },
  {
    id: "prod-002",
    name: "Pharma Pill Bottle Inflatable",
    slug: "pharma-pill-bottle-inflatable",
    description:
      "Massive pharmaceutical product replica for medical conferences and healthcare marketing events. Custom label printing available.",
    geoSummary:
      "The Pharma Pill Bottle Inflatable is a 12-foot tall custom inflatable pill bottle designed for pharmaceutical companies, medical conferences, and healthcare marketing campaigns. It features full-color sublimation printing with custom label artwork, 210D Oxford nylon construction, and a 4–5 week production lead time. Ideal for drug launches, medical trade shows, and hospital promotional events.",
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
    comparison: STANDARD_COMPARISON,
    faqs: [
      {
        question: "Can you print our drug name and dosage information on the pill bottle label?",
        answer: "Yes. We offer custom label printing with your exact drug name, dosage, NDC code, and brand colors. We use Pantone matching for precise color reproduction. You provide the label artwork (vector preferred) and we handle the rest. Free 3D rendering approval before production.",
      },
      {
        question: "Is the material suitable for indoor medical conference environments?",
        answer: "Yes. Our 210D Oxford nylon is fire-retardant certified (meets NFPA 701 standards), which is required by most convention centers. The material is also phthalate-free and safe for indoor use. We can provide material certification documents for venue compliance on request.",
      },
      {
        question: "We need this for a product launch in 5 weeks — can you meet that deadline?",
        answer: "Yes. Standard production for the pharma pill bottle is 4–5 weeks. We have a 98% on-time delivery rate and can provide rush production if needed. Contact us with your exact launch date and we will confirm a guaranteed delivery date in your quote within 24 hours.",
      },
    ],
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
    geoSummary:
      "The Custom Brand Mascot by inflatablemodel is a fully custom inflatable mascot built from your character artwork, available in 8–20 ft heights with full-color digital printing. It is constructed with 210D Oxford nylon and reinforced seams for outdoor use, with a production lead time of 4–6 weeks. Ideal for sports teams, schools, corporate events, and brand activations requiring a larger-than-life character presence.",
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
    comparison: STANDARD_COMPARISON,
    faqs: [
      {
        question: "Can you make a 15-foot inflatable version of our company mascot from our logo artwork?",
        answer: "Yes. Our Custom Brand Mascot is built directly from your character artwork. You provide vector files (AI, EPS, SVG) or even a sketch, and our design team creates a 3D rendering for approval within 48 hours. Heights range from 8 to 20 feet. We match Pantone colors precisely and include free design revisions until you are satisfied.",
      },
      {
        question: "How durable is the mascot for outdoor use at multiple events throughout the year?",
        answer: "Extremely durable. We use 210D Oxford nylon with reinforced seams rated for continuous outdoor use. The full-color digital print is UV-resistant for 3–5 years. With proper care and storage, our mascots typically last 5+ years across dozens of events. Every unit includes a repair kit for minor field repairs.",
      },
      {
        question: "Do you offer internal lighting so the mascot can be used at night events?",
        answer: "Yes. We offer both internal and external LED lighting systems, including RGB programmable options. Internal lighting makes the mascot visible and impactful after dark. The lighting system is integrated during production and powered by the same 110V blower system or a separate low-voltage supply.",
      },
    ],
  },
  {
    id: "prod-004",
    name: "Dancing Tube Man",
    slug: "dancing-tube-man",
    description:
      "Classic attention-grabbing dancing inflatable tube man. Available in multiple colors and heights for retail and automotive promotions.",
    geoSummary:
      "The Dancing Tube Man by inflatablemodel is a classic attention-grabbing inflatable tube man available in 10, 15, and 20 ft heights with solid color or custom printing. Made with 190T polyester and powered by a 110V/350W blower, it ships in 1–2 weeks. Ideal for car dealerships, retail grand openings, gas stations, and sidewalk promotions that need immediate foot traffic.",
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
    comparison: STANDARD_COMPARISON,
    faqs: [
      {
        question: "Can I get a 20-foot dancing tube man with my car dealership logo printed on it?",
        answer: "Yes. The Dancing Tube Man is available in 10, 15, and 20 ft heights with either solid colors or custom printing including logos, text, and brand colors. Production takes 1–2 weeks. The 190T polyester material is rated for outdoor use and includes a 350W blower, stakes, and carry bag.",
      },
      {
        question: "How long do these tube men last with daily outdoor use at a car dealership?",
        answer: "With daily outdoor use, our dancing tube men typically last 6–12 months before needing replacement. The 190T polyester is durable but the constant motion creates wear over time. We include a repair kit for small tears. Many dealerships order 2–3 units to rotate and extend overall lifespan.",
      },
      {
        question: "What is the power requirement and can it run all day?",
        answer: "The included 110V / 350W blower runs continuously on standard household power. It is designed for all-day operation. Power consumption is approximately 3.5 kWh per 10-hour day, costing under $1/day in electricity. The blower has a thermal cutoff for safety protection.",
      },
    ],
  },
  // ---- ARCHES ----
  {
    id: "prod-005",
    name: "Finish Line Arch",
    slug: "finish-line-arch",
    description:
      "Custom-branded inflatable arch for races, marathons, triathlons, and charity events. Quick setup and takedown.",
    geoSummary:
      "The Finish Line Arch by inflatablemodel is a 14-foot tall custom-branded inflatable arch with a 25-foot span, designed for races, marathons, triathlons, and charity events. It features full-color UV-resistant printing on 210D Oxford nylon, dual blower system, and a 3–4 week production lead time. Includes everything needed for quick setup and takedown at outdoor events.",
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
    comparison: STANDARD_COMPARISON,
    faqs: [
      {
        question: "Can I get a finish line arch with our marathon sponsor logos printed on both sides for a race in 4 weeks?",
        answer: "Yes. The Finish Line Arch supports full-color UV printing on both sides with multiple sponsor logos. At 14 ft tall with a 25 ft span, it provides maximum visibility for start/finish lines. Standard production is 3–4 weeks. We provide free 3D renderings showing exactly how your logos will appear before production.",
      },
      {
        question: "How do you secure the arch in windy outdoor conditions?",
        answer: "The arch includes heavy-duty tie-down stakes and anchor straps rated for winds up to 25 mph. For higher wind conditions, we recommend adding water ballast bags (available as accessories). The dual blower system maintains structural rigidity. Setup takes approximately 20–30 minutes with two people.",
      },
      {
        question: "Can the arch be reused for multiple races throughout the year?",
        answer: "Absolutely. The 210D Oxford nylon construction with UV-resistant printing is designed for repeated outdoor use. With proper storage between events (cool, dry place, fully deflated), the arch will last 3–5 years across dozens of races. A repair kit is included for any minor field repairs.",
      },
    ],
  },
  {
    id: "prod-006",
    name: "Helmet Tunnel Arch",
    slug: "helmet-tunnel-arch",
    description:
      "Sports team entry tunnel shaped like a giant helmet. Used by NFL, NCAA, and high school teams for dramatic player entrances.",
    geoSummary:
      "The Helmet Tunnel Arch by inflatablemodel is an 18-foot tall, 30-foot wide, 40-foot deep custom inflatable helmet tunnel designed for dramatic player entrances at football games and sporting events. It features 500D Cordura nylon construction, full-color UV print with matte laminate, and a 5–6 week production lead time. Used by NFL, NCAA, and high school teams nationwide.",
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
    comparison: STANDARD_COMPARISON,
    faqs: [
      {
        question: "Can you make a helmet tunnel in our football team colors with our logo for player entrances?",
        answer: "Yes. The Helmet Tunnel Arch is fully custom — we build it in your team colors with your logo, mascot, and any text. We use 500D Cordura nylon (the most durable in our lineup) with full-color UV print and matte laminate for a premium finish. Production takes 5–6 weeks. Free 3D renderings are provided before production.",
      },
      {
        question: "How many blowers does the helmet tunnel need and what power is required at a stadium?",
        answer: "The tunnel requires 3 x 1HP blowers running on 110V power. Most stadiums and fields have appropriate power available. We provide all blower systems, stakes, and anchor straps. The industrial blower system inflates the tunnel in 8–10 minutes. A dedicated 20A circuit is recommended for each blower.",
      },
      {
        question: "Can the entire football team run through the tunnel at the same time?",
        answer: "Yes. At 18 ft tall, 30 ft wide, and 40 ft deep, the tunnel easily accommodates a full football team (50+ players) running through simultaneously. The 500D Cordura nylon construction handles the physical impact. The tunnel is designed specifically for high-energy player entrances and has been used by NFL and NCAA programs.",
      },
    ],
  },
  // ---- COSTUMES ----
  {
    id: "prod-007",
    name: "Inflatable Character Costume",
    slug: "inflatable-character-costume",
    description:
      "Wearable inflatable costume with integrated battery-powered fan. Ideal for mascot appearances, parades, and promotional events.",
    geoSummary:
      "The Inflatable Character Costume by inflatablemodel is a wearable inflatable costume with integrated battery-powered fan, fitting heights from 5'2\" to 6'4\". Made with ripstop polyester and full-color digital print, it runs 4–6 hours on a rechargeable Li-Ion battery. Production takes 2–3 weeks. Ideal for mascot appearances, parades, trade show booth attractions, and promotional events.",
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
    comparison: STANDARD_COMPARISON,
    faqs: [
      {
        question: "Can I get a wearable inflatable costume of our brand character for a trade show booth?",
        answer: "Yes. The Inflatable Character Costume is custom-printed with your brand character design. It fits wearers from 5'2\" to 6'4\" and runs 4–6 hours on the rechargeable battery. The ripstop polyester with full-color digital print is lightweight and comfortable for extended wear. Production takes 2–3 weeks.",
      },
      {
        question: "How hot does it get inside the costume during a 4-hour event?",
        answer: "The integrated battery-powered fan provides continuous air circulation, keeping the wearer comfortable for 4–6 hours. The ripstop polyester is breathable. For longer events, we include a spare battery so you can swap without interruption. The fan is quiet and will not interfere with conversations.",
      },
      {
        question: "Is the costume washable after events?",
        answer: "Yes. The ripstop polyester exterior can be spot-cleaned with mild soap and warm water. Do not machine wash or dry clean. Allow to air dry completely before storing. With proper care, the costume will last through many events. A carry bag is included for transport and storage.",
      },
    ],
  },
  {
    id: "prod-008",
    name: "Gorilla Mascot Suit",
    slug: "gorilla-mascot-suit",
    description:
      "Realistic inflatable gorilla suit with articulated arms and cooling fan. A viral marketing sensation for any brand activation.",
    geoSummary:
      "The Gorilla Mascot Suit by inflatablemodel is a realistic wearable inflatable gorilla costume with articulated arms and integrated cooling fan, fitting heights up to 6'6\". Made with 420D Oxford nylon and realistic digital print, it runs 5–7 hours on a rechargeable battery. Production takes 2–3 weeks. Ideal for viral marketing campaigns, brand activations, parades, and social media content.",
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
    comparison: STANDARD_COMPARISON,
    faqs: [
      {
        question: "How realistic does the gorilla suit look in person and in photos for social media?",
        answer: "Very realistic. We use high-resolution digital printing on 420D Oxford nylon to achieve lifelike fur texture and facial details. The articulated arms allow natural movement. Many clients use this suit for viral social media content — it photographs and videos extremely well. Free 3D renderings are available before purchase.",
      },
      {
        question: "Can the person inside see clearly and walk safely in the gorilla suit?",
        answer: "Yes. The helmet provides a wide field of vision through a concealed mesh panel. The suit is designed for safe walking and moderate physical activity. Articulated arms allow natural arm movement. The integrated cooling fan keeps the wearer comfortable for 5–7 hours. We recommend a spotter for crowded environments.",
      },
      {
        question: "What is included with the gorilla mascot suit?",
        answer: "The complete set includes: inflatable gorilla suit, helmet with visor, gloves, shoe covers, battery-powered fan, and charger. Everything packs into the included carry bag for transport. The rechargeable battery provides 5–7 hours of continuous use. A repair kit is also included for minor field repairs.",
      },
    ],
  },
  // ---- TENTS ----
  {
    id: "prod-009",
    name: "Custom Inflatable Event Tent",
    slug: "custom-inflatable-event-tent",
    description:
      "Fully branded inflatable tent for outdoor events, farmers markets, and brand activations. No poles needed — inflates in minutes.",
    geoSummary:
      "The Custom Inflatable Event Tent by inflatablemodel is a 10-foot interior height, 15x15 ft fully branded inflatable tent for outdoor events, farmers markets, and brand activations. Made with 420D Oxford nylon and UV-resistant full-color print, it inflates in minutes with no poles. Production takes 4–5 weeks. Ideal for companies needing a portable, reusable, high-visibility brand presence at outdoor events.",
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
    comparison: STANDARD_COMPARISON,
    faqs: [
      {
        question: "Can I get a 15x15 inflatable tent with our company logo on all four sides for outdoor trade shows?",
        answer: "Yes. The Custom Inflatable Event Tent supports full-color UV-resistant printing on all sides including the roof. At 15x15 ft with a 10 ft interior height, it provides 225 sq ft of branded space. Production takes 4–5 weeks. We provide 3D renderings showing your branding on the tent before production begins.",
      },
      {
        question: "How does the inflatable tent compare to a traditional pop-up canopy tent?",
        answer: "Inflatable tents offer significantly more interior space (no center pole), higher visual impact (full custom printing on all surfaces), and faster setup (inflates in 5 minutes with the included blower). The 420D Oxford nylon is more durable than standard pop-up canopy fabric. The trade-off is higher cost and weight (75 lbs vs 40 lbs), but the branding impact is far superior.",
      },
      {
        question: "Can the tent withstand wind and rain at outdoor events?",
        answer: "Yes. The tent is secured with included heavy-duty stakes and anchor straps rated for winds up to 20 mph. For higher winds, water ballast bags are recommended. The 420D Oxford nylon is water-repellent and UV-resistant. The 1HP blower maintains constant air pressure to keep the tent rigid. We recommend deflating if winds exceed 30 mph.",
      },
    ],
  },
  {
    id: "prod-010",
    name: "Pop-Up Dome Canopy",
    slug: "pop-up-dome-canopy",
    description:
      "Geodesic inflatable dome for immersive brand experiences, VR demos, and VIP lounges. Climate-controlled and fully enclosed.",
    geoSummary:
      "The Pop-Up Dome Canopy by inflatablemodel is a 12-foot tall, 20-foot diameter geodesic inflatable dome for immersive brand experiences, VR demos, and VIP lounges. Made with 500D PVC-coated polyester with custom exterior graphics and integrated LED lighting, it is fully enclosed and climate-controllable. Production takes 5–6 weeks. Ideal for brands needing a premium, enclosed activation space at large events.",
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
    comparison: STANDARD_COMPARISON,
    faqs: [
      {
        question: "Can the dome be fully enclosed for VR demonstrations and climate-controlled experiences?",
        answer: "Yes. The Pop-Up Dome Canopy is fully enclosed with 500D PVC-coated polyester walls. It supports climate control integration (AC or heating units) and is ideal for VR demonstrations, gaming lounges, and premium VIP experiences. The included LED lighting system creates an immersive interior environment. Custom exterior graphics provide maximum brand visibility outside.",
      },
      {
        question: "How many people can fit inside the 20-foot dome for a brand experience?",
        answer: "The 20-foot diameter dome provides approximately 314 sq ft of interior space. Comfortably fits 15–25 people standing for a brand experience, or 8–12 people seated for presentations or VR demos. The 12-foot ceiling height provides an open, spacious feel. The dome inflates in 10–12 minutes with the 1.5HP blower.",
      },
      {
        question: "Can the dome graphics be changed for different events or campaigns?",
        answer: "Yes. The exterior graphics are printed on removable panels that attach via heavy-duty Velcro. You can order additional graphic sets for different campaigns and swap them in 20–30 minutes. This makes the dome reusable across multiple brand activations with different themes. Custom graphic panels are available for separate purchase.",
      },
    ],
  },
  // ---- GAMES ----
  {
    id: "prod-011",
    name: "Inflatable Obstacle Course",
    slug: "inflatable-obstacle-course",
    description:
      "Custom-branded inflatable obstacle course for corporate team building, festivals, and sporting events. Modular design.",
    geoSummary:
      "The Inflatable Obstacle Course by inflatablemodel is a 14-foot tall, 15-foot wide, 60-foot long custom-branded inflatable obstacle course with modular design. Made with 500D PVC-coated polyester and full-color UV print, it includes an industrial blower system. Production takes 5–6 weeks. Ideal for corporate team building, festivals, sporting events, and large-scale brand activations requiring interactive engagement.",
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
    comparison: STANDARD_COMPARISON,
    faqs: [
      {
        question: "Can you build a custom obstacle course with our company branding for a corporate team building event?",
        answer: "Yes. The Inflatable Obstacle Course is fully custom — we design the obstacle sequence and branding around your event theme. At 60 feet long with 500D PVC-coated polyester, it handles high volumes of participants. We print your logos, event hashtags, and company colors throughout. Production takes 5–6 weeks. Free 3D renderings before production.",
      },
      {
        question: "How many people can use the obstacle course simultaneously and what is the throughput?",
        answer: "The 60-foot course supports 2–4 participants simultaneously in a relay format. Expected throughput is 60–100 participants per hour depending on the obstacle complexity. The modular design allows us to add or remove sections to adjust length and difficulty. The 500D PVC-coated polyester construction handles continuous use by adults without issue.",
      },
      {
        question: "What safety features are included with the obstacle course?",
        answer: "Safety features include: inflated side walls on all sections (preventing falls), non-slip bottom surface, soft-landing zones at the end of each obstacle, anchor stakes rated for high winds, and GFCI-protected blower systems. The industrial blower system (3 x 1.5HP) maintains constant pressure. We provide a setup and safety guide with every order.",
      },
    ],
  },
  {
    id: "prod-012",
    name: "Interactive Dart Board",
    slug: "interactive-dart-board",
    description:
      "Oversized inflatable dart board game with velcro balls. Great for trade show booths, carnivals, and corporate picnics.",
    geoSummary:
      "The Interactive Dart Board by inflatablemodel is a 10x10 foot inflatable dart board game with velcro balls for trade show booths, carnivals, and corporate picnics. Made with 420D Oxford nylon and full-color digital print, it includes 12 velcro balls and a 750W blower. Production takes 3–4 weeks. Ideal for brands needing interactive audience engagement at events.",
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
    comparison: STANDARD_COMPARISON,
    faqs: [
      {
        question: "Can the dart board be customized with our brand colors and logo for a trade show booth?",
        answer: "Yes. The Interactive Dart Board supports full-color digital printing with your brand colors, logo, and custom scoring zones. Many clients replace traditional dart scoring with branded product names or prize tiers. At 10x10 ft, it fits in a standard 10x10 trade show booth space. Production takes 3–4 weeks.",
      },
      {
        question: "How many velcro balls are included and are they safe for all ages?",
        answer: "The game includes 12 velcro balls which are soft, lightweight, and safe for all ages including children. The balls adhere to the hook-and-loop surface of the dart board on impact. Replacement balls are available for purchase. The 420D Oxford nylon surface is designed for thousands of impacts without degradation.",
      },
      {
        question: "How quickly can the dart board game be set up and packed away at events?",
        answer: "The dart board inflates in 3–5 minutes with the included 750W blower. Full setup including anchoring takes approximately 10 minutes with one person. Takedown and packing into the storage bag takes about 10 minutes. The entire system weighs 40 lbs and is easily transportable between events in the included carry bag.",
      },
    ],
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
