"use client";

import { motion } from "framer-motion";
import { Eye, Pencil } from "lucide-react";
import type { Transaction } from "@/lib/transactions/types";
import { formatDateTime, formatRelativeTime, formatRupiah } from "@/lib/transactions/utils";
import { UserAvatar } from "../../users/shared/UserAvatar";
import { ItemTypeBadge, InvoiceCell, PaymentMethodBadge, TransactionStatusBadge } from "../shared";

interface TransactionTableProps {
  transactions: Transaction[];
  startIndex: number;
  onView: (id: string) => void;
  onUpdateStatus: (id: string) => void;
}

export function TransactionTable({
  transactions,
  startIndex,
  onView,
  onUpdateStatus,
}: TransactionTableProps) {
  if (transactions.length === 0) return null;
  return (
    <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm shadow-black/5 dark:border-white/10 dark:bg-neutral-900">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px]">
          <thead>
            <tr className="border-b border-black/5 bg-neutral-50 dark:border-white/10 dark:bg-neutral-900/50">
              <th className="w-12 px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                #
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                No. Invoice
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                Pengguna
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                Item Dibeli
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                Tanggal
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                Total
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                Status
              </th>
              <th className="w-24 px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 dark:divide-white/10">
            {transactions.map((t, idx) => {
              const primary = t.items[0];
              return (
                <motion.tr
                  key={t.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.02, duration: 0.25 }}
                  className="group cursor-pointer transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/30"
                  onClick={(e) => {
                    const target = e.target as HTMLElement;
                    if (target.closest("button")) return;
                    onView(t.id);
                  }}
                >
                  <td className="px-3 py-3 text-xs font-medium text-neutral-500">
                    {String(startIndex + idx).padStart(2, "0")}
                  </td>
                  <td className="px-3 py-3">
                    <InvoiceCell transaction={t} />
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2.5">
                      <UserAvatar
                        user={{ name: t.user.name, avatarUrl: t.user.avatarUrl }}
                        size="sm"
                      />
                      <div className="min-w-0 max-w-[200px]">
                        <p className="truncate text-sm font-semibold text-neutral-900 dark:text-white">
                          {t.user.name}
                        </p>
                        <p className="truncate text-[11px] text-neutral-500">
                          {t.user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-neutral-900 dark:text-white">
                        {primary?.itemName ?? "-"}
                      </p>
                      <div className="flex flex-wrap items-center gap-1">
                        {primary && <ItemTypeBadge type={primary.itemType} />}
                        {t.items.length > 1 && (
                          <span className="rounded-full border border-neutral-200 bg-neutral-50 px-1.5 py-0.5 text-[10px] font-medium text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                            +{t.items.length - 1} lainnya
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <div className="space-y-0.5">
                      <p className="font-mono text-xs font-semibold text-neutral-900 dark:text-white">
                        {formatDateTime(t.createdAt)}
                      </p>
                      <p className="text-[10px] text-neutral-500">
                        {formatRelativeTime(t.createdAt)}
                      </p>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                      {formatRupiah(t.total)}
                    </p>
                    {t.adminFee > 0 && (
                      <p className="text-[10px] text-neutral-500">
                        +{formatRupiah(t.adminFee)} admin
                      </p>
                    )}
                  </td>
                  <td className="px-3 py-3">
                    <div className="space-y-1">
                      <TransactionStatusBadge status={t.status} />
                      <PaymentMethodBadge method={t.paymentMethod} withLogo={false} size="sm" />
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        type="button"
                        onClick={() => onView(t.id)}
                        className="rounded-lg p-1.5 text-neutral-500 transition hover:bg-neutral-100 hover:text-primary dark:hover:bg-neutral-800"
                        title="Lihat Detail"
                        aria-label={`Lihat detail ${t.invoiceNumber}`}
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onUpdateStatus(t.id)}
                        className="rounded-lg p-1.5 text-neutral-500 transition hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-amber-900/20"
                        title="Update Status"
                        aria-label={`Update status ${t.invoiceNumber}`}
                      >
                        <Pencil className="h-4 w-4" />
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
