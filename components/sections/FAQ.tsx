"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import SectionHeading from "./SectionHeading";

const FAQS = [
  {
    q: "What equipment do you bring?",
    a: "Every package includes professional-grade DJ booth, full-range speakers, wireless microphones, and backup gear. Premium and All Out add lighting, fog/haze, and visual upgrades.",
  },
  {
    q: "How does the deposit work?",
    a: "A 25% non-refundable deposit secures your date. The balance is due 14 days before the event. We accept Zelle, Venmo, ACH, and major credit cards.",
  },
  {
    q: "Can guests request songs the night of?",
    a: "Absolutely — we love live requests, and reading the room means we'll often play them. We respect your do-not-play list at all times.",
  },
  {
    q: "Do you specialize in weddings?",
    a: "Yes. Wedding sets are coordinated to your timeline — ceremony, cocktail hour, dinner, first dances, and reception each get tailored music programming.",
  },
  {
    q: "Do you travel?",
    a: "Local NY/NJ/CT is included. Destination weddings and out-of-state events are quoted with travel + lodging — we've worked Miami, LA, Vegas, and overseas.",
  },
  {
    q: "What about lighting?",
    a: "Premium includes a dance floor lighting rig. All Out adds intelligent moving heads, uplighting, haze, and a custom monogram if requested.",
  },
  {
    q: "When do you arrive to set up?",
    a: "Standard load-in is 2 hours before guest arrival. Larger productions arrive 3–4 hours early. We always handle setup and breakdown — you just enjoy the night.",
  },
  {
    q: "How do I book?",
    a: "Submit an inquiry below or call directly. We'll schedule a 30-minute planning call, send a contract, and lock your date upon deposit.",
  },
];

const EVENT_TYPES = [
  "Wedding",
  "Bar / Bat Mitzvah",
  "Birthday",
  "Corporate",
  "Private Party",
  "Nightclub",
  "Outdoor / Festival",
  "Other",
];

const PACKAGE_OPTIONS = [
  "Basic",
  "Premium",
  "All Out",
  "Not Sure Yet — Help Me Decide",
];

type FormStatus = "idle" | "sending" | "success" | "error";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <section
      id="contact"
      className="section relative overflow-hidden bg-gradient-to-b from-[#fafafa] via-white to-[#f5f5f7]"
    >
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[80vw] -translate-x-1/2 rounded-full opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,42,77,0.10) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Final Word"
          title={<>Questions, Then <span className="chrome-text">Let's Build It</span></>}
          description="The most-asked questions, then drop us a line. Replies within 24 hours, always."
        />

        <div className="grid gap-10 md:grid-cols-[1fr,1.1fr] md:gap-14">
          {/* === FAQ accordion === */}
          <div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-black/40">
              Frequently Asked
            </div>
            <h3 className="font-display mt-3 text-3xl text-black md:text-4xl">
              The Details
            </h3>

            <div className="mt-7 space-y-2">
              {FAQS.map((f, i) => {
                const isOpen = open === i;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.04 }}
                    className="overflow-hidden rounded-xl border border-black/8 bg-white shadow-[0_8px_24px_-12px_rgba(0,0,0,0.08)]"
                  >
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-black/[0.02]"
                    >
                      <span className="text-sm font-medium text-black md:text-base">
                        {f.q}
                      </span>
                      <Plus
                        size={16}
                        className={`flex-none text-laser transition-transform duration-300 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-5 pb-5 text-sm leading-relaxed text-black/60">
                            {f.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* === Contact form === */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            onSubmit={async (e) => {
              e.preventDefault();
              setFormStatus("sending");
              setErrorMsg("");
              const form = e.currentTarget;
              const data: Record<string, string> = {};
              new FormData(form).forEach((v, k) => { data[k] = v as string; });
              try {
                const res = await fetch("/api/contact", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    date: data.date,
                    eventType: data.eventType,
                    location: data.location,
                    guests: data.guests,
                    pkg: data.package,
                    message: data.message,
                  }),
                });
                const json = await res.json();
                if (!res.ok) throw new Error(json.error ?? "Send failed");
                setFormStatus("success");
                form.reset();
              } catch (err) {
                setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
                setFormStatus("error");
              }
            }}
            className="glass-strong p-7 md:p-9"
          >
            <div className="text-[10px] uppercase tracking-[0.4em] text-laser">
              Lock Your Date
            </div>
            <h3 className="font-display mt-3 text-3xl text-black md:text-4xl">
              Submit an Inquiry
            </h3>
            <p className="mt-3 text-sm text-black/55">
              The more detail, the better the response. We&apos;ll come back
              within 24 hours.
            </p>

            <div className="mt-7 grid gap-4 md:grid-cols-2">
              <Field name="name"     label="Full Name *"      type="text"  required />
              <Field name="email"    label="Email *"          type="email" required />
              <Field name="phone"    label="Phone"            type="tel" />
              <Field name="date"     label="Event Date *"     type="date"  required />

              <Select name="eventType" label="Event Type *" options={EVENT_TYPES} required />
              <Field  name="location"  label="Event Location *" type="text" required />

              <Field name="guests"  label="Estimated Guest Count" type="number" />
              <Select name="package" label="Package Interest" options={PACKAGE_OPTIONS} />
            </div>

            <div className="mt-4">
              <Textarea
                name="message"
                label="Tell us about your event"
                placeholder="Vibe, must-play songs, special moments, anything we should know..."
              />
            </div>

            {formStatus === "success" ? (
              <div className="mt-7 flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/8 px-5 py-4">
                <CheckCircle2 size={18} className="flex-none text-emerald-600" />
                <p className="text-sm text-emerald-700">
                  Inquiry sent! We&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <button
                type="submit"
                disabled={formStatus === "sending"}
                className="laser-glow mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-laser px-8 py-4 text-sm font-medium tracking-wide text-white transition hover:bg-laser-glow disabled:opacity-60"
              >
                {formStatus === "sending" ? (
                  <><Loader2 size={15} className="animate-spin" /> Sending…</>
                ) : (
                  "Send Inquiry →"
                )}
              </button>
            )}

            {formStatus === "error" && (
              <div className="mt-3 flex items-center gap-2 text-sm text-red-600">
                <AlertCircle size={14} className="flex-none" />
                {errorMsg}
              </div>
            )}

            <p className="mt-4 text-center text-[10px] uppercase tracking-[0.3em] text-black/40">
              Or call · 555 · SHON · FLASH
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Form atoms ───────────── */

const INPUT_BASE =
  "w-full rounded-lg border border-black/12 bg-white px-4 py-3 text-sm text-black placeholder-black/30 outline-none transition focus:border-laser/60 focus:bg-white focus:ring-2 focus:ring-laser/15";

function Field({
  name, label, type = "text", required, ...rest
}: { name: string; label: string; type?: string; required?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-black/55">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className={INPUT_BASE}
        {...rest}
      />
    </label>
  );
}

function Select({
  name, label, options, required,
}: { name: string; label: string; options: string[]; required?: boolean }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-black/55">
        {label}
      </span>
      <select
        name={name}
        required={required}
        defaultValue=""
        className={INPUT_BASE}
      >
        <option value="" disabled>Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

function Textarea({
  name, label, placeholder,
}: { name: string; label: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-black/55">
        {label}
      </span>
      <textarea
        name={name}
        rows={4}
        placeholder={placeholder}
        className={`${INPUT_BASE} resize-none`}
      />
    </label>
  );
}
