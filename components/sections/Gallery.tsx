"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import SectionHeading from "./SectionHeading";

/** Mosaic gallery — mixes uploaded project assets with stock event imagery. */
const TILES = [
  {
    type: "image" as const,
    src: "/hero-bg.png",
    label: "SHON FLASH · Stadium",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    type: "image" as const,
    src: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=900&q=85",
    label: "Crowd · Outdoor Festival",
  },
  {
    type: "video" as const,
    src: "https://base44.app/api/apps/6964abb7f5eb650a639257de/files/mp/public/6964abb7f5eb650a639257de/7c1f79c58_Flying_drone_from_image_to_202605091023.mp4",
    label: "Drone · Live Reveal",
    span: "md:col-span-2",
  },
  {
    type: "image" as const,
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&q=85",
    label: "Lights · Mainstage",
  },
  {
    type: "image" as const,
    src: "https://images.unsplash.com/photo-1574391884720-bbc049ec09ad?w=900&q=85",
    label: "Private · Rooftop",
  },
  {
    type: "image" as const,
    src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900&q=85",
    label: "Wedding · First Dance",
    span: "md:col-span-2",
  },
  {
    type: "image" as const,
    src: "https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?w=900&q=85",
    label: "Booth · Closeup",
  },
  {
    type: "image" as const,
    src: "https://images.unsplash.com/photo-1496337589254-7e19d01cec44?w=900&q=85",
    label: "Bar Mitzvah",
  },
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="section relative overflow-hidden bg-white"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Event Moments"
          title={<>From the <span className="chrome-text">Floor</span></>}
          description="A look at recent nights, weddings, and stages — captured in motion."
        />

        <div className="grid auto-rows-[180px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-4 md:gap-4">
          {TILES.map((tile, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.06 }}
              whileHover={{ scale: 1.02 }}
              className={`group relative overflow-hidden rounded-2xl border border-black/8 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.25)] ${tile.span ?? ""}`}
            >
              {tile.type === "image" ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={tile.src}
                  alt={tile.label}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              ) : (
                <video
                  src={tile.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}

              {/* Gradient + label */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              {tile.type === "video" && (
                <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-laser/90 px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] text-white shadow-[0_0_20px_rgba(255,42,77,0.5)]">
                  <Play size={9} fill="currentColor" />
                  Live
                </span>
              )}

              <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
                <div className="text-[10px] uppercase tracking-[0.3em] text-white/85">
                  {tile.label}
                </div>
              </div>

              {/* Hover laser line */}
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-laser to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
