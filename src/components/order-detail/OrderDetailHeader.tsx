"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function OrderDetailHeader() {
  return (
    <div className="py-12 md:py-16">
      <Link
        href="/checkout"
        className="inline-flex items-center gap-2 text-sm text-neutral-500 dark:text-white/50 hover:text-primary mb-6 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Kembali ke Pembayaran</span>
      </Link>
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-neutral-900 dark:text-white">
        Detail Pembayaran
      </h1>
    </div>
  );
}
