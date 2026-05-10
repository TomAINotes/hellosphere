"use client";

import SectionHeading from "./SectionHeading";
import { ScrollTiltedGrid } from "@/components/ui/scroll-tilted-grid";

const SERVICE_IMAGES = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=1280&q=80",
  "https://images.unsplash.com/photo-1496337589254-7e19d01cec44?w=1280&q=80",
  "https://images.unsplash.com/photo-1574391884720-bbc049ec09ad?w=1280&q=80",
  "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1280&q=80",
  "https://images.unsplash.com/photo-1571266028243-d220bdcfc0aa?w=1280&q=80",
  "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=1280&q=80",
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1280&q=80",
  "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1280&q=80",
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-white pb-0 overflow-x-hidden"
    >
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-70" />
      <div
        className="pointer-events-none absolute -top-20 left-1/2 h-[500px] w-[80vw] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,42,77,0.10) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-[clamp(5rem,10vw,9rem)] md:px-10">
        <SectionHeading
          eyebrow="What We Do"
          title={<>Premium Sets for <span className="chrome-text">Every Occasion</span></>}
          description="From intimate ceremonies to packed dance floors — every set is curated to match the energy of the moment."
        />
      </div>

      <ScrollTiltedGrid
        images={SERVICE_IMAGES}
        aspectRatio="3/4"
        maxWidth="3xl"
        gap={6}
        perspective={900}
        maxTilt={50}
        maxBlur={8}
        rounded="1rem"
        className="relative z-10"
      />
    </section>
  );
}
