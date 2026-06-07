"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  User,
  login as authLogin,
  register as authRegister,
  logout as authLogout,
  saveSession,
  getSession,
  clearSession,
  AdminSession,
  AdminUser,
  loginAsAdmin as authLoginAsAdmin,
  verifyAdmin2FA as authVerifyAdmin2FA,
  saveAdminSession,
  getAdminSession,
  clearAdminSession,
  AdminRole,
} from "@/lib/auth";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;

  // Admin
  adminSession: AdminSession | null;
  isAdmin: boolean;
  loginAsAdmin: (
    email: string,
    password: string,
    rememberMe?: boolean
  ) => Promise<{ success: boolean; error?: string; requires2FA?: boolean; admin?: AdminUser }>;
  verifyAdmin2FA: (
    email: string,
    otp: string,
    rememberMe?: boolean
  ) => Promise<{ success: boolean; error?: string; admin?: AdminUser }>;
  adminLogout: () => void;
  adminRole: AdminRole | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [adminSession, setAdminSession] = useState<AdminSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const session = getSession();
    if (session) setUser(session);
    const adminSess = getAdminSession();
    if (adminSess) setAdminSession(adminSess);
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await authLogin(email, password);
      if (result.success && result.user) {
        saveSession(result.user);
        setUser(result.user);
        return { success: true };
      }
      return { success: false, error: result.error };
    } catch {
      return { success: false, error: "Terjadi kesalahan. Coba lagi nanti." };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await authRegister(name, email, password);
      if (result.success && result.user) {
        saveSession(result.user);
        setUser(result.user);
        return { success: true };
      }
      return { success: false, error: result.error };
    } catch {
      return { success: false, error: "Terjadi kesalahan. Coba lagi nanti." };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authLogout();
    clearSession();
    setUser(null);
  };

  const loginAsAdmin = async (
    email: string,
    password: string,
    rememberMe: boolean = false
  ) => {
    try {
      const result = await authLoginAsAdmin(email, password);
      if (result.requires2FA && result.user) {
        return { success: false, requires2FA: true, admin: result.user };
      }
      if (result.success && result.user) {
        saveAdminSession(result.user, rememberMe);
        setAdminSession(getAdminSession());
        return { success: true, admin: result.user };
      }
      return { success: false, error: result.error };
    } catch {
      return { success: false, error: "Terjadi kesalahan. Coba lagi nanti." };
    }
  };

  const verifyAdmin2FA = async (
    email: string,
    otp: string,
    rememberMe: boolean = false
  ) => {
    try {
      const result = await authVerifyAdmin2FA(email, otp);
      if (result.success && result.user) {
        saveAdminSession(result.user, rememberMe);
        setAdminSession(getAdminSession());
        return { success: true, admin: result.user };
      }
      return { success: false, error: result.error };
    } catch {
      return { success: false, error: "Terjadi kesalahan. Coba lagi nanti." };
    }
  };

  const adminLogout = () => {
    clearAdminSession();
    setAdminSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        adminSession,
        isAdmin: !!adminSession,
        loginAsAdmin,
        verifyAdmin2FA,
        adminLogout,
        adminRole: adminSession?.role ?? null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("useAuth must be used within AuthProvider");
  return context;
}