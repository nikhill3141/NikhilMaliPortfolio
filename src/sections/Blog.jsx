import { motion } from "framer-motion";
import { ArrowUpRight, CalendarDays, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";
import { usePublicPosts } from "../admin/hooks/usePublicPost";

function SectionHeading({ subHeading, heading }) {
  return (
    <div>
      <p className="text-sm font-medium text-secondary">{subHeading}</p>

      <h2 className="mt-1 text-3xl font-bold tracking-tight md:text-4xl">
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

export default function Blog({ sectionRef }) {
  const { data, isLoading, isError } = usePublicPosts({
    page: 1,
    limit: 10,
  });
  console.log("Blog data:", data);

  const posts = data?.data?.blogs ?? [];

  const featuredPost = posts.find((post) => post.featured) || posts[0];

  const remainingPosts = posts.filter((post) => post.id !== featuredPost?.id);

  return (
    <section ref={sectionRef} data-section="blogs" className="sleek-section">
      {/* Header */}

      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <SectionHeading subHeading="Writing & Ideas" heading="Blogs" />
      </div>

      {/* Loading */}

      {isLoading && (
        <div className="mt-10 border-t border-(--border)">
          <div className="border-b border-(--border) py-8">
            <div className="h-5 w-32 animate-pulse rounded bg-(--muted)/20" />

            <div className="mt-4 h-7 max-w-xl animate-pulse rounded bg-(--muted)/20" />

            <div className="mt-3 h-4 max-w-2xl animate-pulse rounded bg-(--muted)/20" />
          </div>

          <div className="border-b border-(--border) py-8">
            <div className="h-5 max-w-lg animate-pulse rounded bg-(--muted)/20" />

            <div className="mt-3 h-4 max-w-2xl animate-pulse rounded bg-(--muted)/20" />
          </div>
        </div>
      )}

      {/* Error */}

      {isError && (
        <div className="mt-10 border-t border-(--border) py-8">
          <p className="text-sm text-secondary">
            Unable to load blogs right now.
          </p>
        </div>
      )}

      {/* Featured Blog */}

      {!isLoading && !isError && featuredPost && (
        <motion.article
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true, amount: 0.3 }}
          className="group mt-10 overflow-hidden rounded-2xl border border-(--border) bg-(--surface)"
        >
          <div className="grid md:grid-cols-[100px_1fr_auto] md:items-center">
            {/* Number */}

            <div className="hidden h-full border-r border-(--border) p-6 md:flex md:items-center md:justify-center">
              <span className="text-5xl font-bold tracking-tighter text-secondary/30">
                01
              </span>
            </div>

            {/* Content */}

            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-3 text-xs text-secondary">
                <span className="font-semibold uppercase tracking-[0.14em]">
                  Featured
                </span>

                <span className="h-1 w-1 rounded-full bg-[var(--muted)]" />

                <span className="flex items-center gap-1.5">
                  <CalendarDays size={13} />
                  {formatDate(featuredPost.publishedAt)}
                </span>

                {featuredPost.readingTime && (
                  <>
                    <span className="h-1 w-1 rounded-full bg-[var(--muted)]" />

                    <span className="flex items-center gap-1.5">
                      <Clock3 size={13} />
                      {featuredPost.readingTime} min read
                    </span>
                  </>
                )}
              </div>

              <h3 className="mt-4 max-w-3xl text-2xl font-bold leading-tight tracking-tight md:text-3xl">
                {featuredPost.title}
              </h3>

              {featuredPost.excerpt && (
                <p className="mt-3 max-w-2xl text-sm leading-6 text-secondary">
                  {featuredPost.excerpt}
                </p>
              )}

              {featuredPost.tags?.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                  {featuredPost.tags.map((item) => {
                    const tag = item.tag?.name || item.name || item;

                    return (
                      <span
                        key={typeof tag === "string" ? tag : item.id}
                        className="text-xs text-secondary"
                      >
                        #{tag}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Read */}

            <div className="border-t border-(--border) p-5 md:border-l md:border-t-0 md:p-8">
              <Link
                to={`/blogs/${featuredPost.slug}`}
                className="inline-flex w-full items-center justify-between gap-3 text-sm font-semibold md:w-auto"
              >
                <span>Read</span>

                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-(--border) transition-all duration-300 group-hover:bg-(--foreground) group-hover:text-(--background)">
                  <ArrowUpRight size={16} />
                </span>
              </Link>
            </div>
          </div>
        </motion.article>
      )}

      {/* Blog List */}

      {!isLoading && !isError && remainingPosts.length > 0 && (
        <div className="mt-4 border-t border-(--border)">
          {remainingPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{
                opacity: 0,
                y: 12,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.35,
                delay: index * 0.04,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              className="group border-b border-(--border) py-6 transition-colors md:py-7"
            >
              <div className="grid gap-5 md:grid-cols-[60px_minmax(0,1fr)_170px_48px] md:items-center md:gap-6">
                {/* Number */}

                <div className="hidden md:block">
                  <span className="text-sm font-medium tabular-nums text-secondary">
                    {String(index + 2).padStart(2, "0")}
                  </span>
                </div>

                {/* Blog Content */}

                <div className="min-w-0">
                  <h3 className="text-lg font-bold leading-snug tracking-tight md:text-xl">
                    {post.title}
                  </h3>

                  {post.excerpt && (
                    <p className="mt-2 max-w-3xl line-clamp-2 text-sm leading-6 text-secondary">
                      {post.excerpt}
                    </p>
                  )}

                  {post.tags?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                      {post.tags.slice(0, 3).map((item) => {
                        const tag = item.tag?.name || item.name || item;

                        return (
                          <span
                            key={typeof tag === "string" ? tag : item.id}
                            className="text-xs text-secondary"
                          >
                            #{tag}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Date + Read Time */}

                <div className="flex items-center gap-4 text-xs text-secondary md:flex-col md:items-end md:gap-1.5">
                  <span className="flex items-center gap-1.5 whitespace-nowrap">
                    <CalendarDays size={13} />

                    {formatDate(post.publishedAt)}
                  </span>

                  {post.readingTime && (
                    <>
                      <span className="h-1 w-1 rounded-full bg-(--muted) md:hidden" />

                      <span className="flex items-center gap-1.5 whitespace-nowrap">
                        <Clock3 size={13} />
                        {post.readingTime} min
                      </span>
                    </>
                  )}
                </div>

                {/* Arrow */}

                <div className="hidden md:flex md:justify-end">
                  <Link
                    to={`/blogs/${post.slug}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-(--border) text-secondary transition-all duration-300 group-hover:border-(--foreground) group-hover:bg-(--foreground) group-hover:text-(--background)"
                  >
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>

              {/* Mobile Arrow */}

              <div className="mt-5 flex items-center md:hidden">
                <Link
                  to={`/blogs/${post.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-medium text-secondary"
                >
                  <span>Read article</span>

                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      )}

      {/* No Posts */}

      {!isLoading && !isError && posts.length === 0 && (
        <div className="mt-10 border-t border-(--border) py-8">
          <p className="text-sm text-secondary">No articles published yet.</p>
        </div>
      )}

      {/* Footer */}

      {!isLoading && posts.length > 0 && (
        <div className="mt-6 flex items-center justify-between text-xs text-secondary">
          <span>
            {posts.length} {posts.length === 1 ? "article" : "articles"}
          </span>

          <span>More coming soon</span>
        </div>
      )}
    </section>
  );
}
