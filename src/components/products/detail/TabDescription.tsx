"use client";

import Image from "next/image";

interface TabDescriptionProps {
  description: string;
  features?: string[];
  additionalImages?: string[];
}

export default function TabDescription({ description, features = [], additionalImages = [] }: TabDescriptionProps) {
  return (
    <div className="space-y-8">
      {/* About Product */}
      <section>
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
          Tentang Produk
        </h2>
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-base text-neutral-600 dark:text-white/50 leading-relaxed whitespace-pre-line">
            {description}
          </p>
        </div>
      </section>

      {/* Feature List */}
      {features.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
            Fitur Utama
          </h3>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-base text-neutral-600 dark:text-white/50">{feature}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Additional Images Grid */}
      {additionalImages.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
            Preview Tambahan
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {additionalImages.map((src, index) => (
              <div
                key={index}
                className="relative aspect-video rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800"
              >
                <Image
                  src={src}
                  alt={`Preview ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}