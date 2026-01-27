"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { PROJECTS } from "@/lib/data";
import { TransitionLink } from "@/components/ui/TransitionLink";
import {
  Terminal,
  Network,
  Activity,
  Eye,
  Box,
  ArrowUpRight,
} from "lucide-react";
import { useTransition } from "@/context/TransitionContext";
import { TelemetryBlock } from "@/components/viz/TelemetryBlock";

// --- CONFIGURATION ---
const ZONES = [
  {
    id: "CTX_01",
    label: "LOGIC_CORE",
    gridArea: "logic",
    projectId: "sentry",
    description: "Decision Intelligence & Routing",
  },
  {
    id: "HIP_01",
    label: "MEMORY_BANK",
    gridArea: "memory",
    projectId: "mt",
    description: "Persistent State & Context",
  },
  {
    id: "VIS_01",
    label: "VISUAL_CTX",
    gridArea: "visual",
    projectId: "marey",
    description: "Render Pipeline",
  },
  {
    id: "RND_01",
    label: "R&D_LAB",
    gridArea: "research",
    projectId: "ore",
    description: "Algorithmic Analysis",
  },
  {
    id: "AUX_01",
    label: "AUX_DOCK",
    gridArea: "aux",
    projectId: "capsule",
    description: "Plugin Environment",
  },
];

export function SystemMap() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { animatePageOut } = useTransition();

  // KEYBOARD NAVIGATION LOGIC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);

      // Map arrow keys roughly to grid logic
      // 0: TopLeft, 1: TopRight
      // 2: BotLeft, 3: BotMid, 4: BotRight
      if (activeIndex === null) {
        if (e.key.startsWith("Arrow")) setActiveIndex(0);
        return;
      }

      if (e.key === "ArrowRight") {
        setActiveIndex((prev) => (prev! + 1) % ZONES.length);
      }
      if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => (prev! - 1 + ZONES.length) % ZONES.length);
      }
      if (e.key === "ArrowDown") {
        // Simple logic: jump to next row if possible
        if (activeIndex < 2) setActiveIndex((prev) => Math.min(prev! + 2, 4));
      }
      if (e.key === "ArrowUp") {
        if (activeIndex >= 2) setActiveIndex((prev) => Math.max(prev! - 2, 0));
      }
      if (e.key === "Enter") {
        const zone = ZONES[activeIndex];
        animatePageOut(`/modules/${zone.projectId}`);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, animatePageOut]);

  return (
    <div className="w-full h-full flex flex-col relative z-10">
      {/* HEADER ROW (Technical) */}
      <div className="flex items-center justify-between px-6 py-2 border-b border-white/10 text-[10px] font-mono text-white/30 tracking-widest bg-[#050505]/80 backdrop-blur">
        <span>SCHEMATIC_VIEW: AXIOM_V2</span>
        <div className="flex items-center gap-4">
          {activeIndex !== null && (
            <span className="text-green-500 animate-pulse">
              KEYBOARD_CONTROL_ACTIVE
            </span>
          )}
          <span>[SECURE__CONNECTION]</span>
        </div>
      </div>

      {/* THE GRID */}
      <div
        className="flex-1 grid gap-px bg-white/10 p-px"
        style={{
          gridTemplateColumns: "repeat(12, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
        }}
      >
        {/* Zones render manually to control spans */}
        <Zone
          config={ZONES[0]}
          isActive={activeIndex === 0}
          onHover={() => setActiveIndex(0)}
          className="col-span-12 md:col-span-6 row-span-1 bg-[#050505]"
        />
        <Zone
          config={ZONES[1]}
          isActive={activeIndex === 1}
          onHover={() => setActiveIndex(1)}
          className="col-span-12 md:col-span-6 row-span-1 bg-[#050505]"
        />
        <Zone
          config={ZONES[2]}
          isActive={activeIndex === 2}
          onHover={() => setActiveIndex(2)}
          className="col-span-12 md:col-span-4 row-span-1 bg-[#050505]"
        />
        <Zone
          config={ZONES[3]}
          isActive={activeIndex === 3}
          onHover={() => setActiveIndex(3)}
          className="col-span-12 md:col-span-4 row-span-1 bg-[#050505]"
        />
        <Zone
          config={ZONES[4]}
          isActive={activeIndex === 4}
          onHover={() => setActiveIndex(4)}
          className="col-span-12 md:col-span-4 row-span-1 bg-[#050505]"
        />
      </div>
    </div>
  );
}

function Zone({
  config,
  className,
  isActive,
  onHover,
}: {
  config: (typeof ZONES)[0];
  className?: string;
  isActive?: boolean;
  onHover?: () => void;
}) {
  const project = PROJECTS[config.projectId as keyof typeof PROJECTS];
  if (!project) return null;

  return (
    <TransitionLink
      href={`/modules/${config.projectId}`}
      onMouseEnter={onHover}
      className={cn(
        "relative group overflow-hidden transition-all duration-300 outline-none",
        isActive ? "z-20 ring-1 ring-white/50 bg-white/5" : "hover:z-10",
        className,
      )}
    >
      {/* Background Grid (Subtle) */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Focus Highlight (Border) */}
      {isActive && (
        <motion.div
          layoutId="focusBorder"
          className="absolute inset-0 border-2 border-green-500/50 pointer-events-none z-30"
          transition={{ duration: 0.2 }}
        />
      )}

      {/* CONTENT LAYOUT */}
      <div className="relative h-full p-6 flex flex-col justify-between z-10">
        {/* Top Bar: Sector ID */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <span
              className={cn(
                "text-[10px] font-mono px-2 py-1 rounded w-fit mb-2 transition-colors",
                isActive
                  ? "bg-green-500/20 text-green-400"
                  : "bg-white/5 text-white/30 group-hover:text-white/60",
              )}
            >
              SEC: {config.id}
            </span>
            <h3 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              {project.name}
              <ArrowUpRight
                className={cn(
                  "w-4 h-4 transition-all duration-300",
                  isActive
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0",
                )}
              />
            </h3>
          </div>

          {/* Status Dot */}
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-all duration-500",
                project.status === "ONLINE" || project.status === "ACTIVE"
                  ? "bg-green-500 shadow-[0_0_8px_#22c55e]"
                  : "bg-yellow-500",
              )}
            />
          </div>
        </div>

        {/* Middle: Live Telemetry (Only Visible on Active/Hover) */}
        <div
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500",
            isActive
              ? "opacity-100 scale-100"
              : "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100",
          )}
        >
          {/* When active, show Telemetry. When idle, show Icon? */}
          {/* Let's show Telemetry overlaid on Faint Icon */}
          <div className="relative flex flex-col items-center">
            <div className="opacity-20 mb-4">
              <ProjectIcon icon={project.icon} size={80} />
            </div>
            <TelemetryBlock />
          </div>
        </div>

        {/* Bottom: Description */}
        <div className="mt-auto">
          <p
            className={cn(
              "text-sm max-w-[80%] mb-4 transition-colors line-clamp-2",
              isActive
                ? "text-white"
                : "text-white/50 group-hover:text-white/80",
            )}
          >
            {project.description}
          </p>

          {/* Technical Tags */}
          <div
            className={cn(
              "flex gap-2 transition-opacity",
              isActive ? "opacity-100" : "opacity-60 group-hover:opacity-100",
            )}
          >
            {project.techStack.slice(0, 2).map((tech, i) => (
              <span
                key={i}
                className="text-[10px] font-mono border border-white/20 px-2 py-0.5 rounded text-white/50"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CORNER RETICLES */}
      <div
        className={cn(
          "absolute top-0 left-0 w-3 h-3 border-t border-l transition-colors",
          isActive
            ? "border-green-500"
            : "border-white/20 group-hover:border-white/60",
        )}
      />
      <div
        className={cn(
          "absolute top-0 right-0 w-3 h-3 border-t border-r transition-colors",
          isActive
            ? "border-green-500"
            : "border-white/20 group-hover:border-white/60",
        )}
      />
      <div
        className={cn(
          "absolute bottom-0 left-0 w-3 h-3 border-b border-l transition-colors",
          isActive
            ? "border-green-500"
            : "border-white/20 group-hover:border-white/60",
        )}
      />
      <div
        className={cn(
          "absolute bottom-0 right-0 w-3 h-3 border-b border-r transition-colors",
          isActive
            ? "border-green-500"
            : "border-white/20 group-hover:border-white/60",
        )}
      />
    </TransitionLink>
  );
}

function ProjectIcon({ icon: Icon, size }: { icon: any; size: number }) {
  return <Icon size={size} />;
}
