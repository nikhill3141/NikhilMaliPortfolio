import { useEffect, useState, useRef } from "react";
import { ArrowLeft, Eye, Save, Sparkles } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetOnePost } from "../hooks/useGetOnePost";
import { usePostMutations } from "../hooks/usePostMutations";
import BlogEditor from "../components/editor/BlogEditor";

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
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetOnePost(id);

  const { updateMutation } = usePostMutations();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    categoryId: "",
    seoTitle: "",
    seoDescription: "",
    featured: false,
  });

  const [saved, setSaved] = useState(false);

  const post = data?.data;

  useEffect(() => {
    if (!post) return;

    setForm({
      title: post.title ?? "",
      slug: post.slug ?? "",
      excerpt: post.excerpt ?? "",
      content: post.content ?? "",
      coverImage: post.coverImage ?? "",
      categoryId: post.categoryId ?? "",
      seoTitle: post.seoTitle ?? "",
      seoDescription: post.seoDescription ?? "",
      featured: post.featured ?? false,
    });
  }, [post]);

  const titleRef = useAutosizeTextarea(form.title);

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();

    updateMutation.mutate(
      {
        id,
        data: form,
      },
      {
        onSuccess: () => {
          setSaved(true);

          setTimeout(() => {
            setSaved(false);
          }, 2500);
        },
      },
    );
  };

  if (isLoading) {
    return <EditPostSkeleton />;
  }

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

  if (!post) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 text-center">
        <h2 className="text-lg font-semibold text-zinc-900">Post not found</h2>

        <p className="mt-2 text-sm text-zinc-500">
          The post you're trying to edit doesn't exist.
        </p>

        <Link
          to="/admin/posts"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-zinc-950 px-4 py-2.5 text-sm font-medium !text-white hover:bg-zinc-800"
        >
          <ArrowLeft size={16} />
          Back to posts
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* ------------------------------------------------ */}
      {/* Top Bar */}
      {/* ------------------------------------------------ */}

      <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-4">
            <Link
              to="/admin/posts"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
              title="Back to posts"
            >
              <ArrowLeft size={18} />
            </Link>

            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                Editing
              </p>

              <p className="truncate text-sm font-medium text-zinc-900">
                {form.title || "Untitled post"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {saved && (
              <span className="hidden text-xs font-medium text-emerald-600 sm:block">
                Changes saved
              </span>
            )}

            <button
              type="button"
              className="hidden items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3.5 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 sm:flex"
            >
              <Eye size={16} />
              Preview
            </button>

            <button
              type="submit"
              form="edit-post-form"
              disabled={updateMutation.isPending}
              className="inline-flex items-center gap-2 rounded-lg bg-zinc-950 px-4 py-2 text-sm font-medium !text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save size={16} />

              {updateMutation.isPending ? "Saving..." : "Save changes"}
            </button>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------ */}
      {/* Main */}
      {/* ------------------------------------------------ */}

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <form
          id="edit-post-form"
          onSubmit={handleSave}
          className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_300px]"
        >
          {/* ============================================ */}
          {/* Main Editor — no card, flows as one page */}
          {/* ============================================ */}

          <section className="min-w-0">
            {/* Title */}
            <textarea
              ref={titleRef}
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="Post title"
              rows={1}
              className="w-full resize-none overflow-hidden border-none bg-transparent font-serif text-4xl font-bold leading-tight text-zinc-950 outline-none placeholder:text-zinc-300 md:text-5xl"
            />

            <div className="mt-3 flex items-center gap-1.5 text-xs text-zinc-400">
              <span>/blogs/</span>

              <input
                type="text"
                value={form.slug}
                onChange={(e) => updateField("slug", e.target.value)}
                className="min-w-0 flex-1 border-b border-transparent bg-transparent text-xs text-zinc-500 outline-none hover:border-zinc-200 focus:border-zinc-400"
              />
            </div>

            {/* Editor — merges straight into the page */}
            <div className="mt-10">
              <BlogEditor
                content={form.content}
                onChange={(content) => updateField("content", content)}
              />
            </div>
          </section>

          {/* ============================================ */}
          {/* Sidebar — real settings, kept as a panel */}
          {/* ============================================ */}

          <aside className="space-y-5">
            {/* Publish Status */}
            <SettingsCard title="Publishing">
              <div>
                <label className="text-xs font-medium text-zinc-500">
                  Status
                </label>

                <div className="mt-2 flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5">
                  <StatusDot status={post.status} />

                  <span className="text-sm font-medium text-zinc-800">
                    {post.status}
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <label className="text-xs font-medium text-zinc-500">
                  Category
                </label>

                <select
                  value={form.categoryId}
                  onChange={(e) => updateField("categoryId", e.target.value)}
                  className="mt-2 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-800 outline-none transition focus:border-zinc-400"
                >
                  <option value="">Select category</option>

                  <option value={form.categoryId}>
                    {post.category?.name || "Current category"}
                  </option>
                </select>
              </div>

              <label className="mt-4 flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => updateField("featured", e.target.checked)}
                  className="h-4 w-4 rounded border-zinc-300"
                />

                <span>
                  <span className="block text-sm font-medium text-zinc-800">
                    Featured post
                  </span>

                  <span className="text-xs text-zinc-500">
                    Highlight this post on your portfolio.
                  </span>
                </span>
              </label>
            </SettingsCard>

            {/* Excerpt */}
            <SettingsCard title="Excerpt">
              <textarea
                value={form.excerpt}
                onChange={(e) => updateField("excerpt", e.target.value)}
                rows={5}
                placeholder="Write a short description..."
                className="w-full resize-none rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm leading-6 text-zinc-800 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400"
              />

              <p className="mt-2 text-right text-xs text-zinc-400">
                {form.excerpt.length}/500
              </p>
            </SettingsCard>

            {/* Cover Image */}
            <SettingsCard title="Cover image">
              <input
                type="url"
                value={form.coverImage}
                onChange={(e) => updateField("coverImage", e.target.value)}
                placeholder="https://..."
                className="w-full rounded-lg border border-zinc-200 px-3 py-2.5 text-sm outline-none placeholder:text-zinc-400 focus:border-zinc-400"
              />

              {form.coverImage && (
                <div className="mt-3 overflow-hidden rounded-lg border border-zinc-200">
                  <img
                    src={form.coverImage}
                    alt="Cover preview"
                    className="aspect-video w-full object-cover"
                  />
                </div>
              )}
            </SettingsCard>

            {/* SEO */}
            <SettingsCard title="SEO" icon={<Sparkles size={15} />}>
              <div>
                <label className="text-xs font-medium text-zinc-500">
                  SEO title
                </label>

                <input
                  type="text"
                  value={form.seoTitle}
                  onChange={(e) => updateField("seoTitle", e.target.value)}
                  placeholder="SEO title"
                  className="mt-2 w-full rounded-lg border border-zinc-200 px-3 py-2.5 text-sm outline-none placeholder:text-zinc-400 focus:border-zinc-400"
                />
              </div>

              <div className="mt-4">
                <label className="text-xs font-medium text-zinc-500">
                  SEO description
                </label>

                <textarea
                  value={form.seoDescription}
                  onChange={(e) =>
                    updateField("seoDescription", e.target.value)
                  }
                  rows={4}
                  placeholder="Describe this article for search engines..."
                  className="mt-2 w-full resize-none rounded-lg border border-zinc-200 px-3 py-2.5 text-sm leading-6 outline-none placeholder:text-zinc-400 focus:border-zinc-400"
                />
              </div>
            </SettingsCard>

            {/* Metadata */}
            <SettingsCard title="Details">
              <div className="space-y-3 text-sm">
                <MetaRow label="Created" value={formatDate(post.createdAt)} />

                <MetaRow label="Updated" value={formatDate(post.updatedAt)} />

                <MetaRow label="Views" value={post.views ?? 0} />

                <MetaRow
                  label="Reading time"
                  value={
                    post.readingTime
                      ? `${post.readingTime} min`
                      : "Not calculated"
                  }
                />
              </div>
            </SettingsCard>
          </aside>
        </form>
      </main>
    </div>
  );
};

/* ====================================================== */
/* Supporting Components */
/* ====================================================== */

const SettingsCard = ({ title, icon, children }) => {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5">
      <div className="mb-4 flex items-center gap-2">
        {icon && <span className="text-zinc-500">{icon}</span>}

        <h2 className="text-sm font-semibold text-zinc-900">{title}</h2>
      </div>

      {children}
    </div>
  );
};

const MetaRow = ({ label, value }) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-zinc-500">{label}</span>

      <span className="text-right font-medium text-zinc-800">{value}</span>
    </div>
  );
};

const StatusDot = ({ status }) => {
  const styles = {
    DRAFT: "bg-amber-500",
    PUBLISHED: "bg-emerald-500",
    ARCHIVED: "bg-zinc-400",
  };

  return (
    <span
      className={`h-2 w-2 rounded-full ${styles[status] || styles.ARCHIVED}`}
    />
  );
};

const EditPostSkeleton = () => {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="h-16 border-b border-zinc-200 bg-white" />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="h-[700px] animate-pulse rounded-2xl bg-zinc-200" />

          <div className="space-y-5">
            <div className="h-56 animate-pulse rounded-xl bg-zinc-200" />
            <div className="h-48 animate-pulse rounded-xl bg-zinc-200" />
            <div className="h-40 animate-pulse rounded-xl bg-zinc-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

const formatDate = (date) => {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default EditPost;
