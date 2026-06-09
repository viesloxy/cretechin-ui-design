"use client";

import { Trash2 } from "lucide-react";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

interface DeleteArticleDialogProps {
  open: boolean;
  articleTitle: string;
  count?: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteArticleDialog({
  open,
  articleTitle,
  count = 1,
  onConfirm,
  onCancel,
}: DeleteArticleDialogProps) {
  const isBulk = count > 1;

  return (
    <ConfirmDialog
      open={open}
      title={isBulk ? `Hapus ${count} Artikel?` : "Hapus Artikel?"}
      description={
        isBulk
          ? `Apakah Anda yakin ingin menghapus ${count} artikel yang dipilih? Tindakan ini tidak dapat dibatalkan.`
          : `Apakah Anda yakin ingin menghapus artikel "${articleTitle}"? Tindakan ini tidak dapat dibatalkan.`
      }
      confirmText={isBulk ? `Hapus ${count} Artikel` : "Hapus Artikel"}
      cancelText="Batal"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}
