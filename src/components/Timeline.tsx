"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchTimeline } from "@/lib/api";

interface Entry {
  id: string;
  text: string;
  pipelines: string[];
  timestamp: string;
}

export default function Timeline() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [open, setOpen] = useState(false);

  const load = async () => {
    const data = await fetchTimeline();
    setEntries(data.entries || []);
  };

  useEffect(() => {
    load();
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed left-4 top-4 z-50 text-amber hover:text-gold transition"
        title="Transmission Log"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="3" rx="1" fill="currentColor" />
          <rect x="3" y="10" width="18" height="3" rx="1" fill="currentColor" />
          <rect x="3" y="17" width="18" height="3" rx="1" fill="currentColor" />
        </svg>
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="fixed left-0 top-0 h-full w-72 bg-surface/95 backdrop-blur border-r border-amber/20 p-4 z-40 overflow-y-auto"
          >
            <h2 className="text-amber font-mono text-sm mb-4">TRANSMISSION LOG</h2>
            <div className="space-y-3">
              {entries.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-bg/50 p-3 rounded border border-amber/10 hover:border-amber/30 transition"
                >
                  <p className="text-xs text-muted font-mono">{entry.timestamp}</p>
                  <p className="text-sm text-text mt-1 line-clamp-2">{entry.text}</p>
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {entry.pipelines.map((p) => (
                      <span key={p} className="text-xs px-2 py-0.5 rounded-full bg-amber/10 text-amber">
                        {p}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
              {entries.length === 0 && (
                <p className="text-muted text-sm italic">No signals yet. Start broadcasting.</p>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}