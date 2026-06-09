"use client";

import { Clock, Radio, CheckCircle2, FileEdit, Archive } from "lucide-react";
import { motion } from "framer-motion";
import type { EventStatus } from "@/lib/events/types";
import { getEventStatusLabel } from "@/lib/events/utils";

interface EventStatusBadgeProps {
  status: EventStatus;
  size?: "sm" | "md";
}

const STATUS_CONFIG: Record<
  EventStatus,
  {
    Icon: typeof Clock;
    classes: string;
    pulse?: boolean;
  }
> = {
  draft: {
    Icon: FileEdit,
    classes: "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
  },
  upcoming: {
    Icon: Clock,
    classes: "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400",
  },
  ongoing: {
    Icon: Radio,
    classes: "bg-primary text-neutral-900",
    pulse: true,
  },
  finished: {
    Icon: CheckCircle2,
    classes: "bg-neutral-100 text-neutral-700 dark:bg-neutral-800/50 dark:text-neutral-300",
  },
  archived: {
    Icon: Archive,
    classes: "bg-neutral-50 text-neutral-500 dark:bg-neutral-900/50 dark:text-neutral-500",
  },
};

export function EventStatusBadge({
  status,
  size = "sm",
}: EventStatusBadgeProps) {
  const { Icon, classes, pulse } = STATUS_CONFIG[status];
  const sizeClasses =
    size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs";
  const iconSize = size === "sm" ? "h-2.5 w-2.5" : "h-3 w-3";

  const content = (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-semibold uppercase tracking-wider ${sizeClasses} ${classes}`}
    >
      <Icon className={iconSize} />
      {getEventStatusLabel(status)}
    </span>
  );

  if (pulse) {
    return (
      <motion.span
        animate={{ opacity: [1, 0.65, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="inline-flex"
      >
        {content}
      </motion.span>
    );
  }

  return content;
}
