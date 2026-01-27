"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const LOG_MESSAGES = [
  "INITIALIZING_NEURAL_LINK...",
  "ESTABLISHING_SECURE_HANDSHAKE...",
  "DECRYPTING_USER_PROFILE...",
  "LOADING_ASSET_MANIFEST...",
  "OPTIMIZING_RENDER_PIPELINE...",
  "CHECKING_INTEGRITY_HASH...",
  "SYNCING_WITH_MAIN_CORE...",
  "ALLOCATING_MEMORY_BUFFER...",
  "SYSTEM_STATUS: NOMINAL",
  "DETECTING_NETWORK_LATENCY...",
  "CALIBRATING_VISUAL_CORTEX...",
  "EXECUTING_COMMAND_QUEUE...",
  "FETCHING_REMOTE_CONFIG...",
  "UPDATING_LOCAL_CACHE...",
  "VERIFYING_ACCESS_TOKEN...",
  "MOUNTING_VIRTUAL_DOM...",
  "HYDRATING_SERVER_STATE...",
  "PING_RESPONSE: 14ms",
];

export function SystemLog() {
  const [logs, setLogs] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial logs
    setLogs(
      LOG_MESSAGES.slice(0, 5).map(
        (msg) => `[${new Date().toLocaleTimeString()}] ${msg}`,
      ),
    );

    const interval = setInterval(() => {
      const msg = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)];
      const timestamp = new Date().toLocaleTimeString();
      const newLog = `[${timestamp}] ${msg}`;

      setLogs((prev) => {
        const next = [...prev, newLog];
        if (next.length > 20) return next.slice(next.length - 20); // Keep last 20
        return next;
      });
    }, 1500); // New log every 1.5s

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div
      className="font-mono text-[10px] text-green-500/50 h-32 overflow-hidden relative border-t border-white/5 pt-2"
      style={{
        maskImage: "linear-gradient(to bottom, transparent, black 20%)",
      }}
    >
      <div
        ref={scrollRef}
        className="h-full overflow-y-auto scrollbar-none space-y-1"
      >
        {logs.map((log, i) => (
          <div key={i} className="whitespace-nowrap">
            <span className="text-white/20 mr-2">{log.split("]")[0]}]</span>
            <span
              className={cn(
                log.includes("ERROR")
                  ? "text-red-500"
                  : log.includes("SUCCESS") || log.includes("NOMINAL")
                    ? "text-green-400"
                    : "text-green-500/50",
              )}
            >
              {log.split("]")[1]}
            </span>
          </div>
        ))}
        {/* Typing cursor */}
        <div className="animate-pulse">_</div>
      </div>
    </div>
  );
}
