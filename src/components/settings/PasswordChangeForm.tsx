"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Check, X as XIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import AuthInput from "@/components/auth/AuthInput";
import { PASSWORD_VALIDATION } from "./mockData";
import type { PasswordChangeData } from "./types";

interface PasswordChangeFormProps {
  onSubmit: (data: PasswordChangeData) => Promise<void>;
  isSaving?: boolean;
  currentPasswordError?: string;
}

function getPasswordStrength(pwd: string): {
  level: "weak" | "medium" | "strong";
  score: number;
  label: string;
} {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++;
  if (/\d/.test(pwd)) score++;
  if (/[^a-zA-Z0-9]/.test(pwd)) score++;

  if (score <= 1) return { level: "weak", score, label: "Lemah" };
  if (score <= 2) return { level: "medium", score, label: "Sedang" };
  return { level: "strong", score, label: "Kuat" };
}

export default function PasswordChangeForm({
  onSubmit,
  isSaving = false,
  currentPasswordError,
}: PasswordChangeFormProps) {
  const [data, setData] = useState<PasswordChangeData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof PasswordChangeData, string>>
  >({});
  const [isDirty, setIsDirty] = useState(false);

  const strength = getPasswordStrength(data.newPassword);
  const confirmMatch =
    data.confirmPassword.length > 0 && data.newPassword === data.confirmPassword;

  const update = <K extends keyof PasswordChangeData>(
    key: K,
    value: PasswordChangeData[K],
  ) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setIsDirty(true);
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof PasswordChangeData, string>> = {};

    if (!data.currentPassword) {
      newErrors.currentPassword = "Kata sandi saat ini wajib diisi";
    }

    if (!data.newPassword) {
      newErrors.newPassword = "Kata sandi baru wajib diisi";
    } else if (data.newPassword.length < PASSWORD_VALIDATION.newPassword.minLength) {
      newErrors.newPassword = `Minimal ${PASSWORD_VALIDATION.newPassword.minLength} karakter`;
    } else if (!PASSWORD_VALIDATION.newPassword.pattern.test(data.newPassword)) {
      newErrors.newPassword = "Kombinasi huruf besar, kecil, dan angka";
    }

    if (!data.confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi kata sandi wajib diisi";
    } else if (data.newPassword !== data.confirmPassword) {
      newErrors.confirmPassword = "Kata sandi tidak cocok";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    await onSubmit(data);
    setData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setIsDirty(false);
  };

  const strengthColor =
    strength.level === "weak"
      ? "bg-neutral-300 dark:bg-neutral-700"
      : strength.level === "medium"
        ? "bg-neutral-500 dark:bg-neutral-400"
        : "bg-primary";

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/40 p-5 sm:p-6 md:p-8"
    >
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
          Ubah Kata Sandi
        </h2>
        <p className="text-sm text-neutral-500 dark:text-white/40 mt-1">
          Pastikan kata sandi baru Anda kuat dan belum pernah digunakan sebelumnya
        </p>
      </div>

      <div className="space-y-5">
        <AuthInput
          label="Kata Sandi Saat Ini"
          type={showCurrent ? "text" : "password"}
          required
          value={data.currentPassword}
          onChange={(e) => update("currentPassword", e.target.value)}
          error={errors.currentPassword ?? currentPasswordError}
          suffixIcon={
            showCurrent ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )
          }
          onSuffixClick={() => setShowCurrent((v) => !v)}
        />

        <div>
          <AuthInput
            label="Kata Sandi Baru"
            type={showNew ? "text" : "password"}
            required
            value={data.newPassword}
            onChange={(e) => update("newPassword", e.target.value)}
            error={errors.newPassword}
            helper="Minimal 8 karakter, kombinasi huruf besar, kecil, dan angka"
            suffixIcon={
              showNew ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )
            }
            onSuffixClick={() => setShowNew((v) => !v)}
          />

          {/* Strength bar */}
          {data.newPassword.length > 0 && (
            <div className="mt-2 space-y-1.5">
              <div className="flex gap-1">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={twMerge(
                      "h-1 flex-1 rounded-full transition-colors duration-200",
                      strength.score >= i + 1
                        ? strengthColor
                        : "bg-neutral-200 dark:bg-neutral-800",
                    )}
                  />
                ))}
              </div>
              <p className="text-xs text-neutral-500 dark:text-white/40">
                Kekuatan: <span className="font-medium">{strength.label}</span>
              </p>
            </div>
          )}
        </div>

        <div>
          <AuthInput
            label="Konfirmasi Kata Sandi Baru"
            type={showConfirm ? "text" : "password"}
            required
            value={data.confirmPassword}
            onChange={(e) => update("confirmPassword", e.target.value)}
            error={errors.confirmPassword}
            suffixIcon={
              showConfirm ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )
            }
            onSuffixClick={() => setShowConfirm((v) => !v)}
          />
          {data.confirmPassword.length > 0 && (
            <p
              className={twMerge(
                "text-xs mt-2 flex items-center gap-1.5",
                confirmMatch
                  ? "text-primary"
                  : "text-neutral-500 dark:text-white/40 italic",
              )}
            >
              {confirmMatch ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <XIcon className="w-3.5 h-3.5" />
              )}
              {confirmMatch ? "Kata sandi cocok" : "Belum cocok"}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-6 mt-6 sm:mt-8 border-t border-black/5 dark:border-white/5">
        <button
          type="button"
          onClick={() => {
            setData({ currentPassword: "", newPassword: "", confirmPassword: "" });
            setErrors({});
            setIsDirty(false);
          }}
          disabled={isSaving || !isDirty}
          className="py-3 px-6 rounded-full border border-neutral-300 dark:border-white/20 text-neutral-700 dark:text-white/80 hover:border-primary hover:text-primary text-sm font-semibold active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSaving || !isDirty}
          className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-primary text-neutral-900 text-sm font-semibold hover:bg-primary-dark active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving && (
            <span className="inline-block w-4 h-4 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" />
          )}
          {isSaving ? "Menyimpan..." : "Simpan Kata Sandi"}
        </button>
      </div>
    </motion.div>
  );
}
