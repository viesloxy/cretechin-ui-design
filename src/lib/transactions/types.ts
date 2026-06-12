// Reuse dari checkout
export type PaymentMethodGroup = "ewallet" | "virtualaccount" | "creditcard";

export type PaymentMethodId =
  | "gopay"
  | "ovo"
  | "dana"
  | "shopeepay"
  | "bca_va"
  | "mandiri_va"
  | "bni_va"
  | "visa"
  | "mastercard";

export type TransactionStatus =
  | "berhasil"
  | "tertunda"
  | "gagal"
  | "refund"
  | "expired";

export type ItemType = "course" | "product" | "event";

export type TransactionSortBy = "newest" | "oldest" | "amount_high" | "amount_low";
export type DateRangePreset =
  | "all"
  | "today"
  | "7days"
  | "30days"
  | "this_month"
  | "3months"
  | "custom";

export interface TransactionItem {
  itemId: string;
  itemType: ItemType;
  itemName: string;
  thumbnailUrl?: string;
  price: number;
  quantity: number;
}

export interface TimelineEvent {
  timestamp: string;
  actor: "system" | `Admin ${string}` | `User ${string}`;
  event: string;
  type: "info" | "pending" | "success" | "failed" | "refund";
}

export interface PaymentDetails {
  vaNumber?: string | null;
  cardMasked?: string | null;
  methodSublabel?: string | null;
  fee: number;
  paidAt: string | null;
  expiredAt: string | null;
  proofUrl?: string | null;
}

export interface Transaction {
  id: string;
  invoiceNumber: string;
  userId: string;
  user: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
  items: TransactionItem[];
  subtotal: number;
  discount: number;
  discountCode: string | null;
  adminFee: number;
  total: number;
  paymentMethod: PaymentMethodId;
  paymentMethodGroup: PaymentMethodGroup;
  paymentDetails: PaymentDetails;
  status: TransactionStatus;
  notes: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
  updatedAt: string;
  timeline: TimelineEvent[];
}

export interface TransactionFilter {
  search: string;
  status: TransactionStatus | "all";
  itemType: ItemType | "all";
  paymentGroup: PaymentMethodGroup | "all";
  paymentMethod: PaymentMethodId | "all";
  datePreset: DateRangePreset;
  customDateFrom: string;
  customDateTo: string;
  sortBy: TransactionSortBy;
  page: number;
  perPage: number;
}

export interface TransactionStats {
  total: number;
  berhasil: number;
  tertunda: number;
  gagal: number;
  refund: number;
  expired: number;
  monthRevenue: number;
  lastMonthRevenue: number;
  totalRevenue: number;
}

export interface PaginationResult<T> {
  data: T[];
  totalPages: number;
  totalItems: number;
  startIndex: number;
  endIndex: number;
}
