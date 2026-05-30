"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

interface PaymentMethod {
  id: string;
  label: string;
  logo: string;
}

interface PaymentInfoCardProps {
  amount: number;
  method: PaymentMethod;
  orderId: string;
}

export default function PaymentInfoCard({ amount, method, orderId }: PaymentInfoCardProps) {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl p-5 sm:p-6 shadow-lg shadow-black/5 dark:shadow-black/40 mb-6">
      <div className="flex items-start gap-4">
        {/* Logo placeholder */}
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl border border-black/5 dark:border-white/10 overflow-hidden flex-shrink-0 bg-neutral-50 dark:bg-neutral-800">
          <Image
            src={method.logo}
            alt={method.label}
            width={64}
            height={64}
            className="w-full h-full object-contain p-2"
          />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm text-neutral-500 dark:text-white/50 mb-1">Total Tagihan</p>
          <p className="text-2xl sm:text-3xl font-bold text-primary">
            Rp {amount.toLocaleString("id-ID")}
          </p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-white/50">
          <CheckCircle2 className="w-4 h-4 text-income" />
          <span>Order ID: {orderId}</span>
        </div>
        <span className="text-sm font-medium text-neutral-700 dark:text-white/80">
          {method.label}
        </span>
      </div>
    </div>
  );
}