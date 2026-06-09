"use client";

import ConfirmDialog from "@/components/ui/ConfirmDialog";

interface DeleteCourseDialogProps {
  open: boolean;
  courseTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteCourseDialog({
  open,
  courseTitle,
  onConfirm,
  onCancel,
}: DeleteCourseDialogProps) {
  return (
    <ConfirmDialog
      open={open}
      title="Hapus Kursus?"
      description={`Apakah Anda yakin ingin menghapus kursus "${courseTitle}"? Semua data termasuk modul, materi, dan progress siswa akan terhapus. Tindakan ini tidak dapat dibatalkan.`}
      confirmText="Hapus Kursus"
      cancelText="Batal"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}
