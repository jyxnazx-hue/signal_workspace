"use client";

import { useState } from "react";
import { Mic, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function BroadcastInput({ onSend }: { onSend: (text: string) => void }) {
  const [isListening, setIsListening] = useState(false);
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  return (
    <div className="fixed bottom-8 left-0 right-0 flex flex-col items-center gap-4">
      {/* Signal strength indicator (decorative) */}
      <div className="flex gap-1 items-end h-4">
        {[1, 2, 3].map((bar) => (
          <div
            key={bar}
            className="w-1 bg-amber rounded-full"
            style={{ height: `${bar * 4}px`, opacity: isListening ? 1 : 0.3 }}
          />
        ))}
      </div>

      <div className="flex items-center gap-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative cursor-pointer"
        >
          <motion.button
            className="w-20 h-20 rounded-full bg-surface border-2 border-amber flex items-center justify-center shadow-glow"
            animate={{
              boxShadow: isListening
                ? "0 0 30px rgba(240, 165, 0, 0.6)"
                : "0 0 12px rgba(240, 165, 0, 0.3)",
            }}
            onClick={() => setIsListening(!isListening)}
          >
            <Mic className="w-8 h-8 text-amber" />
          </motion.button>
          {/* Pulsing ring */}
          {isListening && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-amber"
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          )}
        </motion.div>

        {/* Text input that appears when not listening (or could be always visible) */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: isListening ? 0 : 280, opacity: isListening ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="flex items-center bg-surface border border-amber/20 rounded-full px-4 py-3">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What crossed your frequency?"
              className="bg-transparent outline-none text-text placeholder-muted flex-1"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend} className="text-amber hover:text-gold transition">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}