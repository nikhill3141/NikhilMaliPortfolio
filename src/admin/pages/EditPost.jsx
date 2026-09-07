import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { useGetOnePost } from "../hooks/useGetOnePost";
import { usePostMutations } from "../hooks/usePostMutations";
import { useCategories } from "../hooks/useGetCategories";

import { deleteBlogCoverImg } from "../api/cloudinary";

import BlogEditor from "../components/editor/BlogEditor";
import CoverImageUpload from "../components/CoverImageUpload";

const useAutosizeTextarea = (value) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  return ref;
};

const EditPost = () => {
  const { id } = useParams();

  // --------------------------------------------------
  // Fetch post
  // --------------------------------------------------

  const { data, isLoading, isError, error } = useGetOnePost(id);

  // --------------------------------------------------
  // Mutations
  // --------------------------------------------------

  const { updateMutation } = usePostMutations();

  // --------------------------------------------------
  // Categories
  // --------------------------------------------------

  const { data: categoryData, isLoading: categoriesLoading } =
    useCategories();

  const categories = categoryData?.categories ?? [];

  // --------------------------------------------------
  // Form state
  // --------------------------------------------------

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    coverImagePublicId: "",
    categoryId: "",
    seoTitle: "",
    seoDescription: "",
    featured: false,
  });

  const [saved, setSaved] = useState(false);

  // --------------------------------------------------
  // Keep track of original Cloudinary image
  // --------------------------------------------------

  const originalCoverPublicIdRef = useRef("");

  // --------------------------------------------------
  // Current post
  // --------------------------------------------------

  const post = data?.data;

  // --------------------------------------------------
  // Populate form when post loads
  // --------------------------------------------------

  useEffect(() => {
    if (!post) return;

    const existingPublicId = post.coverImagePublicId ?? "";

    setForm({
      title: post.title ?? "",
      slug: post.slug ?? "",
      excerpt: post.excerpt ?? "",
      content: post.content ?? "",
      coverImage: post.coverImage ?? "",
      coverImagePublicId: existingPublicId,
      categoryId: post.categoryId ?? "",
      seoTitle: post.seoTitle ?? "",
      seoDescription: post.seoDescription ?? "",
      featured: post.featured ?? false,
    });

    originalCoverPublicIdRef.current = existingPublicId;
  }, [post]);

  // --------------------------------------------------
  // Autosize title
  // --------------------------------------------------

  const titleRef = useAutosizeTextarea(form.title);
  const excerptRef = useAutosizeTextarea(form.excerpt);

  // --------------------------------------------------
  // Update field
  // --------------------------------------------------

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setSaved(false);
  };

  // --------------------------------------------------
  // Cover image value for component
  // --------------------------------------------------

  const coverImageValue = {
    url: form.coverImage,
    publicId: form.coverImagePublicId,
  };

  // --------------------------------------------------
  // Cover image change
  // --------------------------------------------------

  const handleCoverImageChange = (image) => {
    updateField("coverImage", image?.url ?? "");
    updateField("coverImagePublicId", image?.publicId ?? "");
  };

  // --------------------------------------------------
  // Save post
  // --------------------------------------------------

  const handleSave = (e) => {
    e.preventDefault();

    updateMutation.mutate(
      {
        id,
        data: {
          title: form.title,
          slug: form.slug,
          excerpt: form.excerpt || undefined,
          content: form.content,
          coverImage: form.coverImage || undefined,
          coverImagePublicId: form.coverImagePublicId || undefined,
          categoryId: form.categoryId,
          seoTitle: form.seoTitle || undefined,
          seoDescription: form.seoDescription || undefined,
          featured: form.featured,
        },
      },
      {
        onSuccess: async () => {
          setSaved(true);

          // --------------------------------------------
          // Delete previous Cloudinary image if replaced
          // or removed.
          //
          // This happens AFTER DB update succeeds.
          // --------------------------------------------

          const oldPublicId = originalCoverPublicIdRef.current;

          const newPublicId = form.coverImagePublicId;

          if (oldPublicId && oldPublicId !== newPublicId) {
            try {
              await deleteBlogCoverImg(oldPublicId);
            } catch (error) {
              console.error("Failed to delete old cover image:", error);
            }
          }

          // Update the reference so the same image
          // isn't deleted again on the next save.
          originalCoverPublicIdRef.current = newPublicId;

          setTimeout(() => {
            setSaved(false);
          }, 2500);
        },
      },
    );
  };

  // --------------------------------------------------
  // Loading
  // --------------------------------------------------

  if (isLoading) {
    return <EditPostSkeleton />;
  }

  // --------------------------------------------------
  // Error
  // --------------------------------------------------

  if (isError) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <h2 className="text-sm font-semibold text-red-800">
            Failed to load post
          </h2>

          <p className="mt-2 text-sm text-red-600">
            {error?.message || "Something went wrong."}
          </p>

          <Link
            to="/admin/posts"
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-red-700 hover:text-red-900"
          >
            <ArrowLeft size={16} />
            Back to posts
          </Link>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // Post not found
  // --------------------------------------------------

  if (!post) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 text-center">
        <h2 className="text-lg font-semibold text-zinc-900">Post not found</h2>

        <p className="mt-2 text-sm text-zinc-500">
          The post you're trying to edit doesn't exist.
        </p>

        <Link
          to="/admin/posts"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-zinc-950 px-4 py-2.5 text-sm font-medium !text-white transition hover:bg-zinc-800"
        >
          <ArrowLeft size={16} />
          Back to posts
        </Link>
      </div>
    );
  }

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <div className="min-h-screen bg-zinc-50 transition-colors dark:bg-zinc-950">
      {/* ================================================= */}
      {/* Top Bar */}
      {/* ================================================= */}

      <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/90">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              to="/admin/posts"
              className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              <ArrowLeft size={18} />
              <span className="hidden sm:inline">Posts</span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {saved && (
              <span className="hidden text-xs font-medium text-emerald-600 sm:block">
                Changes saved
              </span>
            )}

            <button
              type="submit"
              form="edit-post-form"
              disabled={updateMutation.isPending}
              className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-5 py-1.5 text-sm font-medium !text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-100 dark:!text-zinc-950 dark:hover:bg-white"
            >
              <Save size={16} />

              {updateMutation.isPending ? "Saving..." : "Save changes"}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 pb-40 pt-12">
        <form
          id="edit-post-form"
          onSubmit={handleSave}
          className="min-w-0"
        >
          <div className="mb-4">
            <select
              value={form.categoryId}
              onChange={(e) => updateField("categoryId", e.target.value)}
              disabled={categoriesLoading}
              className="cursor-pointer rounded-full border border-zinc-200 bg-transparent px-3 py-1 text-xs font-medium text-zinc-500 outline-none transition hover:border-zinc-300 focus:border-zinc-400 disabled:cursor-not-allowed dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-600 dark:focus:border-zinc-500"
            >
              <option value="">
                {categoriesLoading ? "Loading categories..." : "Select category"}
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <textarea
            ref={titleRef}
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            placeholder="Title"
            rows={1}
            className="w-full resize-none overflow-hidden border-none bg-transparent font-serif text-4xl font-bold leading-tight text-zinc-950 outline-none placeholder:text-zinc-300 dark:text-zinc-50 dark:placeholder:text-zinc-600 md:text-5xl"
          />

          <textarea
            ref={excerptRef}
            value={form.excerpt}
            onChange={(e) => updateField("excerpt", e.target.value)}
            placeholder="Add a subtitle..."
            rows={1}
            maxLength={500}
            className="mt-2 w-full resize-none overflow-hidden border-none bg-transparent text-lg text-zinc-500 outline-none placeholder:text-zinc-300 dark:text-zinc-400 dark:placeholder:text-zinc-600"
          />

          <div className="mt-3 flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500">
            <span>yoursite.com/blog/</span>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => updateField("slug", e.target.value)}
              className="min-w-0 flex-1 border-b border-transparent bg-transparent text-zinc-500 outline-none hover:border-zinc-200 focus:border-zinc-400 dark:text-zinc-400 dark:hover:border-zinc-700 dark:focus:border-zinc-500"
            />
          </div>

          <CoverImageUpload
            value={coverImageValue}
            onChange={handleCoverImageChange}
          />

          <div className="mt-10">
            <BlogEditor
              content={form.content}
              onChange={(content) => updateField("content", content)}
            />
          </div>
        </form>
      </main>
    </div>
  );
};

const EditPostSkeleton = () => {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="h-16 border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900" />

      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="h-10 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="mt-6 h-16 w-4/5 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="mt-3 h-7 w-2/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="mt-10 aspect-video animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800" />
        <div className="mt-10 h-[500px] animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800" />
      </div>
    </div>
  );
};

export default EditPost;
