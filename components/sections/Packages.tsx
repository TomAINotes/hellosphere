"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import SectionHeading from "./SectionHeading";

const PACKAGES = [
  {
    name: "Basic",
    tagline: "Essential coverage for smaller events",
    features: [
      "Professional DJ booth",
      "2 high-output speakers",
      "2 wireless microphones",
      "Professional DJ gear",
      "Initial planning meeting",
      "Basic MC support",
    ],
    highlighted: false,
  },
  {
    name: "Premium",
    tagline: "Most-booked. Designed to elevate the night.",
    features: [
      "Everything in Basic",
      "Dance floor lighting rig",
      "Upgraded visual setup",
      "Stronger event-flow support",
      "Custom timeline + music planning",
      "Curated party atmosphere",
    ],
    highlighted: true,
  },
  {
    name: "All Out",
    tagline: "Full production. Maximum impact.",
    features: [
      "Everything in Premium",
      "Full production setup",
      "Advanced lighting design",
      "Premium booth presentation",
      "Stronger sound coverage",
      "Wedding-heavy support",
      "Full timeline coordination",
      "Maximum visual impact",
    ],
    highlighted: false,
  },
];

export default function Packages() {
  return (
    <section
      id="packages"
      className="section relative overflow-hidden bg-gradient-to-b from-[#fafafa] via-white to-[#f5f5f7]"
    >
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-50" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Packages"
          title={<>Tailored to <span className="chrome-text">Your Night</span></>}
          description="Three tiers designed around the scale of your event. Custom builds available — just ask."
        />

        <div className="grid items-stretch gap-6 md:grid-cols-3">
          {PACKAGES.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className={`group relative flex flex-col overflow-hidden rounded-2xl ${
                pkg.highlighted
                  ? "glass-strong laser-glow md:scale-[1.04]"
                  : "glass"
              }`}
            >
              {/* Most popular badge */}
              {pkg.highlighted && (
                <div className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full border border-laser/50 bg-laser/10 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-laser-glow backdrop-blur-md">
                  <Sparkles size={11} />
                  Most Popular
                </div>
              )}

              {/* Top accent strip */}
              <div
                className={`h-1 w-full ${
                  pkg.highlighted
                    ? "bg-gradient-to-r from-laser via-laser-glow to-laser"
                    : "bg-gradient-to-r from-transparent via-black/15 to-transparent"
                }`}
              />

              <div className="flex flex-1 flex-col p-7 md:p-9">
                {/* Header */}
                <div>
                  <div className="font-display text-3xl tracking-tight text-black md:text-4xl">
                    {pkg.name}
                  </div>
                  <p className="mt-2 text-sm text-black/55">{pkg.tagline}</p>
                </div>

                {/* Pricing placeholder */}
                <div className="my-7 flex items-baseline gap-2">
                  <span className="text-xs uppercase tracking-[0.3em] text-black/40">
                    From
                  </span>
                  <span className="font-display text-4xl text-black md:text-5xl">
                    {pkg.name === "Basic" ? "$1,500" : pkg.name === "Premium" ? "$2,800" : "$4,500"}
                  </span>
                </div>

                {/* Features */}
                <ul className="flex-1 space-y-3">
                  {pkg.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 text-sm text-black/75"
                    >
                      <span
                        className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full ${
                          pkg.highlighted
                            ? "bg-laser/15 text-laser"
                            : "bg-black/8 text-black/70"
                        }`}
                      >
                        <Check size={12} strokeWidth={3} />
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#book"
                  className={`mt-9 block rounded-full px-6 py-3.5 text-center text-sm font-medium tracking-wide transition ${
                    pkg.highlighted
                      ? "bg-laser text-white hover:bg-laser-glow laser-glow-soft"
                      : "border border-black/15 bg-black/[0.03] text-black hover:bg-black/[0.06] backdrop-blur-md"
                  }`}
                >
                  Book {pkg.name}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-xl text-center text-xs uppercase tracking-[0.3em] text-black/40">
          All packages customizable · Travel + setup quoted separately
        </p>
      </div>
    </section>
  );
}
