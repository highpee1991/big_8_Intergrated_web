"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { motion as motionTokens } from "@/config/theme";

export interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in seconds , pass an increasing value across siblings
   *  for a staggered reveal instead of all children animating at once. */
  delay?: number;
}

/**
 * Shared scroll-reveal wrapper , every section uses this instead of
 * hand-rolling its own Framer Motion variant. Motion should whisper: a
 * short fade + 16px rise, once, respecting prefers-reduced-motion via
 * Framer Motion's built-in handling.
 */
function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: motionTokens.duration.slow, delay, ease: motionTokens.ease }}
    >
      {children}
    </motion.div>
  );
}

export { Reveal };
