"use client";

import type { CourseCategory, CourseDiscount, CourseLevel, CourseStatus } from "@/lib/courses/types";
import PublishStatusCard from "./PublishStatusCard";
import PriceCard from "./PriceCard";
import CategoryLevelCard from "./CategoryLevelCard";
import CourseInfoCard from "./CourseInfoCard";

interface CourseSettingsPanelProps {
  status: CourseStatus;
  price: number;
  isFree: boolean;
  discount: CourseDiscount | null;
  category: CourseCategory;
  level: CourseLevel;
  studentCount: number;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;

  onStatusChange: (s: CourseStatus) => void;
  onPriceChange: (v: number) => void;
  onIsFreeChange: (v: boolean) => void;
  onDiscountChange: (d: CourseDiscount | null) => void;
  onCategoryChange: (c: CourseCategory) => void;
  onLevelChange: (l: CourseLevel) => void;
  onSave: () => void;
  isSaving: boolean;
}

export default function CourseSettingsPanel(props: CourseSettingsPanelProps) {
  return (
    <aside className="space-y-4 lg:sticky lg:top-6">
      <PublishStatusCard
        status={props.status}
        onStatusChange={props.onStatusChange}
        onSave={props.onSave}
        isSaving={props.isSaving}
      />
      <PriceCard
        price={props.price}
        isFree={props.isFree}
        discount={props.discount}
        onPriceChange={props.onPriceChange}
        onIsFreeChange={props.onIsFreeChange}
        onDiscountChange={props.onDiscountChange}
      />
      <CategoryLevelCard
        category={props.category}
        level={props.level}
        onCategoryChange={props.onCategoryChange}
        onLevelChange={props.onLevelChange}
      />
      <CourseInfoCard
        studentCount={props.studentCount}
        rating={props.rating}
        reviewCount={props.reviewCount}
        createdAt={props.createdAt}
        updatedAt={props.updatedAt}
      />
    </aside>
  );
}
