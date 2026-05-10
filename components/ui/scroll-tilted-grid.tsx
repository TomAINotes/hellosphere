"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
  cubicBezier,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const easeIntoFocus = cubicBezier(0.22, 1, 0.36, 1);
const easeOutOfFocus = cubicBezier(0, 0, 0.58, 1);
const focusEase: [typeof easeIntoFocus, typeof easeOutOfFocus] = [
  easeIntoFocus,
  easeOutOfFocus,
];

export type MaxWidthToken = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "none";
export type GapToken = 4 | 6 | 8 | 10 | 12 | 14;

const MAX_WIDTH_CLASS: Record<MaxWidthToken, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  none: "",
};

const GAP_CLASS: Record<GapToken, string> = {
  4: "gap-4",
  6: "gap-6",
  8: "gap-8",
  10: "gap-10",
  12: "gap-12",
  14: "gap-14",
};

type Side = "L" | "R";

type TileConfig = {
  aspectRatio: string;
  perspective: number;
  maxTilt: number;
  maxBlur: number;
  rounded: string;
};

function Tile({ src, side, config }: { src: string; side: Side; config: TileConfig }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const reduce = useReducedMotion();
  const sign = side === "L" ? -1 : 1;
  const { aspectRatio, perspective, maxTilt, maxBlur, rounded } = config;

  const blur     = useTransform(p, [0, 0.5, 1], [maxBlur, 0, maxBlur], { ease: focusEase });
  const bright   = useTransform(p, [0, 0.5, 1], [0, 1, 0],             { ease: focusEase });
  const contrast = useTransform(p, [0, 0.5, 1], [4, 1, 4],             { ease: focusEase });

  const ty  = useTransform(p, [0, 0.5, 1], ["60%", "0%", "-60%"],  { ease: focusEase });
  const tz  = useTransform(p, [0, 0.5, 1], [120, 0, 120],          { ease: focusEase });
  const rx  = useTransform(p, [0, 0.5, 1], [maxTilt, 0, -maxTilt], { ease: focusEase });
  const rot = useTransform(p, [0, 0.5, 1], [-sign * 3, 0, sign * 3], { ease: focusEase });

  const innerSY = useTransform(p, [0, 0.5, 1], [1.8, 1, 1.8], { ease: focusEase });
  const filter  = useMotionTemplate`blur(${blur}px) brightness(${bright}) contrast(${contrast})`;

  if (reduce) {
    return (
      <figure ref={ref} className="relative z-10 m-0">
        <div className="relative w-full overflow-hidden" style={{ aspectRatio, borderRadius: rounded }}>
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${src}")` }} />
        </div>
      </figure>
    );
  }

  return (
    <motion.figure ref={ref} className="relative z-10 m-0" style={{ perspective, willChange: "transform" }}>
      <motion.div
        className="relative w-full overflow-hidden will-change-[filter,transform]"
        style={{ aspectRatio, borderRadius: rounded, filter, y: ty, z: tz, rotate: rot, rotateX: rx }}
      >
        <motion.div
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{ backgroundImage: `url("${src}")`, scaleY: innerSY, backfaceVisibility: "hidden" }}
        />
      </motion.div>
    </motion.figure>
  );
}

export type ScrollTiltedGridProps = {
  images?: readonly string[];
  loop?: boolean;
  initialCycles?: number;
  aspectRatio?: string;
  maxWidth?: MaxWidthToken;
  gap?: GapToken;
  perspective?: number;
  maxTilt?: number;
  maxBlur?: number;
  rounded?: string;
  className?: string;
};

export function ScrollTiltedGrid({
  images = [],
  loop = false,
  initialCycles = 3,
  aspectRatio = "3/4",
  maxWidth = "none",
  gap = 6,
  perspective = 900,
  maxTilt = 70,
  maxBlur = 8,
  rounded = "1rem",
  className,
}: ScrollTiltedGridProps = {}) {
  const [cycles, setCycles] = useState(loop ? initialCycles : 1);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loop) return;
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => { if (entries.some((e) => e.isIntersecting)) setCycles((c) => c + 2); },
      { rootMargin: "1500px 0px 1500px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [loop]);

  const items = useMemo(
    () => loop ? Array.from({ length: cycles }, () => images).flat() : [...images],
    [loop, cycles, images],
  );

  const config = useMemo<TileConfig>(
    () => ({ aspectRatio, perspective, maxTilt, maxBlur, rounded }),
    [aspectRatio, perspective, maxTilt, maxBlur, rounded],
  );

  const gridClass = [
    "mx-auto w-full grid grid-cols-2 px-6 md:px-10 pb-[clamp(5rem,10vw,9rem)]",
    MAX_WIDTH_CLASS[maxWidth],
    GAP_CLASS[gap],
  ].filter(Boolean).join(" ");

  return (
    <section className={["relative w-full", className].filter(Boolean).join(" ")}>
      <div className={gridClass}>
        {items.map((src, i) => (
          <Tile key={`${i}-${src}`} src={src} side={i % 2 === 0 ? "L" : "R"} config={config} />
        ))}
      </div>
      {loop ? <div ref={sentinelRef} aria-hidden className="h-px w-full" /> : null}
    </section>
  );
}
