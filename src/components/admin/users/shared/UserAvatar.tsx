"use client";

import type { User } from "@/lib/users/types";
import { getUserInitials } from "@/lib/users/utils";

interface UserAvatarProps {
  user: Pick<User, "name" | "avatarUrl">;
  size?: "sm" | "md" | "lg" | "xl";
}

const SIZE_CONFIG = {
  sm: { container: "h-8 w-8", text: "text-xs" },
  md: { container: "h-10 w-10", text: "text-sm" },
  lg: { container: "h-16 w-16", text: "text-lg" },
  xl: { container: "h-24 w-24", text: "text-2xl" },
};

export function UserAvatar({ user, size = "md" }: UserAvatarProps) {
  const { container, text } = SIZE_CONFIG[size];
  const initials = getUserInitials(user.name);

  if (user.avatarUrl) {
    return (
      <img
        src={user.avatarUrl}
        alt={user.name}
        className={`${container} shrink-0 rounded-full object-cover ring-1 ring-black/5`}
      />
    );
  }

  return (
    <div
      className={`${container} flex shrink-0 items-center justify-center rounded-full bg-primary/15 font-bold text-primary ring-1 ring-primary/20 ${text}`}
    >
      {initials}
    </div>
  );
}
