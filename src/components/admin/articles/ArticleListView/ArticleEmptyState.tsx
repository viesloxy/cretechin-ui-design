"use client";

import { FileText, Plus } from "lucide-react";

interface ArticleEmptyStateProps {
  hasFilter: boolean;
  onAdd: () => void;
  onReset: () => void;
}

export default function ArticleEmptyState({
  hasFilter,
  onAdd,
  onReset,
}: ArticleEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-4">
        <FileText className="w-8 h-8 text-neutral-400" />
      </div>
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-1">
        {hasFilter ? "Tidak ada artikel ditemukan" : "Belum ada artikel"}
      </h3>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-5 max-w-sm">
        {hasFilter
          ? "Coba ubah atau reset filter untuk melihat artikel lainnya."
          : "Mulai buat artikel pertama Anda untuk dibagikan ke komunitas CreTechin."}
      </p>
      {hasFilter ? (
        <button
          type="button"
          onClick={onReset}
          className="h-10 px-5 rounded-xl border border-black/10 dark:border-white/10 text-sm font-medium text-neutral-700 dark:text-white/80 hover:border-primary hover:text-primary transition-colors"
        >
          Reset Filter
        </button>
      ) : (
        <button
          type="button"
          onClick={onAdd}
          className="h-10 px-5 rounded-xl bg-primary text-black text-sm font-semibold hover:bg-primary-dark active:scale-95 transition-all inline-flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Buat Artikel Pertama
        </button>
      )}
    </div>
  );
}
