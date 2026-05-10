"use client";

/**
 * LoadingScreen — full-page intro that shows on first load, then fades out.
 *
 * Logic:
 *   1. On mount, mark `loading = true`.
 *   2. Wait for: hero video metadata + hero background image preload + a minimum
 *      cinematic delay (so it never flashes too fast).
 *   3. Fade out, then unmount after the fade so it doesn't intercept clicks.
 *
 * Visuals:
 *   - Black background with subtle radial gold glow
 *   - SHON FLASH brand mark with the bolt accent dot
 *   - Three animated loaders (loader-2) — circle, triangle, square
 *   - Tracked-out tagline + animated thin progress bar
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "@/components/ui/loader-2";

const MIN_DURATION_MS = 1000;   // never flash shorter than this
const HARD_CAP_MS     = 2000;   // bail out after this even if assets stall

const ASSETS_TO_PRELOAD = [
  { type: "image" as const, src: "/hero-bg.png" },
  // video intentionally excluded — too slow to preload
];

export default function LoadingScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const start = Date.now();

    const preload = ASSETS_TO_PRELOAD.map((a) => {
      return new Promise<void>((resolve) => {
        if (a.type === "image") {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = a.src;
        } else {
          const v = document.createElement("video");
          v.preload = "metadata";
          v.muted = true;
          v.onloadedmetadata = () => resolve();
          v.onerror = () => resolve();
          v.src = a.src;
        }
      });
    });

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      const elapsed = Date.now() - start;
      const wait = Math.max(MIN_DURATION_MS - elapsed, 0);
      setTimeout(() => setShow(false), wait);
    };

    Promise.all(preload).then(finish);

    // Hard cap so a stalled asset never traps the user
    const cap = window.setTimeout(finish, HARD_CAP_MS);
    return () => window.clearTimeout(cap);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="loading-light fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
          aria-hidden
        >
          {/* Subtle radial gold glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(229,192,123,0.20) 0%, transparent 60%)",
            }}
          />

          {/* Brand mark */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 flex items-center gap-3"
          >
            <span
              className="block h-2 w-2 rounded-full bg-accent"
              style={{
                boxShadow: "0 0 18px 4px rgba(229,192,123,0.65)",
              }}
            />
            <span className="font-display text-2xl tracking-[0.45em] text-black md:text-3xl">
              SHON&nbsp;FLASH
            </span>
          </motion.div>

          {/* Animated loader trio */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative z-10 mt-12 flex items-center gap-6"
          >
            <Loader />
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="relative z-10 mt-12 text-center"
          >
            <div className="text-[10px] uppercase tracking-[0.55em] text-black/55">
              Loading the Experience
            </div>

            {/* Indeterminate progress bar */}
            <div className="mx-auto mt-5 h-[1px] w-44 overflow-hidden bg-black/10">
              <motion.div
                className="h-full w-1/3 bg-gradient-to-r from-transparent via-accent to-transparent"
                animate={{ x: ["-100%", "300%"] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>

          {/* Bottom corner stamp */}
          <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-[0.5em] text-black/35">
            Premium DJ &middot; Live &middot; Curated
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
