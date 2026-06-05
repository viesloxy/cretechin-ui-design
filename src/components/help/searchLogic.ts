"use client";

import type { FAQ, FAQCategory, SearchResult } from "./types";

/**
 * Search FAQs by keyword (case-insensitive, multi-word AND match with scoring).
 */
export function searchFAQs(faqs: FAQ[], query: string): SearchResult[] {
  if (!query || query.length < 2) return [];

  const normalizedQuery = query.toLowerCase().trim();
  const queryWords = normalizedQuery.split(/\s+/).filter(Boolean);

  const results = faqs.map((faq) => {
    let score = 0;
    const titleLower = faq.question.toLowerCase();
    const answerLower = faq.answer.toLowerCase();
    const tagsLower = (faq.tags ?? []).join(" ").toLowerCase();

    if (titleLower.includes(normalizedQuery)) score += 50;
    queryWords.forEach((word) => {
      if (titleLower.includes(word)) score += 20;
    });

    if (tagsLower.includes(normalizedQuery)) score += 30;
    queryWords.forEach((word) => {
      if (tagsLower.includes(word)) score += 10;
    });

    if (answerLower.includes(normalizedQuery)) score += 15;
    queryWords.forEach((word) => {
      if (answerLower.includes(word)) score += 5;
    });

    if (titleLower === normalizedQuery) score += 100;

    return {
      id: faq.id,
      type: "faq" as const,
      title: faq.question,
      snippet: extractSnippet(faq.answer, normalizedQuery),
      url: `/help?faq=${faq.id}`,
      category: faq.category,
      relevanceScore: score,
    };
  });

  return results
    .filter((r) => r.relevanceScore > 0)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 10);
}

function extractSnippet(text: string, query: string, length = 150): string {
  const lower = text.toLowerCase();
  const idx = lower.indexOf(query);
  if (idx === -1) {
    return text.length > length ? `${text.slice(0, length)}...` : text;
  }
  const start = Math.max(0, idx - 50);
  const end = Math.min(text.length, idx + query.length + 100);
  return `${start > 0 ? "..." : ""}${text.slice(start, end)}${end < text.length ? "..." : ""}`;
}

/**
 * Render snippet with the matched query highlighted (<mark>).
 * Caller can sanitize via CSS or downstream; we use a simple string split.
 */
export function highlightSnippet(
  snippet: string,
  query: string,
): { before: string; match: string; after: string } | null {
  if (!query) return null;
  const lower = snippet.toLowerCase();
  const q = query.toLowerCase();
  const idx = lower.indexOf(q);
  if (idx === -1) return null;
  return {
    before: snippet.slice(0, idx),
    match: snippet.slice(idx, idx + q.length),
    after: snippet.slice(idx + q.length),
  };
}

export function filterFAQsByCategory(
  faqs: FAQ[],
  category: FAQCategory | null,
): FAQ[] {
  if (!category) return faqs;
  return faqs.filter((f) => f.category === category);
}

export function sortFAQs(faqs: FAQ[], sort: "popular" | "newest"): FAQ[] {
  if (sort === "newest") {
    return [...faqs].sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );
  }
  return [...faqs].sort((a, b) => {
    if (a.isPopular && !b.isPopular) return -1;
    if (!a.isPopular && b.isPopular) return 1;
    return b.helpfulCount - a.helpfulCount;
  });
}

interface FeedbackEntry {
  yes: number;
  no: number;
  comments: string[];
}

const feedbackStore = new Map<string, FeedbackEntry>();

export function recordFeedback(
  faqId: string,
  helpful: boolean,
  comment?: string,
): FeedbackEntry {
  const current = feedbackStore.get(faqId) ?? { yes: 0, no: 0, comments: [] };
  if (helpful) current.yes += 1;
  else current.no += 1;
  if (comment) current.comments.push(comment);
  feedbackStore.set(faqId, current);
  return current;
}

export function getFeedback(faqId: string): FeedbackEntry | null {
  return feedbackStore.get(faqId) ?? null;
}
