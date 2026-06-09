"use client";

import { Pencil, Lock, Unlock, KeyRound } from "lucide-react";
import { motion } from "framer-motion";
import type { User } from "@/lib/users/types";
import {
  formatRelativeTime,
  formatUserJoinDate,
  isCurrentUser,
  isLastAdmin,
} from "@/lib/users/utils";
import { UserAvatar } from "../shared/UserAvatar";
import { RoleBadge } from "../shared/RoleBadge";
import { UserStatusBadge } from "../shared/UserStatusBadge";

interface UserTableProps {
  users: User[];
  currentAdminId: string;
  startIndex: number;
  onEdit: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onResetPassword: (id: string) => void;
}

export function UserTable({
  users,
  currentAdminId,
  startIndex,
  onEdit,
  onToggleStatus,
  onResetPassword,
}: UserTableProps) {
  if (users.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm shadow-black/5 dark:border-white/10 dark:bg-neutral-900">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-black/5 bg-neutral-50 dark:border-white/10 dark:bg-neutral-900/50">
              <th className="w-12 px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                #
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                Pengguna
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                Role
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                Tanggal Bergabung
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                Status
              </th>
              <th className="w-32 px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 dark:divide-white/10">
            {users.map((user, idx) => {
              const isSelf = isCurrentUser(user, currentAdminId);
              const isLast = isLastAdmin(
                // use full list scope: pass all via prop, but here we only have current page
                // so we fall back to local check; pass full list separately for accuracy
                [user, ...users.filter((u) => u.id !== user.id)],
                user.id,
              );
              const blocked =
                isSelf || (user.role === "admin" && isLast && user.status === "active");

              return (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03, duration: 0.25 }}
                  className="group cursor-pointer transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/30"
                  onClick={(e) => {
                    // Don't trigger row click when clicking action buttons
                    const target = e.target as HTMLElement;
                    if (target.closest("button")) return;
                    onEdit(user.id);
                  }}
                >
                  <td className="px-3 py-3 text-xs font-medium text-neutral-500">
                    {String(startIndex + idx).padStart(2, "0")}
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-3">
                      <UserAvatar user={user} size="md" />
                      <div className="min-w-0 max-w-xs">
                        <div className="flex items-center gap-2">
                          <p className="truncate text-sm font-semibold text-neutral-900 dark:text-white">
                            {user.name}
                          </p>
                          {isSelf && (
                            <span className="rounded-full border border-primary/20 bg-primary/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-primary">
                              Anda
                            </span>
                          )}
                        </div>
                        <p className="truncate text-xs text-neutral-500">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <RoleBadge role={user.role} />
                  </td>
                  <td className="px-3 py-3">
                    <div className="space-y-0.5">
                      <p className="font-mono text-sm font-semibold text-neutral-900 dark:text-white">
                        {formatUserJoinDate(user.joinedAt)}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {formatRelativeTime(user.joinedAt)}
                      </p>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <UserStatusBadge status={user.status} />
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        type="button"
                        onClick={() => onEdit(user.id)}
                        className="rounded-lg p-1.5 text-neutral-500 transition hover:bg-neutral-100 hover:text-primary dark:hover:bg-neutral-800"
                        title="Edit"
                        aria-label={`Edit ${user.name}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onResetPassword(user.id)}
                        disabled={isSelf}
                        className="rounded-lg p-1.5 text-neutral-500 transition hover:bg-amber-50 hover:text-amber-600 disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-amber-900/20"
                        title={isSelf ? "Tidak bisa reset password sendiri" : "Reset Password"}
                        aria-label={`Reset password ${user.name}`}
                      >
                        <KeyRound className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onToggleStatus(user.id)}
                        disabled={blocked}
                        className={`rounded-lg p-1.5 text-neutral-500 transition disabled:cursor-not-allowed disabled:opacity-40 ${
                          user.status === "active"
                            ? "hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                            : "hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/20"
                        }`}
                        title={
                          blocked
                            ? "Tidak bisa blokir/aktifkan admin ini"
                            : user.status === "active"
                              ? "Blokir"
                              : "Aktifkan"
                        }
                        aria-label={
                          user.status === "active"
                            ? `Blokir ${user.name}`
                            : `Aktifkan ${user.name}`
                        }
                      >
                        {user.status === "active" ? (
                          <Lock className="h-4 w-4" />
                        ) : (
                          <Unlock className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
