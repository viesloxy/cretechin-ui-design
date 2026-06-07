"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  validateAdminLoginForm,
  validateAdminOTP,
} from "@/lib/validation";
import {
  getAdminLockoutRemaining,
  getAdminFailedAttempts,
} from "@/lib/auth";
import AuthInput from "@/components/auth/AuthInput";
import AuthButton from "@/components/auth/AuthButton";

export default function AdminLoginForm() {
  const { loginAsAdmin, verifyAdmin2FA } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");

  // 2FA state
  const [requires2FA, setRequires2FA] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Lockout / rate limit
  const [lockoutEndsAt, setLockoutEndsAt] = useState<number>(0);
  const [attemptsLeft, setAttemptsLeft] = useState<number>(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Refresh attempt counts on mount
    if (email) {
      const remaining = getAdminLockoutRemaining(email);
      setLockoutEndsAt(remaining > 0 ? Date.now() + remaining : 0);
      setAttemptsLeft(5 - getAdminFailedAttempts(email));
    }
  }, [email]);

  // Lockout countdown
  useEffect(() => {
    if (lockoutEndsAt <= 0) return;
    const interval = setInterval(() => {
      const remaining = lockoutEndsAt - Date.now();
      if (remaining <= 0) {
        setLockoutEndsAt(0);
        setServerError("");
        clearInterval(interval);
      } else {
        setServerError(
          `Akun terkunci. Coba lagi dalam ${Math.ceil(remaining / 60000)} menit.`
        );
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutEndsAt]);

  // Resend OTP cooldown
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    if (lockoutEndsAt > Date.now()) return;

    const validationErrors = validateAdminLoginForm({ email, password });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    const result = await loginAsAdmin(email, password, rememberMe);

    setIsSubmitting(false);

    if (result.requires2FA) {
      setRequires2FA(true);
      setResendCooldown(30);
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
      return;
    }

    if (!result.success && result.error) {
      setServerError(result.error);
      const remaining = getAdminLockoutRemaining(email);
      if (remaining > 0) setLockoutEndsAt(Date.now() + remaining);
      setAttemptsLeft(5 - getAdminFailedAttempts(email));
    }
  };

  const handleBlur = (field: string) => {
    const validationErrors = validateAdminLoginForm({ email, password });
    if (validationErrors[field]) {
      setErrors((prev) => ({ ...prev, [field]: validationErrors[field] }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // 2FA OTP handling
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setOtpError("");
    // Auto focus next
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
    // Auto submit when filled
    if (index === 5 && value) {
      const fullOtp = newOtp.join("");
      if (fullOtp.length === 6) handleOtpSubmit(fullOtp);
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const newOtp = ["", "", "", "", "", ""];
    pasted.split("").forEach((char, i) => { newOtp[i] = char; });
    setOtp(newOtp);
    setOtpError("");
    const lastFilled = Math.min(pasted.length, 5);
    otpRefs.current[lastFilled]?.focus();
    if (pasted.length === 6) handleOtpSubmit(pasted);
  };

  const handleOtpSubmit = async (fullOtp?: string) => {
    const code = fullOtp ?? otp.join("");
    const validation = validateAdminOTP(code);
    if (!validation.isValid) {
      setOtpError(validation.error ?? "Kode tidak valid");
      return;
    }
    setIsSubmitting(true);
    setOtpError("");
    const result = await verifyAdmin2FA(email, code, rememberMe);
    setIsSubmitting(false);
    if (!result.success && result.error) {
      setOtpError(result.error);
      setOtp(["", "", "", "", "", ""]);
      setTimeout(() => otpRefs.current[0]?.focus(), 50);
    }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    setIsResending(true);
    // Mock resend
    await new Promise((r) => setTimeout(r, 800));
    setIsResending(false);
    setResendCooldown(30);
    setOtpError("");
  };

  const handleBackToLogin = () => {
    setRequires2FA(false);
    setOtp(["", "", "", "", "", ""]);
    setOtpError("");
    setServerError("");
  };

  const isLocked = lockoutEndsAt > Date.now();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <AnimatePresence mode="wait">
        {!requires2FA ? (
          <motion.form
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {serverError && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: [0, -6, 6, -4, 4, 0] }}
                transition={{ duration: 0.4 }}
                className="p-3 rounded-lg bg-[#FF5252]/10 border border-[#FF5252]/20"
                role="alert"
              >
                <p className="text-sm text-[#FF5252] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {serverError}
                </p>
              </motion.div>
            )}

            <AuthInput
              label="Email Admin"
              type="email"
              placeholder="admin@cretechin.id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur("email")}
              error={errors.email}
              prefixIcon={<Mail className="w-5 h-5" />}
              autoComplete="username"
              disabled={isLocked}
            />

            <AuthInput
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Masukan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => handleBlur("password")}
              error={errors.password}
              prefixIcon={<Lock className="w-5 h-5" />}
              suffixIcon={
                showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />
              }
              onSuffixClick={() => setShowPassword(!showPassword)}
              autoComplete="current-password"
              disabled={isLocked}
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isLocked}
                  className="w-4 h-4 rounded border border-black/10 dark:border-white/10 accent-primary cursor-pointer disabled:opacity-50"
                />
                <span className="text-sm text-neutral-600 dark:text-white/50">
                  Ingat saya di perangkat ini
                </span>
              </label>
              <Link
                href="/admin/forgot-password"
                className="text-sm text-neutral-600 dark:text-white/50 hover:text-primary transition-colors"
              >
                Lupa password?
              </Link>
            </div>

            <AuthButton
              type="submit"
              isLoading={isSubmitting}
              label="Masuk sebagai Admin"
              disabled={isLocked}
            />

            {attemptsLeft > 0 && attemptsLeft < 5 && !isLocked && (
              <p className="text-xs text-center text-neutral-500 dark:text-white/40">
                Sisa {attemptsLeft} percobaan sebelum akun dikunci
              </p>
            )}
          </motion.form>
        ) : (
          <motion.div
            key="2fa"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-black dark:text-white mb-1">
                Verifikasi Dua Langkah
              </h2>
              <p className="text-sm text-neutral-600 dark:text-white/50">
                Masukkan 6 digit kode yang dikirim ke
                <br />
                <span className="font-medium text-black dark:text-white">{email}</span>
              </p>
            </div>

            {otpError && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 rounded-lg bg-[#FF5252]/10 border border-[#FF5252]/20"
                role="alert"
              >
                <p className="text-sm text-[#FF5252] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {otpError}
                </p>
              </motion.div>
            )}

            <div className="flex justify-center gap-2" onPaste={handleOtpPaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { otpRefs.current[index] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  disabled={isSubmitting}
                  aria-label={`Digit ${index + 1}`}
                  className="w-12 h-14 text-center text-2xl font-semibold bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 rounded-xl text-black dark:text-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-50"
                />
              ))}
            </div>

            <AuthButton
              type="button"
              onClick={() => handleOtpSubmit()}
              isLoading={isSubmitting}
              label="Verifikasi"
            />

            <div className="flex items-center justify-between text-sm">
              <button
                type="button"
                onClick={handleBackToLogin}
                className="inline-flex items-center gap-1 text-neutral-600 dark:text-white/50 hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Kembali
              </button>
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={isResending || resendCooldown > 0}
                className="text-primary hover:underline font-medium disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-1"
              >
                {isResending ? (
                  <>
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Mengirim...
                  </>
                ) : resendCooldown > 0 ? (
                  `Kirim ulang (${resendCooldown}s)`
                ) : (
                  "Kirim ulang kode"
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6 pt-6 border-t border-black/5 dark:border-white/5">
        <p className="text-center text-sm text-neutral-600 dark:text-white/50">
          User biasa?{" "}
          <Link
            href="/login"
            className="text-primary hover:underline font-medium"
          >
            Masuk di sini
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
