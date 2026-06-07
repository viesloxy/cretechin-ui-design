"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

const SIDEBAR_KEY = "cretechin_admin_sidebar_collapsed";
const PERIOD_KEY = "cretechin_admin_period";

export type Period = "today" | "7days" | "30days" | "year";

interface AdminContextValue {
  // Sidebar
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  isMobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean) => void;

  // Filters
  period: Period;
  setPeriod: (period: Period) => void;

  // Loading
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const AdminContext = createContext<AdminContextValue | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [period, setPeriodState] = useState<Period>("30days");
  const [isLoading, setIsLoading] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedCollapsed = localStorage.getItem(SIDEBAR_KEY);
    if (storedCollapsed === "true") setSidebarCollapsed(true);
    const storedPeriod = localStorage.getItem(PERIOD_KEY) as Period | null;
    if (storedPeriod) setPeriodState(storedPeriod);
    setHydrated(true);
    // Simulate initial load
    const t = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem(SIDEBAR_KEY, String(next));
      }
      return next;
    });
  };

  const setPeriod = (p: Period) => {
    setPeriodState(p);
    if (typeof window !== "undefined") {
      localStorage.setItem(PERIOD_KEY, p);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        sidebarCollapsed: hydrated ? sidebarCollapsed : false,
        toggleSidebar,
        isMobileSidebarOpen,
        setMobileSidebarOpen,
        period,
        setPeriod,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) throw new Error("useAdmin must be used within AdminProvider");
  return context;
}
