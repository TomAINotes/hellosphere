"use client";

import { motion } from "framer-motion";

/** Consistent section header used across all sections. */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  light?: boolean;
}) {
  return (
    <div className="mx-auto mb-14 max-w-3xl text-center md:mb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="eyebrow justify-center"
      >
        {eyebrow}
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className={`font-display mt-6 text-4xl leading-[1.05] tracking-tight md:text-6xl ${light ? "text-white" : "text-black"}`}
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className={`mt-5 text-base leading-relaxed md:text-lg ${light ? "text-white/60" : "text-black/55"}`}
        >
          {description}
        </motion.p>
      )}

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, delay: 0.4 }}
        className="laser-line mx-auto mt-8 w-32 origin-center"
      />
    </div>
  );
}
