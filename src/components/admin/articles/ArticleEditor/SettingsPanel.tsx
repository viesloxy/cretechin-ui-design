"use client";

import type { ArticleCategory, ArticleStatus } from "@/lib/articles/types";
import PublishStatusCard from "./PublishStatusCard";
import SettingsCard from "./SettingsCard";
import ThumbnailUploader from "./ThumbnailUploader";
import CategorySelect from "./CategorySelect";
import TagInput from "./TagInput";
import OptionsCard from "./OptionsCard";
import ExcerptCard from "./ExcerptCard";
import SEOCard from "./SEOCard";
import ArticleInfoCard from "./ArticleInfoCard";

interface SettingsPanelProps {
  status: ArticleStatus;
  scheduledAt: string;
  thumbnail: { url: string; width: number; height: number } | null;
  category: ArticleCategory;
  tags: string[];
  featured: boolean;
  allowComments: boolean;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  slug: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;

  onStatusChange: (s: ArticleStatus) => void;
  onScheduledAtChange: (v: string) => void;
  onThumbnailChange: (v: { url: string; width: number; height: number } | null) => void;
  onCategoryChange: (c: ArticleCategory) => void;
  onTagsChange: (tags: string[]) => void;
  onFeaturedChange: (v: boolean) => void;
  onAllowCommentsChange: (v: boolean) => void;
  onExcerptChange: (v: string) => void;
  onMetaTitleChange: (v: string) => void;
  onMetaDescriptionChange: (v: string) => void;
  onSlugChange: (v: string) => void;
  onSave: () => void;
  isSaving: boolean;
}

export default function SettingsPanel(props: SettingsPanelProps) {
  return (
    <aside className="space-y-4 lg:sticky lg:top-6">
      <PublishStatusCard
        status={props.status}
        scheduledAt={props.scheduledAt}
        onStatusChange={props.onStatusChange}
        onScheduledAtChange={props.onScheduledAtChange}
        onSave={props.onSave}
        isSaving={props.isSaving}
      />

      <SettingsCard title="Gambar Sampul" badge="Wajib">
        <ThumbnailUploader value={props.thumbnail} onChange={props.onThumbnailChange} />
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Rekomendasi: 1200×630px, format JPG/PNG/WebP, max 2MB
        </p>
      </SettingsCard>

      <CategorySelect value={props.category} onChange={props.onCategoryChange} />

      <TagInput value={props.tags} onChange={props.onTagsChange} />

      <OptionsCard
        featured={props.featured}
        onFeaturedChange={props.onFeaturedChange}
        allowComments={props.allowComments}
        onAllowCommentsChange={props.onAllowCommentsChange}
      />

      <ExcerptCard value={props.excerpt} onChange={props.onExcerptChange} />

      <SEOCard
        metaTitle={props.metaTitle}
        metaDescription={props.metaDescription}
        slug={props.slug}
        onMetaTitleChange={props.onMetaTitleChange}
        onMetaDescriptionChange={props.onMetaDescriptionChange}
        onSlugChange={props.onSlugChange}
      />

      <ArticleInfoCard
        authorName={props.authorName}
        createdAt={props.createdAt}
        updatedAt={props.updatedAt}
      />
    </aside>
  );
}
