"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import SectionHeading from "./SectionHeading";

const REVIEWS = [
  {
    quote:
      "Shon completely ran our wedding. The dance floor was packed from minute one. Every song felt hand-picked for our crowd — even the older guests didn't sit down.",
    name: "Rachel & Daniel",
    type: "Wedding",
    location: "Long Island, NY",
    rating: 5,
  },
  {
    quote:
      "My son's bar mitzvah was the talk of the school for weeks. Shon kept 70 thirteen-year-olds AND their parents on the floor for four straight hours. Pure magic.",
    name: "The Goldstein Family",
    type: "Bar Mitzvah",
    location: "Westchester, NY",
    rating: 5,
  },
  {
    quote:
      "I've thrown a lot of parties. This was different. Shon read the room and adjusted the energy in real time. Best $2,800 I've ever spent on a birthday.",
    name: "Marcus T.",
    type: "Birthday",
    location: "Manhattan, NY",
    rating: 5,
  },
  {
    quote:
      "Hired Shon for our company holiday party expecting standard background DJ. We got a full club experience. Our CEO is still talking about it.",
    name: "Lauren K.",
    type: "Corporate",
    location: "Brooklyn, NY",
    rating: 5,
  },
  {
    quote:
      "We had specific cultural traditions and a non-negotiable timeline. Shon nailed every cue, blended every transition, and kept the energy up the whole night.",
    name: "Priya & Arjun",
    type: "Wedding",
    location: "New Jersey",
    rating: 5,
  },
  {
    quote:
      "The lighting and sound were incredible. Looked and sounded like a real venue, in our backyard. Worth every penny of the All Out package.",
    name: "The Park Family",
    type: "Private Event",
    location: "Greenwich, CT",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section
      id="reviews"
      className="section relative overflow-hidden bg-gradient-to-b from-white via-[#fafafa] to-white"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[400px] w-[80vw] -translate-x-1/2 rounded-full opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(229,192,123,0.18) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Reviews"
          title={<>What Clients <span className="chrome-text">Say</span></>}
          description="Real reactions from weddings, bar/bat mitzvahs, birthdays, and private events."
        />

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="-mx-6 overflow-x-auto pb-4 md:mx-0 md:overflow-visible">
          <div className="flex gap-5 px-6 md:grid md:grid-cols-3 md:gap-6 md:px-0">
            {REVIEWS.map((r, i) => (
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
                whileHover={{ y: -4 }}
                className="glass relative w-[88vw] flex-none p-7 md:w-auto md:p-8"
              >
                {/* Big quote mark */}
                <Quote
                  size={42}
                  className="absolute right-6 top-6 text-laser/15"
                  strokeWidth={1.5}
                />

                {/* Stars */}
                <div className="flex gap-1 text-laser">
                  {Array.from({ length: r.rating }).map((_, idx) => (
                    <Star
                      key={idx}
                      size={14}
                      fill="currentColor"
                      strokeWidth={0}
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="mt-5 text-sm leading-relaxed text-black/80 md:text-base">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>

                {/* Footer */}
                <figcaption className="mt-7 flex items-center gap-3 border-t border-black/10 pt-5">
                  <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-black/12 bg-black/[0.03] font-display text-sm text-black">
                    {r.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-black">
                      {r.name}
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.25em] text-black/45">
                      {r.type} · {r.location}
                    </div>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
