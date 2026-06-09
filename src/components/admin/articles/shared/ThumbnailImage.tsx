"use client";

import Image from "next/image";
import { FileText } from "lucide-react";

interface ThumbnailImageProps {
  src?: string | null;
  alt: string;
  size?: number;
  rounded?: "lg" | "xl" | "2xl";
  className?: string;
}

export default function ThumbnailImage({
  src,
  alt,
  size = 56,
  rounded = "lg",
  className = "",
}: ThumbnailImageProps) {
  const radius = rounded === "lg" ? "rounded-lg" : rounded === "xl" ? "rounded-xl" : "rounded-2xl";

  if (!src) {
    return (
      <div
        className={`flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 flex-shrink-0 ${radius} ${className}`}
        style={{ width: size, height: size }}
        aria-label="Tanpa gambar"
      >
        <FileText className="w-5 h-5 text-neutral-400" />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-neutral-100 dark:bg-neutral-800 flex-shrink-0 ${radius} ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={`${size}px`}
        className="object-cover"
      />
    </div>
  );
}
