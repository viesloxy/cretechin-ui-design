"use client";

import SettingsCard from "./SettingsCard";

interface SEOCardProps {
  metaTitle: string;
  metaDescription: string;
  slug: string;
  onMetaTitleChange: (v: string) => void;
  onMetaDescriptionChange: (v: string) => void;
  onSlugChange: (v: string) => void;
}

export default function SEOCard({
  metaTitle,
  metaDescription,
  slug,
  onMetaTitleChange,
  onMetaDescriptionChange,
  onSlugChange,
}: SEOCardProps) {
  return (
    <SettingsCard title="SEO Metadata" defaultOpen={false}>
      <div className="space-y-3">
        <div>
          <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
            Meta Title
          </label>
          <input
            type="text"
            value={metaTitle}
            onChange={(e) => onMetaTitleChange(e.target.value)}
            placeholder="Judul untuk search engine..."
            className="mt-1.5 w-full h-9 px-3 rounded-lg bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:border-primary transition-colors"
            maxLength={80}
          />
          <p className="text-xs text-neutral-400 mt-1">{metaTitle.length}/80</p>
        </div>

        <div>
          <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
            Meta Description
          </label>
          <textarea
            value={metaDescription}
            onChange={(e) => onMetaDescriptionChange(e.target.value)}
            placeholder="Deskripsi untuk search engine..."
            rows={2}
            className="mt-1.5 w-full px-3 py-2 rounded-lg bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
            maxLength={200}
          />
          <p className="text-xs text-neutral-400 mt-1">{metaDescription.length}/200</p>
        </div>

        <div>
          <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
            Slug URL
          </label>
          <div className="mt-1.5 flex items-center rounded-lg border border-black/10 dark:border-white/10 focus-within:border-primary transition-colors overflow-hidden">
            <span className="px-2 py-1.5 text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-800 border-r border-black/10 dark:border-white/10 font-mono whitespace-nowrap">
              cretechin.com/blog/
            </span>
            <input
              type="text"
              value={slug}
              onChange={(e) => onSlugChange(e.target.value)}
              placeholder="judul-artikel-anda"
              className="flex-1 h-9 px-2 bg-transparent text-sm font-mono focus:outline-none"
            />
          </div>
        </div>
      </div>
    </SettingsCard>
  );
}
