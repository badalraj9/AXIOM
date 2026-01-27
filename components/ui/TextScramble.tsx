"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CHARS = "ABCDEF0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/AXIOM";

export const TextScramble = ({
  children,
  className,
  trigger = false,
}: {
  children: string;
  className?: string;
  trigger?: boolean;
}) => {
  const [displayText, setDisplayText] = useState(children);
  const [isScrambling, setIsScrambling] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let iteration = 0;

    const startScramble = () => {
      setIsScrambling(true);
      iteration = 0;

      interval = setInterval(() => {
        setDisplayText((prev) =>
          children
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return children[index];
              }
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join(""),
        );

        if (iteration >= children.length) {
          clearInterval(interval);
          setIsScrambling(false);
        }

        iteration += 1 / 2; // Speed control
      }, 30);
    };

    startScramble();

    return () => clearInterval(interval);
  }, [children, trigger]);

  return <motion.span className={className}>{displayText}</motion.span>;
};
