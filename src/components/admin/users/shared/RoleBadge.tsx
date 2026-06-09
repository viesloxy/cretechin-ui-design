"use client";

import { Shield, User } from "lucide-react";
import type { UserRole } from "@/lib/users/types";
import { getRoleLabel } from "@/lib/users/utils";

interface RoleBadgeProps {
  role: UserRole;
  size?: "sm" | "md";
}

const ROLE_CONFIG: Record<
  UserRole,
  { Icon: typeof Shield; classes: string }
> = {
  admin: {
    Icon: Shield,
    classes:
      "bg-primary/10 text-primary border-primary/20 dark:bg-primary/15",
  },
  super_admin: {
    Icon: Shield,
    classes:
      "bg-primary/15 text-primary border-primary/30 dark:bg-primary/20",
  },
  user: {
    Icon: User,
    classes:
      "bg-neutral-100 text-neutral-700 border-neutral-200 dark:bg-neutral-800/50 dark:text-neutral-300 dark:border-neutral-700",
  },
};

export function RoleBadge({ role, size = "sm" }: RoleBadgeProps) {
  const { Icon, classes } = ROLE_CONFIG[role];
  const sizeClasses =
    size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs";
  const iconSize = size === "sm" ? "h-2.5 w-2.5" : "h-3 w-3";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border font-semibold uppercase tracking-wider ${sizeClasses} ${classes}`}
    >
      <Icon className={iconSize} />
      {getRoleLabel(role)}
    </span>
  );
}
