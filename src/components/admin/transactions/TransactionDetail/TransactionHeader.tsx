"use client";

import { X, Copy, Check } from "lucide-react";
import { useState } from "react";
import { TransactionStatusBadge } from "../shared/TransactionStatusBadge";
import { formatDateLong } from "@/lib/transactions/utils";
import type { Transaction } from "@/lib/transactions/types";

interface TransactionHeaderProps {
  transaction: Transaction;
  onClose: () => void;
}

export function TransactionHeader({ transaction, onClose }: TransactionHeaderProps) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(transaction.invoiceNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };
  return (
    <div className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-black/5 bg-white/95 px-6 py-4 backdrop-blur dark:border-white/10 dark:bg-neutral-900/95">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-mono text-lg font-bold text-neutral-900 dark:text-white">
            {transaction.invoiceNumber}
          </h3>
          <button
            type="button"
            onClick={handleCopy}
            className="rounded p-1 text-neutral-400 transition hover:bg-neutral-100 hover:text-primary dark:hover:bg-neutral-800"
            aria-label="Copy invoice"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        </div>
        <p className="mt-0.5 text-xs text-neutral-500">
          {formatDateLong(transaction.createdAt)}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <TransactionStatusBadge status={transaction.status} size="md" />
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1.5 text-neutral-500 transition hover:bg-neutral-100 dark:hover:bg-neutral-800"
          aria-label="Tutup"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
