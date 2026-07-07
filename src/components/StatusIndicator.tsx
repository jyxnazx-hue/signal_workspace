"use client";

import { motion } from "framer-motion";

export default function StatusIndicator() {
  return (
    <div className="fixed top-4 right-4 flex items-center gap-2 z-50">
      <motion.div
        className="w-3 h-3 rounded-full bg-teal"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <span className="text-xs text-muted font-mono">SIGNAL ONLINE</span>
    </div>
  );
}