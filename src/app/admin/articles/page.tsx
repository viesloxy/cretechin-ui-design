"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { AdminProvider, useAdmin } from "@/context/AdminContext";
import Sidebar from "@/components/admin/Sidebar";
import TopBar from "@/components/admin/TopBar";
import { ArticleListView, ArticleEditor, DeleteArticleDialog } from "@/components/admin/articles";
import type { Article } from "@/lib/articles/types";
import { MOCK_ARTICLES } from "@/lib/articles/mockData";

type ViewMode = "list" | "editor";
type EditorMode = "create" | "edit";

function ArticlesContent() {
  const router = useRouter();
  const { isAdmin, isLoading: authLoading, adminSession } = useAuth();
  const { isLoading, sidebarCollapsed } = useAdmin();

  const [articles, setArticles] = useState<Article[]>(MOCK_ARTICLES);
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [editorMode, setEditorMode] = useState<EditorMode>("create");
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<
    { type: "single"; id: string } | { type: "bulk"; ids: string[] } | null
  >(null);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.push("/admin/login");
    }
  }, [isAdmin, authLoading, router]);

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

  const selectedArticle =
    selectedArticleId !== null
      ? articles.find((a) => a.id === selectedArticleId) ?? null
      : null;

  // Handlers
  const openCreate = () => {
    setEditorMode("create");
    setSelectedArticleId(null);
    setViewMode("editor");
  };

  const openEdit = (id: string) => {
    setEditorMode("edit");
    setSelectedArticleId(id);
    setViewMode("editor");
  };

  const closeEditor = () => {
    setViewMode("list");
    setSelectedArticleId(null);
  };

  const handleDelete = (id: string) => {
    setPendingDelete({ type: "single", id });
    setDeleteDialogOpen(true);
  };

  const handleBulkDelete = (ids: string[]) => {
    if (ids.length === 0) return;
    setPendingDelete({ type: "bulk", ids });
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    if (pendingDelete.type === "single") {
      setArticles((prev) => prev.filter((a) => a.id !== pendingDelete.id));
    } else {
      setArticles((prev) => prev.filter((a) => !pendingDelete.ids.includes(a.id)));
    }
    setDeleteDialogOpen(false);
    setPendingDelete(null);
  };

  const handlePreview = (id: string) => {
    const article = articles.find((a) => a.id === id);
    if (article) alert(`Preview: ${article.title}\n\n${article.excerpt}`);
  };

  const handleTogglePublish = (id: string) => {
    setArticles((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: a.status === "published" ? "draft" : "published" }
          : a
      )
    );
  };

  const handleSave = async (data: Partial<Article>) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (editorMode === "create") {
      const newArticle: Article = {
        id: `art-${Date.now()}`,
        title: data.title ?? "",
        slug: data.slug ?? "",
        excerpt: data.excerpt ?? "",
        content: data.content ?? "",
        thumbnail: data.thumbnail ?? null,
        category: data.category ?? "tips",
        tags: data.tags ?? [],
        author: data.author ?? {
          id: "admin-001",
          name: adminSession?.name ?? "Admin CreTechin",
          avatar: "/images/avatar-3.jpeg",
        },
        status: data.status ?? "draft",
        featured: data.featured ?? false,
        allowComments: data.allowComments ?? true,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        views: 0,
        likes: 0,
        comments: 0,
        readTime: data.readTime ?? 1,
        publishedAt: data.publishedAt ?? null,
        scheduledAt: data.scheduledAt ?? null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setArticles((prev) => [newArticle, ...prev]);
    } else if (data.id) {
      setArticles((prev) =>
        prev.map((a) =>
          a.id === data.id ? { ...a, ...data, updatedAt: new Date().toISOString() } as Article : a
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
            {viewMode === "list" ? (
              <motion.div
                key="list"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <ArticleListView
                  articles={articles}
                  onAdd={openCreate}
                  onEdit={openEdit}
                  onPreview={handlePreview}
                  onDelete={handleDelete}
                  onBulkDelete={handleBulkDelete}
                  onTogglePublish={handleTogglePublish}
                />
              </motion.div>
            ) : (
              <motion.div
                key="editor"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <ArticleEditor
                  mode={editorMode}
                  article={selectedArticle}
                  authorName={adminSession?.name ?? "Admin CreTechin"}
                  onBack={closeEditor}
                  onSave={handleSave}
                />
              </motion.div>
            )}
          </AnimatePresence>
          <div className="h-8" />
        </main>
      </div>

      <DeleteArticleDialog
        open={deleteDialogOpen}
        articleTitle={
          pendingDelete?.type === "single"
            ? articles.find((a) => a.id === pendingDelete.id)?.title ?? ""
            : ""
        }
        count={pendingDelete?.type === "bulk" ? pendingDelete.ids.length : 1}
        onConfirm={confirmDelete}
        onCancel={() => {
          setDeleteDialogOpen(false);
          setPendingDelete(null);
        }}
      />
    </div>
  );
}

export default function AdminArticlesPage() {
  return (
    <AuthProvider>
      <AdminProvider>
        <ArticlesContent />
      </AdminProvider>
    </AuthProvider>
  );
}
