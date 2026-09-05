import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CalendarDays,
  Clock3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { usePublicPosts } from "../admin/hooks/usePublicPost";


const categories = ["All", "Frontend", "Backend", "AI & Research", "Personal"];

const formatDate = (date) => {
  if (!date) return "Recently";

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getCategoryLabel = (post) => {
  return post?.category?.name || "Article";
};

/* Convert Tiptap JSON → readable plain text */
const getTextFromContent = (node) => {
  if (!node) return "";

  if (node.type === "text") {
    return node.text || "";
  }

  if (Array.isArray(node.content)) {
    return node.content.map(getTextFromContent).join(" ");
  }

  return "";
};

const getExcerpt = (post) => {
  if (post.excerpt?.trim()) {
    return post.excerpt;
  }

  if (!post.content) return "";

  const text = getTextFromContent(post.content).replace(/\s+/g, " ").trim();

  return text.length > 150 ? `${text.slice(0, 150)}...` : text;
};

const Blog = () => {
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const limit = 10;

  const { data, isLoading, isError } = usePublicPosts({
    page,
    limit,
  });

  const posts = data?.data?.blogs || [];
  const pagination = data?.data?.data;

  const featuredPost = posts.find((post) => post.featured);
  const regularPosts = posts.filter((post) => post.id !== featuredPost?.id);

  const filteredPosts =
    selectedCategory === "All"
      ? regularPosts
      : regularPosts.filter(
          (post) => getCategoryLabel(post) === selectedCategory,
        );

  if (isLoading) {
    return (
      <section className="sleek-section">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <div className="h-5 w-20 animate-pulse rounded bg-zinc-200" />
          <div className="mt-4 h-10 w-64 animate-pulse rounded bg-zinc-200" />
          <div className="mt-12 h-48 animate-pulse rounded-2xl bg-zinc-100" />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="sleek-section">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <p className="text-sm text-zinc-500">
            Unable to load articles right now.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="sleek-section">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-secondary">Writing</p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight text-zinc-950 sm:text-5xl">
            Thoughts, ideas & experiments
          </h1>

          <p className="mt-4 text-base leading-7 text-zinc-500">
            Notes on software development, backend engineering, AI and things I
            am learning along the way.
          </p>
        </div>

        {/* Categories */}
        <div className="mt-10 flex flex-wrap items-center gap-2 border-b border-[var(--border)] pb-5">
          {categories.map((category) => {
            const active = selectedCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setSelectedCategory(category);
                  setPage(1);
                }}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-zinc-950 text-white"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-950"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Featured Post */}
        {featuredPost && selectedCategory === "All" && (
          <motion.article
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="group mt-10 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
          >
            <div className="grid md:grid-cols-[100px_1fr_auto] md:items-center">
              {/* Number */}
              <div className="hidden self-stretch border-r border-[var(--border)] p-6 md:flex md:items-start md:justify-center">
                <span className="text-sm font-medium text-zinc-400">01</span>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 text-xs font-medium text-zinc-500">
                  <span className="rounded-full bg-zinc-100 px-3 py-1 text-zinc-600">
                    Featured
                  </span>

                  <span>{getCategoryLabel(featuredPost)}</span>
                </div>

                <h2 className="mt-4 text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl">
                  {featuredPost.title}
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">
                  {getExcerpt(featuredPost)}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-zinc-400">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays size={14} />
                    {formatDate(featuredPost.createdAt)}
                  </span>

                  {featuredPost.readingTime && (
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 size={14} />
                      {featuredPost.readingTime} min read
                    </span>
                  )}
                </div>
              </div>

              {/* Image + Link */}
              <div className="flex h-full min-h-[190px] flex-col justify-between gap-6 p-5 md:w-[230px]">
                {featuredPost.coverImage ? (
                  <div className="h-32 overflow-hidden rounded-xl">
                    <img
                      src={featuredPost.coverImage}
                      alt={featuredPost.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-32 rounded-xl bg-zinc-100" />
                )}

                <Link
                  to={`/blogs/${featuredPost.slug}`}
                  className="flex w-full items-center justify-between gap-3 text-sm font-semibold text-zinc-950"
                >
                  Read article
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border)]">
                    <ArrowUpRight size={17} />
                  </span>
                </Link>
              </div>
            </div>
          </motion.article>
        )}

        {/* Blog List */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
          {filteredPosts.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <p className="text-sm text-zinc-500">
                No articles found in this category.
              </p>
            </div>
          ) : (
            filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="group border-b border-[var(--border)] last:border-b-0"
              >
                <Link
                  to={`/blogs/${post.slug}`}
                  className="grid items-center gap-5 p-5 sm:p-6 md:grid-cols-[60px_minmax(0,1fr)_170px_48px]"
                >
                  {/* Number */}
                  <span className="hidden text-sm font-medium text-zinc-400 md:block">
                    {String(index + 2).padStart(2, "0")}
                  </span>

                  {/* Content */}
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-zinc-400">
                      <span className="text-zinc-600">
                        {getCategoryLabel(post)}
                      </span>

                      <span className="h-1 w-1 rounded-full bg-zinc-300" />

                      <span>{formatDate(post.createdAt)}</span>
                    </div>

                    <h2 className="mt-2 truncate text-base font-semibold text-zinc-950 sm:text-lg">
                      {post.title}
                    </h2>

                    <p className="mt-1 line-clamp-1 text-sm leading-6 text-zinc-500">
                      {getExcerpt(post)}
                    </p>
                  </div>

                  {/* Image */}
                  <div className="hidden h-20 overflow-hidden rounded-xl bg-zinc-100 md:block">
                    {post.coverImage ? (
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-zinc-100" />
                    )}
                  </div>

                  {/* Arrow */}
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-zinc-600 transition group-hover:text-zinc-950">
                    <ArrowUpRight size={16} />
                  </span>
                </Link>
              </motion.article>
            ))
          )}
        </div>

        {/* Pagination */}
        {pagination?.totalPage > 1 && (
          <div className="mt-8 flex items-center justify-between">
            <p className="text-sm text-zinc-500">
              Page {pagination.page} of {pagination.totalPage}
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page === 1}
                onClick={() => setPage((current) => current - 1)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-zinc-600 transition hover:text-zinc-950 disabled:pointer-events-none disabled:opacity-40"
              >
                <ChevronLeft size={17} />
              </button>

              <button
                type="button"
                disabled={page === pagination.totalPage}
                onClick={() => setPage((current) => current + 1)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-zinc-600 transition hover:text-zinc-950 disabled:pointer-events-none disabled:opacity-40"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
