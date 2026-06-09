"use client";

import SettingsCard from "@/components/admin/articles/ArticleEditor/SettingsCard";
import ToggleSwitch from "@/components/ui/ToggleSwitch";
import type { CourseDiscount } from "@/lib/courses/types";

interface PriceCardProps {
  price: number;
  isFree: boolean;
  discount: CourseDiscount | null;
  onPriceChange: (v: number) => void;
  onIsFreeChange: (v: boolean) => void;
  onDiscountChange: (d: CourseDiscount | null) => void;
}

export default function PriceCard({
  price,
  isFree,
  discount,
  onPriceChange,
  onIsFreeChange,
  onDiscountChange,
}: PriceCardProps) {
  return (
    <SettingsCard title="Harga" badge="Wajib">
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium text-neutral-700 dark:text-white/80">Harga (IDR)</label>
          <div className="relative mt-1.5">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-neutral-500">Rp</span>
            <input
              type="number"
              value={isFree ? 0 : price}
              onChange={(e) => onPriceChange(Number(e.target.value))}
              disabled={isFree}
              min={0}
              placeholder="0"
              className="w-full h-10 pl-10 pr-3 rounded-xl bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800">
          <ToggleSwitch
            checked={isFree}
            onChange={onIsFreeChange}
            label="Jadikan Kursus Gratis"
            description="Siswa dapat mengakses tanpa bayar"
          />
        </div>

        <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 space-y-3">
          <ToggleSwitch
            checked={discount?.enabled ?? false}
            onChange={(v) =>
              onDiscountChange(
                v
                  ? discount ?? { enabled: true, originalPrice: price * 1.5, percent: 30, validUntil: "" }
                  : null
              )
            }
            label="Aktifkan Diskon"
            description="Harga akan dicoret dan tampil lebih murah"
          />
          {discount?.enabled && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Harga Coret</label>
                  <div className="relative mt-1">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-neutral-500">Rp</span>
                    <input
                      type="number"
                      value={discount.originalPrice}
                      onChange={(e) => onDiscountChange({ ...discount, originalPrice: Number(e.target.value) })}
                      min={0}
                      className="w-full h-9 pl-8 pr-2 rounded-lg bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Diskon (%)</label>
                  <input
                    type="number"
                    value={discount.percent}
                    onChange={(e) => onDiscountChange({ ...discount, percent: Number(e.target.value) })}
                    min={0}
                    max={100}
                    className="mt-1 w-full h-9 px-2 rounded-lg bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Berlaku sampai</label>
                <input
                  type="date"
                  value={discount.validUntil}
                  onChange={(e) => onDiscountChange({ ...discount, validUntil: e.target.value })}
                  className="mt-1 w-full h-9 px-2 rounded-lg bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </SettingsCard>
  );
}
