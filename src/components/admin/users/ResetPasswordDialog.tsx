"use client";

import ConfirmDialog from "@/components/ui/ConfirmDialog";
import type { User } from "@/lib/users/types";

interface ResetPasswordDialogProps {
  open: boolean;
  user: User | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ResetPasswordDialog({
  open,
  user,
  onConfirm,
  onCancel,
}: ResetPasswordDialogProps) {
  if (!user) return null;

  return (
    <ConfirmDialog
      open={open}
      title="Reset Password Pengguna?"
      description={`Password baru akan di-generate otomatis dan dikirim ke email ${user.email}.`}
      confirmText="Ya, Reset & Kirim"
      cancelText="Batal"
      variant="default"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}
