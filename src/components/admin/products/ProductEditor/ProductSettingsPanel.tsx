"use client";

import type { Product, ProductCategory, ProductStatus, ProductType } from "@/lib/products/types";
import PublishStatusCard from "./PublishStatusCard";
import CategoryStatusCard from "./CategoryStatusCard";
import ExtraSettingsCard from "./SettingsCard";
import SeoCard from "./SeoCard";
import StatsCard from "./StatsCard";

interface ProductSettingsPanelProps {
  product: Product | null;
  status: ProductStatus;
  category: ProductCategory;
  productType: ProductType;
  featured: boolean;
  enableReview: boolean;
  downloadLimit: number | undefined;
  downloadLimitEnabled: boolean;
  metaTitle: string;
  metaDescription: string;
  slug: string;
  onStatusChange: (s: ProductStatus) => void;
  onCategoryChange: (c: ProductCategory) => void;
  onFeaturedChange: (v: boolean) => void;
  onEnableReviewChange: (v: boolean) => void;
  onDownloadLimitChange: (v: number | undefined) => void;
  onDownloadLimitEnabledChange: (v: boolean) => void;
  onMetaTitleChange: (v: string) => void;
  onMetaDescriptionChange: (v: string) => void;
  onSave: () => void;
  isSaving: boolean;
}

export default function ProductSettingsPanel(props: ProductSettingsPanelProps) {
  return (
    <aside className="space-y-4 lg:sticky lg:top-6">
      <PublishStatusCard
        status={props.status}
        onStatusChange={props.onStatusChange}
        onSave={props.onSave}
        isSaving={props.isSaving}
      />
      <CategoryStatusCard
        category={props.category}
        productType={props.productType}
        onCategoryChange={props.onCategoryChange}
      />
      <ExtraSettingsCard
        featured={props.featured}
        enableReview={props.enableReview}
        downloadLimit={props.downloadLimit}
        productType={props.productType}
        onFeaturedChange={props.onFeaturedChange}
        onEnableReviewChange={props.onEnableReviewChange}
        onDownloadLimitChange={props.onDownloadLimitChange}
        onDownloadLimitEnabledChange={props.onDownloadLimitEnabledChange}
        downloadLimitEnabled={props.downloadLimitEnabled}
      />
      <SeoCard
        metaTitle={props.metaTitle}
        metaDescription={props.metaDescription}
        slug={props.slug}
        onMetaTitleChange={props.onMetaTitleChange}
        onMetaDescriptionChange={props.onMetaDescriptionChange}
      />
      {props.product && <StatsCard product={props.product} />}
    </aside>
  );
}
