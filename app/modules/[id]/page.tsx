"use client";

import React, { useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { PROJECTS, ProjectId } from "@/lib/data";
import { Terminal, ArrowLeft, Share2 } from "lucide-react";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { TelemetryBlock } from "@/components/viz/TelemetryBlock";
import { useTransition } from "@/context/TransitionContext";
import { cn } from "@/lib/utils";
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";

export default function ModulePage() {
  const params = useParams();
  const id = params.id as ProjectId;
  const project = PROJECTS[id];
  const { animatePageOut } = useTransition();

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape or Left Arrow to Return
      if (e.key === "Escape" || e.key === "ArrowLeft") {
        animatePageOut("/");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [animatePageOut]);

  if (!project) return <div>System Not Found</div>;

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden bg-[#050505] text-white">
      {/* HEADER ROW (Technical) */}
      <div className="flex items-center justify-between px-6 py-2 border-b border-white/10 text-[10px] font-mono text-white/30 tracking-widest bg-[#050505]/80 backdrop-blur z-20">
        <div className="flex items-center gap-4">
          <TransitionLink
            href="/"
            className="hover:text-white transition-colors flex items-center gap-2"
          >
            <ArrowLeft size={10} /> RETURN_CONSOLE
          </TransitionLink>
          <span className="opacity-20">|</span>
          <span>SCHEMATIC_VIEW: {project.alias}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-green-500 animate-pulse">LIVE_FEED</span>
          <span>[SECURE__CONNECTION]</span>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-px bg-white/10 p-px relative z-10">
        {/* LEFT COL: ID Card (Span 4) */}
        <div className="lg:col-span-4 bg-[#050505] p-8 md:p-12 flex flex-col gap-8 relative overflow-hidden group">
          {/* Watermark Icon */}
          <div className="absolute -right-12 -bottom-12 opacity-[0.05] pointer-events-none grayscale group-hover:grayscale-0 transition-all duration-700">
            <project.icon
              size={300}
              style={{ color: `var(--color-${project.color})` }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="border-l-2 pl-6 py-2"
            style={{ borderColor: `var(--color-${project.color})` }}
          >
            <h1 className="text-6xl font-black tracking-tighter mb-2">
              {project.name}
            </h1>
            <p className="font-mono text-xs text-white/50 tracking-widest">
              ID: {project.alias}
            </p>
          </motion.div>

          {/* Status Panel */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 border border-white/10 p-6 rounded relative backdrop-blur-sm"
          >
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-4">
              <span className="text-[10px] font-mono text-white/40 tracking-widest">
                SYSTEM_STATUS
              </span>
              <div className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{
                    backgroundColor:
                      project.status === "ONLINE" || project.status === "ACTIVE"
                        ? "#22c55e"
                        : "#eab308",
                  }}
                />
                <span className="text-xs font-bold font-mono">
                  {project.status}
                </span>
              </div>
            </div>

            {/* Telemetry Injection */}
            <div className="space-y-4">
              <TelemetryBlock className="opacity-80" />
            </div>
          </motion.div>

          <button className="mt-auto w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors uppercase font-mono text-[10px] tracking-widest flex items-center justify-center gap-2 group">
            <Share2 size={12} />
            Copy_System_Link
          </button>
        </div>

        {/* RIGHT COL: Report (Span 8) */}
        <div className="lg:col-span-8 bg-[#050505] p-8 md:p-12 relative overflow-y-auto">
          <div className="max-w-3xl mx-auto space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-[10px] font-mono text-white/40 mb-4 flex items-center gap-2 tracking-widest">
                <Terminal size={12} />
                SYSTEM_MANIFEST
              </h2>
              <p className="text-xl md:text-2xl leading-relaxed text-white/90 font-light border-l border-white/10 pl-6">
                {project.fullDescription}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-[10px] font-mono text-white/40 border-b border-white/10 pb-2 mb-4 tracking-widest">
                  CAPABILITIES
                </h3>
                <ul className="space-y-3">
                  {project.features.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-white/70 group"
                    >
                      <span className="mt-1.5 w-1 h-1 bg-white/30 group-hover:bg-white rounded-full transition-colors" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-[10px] font-mono text-white/40 border-b border-white/10 pb-2 mb-4 tracking-widest">
                  TECH_STACK
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((t, i) => (
                    <span
                      key={i}
                      className="bg-white/5 border border-white/10 px-3 py-1 rounded text-[10px] font-mono text-white/60 hover:text-white hover:border-white/40 transition-colors cursor-crosshair"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ARCHITECTURE DOCUMENTATION (MARKDOWN) */}
            {project.documentation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="mt-12 pt-12 border-t border-white/10"
              >
                <h2 className="text-[10px] font-mono text-white/40 mb-2 flex items-center gap-2 tracking-widest uppercase">
                  <Terminal size={12} />
                  Architecture_Protocol.md
                </h2>

                <MarkdownRenderer>{project.documentation}</MarkdownRenderer>
              </motion.div>
            )}

            {/* Footer Log */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="p-4 bg-black/40 border-t border-white/10 font-mono text-[10px] text-green-500/60 mt-24"
            >
              <p className="mb-1">&gt; verifying integrity... OK</p>
              <p className="mb-1">
                &gt; accessing secure logs... ACCESS_GRANTED
              </p>
              <p className="animate-pulse">&gt; _</p>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
