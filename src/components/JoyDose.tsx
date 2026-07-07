"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { requestJoyDose } from "@/lib/api";

export default function JoyDose() {
  const [joyEntries, setJoyEntries] = useState<string[]>([]);
  const [show, setShow] = useState(false);

  const handleJoy = async () => {
    const data = await requestJoyDose();
    setJoyEntries(data.thoughts || []);
    setShow(true);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleJoy}
        className="fixed bottom-24 right-6 w-12 h-12 rounded-full bg-amber text-bg flex items-center justify-center shadow-glow z-40"
        title="Joy Frequency"
      >
        <Sparkles className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-40 right-6 w-72 bg-surface border border-amber/20 rounded-xl p-4 shadow-glow z-40"
          >
            <h3 className="text-gold font-bold mb-2">Joy Signals</h3>
            {joyEntries.length > 0 ? (
              <ul className="space-y-2">
                {joyEntries.map((entry, i) => (
                  <li key={i} className="text-sm text-text bg-bg/50 p-2 rounded">
                    {entry}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted text-sm italic">No joy signals found. Let's create one now.</p>
            )}
            <button
              onClick={() => setShow(false)}
              className="mt-2 text-xs text-amber hover:underline"
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}