"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import type {
  Product,
  ProductCategory,
  ProductDiscount,
  ProductStatus,
  ProductType,
} from "@/lib/products/types";
import { formatRelativeTime, slugify } from "@/lib/products/utils";
import ProductEditorHeader from "./ProductEditorHeader";
import DynamicListInput from "./DynamicListInput";
import GalleryCard from "./GalleryCard";
import SourceFileCard from "./SourceFileCard";
import ProductSettingsPanel from "./ProductSettingsPanel";
import Textarea from "@/components/ui/Textarea";
import { ThumbnailImage } from "@/components/admin/articles/shared";
import ToggleSwitch from "@/components/ui/ToggleSwitch";
import { Package, Download, X } from "lucide-react";

interface ProductEditorProps {
  mode: "create" | "edit";
  product: Product | null;
  existingProducts: Product[];
  onBack: () => void;
  onSave: (data: Partial<Product>) => Promise<void>;
}

export default function ProductEditor({ mode, product, existingProducts, onBack, onSave }: ProductEditorProps) {
  // Basic
  const [title, setTitle] = useState(product?.title ?? "");
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(false);
  const [creatorName, setCreatorName] = useState(product?.creator.name ?? "");
  const [creatorTitle, setCreatorTitle] = useState(product?.creator.title ?? "");
  const [studioName, setStudioName] = useState(product?.creator.studioName ?? "");
  const [productType, setProductType] = useState<ProductType>(product?.productType ?? "digital");

  // Description
  const [shortDescription, setShortDescription] = useState(product?.shortDescription ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [specifications, setSpecifications] = useState<string[]>(product?.specifications ?? []);
  const [whatsIncluded, setWhatsIncluded] = useState<string[]>(product?.whatsIncluded ?? []);
  const [tags, setTags] = useState<string[]>(product?.tags ?? []);
  const [tagInput, setTagInput] = useState("");

  // Pricing & inventory
  const [price, setPrice] = useState(product?.price ?? 0);
  const [isFree, setIsFree] = useState(product?.isFree ?? false);
  const [discount, setDiscount] = useState<ProductDiscount | null>(product?.discount ?? null);
  const [stock, setStock] = useState(product?.stock ?? 999);
  const [sku, setSku] = useState(product?.sku ?? "");
  const [weight, setWeight] = useState(product?.weight ?? 0);
  const [dimensions, setDimensions] = useState(product?.dimensions ?? "");

  // Media
  const [gallery, setGallery] = useState(product?.gallery ?? []);
  const [sourceFile, setSourceFile] = useState(product?.sourceFile);
  const [demoUrl, setDemoUrl] = useState(product?.demoUrl ?? "");

  // Settings (right panel)
  const [status, setStatus] = useState<ProductStatus>(product?.status ?? "draft");
  const [category, setCategory] = useState<ProductCategory>(product?.category ?? "ui_kits");
  const [featured, setFeatured] = useState(product?.featured ?? false);
  const [enableReview, setEnableReview] = useState(product?.enableReview ?? true);
  const [downloadLimit, setDownloadLimit] = useState<number | undefined>(product?.downloadLimit);
  const [downloadLimitEnabled, setDownloadLimitEnabled] = useState<boolean>(!!product?.downloadLimit);

  // SEO
  const [metaTitle, setMetaTitle] = useState(product?.metaTitle ?? "");
  const [metaDescription, setMetaDescription] = useState(product?.metaDescription ?? "");

  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(
    product?.updatedAt ? formatRelativeTime(product.updatedAt) : "belum disimpan"
  );
  const [autoSaveStatus, setAutoSaveStatus] = useState<"idle" | "saving" | "saved">("idle");

  const isDirty = useRef(false);

  // Auto slug
  useEffect(() => {
    if (!slugTouched) {
      setSlug(slugify(title));
    }
  }, [title, slugTouched]);

  // Dirty tracking
  useEffect(() => {
    isDirty.current = true;
  }, [
    title, slug, creatorName, creatorTitle, studioName, productType, shortDescription, description,
    specifications, whatsIncluded, tags, price, isFree, discount, stock, sku, weight, dimensions,
    gallery, sourceFile, demoUrl, status, category, featured, enableReview, downloadLimit, metaTitle, metaDescription,
  ]);

  // Beforeunload
  useEffect(() => {
    if (!isDirty.current) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  });

  const slugUnique = useMemo(() => {
    if (!slug) return true;
    return !existingProducts.some((p) => p.slug === slug && p.id !== product?.id);
  }, [slug, existingProducts, product?.id]);

  const handleBack = () => {
    if (isDirty.current && !confirm("Anda memiliki perubahan yang belum disimpan. Yakin ingin keluar?")) return;
    onBack();
  };

  const handleSave = async (overrideStatus?: ProductStatus) => {
    if (!title.trim()) {
      alert("Judul produk tidak boleh kosong");
      return;
    }
    if (!creatorName.trim()) {
      alert("Nama kreator tidak boleh kosong");
      return;
    }
    if (!shortDescription.trim()) {
      alert("Ringkasan produk tidak boleh kosong");
      return;
    }
    if (!slugUnique) {
      alert("Slug sudah dipakai produk lain. Gunakan slug yang berbeda.");
      return;
    }
    if (!isFree && price <= 0) {
      alert("Harga harus lebih dari 0 atau centang 'Jadikan Gratis'");
      return;
    }
    if (productType === "digital") {
      if (gallery.length === 0) {
        alert("Aset digital wajib memiliki minimal 1 gambar preview");
        return;
      }
      if (!sourceFile) {
        alert("Aset digital wajib memiliki file sumber");
        return;
      }
    }

    setIsSaving(true);
    try {
      const finalStatus = overrideStatus ?? status;
      await onSave({
        id: product?.id,
        title,
        slug: slug || slugify(title),
        creator: {
          id: product?.creator.id ?? `cr-${Date.now()}`,
          name: creatorName,
          title: creatorTitle || undefined,
          studioName: studioName || undefined,
          avatar: product?.creator.avatar,
        },
        description,
        shortDescription,
        specifications,
        whatsIncluded: productType === "digital" ? whatsIncluded : [],
        tags,
        gallery,
        sourceFile: productType === "digital" ? sourceFile : undefined,
        demoUrl: demoUrl || undefined,
        productType,
        category,
        status: finalStatus,
        featured,
        enableReview,
        downloadLimit: downloadLimitEnabled ? downloadLimit : undefined,
        price: isFree ? 0 : price,
        isFree,
        discount: isFree ? null : discount,
        stock: productType === "physical" ? stock : 999,
        sku: sku || `SKU-${Date.now().toString().slice(-6)}`,
        weight: productType === "physical" ? weight : 0,
        dimensions: productType === "physical" && dimensions ? dimensions : undefined,
        metaTitle: metaTitle || title,
        metaDescription: metaDescription || shortDescription,
        publishedAt: finalStatus === "published" ? new Date().toISOString() : product?.publishedAt ?? null,
        updatedAt: new Date().toISOString(),
        // Defaults for new
        viewCount: product?.viewCount ?? 0,
        soldCount: product?.soldCount ?? 0,
        rating: product?.rating ?? 0,
        reviewCount: product?.reviewCount ?? 0,
        thumbnail: gallery.find((g) => g.isPrimary) ?? gallery[0] ?? { id: "img-empty", url: "", width: 0, height: 0, isPrimary: true },
      });
      isDirty.current = false;
      setLastSaved("baru saja");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveDraft = () => handleSave("draft");
  const handlePublish = () => handleSave("published");

  const addTag = () => {
    const v = tagInput.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-");
    if (!v || tags.includes(v) || tags.length >= 10) return;
    setTags([...tags, v]);
    setTagInput("");
  };

  return (
    <div className="space-y-6">
      <ProductEditorHeader
        mode={mode}
        lastSaved={lastSaved}
        onBack={handleBack}
        onSaveDraft={handleSaveDraft}
        onPublish={handlePublish}
        onPreview={() => alert("Preview publik produk: " + title)}
        isSaving={isSaving}
        isPublished={status === "published"}
      />

      {autoSaveStatus !== "idle" && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5"
        >
          {autoSaveStatus === "saving" ? (
            <>
              <span className="w-2 h-2 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              Menyimpan otomatis...
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-primary" />
              Tersimpan otomatis
            </>
          )}
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        {/* Form Area 70% */}
        <div className="lg:col-span-7 space-y-4">
          {/* Basic Info */}
          <Card title="Informasi Dasar">
            <div className="space-y-4">
              <Field label="Judul Produk" required>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="cth: Modern Dashboard UI Kit"
                  className="w-full h-10 px-3 rounded-xl bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </Field>

              <Field label="Slug URL" helper="Auto-generate dari judul, bisa diubah" error={!slugUnique ? "Slug sudah dipakai" : undefined}>
                <div className="flex items-center rounded-xl border border-black/10 dark:border-white/10 focus-within:border-primary transition-colors overflow-hidden">
                  <span className="px-3 text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-800 border-r border-black/10 dark:border-white/10 font-mono whitespace-nowrap">
                    cretechin.com/products/
                  </span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => {
                      setSlug(e.target.value);
                      setSlugTouched(true);
                    }}
                    placeholder="judul-produk"
                    className="flex-1 h-10 px-2 bg-transparent text-sm font-mono focus:outline-none"
                  />
                </div>
              </Field>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Field label="Nama Kreator" required>
                  <input
                    type="text"
                    value={creatorName}
                    onChange={(e) => setCreatorName(e.target.value)}
                    placeholder="cth: Budi Santoso"
                    className="w-full h-10 px-3 rounded-xl bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </Field>
                <Field label="Jabatan / Title">
                  <input
                    type="text"
                    value={creatorTitle}
                    onChange={(e) => setCreatorTitle(e.target.value)}
                    placeholder="cth: UI/UX Designer"
                    className="w-full h-10 px-3 rounded-xl bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </Field>
              </div>

              <Field label="Nama Studio / Brand (opsional)">
                <input
                  type="text"
                  value={studioName}
                  onChange={(e) => setStudioName(e.target.value)}
                  placeholder="cth: PixelCraft Studio"
                  className="w-full h-10 px-3 rounded-xl bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </Field>

              <Field label="Tipe Produk" required>
                <div className="grid grid-cols-2 gap-2">
                  <TypeOption
                    checked={productType === "physical"}
                    onChange={() => setProductType("physical")}
                    label="Fisik"
                    description="Barang yang dikirim"
                    icon={Package}
                    color="orange"
                  />
                  <TypeOption
                    checked={productType === "digital"}
                    onChange={() => setProductType("digital")}
                    label="Digital"
                    description="File yang diunduh"
                    icon={Download}
                    color="blue"
                  />
                </div>
              </Field>
            </div>
          </Card>

          {/* Description */}
          <Card title="Deskripsi Produk">
            <div className="space-y-4">
              <Field label="Ringkasan Singkat">
                <Textarea
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="Ringkasan 1-2 kalimat untuk preview di card produk..."
                  rows={2}
                  maxLength={500}
                  className="!min-h-[64px]"
                />
                <div className="flex justify-end mt-1">
                  <span className={`text-xs ${shortDescription.length > 160 ? "text-red-500" : "text-neutral-500"}`}>
                    {shortDescription.length}/160
                  </span>
                </div>
              </Field>
              <Field label="Deskripsi Lengkap">
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ceritakan detail produk Anda..."
                  rows={6}
                  maxLength={5000}
                />
              </Field>
              <DynamicListInput
                label="Spesifikasi / Fitur"
                value={specifications}
                onChange={setSpecifications}
                placeholder="cth: 100+ Screens"
                addLabel="+ Tambah Fitur"
                maxItems={10}
              />
              {productType === "digital" && (
                <DynamicListInput
                  label="Yang Didapatkan"
                  value={whatsIncluded}
                  onChange={setWhatsIncluded}
                  placeholder="cth: File .fig"
                  addLabel="+ Tambah Item"
                  maxItems={10}
                />
              )}
            </div>
          </Card>

          {/* Pricing & Stock */}
          <Card title="Harga & Stok">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Field label="Harga (IDR)" required>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-neutral-500">Rp</span>
                    <input
                      type="number"
                      value={isFree ? 0 : price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      disabled={isFree}
                      min={0}
                      placeholder="0"
                      className="w-full h-10 pl-10 pr-3 rounded-xl bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </Field>
                <Field label={productType === "physical" ? "Stok" : "Stok (unlimited)"}>
                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    disabled={productType === "digital"}
                    min={0}
                    placeholder={productType === "digital" ? "999" : "0"}
                    className="w-full h-10 px-3 rounded-xl bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </Field>
              </div>

              {productType === "physical" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Field label="Berat (gram)">
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(Number(e.target.value))}
                      min={0}
                      placeholder="0"
                      className="w-full h-10 px-3 rounded-xl bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </Field>
                  <Field label="Dimensi (P × L × T cm)">
                    <input
                      type="text"
                      value={dimensions}
                      onChange={(e) => setDimensions(e.target.value)}
                      placeholder="30 × 20 × 5"
                      className="w-full h-10 px-3 rounded-xl bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </Field>
                </div>
              )}

              <Field label="SKU (otomatis jika kosong)">
                <input
                  type="text"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  placeholder="SKU-XXXXXX"
                  className="w-full h-10 px-3 rounded-xl bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:border-primary transition-colors font-mono"
                />
              </Field>

              <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 space-y-3">
                <ToggleSwitch
                  checked={isFree}
                  onChange={setIsFree}
                  label="Jadikan Produk Gratis"
                  description="Pembeli dapat mengunduh tanpa bayar"
                />
                <ToggleSwitch
                  checked={discount?.enabled ?? false}
                  onChange={(v) =>
                    setDiscount(
                      v
                        ? discount ?? { enabled: true, originalPrice: price * 1.5, percent: 30, validUntil: "" }
                        : null
                    )
                  }
                  label="Aktifkan Diskon"
                  description="Harga akan dicoret dan tampil lebih murah"
                />
                {discount?.enabled && (
                  <div className="grid grid-cols-2 gap-2 pl-1">
                    <div>
                      <label className="text-xs text-neutral-500 dark:text-neutral-400">Harga Coret</label>
                      <div className="relative mt-1">
                        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-neutral-500">Rp</span>
                        <input
                          type="number"
                          value={discount.originalPrice}
                          onChange={(e) => setDiscount({ ...discount, originalPrice: Number(e.target.value) })}
                          min={0}
                          className="w-full h-9 pl-8 pr-2 rounded-lg bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:border-primary transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-neutral-500 dark:text-neutral-400">Diskon (%)</label>
                      <input
                        type="number"
                        value={discount.percent}
                        onChange={(e) => setDiscount({ ...discount, percent: Math.min(100, Number(e.target.value)) })}
                        min={0}
                        max={100}
                        className="mt-1 w-full h-9 px-2 rounded-lg bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-xs text-neutral-500 dark:text-neutral-400">Berlaku sampai</label>
                      <input
                        type="date"
                        value={discount.validUntil}
                        onChange={(e) => setDiscount({ ...discount, validUntil: e.target.value })}
                        className="mt-1 w-full h-9 px-2 rounded-lg bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Tags */}
          <Card title="Tags">
            <div className="space-y-2">
              {tags.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => setTags(tags.filter((t) => t !== tag))}
                        aria-label={`Hapus tag ${tag}`}
                        className="hover:text-red-500 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                  placeholder="Tambah tag..."
                  disabled={tags.length >= 10}
                  className="flex-1 h-9 px-3 rounded-lg bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={addTag}
                  disabled={!tagInput.trim() || tags.length >= 10}
                  className="h-9 px-3 rounded-lg border border-black/10 dark:border-white/10 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:border-primary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  + Tambah
                </button>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {tags.length}/10 tags • Tekan Enter untuk menambah
              </p>
            </div>
          </Card>

          {/* Gallery */}
          <GalleryCard images={gallery} onChange={setGallery} maxImages={8} />

          {/* Source File (digital only) */}
          <SourceFileCard
            sourceFile={sourceFile}
            demoUrl={demoUrl}
            productType={productType}
            onChangeFile={setSourceFile}
            onChangeDemoUrl={setDemoUrl}
          />
        </div>

        {/* Settings Panel 30% */}
        <div className="lg:col-span-3">
          <ProductSettingsPanel
            product={product}
            status={status}
            category={category}
            productType={productType}
            featured={featured}
            enableReview={enableReview}
            downloadLimit={downloadLimit}
            downloadLimitEnabled={downloadLimitEnabled}
            metaTitle={metaTitle}
            metaDescription={metaDescription}
            slug={slug}
            onStatusChange={setStatus}
            onCategoryChange={setCategory}
            onFeaturedChange={setFeatured}
            onEnableReviewChange={setEnableReview}
            onDownloadLimitChange={setDownloadLimit}
            onDownloadLimitEnabledChange={setDownloadLimitEnabled}
            onMetaTitleChange={setMetaTitle}
            onMetaDescriptionChange={setMetaDescription}
            onSave={() => handleSave()}
            isSaving={isSaving}
          />
        </div>
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl shadow-sm shadow-black/5 p-5 md:p-6">
      <h3 className="text-base font-semibold text-neutral-900 dark:text-white mb-4">{title}</h3>
      {children}
    </div>
  );
}

function Field({
  label,
  required,
  helper,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  helper?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-neutral-700 dark:text-white/80">
        {label}
        {required && <span className="text-primary ml-1">*</span>}
      </label>
      {children}
      {error ? (
        <p className="text-xs text-red-500">{error}</p>
      ) : helper ? (
        <p className="text-xs text-neutral-500 dark:text-neutral-400">{helper}</p>
      ) : null}
    </div>
  );
}

function TypeOption({
  checked,
  onChange,
  label,
  description,
  icon: Icon,
  color,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: "orange" | "blue";
}) {
  const colorMap = {
    orange: "text-orange-600",
    blue: "text-blue-600",
  };
  return (
    <label
      className={`
        flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors
        ${checked ? "border-primary bg-primary/5" : "border-black/10 dark:border-white/10 hover:border-primary/50"}
      `}
    >
      <input type="radio" checked={checked} onChange={onChange} className="sr-only" />
      <div
        className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
          checked ? "border-primary" : "border-neutral-300 dark:border-neutral-600"
        }`}
      >
        {checked && <div className="w-2 h-2 rounded-full bg-primary" />}
      </div>
      <Icon className={`w-5 h-5 flex-shrink-0 ${colorMap[color]}`} />
      <div className="flex-1 min-w-0">
        <span className="block text-sm font-medium text-neutral-900 dark:text-white">{label}</span>
        <span className="block text-xs text-neutral-500 dark:text-neutral-400">{description}</span>
      </div>
    </label>
  );
}
