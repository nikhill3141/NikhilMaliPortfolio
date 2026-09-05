import { motion } from "framer-motion";
import { ArrowUpRight, CalendarDays, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";
import { usePublicPosts } from "../admin/hooks/usePublicPost";



function SectionHeading({ subHeading, heading }) {
  return (
    <div>
      <p className="text-sm font-medium text-secondary">{subHeading}</p>

      <h2 className="mt-1 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
        {heading}
      </h2>
    </div>
  );
}

function formatDate(date) {
  if (!date) return "";

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

const Blog = () => {
  const { data, isLoading, isError } = usePublicPosts({
    page: 1,
    limit: 10,
  });

  /*
   * API response:
   *
   * {
   *   success: true,
   *   data: {
   *     blogs: [],
   *     data: {
   *       page: 1,
   *       limit: 10,
   *       total: 4,
   *       totalPage: 1
   *     }
   *   }
   * }
   */
  console.log("API URL:", import.meta.env.VITE_API_URL);
  const blogs = data?.data?.blogs ?? [];

  /*
   * Use the blog marked as featured.
   * If there is no featured blog, use the first blog.
   */
  const featuredPost = blogs.find((post) => post.featured === true) ?? blogs[0];

  /*
   * Don't show the featured post again
   * inside the normal blog list.
   */
  const regularPosts = featuredPost
    ? blogs.filter((post) => post.id !== featuredPost.id)
    : [];

  return (
    <section className="sleek-section">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          subHeading="From the blog"
          heading="Latest thoughts & ideas"
        />

        {/* Loading */}
        {isLoading && (
          <div className="mt-10 space-y-4">
            <div className="h-52 animate-pulse rounded-2xl bg-[var(--surface)]" />
            <div className="h-20 animate-pulse rounded-xl bg-[var(--surface)]" />
            <div className="h-20 animate-pulse rounded-xl bg-[var(--surface)]" />
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <p className="text-sm text-secondary">
              Unable to load blogs right now.
            </p>
          </div>
        )}

        {/* No blogs */}
        {!isLoading && !isError && blogs.length === 0 && (
          <div className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <p className="text-sm text-secondary">
              No published blogs available.
            </p>
          </div>
        )}

        {/* Content */}
        {!isLoading && !isError && featuredPost && (
          <>
            {/* =========================
                FEATURED POST
            ========================== */}
            <motion.article
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group mt-10 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
            >
              <div className="grid md:grid-cols-[100px_1fr_auto]">
                {/* Date */}
                <div className="hidden border-r border-[var(--border)] p-6 md:block">
                  <CalendarDays size={18} className="text-secondary" />

                  <p className="mt-3 text-xs font-medium text-secondary">
                    {formatDate(
                      featuredPost.publishedAt || featuredPost.createdAt,
                    )}
                  </p>
                </div>

                {/* Content */}
                <div className="min-w-0 p-6 sm:p-8">
                  {/* Mobile date */}
                  <div className="mb-4 flex items-center gap-2 text-xs text-secondary md:hidden">
                    <CalendarDays size={14} />

                    <span>
                      {formatDate(
                        featuredPost.publishedAt || featuredPost.createdAt,
                      )}
                    </span>
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-[var(--border)] px-3 py-1 text-xs font-medium text-secondary">
                      Featured
                    </span>

                    {getReadingTime(featuredPost.readingTime) && (
                      <span className="flex items-center gap-1.5 text-xs text-secondary">
                        <Clock3 size={14} />

                        {getReadingTime(featuredPost.readingTime)}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <Link to={`/blogs/${featuredPost.slug}`} className="block">
                    <h3 className="mt-4 max-w-3xl text-2xl font-bold tracking-tight text-primary transition-colors group-hover:text-secondary sm:text-3xl">
                      {featuredPost.title}
                    </h3>
                  </Link>

                  {/* Excerpt */}
                  {featuredPost.excerpt && (
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-secondary sm:text-base">
                      {featuredPost.excerpt}
                    </p>
                  )}
                </div>

                {/* Read */}
                <div className="flex items-center border-t border-[var(--border)] p-6 md:border-l md:border-t-0">
                  <Link
                    to={`/blogs/${featuredPost.slug}`}
                    className="flex w-full items-center justify-between gap-3 text-sm font-semibold text-primary transition-colors hover:text-secondary md:w-auto"
                  >
                    <span>Read</span>

                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border)] transition-all duration-300 group-hover:bg-primary group-hover:text-[var(--background)]">
                      <ArrowUpRight size={17} />
                    </span>
                  </Link>
                </div>
              </div>

              {/* Cover Image */}
              {featuredPost.coverImage && (
                <Link
                  to={`/blogs/${featuredPost.slug}`}
                  className="block border-t border-[var(--border)]"
                >
                  <img
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-[1.01] sm:h-80"
                  />
                </Link>
              )}
            </motion.article>

            {/* =========================
                BLOG LIST
            ========================== */}
            {regularPosts.length > 0 && (
              <div className="mt-6 divide-y divide-[var(--border)] border-y border-[var(--border)]">
                {regularPosts.map((post, index) => {
                  const readingTime = getReadingTime(post.readingTime);

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
                      className="group py-6"
                    >
                      <div className="grid gap-4 md:grid-cols-[60px_minmax(0,1fr)_170px_48px] md:items-center">
                        {/* Number */}
                        <div className="hidden text-sm font-medium text-secondary md:block">
                          {String(index + 1).padStart(2, "0")}
                        </div>

                        {/* Blog Content */}
                        <div className="min-w-0">
                          <Link to={`/blogs/${post.slug}`} className="block">
                            <h3 className="truncate text-lg font-semibold tracking-tight text-primary transition-colors group-hover:text-secondary">
                              {post.title}
                            </h3>

                            {post.excerpt && (
                              <p className="mt-1 line-clamp-1 text-sm text-secondary">
                                {post.excerpt}
                              </p>
                            )}
                          </Link>
                        </div>

                        {/* Metadata */}
                        <div className="flex items-center gap-4 text-xs text-secondary md:justify-end">
                          <span className="flex items-center gap-1.5 whitespace-nowrap">
                            <CalendarDays size={14} />

                            {formatDate(post.publishedAt || post.createdAt)}
                          </span>

                          {readingTime && (
                            <span className="flex items-center gap-1.5 whitespace-nowrap">
                              <Clock3 size={14} />

                              {readingTime}
                            </span>
                          )}
                        </div>

                        {/* Read Arrow */}
                        <Link
                          to={`/blogs/${post.slug}`}
                          aria-label={`Read ${post.title}`}
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-primary transition-all duration-300 hover:bg-primary hover:text-[var(--background)]"
                        >
                          <ArrowUpRight size={16} />
                        </Link>
                      </div>

                      {/* Mobile Read */}
                      <div className="mt-4 md:hidden">
                        <Link
                          to={`/blogs/${post.slug}`}
                          className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-secondary"
                        >
                          Read article
                          <ArrowUpRight size={16} />
                        </Link>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Blog;
