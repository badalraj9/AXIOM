"use client";

import { motion } from "framer-motion";
import { useTransition } from "@/context/TransitionContext";

export function Wiper() {
  const { isCovering, isRevealing } = useTransition();

  // Screen logic:
  // Using a huge circle/rect anchored bottom-left.
  // We'll use a 200vw/200vh box rotated.
  // Initial (Hidden): Rotated -100deg (out of view).
  // Covered: Rotated 0deg (covering view).

  return (
    <motion.div
      initial={{ rotate: -100 }}
      animate={{
        rotate: isCovering ? 0 : isRevealing ? -100 : -100,
      }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1], // Expo Out
      }}
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "300vw", // Excessive size to cover corners
        height: "300vh",
        backgroundColor: "#000",
        transformOrigin: "bottom left",
        zIndex: 9999,
        pointerEvents: "none", // Click-through when hidden? No, block when covering.
      }}
      className="pointer-events-none" // Always none? Actually should block clicks while covering.
    />
  );
}
