"use client";

import { useState, useEffect } from "react";
import { Copy, Check, CheckCircle, AlertCircle } from "lucide-react";
import Image from "next/image";

interface VANumberCardProps {
  number: string;
  bankName: string;
  amount: number;
  logo: string;
}

export default function VANumberCard({ number, bankName, amount, logo }: VANumberCardProps) {
  const [copied, setCopied] = useState(false);

  const [toasts, setToasts] = useState<Array<{ id: string; type: "success" | "error"; title: string; message?: string }>>([]);

  const showToast = (type: "success" | "error", title: string, message?: string) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(number.replace(/\s/g, ""));
      setCopied(true);
      showToast("success", "Nomor VA berhasil disalin", number);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast("error", "Gagal menyalin nomor", "Coba lagi ya");
    }
  };

  useEffect(() => {
    // clean up toasts on unmount
    return () => setToasts([]);
  }, []);

  return (
    <div className="bg-white dark:bg-neutral-900 border border-primary/30 rounded-2xl p-5 sm:p-6 shadow-lg mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl border border-black/5 dark:border-white/10 overflow-hidden bg-neutral-50 dark:bg-neutral-800 flex-shrink-0">
          <Image
            src={logo}
            alt={bankName}
            width={48}
            height={48}
            className="w-full h-full object-contain p-1.5"
          />
        </div>
        <div>
          <p className="text-sm text-neutral-500 dark:text-white/50">{bankName}</p>
          <p className="text-sm font-semibold text-neutral-700 dark:text-white/80">Nomor Virtual Account</p>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <p className="text-xl sm:text-2xl font-bold tracking-widest text-neutral-900 dark:text-white">
          {number}
        </p>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
            copied
              ? "bg-income/10 text-income border border-income/30"
              : "bg-primary text-neutral-900 hover:bg-primary-dark"
          }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span>Tersalin</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Salin</span>
            </>
          )}
        </button>
      </div>

      <div className="mt-4 pt-4 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
        <p className="text-sm text-neutral-500 dark:text-white/50">Total Transfer</p>
        <p className="text-lg font-bold text-neutral-900 dark:text-white">
          Rp {amount.toLocaleString("id-ID")}
        </p>
      </div>

      {/* Inline Toast Notifications */}
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 p-4 rounded-2xl border shadow-xl text-sm font-semibold animate-in ${
            t.type === "success"
              ? "border-income/30 bg-income/5 text-income"
              : "border-error/30 bg-error/5 text-error"
          }`}
        >
          {t.type === "success" ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <span>{t.title}</span>
        </div>
      ))}
    </div>
  );
}