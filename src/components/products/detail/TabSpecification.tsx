"use client";

import { Download } from "lucide-react";

interface SpecRow {
  label: string;
  value: string | string[];
}

interface TabSpecificationProps {
  specifications: {
    compatibility?: string[];
    fileSize?: string;
    components?: string;
    formats?: string[];
    version?: string;
    license?: string;
    updates?: string;
    [key: string]: string | string[] | undefined;
  };
}

export default function TabSpecification({ specifications }: TabSpecificationProps) {
  const formatLabel = (key: string): string => {
    const labels: Record<string, string> = {
      compatibility: "Kompatibilitas",
      fileSize: "Ukuran File",
      components: "Jumlah Komponen",
      formats: "Format File",
      version: "Versi",
      license: "Lisensi",
      updates: "Update",
    };
    return labels[key] || key.charAt(0).toUpperCase() + key.slice(1);
  };

  const formatValue = (value: string | string[]): string => {
    if (Array.isArray(value)) {
      return value.join(", ");
    }
    return value;
  };

  const specRows: SpecRow[] = Object.entries(specifications)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => ({
      label: formatLabel(key),
      value: formatValue(value as string | string[]),
    }));

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-6">
          Spesifikasi & Lisensi
        </h2>

        <div className="bg-neutral-50 dark:bg-neutral-800 border border-black/10 dark:border-white/10 rounded-xl p-6 space-y-0">
          {specRows.map((row, index) => (
            <div
              key={row.label}
              className={`flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-4 ${
                index < specRows.length - 1
                  ? "border-b border-black/5 dark:border-white/5"
                  : ""
              }`}
            >
              <span className="text-sm font-medium text-neutral-500 min-w-[140px]">
                {row.label}
              </span>
              <span className="text-sm text-neutral-900 dark:text-white text-right">
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Download Preview Button (Optional) */}
      <section className="text-center">
        <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-black/10 dark:border-white/10 text-neutral-600 dark:text-white/50 hover:border-primary hover:text-primary transition-colors">
          <Download className="w-4 h-4" />
          <span className="text-sm font-medium">Unduh Preview File</span>
        </button>
      </section>
    </div>
  );
}