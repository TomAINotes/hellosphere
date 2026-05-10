"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar as CalIcon, Loader2 } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { EtherealShadow } from "@/components/ui/etheral-shadow";

type Status = "booked" | "available" | "limited" | "past";

function monthLabel(d: Date) {
  return d.toLocaleString("en-US", { month: "long", year: "numeric" });
}

export default function BookingCalendar() {
  const today = useMemo(() => new Date(), []);
  const [view, setView] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );

  const [bookedDays,  setBookedDays]  = useState<number[]>([]);
  const [limitedDays, setLimitedDays] = useState<number[]>([]);
  const [loading,     setLoading]     = useState(false);

  /* ── Fetch availability from Google Calendar API ── */
  const fetchAvailability = useCallback(async (d: Date) => {
    setLoading(true);
    try {
      const res  = await fetch(
        `/api/availability?year=${d.getFullYear()}&month=${d.getMonth()}`,
      );
      const data = await res.json();
      setBookedDays(data.booked  ?? []);
      setLimitedDays(data.limited ?? []);
    } catch {
      setBookedDays([]);
      setLimitedDays([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAvailability(view); }, [view, fetchAvailability]);

  /* ── Calendar helpers ── */
  const firstDay    = view.getDay();
  const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
  const isCurrentMonth =
    view.getFullYear() === today.getFullYear() &&
    view.getMonth()    === today.getMonth();

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const navigate = (delta: number) =>
    setView(new Date(view.getFullYear(), view.getMonth() + delta, 1));

  function statusFor(day: number): Status {
    if (isCurrentMonth && day < today.getDate()) return "past";
    if (bookedDays.includes(day))  return "booked";
    if (limitedDays.includes(day)) return "limited";
    return "available";
  }

  return (
    <section
      id="availability"
      className="section relative overflow-hidden bg-[#09090f]"
    >
      {/* Ethereal animated background */}
      <div className="pointer-events-none absolute inset-0">
        {/* Futuristic arena image base */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/hero-bg.png')" }}
        />
        {/* Dark gradient over image */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#09090f]/60 via-[#09090f]/40 to-[#09090f]/80" />
        {/* Ethereal liquid shadow — gold */}
        <EtherealShadow
          color="rgba(229,192,123,0.55)"
          animation={{ scale: 72, speed: 28 }}
          noise={{ opacity: 0.35, scale: 1.4 }}
          sizing="fill"
          style={{ position: "absolute", inset: 0 }}
        />
        {/* Second layer — red laser accent */}
        <EtherealShadow
          color="rgba(255,42,77,0.30)"
          animation={{ scale: 55, speed: 20 }}
          noise={{ opacity: 0, scale: 1 }}
          sizing="fill"
          style={{ position: "absolute", inset: 0 }}
        />
        {/* Subtle grid on top */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "linear-gradient(rgba(229,192,123,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(229,192,123,0.15) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Availability"
          title={<>Check the <span className="text-accent">Calendar</span></>}
          description="Live dates pulled from Google Calendar. Submit an inquiry to lock in your date."
          light
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.06] p-6 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.5)] backdrop-blur-2xl md:p-10"
        >
          {/* Month navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20"
              aria-label="Previous month"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex flex-col items-center gap-1">
              <div className="text-[10px] uppercase tracking-[0.4em] text-white/40">
                Viewing
              </div>
              <div className="font-display text-2xl text-white md:text-3xl">
                {monthLabel(view)}
              </div>
              {loading && (
                <div className="flex items-center gap-1.5 text-[10px] text-white/40">
                  <Loader2 size={11} className="animate-spin" />
                  Syncing with Google Calendar…
                </div>
              )}
            </div>

            <button
              onClick={() => navigate(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20"
              aria-label="Next month"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Day-of-week headers */}
          <div className="mt-7 grid grid-cols-7 gap-1.5 text-center text-[10px] uppercase tracking-[0.25em] text-white/40 md:gap-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          {/* Day grid */}
          <div className={`mt-3 grid grid-cols-7 gap-1.5 transition-opacity duration-300 md:gap-2 ${loading ? "opacity-40" : "opacity-100"}`}>
            {cells.map((day, i) => {
              if (day === null) return <div key={i} />;
              const status  = statusFor(day);
              const isToday = isCurrentMonth && day === today.getDate();

              const styles: Record<Status, string> = {
                past:      "border-white/5 bg-white/[0.03] text-white/20",
                available: "border-emerald-400/30 bg-emerald-400/10 text-white/80 hover:bg-emerald-400/20 hover:border-emerald-400/50",
                limited:   "border-amber-400/40 bg-amber-400/15 text-amber-300 hover:bg-amber-400/25",
                booked:    "border-laser/40 bg-laser/20 text-laser line-through cursor-not-allowed",
              };

              return (
                <button
                  key={i}
                  disabled={status === "booked" || status === "past"}
                  onClick={() => {
                    if (status === "available" || status === "limited") {
                      const el = document.getElementById("contact");
                      el?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className={`relative aspect-square rounded-lg border p-1 text-sm transition md:p-2 md:text-base ${styles[status]} ${
                    isToday ? "ring-1 ring-accent/70" : ""
                  }`}
                >
                  <span className="absolute inset-x-0 top-1.5 text-center md:top-2">
                    {day}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs md:gap-6">
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded border border-emerald-400/50 bg-emerald-400/20" />
              <span className="text-white/55">Available — click to book</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded border border-amber-400/50 bg-amber-400/25" />
              <span className="text-white/55">Limited Availability</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded border border-laser/50 bg-laser/20" />
              <span className="text-white/55">Booked</span>
            </span>
          </div>

          {/* CTA */}
          <div className="mt-10 flex flex-col items-center gap-4 border-t border-white/10 pt-8">
            <p className="max-w-md text-center text-sm text-white/50">
              Availability syncs live from Google Calendar. Click any open date
              or submit an inquiry below — we&apos;ll confirm within 24 hours.
            </p>
            <a
              href="#contact"
              className="laser-glow inline-flex items-center gap-2 rounded-full bg-laser px-9 py-4 text-sm font-medium tracking-wide text-white transition hover:bg-laser-glow"
            >
              <CalIcon size={15} />
              Book Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
