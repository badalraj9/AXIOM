"use client";

import React, { createContext, useContext, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface TransitionContextType {
  animatePageOut: (href: string) => void;
  isCovering: boolean;
  isRevealing: boolean;
}

const TransitionContext = createContext<TransitionContextType>({
  animatePageOut: () => {},
  isCovering: false,
  isRevealing: false,
});

export const TransitionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isCovering, setIsCovering] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);

  // The core orchestration logic
  const animatePageOut = async (href: string) => {
    if (href === pathname) return;

    // 1. Start Covering
    setIsCovering(true);

    // Wait for cover animation (must match CSS/Motion duration)
    // Wiper is fast (~500ms - 800ms)
    await new Promise((resolve) => setTimeout(resolve, 800));

    // 2. Change Route (cover remains TRUE)
    router.push(href);
  };

  // 3. Listen for Route Change to Trigger Reveal
  React.useEffect(() => {
    if (isCovering) {
      // We are covered, and the path just changed.
      // Wait a small tick for the new page to paint, then reveal.
      setTimeout(() => {
        setIsCovering(false);
        setIsRevealing(true);

        // Cleanup reveal state after animation
        setTimeout(() => {
          setIsRevealing(false);
        }, 800);
      }, 100);
    }
  }, [pathname]); // Fires when route changes

  return (
    <TransitionContext.Provider
      value={{ animatePageOut, isCovering, isRevealing }}
    >
      {children}
    </TransitionContext.Provider>
  );
};

export const useTransition = () => useContext(TransitionContext);
