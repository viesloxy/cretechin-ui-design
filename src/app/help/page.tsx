"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BerandaNavbar } from "@/components/beranda";
import { Footer } from "@/components/landing-page";
import { useAuth } from "@/context/AuthContext";
import {
  HelpHero,
  HelpCategoryGrid,
  HelpFAQList,
  ContactCTA,
  QuickLinks,
  CATEGORY_LABELS,
  searchFAQs,
  MOCK_FAQS,
} from "@/components/help";
import type { FAQCategory, SearchResult } from "@/components/help";

const VALID_CATEGORIES: FAQCategory[] = [
  "account",
  "payment",
  "course",
  "asset",
  "certificate",
  "technical",
];

function HelpContent() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const activeCategory: FAQCategory | null = (() => {
    const cat = searchParams.get("cat");
    if (cat && VALID_CATEGORIES.includes(cat as FAQCategory)) {
      return cat as FAQCategory;
    }
    return null;
  })();

  // On mount: read ?q and ?faq and sync
  useEffect(() => {
    const q = searchParams.get("q");
    const faq = searchParams.get("faq");
    if (q) setSearchQuery(q);
    if (faq) {
      setOpenFaqId(faq);
      // Scroll to FAQ section after a tick
      setTimeout(() => {
        const el = document.getElementById("faq-section");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateUrl = useCallback(
    (next: {
      q?: string;
      cat?: FAQCategory | null;
      faq?: string | null;
    }) => {
      const params = new URLSearchParams();
      const q = next.q !== undefined ? next.q : searchQuery;
      const cat =
        next.cat !== undefined ? next.cat : activeCategory;
      const faq = next.faq !== undefined ? next.faq : openFaqId;
      if (q) params.set("q", q);
      if (cat) params.set("cat", cat);
      if (faq) params.set("faq", faq);
      const query = params.toString();
      router.replace(`/help${query ? `?${query}` : ""}`, { scroll: false });
    },
    [router, searchQuery, activeCategory, openFaqId],
  );

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    updateUrl({ q: q });
  };

  const handleCategoryChange = (cat: FAQCategory | null) => {
    updateUrl({ cat, faq: null });
    if (cat) {
      setOpenFaqId(null);
      setTimeout(() => {
        const el = document.getElementById("faq-section");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  };

  const handleResultClick = (result: SearchResult) => {
    setOpenFaqId(result.id);
    setSearchQuery("");
    updateUrl({ q: "", faq: result.id });
    setTimeout(() => {
      const el = document.getElementById("faq-section");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleViewAllResults = () => {
    const el = document.getElementById("faq-section");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handlePopularClick = (term: string) => {
    setSearchQuery(term);
    updateUrl({ q: term });
  };

  const handleOpenFaq = (id: string | null) => {
    setOpenFaqId(id);
    updateUrl({ faq: id });
  };

  const handleHelpfulFeedback = () => {
    // No-op (handled inside HelpfulFeedback component)
  };

  // Compute real search results
  const realSearchResults = useMemo(() => {
    if (searchQuery.length < 2) return [] as SearchResult[];
    return searchFAQs(MOCK_FAQS, searchQuery);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col">
      <BerandaNavbar />
      <HelpHero
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        searchResults={realSearchResults}
        onResultClick={handleResultClick}
        onViewAllResults={handleViewAllResults}
        onPopularClick={handlePopularClick}
      />
      <HelpCategoryGrid
        activeCategory={activeCategory}
        onCategoryClick={handleCategoryChange}
      />
      <HelpFAQList
        activeCategory={activeCategory}
        searchQuery={searchQuery}
        onCategoryChange={handleCategoryChange}
        openFaqId={openFaqId}
        onOpenFaq={handleOpenFaq}
        onHelpfulFeedback={handleHelpfulFeedback}
      />
      <ContactCTA
        currentCategory={
          activeCategory ? CATEGORY_LABELS[activeCategory] : null
        }
        userEmail={user?.email}
      />
      <QuickLinks />
      <Footer />
    </div>
  );
}

export default function HelpPage() {
  return (
    <Suspense fallback={null}>
      <HelpContent />
    </Suspense>
  );
}
