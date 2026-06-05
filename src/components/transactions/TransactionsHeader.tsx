"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function TransactionsHeader() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 sm:pt-8 sm:pb-4"
    >
      <button
        type="button"
        onClick={() => router.push("/profile")}
        className="inline-flex items-center gap-1.5 text-sm text-neutral-600 dark:text-white/50 hover:text-neutral-900 dark:hover:text-white transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali ke Profil
      </button>
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-neutral-900 dark:text-white">
        Riwayat Transaksi
      </h1>
      <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-white/50">
        Lihat semua catatan pembelian Anda
      </p>
    </motion.div>
  );
}
