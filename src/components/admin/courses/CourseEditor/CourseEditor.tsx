"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { Course, CourseCategory, CourseDiscount, CourseLevel, CourseStatus } from "@/lib/courses/types";
import { formatRelativeTime, slugify } from "@/lib/courses/utils";
import CourseEditorHeader from "./CourseEditorHeader";
import DynamicListInput from "./DynamicListInput";
import ToggleSwitch from "@/components/ui/ToggleSwitch";
import Textarea from "@/components/ui/Textarea";
import { ThumbnailImage } from "@/components/admin/articles/shared";
import CourseSettingsPanel from "./CourseSettingsPanel";

interface CourseEditorProps {
  mode: "create" | "edit";
  course: Course | null;
  onBack: () => void;
  onSave: (data: Partial<Course>) => Promise<void>;
  onGoToSyllabus?: (id: string) => void;
}

export default function CourseEditor({
  mode,
  course,
  onBack,
  onSave,
  onGoToSyllabus,
}: CourseEditorProps) {
  // Form state
  const [title, setTitle] = useState(course?.title ?? "");
  const [autoSlug, setAutoSlug] = useState(course?.slug ?? "");
  const [slugOverride, setSlugOverride] = useState(course?.slug ?? "");
  const [instructorName, setInstructorName] = useState(course?.instructor.name ?? "");
  const [instructorTitle, setInstructorTitle] = useState(course?.instructor.title ?? "");
  const [shortDescription, setShortDescription] = useState(course?.shortDescription ?? "");
  const [description, setDescription] = useState(course?.description ?? "");
  const [whatYouWillLearn, setWhatYouWillLearn] = useState<string[]>(course?.whatYouWillLearn ?? []);
  const [targetAudience, setTargetAudience] = useState<string[]>(course?.targetAudience ?? []);
  const [trailerUrl, setTrailerUrl] = useState(course?.trailerUrl ?? "");
  const [thumbnail, setThumbnail] = useState<Course["thumbnail"]>(course?.thumbnail ?? null);
  const [language, setLanguage] = useState<"id" | "en">(course?.language ?? "id");
  const [estimatedDuration, setEstimatedDuration] = useState(course?.estimatedDuration ?? 0);
  const [certificateEnabled, setCertificateEnabled] = useState(course?.certificateEnabled ?? true);
  const [discussionEnabled, setDiscussionEnabled] = useState(course?.discussionEnabled ?? true);
  const [featured, setFeatured] = useState(course?.featured ?? false);

  const [status, setStatus] = useState<CourseStatus>(course?.status ?? "draft");
  const [price, setPrice] = useState(course?.price ?? 0);
  const [isFree, setIsFree] = useState(course?.isFree ?? false);
  const [discount, setDiscount] = useState<CourseDiscount | null>(course?.discount ?? null);
  const [category, setCategory] = useState<CourseCategory>(course?.category ?? "teknologi");
  const [level, setLevel] = useState<CourseLevel>(course?.level ?? "pemula");

  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(
    course?.updatedAt ? formatRelativeTime(course.updatedAt) : "belum disimpan"
  );
  const [autoSaveStatus, setAutoSaveStatus] = useState<"idle" | "saving" | "saved">("idle");

  const isDirty = useRef(false);

  useEffect(() => {
    if (!slugOverride || slugOverride === slugify(course?.title ?? "")) {
      setAutoSlug(slugify(title));
    } else {
      setAutoSlug(slugOverride);
    }
  }, [title, slugOverride, course?.title]);

  useEffect(() => {
    isDirty.current = true;
  }, [title, instructorName, shortDescription, description, trailerUrl, thumbnail, status, price, isFree, category, level, featured, certificateEnabled, discussionEnabled]);

  useEffect(() => {
    if (!isDirty.current) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  });

  const handleBack = () => {
    if (isDirty.current && !confirm("Anda memiliki perubahan yang belum disimpan. Yakin ingin keluar?")) return;
    onBack();
  };

  const handleSave = async (overrideStatus?: CourseStatus) => {
    if (!title.trim()) {
      alert("Judul kursus tidak boleh kosong");
      return;
    }
    if (!instructorName.trim()) {
      alert("Nama instruktur tidak boleh kosong");
      return;
    }
    if (!shortDescription.trim()) {
      alert("Ringkasan kursus tidak boleh kosong");
      return;
    }
    if (!isFree && price <= 0) {
      alert("Harga harus lebih dari 0 atau centang 'Jadikan Kursus Gratis'");
      return;
    }

    setIsSaving(true);
    try {
      const finalStatus = overrideStatus ?? status;
      await onSave({
        id: course?.id,
        title,
        slug: slugOverride || slugify(title),
        instructor: {
          id: course?.instructor.id ?? `inst-${Date.now()}`,
          name: instructorName,
          title: instructorTitle || undefined,
          avatar: course?.instructor.avatar,
        },
        description,
        shortDescription,
        whatYouWillLearn,
        targetAudience,
        thumbnail,
        trailerUrl,
        category,
        level,
        language,
        price: isFree ? 0 : price,
        isFree,
        discount: isFree ? null : discount,
        status: finalStatus,
        featured,
        certificateEnabled,
        discussionEnabled,
        estimatedDuration,
        publishedAt: finalStatus === "published" ? new Date().toISOString() : course?.publishedAt ?? null,
        updatedAt: new Date().toISOString(),
      });
      isDirty.current = false;
      setLastSaved("baru saja");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveDraft = () => handleSave("draft");

  return (
    <div className="space-y-6">
      <CourseEditorHeader
        mode={mode}
        lastSaved={lastSaved}
        onBack={handleBack}
        onSaveDraft={handleSaveDraft}
        onPreview={() => alert("Preview kursus: " + title)}
        onGoToSyllabus={mode === "edit" && course ? () => onGoToSyllabus?.(course.id) : undefined}
        isSaving={isSaving}
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
          <Card title="Informasi Utama">
            <div className="space-y-4">
              <Field label="Judul Kursus" required>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="cth: Full Stack Web Development dengan Next.js 14"
                  className="w-full h-10 px-3 rounded-xl bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </Field>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Field label="Nama Instruktur" required>
                  <input
                    type="text"
                    value={instructorName}
                    onChange={(e) => setInstructorName(e.target.value)}
                    placeholder="cth: Budi Santoso"
                    className="w-full h-10 px-3 rounded-xl bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </Field>
                <Field label="Jabatan / Title">
                  <input
                    type="text"
                    value={instructorTitle}
                    onChange={(e) => setInstructorTitle(e.target.value)}
                    placeholder="cth: Senior Web Developer"
                    className="w-full h-10 px-3 rounded-xl bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </Field>
              </div>
              <Field label="Slug URL" helper="Auto-generate dari judul, bisa diubah">
                <div className="flex items-center rounded-xl border border-black/10 dark:border-white/10 focus-within:border-primary transition-colors overflow-hidden">
                  <span className="px-3 text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-800 border-r border-black/10 dark:border-white/10 font-mono whitespace-nowrap">
                    cretechin.com/courses/
                  </span>
                  <input
                    type="text"
                    value={autoSlug}
                    onChange={(e) => setSlugOverride(e.target.value)}
                    placeholder="judul-kursus"
                    className="flex-1 h-10 px-2 bg-transparent text-sm font-mono focus:outline-none"
                  />
                </div>
              </Field>
            </div>
          </Card>

          {/* Description */}
          <Card title="Deskripsi Kursus" subtitle="Jelaskan kursus Anda secara detail">
            <div className="space-y-4">
              <Field label="Ringkasan Singkat">
                <Textarea
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="Ringkasan 1-2 kalimat untuk preview di card kursus..."
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
                  value={description.replace(/<[^>]+>/g, "")}
                  onChange={(e) => setDescription(`<p>${e.target.value}</p>`)}
                  placeholder="Ceritakan detail kursus Anda..."
                  rows={6}
                  maxLength={2000}
                />
              </Field>
              <DynamicListInput
                label="Apa yang akan dipelajari?"
                value={whatYouWillLearn}
                onChange={setWhatYouWillLearn}
                placeholder="cth: Memahami konsep React Hooks"
                addLabel="+ Tambah poin"
              />
              <DynamicListInput
                label="Untuk siapa kursus ini?"
                value={targetAudience}
                onChange={setTargetAudience}
                placeholder="cth: Developer yang familiar dengan JavaScript"
                addLabel="+ Tambah audience"
              />
            </div>
          </Card>

          {/* Trailer */}
          <Card title="Trailer & Media">
            <div className="space-y-4">
              <Field label="Link Video Trailer" helper="Video trailer akan ditampilkan di halaman detail kursus">
                <input
                  type="url"
                  value={trailerUrl}
                  onChange={(e) => setTrailerUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full h-10 px-3 rounded-xl bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </Field>
            </div>
          </Card>

          {/* Thumbnail */}
          <Card title="Thumbnail Kursus" subtitle="Rekomendasi: 1280×720px (16:9)">
            <ThumbnailUploader value={thumbnail} onChange={setThumbnail} />
          </Card>

          {/* Additional Settings */}
          <Card title="Pengaturan Tambahan">
            <div className="space-y-4">
              <Field label="Bahasa Pengantar">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as "id" | "en")}
                  className="w-full h-10 px-3 rounded-xl bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:border-primary transition-colors cursor-pointer"
                >
                  <option value="id">Bahasa Indonesia</option>
                  <option value="en">English</option>
                </select>
              </Field>
              <Field label="Estimasi Durasi (menit)" helper="Akan terhitung otomatis dari total durasi silabus">
                <input
                  type="number"
                  value={Math.floor(estimatedDuration / 60)}
                  onChange={(e) => setEstimatedDuration(Number(e.target.value) * 60)}
                  min={0}
                  placeholder="0"
                  className="w-full h-10 px-3 rounded-xl bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </Field>
              <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 space-y-3">
                <ToggleSwitch
                  checked={certificateEnabled}
                  onChange={setCertificateEnabled}
                  label="Berikan Sertifikat"
                  description="Siswa akan mendapat sertifikat setelah menyelesaikan kursus"
                />
                <ToggleSwitch
                  checked={discussionEnabled}
                  onChange={setDiscussionEnabled}
                  label="Aktifkan Diskusi"
                  description="Siswa dapat bertanya dan berdiskusi di setiap materi"
                />
                <ToggleSwitch
                  checked={featured}
                  onChange={setFeatured}
                  label="Jadikan Kursus Unggulan"
                  description="Tampil di section 'Kursus Pilihan' di halaman beranda"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Settings Panel 30% */}
        <div className="lg:col-span-3">
          <CourseSettingsPanel
            status={status}
            price={price}
            isFree={isFree}
            discount={discount}
            category={category}
            level={level}
            studentCount={course?.studentCount ?? 0}
            rating={course?.rating ?? 0}
            reviewCount={course?.reviewCount ?? 0}
            createdAt={course?.createdAt ?? new Date().toISOString()}
            updatedAt={course?.updatedAt ?? new Date().toISOString()}
            onStatusChange={setStatus}
            onPriceChange={setPrice}
            onIsFreeChange={setIsFree}
            onDiscountChange={setDiscount}
            onCategoryChange={setCategory}
            onLevelChange={setLevel}
            onSave={() => handleSave()}
            isSaving={isSaving}
          />
        </div>
      </div>
    </div>
  );
}

function Card({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl shadow-sm shadow-black/5 p-5 md:p-6">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-neutral-900 dark:text-white">{title}</h3>
        {subtitle && <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

function Field({
  label,
  required,
  helper,
  children,
}: {
  label: string;
  required?: boolean;
  helper?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-neutral-700 dark:text-white/80">
        {label}
        {required && <span className="text-primary ml-1">*</span>}
      </label>
      {children}
      {helper && <p className="text-xs text-neutral-500 dark:text-neutral-400">{helper}</p>}
    </div>
  );
}

function ThumbnailUploader({
  value,
  onChange,
}: {
  value: { url: string; width: number; height: number } | null;
  onChange: (v: { url: string; width: number; height: number } | null) => void;
}) {
  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Ukuran file maksimal 2MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      const img = new Image();
      img.onload = () => onChange({ url, width: img.width, height: img.height });
      img.src = url;
    };
    reader.readAsDataURL(file);
  };

  if (value) {
    return (
      <div className="relative aspect-video rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 group">
        <ThumbnailImage src={value.url} alt="Thumbnail" size={0} rounded="xl" className="!w-full !h-full !rounded-none" />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <label className="h-9 px-3 rounded-lg bg-white text-neutral-900 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer hover:bg-neutral-100">
            <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
            Ganti
          </label>
          <button type="button" onClick={() => onChange(null)} className="h-9 px-3 rounded-lg bg-red-600 text-white text-xs font-semibold inline-flex items-center gap-1.5 hover:bg-red-700">
            Hapus
          </button>
        </div>
      </div>
    );
  }

  return (
    <label
      className="aspect-video rounded-xl border-2 border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/30 hover:border-primary hover:bg-primary/5 flex flex-col items-center justify-center cursor-pointer transition-colors"
    >
      <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
      <svg className="w-8 h-8 text-neutral-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Drop gambar atau klik untuk upload</p>
      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">JPG, PNG, WebP • Maks 2MB</p>
    </label>
  );
}
