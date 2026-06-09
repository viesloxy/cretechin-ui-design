"use client";

import { Sprout, BarChart3, Rocket } from "lucide-react";
import type { CourseLevel } from "@/lib/courses/types";
import { LEVEL_LABELS } from "@/lib/courses/types";

const config: Record<CourseLevel, { className: string; Icon: React.ComponentType<{ className?: string }> }> = {
  pemula: {
    className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200/50 dark:border-green-800/30",
    Icon: Sprout,
  },
  menengah: {
    className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200/50 dark:border-amber-800/30",
    Icon: BarChart3,
  },
  mahir: {
    className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200/50 dark:border-red-800/30",
    Icon: Rocket,
  },
};

interface LevelBadgeProps {
  level: CourseLevel;
  showIcon?: boolean;
  size?: "sm" | "md";
}

export default function LevelBadge({ level, showIcon = false, size = "sm" }: LevelBadgeProps) {
  const { className, Icon } = config[level];
  const sizeClass = size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-2.5 py-1";
  const iconSize = size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md font-medium ${className} ${sizeClass}`}
    >
      {showIcon && <Icon className={iconSize} />}
      {LEVEL_LABELS[level]}
    </span>
  );
}
