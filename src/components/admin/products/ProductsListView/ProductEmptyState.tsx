"use client";

import { Package, SearchX, Plus, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

interface ProductEmptyStateProps {
  type: "empty" | "no_results";
  onAdd?: () => void;
  onReset?: () => void;
}

export default function ProductEmptyState({ type, onAdd, onReset }: ProductEmptyStateProps) {
  const isEmpty = type === "empty";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl shadow-sm shadow-black/5"
    >
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="w-20 h-20 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-5">
          {isEmpty ? <Package className="w-10 h-10 text-neutral-400" /> : <SearchX className="w-10 h-10 text-neutral-400" />}
        </div>
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-1.5">
          {isEmpty ? "Belum Ada Produk" : "Produk Tidak Ditemukan"}
        </h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md mb-6">
          {isEmpty
            ? "Mulai tambahkan produk pertama Anda ke marketplace CreTechin."
            : "Coba ubah filter atau kata kunci pencarian Anda untuk hasil yang berbeda."}
        </p>
        {isEmpty && onAdd && (
          <button
            type="button"
            onClick={onAdd}
            className="h-10 px-5 rounded-xl bg-primary text-black text-sm font-semibold hover:bg-primary-dark active:scale-95 transition-all inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Tambah Produk Pertama
          </button>
        )}
        {!isEmpty && onReset && (
          <button
            type="button"
            onClick={onReset}
            className="h-10 px-5 rounded-xl border border-black/10 dark:border-white/10 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:border-primary hover:text-primary transition-colors inline-flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Filter
          </button>
        )}
      </div>
    </motion.div>
  );
}
