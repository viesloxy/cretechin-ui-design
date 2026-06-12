"use client";

import { Wallet, Building2, CreditCard } from "lucide-react";
import type { PaymentMethodId, PaymentMethodGroup } from "@/lib/transactions/types";
import { getPaymentGroup, getPaymentLabel } from "@/lib/transactions/utils";

interface PaymentMethodBadgeProps {
  method: PaymentMethodId;
  withLogo?: boolean;
  size?: "sm" | "md";
}

const GROUP_ICONS: Record<PaymentMethodGroup, typeof Wallet> = {
  ewallet: Wallet,
  virtualaccount: Building2,
  creditcard: CreditCard,
};

export function PaymentMethodBadge({
  method,
  withLogo = true,
  size = "sm",
}: PaymentMethodBadgeProps) {
  const Icon = GROUP_ICONS[getPaymentGroup(method)];
  const sizeClasses = size === "sm" ? "gap-1.5 text-[10px]" : "gap-2 text-xs";
  const iconBox = size === "sm" ? "h-5 w-5" : "h-7 w-7";
  const iconSize = size === "sm" ? "h-3 w-3" : "h-4 w-4";
  return (
    <span className={`inline-flex items-center ${sizeClasses} font-medium text-neutral-700 dark:text-neutral-200`}>
      {withLogo ? (
        <span
          className={`flex shrink-0 items-center justify-center overflow-hidden rounded-md border border-black/5 bg-white dark:border-white/10 dark:bg-neutral-800 ${iconBox}`}
        >
          <Icon className={`${iconSize} text-neutral-500 dark:text-neutral-300`} />
        </span>
      ) : null}
      {getPaymentLabel(method)}
    </span>
  );
}
