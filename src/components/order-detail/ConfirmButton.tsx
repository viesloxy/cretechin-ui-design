"use client";

import { Loader2 } from "lucide-react";

interface ConfirmButtonProps {
  onConfirm: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export default function ConfirmButton({
  onConfirm,
  isLoading = false,
  disabled = false,
}: ConfirmButtonProps) {
  return (
    <>
      {/* Desktop */}
      <button
        onClick={onConfirm}
        disabled={disabled || isLoading}
        className="hidden sm:flex w-full h-12 sm:h-14 rounded-full bg-primary text-neutral-900 font-semibold text-base items-center justify-center gap-2 hover:bg-primary-dark active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Memproses...</span>
          </>
        ) : (
          <span>Konfirmasi Pembayaran</span>
        )}
      </button>

      {/* Mobile Sticky */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-900 border-t border-black/10 dark:border-white/10 shadow-[-0_4px_20px_rgba(0,0,0,0.1)] px-4 py-4 z-40">
        <button
          onClick={onConfirm}
          disabled={disabled || isLoading}
          className="w-full h-12 rounded-full bg-primary text-neutral-900 font-semibold text-base flex items-center justify-center gap-2 hover:bg-primary-dark active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Memproses...</span>
            </>
          ) : (
            <span>Konfirmasi Pembayaran</span>
          )}
        </button>
      </div>
    </>
  );
}