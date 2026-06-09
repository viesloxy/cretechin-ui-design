"use client";

import ConfirmDialog from "@/components/ui/ConfirmDialog";
import type { User } from "@/lib/users/types";

interface ActivateUserDialogProps {
  open: boolean;
  user: User | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ActivateUserDialog({
  open,
  user,
  onConfirm,
  onCancel,
}: ActivateUserDialogProps) {
  if (!user) return null;

  return (
    <ConfirmDialog
      open={open}
      title="Aktifkan Pengguna?"
      description={`Pengguna ${user.name} akan dapat login kembali ke CreTechin.`}
      confirmText="Ya, Aktifkan"
      cancelText="Batal"
      variant="default"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}
