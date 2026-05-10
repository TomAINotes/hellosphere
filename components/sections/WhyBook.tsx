"use client";

import { motion } from "framer-motion";
import {
  Users,
  Mic2,
  Eye,
  Clock,
  Repeat,
  MessageSquare,
  ListMusic,
  Flame,
} from "lucide-react";
import SectionHeading from "./SectionHeading";

const BENEFITS = [
  {
    icon: Users,
    title: "Crowd Control",
    blurb:
      "Reading a room and steering the energy is the difference between a wedding people leave at 10 and one they don't want to end.",
  },
  {
    icon: Mic2,
    title: "MC Presence",
    blurb:
      "Confident announcements, perfect cadence, zero awkward dead air. Your guests always know what's next.",
  },
  {
    icon: Eye,
    title: "Reading the Room",
    blurb:
      "Every song after the first is a response to what just happened on the dance floor. Pre-built playlists don't react.",
  },
  {
    icon: Clock,
    title: "Event Timing",
    blurb:
      "First dances, toasts, cake cutting, hora. Hitting every beat at exactly the right moment so the night flows.",
  },
  {
    icon: Repeat,
    title: "Smooth Transitions",
    blurb:
      "Beat-matched, key-aware mixing. The dance floor never empties because of an awkward gap between tracks.",
  },
  {
    icon: MessageSquare,
    title: "Pro Communication",
    blurb:
      "Clear contracts, fast replies, and a planning meeting that walks through every detail before the day arrives.",
  },
  {
    icon: ListMusic,
    title: "Custom Music Planning",
    blurb:
      "Your must-plays, do-not-plays, and ceremony picks all baked into a tailored set list — never recycled.",
  },
  {
    icon: Flame,
    title: "High-Energy Direction",
    blurb:
      "Knowing when to drop, when to pull back, when to let the room breathe. Every set has an arc.",
  },
];

export default function WhyBook() {
  return (
    <section
      id="why-book"
      className="section relative overflow-hidden bg-gradient-to-b from-[#fafafa] via-white to-[#f5f5f7]"
    >
      {/* Diagonal laser sweep */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          background:
            "linear-gradient(120deg, transparent 30%, rgba(255,42,77,0.10) 50%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Why Book SHON FLASH"
          title={<>More Than <span className="chrome-text">Music</span></>}
          description="A great DJ runs the night. Music is just the soundtrack to everything else that goes right."
        />

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-5">
          {BENEFITS.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: (i % 4) * 0.08 }}
                whileHover={{ y: -4 }}
                className="group glass relative overflow-hidden p-6 md:p-7"
              >
                {/* Hover laser line top */}
                <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-laser to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Icon */}
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-laser/30 bg-laser/10 text-laser transition-all duration-500 group-hover:scale-110 group-hover:bg-laser/20">
                  <Icon size={20} />
                </div>

                <h3 className="font-display mt-5 text-xl text-black md:text-2xl">
                  {b.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-black/55">
                  {b.blurb}
                </p>

                {/* Number stamp */}
                <div className="absolute right-5 top-5 font-display text-3xl text-black/[0.05] md:text-4xl">
                  0{i + 1}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
