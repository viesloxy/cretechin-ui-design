"use client";

import type {
  Transaction,
  TransactionsSummary,
  TransactionStatusFilter,
  TransactionTypeFilter,
  TransactionPeriodFilter,
} from "./types";

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "tx-001",
    invoiceNumber: "INV/CRE/2026/05/12345",
    date: "2026-05-12T14:30:00+07:00",
    type: "mixed",
    itemSummary: "1 Kursus, 2 Aset Digital",
    items: [
      {
        id: "i1",
        name: "UI/UX Design Masterclass",
        type: "course",
        quantity: 1,
        pricePerUnit: 250000,
        subtotal: 250000,
      },
      {
        id: "i2",
        name: "Icon Pack - Tech Edition",
        type: "asset",
        quantity: 1,
        pricePerUnit: 100000,
        subtotal: 100000,
      },
      {
        id: "i3",
        name: "Figma UI Kit Pro",
        type: "asset",
        quantity: 1,
        pricePerUnit: 100000,
        subtotal: 100000,
      },
    ],
    total: 450000,
    paymentMethod: "bca-va",
    status: "paid",
    orderDetailUrl: "/orders/tx-001",
    invoiceDownloadUrl: "/api/invoices/tx-001/download",
  },
  {
    id: "tx-002",
    invoiceNumber: "INV/CRE/2026/05/12300",
    date: "2026-05-10T09:15:00+07:00",
    type: "course",
    itemSummary: "Kursus React Advanced Patterns",
    items: [
      {
        id: "i4",
        name: "React Advanced Patterns",
        type: "course",
        quantity: 1,
        pricePerUnit: 350000,
        subtotal: 350000,
      },
    ],
    total: 350000,
    paymentMethod: "gopay",
    status: "paid",
    orderDetailUrl: "/orders/tx-002",
    invoiceDownloadUrl: "/api/invoices/tx-002/download",
  },
  {
    id: "tx-003",
    invoiceNumber: "INV/CRE/2026/05/12280",
    date: "2026-05-08T16:45:00+07:00",
    type: "asset",
    itemSummary: "Aset Digital - Web Dashboard Template",
    items: [
      {
        id: "i5",
        name: "Web Dashboard Template (Admin)",
        type: "asset",
        quantity: 1,
        pricePerUnit: 200000,
        subtotal: 200000,
      },
    ],
    total: 200000,
    paymentMethod: "ovo",
    status: "pending",
    orderDetailUrl: "/orders/tx-003",
  },
  {
    id: "tx-004",
    invoiceNumber: "INV/CRE/2026/05/12250",
    date: "2026-05-05T11:20:00+07:00",
    type: "course",
    itemSummary: "Kursus Python for Data Science",
    items: [
      {
        id: "i6",
        name: "Python for Data Science",
        type: "course",
        quantity: 1,
        pricePerUnit: 400000,
        subtotal: 400000,
      },
    ],
    total: 400000,
    paymentMethod: "mandiri-va",
    status: "failed",
    orderDetailUrl: "/orders/tx-004",
    failureReason: "Pembayaran tidak berhasil setelah 24 jam",
  },
  {
    id: "tx-005",
    invoiceNumber: "INV/CRE/2026/04/12100",
    date: "2026-04-28T13:00:00+07:00",
    type: "event",
    itemSummary: "Tiket Acara - Tech Conference 2026",
    items: [
      {
        id: "i7",
        name: "Tech Conference 2026 - Regular",
        type: "event",
        quantity: 1,
        pricePerUnit: 500000,
        subtotal: 500000,
      },
    ],
    total: 500000,
    paymentMethod: "bni-va",
    status: "paid",
    orderDetailUrl: "/orders/tx-005",
    invoiceDownloadUrl: "/api/invoices/tx-005/download",
  },
  {
    id: "tx-006",
    invoiceNumber: "INV/CRE/2026/04/12050",
    date: "2026-04-20T08:30:00+07:00",
    type: "asset",
    itemSummary: "Bundle 3 Aset Digital - Starter Pack",
    items: [
      {
        id: "i8",
        name: "Icon Pack Basic",
        type: "asset",
        quantity: 1,
        pricePerUnit: 50000,
        subtotal: 50000,
      },
      {
        id: "i9",
        name: "Color Palette Pro",
        type: "asset",
        quantity: 1,
        pricePerUnit: 75000,
        subtotal: 75000,
      },
      {
        id: "i10",
        name: "Typography Bundle",
        type: "asset",
        quantity: 1,
        pricePerUnit: 75000,
        subtotal: 75000,
      },
    ],
    total: 200000,
    paymentMethod: "dana",
    status: "refunded",
    orderDetailUrl: "/orders/tx-006",
    invoiceDownloadUrl: "/api/invoices/tx-006/refund-receipt",
    refundedAt: "2026-04-25T10:00:00+07:00",
  },
  {
    id: "tx-007",
    invoiceNumber: "INV/CRE/2026/04/11900",
    date: "2026-04-15T19:45:00+07:00",
    type: "course",
    itemSummary: "Kursus TypeScript Deep Dive",
    items: [
      {
        id: "i11",
        name: "TypeScript Deep Dive",
        type: "course",
        quantity: 1,
        pricePerUnit: 300000,
        subtotal: 300000,
      },
    ],
    total: 300000,
    paymentMethod: "credit-card",
    status: "paid",
    orderDetailUrl: "/orders/tx-007",
    invoiceDownloadUrl: "/api/invoices/tx-007/download",
  },
  {
    id: "tx-008",
    invoiceNumber: "INV/CRE/2026/04/11850",
    date: "2026-04-10T14:00:00+07:00",
    type: "asset",
    itemSummary: "Aset Digital - Mobile UI Kit",
    items: [
      {
        id: "i12",
        name: "Mobile UI Kit Premium",
        type: "asset",
        quantity: 1,
        pricePerUnit: 150000,
        subtotal: 150000,
      },
    ],
    total: 150000,
    paymentMethod: "shopeepay",
    status: "paid",
    orderDetailUrl: "/orders/tx-008",
    invoiceDownloadUrl: "/api/invoices/tx-008/download",
  },
  {
    id: "tx-009",
    invoiceNumber: "INV/CRE/2026/03/11700",
    date: "2026-03-28T10:30:00+07:00",
    type: "mixed",
    itemSummary: "1 Kursus, 1 Aset Digital",
    items: [
      {
        id: "i13",
        name: "JavaScript Fundamentals",
        type: "course",
        quantity: 1,
        pricePerUnit: 250000,
        subtotal: 250000,
      },
      {
        id: "i14",
        name: "JavaScript Cheatsheet PDF",
        type: "asset",
        quantity: 1,
        pricePerUnit: 50000,
        subtotal: 50000,
      },
    ],
    total: 300000,
    paymentMethod: "bca-va",
    status: "expired",
    orderDetailUrl: "/orders/tx-009",
  },
  {
    id: "tx-010",
    invoiceNumber: "INV/CRE/2026/03/11550",
    date: "2026-03-15T16:20:00+07:00",
    type: "course",
    itemSummary: "Kursus Web Accessibility (A11Y)",
    items: [
      {
        id: "i15",
        name: "Web Accessibility (A11Y) Mastery",
        type: "course",
        quantity: 1,
        pricePerUnit: 275000,
        subtotal: 275000,
      },
    ],
    total: 275000,
    paymentMethod: "gopay",
    status: "paid",
    orderDetailUrl: "/orders/tx-010",
    invoiceDownloadUrl: "/api/invoices/tx-010/download",
  },
];

export const MOCK_TRANSACTIONS_EMPTY: Transaction[] = [];

export function calculateSummary(
  transactions: Transaction[],
): TransactionsSummary {
  return {
    totalTransactions: transactions.filter(
      (t) => t.status === "paid" || t.status === "refunded",
    ).length,
    totalSpent: transactions
      .filter((t) => t.status === "paid" || t.status === "refunded")
      .reduce((sum, t) => sum + t.total, 0),
    pendingCount: transactions.filter((t) => t.status === "pending").length,
    paidCount: transactions.filter((t) => t.status === "paid").length,
    failedCount: transactions.filter(
      (t) => t.status === "failed" || t.status === "expired",
    ).length,
  };
}

export function filterByStatus(
  transactions: Transaction[],
  status: TransactionStatusFilter,
): Transaction[] {
  if (status === "all") return transactions;
  if (status === "failed") {
    return transactions.filter(
      (t) => t.status === "failed" || t.status === "expired",
    );
  }
  return transactions.filter((t) => t.status === status);
}

export function filterByType(
  transactions: Transaction[],
  type: TransactionTypeFilter,
): Transaction[] {
  if (type === "all") return transactions;
  return transactions.filter(
    (t) => t.type === type || t.type === "mixed",
  );
}

export function filterByPeriod(
  transactions: Transaction[],
  period: TransactionPeriodFilter,
): Transaction[] {
  if (period === "all") return transactions;
  const days =
    period === "7d" ? 7 : period === "30d" ? 30 : period === "90d" ? 90 : 365;
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  return transactions.filter((t) => new Date(t.date) >= cutoff);
}
