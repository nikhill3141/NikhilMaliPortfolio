import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { usePublicPosts } from "../admin/hooks/usePublicPost";


const CATEGORIES = [
  "All",
  "Backend",
  "AI & Research",
  "Frontend",
  "Personal",
];

function formatDate(date) {
  if (!date) return "Recently";

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getReadingTime(readingTime) {
  if (!readingTime) return null;

  return `${readingTime} min read`;
}

function getCategoryLabel(post) {
  /*
   * Your current public API returns categoryId,
   * but not the category name.
   *
   * Until the backend returns category.name,
   * this safely falls back to "Article".
   */
  return post.category?.name || "Article";
}

const Blog = () => {
  const { data, isLoading, isError } = usePublicPosts({
    page: 1,
    limit: 10,
  });

  const blogs = data?.data?.blogs ?? [];

  const featuredPost =
    blogs.find((post) => post.featured === true) ?? blogs[0];

  const regularPosts = featuredPost
    ? blogs.filter((post) => post.id !== featuredPost.id)
    : [];

  return (
    <section className="sleek-section">
      <div className="mx-auto max-w-7xl">
        {/* Categories */}
        <div className="mb-10 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((category, index) => (
            <button
              key={category}
              type="button"
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                index === 0
                  ? "border-primary bg-primary text-[var(--background)]"
                  : "border-[var(--border)] bg-[var(--surface)] text-secondary hover:border-primary hover:text-primary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="space-y-5">
            <div className="h-[420px] animate-pulse rounded-2xl bg-[var(--surface)]" />

            <div className="h-24 animate-pulse rounded-2xl bg-[var(--surface)]" />

            <div className="h-24 animate-pulse rounded-2xl bg-[var(--surface)]" />
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
            <p className="text-sm text-secondary">
              Unable to load blogs right now.
            </p>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !isError && blogs.length === 0 && (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
            <p className="text-sm text-secondary">
              No published blogs available.
            </p>
          </div>
        )}

        {!isLoading && !isError && featuredPost && (
          <>
            {/* Featured Blog */}
            <motion.article
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
            >
              <div className="grid md:grid-cols-[minmax(0,1fr)_360px]">
                {/* Featured Content */}
                <div className="flex min-h-[360px] flex-col justify-between p-7 sm:p-9 lg:p-10">
                  <div>
                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-secondary">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] px-3 py-1.5 font-medium">
                        <Sparkles size={13} />
                        Featured
                      </span>

                      <span className="flex items-center gap-1.5">
                        <CalendarDays size={14} />
                        {formatDate(
                          featuredPost.publishedAt ||
                            featuredPost.createdAt
                        )}
                      </span>

                      {getReadingTime(
                        featuredPost.readingTime
                      ) && (
                        <span className="flex items-center gap-1.5">
                          <Clock3 size={14} />
                          {getReadingTime(
                            featuredPost.readingTime
                          )}
                        </span>
                      )}
                    </div>

                    {/* Category */}
                    <p className="mt-8 text-sm font-medium text-secondary">
                      {getCategoryLabel(featuredPost)}
                    </p>

                    {/* Title */}
                    <Link
                      to={`/blogs/${featuredPost.slug}`}
                      className="block"
                    >
                      <h1 className="mt-2 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-primary transition-colors duration-200 group-hover:text-secondary sm:text-4xl lg:text-5xl">
                        {featuredPost.title}
                      </h1>
                    </Link>

                    {/* Excerpt */}
                    {featuredPost.excerpt && (
                      <p className="mt-5 max-w-2xl text-sm leading-7 text-secondary sm:text-base">
                        {featuredPost.excerpt}
                      </p>
                    )}
                  </div>

                  {/* Read Article */}
                  <div className="mt-8">
                    <Link
                      to={`/blogs/${featuredPost.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-secondary"
                    >
                      Read article

                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] transition-all duration-300 group-hover:bg-primary group-hover:text-[var(--background)]">
                        <ArrowUpRight size={16} />
                      </span>
                    </Link>
                  </div>
                </div>

                {/* Featured Image */}
                <div className="relative min-h-[280px] overflow-hidden border-t border-[var(--border)] md:min-h-full md:border-l md:border-t-0">
                  {featuredPost.coverImage ? (
                    <Link
                      to={`/blogs/${featuredPost.slug}`}
                      className="absolute inset-0 block"
                    >
                      <img
                        src={featuredPost.coverImage}
                        alt={featuredPost.title}
                        className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                    </Link>
                  ) : (
                    <div className="flex h-full min-h-[280px] items-center justify-center bg-[var(--background)]">
                      <span className="text-sm text-secondary">
                        No cover image
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.article>

            {/* Blog List */}
            {regularPosts.length > 0 && (
              <div className="mt-8 overflow-hidden rounded-2xl border-y border-[var(--border)]">
                {regularPosts.map((post, index) => {
                  const readingTime = getReadingTime(
                    post.readingTime
                  );

                  return (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.05,
                      }}
                      className="group border-b border-[var(--border)] last:border-b-0"
                    >
                      <div className="grid gap-5 px-1 py-7 md:grid-cols-[52px_minmax(0,1fr)_auto_44px] md:items-center md:gap-6">
                        {/* Number */}
                        <div className="hidden text-sm font-medium tabular-nums text-secondary md:block">
                          {String(index + 1).padStart(2, "0")}
                        </div>

                        {/* Blog Content */}
                        <div className="min-w-0">
                          <div className="mb-2 flex items-center gap-3">
                            <span className="text-xs font-medium text-secondary">
                              {getCategoryLabel(post)}
                            </span>
                          </div>

                          <Link
                            to={`/blogs/${post.slug}`}
                            className="block"
                          >
                            <h2 className="text-lg font-semibold leading-snug tracking-tight text-primary transition-colors duration-200 group-hover:text-secondary sm:text-xl">
                              {post.title}
                            </h2>

                            {post.excerpt && (
                              <p className="mt-2 line-clamp-2 max-w-2xl text-sm leading-6 text-secondary">
                                {post.excerpt}
                              </p>
                            )}
                          </Link>
                        </div>

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-secondary md:justify-end">
                          <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                            <CalendarDays size={14} />

                            {formatDate(
                              post.publishedAt ||
                                post.createdAt
                            )}
                          </span>

                          {readingTime && (
                            <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                              <Clock3 size={14} />

                              {readingTime}
                            </span>
                          )}
                        </div>

                        {/* Arrow */}
                        <Link
                          to={`/blogs/${post.slug}`}
                          aria-label={`Read ${post.title}`}
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-primary transition-all duration-300 hover:bg-primary hover:text-[var(--background)]"
                        >
                          <ArrowUpRight size={17} />
                        </Link>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            )}

            {/* Total */}
            {data?.data?.data?.total > 0 && (
              <div className="mt-6 flex items-center justify-between text-xs text-secondary">
                <span>
                  {data.data.data.total}{" "}
                  {data.data.data.total === 1
                    ? "article"
                    : "articles"}
                </span>

                <span>
                  Page {data.data.data.page} of{" "}
                  {data.data.data.totalPage}
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Blog;
