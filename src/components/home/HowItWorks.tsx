import { Lightbulb, PenTool, Truck } from "lucide-react";

interface Step {
  number: string;
  icon: typeof Lightbulb;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    number: "01",
    icon: Lightbulb,
    title: "Share Your Requirements",
    description:
      "Send the intended use, approximate size, reference images, artwork, destination, and deadline for project review.",
  },
  {
    number: "02",
    icon: PenTool,
    title: "Review the Proposal",
    description:
      "Review the visual reference, written specification, included accessories, documentation, commercial terms, and requested revisions before approval.",
  },
  {
    number: "03",
    icon: Truck,
    title: "Confirm Production & Delivery",
    description:
      "Production location, inspection scope, lead time, packaging, and delivery arrangements are confirmed in writing for the approved order.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-navy-900 py-12 sm:py-16 md:py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-navy-300">
            A project-specific review from initial requirements to written
            production and delivery confirmation.
          </p>
        </div>

        <div className="relative mt-20">
          {/* Connecting line (desktop) */}
          <div className="absolute left-0 right-0 top-12 hidden h-0.5 bg-gradient-to-r from-red-500 via-red-400 to-red-500 md:block" />

          <div className="relative grid gap-12 md:grid-cols-3">
            {STEPS.map((step) => (
              <div key={step.number} className="relative flex flex-col items-center text-center">
                {/* Step circle */}
                <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full border-4 border-red-500 bg-navy-900">
                  <step.icon className="h-10 w-10 text-red-400" />
                </div>

                {/* Step number badge */}
                <span className="mt-4 inline-block rounded-full bg-red-600 px-3 py-1 text-xs font-bold tracking-wider text-white">
                  STEP {step.number}
                </span>

                <h3 className="mt-4 font-heading text-xl font-bold text-white">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-sm leading-relaxed text-navy-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
