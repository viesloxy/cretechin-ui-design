"use client";

import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingClasses = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card({ children, className, hover = true, padding = "md" }: CardProps) {
  return (
    <div
      className={twMerge(
        "bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl",
        paddingClasses[padding],
        hover && "hover:border-primary/50 transition-all duration-300",
        className
      )}
    >
      {children}
    </div>
  );
}