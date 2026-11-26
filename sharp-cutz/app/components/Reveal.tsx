"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  mode?: "scroll" | "load";
  fadeOnly?: boolean;
};

export default function Reveal({ children, className, delay = 0, mode = "scroll", fadeOnly = false }: RevealProps) {
  const reducedMotion = useReducedMotion();
  const startY = reducedMotion || fadeOnly ? 0 : 14;

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: startY }}
      whileInView={mode === "scroll" && !reducedMotion ? { opacity: 1, y: 0 } : undefined}
      animate={mode === "load" && !reducedMotion ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, amount: 0.15 }}
      transition={reducedMotion ? { duration: 0 } : { duration: 0.45, ease: "easeOut", delay: mode === "load" ? delay : Math.min(delay, 0.16) }}
    >
      {children}
    </motion.div>
  );
}
