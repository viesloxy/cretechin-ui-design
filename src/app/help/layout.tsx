import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ToastProvider } from "@/components/ui/Toast";
import { MOCK_FAQS } from "@/components/help/mockData";

export const metadata: Metadata = {
  title: "Pusat Bantuan | CreTechin",
  description:
    "Cari jawaban untuk pertanyaan umum tentang CreTechin. Hubungi support 24/7 via WhatsApp atau email.",
  keywords: [
    "bantuan cretechni",
    "FAQ",
    "help center",
    "support",
    "customer service",
    "panduan cretechni",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Pusat Bantuan | CreTechin",
    description: "Cari jawaban untuk pertanyaan umum tentang CreTechin",
    type: "website",
  },
};

export default function HelpLayout({ children }: { children: ReactNode }) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: MOCK_FAQS.slice(0, 10).map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer.replace(/\*\*/g, "").replace(/\n+/g, " ").slice(0, 500),
      },
    })),
  };

  return (
    <ToastProvider>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />
    </ToastProvider>
  );
}
