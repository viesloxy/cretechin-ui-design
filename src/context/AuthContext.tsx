"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, login as authLogin, register as authRegister, logout as authLogout, saveSession, getSession, clearSession } from "@/lib/auth";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const session = getSession();
    if (session) setUser(session);
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

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("useAuth must be used within AuthProvider");
  return context;
}