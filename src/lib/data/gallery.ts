export interface GalleryDetail {
  slug: string;
  clientName: string;
  industry: string;
  productType: string;
  description: string;
  fullDescription: string;
  gradient: string;
  gradientLight: string;
  features: string[];
  specs: { label: string; value: string }[];
  testimonial: string;
  testimonialAuthor: string;
  testimonialRole: string;
  testimonialCompany: string;
  images: { gradient: string; label: string }[];
  timeline: { phase: string; description: string }[];
  result: string;
}

export const GALLERY_DATA: Record<string, GalleryDetail> = {
  "frostbite-brewing-giant-can": {
    slug: "frostbite-brewing-giant-can",
    clientName: "FrostBite Brewing Co.",
    industry: "Food & Beverage",
    productType: "Product Replicas",
    description:
      "20-foot tall realistic beer can replica for nationwide summer festival tour.",
    fullDescription:
      "FrostBite Brewing approached inflatablemodel with an ambitious vision: a 20-foot tall, photo-realistic replica of their flagship FrostBite Lager can that would tour 18 major summer festivals across the United States. The challenge was creating an inflatable that could withstand the rigors of constant setup, teardown, and transport while maintaining showroom-quality appearance under intense festival lighting conditions 鈥?both day and night.",
    gradient: "from-amber-400 via-orange-500 to-red-500",
    gradientLight: "from-amber-100 via-orange-100 to-red-100",
    features: [
      "20ft total height",
      "UV-resistant dye-sublimated printing",
      "Internal RGB LED lighting system",
      "Rapid inflation (under 3 minutes)",
      "Reinforced base with wind tie-downs",
      "Custom transport case with wheels",
    ],
    specs: [
      { label: "Height", value: "20 ft (6.1 m)" },
      { label: "Diameter", value: "6 ft (1.8 m)" },
      { label: "Inflation Time", value: "< 3 minutes" },
      { label: "Material", value: "210D Oxford Polyester" },
      { label: "Print Method", value: "Dye-Sublimation UV" },
      { label: "Lighting", value: "96 RGB LED array" },
      { label: "Lead Time", value: "4 weeks" },
      { label: "Warranty", value: "2 years" },
    ],
    testimonial:
      "inflatablemodel turned our product into a 30-foot spectacle. The trade show booth traffic tripled, and we landed our biggest retail partner within two weeks of the event. The attention to detail on the can's labeling was extraordinary 鈥?it looked like a real can blown up to impossible proportions.",
    testimonialAuthor: "Marcus Chen",
    testimonialRole: "VP Marketing",
    testimonialCompany: "FrostBite Brewing",
    images: [
      { gradient: "from-amber-500 to-orange-600", label: "Festival Night View" },
      { gradient: "from-amber-300 to-yellow-400", label: "Daytime Setup" },
      { gradient: "from-orange-500 to-red-600", label: "Close-Up Detail" },
      { gradient: "from-amber-400 to-amber-600", label: "Event Crowd Shot" },
    ],
    timeline: [
      {
        phase: "Discovery & Design",
        description:
          "Our design team met with FrostBite's marketing department to understand their festival tour requirements. We produced 3D renderings within 48 hours, iterating on the label positioning and lighting placement to maximize visibility from all angles.",
      },
      {
        phase: "Engineering & Prototyping",
        description:
          "Engineers developed a custom internal frame to maintain the can's cylindrical shape even in windy conditions. A quarter-scale prototype was built and tested for structural integrity, print quality, and LED diffusion.",
      },
      {
        phase: "Production & QA",
        description:
          "Full-scale production commenced with premium 210D oxford polyester. Each panel was dye-sublimated individually for perfect color matching. The integrated LED system was pressure-tested across 100+ inflation cycles.",
      },
      {
        phase: "Delivery & Tour Support",
        description:
          "Delivered in a custom wheeled transport case with full setup documentation. Our support team remained on-call throughout the 18-city tour, providing same-day replacement parts when needed (zero incidents reported).",
      },
    ],
    result:
      "FrostBite Brewing reported a 270% increase in festival booth traffic, 4 major retail distribution deals signed within 90 days, and over 2.3 million social media impressions from festival-goer photos with the can.",
  },

  "apex-motors-finish-arch": {
    slug: "apex-motors-finish-arch",
    clientName: "Apex Motors",
    industry: "Automotive",
    productType: "Arches",
    description:
      "Branded finish-line arch for championship racing series. Twin-tunnel design with reinforced tie-down points.",
    fullDescription:
      "Apex Motors needed a commanding visual centerpiece for their sponsored racing championship series. The finish-line arch had to span 40 feet across the track, withstand high wind conditions, and feature bold branding visible from the grandstands 200 yards away. The twin-tunnel design allowed two lanes of traffic to pass through simultaneously.",
    gradient: "from-blue-600 via-blue-700 to-indigo-800",
    gradientLight: "from-blue-100 via-blue-200 to-indigo-200",
    features: [
      "40ft span width",
      "Twin-tunnel dual-lane design",
      "Category-3 wind rated tie-down system",
      "Reflective brand panels for night visibility",
      "2-hour setup by 2-person crew",
      "Modular sections for transport",
    ],
    specs: [
      { label: "Span Width", value: "40 ft (12.2 m)" },
      { label: "Height", value: "25 ft (7.6 m)" },
      { label: "Wind Rating", value: "Category 3 (130 mph)" },
      { label: "Material", value: "500D Cordura Nylon" },
      { label: "Print Method", value: "UV Direct-to-Fabric" },
      { label: "Setup Crew", value: "2 people, 2 hours" },
      { label: "Lead Time", value: "3 weeks" },
      { label: "Warranty", value: "3 years" },
    ],
    testimonial:
      "The arch withstood 40mph gusts during our final race weekend. Engineers really know what they're doing over there. The twin-tunnel design was a game-changer 鈥?cars could race through while fans took photos on both sides.",
    testimonialAuthor: "Derek Lawson",
    testimonialRole: "Events Director",
    testimonialCompany: "Apex Motors",
    images: [
      { gradient: "from-blue-700 to-indigo-800", label: "Race Day Arch" },
      { gradient: "from-blue-500 to-cyan-500", label: "Night Event" },
      { gradient: "from-blue-600 to-blue-800", label: "Setup Detail" },
      { gradient: "from-indigo-600 to-purple-700", label: "Crowd Perspective" },
    ],
    timeline: [
      {
        phase: "Site Survey & Engineering",
        description:
          "Team visited the racetrack to measure dimensions, assess wind patterns, and determine optimal anchor points. CAD models simulated wind loads up to 150 mph.",
      },
      {
        phase: "Fabrication",
        description:
          "500D Cordura nylon selected for extreme durability. Modular sections designed for compact transport in a single cargo van.",
      },
      {
        phase: "On-Site Installation",
        description:
          "Two-person crew completed full assembly in under 2 hours on race day morning. Wind tie-downs deployed in 15 minutes.",
      },
      {
        phase: "Event Support",
        description:
          "On-site technician monitored conditions throughout the 3-day event. Zero structural issues reported despite gusty conditions.",
      },
    ],
    result:
      "The arch became an iconic part of the race series branding, appearing in ESPN broadcast footage for all 8 championship races. Apex Motors renewed for a 3-year contract with additional arches for new venues.",
  },

  "snapchip-giant-bag": {
    slug: "snapchip-giant-bag",
    clientName: "SnapChip Snacks",
    industry: "CPG",
    productType: "Product Replicas",
    description:
      "Giant chip bag inflatable for supermarket grand openings across 12 states.",
    fullDescription:
      "SnapChip Snacks was launching a new product line and planned a 12-state supermarket grand opening tour. They needed a larger-than-life product replica that would stop shoppers in their tracks and create shareable photo moments. The challenge: the inflatable needed to look delicious up close while being durable enough for daily setup and teardown by store staff.",
    gradient: "from-yellow-300 via-yellow-400 to-orange-400",
    gradientLight: "from-yellow-100 via-amber-100 to-orange-100",
    features: [
      "Photo-realistic food product printing",
      "Weatherproof sealed seams",
      "Compact storage (fits in sedan trunk)",
      "Electric pump included",
      "Internal LED for evening events",
      "Damage-resistant lower panels",
    ],
    specs: [
      { label: "Height", value: "8 ft (2.4 m)" },
      { label: "Width", value: "5 ft (1.5 m)" },
      { label: "Depth", value: "3 ft (0.9 m)" },
      { label: "Material", value: "210D Oxford Polyester" },
      { label: "Print Resolution", value: "720 DPI" },
      { label: "Packaged Weight", value: "32 lbs" },
      { label: "Lead Time", value: "3 weeks" },
      { label: "Quantity", value: "200 units" },
    ],
    testimonial:
      "The giant chip bag was the talk of our grand opening tour. Kids lined up for photos, parents posted on social media 鈥?organic reach went through the roof. Worth every penny. We're already planning the next flavor launch.",
    testimonialAuthor: "Emily Takahashi",
    testimonialRole: "Trade Marketing Lead",
    testimonialCompany: "SnapChip Snacks",
    images: [
      { gradient: "from-yellow-400 to-orange-500", label: "Store Display" },
      { gradient: "from-yellow-300 to-amber-400", label: "Customer Photo Op" },
      { gradient: "from-orange-400 to-red-400", label: "Detail Closeup" },
      { gradient: "from-yellow-400 to-lime-400", label: "Night LED View" },
    ],
    timeline: [
      {
        phase: "Design & Sampling",
        description:
          "Received SnapChip's packaging artwork and created a 3D model within 24 hours. Physical color swatches approved before full production.",
      },
      {
        phase: "Mass Production",
        description:
          "All 200 units produced in 3 weeks using parallel production lines. Each unit individually QC-checked for print alignment and seam integrity.",
      },
      {
        phase: "Distribution",
        description:
          "Units drop-shipped directly to 200 store locations in 12 states. Each package included a setup guide, electric pump, and spare repair kit.",
      },
      {
        phase: "Campaign Results",
        description:
          "Store managers reported 35% higher foot traffic during grand opening weeks compared to previous launches. Over 50,000 social media posts tagged #SnapChipGiantBag.",
      },
    ],
    result:
      "The campaign generated 50,000+ social media posts, 12 million organic impressions, and a 22% sales lift across participating stores in the first month post-launch.",
  },
};
;

export function getGalleryItemBySlug(slug: string): GalleryDetail | undefined {
  return GALLERY_DATA[slug];
}