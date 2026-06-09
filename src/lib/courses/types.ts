export type CourseCategory =
  | "teknologi"
  | "bisnis"
  | "kreatif"
  | "pemasaran"
  | "desain"
  | "data";

export type CourseLevel = "pemula" | "menengah" | "mahir";

export type CourseStatus = "draft" | "published" | "coming_soon" | "archived";

export type CourseSortBy = "newest" | "oldest" | "popular" | "title";

export type LessonType = "video" | "pdf" | "text" | "quiz" | "link" | "download";

export interface Instructor {
  id: string;
  name: string;
  title?: string;
  avatar?: string;
}

export interface CourseLesson {
  id: string;
  title: string;
  type: LessonType;
  duration: number; // seconds
  isFree: boolean;
  order: number;
  contentUrl?: string;
  contentText?: string;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  objectives: string[];
  order: number;
  lessons: CourseLesson[];
}

export interface CourseDiscount {
  enabled: boolean;
  originalPrice: number;
  percent: number;
  validUntil: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  instructor: Instructor;
  description: string;
  shortDescription: string;
  whatYouWillLearn: string[];
  targetAudience: string[];
  thumbnail: { url: string; width: number; height: number } | null;
  trailerUrl: string;
  category: CourseCategory;
  level: CourseLevel;
  language: "id" | "en";
  tags: string[];
  price: number;
  isFree: boolean;
  discount: CourseDiscount | null;
  status: CourseStatus;
  featured: boolean;
  certificateEnabled: boolean;
  discussionEnabled: boolean;
  modules: CourseModule[];
  studentCount: number;
  rating: number;
  reviewCount: number;
  estimatedDuration: number;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export const CATEGORY_LABELS: Record<CourseCategory, string> = {
  teknologi: "Teknologi",
  bisnis: "Bisnis",
  kreatif: "Kreatif",
  pemasaran: "Pemasaran",
  desain: "Desain",
  data: "Data & AI",
};

export const CATEGORY_OPTIONS: { value: CourseCategory; label: string }[] = [
  { value: "teknologi", label: CATEGORY_LABELS.teknologi },
  { value: "bisnis", label: CATEGORY_LABELS.bisnis },
  { value: "kreatif", label: CATEGORY_LABELS.kreatif },
  { value: "pemasaran", label: CATEGORY_LABELS.pemasaran },
  { value: "desain", label: CATEGORY_LABELS.desain },
  { value: "data", label: CATEGORY_LABELS.data },
];

export const LEVEL_LABELS: Record<CourseLevel, string> = {
  pemula: "Pemula",
  menengah: "Menengah",
  mahir: "Mahir",
};

export const LEVEL_OPTIONS: { value: CourseLevel; label: string }[] = [
  { value: "pemula", label: LEVEL_LABELS.pemula },
  { value: "menengah", label: LEVEL_LABELS.menengah },
  { value: "mahir", label: LEVEL_LABELS.mahir },
];

export const LESSON_TYPE_LABELS: Record<LessonType, string> = {
  video: "Video",
  pdf: "PDF",
  text: "Artikel",
  quiz: "Kuis",
  link: "Link",
  download: "Download",
};
