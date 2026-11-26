"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  mode?: "scroll" | "load";
  fadeOnly?: boolean;
};

export default function Reveal({ children, className, delay = 0, mode = "scroll", fadeOnly = false }: RevealProps) {
  const startY = fadeOnly ? 0 : 14;

  return (
    <motion.div
      className={className}
      data-reveal=""
      initial={{ opacity: 0, y: startY }}
      whileInView={mode === "scroll" ? { opacity: 1, y: 0 } : undefined}
      animate={mode === "load" ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, ease: "easeOut", delay: mode === "load" ? delay : Math.min(delay, 0.16) }}
    >
      {children}
    </motion.div>
  );
}
