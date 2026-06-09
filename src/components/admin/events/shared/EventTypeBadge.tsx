"use client";

import { Video, Wrench, MessageSquare, Users, Coffee, Handshake } from "lucide-react";
import type { EventType } from "@/lib/events/types";
import { getEventTypeLabel } from "@/lib/events/utils";

interface EventTypeBadgeProps {
  type: EventType;
  size?: "sm" | "md";
}

const TYPE_CONFIG: Record<
  EventType,
  { Icon: typeof Video; classes: string }
> = {
  webinar: {
    Icon: Video,
    classes: "bg-primary/10 text-primary",
  },
  workshop: {
    Icon: Wrench,
    classes: "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
  },
  talkshow: {
    Icon: MessageSquare,
    classes: "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400",
  },
  conference: {
    Icon: Users,
    classes: "bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400",
  },
  meetup: {
    Icon: Coffee,
    classes: "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
  },
  networking: {
    Icon: Handshake,
    classes: "bg-pink-50 text-pink-700 dark:bg-pink-900/20 dark:text-pink-400",
  },
};

export function EventTypeBadge({ type, size = "sm" }: EventTypeBadgeProps) {
  const { Icon, classes } = TYPE_CONFIG[type];
  const sizeClasses =
    size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs";
  const iconSize = size === "sm" ? "h-2.5 w-2.5" : "h-3 w-3";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-semibold uppercase tracking-wider ${sizeClasses} ${classes}`}
    >
      <Icon className={iconSize} />
      {getEventTypeLabel(type)}
    </span>
  );
}
