"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { TextScramble } from "@/components/ui/TextScramble";
import {
  ArrowLeft,
  Mail,
  Github,
  Twitter,
  Terminal,
  Cpu,
  Shield,
  Zap,
} from "lucide-react";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { cn } from "@/lib/utils";
import { TechRadar } from "@/components/viz/TechRadar";
import { SystemLog } from "@/components/ui/SystemLog";
import { TelemetryBlock } from "@/components/viz/TelemetryBlock";
import { useTransition } from "@/context/TransitionContext";

export default function AboutPage() {
  const { animatePageOut } = useTransition();

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "ArrowLeft") {
        animatePageOut("/");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [animatePageOut]);

  return (
    <main className="min-h-screen bg-[#050505] relative flex flex-col overflow-hidden text-white">
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
          <span>SCHEMATIC_VIEW: THE_ARCHITECT</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-green-500 animate-pulse">
            BIOMETRICS_ACTIVE
          </span>
          <span>[SECURE__CHANNEL]</span>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-px bg-white/10 p-px relative z-10">
        {/* LEFT COLUMN: IDENTITY & LOGS (Span 4) */}
        <div className="lg:col-span-4 bg-[#050505] p-6 lg:p-8 flex flex-col gap-8">
          {/* ID Card */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-black/40 border border-white/10 p-6 rounded relative overflow-hidden group"
          >
            {/* Glitch Overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-[200%] w-full animate-scan opacity-50"
              style={{ animationDuration: "3s" }}
            />

            <div className="mb-6 relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                <span className="text-[10px] font-mono text-green-500 tracking-widest">
                  OPERATOR_ONLINE
                </span>
              </div>
              <h1
                className="text-4xl font-black tracking-tighter text-white mb-2 glitch-text"
                data-text="THE_ARCHITECT"
              >
                THE_ARCHITECT
              </h1>
              <p className="text-white/40 font-mono text-[10px] tracking-widest">
                ID: AXIOM_ADMIN_01 // LVL_5
              </p>
            </div>

            <p className="text-white/70 leading-relaxed text-sm mb-6 border-l-2 border-white/20 pl-4 relative z-10">
              Building high-performance cognitive systems and distributed
              architectures. Merging{" "}
              <span className="text-white font-bold">
                computational intelligence
              </span>{" "}
              with{" "}
              <span className="text-white font-bold">adaptive interfaces</span>.
            </p>

            <div className="border-t border-white/10 pt-4 mb-6">
              <TelemetryBlock className="opacity-70" />
            </div>

            <div className="flex gap-4 relative z-10">
              <SocialButton
                icon={Github}
                label="GH"
                href="https://github.com"
              />
              <SocialButton
                icon={Twitter}
                label="TW"
                href="https://twitter.com"
              />
              <SocialButton
                icon={Mail}
                label="MAIL"
                href="mailto:hello@example.com"
                primary
              />
            </div>
          </motion.div>

          {/* System Logs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex-1 bg-black/40 border border-white/10 rounded p-4 font-mono flex flex-col min-h-[200px]"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2 text-[10px] text-white/30 uppercase tracking-widest">
              <span>System_Stream</span>
              <span className="animate-pulse text-green-500">LIVE</span>
            </div>
            <SystemLog />
          </motion.div>
        </div>

        {/* RIGHT COLUMN: INTELLIGENCE (Span 8) */}
        <div className="lg:col-span-8 bg-[#050505] p-6 lg:p-8 flex flex-col gap-8">
          {/* Top Row: Tech Radar & Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Radar */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-black/20 border border-white/10 rounded p-6 flex flex-col items-center justify-center relative min-h-[300px]"
            >
              <div className="absolute top-4 left-4 text-[10px] font-mono text-white/30 uppercase tracking-widest flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-white/20 rounded-full" />
                Skill_Matrix // Radar
              </div>
              <TechRadar />
            </motion.div>

            {/* Metrics */}
            <div className="grid grid-rows-4 gap-2">
              <MetricCard
                label="CODEBASE_VOLUME"
                value="2.4M+"
                sub="LINES WRITTEN"
                icon={Terminal}
                delay={0.3}
              />
              <MetricCard
                label="SYSTEM_UPTIME"
                value="99.98%"
                sub="ROLLING AVG"
                icon={Zap}
                delay={0.4}
              />
              <MetricCard
                label="SECURITY_LEVEL"
                value="CLASS_5"
                sub="MAX_CLEARANCE"
                icon={Shield}
                delay={0.5}
              />
              <MetricCard
                label="NEURAL_DENSITY"
                value="HIGH"
                sub="COGNITIVE_LOAD"
                icon={Cpu}
                delay={0.6}
              />
            </div>
          </div>

          {/* Bottom Row: Mission Log */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex-1"
          >
            <h2 className="text-[10px] font-mono text-white/40 mb-6 flex items-center gap-2 uppercase tracking-widest border-b border-white/10 pb-2">
              <span className="w-1 h-1 bg-white/50 rounded-full" />
              Mission_History
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <HistoryItem
                year="2024 - PRESENT"
                role="LEAD ARCHITECT"
                company="AXIOM LABS"
                description="Architecting autonomous cognitive tools (SENTRY, MT)."
              />
              <HistoryItem
                year="2022 - 2024"
                role="SENIOR ENG"
                company="DEEP_MIND_CLONE"
                description="Optimized inference pipelines & distributed state."
              />
              <HistoryItem
                year="2020 - 2022"
                role="FULL STACK"
                company="STARTUP_X"
                description="Built rapid prototypes & engineering core."
              />
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

function MetricCard({ label, value, sub, icon: Icon, delay }: any) {
  return (
    <motion.div
      initial={{ x: 10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-white/5 border border-white/5 px-4 rounded flex items-center gap-4 hover:bg-white/10 transition-colors group h-full"
    >
      <div className="p-2 bg-black/40 rounded border border-white/10 text-white/50 group-hover:text-white transition-colors">
        <Icon size={16} />
      </div>
      <div>
        <div className="text-[8px] font-mono text-white/30 uppercase mb-1 tracking-widest">
          {label}
        </div>
        <div className="text-xl font-bold text-white tracking-widest flex items-baseline gap-2">
          {value}
          <span className="text-[8px] font-mono text-white/20 font-normal">
            {sub}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function HistoryItem({ year, role, company, description }: any) {
  return (
    <div className="group relative pl-4 border-l border-white/10 hover:border-white/50 transition-colors">
      <div className="text-[10px] font-mono text-white/40 mb-1 bg-[#050505] w-fit pr-2">
        {year}
      </div>
      <h3 className="text-white font-bold text-sm mb-1 group-hover:text-green-400 transition-colors tracking-wide">
        {role}
      </h3>
      <div className="text-[10px] text-white/60 font-mono mb-2 uppercase tracking-widest">
        {company}
      </div>
      <p className="text-white/40 text-xs leading-relaxed">{description}</p>
    </div>
  );
}

function SocialButton({ icon: Icon, label, href, primary }: any) {
  return (
    <a
      href={href}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded text-[10px] font-bold font-mono transition-all border tracking-widest",
        primary
          ? "bg-white text-black border-white hover:bg-white/90"
          : "bg-black text-white border-white/20 hover:border-white/50",
      )}
    >
      <Icon size={12} />
      {label}
    </a>
  );
}
