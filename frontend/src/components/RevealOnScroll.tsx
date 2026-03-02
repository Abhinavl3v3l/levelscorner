"use client";

import { useInView } from "@/hooks/useInView";

interface Props {
  children: React.ReactNode;
  delay?: string;
  className?: string;
}

export function RevealOnScroll({ children, delay = "0s", className = "" }: Props) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(14px)",
        transition: `opacity 0.55s ease ${delay}, transform 0.55s ease ${delay}`,
      }}
    >
      {children}
    </div>
  );
}
