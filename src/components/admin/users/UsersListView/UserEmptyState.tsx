"use client";

import { UserX, SearchX, RotateCcw } from "lucide-react";

interface UserEmptyStateProps {
  variant: "no-data" | "no-results";
  onReset?: () => void;
}

export function UserEmptyState({
  variant,
  onReset,
}: UserEmptyStateProps) {
  if (variant === "no-data") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-black/5 bg-white px-6 py-16 text-center dark:border-white/10 dark:bg-neutral-900">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-neutral-100 dark:bg-neutral-800/50">
          <UserX className="h-10 w-10 text-neutral-400" />
        </div>
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
          Belum Ada Pengguna Terdaftar
        </h3>
        <p className="mt-1 max-w-sm text-sm text-neutral-500">
          Pengguna yang mendaftar akan muncul di sini. Pengguna biasanya
          mendaftarkan diri mereka sendiri melalui halaman register.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-black/5 bg-white px-6 py-16 text-center dark:border-white/10 dark:bg-neutral-900">
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-neutral-100 dark:bg-neutral-800/50">
        <SearchX className="h-10 w-10 text-neutral-400" />
      </div>
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
        Pengguna Tidak Ditemukan
      </h3>
      <p className="mt-1 max-w-sm text-sm text-neutral-500">
        Coba ubah filter atau kata kunci pencarian Anda untuk melihat lebih
        banyak pengguna.
      </p>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="mt-5 inline-flex items-center gap-1.5 rounded-xl border border-black/5 bg-white px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50 dark:border-white/10 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
        >
          <RotateCcw className="h-4 w-4" />
          Reset Filter
        </button>
      )}
    </div>
  );
}
