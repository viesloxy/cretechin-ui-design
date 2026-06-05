"use client";

import { useRouter } from "next/navigation";
import { UserX, RotateCcw, ArrowLeft } from "lucide-react";

interface ProfileErrorStateProps {
  onRetry?: () => void;
}

export default function ProfileErrorState({ onRetry }: ProfileErrorStateProps) {
  const router = useRouter();

  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
          <UserX className="w-10 h-10 text-primary" aria-hidden="true" />
        </div>
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
          Profil tidak dapat dimuat
        </h2>
        <p className="text-base text-neutral-500 dark:text-white/50 mb-8">
          Terjadi kesalahan saat memuat data profil. Coba lagi atau kembali ke
          beranda.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-neutral-900 font-semibold hover:bg-primary-dark transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Coba Lagi
            </button>
          )}
          <button
            type="button"
            onClick={() => router.push("/beranda")}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-neutral-300 dark:border-white/20 text-neutral-700 dark:text-white/80 hover:border-primary hover:text-primary font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </button>
        </div>
      </div>
    </div>
  );
}
