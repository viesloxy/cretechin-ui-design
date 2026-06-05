"use client";

export type TransactionType = "course" | "asset" | "event" | "mixed";

export type TransactionStatus =
  | "paid"
  | "pending"
  | "failed"
  | "refunded"
  | "expired";

export type PaymentMethod =
  | "bca-va"
  | "mandiri-va"
  | "bni-va"
  | "gopay"
  | "ovo"
  | "dana"
  | "shopeepay"
  | "credit-card";

export interface TransactionItem {
  id: string;
  name: string;
  type: "course" | "asset" | "event";
  quantity: number;
  pricePerUnit: number;
  subtotal: number;
}

export interface Transaction {
  id: string;
  invoiceNumber: string;
  date: string;
  type: TransactionType;
  itemSummary: string;
  items: TransactionItem[];
  total: number;
  paymentMethod: PaymentMethod;
  status: TransactionStatus;
  orderDetailUrl: string;
  invoiceDownloadUrl?: string;
  refundedAt?: string;
  failureReason?: string;
}

export type TransactionStatusFilter = "all" | TransactionStatus;
export type TransactionTypeFilter = "all" | Exclude<TransactionType, "mixed">;
export type TransactionPeriodFilter = "7d" | "30d" | "90d" | "1y" | "all";

export interface TransactionsSummary {
  totalTransactions: number;
  totalSpent: number;
  pendingCount: number;
  paidCount: number;
  failedCount: number;
}

export const VALID_STATUS_FILTERS: TransactionStatusFilter[] = [
  "all",
  "paid",
  "pending",
  "failed",
  "refunded",
  "expired",
];

export const VALID_TYPE_FILTERS: TransactionTypeFilter[] = [
  "all",
  "course",
  "asset",
  "event",
];

export const VALID_PERIOD_FILTERS: TransactionPeriodFilter[] = [
  "7d",
  "30d",
  "90d",
  "1y",
  "all",
];
