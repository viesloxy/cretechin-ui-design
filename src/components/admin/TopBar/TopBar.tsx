"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bell, Menu, LogOut, User, Settings, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/context/AdminContext";
import { useAuth } from "@/context/AuthContext";

export default function TopBar() {
  const router = useRouter();
  const { setMobileSidebarOpen } = useAdmin();
  const { adminSession, adminLogout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const initials = adminSession?.name?.charAt(0).toUpperCase() ?? "A";

  const handleLogout = () => {
    adminLogout();
    router.push("/admin/login");
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl border-b border-black/5 dark:border-white/5">
      <div className="flex items-center gap-3 h-16 px-4 lg:px-6">
        {/* Mobile menu */}
        <button
          type="button"
          onClick={() => setMobileSidebarOpen(true)}
          className="p-2 -ml-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5 text-neutral-600 dark:text-white/60" />
        </button>

        {/* Search */}
        <div className="flex-1 max-w-2xl relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-white/40 pointer-events-none" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Cari data..."
            className="w-full bg-neutral-100 dark:bg-neutral-900 border border-transparent focus:border-primary/30 rounded-full pl-11 pr-4 py-2.5 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-white/40 outline-none transition-colors"
          />
        </div>

        <div className="flex-1 lg:flex-none" />

        {/* Notification bell */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setNotifOpen((v) => !v);
              setProfileOpen(false);
            }}
            className="relative p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-neutral-600 dark:text-white/60" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary ring-2 ring-white dark:ring-neutral-950" />
          </button>
          <AnimatePresence>
            {notifOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setNotifOpen(false)}
                  aria-hidden
                />
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-2rem)] bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/5 rounded-2xl shadow-lg shadow-black/10 z-50 overflow-hidden"
                >
                  <div className="px-4 py-3 border-b border-black/5 dark:border-white/5 flex items-center justify-between">
                    <h3 className="font-semibold text-sm text-black dark:text-white">Notifikasi</h3>
                    <span className="text-xs text-primary font-medium">3 baru</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {[
                      { title: "Kursus baru menunggu review", time: "5 menit lalu" },
                      { title: "Pembayaran masuk Rp 350.000", time: "1 jam lalu" },
                      { title: "User baru mendaftar", time: "2 jam lalu" },
                    ].map((n, i) => (
                      <div
                        key={i}
                        className="px-4 py-3 hover:bg-black/5 dark:hover:bg-white/5 border-b border-black/5 dark:border-white/5 last:border-0 cursor-pointer"
                      >
                        <p className="text-sm font-medium text-black dark:text-white">{n.title}</p>
                        <p className="text-xs text-neutral-500 dark:text-white/40 mt-0.5">{n.time}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Profile dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setProfileOpen((v) => !v);
              setNotifOpen(false);
            }}
            className="flex items-center gap-2 p-1 pr-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            aria-label="Profile menu"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-primary/10">
              {adminSession?.avatarUrl ? (
                <Image
                  src={adminSession.avatarUrl}
                  alt={adminSession.name}
                  width={32}
                  height={32}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-primary font-semibold text-sm">
                  {initials}
                </div>
              )}
            </div>
            <ChevronDown className="w-4 h-4 text-neutral-500 dark:text-white/40 hidden sm:block" />
          </button>
          <AnimatePresence>
            {profileOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setProfileOpen(false)}
                  aria-hidden
                />
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-56 bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/5 rounded-2xl shadow-lg shadow-black/10 z-50 overflow-hidden"
                >
                  <div className="px-4 py-3 border-b border-black/5 dark:border-white/5">
                    <p className="font-semibold text-sm text-black dark:text-white truncate">
                      {adminSession?.name ?? "Admin"}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-white/40 truncate">
                      {adminSession?.email ?? "admin@cretechin.id"}
                    </p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        router.push("/admin/settings");
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      Profil Saya
                    </button>
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        router.push("/admin/settings");
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      Pengaturan
                    </button>
                  </div>
                  <div className="border-t border-black/5 dark:border-white/5 py-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-expense hover:bg-expense/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Keluar
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
