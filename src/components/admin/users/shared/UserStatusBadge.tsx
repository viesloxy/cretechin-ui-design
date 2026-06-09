"use client";

import { CheckCircle2, Clock, Ban } from "lucide-react";
import type { UserStatus } from "@/lib/users/types";
import { getStatusLabel } from "@/lib/users/utils";

interface UserStatusBadgeProps {
  status: UserStatus;
  size?: "sm" | "md";
}

const STATUS_CONFIG: Record<
  UserStatus,
  { Icon: typeof CheckCircle2; classes: string }
> = {
  active: {
    Icon: CheckCircle2,
    classes:
      "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400",
  },
  suspended: {
    Icon: Clock,
    classes:
      "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
  },
  banned: {
    Icon: Ban,
    classes: "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400",
  },
};

export function UserStatusBadge({
  status,
  size = "sm",
}: UserStatusBadgeProps) {
  const { Icon, classes } = STATUS_CONFIG[status];
  const sizeClasses =
    size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs";
  const iconSize = size === "sm" ? "h-2.5 w-2.5" : "h-3 w-3";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-semibold uppercase tracking-wider ${sizeClasses} ${classes}`}
    >
      <Icon className={iconSize} />
      {getStatusLabel(status)}
    </span>
  );
}
