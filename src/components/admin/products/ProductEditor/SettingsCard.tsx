"use client";

import SettingsCard from "@/components/admin/articles/ArticleEditor/SettingsCard";
import ToggleSwitch from "@/components/ui/ToggleSwitch";

interface ExtraSettingsCardProps {
  featured: boolean;
  enableReview: boolean;
  downloadLimit: number | undefined;
  productType: "physical" | "digital";
  onFeaturedChange: (v: boolean) => void;
  onEnableReviewChange: (v: boolean) => void;
  onDownloadLimitChange: (v: number | undefined) => void;
  downloadLimitEnabled: boolean;
  onDownloadLimitEnabledChange: (v: boolean) => void;
}

export default function ExtraSettingsCard({
  featured,
  enableReview,
  downloadLimit,
  productType,
  onFeaturedChange,
  onEnableReviewChange,
  onDownloadLimitChange,
  downloadLimitEnabled,
  onDownloadLimitEnabledChange,
}: ExtraSettingsCardProps) {
  return (
    <SettingsCard title="Pengaturan Tambahan">
      <div className="space-y-3">
        <ToggleSwitch
          checked={featured}
          onChange={onFeaturedChange}
          label="Produk Unggulan"
          description="Tampil di section Unggulan di marketplace"
        />
        <ToggleSwitch
          checked={enableReview}
          onChange={onEnableReviewChange}
          label="Aktifkan Review"
          description="Pembeli dapat memberikan rating & review"
        />
        {productType === "digital" && (
          <>
            <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
              <ToggleSwitch
                checked={downloadLimitEnabled}
                onChange={onDownloadLimitEnabledChange}
                label="Batasi Jumlah Unduhan"
                description="Batasi unduhan per pembeli"
              />
            </div>
            {downloadLimitEnabled && (
              <div className="pl-1">
                <label className="text-xs text-neutral-500 dark:text-neutral-400">Maksimal unduhan per pembeli</label>
                <input
                  type="number"
                  value={downloadLimit ?? ""}
                  onChange={(e) => onDownloadLimitChange(e.target.value ? Number(e.target.value) : undefined)}
                  min={1}
                  placeholder="cth: 3"
                  className="mt-1 w-full h-9 px-3 rounded-lg bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            )}
          </>
        )}
      </div>
    </SettingsCard>
  );
}
