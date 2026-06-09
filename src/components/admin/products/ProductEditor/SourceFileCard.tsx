"use client";

import { useState, useRef } from "react";
import { Archive, Upload, X, AlertCircle, FileArchive, ExternalLink } from "lucide-react";
import type { ProductSourceFile, ProductType } from "@/lib/products/types";
import { formatFileSize } from "@/lib/products/utils";

interface SourceFileCardProps {
  sourceFile: ProductSourceFile | undefined;
  demoUrl: string;
  productType: ProductType;
  onChangeFile: (f: ProductSourceFile | undefined) => void;
  onChangeDemoUrl: (u: string) => void;
}

const ALLOWED_EXT = [".zip", ".rar", ".fig", ".sketch", ".xd", ".ai", ".psd"];
const MAX_SIZE = 500 * 1024 * 1024; // 500MB

export default function SourceFileCard({
  sourceFile,
  demoUrl,
  productType,
  onChangeFile,
  onChangeDemoUrl,
}: SourceFileCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (productType !== "digital") return null;

  const handleFile = (file: File) => {
    setError(null);
    const lower = file.name.toLowerCase();
    const ext = "." + (lower.split(".").pop() ?? "");
    if (!ALLOWED_EXT.includes(ext)) {
      setError(`Format ${ext} tidak didukung. Gunakan: ${ALLOWED_EXT.join(", ")}`);
      return;
    }
    if (file.size > MAX_SIZE) {
      setError(`Ukuran file terlalu besar (max 500MB). File Anda: ${formatFileSize(file.size)}`);
      return;
    }
    const url = URL.createObjectURL(file);
    onChangeFile({ name: file.name, size: file.size, url });
  };

  return (
    <div className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl shadow-sm shadow-black/5 p-5 md:p-6">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
          File Sumber
          <span className="text-[10px] font-bold tracking-wider text-primary-dark bg-primary/15 px-1.5 py-0.5 rounded">
            DIGITAL
          </span>
        </h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
          File yang akan diunduh pembeli. Format: ZIP, RAR, FIG, SKETCH, XD, AI, PSD. Maks 500MB.
        </p>
      </div>

      {sourceFile ? (
        <div className="flex items-center gap-3 p-3 rounded-xl border border-primary/30 bg-primary/5">
          <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
            <FileArchive className="w-5 h-5 text-primary-dark" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-neutral-900 dark:text-white truncate">
              {sourceFile.name}
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
              {formatFileSize(sourceFile.size)}
            </p>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="h-8 px-2.5 rounded-lg border border-black/10 dark:border-white/10 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:border-primary hover:text-primary transition-colors"
            >
              Ganti
            </button>
            <button
              type="button"
              onClick={() => onChangeFile(undefined)}
              aria-label="Hapus file"
              className="w-8 h-8 flex items-center justify-center rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <label
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            const file = e.dataTransfer.files[0];
            if (file) handleFile(file);
          }}
          className={`
            block aspect-[16/6] rounded-xl border-2 border-dashed cursor-pointer transition-colors
            flex flex-col items-center justify-center
            ${
              dragOver
                ? "border-primary bg-primary/5"
                : "border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/30 hover:border-primary hover:bg-primary/5"
            }
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={ALLOWED_EXT.join(",")}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
          <Archive className="w-7 h-7 text-neutral-400 mb-1.5" />
          <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Drop file sumber atau klik untuk upload
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            .zip • .rar • .fig • .sketch • .xd • .ai • .psd
          </p>
        </label>
      )}

      {error && (
        <div className="mt-3 flex items-start gap-2 p-2.5 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-xs">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Demo URL */}
      <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
        <label className="text-sm font-medium text-neutral-700 dark:text-white/80 inline-flex items-center gap-1.5">
          <ExternalLink className="w-3.5 h-3.5" />
          Link Demo / Preview (opsional)
        </label>
        <input
          type="url"
          value={demoUrl}
          onChange={(e) => onChangeDemoUrl(e.target.value)}
          placeholder="https://demo.cretechin.com/..."
          className="mt-1.5 w-full h-9 px-3 rounded-lg bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:border-primary transition-colors"
        />
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
          URL eksternal untuk demo langsung (Figma, CodeSandbox, dll).
        </p>
      </div>
    </div>
  );
}
