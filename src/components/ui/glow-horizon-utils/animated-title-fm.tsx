"use client";

import { motion } from "framer-motion";

export function AnimatedTitleFM({ open }: { open: boolean }) {
  return (
    <motion.h1 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: open ? 1 : 0, y: open ? 0 : 20 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="text-4xl md:text-6xl font-bold text-white z-10 text-center tracking-tight"
    >
      Glow Horizon
    </motion.h1>
  );
}
