"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, RotateCcw, Sparkles, Send, LayoutGrid, ListFilter, X, Pencil, ArrowLeft, Save, FileText } from "lucide-react";

interface LogEntry {
  id: string;
  time: string;
  category: "AI_ML_RESEARCH" | "HACKATHONS" | "DESIGN_SYSTEMS" | "JOY_SIGNALS";
  title: string;
  content: string;
}

export default function Home() {
  // Navigation & View States
  const [currentView, setCurrentView] = useState<"capture" | "full-board">("capture");
  const [showRecentSidebar, setShowRecentSidebar] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [inputText, setInputText] = useState("");

  // Modal States
  const [editingEntry, setEditingEntry] = useState<LogEntry | null>(null);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showJoyModal, setShowJoyModal] = useState(false);

  // Core Structured Datastore
  const [allEntries, setAllEntries] = useState<LogEntry[]>([
    {
      id: "SIG-901",
      time: "10:02:45",
      category: "DESIGN_SYSTEMS",
      title: "ArtRealm Latent Space UI",
      content: "Refining details for the Deep Latent Space navigation sliders. Shifting away from whimsical frameworks to a minimal, typography-focused Alchemist's Sketchbook aesthetic overlay layout."
    },
    {
      id: "SIG-902",
      time: "09:14:12",
      category: "HACKATHONS",
      title: "Agentic Librarian Workspace Sync",
      content: "Implementing state context handlers for the GitLab AI Hackathon to manage runtime execution variables and combat severe semantic drift metrics inside workspace repository logs."
    },
    {
      id: "SIG-903",
      time: "08:30:00",
      category: "AI_ML_RESEARCH",
      title: "PyTorch Inference Scripts",
      content: "Optimizing neural engine script performance profiles for the Meta PyTorch Hackathon solo submission context. Tweaking local dataset loader arrays."
    },
    {
      id: "SIG-904",
      time: "Yesterday",
      category: "JOY_SIGNALS",
      title: "Sunset Reflection & Canine Play",
      content: "Spent clear evening hours resting indoors and playing out in the yard with Sheshu small and Shiro. Caught an incredibly bright, deep amber sunset gradient over the horizon line."
    },
    {
      id: "SIG-905",
      time: "07 Jul 2026",
      category: "AI_ML_RESEARCH",
      title: "High Energy Physics Simulation",
      content: "Working on complex HPC workloads. Caught server drop patterns at the multi-turn session boundary layer. Suspended loop to avoid memory leakage profiles. Core state status: tired."
    }
  ]);

  const handleTransmit = () => {
    if (!inputText.trim()) return;
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];

    const newLog: LogEntry = {
      id: `SIG-${Math.floor(Math.random() * 900) + 100}`,
      time: timeStr,
      category: "AI_ML_RESEARCH",
      title: "Live Transmission Capture",
      content: inputText
    };

    setAllEntries((prev) => [newLog, ...prev]);
    setInputText("");
  };

  const saveEditedEntry = () => {
    if (!editingEntry) return;
    setAllEntries((prev) => prev.map(item => item.id === editingEntry.id ? editingEntry : item));
    setEditingEntry(null);
  };

  const lastEntry = allEntries[0];

  return (
    <div className="min-h-screen bg-[#dedbd3] text-[#3d3a37] font-mono p-6 flex flex-col justify-between select-none relative">

      {/* BACKGROUND TEXTURE SIMULATION */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply bg-[url('https://images.unsplash.com/photo-1587080266227-677cd237c267')] bg-repeat" />

      {/* 📡 TOP INFOBAR PANEL */}
      <header className="w-full flex justify-between items-start border-b border-[#3d3a37]/10 pb-4 mb-6 z-10">
        <div className="space-y-0.5">
          <h1 className="text-xs font-bold tracking-widest text-black uppercase">
            SIGNAL WORKSTATION
          </h1>
          <p className="text-[9px] text-[#3d3a37]/50 uppercase tracking-tight">SYSTEM // NM-31 • STATUS ONLINE</p>
        </div>

        {/* TOP RIGHT PERSISTENT BUTTONS */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowResumeModal(true)}
            className="bg-[#3d3a37] hover:bg-black text-[#dedbd3] text-[10px] uppercase font-bold tracking-wider px-3 py-2 rounded shadow-sm flex items-center space-x-1.5 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Resume</span>
          </button>

          <button
            onClick={() => setShowJoyModal(true)}
            className="bg-white/80 hover:bg-white border border-[#3d3a37]/10 text-black text-[10px] uppercase font-bold tracking-wider px-3 py-2 rounded shadow-sm flex items-center space-x-1.5 transition-colors group"
          >
            <Sparkles className="w-3 h-3 text-[#3d3a37] group-hover:rotate-12 transition-transform" />
            <span>Joy Dose</span>
          </button>


          <button
            onClick={() => setShowRecentSidebar(!showRecentSidebar)}
            className={`border text-[10px] uppercase font-bold tracking-wider px-3 py-2 rounded shadow-sm flex items-center space-x-1.5 transition-colors duration-150 ${showRecentSidebar
                ? "bg-[#3d3a37] text-white border-transparent"
                : "bg-white/80 hover:bg-white border-[#3d3a37]/10 text-black"
              }`}
          >
            <ListFilter className="w-3 h-3" />
            <span>Recent Entries</span>
          </button>
        </div>
      </header>

      {/* 🎛️ CORE WORKSPACE */}
      <div className="w-full flex-1 flex flex-col justify-center items-center z-10 mx-auto">
        <AnimatePresence mode="wait">

          {/* VIEW A: CENTRALIZED CAPTURE COMPONENT SCREEN */}
          {currentView === "capture" ? (
            <motion.div
              key="capture-view"
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              className="w-full max-w-xl bg-[#f4f1ea] border border-[#3d3a37]/10 rounded-2xl p-5 shadow-sm"
            >
              <div className="text-[9px] uppercase tracking-widest text-[#3d3a37]/40 font-bold mb-3">
                Live Broadcast Input
              </div>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleTransmit();
                  }
                }}
                placeholder="What crossed your frequency? Type or use microphone tracking..."
                className="w-full h-24 resize-none bg-transparent text-xs text-black placeholder-black/30 focus:outline-none font-sans font-medium"
              />
              <div className="flex justify-between items-center border-t border-[#3d3a37]/5 pt-3 mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsRecording(!isRecording);
                    if (!isRecording) setInputText("Transcribing vocal audio buffer stream...");
                    else handleTransmit();
                  }}
                  className={`p-2 rounded-full border transition-all ${isRecording ? "bg-[#3d3a37] text-[#dedbd3] border-transparent" : "bg-[#dedbd3]/50 text-black border-black/5 hover:bg-[#dedbd3]"
                    }`}
                >
                  {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  disabled={!inputText.trim()}
                  onClick={handleTransmit}
                  className="px-4 py-2 bg-[#3d3a37] hover:bg-black text-[#dedbd3] text-[10px] uppercase font-bold tracking-wider rounded shadow-sm flex items-center space-x-1.5 transition-colors"
                >
                  <span>Transmit</span>
                  <Send className="w-2.5 h-2.5" />
                </button>
              </div>
            </motion.div>
          ) : (

            /* VIEW B: FULL SCREEN BOARD GRID */
            <motion.div
              key="board-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#dedbd3] p-6 z-30 flex flex-col justify-between"
            >
              <div className="flex justify-between items-center border-b border-[#3d3a37]/10 pb-4 mb-4">
                <button
                  onClick={() => setCurrentView("capture")}
                  className="bg-white/80 hover:bg-white border border-[#3d3a37]/10 text-black text-[10px] uppercase font-bold tracking-wider px-4 py-2 rounded shadow-sm flex items-center space-x-1.5 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Capture Station</span>
                </button>
                <div className="text-[10px] uppercase tracking-widest font-bold text-black bg-black/5 px-3 py-1 rounded">
                  TRANSMISSION GRID MANAGEMENT
                </div>
              </div>

              {/* AUTOMATIC SEGREGATION GRID COLUMNS */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 overflow-hidden h-full mb-4">
                {(["AI_ML_RESEARCH", "HACKATHONS", "DESIGN_SYSTEMS", "JOY_SIGNALS"] as const).map((cat) => (
                  <div key={cat} className="bg-[#f4f1ea] border border-[#3d3a37]/10 rounded-xl p-4 flex flex-col h-full overflow-hidden shadow-sm">
                    <div className="text-[9px] font-bold uppercase tracking-wider text-[#3d3a37]/50 border-b border-[#3d3a37]/5 pb-2 mb-3 flex justify-between items-center">
                      <span>{cat.replace("_", " ")}</span>
                      <span className="bg-[#3d3a37]/10 px-1.5 py-0.5 rounded text-black text-[8px] font-bold">
                        {allEntries.filter(e => e.category === cat).length}
                      </span>
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-2 pr-0.5">
                      {allEntries.filter(e => e.category === cat).map(entry => (
                        <div
                          key={entry.id}
                          onClick={() => setEditingEntry(entry)}
                          className="bg-white border border-black/5 p-3 rounded shadow-sm hover:border-[#3d3a37]/40 cursor-pointer group transition-all"
                        >
                          <div className="flex justify-between items-center text-[8px] text-[#3d3a37]/40 font-bold mb-1.5">
                            <span className="text-black font-bold group-hover:underline">{entry.title}</span>
                            <span>{entry.time}</span>
                          </div>
                          <p className="text-[11px] text-black/70 font-sans leading-snug line-clamp-3">{entry.content}</p>
                          <div className="mt-2 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                            <Pencil className="w-3 h-3 text-[#3d3a37]" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <footer className="w-full border-t border-[#3d3a37]/10 pt-4 flex justify-between text-[10px] text-[#3d3a37]/40">
                <span>BOARDVIEW // MAXIMUM_EXPANSION</span>
                <span>DESIGNED BY CORE_LABS</span>
              </footer>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 🎯 BOTTOM HARDWARE UTILITY SWITCH TOGGLE BUTTON */}
      {currentView === "capture" && (
        <footer className="w-full flex flex-col items-center border-t border-[#3d3a37]/10 pt-4 z-20">
          <button
            onClick={() => setCurrentView("full-board")}
            className="px-6 py-2.5 bg-white text-black hover:bg-[#f4f1ea] border border-[#3d3a37]/20 rounded-full text-[11px] font-bold uppercase tracking-widest shadow-md flex items-center space-x-2 transition-all active:scale-95"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>View Entries Log Board</span>
          </button>
        </footer>
      )}

      {/* 📋 MODAL CONTAINER LAYER (CONSISTENT STRUCTURE & WEIGHT) */}
      <AnimatePresence>
        {/* 1. UNIVERSAL CELL EDITOR MODAL */}
        {editingEntry && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="bg-[#f4f1ea] border border-[#3d3a37]/20 rounded-2xl p-6 w-full max-w-2xl min-h-[400px] shadow-2xl flex flex-col justify-between"
            >
              <div className="space-y-4 flex-1 flex flex-col">
                <div className="flex justify-between items-center border-b border-[#3d3a37]/10 pb-3">
                  <span className="text-[10px] uppercase font-bold text-black flex items-center space-x-1">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Review Entry // {editingEntry.id}</span>
                  </span>
                  <button onClick={() => setEditingEntry(null)} className="p-1 hover:bg-black/5 rounded-full transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-[#3d3a37]/40 font-bold">Label Identifier</label>
                  <input
                    type="text"
                    value={editingEntry.title}
                    onChange={(e) => setEditingEntry({ ...editingEntry, title: e.target.value })}
                    className="w-full bg-white border border-[#3d3a37]/10 rounded px-3 py-2 text-xs text-black font-sans font-bold focus:outline-none shadow-inner"
                  />
                </div>
                <div className="space-y-1 flex-1 flex flex-col">
                  <label className="text-[9px] uppercase tracking-wider text-[#3d3a37]/40 font-bold">Captured String Content</label>
                  <textarea
                    value={editingEntry.content}
                    onChange={(e) => setEditingEntry({ ...editingEntry, content: e.target.value })}
                    className="w-full flex-1 min-h-[160px] bg-white border border-[#3d3a37]/10 rounded p-3 text-xs text-black font-sans leading-relaxed focus:outline-none shadow-inner resize-none"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 border-t border-[#3d3a37]/5 pt-4 mt-4">
                <button
                  onClick={saveEditedEntry}
                  className="px-4 py-2 bg-[#3d3a37] hover:bg-black text-[#dedbd3] text-[10px] uppercase font-bold tracking-wider rounded flex items-center space-x-1.5 transition-colors shadow-sm"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Commit Alterations</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* 2. PERSISTENT RESUME COMPONENT WINDOW */}
        {showResumeModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-[#f4f1ea] border border-[#3d3a37]/20 rounded-2xl p-6 w-full max-w-2xl min-h-[400px] shadow-2xl flex flex-col justify-between"
            >
              <div className="space-y-4 flex-1">
                <div className="flex justify-between items-center border-b border-[#3d3a37]/10 pb-3">
                  <span className="text-[10px] font-bold text-black uppercase tracking-widest flex items-center space-x-1.5">
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Historical Resume Snapshot</span>
                  </span>
                  <button onClick={() => setShowResumeModal(false)} className="p-1 hover:bg-black/5 rounded-full transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3 bg-white border border-black/5 p-4 rounded-xl shadow-inner mt-4">
                  <div className="flex justify-between items-center text-[9px] text-[#8c867e] uppercase font-bold">
                    <span>ID: {lastEntry.id}</span>
                    <span>TIMESTAMP: {lastEntry.time}</span>
                  </div>
                  <h4 className="text-xs font-bold text-black tracking-tight">{lastEntry.title}</h4>
                  <p className="text-xs text-black/70 font-sans leading-relaxed">{lastEntry.content}</p>
                </div>
              </div>
              <div className="flex justify-end border-t border-[#3d3a37]/5 pt-4 mt-4">
                <button
                  onClick={() => {
                    setInputText(`[RECOVERY RUN] Context alignment confirmed for node: ${lastEntry.title}.`);
                    setShowResumeModal(false);
                  }}
                  className="px-4 py-2 bg-[#3d3a37] hover:bg-black text-[#dedbd3] text-[10px] uppercase font-bold tracking-wider rounded flex items-center space-x-1.5 transition-colors shadow-sm"
                >
                  <span>Inject Snapshot Into Workspace</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* 3. COGNITIVE JOY DOSE STORAGE ARCHIVE */}
        {showJoyModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="bg-[#f4f1ea] border border-[#3d3a37]/20 rounded-2xl p-6 w-full max-w-2xl min-h-[400px] max-h-[80vh] shadow-2xl flex flex-col justify-between"
            >
              <div className="space-y-4 flex-1 flex flex-col overflow-hidden">
                <div className="flex justify-between items-center border-b border-[#3d3a37]/10 pb-3 mb-2">
                  <span className="text-[10px] font-bold text-black uppercase tracking-widest flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Joy Frequency Archive</span>
                  </span>
                  <button onClick={() => setShowJoyModal(false)} className="p-1 hover:bg-black/5 rounded-full transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                  {allEntries.filter(e => e.category === "JOY_SIGNALS").map(entry => (
                    <div key={entry.id} className="bg-white border border-black/5 p-4 rounded-xl shadow-sm">
                      <div className="flex justify-between items-center text-[9px] text-[#8c867e] font-bold mb-1.5">
                        <span className="text-black font-bold">{entry.title}</span>
                        <span>{entry.time}</span>
                      </div>
                      <p className="text-xs text-black/80 font-sans leading-relaxed">{entry.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 📋 SLIDE-OUT PANEL LAYER: RIGHT PERSISTENT STREAM LOG TIMELINE */}
      <AnimatePresence>
        {showRecentSidebar && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="absolute top-0 right-0 bottom-0 w-80 bg-[#f4f1ea] border-l border-[#3d3a37]/10 shadow-2xl z-40 flex flex-col p-4"
          >
            <div className="flex justify-between items-center border-b border-[#3d3a37]/10 pb-2 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-black/60">Live Feed Timeline</span>
              <button onClick={() => setShowRecentSidebar(false)} className="p-1 hover:bg-black/5 rounded-full"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {allEntries.map((entry) => (
                <div
                  key={entry.id}
                  onClick={() => setEditingEntry(entry)}
                  className="bg-white border border-black/5 p-3 rounded shadow-sm hover:border-[#3d3a37]/40 cursor-pointer transition-all"
                >
                  <div className="flex justify-between items-center text-[9px] text-black/40 font-bold mb-1">
                    <span className="bg-[#3d3a37]/10 text-black px-1.5 py-0.5 rounded font-mono text-[8px] font-bold">
                      {entry.category.split("_")[0]}
                    </span>
                    <span>{entry.time}</span>
                  </div>
                  <p className="text-[11px] text-black/80 font-sans leading-normal line-clamp-2">{entry.content}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}