export type ArticleCategory =
  | "tips"
  | "tutorial"
  | "berita"
  | "event"
  | "insight"
  | "komunitas";

export type ArticleStatus = "draft" | "published" | "scheduled";

export type SortBy = "newest" | "oldest" | "popular" | "title";

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail: {
    url: string;
    width: number;
    height: number;
  } | null;
  category: ArticleCategory;
  tags: string[];
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  status: ArticleStatus;
  featured: boolean;
  allowComments: boolean;
  metaTitle?: string;
  metaDescription?: string;
  views: number;
  likes: number;
  comments: number;
  readTime: number;
  publishedAt: string | null;
  scheduledAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export const CATEGORY_LABELS: Record<ArticleCategory, string> = {
  tips: "Tips & Trik",
  tutorial: "Tutorial",
  berita: "Berita Teknologi",
  event: "Event & Webinar",
  insight: "Insight Industri",
  komunitas: "Komunitas",
};

export const CATEGORY_OPTIONS: { value: ArticleCategory; label: string }[] = [
  { value: "tips", label: CATEGORY_LABELS.tips },
  { value: "tutorial", label: CATEGORY_LABELS.tutorial },
  { value: "berita", label: CATEGORY_LABELS.berita },
  { value: "event", label: CATEGORY_LABELS.event },
  { value: "insight", label: CATEGORY_LABELS.insight },
  { value: "komunitas", label: CATEGORY_LABELS.komunitas },
];
