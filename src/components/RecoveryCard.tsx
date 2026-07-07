"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { checkSnapshot, resumeSession } from "@/lib/api";

interface Snapshot {
  task: string;
  emotional_state: string;
  last_thoughts: string[];
}

export default function RecoveryCard() {
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const load = async () => {
      const snap = await checkSnapshot();
      if (snap) {
        setSnapshot(snap);
        setVisible(true);
      }
    };
    load();
  }, []);

  const handleResume = async () => {
    await resumeSession();
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && snapshot && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="fixed top-4 right-4 w-80 bg-surface border border-amber/30 rounded-lg p-4 shadow-glow-strong z-50"
        >
          <p className="text-amber font-mono text-xs mb-2">SIGNAL LOCKED</p>
          <h3 className="text-lg font-bold text-text">{snapshot.task}</h3>
          <p className="text-sm text-muted mt-1">Mood: {snapshot.emotional_state}</p>
          <button
            onClick={handleResume}
            className="mt-3 w-full bg-amber text-bg font-bold py-2 rounded hover:bg-gold transition"
          >
            Tune Back In
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}