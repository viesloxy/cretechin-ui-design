"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Wallet, SearchX, ShoppingBag } from "lucide-react";

interface TransactionsEmptyStateProps {
  variant: "no-transactions" | "no-filter-results";
  onAction?: () => void;
}

export default function TransactionsEmptyState({
  variant,
  onAction,
}: TransactionsEmptyStateProps) {
  const router = useRouter();

  if (variant === "no-transactions") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        role="status"
        className="flex flex-col items-center text-center py-16 sm:py-20 px-4"
      >
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-5">
          <Wallet className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-white mb-2">
          Belum ada riwayat transaksi
        </h2>
        <p className="text-sm text-neutral-500 dark:text-white/40 max-w-sm mb-6">
          Yuk mulai belanja kelas atau aset digital pertama Anda. Transaksi yang
          berhasil akan muncul di sini.
        </p>
        <button
          type="button"
          onClick={() => router.push("/products")}
          className="inline-flex items-center gap-2 py-3 px-6 rounded-full bg-primary text-neutral-900 text-sm font-semibold hover:bg-primary-dark active:scale-95 transition-all"
        >
          <ShoppingBag className="w-4 h-4" />
          Mulai Belanja
        </button>
      </motion.div>
    );
  }

  // no-filter-results
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      role="status"
      className="flex flex-col items-center text-center py-12 sm:py-16 px-4"
    >
      <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-4">
        <SearchX className="w-8 h-8 text-neutral-500 dark:text-white/40" />
      </div>
      <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-1.5">
        Tidak ditemukan
      </h2>
      <p className="text-sm text-neutral-500 dark:text-white/40 max-w-sm mb-5">
        Tidak ada transaksi yang cocok dengan filter saat ini. Coba pilih tab
        atau ubah filter.
      </p>
      {onAction && (
        <button
          type="button"
          onClick={onAction}
          className="py-2.5 px-5 rounded-full border border-neutral-300 dark:border-white/20 text-neutral-700 dark:text-white/80 hover:border-primary hover:text-primary text-sm font-semibold active:scale-95 transition-all"
        >
          Lihat Semua Transaksi
        </button>
      )}
    </motion.div>
  );
}
