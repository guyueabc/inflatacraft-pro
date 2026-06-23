import { cn } from "@/lib/utils";
import { Box, Clock, Flag } from "lucide-react";

interface ValueProp {
  icon: typeof Box;
  title: string;
  description: string;
}

const VALUE_PROPS: ValueProp[] = [
  {
    icon: Box,
    title: "Free 3D Rendering",
    description:
      "See your inflatable before it's built. We create photorealistic 3D renderings at no cost so you can visualize every detail and approve with confidence.",
  },
  {
    icon: Clock,
    title: "3–6 Week Turnaround",
    description:
      "From concept to completion in as little as three weeks. Our streamlined design-to-production pipeline keeps your campaign on schedule without sacrificing quality.",
  },
  {
    icon: Flag,
    title: "Made in USA",
    description:
      "Every inflatable is designed, cut, sewn, and finished domestically using commercial grade materials. You get faster shipping, higher quality control, and U.S. labor standards.",
  },
];

export function ValueProps() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl md:text-4xl">
            Why Choose inflatablemodel?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Three reasons the world's biggest brands trust us with their
            giant inflatables and custom advertising campaigns.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {VALUE_PROPS.map((prop) => (
            <div
              key={prop.title}
              className="group rounded-2xl border border-gray-100 bg-gray-50/50 p-8 transition-all hover:border-navy-200 hover:bg-white hover:shadow-xl"
            >
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-red-50 text-red-600 transition-colors group-hover:bg-red-600 group-hover:text-white">
                <prop.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-6 font-heading text-xl font-bold text-navy-900">
                {prop.title}
              </h3>
              <p className="mt-3 leading-relaxed text-gray-600">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
