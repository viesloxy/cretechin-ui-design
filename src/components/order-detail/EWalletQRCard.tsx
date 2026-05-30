"use client";

import Image from "next/image";
import { QrCode, ExternalLink } from "lucide-react";

interface EWalletQRCardProps {
  name: string;
  amount: number;
  logo: string;
}

export default function EWalletQRCard({ name, amount, logo }: EWalletQRCardProps) {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl p-5 sm:p-6 shadow-lg mb-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl border border-black/5 dark:border-white/10 overflow-hidden bg-neutral-50 dark:bg-neutral-800 flex-shrink-0">
          <Image
            src={logo}
            alt={name}
            width={48}
            height={48}
            className="w-full h-full object-contain p-1.5"
          />
        </div>
        <div>
          <p className="text-sm text-neutral-500 dark:text-white/50">Pembayaran via</p>
          <p className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-white">{name}</p>
        </div>
      </div>

      <p className="text-sm text-neutral-600 dark:text-white/50 mb-4 text-center">
        Scan QR Code dengan aplikasi {name}
      </p>

      {/* QR Code Placeholder */}
      <div className="w-48 h-48 sm:w-56 sm:h-56 mx-auto mb-5 border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-xl bg-neutral-50 dark:bg-neutral-800 flex items-center justify-center">
        <div className="text-center">
          <QrCode className="w-16 h-16 mx-auto text-neutral-300 dark:text-neutral-600" />
          <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-2">QR Code</p>
        </div>
      </div>

      <p className="text-xs text-center text-neutral-400 dark:text-neutral-500 mb-4">atau</p>

      <button className="w-full h-12 rounded-full bg-primary text-neutral-900 font-semibold text-base flex items-center justify-center gap-2 hover:bg-primary-dark active:scale-95 transition-all">
        <span>Buka Aplikasi {name}</span>
        <ExternalLink className="w-4 h-4" />
      </button>

      <div className="mt-4 pt-4 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
        <p className="text-sm text-neutral-500 dark:text-white/50">Total Bayar</p>
        <p className="text-lg font-bold text-primary">
          Rp {amount.toLocaleString("id-ID")}
        </p>
      </div>
    </div>
  );
}