"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { MOCK_QUICK_LINKS } from "./mockData";

export default function QuickLinks() {
  const router = useRouter();

  const handleClick = (href: string, external?: boolean) => {
    if (external) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      router.push(href);
    }
  };

  return (
    <section
      aria-labelledby="quicklinks-heading"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12"
    >
      <motion.h2
        id="quicklinks-heading"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-xl sm:text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-6"
      >
        Sumber Daya Lainnya
      </motion.h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {MOCK_QUICK_LINKS.map((link, idx) => {
          const Icon = link.icon;
          return (
            <motion.button
              key={link.id}
              type="button"
              onClick={() => handleClick(link.href, link.external)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: Math.min(idx * 0.04, 0.3),
              }}
              whileTap={{ scale: 0.98 }}
              aria-label={
                link.external
                  ? `${link.label}, link eksternal, buka di tab baru`
                  : link.label
              }
              className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl p-4 sm:p-5 text-left hover:shadow-md hover:border-primary/30 transition-all relative"
            >
              {link.external && (
                <ExternalLink
                  aria-hidden="true"
                  className="absolute top-3 right-3 w-3 h-3 text-neutral-400 dark:text-white/30"
                />
              )}
              <Icon className="w-5 h-5 text-primary mb-2" />
              <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                {link.label}
              </p>
              {link.description && (
                <p className="text-xs text-neutral-500 dark:text-white/40 mt-0.5">
                  {link.description}
                </p>
              )}
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
