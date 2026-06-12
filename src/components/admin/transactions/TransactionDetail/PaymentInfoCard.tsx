"use client";

import { Copy, Check, Clock, Wallet, Building2, CreditCard, AlertCircle } from "lucide-react";
import { useState } from "react";
import type { Transaction } from "@/lib/transactions/types";
import {
  formatCountdown,
  formatDateTime,
  getPaymentGroup,
  getPaymentLabel,
  maskCardNumber,
} from "@/lib/transactions/utils";

interface PaymentInfoCardProps {
  transaction: Transaction;
}

const GROUP_ICON = {
  ewallet: Wallet,
  virtualaccount: Building2,
  creditcard: CreditCard,
} as const;

export function PaymentInfoCard({ transaction }: PaymentInfoCardProps) {
  const [copied, setCopied] = useState<"va" | "card" | null>(null);
  const group = getPaymentGroup(transaction.paymentMethod);
  const Icon = GROUP_ICON[group];
  const ref =
    transaction.paymentDetails.vaNumber ?? transaction.paymentDetails.cardMasked ?? null;
  const refType = transaction.paymentDetails.vaNumber ? "va" : "card";

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!ref) return;
    try {
      await navigator.clipboard.writeText(ref);
      setCopied(refType);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      // ignore
    }
  };

  const display =
    group === "creditcard" && transaction.paymentDetails.cardMasked
      ? maskCardNumber(transaction.paymentDetails.cardMasked)
      : transaction.paymentDetails.vaNumber ?? "-";

  return (
    <section>
      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
        Info Pembayaran
      </h4>
      <div className="rounded-2xl border border-black/5 bg-white p-4 dark:border-white/10 dark:bg-neutral-900/50">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800">
              <Icon className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                {getPaymentLabel(transaction.paymentMethod)}
              </p>
              {transaction.paymentDetails.methodSublabel && (
                <p className="text-[11px] text-neutral-500">
                  {transaction.paymentDetails.methodSublabel}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between gap-2">
              <span className="text-neutral-500">
                {refType === "va" ? "No. Virtual Account" : "No. Kartu"}
              </span>
              <span className="flex items-center gap-1.5 font-mono font-semibold text-neutral-900 dark:text-white">
                {display}
                {ref && (
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="rounded p-0.5 text-neutral-400 transition hover:bg-neutral-100 hover:text-primary dark:hover:bg-neutral-800"
                    aria-label="Copy"
                  >
                    {copied ? (
                      <Check className="h-3 w-3 text-green-600" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </button>
                )}
              </span>
            </div>
            {transaction.paymentDetails.paidAt && (
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Dibayar</span>
                <span className="font-mono text-neutral-900 dark:text-white">
                  {formatDateTime(transaction.paymentDetails.paidAt)}
                </span>
              </div>
            )}
            {transaction.status === "tertunda" && transaction.paymentDetails.expiredAt && (
              <div className="flex items-center justify-between rounded-md bg-amber-50 px-2 py-1 dark:bg-amber-900/20">
                <span className="flex items-center gap-1 text-amber-700 dark:text-amber-400">
                  <Clock className="h-3 w-3" />
                  <span className="font-semibold">Countdown</span>
                </span>
                <span className="font-mono font-semibold text-amber-700 dark:text-amber-400">
                  {formatCountdown(transaction.paymentDetails.expiredAt)}
                </span>
              </div>
            )}
            {transaction.status === "expired" && transaction.paymentDetails.expiredAt && (
              <div className="flex items-center justify-between rounded-md bg-red-50 px-2 py-1 dark:bg-red-900/20">
                <span className="flex items-center gap-1 text-red-600 dark:text-red-400">
                  <AlertCircle className="h-3 w-3" />
                  <span className="font-semibold">Expired</span>
                </span>
                <span className="font-mono text-red-600 dark:text-red-400">
                  {formatDateTime(transaction.paymentDetails.expiredAt)}
                </span>
              </div>
            )}
            {transaction.paymentDetails.fee > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Biaya Admin</span>
                <span className="font-mono text-neutral-700 dark:text-neutral-300">
                  {transaction.paymentDetails.fee.toLocaleString("id-ID")}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
