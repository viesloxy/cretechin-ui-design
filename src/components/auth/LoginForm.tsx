"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { validateLoginForm } from "@/lib/validation";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";

export default function LoginForm() {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    const validationErrors = validateLoginForm({ email, password });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    const result = await login(email, password);
    if (!result.success && result.error) setServerError(result.error);
  };

  const handleBlur = (field: string) => {
    const validationErrors = validateLoginForm({ email, password });
    if (validationErrors[field]) {
      setErrors((prev) => ({ ...prev, [field]: validationErrors[field] }));
    } else {
      setErrors((prev) => { const newErrors = { ...prev }; delete newErrors[field]; return newErrors; });
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
      <form onSubmit={handleSubmit} className="space-y-5">
        {serverError && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 rounded-lg bg-[#FF5252]/10 border border-[#FF5252]/20">
            <p className="text-sm text-[#FF5252] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {serverError}
            </p>
          </motion.div>
        )}

        <AuthInput
          label="Email"
          type="email"
          placeholder="nama@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => handleBlur("email")}
          error={errors.email}
          prefixIcon={<Mail className="w-5 h-5" />}
          autoComplete="email"
        />

        <AuthInput
          label="Kata Sandi"
          type={showPassword ? "text" : "password"}
          placeholder="Masukan kata sandi"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => handleBlur("password")}
          error={errors.password}
          prefixIcon={<Lock className="w-5 h-5" />}
          suffixIcon={showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          onSuffixClick={() => setShowPassword(!showPassword)}
          autoComplete="current-password"
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border border-black/10 dark:border-white/10 accent-primary cursor-pointer"
            />
            <span className="text-sm text-neutral-600 dark:text-white/50">Ingat saya</span>
          </label>
          <Link href="/forgot-password" className="text-sm text-neutral-600 dark:text-white/50 hover:text-primary transition-colors">
            Lupa kata sandi?
          </Link>
        </div>

        <AuthButton type="submit" isLoading={isLoading} label="Masuk" />
      </form>

      <p className="text-center text-sm text-neutral-600 dark:text-white/50 mt-6">
        Belum punya akun?{" "}
        <Link href="/register" className="text-primary hover:underline font-medium">
          Daftar di sini
        </Link>
      </p>
    </motion.div>
  );
}