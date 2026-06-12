"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";
import type { Transaction } from "@/lib/transactions/types";
import { formatDateShort } from "@/lib/transactions/utils";

interface InvoiceCellProps {
  transaction: Pick<Transaction, "invoiceNumber" | "createdAt">;
}

export function InvoiceCell({ transaction }: InvoiceCellProps) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(transaction.invoiceNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };
  return (
    <div className="flex items-center gap-1.5">
      <div className="min-w-0">
        <p className="font-mono text-sm font-semibold text-neutral-900 dark:text-white">
          {transaction.invoiceNumber}
        </p>
        <p className="font-mono text-[10px] text-neutral-500">
          {formatDateShort(transaction.createdAt)}
        </p>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="shrink-0 rounded p-1 text-neutral-400 transition hover:bg-neutral-100 hover:text-primary dark:hover:bg-neutral-800"
        title="Copy invoice number"
        aria-label="Copy invoice number"
      >
        {copied ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />}
      </button>
    </div>
  );
}
