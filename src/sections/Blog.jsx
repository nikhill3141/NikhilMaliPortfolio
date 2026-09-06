import { ArrowUpRight, CalendarDays, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";
import {usePublicPosts} from "../admin/hooks/usePublicPost.js"


const formatDate = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getTextFromNode = (node) => {
  if (!node) return "";

  if (node.type === "text") {
    return node.text || "";
  }

  if (Array.isArray(node.content)) {
    return node.content.map(getTextFromNode).join("");
  }

  return "";
};

const getExcerpt = (post) => {
  if (post.excerpt?.trim()) {
    return post.excerpt;
  }

  const text = getTextFromNode(post.content).replace(/\s+/g, " ").trim();

  return text.length > 150 ? `${text.slice(0, 150)}...` : text;
};

const Blog = () => {
  const { data, isLoading, isError } = usePublicPosts({
    page: 1,
    limit: 10,
  });

  const posts = data?.data?.blogs || [];

  const featuredPost = posts.find((post) => post.featured === true);

  const regularPosts = posts.filter((post) => post.id !== featuredPost?.id);

  if (isLoading) {
    return (
      <section className="sleek-section">
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-4 w-20 rounded bg-zinc-200 dark:bg-zinc-800" />

            <div className="mt-4 h-10 w-72 rounded bg-zinc-200 dark:bg-zinc-800" />

            <div className="mt-12 h-48 rounded-2xl bg-zinc-100 dark:bg-zinc-900" />
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="sleek-section">
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-6 lg:px-8">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Unable to load articles.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="sleek-section">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        {/* Featured */}
        {featuredPost && (
          <article className="mt-10 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
            <div className="grid md:grid-cols-[100px_1fr_auto]">
              {/* Number */}
              <div className="hidden border-r border-[var(--border)] p-6 md:flex md:justify-center">
                <span className="text-sm text-zinc-400">01</span>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 text-xs text-zinc-400">
                  <span className="rounded-full bg-zinc-100 px-3 py-1 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                    Featured
                  </span>

                  <span>{formatDate(featuredPost.createdAt)}</span>
                </div>

                <h2 className="mt-4 max-w-2xl text-2xl font-bold tracking-tight text-zinc-950 dark:text-white sm:text-3xl">
                  {featuredPost.title}
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500 dark:text-zinc-400">
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

              {/* Image */}
              <div className="flex w-full flex-col justify-between gap-5 p-5 md:w-[230px]">
                {featuredPost.coverImage ? (
                  <div className="h-32 overflow-hidden rounded-xl">
                    <img
                      src={featuredPost.coverImage}
                      alt={featuredPost.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-32 rounded-xl bg-zinc-100 dark:bg-zinc-900" />
                )}

                <Link
                  to={`/blogs/${featuredPost.slug}`}
                  className="flex items-center justify-between text-sm font-semibold text-zinc-950 dark:text-white"
                >
                  Read article
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border)]">
                    <ArrowUpRight size={17} />
                  </span>
                </Link>
              </div>
            </div>
          </article>
        )}

        {/* Articles */}
        <div className="">
          {regularPosts.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                No articles published yet.
              </p>
            </div>
          ) : (
            regularPosts.map((post, index) => (
              <article
                key={post.id}
                className="group border-b border-[var(--border)] last:border-b-0"
              >
                <Link
                  to={`/blogs/${post.slug}`}
                  className="grid items-center gap-5 p-5 sm:p-6 md:grid-cols-[60px_minmax(0,1fr)_170px_40px]"
                >
                  {/* Number */}
                  <span className="hidden text-sm text-zinc-400 md:block">
                    {featuredPost
                      ? String(index + 2).padStart(2, "0")
                      : String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Text */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-3 text-xs text-zinc-400">
                      {post.readingTime && (
                        <>
                          <span className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />

                          <span>{post.readingTime} min read</span>
                        </>
                      )}
                    </div>

                    <h2 className="mt-2 text-base font-semibold text-zinc-950 dark:text-white sm:text-lg">
                      {post.title}
                    </h2>

                    <p className="mt-1 line-clamp-1 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                      {getExcerpt(post)}
                    </p>
                    <div className="flex items-center  text-xs text-zinc-400">
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                  </div>
                  {/* Image */}
                  <div className="hidden h-20 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900 md:block">
                    
                    {post.coverImage && (
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>

                  {/* Arrow */}
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-zinc-600 dark:text-zinc-300">
                    <ArrowUpRight size={16} />
                  </span>
                </Link>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Blog;
