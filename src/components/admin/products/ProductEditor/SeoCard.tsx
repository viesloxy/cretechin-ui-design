"use client";

import SettingsCard from "@/components/admin/articles/ArticleEditor/SettingsCard";

interface SeoCardProps {
  metaTitle: string;
  metaDescription: string;
  slug: string;
  onMetaTitleChange: (v: string) => void;
  onMetaDescriptionChange: (v: string) => void;
}

export default function SeoCard({
  metaTitle,
  metaDescription,
  slug,
  onMetaTitleChange,
  onMetaDescriptionChange,
}: SeoCardProps) {
  return (
    <SettingsCard title="SEO & Metadata">
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium text-neutral-700 dark:text-white/80">Slug URL</label>
          <div className="mt-1.5 flex items-center rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-800/30 overflow-hidden">
            <span className="px-2.5 text-[10px] text-neutral-500 dark:text-neutral-400 font-mono whitespace-nowrap">
              cretechin.com/products/
            </span>
            <span className="flex-1 px-2 py-2 text-xs font-mono text-neutral-700 dark:text-neutral-300 truncate">
              {slug || "—"}
            </span>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-neutral-700 dark:text-white/80">Meta Title</label>
            <span
              className={`text-[10px] font-mono ${
                metaTitle.length > 60 ? "text-red-500" : "text-neutral-500"
              }`}
            >
              {metaTitle.length}/60
            </span>
          </div>
          <input
            type="text"
            value={metaTitle}
            onChange={(e) => onMetaTitleChange(e.target.value.slice(0, 80))}
            placeholder="Otomatis dari judul jika kosong"
            maxLength={80}
            className="mt-1.5 w-full h-9 px-3 rounded-lg bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-neutral-700 dark:text-white/80">Meta Description</label>
            <span
              className={`text-[10px] font-mono ${
                metaDescription.length > 160 ? "text-red-500" : "text-neutral-500"
              }`}
            >
              {metaDescription.length}/160
            </span>
          </div>
          <textarea
            value={metaDescription}
            onChange={(e) => onMetaDescriptionChange(e.target.value.slice(0, 200))}
            placeholder="Otomatis dari ringkasan jika kosong"
            maxLength={200}
            rows={3}
            className="mt-1.5 w-full px-3 py-2 rounded-lg bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
          />
        </div>
      </div>
    </SettingsCard>
  );
}
