"use client";

import { useTransition } from "@/context/TransitionContext";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export function TransitionLink({ href, className, children, ...props }: Props) {
  const { animatePageOut } = useTransition();
  const router = useRouter();

  const handleClick = () => {
    animatePageOut(href);
  };

  return (
    <button className={className} onClick={handleClick} {...props}>
      {children}
    </button>
  );
}
