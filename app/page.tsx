"use client";

import { SystemMap } from "@/components/layout/SystemMap";
import { TextScramble } from "@/components/ui/TextScramble";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden bg-[#050505]">
      {/* Background / Global Noise is handled in layout/globals */}

      {/* Header / HUD */}
      <header className="p-6 md:p-8 flex justify-between items-end border-b border-white/10 relative z-20 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
        <div>
          <h1
            className="text-4xl md:text-6xl font-black tracking-tighter mb-2 glitch-text"
            data-text="AXIOM"
          >
            AXIOM
          </h1>
          <div className="flex items-center gap-3 text-xs font-mono text-white/50">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></span>
            <span>
              SYS: <TextScramble>NORMAL</TextScramble>
            </span>
            <span className="text-white/20">|</span>
            <span>
              UPTIME: <TextScramble>99.9%</TextScramble>
            </span>
          </div>
        </div>
      </header>

      {/* SYSTEM MAP (The Core) */}
      <section className="flex-1 w-full h-full relative z-10 flex flex-col">
        <SystemMap />
      </section>

      {/* Footer / Console Line */}
      <footer className="p-4 text-[10px] font-mono text-white/30 flex justify-between z-20 bg-black border-t border-white/10">
        <p className="flex items-center gap-2">
          <span className="animate-pulse">_</span>
          WAITING_FOR_INPUT
        </p>
        <p>v2.5.0.map</p>
      </footer>
    </main>
  );
}
