"use client";

import { Music2, Mail, AtSign, Play } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-black/8 bg-[#fafafa]">
      {/* Animated laser strip at top */}
      <div className="laser-line" />

      <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1.5fr,1fr,1fr,1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <span
                className="block h-2 w-2 rounded-full bg-accent"
                style={{ boxShadow: "0 0 14px 3px rgba(229,192,123,0.55)" }}
              />
              <span className="font-display text-xl tracking-[0.4em] text-black">
                SHON FLASH
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-black/55">
              Premium DJ experiences for weddings, private events, nightlife,
              and unforgettable celebrations. New York · Worldwide.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {[
                { Icon: AtSign, href: "#", label: "Instagram" },
                { Icon: Music2, href: "#", label: "SoundCloud" },
                { Icon: Play,   href: "#", label: "YouTube" },
                { Icon: Mail,   href: "#contact", label: "Email" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-black/70 transition hover:border-laser/50 hover:bg-laser/10 hover:text-laser"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Columns */}
          {[
            {
              title: "Services",
              links: ["Weddings", "Bar / Bat Mitzvahs", "Private Parties", "Corporate"],
              hash: "#services",
            },
            {
              title: "Explore",
              links: ["Packages", "Music", "Gallery", "Reviews"],
              hash: "#packages",
            },
            {
              title: "Contact",
              links: ["Book Now", "FAQ", "Inquiry Form", "555·SHON·FLASH"],
              hash: "#contact",
            },
          ].map((col) => (
            <div key={col.title}>
              <div className="text-[10px] uppercase tracking-[0.4em] text-laser">
                {col.title}
              </div>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href={col.hash}
                      className="text-sm text-black/65 transition hover:text-black"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-black/8 pt-8 text-[10px] uppercase tracking-[0.3em] text-black/40 md:flex-row">
          <div>© {new Date().getFullYear()} SHON FLASH · All Rights Reserved</div>
          <div>Designed for the dance floor.</div>
        </div>
      </div>
    </footer>
  );
}
