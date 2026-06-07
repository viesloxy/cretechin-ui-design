"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock, XCircle } from "lucide-react";
import { mockRecentTransactions, formatCurrency, formatRelativeTime } from "@/lib/admin/mockData";

const statusConfig = {
  berhasil: { label: "Berhasil", icon: CheckCircle2, className: "text-primary bg-primary/10" },
  pending: { label: "Pending", icon: Clock, className: "text-neutral-600 dark:text-white/60 bg-neutral-500/10" },
  gagal: { label: "Gagal", icon: XCircle, className: "text-expense bg-expense/10" },
};

export default function RecentTransactions() {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-primary/20 dark:border-primary/30 rounded-2xl p-5 md:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base md:text-lg font-semibold text-black dark:text-white">
            5 Transaksi Terbaru
          </h3>
          <p className="text-xs text-neutral-500 dark:text-white/40 mt-0.5">
            Pembayaran masuk real-time
          </p>
        </div>
        <Link
          href="/admin/transactions"
          className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
        >
          Lihat Semua
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="overflow-x-auto -mx-5 md:-mx-6 px-5 md:px-6">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="bg-neutral-50 dark:bg-neutral-800/50 text-left">
              <th className="py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-white/50 rounded-l-lg">
                Nama User
              </th>
              <th className="py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-white/50">
                Item
              </th>
              <th className="py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-white/50">
                Status
              </th>
              <th className="py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-white/50 text-right rounded-r-lg">
                Jumlah Bayar
              </th>
            </tr>
          </thead>
          <tbody>
            {mockRecentTransactions.map((trx, i) => {
              const status = statusConfig[trx.status];
              const StatusIcon = status.icon;
              return (
                <motion.tr
                  key={trx.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="border-t border-neutral-100 dark:border-white/5 hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors group"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-primary/10 flex-shrink-0">
                        {trx.user.avatarUrl ? (
                          <Image
                            src={trx.user.avatarUrl}
                            alt={trx.user.name}
                            width={32}
                            height={32}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-primary font-semibold text-xs">
                            {trx.user.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-neutral-900 dark:text-white truncate">
                          {trx.user.name}
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-white/40 truncate">
                          {trx.user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-medium text-neutral-900 dark:text-white max-w-xs truncate">
                      {trx.item}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-white/40 mt-0.5">
                      {formatRelativeTime(trx.date)}
                    </p>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${status.className}`}
                    >
                      <StatusIcon className="w-3 h-3" />
                      {status.label}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <p className="font-semibold text-neutral-900 dark:text-white">
                      {formatCurrency(trx.amount)}
                    </p>
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
