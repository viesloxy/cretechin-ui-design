"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AlertCircle, ArrowLeft } from "lucide-react";

interface TransactionsErrorStateProps {
  onRetry: () => void;
}

export default function TransactionsErrorState({
  onRetry,
}: TransactionsErrorStateProps) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      role="alert"
      className="flex flex-col items-center text-center py-16 sm:py-20 px-4 bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl shadow-sm"
    >
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8 text-primary" />
      </div>
      <h2 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-white mb-2">
        Gagal memuat transaksi
      </h2>
      <p className="text-sm text-neutral-500 dark:text-white/40 max-w-sm mb-6">
        Periksa koneksi Anda dan coba lagi. Jika masalah berlanjut, hubungi
        support.
      </p>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <button
          type="button"
          onClick={onRetry}
          className="py-2.5 px-5 rounded-full bg-primary text-neutral-900 text-sm font-semibold hover:bg-primary-dark active:scale-95 transition-all"
        >
          Coba Lagi
        </button>
        <button
          type="button"
          onClick={() => router.push("/profile")}
          className="inline-flex items-center gap-1.5 py-2.5 px-5 rounded-full text-sm font-medium text-neutral-500 dark:text-white/40 hover:text-neutral-700 dark:hover:text-white/70 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Profil
        </button>
      </div>
    </motion.div>
  );
}
