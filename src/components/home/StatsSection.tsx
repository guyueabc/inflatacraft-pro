"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Factory, Users, CalendarCheck, MapPin } from "lucide-react";

interface Stat {
  icon: typeof Factory;
  value: number;
  suffix: string;
  label: string;
}

const STATS: Stat[] = [
  {
    icon: Factory,
    value: 5000,
    suffix: "+",
    label: "Projects Completed",
  },
  {
    icon: Users,
    value: 200,
    suffix: "+",
    label: "Brands Served",
  },
  {
    icon: CalendarCheck,
    value: 20,
    suffix: "+",
    label: "Years Experience",
  },
  {
    icon: MapPin,
    value: 50,
    suffix: "",
    label: "States Shipped",
  },
];

function AnimatedCounter({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          hasAnimated.current = true;

          const duration = 2000; // ms
          const startTime = performance.now();

          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * value));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <span className="font-heading text-4xl font-extrabold text-white md:text-5xl">
        {count.toLocaleString()}
        {suffix}
      </span>
      <p className="mt-1 text-sm text-navy-300">{label}</p>
    </div>
  );
}

export function StatsSection() {
  return (
    <section className="bg-navy-800 py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            By the Numbers
          </h2>
          <p className="mt-4 text-lg text-navy-300">
            Two decades of turning brands into larger-than-life experiences.
          </p>
        </div>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-navy-700 text-red-400">
                <stat.icon className="h-7 w-7" />
              </div>
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
