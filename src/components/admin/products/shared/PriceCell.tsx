"use client";

import { formatRupiah, getEffectivePrice, calculateDiscountedPrice } from "@/lib/products/utils";
import type { Product } from "@/lib/products/types";

interface PriceCellProps {
  product: Product;
}

export default function PriceCell({ product }: PriceCellProps) {
  if (product.isFree) {
    return (
      <span className="inline-flex items-center text-[10px] font-bold tracking-wider text-primary-dark bg-primary/20 px-1.5 py-0.5 rounded">
        GRATIS
      </span>
    );
  }

  const hasDiscount = product.discount?.enabled;
  const effective = hasDiscount
    ? calculateDiscountedPrice(product.price, product.discount!.percent)
    : product.price;

  return (
    <div className="flex flex-col">
      <span className="font-mono text-sm font-semibold text-neutral-900 dark:text-white">
        {formatRupiah(effective)}
      </span>
      {hasDiscount && (
        <span className="font-mono text-[10px] text-neutral-400 line-through">
          {formatRupiah(product.price)}
        </span>
      )}
    </div>
  );
}
