import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays } from "lucide-react";

import { useCategories } from "../admin/hooks/useGetCategories";
import { usePublicPosts } from "../admin/hooks/usePublicPost";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [showAll, setShowAll] = useState(false);

  const {
    data: postsResponse,
    isLoading: postsLoading,
    isError: postsError,
  } = usePublicPosts({
    page: 1,
    limit: 50,
  });

  const {
    data: categoriesResponse,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useCategories();

  const posts = postsResponse?.data?.blogs || [];
  const categories = categoriesResponse?.categories || [];

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getReadingTime = (minutes) => {
    return `${minutes || 10} min read`;
  };

  /*
   * Category lookup
   */
  const categoryMap = useMemo(() => {
    return categories.reduce((map, category) => {
      map[category.id] = category;
      return map;
    }, {});
  }, [categories]);

  /*
   * Count posts for every category
   */
  const categoryCount = useMemo(() => {
    return posts.reduce((count, post) => {
      if (!post.categoryId) return count;

      count[post.categoryId] = (count[post.categoryId] || 0) + 1;

      return count;
    }, {});
  }, [posts]);

  /*
   * Filter posts
   */
  const filteredPosts = useMemo(() => {
    if (activeCategory === "all") {
      return posts;
    }

    return posts.filter((post) => post.categoryId === activeCategory);
  }, [posts, activeCategory]);

  /*
   * Show only 8 initially
   */
  const visiblePosts = showAll ? filteredPosts : filteredPosts.slice(0, 8);

  const isLoading = postsLoading || categoriesLoading;

  /*
   * Loading
   */
  if (isLoading) {
    return (
      <section className="sleek-section">
        <div className="animate-pulse">
          <div className="flex flex-wrap gap-3">
            <div className="h-10 w-24 rounded-full bg-[var(--surface)]" />
            <div className="h-10 w-28 rounded-full bg-[var(--surface)]" />
            <div className="h-10 w-28 rounded-full bg-[var(--surface)]" />
          </div>

          <div className="mt-14 space-y-12">
            {[1, 2, 3, 4].map((item) => (
              <div key={item}>
                <div className="h-7 w-2/3 rounded bg-[var(--surface)]" />

                <div className="mt-3 h-4 w-1/2 rounded bg-[var(--surface)]" />

                <div className="mt-3 h-6 w-24 rounded bg-[var(--surface)]" />

                <div className="mt-3 h-4 w-32 rounded bg-[var(--surface)]" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /*
   * Error
   */
  if (postsError || categoriesError) {
    return (
      <section className="sleek-section">
        <div>
          <p className="text-sm text-red-500">
            Unable to load articles right now.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="sleek-section">
      {/* ================= CATEGORIES ================= */}

      <div className="flex flex-wrap items-center gap-3">
        {/* All */}
        <button
          type="button"
          onClick={() => {
            setActiveCategory("all");
            setShowAll(false);
          }}
          className={`
            flex h-10 items-center gap-3 rounded-full
            px-4 text-sm font-medium
            transition-colors
            ${
              activeCategory === "all"
                ? "bg-[var(--foreground)] text-[var(--background)]"
                : "sleek-chip text-secondary hover:text-[var(--foreground)]"
            }
          `}
        >
          <span>All</span>

          <span
            className={`
              flex min-w-[27px] items-center justify-center
              rounded-full px-2 py-[2px]
              text-[11px] font-semibold
              ${
                activeCategory === "all"
                  ? "bg-[var(--background)]/20"
                  : "bg-[var(--background)]/20"
              }
            `}
          >
            {posts.length}
          </span>
        </button>

        {/* Backend categories */}
        {categories.map((category) => {
          const isActive = activeCategory === category.id;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => {
                setActiveCategory(category.id);
                setShowAll(false);
              }}
              className={`
                flex h-10 items-center gap-3 rounded-full
                px-4 text-sm font-medium
                transition-colors
                ${
                  isActive
                    ? "bg-[var(--foreground)] text-[var(--background)]"
                    : "sleek-chip text-secondary hover:text-[var(--foreground)]"
                }
              `}
            >
              <span>{category.name}</span>

              <span
                className="
                  flex min-w-[27px]
                  items-center justify-center
                  rounded-full
                  bg-[var(--background)]/20
                  px-2 py-[2px]
                  text-[11px]
                  font-semibold
                "
              >
                {categoryCount[category.id] || 0}
              </span>
            </button>
          );
        })}
      </div>

      {/* ================= SHOW ALL ================= */}

      {!showAll && filteredPosts.length > 8 && (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="
            mt-3 inline-flex h-10
            items-center rounded-full
            sleek-chip
            px-4
            text-sm
            text-secondary
            transition-colors
            hover:text-[var(--foreground)]
          "
        >
          <span className="mr-1">↻</span>
          Show all
        </button>
      )}

      {/* ================= EMPTY STATE ================= */}

      {visiblePosts.length === 0 && (
        <div className="py-24">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            No articles found
          </h2>

          <p className="mt-2 text-sm text-secondary">
            There are currently no articles in this category.
          </p>
        </div>
      )}

      {/* ================= BLOG LIST ================= */}

      {visiblePosts.length > 0 && (
        <div className="mt-14 space-y-12 sm:space-y-14">
          {visiblePosts.map((post) => {
            const category = categoryMap[post.categoryId];

            return (
              <article
                key={post.id}
                className="
                  group
                  grid
                  items-center
                  gap-7
                  md:grid-cols-[minmax(0,1fr)_140px]
                "
              >
                {/* ================= CONTENT ================= */}

                <div className="min-w-0">
                  {/* Title */}
                  <Link
                    to={`/blogs/${post.slug}`}
                    className="group/title inline-block"
                  >
                    <h2
                      className="
                        text-xl
                        font-semibold
                        leading-[1.35]
                        tracking-tight
                        text-[var(--foreground)]
                        transition-colors
                        duration-200
                        group-hover/title:text-secondary
                        sm:text-2xl
                      "
                    >
                      {post.title}
                    </h2>
                  </Link>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p
                      className="
                        mt-1
                        max-w-3xl
                        text-[15px]
                        leading-6
                        text-secondary
                        sm:text-base
                      "
                    >
                      {post.excerpt}
                    </p>
                  )}

                  {/* Category */}
                  {category && (
                    <div className="mt-2">
                      <span
                        className="
                          sleek-chip
                          inline-flex
                          rounded-md
                          px-2.5
                          py-1
                          text-[11px]
                          font-medium
                        "
                      >
                        {category.name}
                      </span>
                    </div>
                  )}

                  {/* Date + Reading time */}
                  <div
                    className="
                      mt-2.5
                      flex
                      flex-wrap
                      items-center
                      gap-x-4
                      gap-y-2
                      text-xs
                      text-secondary
                    "
                  >
                    <span className="flex items-center gap-2">
                      <CalendarDays size={14} strokeWidth={1.7} />

                      {formatDate(post.publishedAt || post.createdAt)}
                    </span>

                    <span>{getReadingTime(post.readingTime)}</span>
                  </div>
                </div>

                {/* ================= READ MORE ================= */}

                <div className="md:flex md:justify-end">
                  <Link
                    to={`/blogs/${post.slug}`}
                    className="
                      inline-flex
                      items-center
                      gap-3
                      whitespace-nowrap
                      text-sm
                      font-normal
                      text-secondary
                      transition-colors
                      duration-200
                      hover:text-[var(--foreground)]
                      sm:text-base
                    "
                  >
                    <span>Read more</span>

                    <ArrowRight
                      size={19}
                      strokeWidth={1.5}
                      className="
                        transition-transform
                        duration-200
                        group-hover:translate-x-1
                      "
                    />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Blog;
