"use client";

import { formatRupiah, formatDate } from "@/lib/format";
import type { PaymentMethod, Transaction } from "./types";

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  "bca-va": "BCA VA",
  "mandiri-va": "Mandiri VA",
  "bni-va": "BNI VA",
  gopay: "GoPay",
  ovo: "OVO",
  dana: "DANA",
  shopeepay: "ShopeePay",
  "credit-card": "Kartu Kredit",
};

export function getPaymentMethodLabel(method: PaymentMethod): string {
  return PAYMENT_METHOD_LABELS[method] ?? method;
}

export const STATUS_LABELS: Record<Transaction["status"], string> = {
  paid: "Berhasil",
  pending: "Tertunda",
  failed: "Gagal",
  refunded: "Dikembalikan",
  expired: "Kadaluarsa",
};

export const STATUS_FILTER_LABELS: Record<
  import("./types").TransactionStatusFilter,
  string
> = {
  all: "Semua",
  paid: "Berhasil",
  pending: "Tertunda",
  failed: "Gagal",
  refunded: "Dikembalikan",
  expired: "Kadaluarsa",
};

/**
 * Generate a simple text invoice (mock — real impl would use server-side PDF).
 */
export function generateInvoiceText(transaction: Transaction): string {
  return `
INVOICE
${transaction.invoiceNumber}

Tanggal   : ${formatDate(transaction.date)}
Pembayaran: ${getPaymentMethodLabel(transaction.paymentMethod)}
Status    : ${STATUS_LABELS[transaction.status].toUpperCase()}

DETAIL ITEM
${transaction.items
  .map(
    (item) =>
      `- ${item.name} (${item.type}) x${item.quantity} = ${formatRupiah(item.subtotal)}`,
  )
  .join("\n")}

TOTAL     : ${formatRupiah(transaction.total)}

---
Terima kasih atas pembelian Anda di CreTechin!
Untuk bantuan, hubungi support@cretechin.id
  `.trim();
}
