"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { AdminProvider, useAdmin } from "@/context/AdminContext";
import Sidebar from "@/components/admin/Sidebar";
import TopBar from "@/components/admin/TopBar";
import {
  UsersListView,
  EditUserModal,
  BlockUserDialog,
  ResetPasswordDialog,
  ActivateUserDialog,
} from "@/components/admin/users";
import type { User, UserFilter, UserRole, UserStatus } from "@/lib/users/types";
import { MOCK_USERS } from "@/lib/users/mockData";
import {
  countUsersByStatus,
  downloadCSV,
  generateUsersCSV,
  isLastAdmin,
} from "@/lib/users/utils";

const DEFAULT_FILTER: UserFilter = {
  search: "",
  role: "all",
  status: "all",
  joinPeriod: "all",
  sortBy: "newest",
  page: 1,
  perPage: 10,
};

function UsersContent() {
  const router = useRouter();
  const { isAdmin, isLoading: authLoading } = useAuth();
  const { isLoading, sidebarCollapsed } = useAdmin();

  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [filters, setFilters] = useState<UserFilter>(DEFAULT_FILTER);
  const [currentAdminId] = useState<string>("user-001"); // mock current admin (Vito)

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [blockDialogOpen, setBlockDialogOpen] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [activateDialogOpen, setActivateDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const [toast, setToast] = useState<{
    message: string;
    variant: "success" | "error";
  } | null>(null);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.push("/admin/login");
    }
  }, [isAdmin, authLoading, router]);

  const stats = useMemo(() => countUsersByStatus(users), [users]);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-950">
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-16 h-16 relative">
            <motion.div
              className="absolute inset-0 border-4 border-primary/30 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 border-4 border-t-primary rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <p className="text-neutral-600 dark:text-white/50 animate-pulse">
            Memuat halaman...
          </p>
        </motion.div>
      </div>
    );
  }

  if (!isAdmin) return null;

  const selectedUser =
    selectedUserId !== null
      ? users.find((u) => u.id === selectedUserId) ?? null
      : null;

  const showToast = (
    message: string,
    variant: "success" | "error" = "success",
  ) => {
    setToast({ message, variant });
    setTimeout(() => setToast(null), 3000);
  };

  // Handlers
  const openEdit = (id: string) => {
    setSelectedUserId(id);
    setEditModalOpen(true);
  };

  const openBlock = (id: string) => {
    setSelectedUserId(id);
    setBlockDialogOpen(true);
  };

  const openActivate = (id: string) => {
    setSelectedUserId(id);
    setActivateDialogOpen(true);
  };

  const openReset = (id: string) => {
    setSelectedUserId(id);
    setResetDialogOpen(true);
  };

  const closeAll = () => {
    setEditModalOpen(false);
    setBlockDialogOpen(false);
    setResetDialogOpen(false);
    setActivateDialogOpen(false);
    setSelectedUserId(null);
  };

  const handleToggleStatus = (id: string) => {
    const user = users.find((u) => u.id === id);
    if (!user) return;
    if (user.status === "active") openBlock(id);
    else openActivate(id);
  };

  const handleSaveUser = async (data: {
    role: UserRole;
    status: UserStatus;
    notify: boolean;
  }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (!selectedUser) return;
    setUsers((prev) =>
      prev.map((u) =>
        u.id === selectedUser.id
          ? { ...u, ...data, updatedAt: new Date().toISOString() }
          : u,
      ),
    );
    showToast(`Data ${selectedUser.name} berhasil disimpan`);
    closeAll();
  };

  const handleConfirmBlock = (blockType: UserStatus, reason: string) => {
    if (!selectedUser) return;
    setUsers((prev) =>
      prev.map((u) =>
        u.id === selectedUser.id
          ? {
              ...u,
              status: blockType,
              updatedAt: new Date().toISOString(),
            }
          : u,
      ),
    );
    showToast(
      `${selectedUser.name} telah di-${blockType === "banned" ? "ban" : "suspend"}${reason ? ` (Alasan: ${reason})` : ""}`,
    );
    closeAll();
  };

  const handleConfirmActivate = () => {
    if (!selectedUser) return;
    setUsers((prev) =>
      prev.map((u) =>
        u.id === selectedUser.id
          ? {
              ...u,
              status: "active",
              updatedAt: new Date().toISOString(),
            }
          : u,
      ),
    );
    showToast(`${selectedUser.name} telah diaktifkan kembali`);
    closeAll();
  };

  const handleConfirmReset = () => {
    if (!selectedUser) return;
    showToast(`Password baru telah dikirim ke ${selectedUser.email}`);
    closeAll();
  };

  const handleFilterChange = (partial: Partial<UserFilter>) => {
    setFilters((prev) => ({ ...prev, ...partial }));
  };

  const handleResetFilters = () => {
    setFilters({ ...DEFAULT_FILTER });
  };

  const handleExport = () => {
    // Export filtered set
    const filtered = users.filter((u) => {
      if (filters.role !== "all" && u.role !== filters.role) return false;
      if (filters.status !== "all" && u.status !== filters.status) return false;
      if (filters.search.trim() !== "") {
        const search = filters.search.toLowerCase();
        if (!`${u.name} ${u.email}`.toLowerCase().includes(search))
          return false;
      }
      return true;
    });
    const csv = generateUsersCSV(filtered);
    const today = new Date().toISOString().substring(0, 10);
    downloadCSV(csv, `cretechin-users-${today}.csv`);
    showToast(`Data CSV berhasil diunduh (${filtered.length} baris)`);
  };

  const handleAddUser = () => {
    showToast(
      "Fitur tambah pengguna via admin panel akan segera tersedia. User biasanya mendaftarkan diri sendiri.",
      "success",
    );
  };

  const lastAdminFlag = selectedUser ? isLastAdmin(users, selectedUser.id) : false;

  return (
    <div className="min-h-screen flex flex-row bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
      <Sidebar />
      <div
        className={`w-full transition-[padding] duration-300 ${
          sidebarCollapsed ? "lg:pl-4" : "lg:pl-6"
        }`}
      >
        <TopBar />
        <main className="p-4 lg:p-6 xl:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-medium tracking-tight text-black dark:text-white sm:text-3xl md:text-4xl">
              Manajemen Pengguna &amp; Hak Akses
            </h1>
            <p className="mt-1 text-sm text-neutral-500 md:text-base">
              Lihat, ubah role, dan kelola status akun pengguna CreTechin
            </p>
          </div>

          <UsersListView
            users={users}
            stats={stats}
            filters={filters}
            currentAdminId={currentAdminId}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            onExport={handleExport}
            onAddUser={handleAddUser}
            onEdit={openEdit}
            onToggleStatus={handleToggleStatus}
            onResetPassword={openReset}
          />
          <div className="h-8" />
        </main>
      </div>

      <EditUserModal
        open={editModalOpen}
        user={selectedUser}
        currentAdminId={currentAdminId}
        isLastAdmin={lastAdminFlag}
        onClose={closeAll}
        onSave={handleSaveUser}
      />

      <BlockUserDialog
        open={blockDialogOpen}
        user={selectedUser}
        onConfirm={handleConfirmBlock}
        onCancel={closeAll}
      />

      <ActivateUserDialog
        open={activateDialogOpen}
        user={selectedUser}
        onConfirm={handleConfirmActivate}
        onCancel={closeAll}
      />

      <ResetPasswordDialog
        open={resetDialogOpen}
        user={selectedUser}
        onConfirm={handleConfirmReset}
        onCancel={closeAll}
      />

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-6 right-6 z-50 max-w-sm rounded-2xl border px-4 py-3 shadow-lg ${
              toast.variant === "error"
                ? "border-red-200 bg-red-50 dark:border-red-900/40 dark:bg-red-900/20"
                : "border-black/5 bg-white dark:border-white/10 dark:bg-neutral-900"
            }`}
          >
            <p className="text-sm font-medium text-neutral-900 dark:text-white">
              {toast.variant === "error" ? "⚠" : "✓"} {toast.message}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AdminUsersPage() {
  return (
    <AuthProvider>
      <AdminProvider>
        <UsersContent />
      </AdminProvider>
    </AuthProvider>
  );
}
