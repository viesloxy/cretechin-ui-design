"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { AdminProvider, useAdmin } from "@/context/AdminContext";
import Sidebar from "@/components/admin/Sidebar";
import TopBar from "@/components/admin/TopBar";
import {
  ProductsListView,
  ProductEditor,
  DeleteProductDialog,
} from "@/components/admin/products";
import type { Product, ProductFilter } from "@/lib/products/types";
import { MOCK_PRODUCTS } from "@/lib/products/mockData";

type ViewMode = "list" | "editor";
type EditorMode = "create" | "edit";

const DEFAULT_FILTER: ProductFilter = {
  search: "",
  category: "all",
  status: "all",
  productType: "all",
  sortBy: "newest",
  page: 1,
  perPage: 10,
};

function ProductsContent() {
  const router = useRouter();
  const { isAdmin, isLoading: authLoading } = useAuth();
  const { isLoading, sidebarCollapsed } = useAdmin();

  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [editorMode, setEditorMode] = useState<EditorMode>("create");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [filters, setFilters] = useState<ProductFilter>(DEFAULT_FILTER);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<{ id: string; title: string } | null>(null);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.push("/admin/login");
    }
  }, [isAdmin, authLoading, router]);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-950">
        <motion.div className="flex flex-col items-center gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
          <p className="text-neutral-600 dark:text-white/50 animate-pulse">Memuat halaman...</p>
        </motion.div>
      </div>
    );
  }

  if (!isAdmin) return null;

  const selectedProduct = selectedProductId !== null ? products.find((p) => p.id === selectedProductId) ?? null : null;

  // Handlers
  const openCreate = () => {
    setEditorMode("create");
    setSelectedProductId(null);
    setViewMode("editor");
  };

  const openEdit = (id: string) => {
    setEditorMode("edit");
    setSelectedProductId(id);
    setViewMode("editor");
  };

  const closeView = () => {
    setViewMode("list");
    setSelectedProductId(null);
  };

  const handleDelete = (id: string) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;
    setPendingDelete({ id, title: product.title });
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!pendingDelete) return;
    setProducts((prev) => prev.filter((p) => p.id !== pendingDelete.id));
    setDeleteDialogOpen(false);
    setPendingDelete(null);
  };

  const handlePreview = (id: string) => {
    const product = products.find((p) => p.id === id);
    if (product) alert(`Preview: ${product.title}\n\n${product.shortDescription}\n\nHarga: ${product.isFree ? "GRATIS" : "Rp " + product.price.toLocaleString("id-ID")}`);
  };

  const handleFilterChange = (partial: Partial<ProductFilter>) => {
    setFilters((prev) => ({ ...prev, ...partial }));
  };

  const handleResetFilters = () => {
    setFilters({ ...DEFAULT_FILTER });
  };

  const handleSaveProduct = async (data: Partial<Product>) => {
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (editorMode === "create") {
      const newProduct: Product = {
        id: `prod-${Date.now()}`,
        slug: data.slug ?? "",
        title: data.title ?? "",
        description: data.description ?? "",
        shortDescription: data.shortDescription ?? "",
        productType: data.productType ?? "digital",
        category: data.category ?? "ui_kits",
        status: data.status ?? "draft",
        creator: data.creator ?? { id: `cr-${Date.now()}`, name: "Admin CreTechin" },
        price: data.price ?? 0,
        isFree: data.isFree ?? false,
        discount: data.discount ?? null,
        stock: data.stock ?? 999,
        sku: data.sku ?? `SKU-${Date.now()}`,
        weight: data.weight ?? 0,
        dimensions: data.dimensions,
        thumbnail: data.thumbnail ?? { id: "img-empty", url: "", width: 0, height: 0, isPrimary: true },
        gallery: data.gallery ?? [],
        sourceFile: data.sourceFile,
        demoUrl: data.demoUrl,
        tags: data.tags ?? [],
        specifications: data.specifications ?? [],
        whatsIncluded: data.whatsIncluded ?? [],
        featured: data.featured ?? false,
        enableReview: data.enableReview ?? true,
        downloadLimit: data.downloadLimit,
        metaTitle: data.metaTitle ?? "",
        metaDescription: data.metaDescription ?? "",
        viewCount: 0,
        soldCount: 0,
        rating: 0,
        reviewCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: data.publishedAt ?? null,
      };
      setProducts((prev) => [newProduct, ...prev]);
      setSelectedProductId(newProduct.id);
      setEditorMode("edit");
    } else if (data.id) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === data.id
            ? ({
                ...p,
                ...data,
                updatedAt: new Date().toISOString(),
                thumbnail: data.gallery?.find((g) => g.isPrimary) ?? data.gallery?.[0] ?? p.thumbnail,
              } as Product)
            : p
        )
      );
    }
  };

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
          <AnimatePresence mode="wait">
            {viewMode === "list" && (
              <motion.div
                key="list"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProductsListView
                  products={products}
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onResetFilters={handleResetFilters}
                  onAdd={openCreate}
                  onEdit={openEdit}
                  onDelete={handleDelete}
                  onPreview={handlePreview}
                />
              </motion.div>
            )}
            {viewMode === "editor" && (
              <motion.div
                key="editor"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProductEditor
                  mode={editorMode}
                  product={selectedProduct}
                  existingProducts={products}
                  onBack={closeView}
                  onSave={handleSaveProduct}
                />
              </motion.div>
            )}
          </AnimatePresence>
          <div className="h-8" />
        </main>
      </div>

      <DeleteProductDialog
        open={deleteDialogOpen}
        productTitle={pendingDelete?.title ?? ""}
        onConfirm={confirmDelete}
        onCancel={() => {
          setDeleteDialogOpen(false);
          setPendingDelete(null);
        }}
      />
    </div>
  );
}

export default function AdminProductsPage() {
  return (
    <AuthProvider>
      <AdminProvider>
        <ProductsContent />
      </AdminProvider>
    </AuthProvider>
  );
}
