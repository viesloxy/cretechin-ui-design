"use client";

import { Tag } from "lucide-react";
import type { Transaction } from "@/lib/transactions/types";
import { formatRupiah, getItemTypeLabel } from "@/lib/transactions/utils";
import { ItemTypeBadge } from "../shared/ItemTypeBadge";

interface OrderItemsCardProps {
  transaction: Transaction;
}

export function OrderItemsCard({ transaction }: OrderItemsCardProps) {
  return (
    <section>
      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
        Rincian Pesanan ({transaction.items.length} item)
      </h4>
      <div className="rounded-2xl border border-black/5 bg-white dark:border-white/10 dark:bg-neutral-900/50">
        <div className="divide-y divide-black/5 dark:divide-white/10">
          {transaction.items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3">
              {item.thumbnailUrl ? (
                <img
                  src={item.thumbnailUrl}
                  alt={item.itemName}
                  className="h-10 w-10 shrink-0 rounded-lg object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-xs font-semibold text-neutral-500 dark:bg-neutral-800">
                  ?
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-neutral-900 dark:text-white">
                  {item.itemName}
                </p>
                <div className="mt-0.5 flex items-center gap-1.5">
                  <ItemTypeBadge type={item.itemType} />
                  <span className="text-[10px] text-neutral-500">×{item.quantity}</span>
                </div>
              </div>
              <p className="shrink-0 text-sm font-semibold text-neutral-900 dark:text-white">
                {formatRupiah(item.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-1.5 border-t border-black/5 px-3 py-3 text-sm dark:border-white/10">
          <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-300">
            <span>Subtotal</span>
            <span className="font-mono">{formatRupiah(transaction.subtotal)}</span>
          </div>
          {transaction.discount > 0 && (
            <div className="flex items-center justify-between text-green-600 dark:text-green-400">
              <span className="flex items-center gap-1.5">
                <Tag className="h-3 w-3" />
                Diskon {transaction.discountCode && `(${transaction.discountCode})`}
              </span>
              <span className="font-mono">- {formatRupiah(transaction.discount)}</span>
            </div>
          )}
          {transaction.adminFee > 0 && (
            <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-300">
              <span>Biaya Admin</span>
              <span className="font-mono">+ {formatRupiah(transaction.adminFee)}</span>
            </div>
          )}
          <div className="flex items-center justify-between border-t border-black/5 pt-2 dark:border-white/10">
            <span className="text-sm font-semibold text-neutral-900 dark:text-white">
              Total
            </span>
            <span className="text-base font-bold text-neutral-900 dark:text-white">
              {formatRupiah(transaction.total)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
