"use client";

import { motion } from "framer-motion";
import { Play, Music2, Disc3, Headphones, Cloud } from "lucide-react";
import SectionHeading from "./SectionHeading";

const PLAYLISTS = [
  {
    name: "Original Music",
    count: "12 Tracks",
    icon: Disc3,
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80",
  },
  {
    name: "Live Sets",
    count: "8 Recordings",
    icon: Headphones,
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80",
  },
  {
    name: "Remixes",
    count: "24 Edits",
    icon: Music2,
    cover: "https://images.unsplash.com/photo-1518972559570-7cc1309f3229?w=600&q=80",
  },
  {
    name: "SoundCloud Mixes",
    count: "30+ Mixes",
    icon: Cloud,
    cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&q=80",
  },
];

export default function Music() {
  return (
    <section
      id="music"
      className="section relative overflow-hidden bg-white"
    >
      {/* Ambient laser glow */}
      <div
        className="pointer-events-none absolute -bottom-40 right-0 h-[600px] w-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,42,77,0.10) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          eyebrow="The Sound"
          title={<>Music That <span className="chrome-text">Moves the Room</span></>}
          description="Original productions, live recordings, and curated mixes."
        />

        {/* === Featured release === */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="glass-strong relative overflow-hidden p-6 md:p-10"
        >
          <div className="grid gap-8 md:grid-cols-[280px,1fr] md:gap-12 md:items-center">
            {/* Cover art */}
            <div className="group relative aspect-square w-full max-w-[280px] overflow-hidden rounded-xl shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=85"
                alt="Latest release"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Vinyl-style spinning overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-laser/0 via-transparent to-laser/20 opacity-60" />
              {/* Play button */}
              <button
                aria-label="Play preview"
                className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-laser text-white shadow-[0_0_40px_rgba(255,42,77,0.7)]">
                  <Play size={22} fill="currentColor" className="ml-1" />
                </span>
              </button>
            </div>

            {/* Info */}
            <div>
              <div className="text-[10px] uppercase tracking-[0.4em] text-laser">
                Latest Release
              </div>
              <h3 className="font-display mt-3 text-3xl leading-tight text-black md:text-5xl">
                Midnight Frequency
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-black/65 md:text-base">
                A 6-track exploration of late-night warehouse energy — pulsing
                bass, lush synths, and the kind of drops that reset the dance
                floor. Mastered for clubs, mixed for headphones.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-black/55">
                <span className="rounded-full border border-black/12 bg-black/[0.03] px-3 py-1 uppercase tracking-[0.2em]">
                  House
                </span>
                <span className="rounded-full border border-black/12 bg-black/[0.03] px-3 py-1 uppercase tracking-[0.2em]">
                  Tech
                </span>
                <span className="rounded-full border border-black/12 bg-black/[0.03] px-3 py-1 uppercase tracking-[0.2em]">
                  6 Tracks
                </span>
                <span className="rounded-full border border-black/12 bg-black/[0.03] px-3 py-1 uppercase tracking-[0.2em]">
                  42 min
                </span>
              </div>

              {/* Audio player placeholder */}
              <div className="mt-7 rounded-xl border border-black/10 bg-white p-4 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.15)]">
                <div className="flex items-center gap-4">
                  <button className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-laser text-white transition hover:bg-laser-glow">
                    <Play size={16} fill="currentColor" className="ml-0.5" />
                  </button>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between">
                      <div className="text-sm font-medium text-black">01 — Neon Pulse</div>
                      <div className="text-xs text-black/45">0:48 / 4:12</div>
                    </div>
                    {/* Progress bar */}
                    <div className="mt-2 h-1 overflow-hidden rounded-full bg-black/10">
                      <div className="h-full w-[19%] bg-gradient-to-r from-laser to-laser-glow" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#listen"
                  className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-black/85"
                >
                  Listen on Spotify
                </a>
                <a
                  href="#soundcloud"
                  className="rounded-full border border-black/15 bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-black/[0.04]"
                >
                  SoundCloud →
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* === Playlists grid === */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-12 md:grid-cols-4 md:gap-5">
          {PLAYLISTS.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.a
                key={p.name}
                href={`#${p.name.toLowerCase().replace(/\s+/g, "-")}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-2xl border border-black/8 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.2)]"
              >
                <div className="relative aspect-square overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.cover}
                    alt={p.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  {/* Floating play button */}
                  <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-laser/90 text-white opacity-0 shadow-[0_0_24px_rgba(255,42,77,0.6)] transition-all duration-300 group-hover:opacity-100">
                    <Play size={14} fill="currentColor" className="ml-0.5" />
                  </span>

                  {/* Bottom info — over photo so still white text */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <Icon size={18} className="text-laser-glow" />
                    <div className="mt-2 font-display text-lg leading-tight text-white">
                      {p.name}
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.3em] text-white/65">
                      {p.count}
                    </div>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
