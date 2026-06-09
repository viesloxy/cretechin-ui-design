"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { Article, ArticleCategory, ArticleStatus } from "@/lib/articles/types";
import { estimateReadTime, formatRelativeTime, slugify } from "@/lib/articles/utils";
import EditorHeader from "./EditorHeader";
import TitleInput from "./TitleInput";
import FormattingToolbar from "./FormattingToolbar";
import ContentEditor from "./ContentEditor";
import SettingsPanel from "./SettingsPanel";

interface ArticleEditorProps {
  mode: "create" | "edit";
  article: Article | null;
  authorName: string;
  onBack: () => void;
  onSave: (data: Partial<Article>) => Promise<void>;
}

export default function ArticleEditor({
  mode,
  article,
  authorName,
  onBack,
  onSave,
}: ArticleEditorProps) {
  // Form state
  const [title, setTitle] = useState(article?.title ?? "");
  const [autoSlug, setAutoSlug] = useState(article?.slug ?? "");
  const [slugOverride, setSlugOverride] = useState(article?.slug ?? "");
  const [content, setContent] = useState(article?.content ?? "");
  const [thumbnail, setThumbnail] = useState<Article["thumbnail"]>(
    article?.thumbnail ?? null
  );
  const [category, setCategory] = useState<ArticleCategory>(
    article?.category ?? "tips"
  );
  const [tags, setTags] = useState<string[]>(article?.tags ?? []);
  const [status, setStatus] = useState<ArticleStatus>(article?.status ?? "draft");
  const [scheduledAt, setScheduledAt] = useState(
    article?.scheduledAt ? article.scheduledAt.slice(0, 16) : ""
  );
  const [featured, setFeatured] = useState(article?.featured ?? false);
  const [allowComments, setAllowComments] = useState(article?.allowComments ?? true);
  const [excerpt, setExcerpt] = useState(article?.excerpt ?? "");
  const [metaTitle, setMetaTitle] = useState(article?.metaTitle ?? "");
  const [metaDescription, setMetaDescription] = useState(
    article?.metaDescription ?? ""
  );

  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(
    article?.updatedAt
      ? formatRelativeTime(article.updatedAt)
      : "belum disimpan"
  );
  const [autoSaveStatus, setAutoSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const isDirty = useRef(false);

  // Auto-generate slug from title (only if user hasn't overridden)
  useEffect(() => {
    if (!slugOverride || slugOverride === slugify(article?.title ?? "")) {
      setAutoSlug(slugify(title));
    } else {
      setAutoSlug(slugOverride);
    }
  }, [title, slugOverride, article?.title]);

  // Track dirty state
  useEffect(() => {
    isDirty.current = true;
  }, [title, content, thumbnail, category, tags, status, featured, allowComments, excerpt, metaTitle, metaDescription]);

  // Auto-save every 30s when dirty
  useEffect(() => {
    if (mode !== "edit" || !article) return;
    const interval = setInterval(async () => {
      if (!isDirty.current) return;
      setAutoSaveStatus("saving");
      try {
        await onSave({
          id: article.id,
          title,
          slug: slugOverride || slugify(title),
          content,
          thumbnail,
          category,
          tags,
          status,
          scheduledAt: scheduledAt ? new Date(scheduledAt).toISOString() : null,
          featured,
          allowComments,
          excerpt,
          metaTitle,
          metaDescription,
        });
        isDirty.current = false;
        setLastSaved("baru saja");
        setAutoSaveStatus("saved");
        setTimeout(() => setAutoSaveStatus("idle"), 2000);
      } catch {
        setAutoSaveStatus("idle");
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [mode, article, title, content, thumbnail, category, tags, status, scheduledAt, featured, allowComments, excerpt, metaTitle, metaDescription, slugOverride, onSave]);

  // Warn on back with unsaved changes
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (isDirty.current) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, []);

  const handleBack = () => {
    if (isDirty.current && !confirm("Anda memiliki perubahan yang belum disimpan. Yakin ingin keluar?")) {
      return;
    }
    onBack();
  };

  const handleSave = async (overrideStatus?: ArticleStatus) => {
    if (!title.trim()) {
      alert("Judul artikel tidak boleh kosong");
      return;
    }
    if (!thumbnail) {
      if (overrideStatus === "published" || (!overrideStatus && status === "published")) {
        if (!confirm("Thumbnail belum diisi. Terbitkan tanpa thumbnail?")) return;
      }
    }
    setIsSaving(true);
    try {
      const finalStatus = overrideStatus ?? status;
      await onSave({
        id: article?.id,
        title,
        slug: slugOverride || slugify(title),
        content,
        thumbnail,
        category,
        tags,
        status: finalStatus,
        scheduledAt: finalStatus === "scheduled" && scheduledAt ? new Date(scheduledAt).toISOString() : null,
        publishedAt: finalStatus === "published" ? new Date().toISOString() : article?.publishedAt ?? null,
        featured,
        allowComments,
        excerpt,
        metaTitle,
        metaDescription,
        readTime: estimateReadTime(content),
        author: article?.author ?? { id: "admin-001", name: authorName, avatar: "/images/avatar-3.jpeg" },
        updatedAt: new Date().toISOString(),
      });
      isDirty.current = false;
      setLastSaved("baru saja");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveDraft = () => handleSave("draft");

  const handleFormat = (command: string) => {
    if (command.startsWith("formatBlock:")) {
      const tag = command.split(":")[1];
      document.execCommand("formatBlock", false, tag);
    } else {
      document.execCommand(command, false);
    }
  };

  const handleInsert = (type: "image" | "link" | "code") => {
    if (type === "link") {
      const url = prompt("Masukkan URL:");
      if (url) document.execCommand("createLink", false, url);
    } else if (type === "image") {
      const url = prompt("Masukkan URL gambar:");
      if (url) document.execCommand("insertImage", false, url);
    } else if (type === "code") {
      document.execCommand("formatBlock", false, "PRE");
    }
  };

  const handleAlign = (align: "left" | "center" | "right") => {
    document.execCommand(`justify${align.charAt(0).toUpperCase() + align.slice(1)}` as "justifyLeft", false);
  };

  const editorContent = (
    <div className={isFullscreen ? "fixed inset-0 z-[60] bg-white dark:bg-neutral-950 p-4 lg:p-6 overflow-y-auto" : ""}>
      <div className="space-y-4">
        <EditorHeader
          mode={mode}
          lastSaved={lastSaved}
          onBack={handleBack}
          onSaveDraft={handleSaveDraft}
          onPreview={() => alert("Preview: " + title)}
          isSaving={isSaving}
        />

        {autoSaveStatus !== "idle" && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5"
          >
            {autoSaveStatus === "saving" ? (
              <>
                <span className="w-2 h-2 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                Menyimpan otomatis...
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-primary" />
                Tersimpan otomatis
              </>
            )}
          </motion.div>
        )}

        <TitleInput
          value={title}
          onChange={setTitle}
          slug={autoSlug}
        />

        <FormattingToolbar
          onFormat={handleFormat}
          onInsert={handleInsert}
          onAlign={handleAlign}
          onToggleFullscreen={() => setIsFullscreen((p) => !p)}
        />

        <ContentEditor
          value={content}
          onChange={setContent}
          onFormat={handleFormat}
          onInsert={handleInsert}
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {isFullscreen ? (
        editorContent
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
          <div className="lg:col-span-7 space-y-4">{editorContent.props.children}</div>
          <div className="lg:col-span-3">
            <SettingsPanel
              status={status}
              scheduledAt={scheduledAt}
              thumbnail={thumbnail}
              category={category}
              tags={tags}
              featured={featured}
              allowComments={allowComments}
              excerpt={excerpt}
              metaTitle={metaTitle}
              metaDescription={metaDescription}
              slug={slugOverride}
              authorName={authorName}
              createdAt={article?.createdAt ?? new Date().toISOString()}
              updatedAt={article?.updatedAt ?? new Date().toISOString()}
              onStatusChange={setStatus}
              onScheduledAtChange={setScheduledAt}
              onThumbnailChange={setThumbnail}
              onCategoryChange={setCategory}
              onTagsChange={setTags}
              onFeaturedChange={setFeatured}
              onAllowCommentsChange={setAllowComments}
              onExcerptChange={setExcerpt}
              onMetaTitleChange={setMetaTitle}
              onMetaDescriptionChange={setMetaDescription}
              onSlugChange={setSlugOverride}
              onSave={() => handleSave()}
              isSaving={isSaving}
            />
          </div>
        </div>
      )}
    </div>
  );
}
