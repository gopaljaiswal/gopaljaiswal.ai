"use client";

import { useEffect, useRef, useState } from "react";
import { TrendingUp } from "lucide-react";
import type { CareerStep } from "@/data/profile";

export function JourneyTimeline({ steps }: { steps: CareerStep[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative mt-12 pb-6 sm:mt-16">
      <svg
        aria-hidden
        viewBox="0 0 800 160"
        preserveAspectRatio="none"
        className="pointer-events-none absolute top-1/2 right-0 left-0 hidden h-40 w-full -translate-y-1/2 lg:block"
      >
        <defs>
          <linearGradient id="journey-wave-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--brand-from)" />
            <stop offset="55%" stopColor="var(--brand-via)" />
            <stop offset="100%" stopColor="var(--brand-to)" />
          </linearGradient>
        </defs>
        <path
          d="M55,108 C90,105 95,95 130,95 C165,95 170,102 205,102
             C240,102 250,80 285,80 C320,80 325,92 360,92
             C395,92 410,60 445,60 C480,60 480,72 515,72
             C550,72 565,44 600,44 C635,44 645,30 680,26"
          fill="none"
          stroke="url(#journey-wave-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          pathLength={100}
          style={{
            strokeDasharray: 100,
            strokeDashoffset: visible ? 0 : 100,
            transition: "stroke-dashoffset 1800ms ease-out",
          }}
        />
      </svg>

      <div className="grid gap-8 lg:grid-cols-7 lg:gap-4">
        {steps.map((step, i) => {
          const isPromotion = i > 0 && steps[i - 1].org === step.org;
          return (
            <div
              key={`${step.org}-${step.role}-${i}`}
              data-idx={i}
              className="journey-node group relative flex flex-col items-start lg:items-center lg:text-center"
              style={{
                transition: "opacity 500ms ease-out, transform 500ms ease-out",
                transitionDelay: `${i * 100}ms`,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(var(--node-y))" : "translateY(calc(var(--node-y) + 16px))",
              }}
            >
              <span
                className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full font-heading text-xs font-semibold text-white shadow-[0_8px_24px_-8px_rgba(0,0,0,0.4)] transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-110"
                style={{ backgroundColor: step.color }}
              >
                {step.initials}
              </span>
              <p className="mt-3 font-heading text-sm tracking-tight transition-colors group-hover:text-primary">
                {step.org}
              </p>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                {isPromotion && <TrendingUp className="size-3 shrink-0 text-emerald-500" />}
                {step.role}
              </p>
              <p className="mt-1 text-xs font-medium text-primary">{step.period}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
