"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function TelemetryBlock({ className }: { className?: string }) {
  const [metrics, setMetrics] = useState({
    latency: 12,
    load: 14,
    reqs: 840,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        latency: Math.max(
          4,
          Math.min(99, prev.latency + (Math.random() > 0.5 ? 2 : -2)),
        ),
        load: Math.max(
          10,
          Math.min(100, prev.load + (Math.random() > 0.5 ? 5 : -3)),
        ),
        reqs: Math.max(800, prev.reqs + Math.floor(Math.random() * 10 - 5)),
      }));
    }, 2000); // Update every 2s

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={cn(
        "grid grid-cols-3 gap-2 text-[10px] font-mono text-white/30",
        className,
      )}
    >
      <div className="flex flex-col">
        <span className="uppercase text-[8px]">Latency</span>
        <span
          className={cn(
            "transition-colors",
            metrics.latency > 50 ? "text-yellow-500" : "text-white/60",
          )}
        >
          {metrics.latency}ms
        </span>
      </div>
      <div className="flex flex-col">
        <span className="uppercase text-[8px]">Load</span>
        <span className="text-white/60">{metrics.load}%</span>
      </div>
      <div className="flex flex-col">
        <span className="uppercase text-[8px]">Req/s</span>
        <span className="text-white/60">{metrics.reqs}</span>
      </div>
    </div>
  );
}
