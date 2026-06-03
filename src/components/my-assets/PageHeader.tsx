"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description: string;
  showBackButton?: boolean;
  backHref?: string;
}

export default function PageHeader({
  title,
  description,
  showBackButton = false,
  backHref = "/profile",
}: PageHeaderProps) {
  const router = useRouter();

  return (
    <section className="py-12 md:py-16 bg-white dark:bg-black border-b border-black/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {showBackButton && (
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={() => router.push(backHref)}
            className="flex items-center gap-2 text-sm font-medium text-neutral-600 dark:text-white/60 hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Profil
          </motion.button>
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-neutral-900 dark:text-white mb-4">
            {title}
          </h1>
          <p className="text-base max-w-2xl text-neutral-600 dark:text-white/50">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
