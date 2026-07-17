export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  gradient: string;
  imageSrc: string;
  featured: boolean;
}

export type BlogCategory =
  | "All"
  | "How-To Guides"
  | "Product Care";

export const CATEGORIES: BlogCategory[] = [
  "All",
  "How-To Guides",
  "Product Care",
];

export interface BlogSection {
  heading: string;
  content: string[];
  image?: { gradient: string; label: string } | null;
  list?: string[];
  blockquote?: string;
}

export interface BlogDetail {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorBio: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  heroGradient: string;
  sections: BlogSection[];
  relatedPosts: { slug: string; title: string; gradient: string }[];
}

const AUTHOR = "InflatableModel Editorial Team";
const AUTHOR_AVATAR = "IM";
const AUTHOR_BIO =
  "General educational content from InflatableModel. Project specifications, safety requirements, timelines, and commercial terms must be confirmed for each order.";

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "choosing-right-inflatable-type",
    title: "How to Choose the Right Inflatable Type for Your Project",
    excerpt:
      "Compare product replicas, mascots, arches, costumes, and tents by intended use, venue, installation needs, and artwork requirements.",
    category: "How-To Guides",
    author: AUTHOR,
    authorAvatar: AUTHOR_AVATAR,
    date: "2026-05-28",
    readTime: "6 min read",
    gradient: "from-red-500 via-red-600 to-red-700",
    imageSrc: "/images/products/inflatable-mascot/1.jpg",
    featured: true,
  },
  {
    slug: "inflatable-maintenance-guide",
    title: "Custom Inflatable Cleaning, Inspection, and Storage Guide",
    excerpt:
      "A practical checklist for cleaning, drying, inspecting, packing, and storing a custom inflatable between uses.",
    category: "Product Care",
    author: AUTHOR,
    authorAvatar: AUTHOR_AVATAR,
    date: "2026-05-15",
    readTime: "7 min read",
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    imageSrc: "/images/products/inflatable-bounce-house/1.jpg",
    featured: false,
  },
  {
    slug: "designing-effective-inflatable",
    title: "Seven Practical Design Considerations for Custom Inflatables",
    excerpt:
      "Plan proportions, viewing distance, artwork, stability, access points, installation space, and transport before approving a design.",
    category: "How-To Guides",
    author: AUTHOR,
    authorAvatar: AUTHOR_AVATAR,
    date: "2026-05-01",
    readTime: "8 min read",
    gradient: "from-pink-400 via-rose-500 to-red-500",
    imageSrc: "/images/products/inflatable-animals/充气大象_主图.jpg",
    featured: false,
  },
  {
    slug: "inflatable-safety-standards",
    title: "Safety Documentation Questions for Custom Inflatable Projects",
    excerpt:
      "Use this checklist to identify venue rules, anchoring needs, operating limits, electrical requirements, and project-specific documentation before ordering.",
    category: "Product Care",
    author: AUTHOR,
    authorAvatar: AUTHOR_AVATAR,
    date: "2026-04-15",
    readTime: "6 min read",
    gradient: "from-sky-400 via-blue-500 to-cyan-500",
    imageSrc: "/images/products/inflatable-water-slide/1.png",
    featured: false,
  },
];

export const BLOG_DATA: Record<string, BlogDetail> = {
  "choosing-right-inflatable-type": {
    slug: "choosing-right-inflatable-type",
    title: "How to Choose the Right Inflatable Type for Your Project",
    excerpt:
      "Compare common custom inflatable formats using project requirements rather than unsupported performance claims.",
    category: "How-To Guides",
    author: AUTHOR,
    authorBio: AUTHOR_BIO,
    authorAvatar: AUTHOR_AVATAR,
    date: "2026-05-28",
    readTime: "6 min read",
    heroGradient: "from-red-500 via-red-600 to-red-700",
    sections: [
      {
        heading: "Start with the intended use",
        content: [
          "Describe where the inflatable will be used, who will interact with it, how long it will remain installed, and what the audience should see from the main viewing direction.",
          "A product replica emphasizes recognizable shape and artwork. A mascot emphasizes character proportions. An arch defines an entrance or route. A tent combines branded surface area with shelter. A costume introduces movement and therefore requires a different usability review.",
        ],
      },
      {
        heading: "Measure the venue before choosing a size",
        content: [
          "Record available floor area, clear height, access-door dimensions, nearby obstructions, electrical access, and any venue restrictions.",
          "For outdoor use, include the ground surface and expected installation conditions. Anchoring and operating limits must be confirmed for the actual design and site.",
        ],
        list: [
          "Available width, depth, and clear height",
          "Indoor or outdoor use",
          "Ground surface and anchoring options",
          "Access route for delivery and setup",
          "Power availability and cable routing",
          "Venue-specific fire or safety documentation requests",
        ],
      },
      {
        heading: "Prepare artwork and reference files",
        content: [
          "Supply clear reference images and vector artwork when available. Identify which logos, colors, text, and product details must remain legible.",
          "A visual rendering is a design reference. Final dimensions, construction details, accessories, and printed colors should be confirmed in the approved project specification.",
        ],
      },
      {
        heading: "Confirm commercial and delivery details",
        content: [
          "Ask for a written quotation that identifies the included product, accessories, artwork scope, production assumptions, packaging, delivery terms, and any project-specific documentation.",
          "Do not rely on generic website ranges for a custom project. Confirm the deadline and destination before approving production.",
        ],
      },
    ],
    relatedPosts: [
      {
        slug: "designing-effective-inflatable",
        title: "Seven Practical Design Considerations",
        gradient: "from-pink-400 via-rose-500 to-red-500",
      },
      {
        slug: "inflatable-safety-standards",
        title: "Safety Documentation Questions",
        gradient: "from-sky-400 via-blue-500 to-cyan-500",
      },
    ],
  },
  "inflatable-maintenance-guide": {
    slug: "inflatable-maintenance-guide",
    title: "Custom Inflatable Cleaning, Inspection, and Storage Guide",
    excerpt:
      "A general care checklist that should be used together with the instructions supplied for the specific product.",
    category: "Product Care",
    author: AUTHOR,
    authorBio: AUTHOR_BIO,
    authorAvatar: AUTHOR_AVATAR,
    date: "2026-05-15",
    readTime: "7 min read",
    heroGradient: "from-green-500 via-emerald-500 to-teal-500",
    sections: [
      {
        heading: "Follow the product-specific instructions first",
        content: [
          "Materials, inflation systems, electrical components, anchoring, and permitted cleaning methods vary. Use the manual and specification supplied with the product as the primary reference.",
          "If instructions are missing or damage is uncertain, stop using the product and request project-specific guidance before repair or reinstallation.",
        ],
      },
      {
        heading: "Clean with compatible materials",
        content: [
          "Remove loose dirt before wiping the surface. Test any mild cleaning solution on a small hidden area and avoid solvents or abrasive tools unless the product instructions expressly allow them.",
        ],
        list: [
          "Disconnect electrical equipment before cleaning",
          "Do not immerse blowers, lights, or connectors",
          "Avoid dragging printed surfaces across rough ground",
          "Rinse or wipe away cleaning residue",
        ],
      },
      {
        heading: "Dry fully before packing",
        content: [
          "Moisture trapped during storage can damage fabrics, printing, electrical parts, or packaging. Allow all surfaces and internal areas identified by the product instructions to dry before packing.",
        ],
      },
      {
        heading: "Inspect before every installation",
        content: [
          "Check fabric, seams, zippers, valves, attachment points, cables, blowers, lights, anchors, and accessories. Replace or repair damaged components only using a method suitable for the product.",
        ],
      },
      {
        heading: "Store in a suitable location",
        content: [
          "Store the clean, dry product in its protective packaging in a location protected from water, pests, sharp objects, excessive heat, and unauthorized handling.",
        ],
      },
    ],
    relatedPosts: [
      {
        slug: "inflatable-safety-standards",
        title: "Safety Documentation Questions",
        gradient: "from-sky-400 via-blue-500 to-cyan-500",
      },
      {
        slug: "choosing-right-inflatable-type",
        title: "How to Choose the Right Inflatable Type",
        gradient: "from-red-500 via-red-600 to-red-700",
      },
    ],
  },
  "designing-effective-inflatable": {
    slug: "designing-effective-inflatable",
    title: "Seven Practical Design Considerations for Custom Inflatables",
    excerpt:
      "A project-planning checklist for turning reference artwork into a design that can be reviewed before production.",
    category: "How-To Guides",
    author: AUTHOR,
    authorBio: AUTHOR_BIO,
    authorAvatar: AUTHOR_AVATAR,
    date: "2026-05-01",
    readTime: "8 min read",
    heroGradient: "from-pink-400 via-rose-500 to-red-500",
    sections: [
      {
        heading: "1. Define the primary viewing direction",
        content: [
          "Identify where the audience will approach and which face must carry the most recognizable shape, logo, or message.",
        ],
      },
      {
        heading: "2. Design for the available space",
        content: [
          "Use measured venue dimensions and preserve clearance from ceilings, walls, exits, lighting, and other equipment.",
        ],
      },
      {
        heading: "3. Protect recognizable proportions",
        content: [
          "Prioritize the silhouette and distinctive product or character features. Small packaging details may need simplification when translated into a large three-dimensional form.",
        ],
      },
      {
        heading: "4. Plan artwork at the correct scale",
        content: [
          "Provide vector logos and suitable image files. Confirm placement, spelling, and visibility on the rendering before production.",
        ],
      },
      {
        heading: "5. Include installation conditions",
        content: [
          "Indoor and outdoor projects may require different anchoring, bases, access points, or operating instructions. The final solution must be reviewed for the actual site.",
        ],
      },
      {
        heading: "6. Review transport and setup",
        content: [
          "Confirm packed dimensions, weight, access route, crew needs, electrical requirements, and the sequence for installation and removal.",
        ],
      },
      {
        heading: "7. Approve a written specification",
        content: [
          "The visual rendering and written specification should identify the agreed size, materials, artwork, accessories, documentation, and delivery scope before production begins.",
        ],
      },
    ],
    relatedPosts: [
      {
        slug: "choosing-right-inflatable-type",
        title: "How to Choose the Right Inflatable Type",
        gradient: "from-red-500 via-red-600 to-red-700",
      },
      {
        slug: "inflatable-maintenance-guide",
        title: "Cleaning, Inspection, and Storage Guide",
        gradient: "from-green-500 via-emerald-500 to-teal-500",
      },
    ],
  },
  "inflatable-safety-standards": {
    slug: "inflatable-safety-standards",
    title: "Safety Documentation Questions for Custom Inflatable Projects",
    excerpt:
      "A neutral checklist for discussing project-specific safety requirements without implying unverified certification or universal compliance.",
    category: "Product Care",
    author: AUTHOR,
    authorBio: AUTHOR_BIO,
    authorAvatar: AUTHOR_AVATAR,
    date: "2026-04-15",
    readTime: "6 min read",
    heroGradient: "from-sky-400 via-blue-500 to-cyan-500",
    sections: [
      {
        heading: "Identify the product and jurisdiction",
        content: [
          "Requirements depend on the product type, intended use, installation location, venue, and local authority. Ask the venue or responsible authority which documents and standards apply before ordering.",
        ],
      },
      {
        heading: "Document the installation conditions",
        content: [
          "Record indoor or outdoor use, ground surface, available anchors, nearby structures, access restrictions, power supply, supervision, and expected operating environment.",
        ],
      },
      {
        heading: "Request project-specific documents",
        content: [
          "Ask which documents can be supplied for the exact product and order. Do not assume that a generic material statement or website claim satisfies a venue or regulatory requirement.",
        ],
        list: [
          "Product specification and dimensions",
          "Material information relevant to the order",
          "Electrical component information where applicable",
          "Anchoring and setup instructions",
          "Operating limitations and shutdown guidance",
          "Packing, inspection, and maintenance instructions",
        ],
      },
      {
        heading: "Keep approvals and instructions with the product",
        content: [
          "Retain the approved specification, supplied documents, setup instructions, and maintenance records so the responsible operator can review them before each use.",
        ],
      },
    ],
    relatedPosts: [
      {
        slug: "inflatable-maintenance-guide",
        title: "Cleaning, Inspection, and Storage Guide",
        gradient: "from-green-500 via-emerald-500 to-teal-500",
      },
      {
        slug: "designing-effective-inflatable",
        title: "Seven Practical Design Considerations",
        gradient: "from-pink-400 via-rose-500 to-red-500",
      },
    ],
  },
};

export function getBlogPostBySlug(slug: string): BlogDetail | undefined {
  return BLOG_DATA[slug];
}
