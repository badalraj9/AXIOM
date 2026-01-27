"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation"; // Still needed for some, but mainly useTransition
import {
  Search,
  Terminal,
  ArrowRight,
  CornerDownLeft,
  Network,
  Activity,
  Eye,
  Box,
  FileText,
  Home,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTransition } from "@/context/TransitionContext";

// --- COMMAND DEFINITIONS ---
type CommandItem = {
  id: string;
  label: string;
  shortcut?: string;
  icon: React.ElementType;
  action: (animate: (href: string) => void) => void;
  group: "navigation" | "system";
};

const COMMANDS: CommandItem[] = [
  {
    id: "goto_home",
    label: "GOTO_DASHBOARD",
    icon: Home,
    group: "navigation",
    action: (animate) => animate("/"),
  },
  {
    id: "goto_sentry",
    label: "MODULE_SENTRY",
    icon: Terminal,
    group: "navigation",
    action: (animate) => animate("/modules/sentry"),
  },
  {
    id: "goto_mt",
    label: "MODULE_MT",
    icon: Network,
    group: "navigation",
    action: (animate) => animate("/modules/mt"),
  },
  {
    id: "goto_ore",
    label: "MODULE_ORE",
    icon: Activity,
    group: "navigation",
    action: (animate) => animate("/modules/ore"),
  },
  {
    id: "goto_marey",
    label: "MODULE_MAREY",
    icon: Eye,
    group: "navigation",
    action: (animate) => animate("/modules/marey"),
  },
  {
    id: "goto_capsule",
    label: "MODULE_CAPSULE",
    icon: Box,
    group: "navigation",
    action: (animate) => animate("/modules/capsule"),
  },
  {
    id: "goto_about",
    label: "INITIATE_HANDSHAKE",
    icon: Terminal,
    group: "system",
    action: (animate) => animate("/about"),
  },
  // Placeholder actions
  {
    id: "sys_resume",
    label: "DOWNLOAD_RESUME",
    icon: FileText,
    group: "system",
    action: () => alert("Resume functionality pending."),
  },
];

export const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  // Remove router usage for navigation where possible, or keep if needed for non-transition actions
  const router = useRouter();
  const { animatePageOut } = useTransition();

  // Filter commands
  const filteredCommands = COMMANDS.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(query.toLowerCase()) ||
      cmd.id.includes(query.toLowerCase()),
  );

  // Keyboard Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Navigation within list
  useEffect(() => {
    const handleNav = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => (i + 1) % filteredCommands.length);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(
          (i) => (i - 1 + filteredCommands.length) % filteredCommands.length,
        );
      }
      if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action(animatePageOut);
          setIsOpen(false);
        }
      }
    };
    window.addEventListener("keydown", handleNav);
    return () => window.removeEventListener("keydown", handleNav);
  }, [isOpen, filteredCommands, selectedIndex, animatePageOut]);

  // Reset selection on query change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999]"
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg z-[10000] p-4"
          >
            <div className="bg-[#0a0a0a] border border-white/20 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[60vh]">
              {/* Search Bar */}
              <div className="flex items-center px-4 py-4 border-b border-white/10">
                <Search className="w-5 h-5 text-white/50 mr-3" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Type a command or search..."
                  className="bg-transparent text-white placeholder:text-white/20 outline-none w-full font-mono text-sm"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <div className="text-[10px] font-mono text-white/30 bg-white/5 px-2 py-1 rounded">
                  ESC
                </div>
              </div>

              {/* Results */}
              <div className="overflow-y-auto py-2">
                {filteredCommands.length === 0 ? (
                  <div className="px-4 py-8 text-center text-xs font-mono text-white/30">
                    NO_COMMAND_FOUND
                  </div>
                ) : (
                  filteredCommands.map((cmd, i) => (
                    <button
                      key={cmd.id}
                      onClick={() => {
                        cmd.action(animatePageOut);
                        setIsOpen(false);
                      }}
                      onMouseEnter={() => setSelectedIndex(i)}
                      className={cn(
                        "w-full px-4 py-3 flex items-center justify-between group transition-colors",
                        i === selectedIndex
                          ? "bg-white/10"
                          : "hover:bg-white/5",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "p-2 rounded",
                            i === selectedIndex
                              ? "text-white"
                              : "text-white/40",
                          )}
                        >
                          <cmd.icon size={16} />
                        </div>
                        <div className="text-left">
                          <div
                            className={cn(
                              "text-xs font-mono transition-colors",
                              i === selectedIndex
                                ? "text-white"
                                : "text-white/70",
                            )}
                          >
                            {cmd.label}
                          </div>
                        </div>
                      </div>

                      {i === selectedIndex && (
                        <CornerDownLeft className="text-white/50 w-4 h-4" />
                      )}
                    </button>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-2 bg-white/5 border-t border-white/10 text-[10px] font-mono text-white/30 flex justify-between">
                <span>AXIOM_CMD v1.0</span>
                <div>
                  <span className="mr-2">↑↓ NAVIGATE</span>
                  <span>↵ SELECT</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
