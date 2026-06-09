"use client";

import ConfirmDialog from "@/components/ui/ConfirmDialog";

interface DeleteProductDialogProps {
  open: boolean;
  productTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteProductDialog({ open, productTitle, onConfirm, onCancel }: DeleteProductDialogProps) {
  return (
    <ConfirmDialog
      open={open}
      title="Hapus Produk?"
      description={`Apakah Anda yakin ingin menghapus produk "${productTitle}"? Data terkait (galeri, file sumber, statistik) akan ikut terhapus. Tindakan ini tidak dapat dibatalkan.`}
      confirmText="Hapus Produk"
      cancelText="Batal"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}
