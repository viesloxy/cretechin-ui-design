"use client";

import ConfirmDialog from "@/components/ui/ConfirmDialog";

interface DeleteEventDialogProps {
  open: boolean;
  eventTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteEventDialog({
  open,
  eventTitle,
  onConfirm,
  onCancel,
}: DeleteEventDialogProps) {
  return (
    <ConfirmDialog
      open={open}
      title="Hapus Acara?"
      description={`Acara "${eventTitle}" akan dihapus permanen. Tindakan ini tidak dapat dibatalkan.`}
      confirmText="Ya, Hapus"
      cancelText="Batal"
      variant="destructive"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}
