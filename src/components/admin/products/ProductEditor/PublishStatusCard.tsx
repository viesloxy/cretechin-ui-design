"use client";

import { CheckCircle2, FileEdit, AlertCircle, Save } from "lucide-react";
import SettingsCard from "@/components/admin/articles/ArticleEditor/SettingsCard";
import type { ProductStatus } from "@/lib/products/types";

interface PublishStatusCardProps {
  status: ProductStatus;
  onStatusChange: (s: ProductStatus) => void;
  onSave: () => void;
  isSaving: boolean;
}

export default function PublishStatusCard({ status, onStatusChange, onSave, isSaving }: PublishStatusCardProps) {
  return (
    <SettingsCard title="Publikasi" badge="Wajib">
      <div className="space-y-2">
        <RadioItem
          id="ps-pub"
          checked={status === "published"}
          onChange={() => onStatusChange("published")}
          label="Published"
          description="Tampil di marketplace publik"
          icon={CheckCircle2}
          color="green"
        />
        <RadioItem
          id="ps-drf"
          checked={status === "draft"}
          onChange={() => onStatusChange("draft")}
          label="Draft"
          description="Disimpan tapi belum tampil"
          icon={FileEdit}
          color="amber"
        />
        <RadioItem
          id="ps-oos"
          checked={status === "out_of_stock"}
          onChange={() => onStatusChange("out_of_stock")}
          label="Habis"
          description="Stok habis / tidak tersedia"
          icon={AlertCircle}
          color="red"
        />
      </div>

      <button
        type="button"
        onClick={onSave}
        disabled={isSaving}
        className="w-full mt-4 h-11 rounded-xl bg-primary text-black text-sm font-semibold hover:bg-primary-dark active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all inline-flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
      >
        {isSaving ? (
          <>
            <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            Menyimpan...
          </>
        ) : (
          <>
            <Save className="w-4 h-4" />
            Simpan Produk
          </>
        )}
      </button>
    </SettingsCard>
  );
}

function RadioItem({
  id,
  checked,
  onChange,
  label,
  description,
  icon: Icon,
  color,
}: {
  id: string;
  checked: boolean;
  onChange: () => void;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: "green" | "amber" | "red";
}) {
  const colorMap = {
    green: "text-green-600",
    amber: "text-amber-600",
    red: "text-red-600",
  };

  return (
    <label
      htmlFor={id}
      className={`
        flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors
        ${checked ? "border-primary bg-primary/5" : "border-black/10 dark:border-white/10 hover:border-primary/50"}
      `}
    >
      <input type="radio" id={id} name="product-status" checked={checked} onChange={onChange} className="sr-only" />
      <div
        className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center ${
          checked ? "border-primary" : "border-neutral-300 dark:border-neutral-600"
        }`}
      >
        {checked && <div className="w-2 h-2 rounded-full bg-primary" />}
      </div>
      <div className="flex-1 min-w-0">
        <span className="block text-sm font-medium text-neutral-900 dark:text-white">{label}</span>
        <span className="block text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">{description}</span>
      </div>
      <Icon className={`w-4 h-4 flex-shrink-0 ${colorMap[color]}`} />
    </label>
  );
}
