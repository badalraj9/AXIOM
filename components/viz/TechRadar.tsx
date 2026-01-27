"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Skill = {
  name: string;
  category: "Languages" | "Frameworks" | "Core" | "Theory";
  level: "Core" | "Proficient" | "Familiar";
};

const SKILLS: Skill[] = [
  { name: "TypeScript", category: "Languages", level: "Core" },
  { name: "Python", category: "Languages", level: "Core" },
  { name: "Rust", category: "Languages", level: "Familiar" },
  { name: "Next.js", category: "Frameworks", level: "Core" },
  { name: "React", category: "Frameworks", level: "Core" },
  { name: "Torch", category: "Frameworks", level: "Proficient" },
  { name: "Postgres", category: "Core", level: "Proficient" },
  { name: "Docker", category: "Core", level: "Proficient" },
  { name: "WASM", category: "Core", level: "Familiar" },
  { name: "Graph Theory", category: "Theory", level: "Proficient" },
  { name: "LLM Ops", category: "Theory", level: "Proficient" },
  { name: "Distributed Sys", category: "Theory", level: "Familiar" },
];

export function TechRadar() {
  const [hovered, setHovered] = useState<string | null>(null);

  // Helper to place blips
  const getPosition = (index: number, total: number, level: string) => {
    const angle = (index / total) * 360;
    const radius = level === "Core" ? 50 : level === "Proficient" ? 100 : 150;
    const rad = (angle * Math.PI) / 180;
    return {
      x: 200 + radius * Math.cos(rad),
      y: 200 + radius * Math.sin(rad),
    };
  };

  return (
    <div className="relative w-full max-w-[400px] aspect-square mx-auto">
      <svg viewBox="0 0 400 400" className="w-full h-full">
        {/* Rings */}
        <circle
          cx="200"
          cy="200"
          r="50"
          className="stroke-white/10 fill-none"
        />
        <circle
          cx="200"
          cy="200"
          r="100"
          className="stroke-white/10 fill-none"
        />
        <circle
          cx="200"
          cy="200"
          r="150"
          className="stroke-white/10 fill-none "
        />

        {/* Crosshairs */}
        <line x1="200" y1="0" x2="200" y2="400" className="stroke-white/5" />
        <line x1="0" y1="200" x2="400" y2="200" className="stroke-white/5" />

        {/* Scanner Animation */}
        <motion.line
          x1="200"
          y1="200"
          x2="200"
          y2="50"
          className="stroke-green-500/50 stroke-[2px]"
          style={{ originX: 0.5, originY: 0.5 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle
          cx="200"
          cy="200"
          r="0"
          className="fill-green-500/10"
          animate={{ r: 200, opacity: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />

        {/* Blips */}
        {SKILLS.map((skill, i) => {
          const pos = getPosition(i, SKILLS.length, skill.level);
          const isHovered = hovered === skill.name;

          return (
            <motion.g
              key={skill.name}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              onMouseEnter={() => setHovered(skill.name)}
              onMouseLeave={() => setHovered(null)}
              className="cursor-pointer"
            >
              <circle
                cx={pos.x}
                cy={pos.y}
                r={isHovered ? 6 : 4}
                className={cn(
                  "transition-colors duration-300",
                  skill.level === "Core"
                    ? "fill-green-400"
                    : skill.level === "Proficient"
                      ? "fill-blue-400"
                      : "fill-white/30",
                )}
              />
              {/* Tooltip Label (Always visible or on hover? Hover is cleaner) */}
              {isHovered && (
                <text
                  x={pos.x + 10}
                  y={pos.y}
                  className="fill-white font-mono text-[10px] font-bold uppercase"
                  alignmentBaseline="middle"
                >
                  {skill.name}
                </text>
              )}
            </motion.g>
          );
        })}
      </svg>

      {/* Legend / Overlay */}
      <div className="absolute bottom-0 left-0 p-2 pointer-events-none">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-[10px] font-mono text-white/50">
            CORE_SYSTEMS
          </span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-blue-400" />
          <span className="text-[10px] font-mono text-white/50">
            OPERATIONAL
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-white/30" />
          <span className="text-[10px] font-mono text-white/50">AUXILIARY</span>
        </div>
      </div>
    </div>
  );
}
