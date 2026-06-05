"use client";

import { useState, useRef, ChangeEvent } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Camera,
  Trash2,
  Mail,
  Phone,
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Globe,
  Check,
} from "lucide-react";
import AuthInput from "@/components/auth/AuthInput";
import Textarea from "@/components/ui/Textarea";
import {
  PROFILE_VALIDATION,
  MAX_AVATAR_SIZE,
  AVATAR_VALID_FORMATS,
  MAX_BIO_LENGTH,
  DEFAULT_AVATAR_URL,
} from "./mockData";
import type { ProfileFormData } from "./types";

interface ProfileEditFormProps {
  initialValues: ProfileFormData;
  initialAvatar: string;
  userEmail: string;
  userPhone?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  onSave: (data: ProfileFormData, avatarUrl: string | null) => Promise<void>;
  onRequestCancel: () => void;
  isSaving?: boolean;
}

export default function ProfileEditForm({
  initialValues,
  initialAvatar,
  userEmail,
  userPhone,
  isEmailVerified,
  isPhoneVerified,
  onSave,
  onRequestCancel,
  isSaving = false,
}: ProfileEditFormProps) {
  const [formData, setFormData] = useState<ProfileFormData>(initialValues);
  const [avatarUrl, setAvatarUrl] = useState<string>(initialAvatar);
  const [avatarDirty, setAvatarDirty] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ProfileFormData, string>>>(
    {},
  );
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const update = <K extends keyof ProfileFormData>(
    key: K,
    value: ProfileFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setIsDirty(true);
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_AVATAR_SIZE) {
      setAvatarError("Ukuran file maksimal 5MB");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    if (!AVATAR_VALID_FORMATS.includes(file.type)) {
      setAvatarError("Format harus JPEG, PNG, atau WebP");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setAvatarUrl(previewUrl);
    setAvatarDirty(true);
    setIsDirty(true);
    setAvatarError(null);
  };

  const handleRemoveAvatar = () => {
    setAvatarUrl(DEFAULT_AVATAR_URL);
    setAvatarDirty(true);
    setIsDirty(true);
    setAvatarError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ProfileFormData, string>> = {};

    if (PROFILE_VALIDATION.name.required && !formData.name.trim()) {
      newErrors.name = "Nama lengkap wajib diisi";
    } else if (formData.name.trim().length < PROFILE_VALIDATION.name.minLength) {
      newErrors.name = `Nama lengkap minimal ${PROFILE_VALIDATION.name.minLength} karakter`;
    }

    if (formData.username) {
      if (formData.username.length < PROFILE_VALIDATION.username.minLength) {
        newErrors.username = `Username minimal ${PROFILE_VALIDATION.username.minLength} karakter`;
      } else if (
        !PROFILE_VALIDATION.username.pattern.test(formData.username)
      ) {
        newErrors.username = "Username hanya boleh huruf, angka, dan underscore";
      }
    }

    if (formData.bio.length > PROFILE_VALIDATION.bio.maxLength) {
      newErrors.bio = `Bio maksimal ${PROFILE_VALIDATION.bio.maxLength} karakter`;
    }

    if (PROFILE_VALIDATION.institution.required && !formData.institution.trim()) {
      newErrors.institution = "Instansi wajib diisi";
    }

    if (PROFILE_VALIDATION.location.required && !formData.location.trim()) {
      newErrors.location = "Alamat wajib diisi";
    }

    // URL pattern for social
    const urlFields: (keyof ProfileFormData)[] = [
      "github",
      "linkedin",
      "instagram",
      "twitter",
      "website",
    ];
    urlFields.forEach((f) => {
      const v = formData[f];
      if (v && !/^https?:\/\/.+/.test(v)) {
        newErrors[f] = "URL harus dimulai dengan http:// atau https://";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    await onSave(formData, avatarDirty ? avatarUrl : null);
    setIsDirty(false);
    setAvatarDirty(false);
  };

  const handleCancelClick = () => {
    if (isDirty) {
      onRequestCancel();
    } else {
      // no-op
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/40 p-5 sm:p-6 md:p-8"
    >
      {/* Section 1: Edit Foto Profil */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
          Edit Foto Profil
        </h2>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full ring-4 ring-primary ring-offset-2 ring-offset-white dark:ring-offset-black overflow-hidden bg-neutral-100 dark:bg-neutral-800 flex-shrink-0">
            <Image
              src={avatarUrl}
              alt="Preview foto profil"
              fill
              sizes="112px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-2 items-center sm:items-start">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              className="hidden"
              aria-label="Pilih foto profil"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-primary text-neutral-900 text-sm font-semibold hover:bg-primary-dark active:scale-95 transition-all"
            >
              <Camera className="w-4 h-4" />
              Ubah Foto
            </button>
            <button
              type="button"
              onClick={handleRemoveAvatar}
              className="inline-flex items-center gap-2 py-2 px-4 rounded-full text-sm font-medium text-neutral-500 dark:text-white/40 hover:text-neutral-700 dark:hover:text-white/70 active:scale-95 transition-all"
            >
              <Trash2 className="w-4 h-4" />
              Hapus
            </button>
            {avatarError && (
              <p
                role="alert"
                className="text-xs text-neutral-500 dark:text-white/40 italic"
              >
                {avatarError}
              </p>
            )}
          </div>
        </div>
      </section>

      <div className="border-t border-black/5 dark:border-white/5 my-6 sm:my-8" />

      {/* Section 2: Informasi Dasar */}
      <section className="space-y-5">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
          Informasi Dasar
        </h2>
        <div className="space-y-5">
          <AuthInput
            label="Nama Lengkap"
            required
            value={formData.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Vito Aditya"
            error={errors.name}
            maxLength={PROFILE_VALIDATION.name.maxLength}
          />
          <AuthInput
            label="Username"
            value={formData.username}
            onChange={(e) => update("username", e.target.value)}
            placeholder="@vitoaditya"
            prefixIcon={<span className="text-sm">@</span>}
            error={errors.username}
            helper="Username unik yang akan tampil di URL profil publik Anda"
          />
          <Textarea
            label="Deskripsi / Bio"
            value={formData.bio}
            onChange={(e) => update("bio", e.target.value)}
            placeholder="Mahasiswa Teknik Informatika yang antusias belajar UI/UX dan Web Development..."
            maxLength={MAX_BIO_LENGTH}
            currentLength={formData.bio.length}
            maxLengthCounter={MAX_BIO_LENGTH}
            rows={4}
            error={errors.bio}
          />
          <AuthInput
            label="Instansi / Pekerjaan"
            required
            value={formData.institution}
            onChange={(e) => update("institution", e.target.value)}
            placeholder="Universitas Airlangga"
            error={errors.institution}
            maxLength={PROFILE_VALIDATION.institution.maxLength}
          />
          <AuthInput
            label="Alamat"
            required
            value={formData.location}
            onChange={(e) => update("location", e.target.value)}
            placeholder="Surabaya, Jawa Timur"
            error={errors.location}
            maxLength={PROFILE_VALIDATION.location.maxLength}
          />
        </div>
      </section>

      <div className="border-t border-black/5 dark:border-white/5 my-6 sm:my-8" />

      {/* Section 3: Kontak (read-only) */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
            Kontak
          </h2>
          <p className="text-xs text-neutral-500 dark:text-white/40 mt-1">
            Hubungi support untuk mengubah email atau nomor telepon
          </p>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="text-sm font-medium text-neutral-700 dark:text-white/80 mb-1.5 block">
                Email
              </label>
              <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 rounded-full px-5 py-3">
                <Mail className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                <span className="text-sm text-neutral-600 dark:text-white/50 flex-1 truncate">
                  {userEmail}
                </span>
                {isEmailVerified && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary flex-shrink-0">
                    <Check className="w-3 h-3" />
                    Terverifikasi
                  </span>
                )}
              </div>
            </div>
          </div>
          {userPhone && (
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="text-sm font-medium text-neutral-700 dark:text-white/80 mb-1.5 block">
                  Nomor Telepon
                </label>
                <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 rounded-full px-5 py-3">
                  <Phone className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                  <span className="text-sm text-neutral-600 dark:text-white/50 flex-1 truncate">
                    {userPhone}
                  </span>
                  {isPhoneVerified && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary flex-shrink-0">
                      <Check className="w-3 h-3" />
                      Terverifikasi
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="border-t border-black/5 dark:border-white/5 my-6 sm:my-8" />

      {/* Section 4: Social Links */}
      <section className="space-y-5">
        <div>
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
            Social Links
          </h2>
          <p className="text-xs text-neutral-500 dark:text-white/40 mt-1">
            Tambahkan tautan ke akun media sosial Anda (opsional)
          </p>
        </div>
        <div className="space-y-5">
          <AuthInput
            label="GitHub"
            value={formData.github}
            onChange={(e) => update("github", e.target.value)}
            placeholder="https://github.com/username"
            prefixIcon={<Github className="w-4 h-4" />}
            error={errors.github}
          />
          <AuthInput
            label="LinkedIn"
            value={formData.linkedin}
            onChange={(e) => update("linkedin", e.target.value)}
            placeholder="https://linkedin.com/in/username"
            prefixIcon={<Linkedin className="w-4 h-4" />}
            error={errors.linkedin}
          />
          <AuthInput
            label="Instagram"
            value={formData.instagram}
            onChange={(e) => update("instagram", e.target.value)}
            placeholder="https://instagram.com/username"
            prefixIcon={<Instagram className="w-4 h-4" />}
            error={errors.instagram}
          />
          <AuthInput
            label="Twitter / X"
            value={formData.twitter}
            onChange={(e) => update("twitter", e.target.value)}
            placeholder="https://twitter.com/username"
            prefixIcon={<Twitter className="w-4 h-4" />}
            error={errors.twitter}
          />
          <AuthInput
            label="Website"
            value={formData.website}
            onChange={(e) => update("website", e.target.value)}
            placeholder="https://website-anda.com"
            prefixIcon={<Globe className="w-4 h-4" />}
            error={errors.website}
          />
        </div>
      </section>

      {/* Action buttons */}
      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-6 mt-6 sm:mt-8 border-t border-black/5 dark:border-white/5">
        <button
          type="button"
          onClick={handleCancelClick}
          disabled={isSaving}
          className="py-3 px-6 rounded-full border border-neutral-300 dark:border-white/20 text-neutral-700 dark:text-white/80 hover:border-primary hover:text-primary text-sm font-semibold active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Batal
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSaving}
          className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-primary text-neutral-900 text-sm font-semibold hover:bg-primary-dark active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving && (
            <span className="inline-block w-4 h-4 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" />
          )}
          {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </div>
    </motion.div>
  );
}
