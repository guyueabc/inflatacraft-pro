export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQCategory {
  name: string;
  items: FAQItem[];
}

export const FAQ_DATA: FAQCategory[] = [
  {
    name: "Quotes & Orders",
    items: [
      {
        id: "quote",
        question: "How do I request a quote?",
        answer:
          "Submit the online quote form or contact us through WhatsApp. Include the product type, intended use, approximate size, quantity, destination, deadline, artwork, and reference images.",
      },
      {
        id: "price",
        question: "How is pricing determined?",
        answer:
          "Pricing depends on the approved dimensions, shape, material, printing, accessories, quantity, documentation, production scope, and delivery terms. A project-specific quotation is required.",
      },
      {
        id: "minimum",
        question: "What is the minimum order quantity?",
        answer:
          "Minimum quantity and production availability depend on the product and configuration. State the required quantity in the quote request so it can be reviewed.",
      },
      {
        id: "payment",
        question: "Which payment and commercial terms apply?",
        answer:
          "Accepted payment method, deposit, balance, currency, taxes, duties, cancellation terms, and delivery terms must be confirmed in the final quotation or order agreement.",
      },
    ],
  },
  {
    name: "Design & Production",
    items: [
      {
        id: "design-input",
        question: "What information is needed for design review?",
        answer:
          "Provide authorized artwork, reference images, intended use, approximate dimensions, audience interaction, installation environment, destination, and deadline. Available design or rendering support is confirmed per project.",
      },
      {
        id: "materials",
        question: "Which materials are available?",
        answer:
          "Material and construction options depend on the intended use, design, operating environment, documentation requirements, and quotation. Confirm the exact material in the approved specification.",
      },
      {
        id: "schedule",
        question: "How long does production take?",
        answer:
          "The schedule depends on specification approval, order status, complexity, quantity, production availability, and delivery method. No generic website timeline is guaranteed; use the written quotation for the applicable estimate.",
      },
      {
        id: "origin",
        question: "Where is the product manufactured?",
        answer:
          "Production location, inspection scope, material, documentation, packaging, and delivery arrangements are confirmed in writing for each approved order.",
      },
    ],
  },
  {
    name: "Shipping & Documentation",
    items: [
      {
        id: "shipping",
        question: "Do you arrange international shipping?",
        answer:
          "Available delivery methods, freight cost, customs responsibilities, duties, destination access, and risk transfer depend on the order and agreed delivery terms. Confirm them in the quotation.",
      },
      {
        id: "documents",
        question: "Which certificates or reports are included?",
        answer:
          "Requirements vary by product, destination, venue, and intended use. Ask the relevant venue or authority what documents are required, then confirm document availability for the exact quoted configuration before ordering.",
      },
      {
        id: "outdoor",
        question: "Can an inflatable be used outdoors?",
        answer:
          "Outdoor suitability depends on the approved design, material, blower, anchoring, ground conditions, weather, supervision, and product-specific operating limits. Follow the supplied instructions and venue requirements.",
      },
    ],
  },
  {
    name: "Care & Support",
    items: [
      {
        id: "care",
        question: "How should an inflatable be stored?",
        answer:
          "Follow the instructions for the specific product. In general, clean and fully dry it before packing, avoid sharp folds, and store it away from moisture, excessive heat, pests, and sharp objects.",
      },
      {
        id: "warranty",
        question: "What warranty applies?",
        answer:
          "Any warranty, component coverage, exclusions, period, and claim procedure must be stated in the final quotation or written order terms. Do not assume coverage that is not documented for the order.",
      },
      {
        id: "contact",
        question: "How can I contact InflatableModel?",
        answer:
          "Use the online form or the WhatsApp link shown on the website. Response time varies with the request and current queue.",
      },
    ],
  },
];