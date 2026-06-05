"use client";

import type { ComponentType } from "react";

export type FAQCategory =
  | "account"
  | "payment"
  | "course"
  | "asset"
  | "certificate"
  | "technical";

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
  tags?: string[];
  isPopular?: boolean;
  isNew?: boolean;
  helpfulCount: number;
  relatedLinks?: {
    label: string;
    href: string;
    external?: boolean;
  }[];
  relatedFAQs?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface HelpCategory {
  id: FAQCategory;
  label: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  href: string;
  articleCount: number;
}

export interface QuickLinkItem {
  id: string;
  label: string;
  description?: string;
  icon: ComponentType<{ className?: string }>;
  href: string;
  external?: boolean;
}

export type SearchResultType = "faq" | "article" | "category";

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  snippet: string;
  url: string;
  category?: FAQCategory;
  relevanceScore: number;
}

export type HelpfulnessResponse = "yes" | "no" | null;

export const VALID_CATEGORIES: FAQCategory[] = [
  "account",
  "payment",
  "course",
  "asset",
  "certificate",
  "technical",
];
