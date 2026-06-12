"use client";

import { ArrowUpRight } from "lucide-react";
import type { Transaction } from "@/lib/transactions/types";
import { UserAvatar } from "../../users/shared/UserAvatar";

interface BuyerInfoCardProps {
  transaction: Transaction;
  onViewProfile?: (userId: string) => void;
}

export function BuyerInfoCard({ transaction, onViewProfile }: BuyerInfoCardProps) {
  return (
    <section>
      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
        Info Pembeli
      </h4>
      <div className="rounded-2xl border border-black/5 bg-white p-4 dark:border-white/10 dark:bg-neutral-900/50">
        <div className="flex items-start gap-3">
          <UserAvatar
            user={{ name: transaction.user.name, avatarUrl: transaction.user.avatarUrl }}
            size="lg"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-semibold text-neutral-900 dark:text-white">
              {transaction.user.name}
            </p>
            <p className="truncate text-sm text-neutral-500">{transaction.user.email}</p>
            <div className="mt-1.5 flex items-center gap-2">
              <span className="rounded-md bg-neutral-100 px-2 py-0.5 font-mono text-[10px] text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                {transaction.userId}
              </span>
              {onViewProfile && (
                <button
                  type="button"
                  onClick={() => onViewProfile(transaction.userId)}
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:underline"
                >
                  Lihat Profil
                  <ArrowUpRight className="h-3 w-3" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
