import { motion } from "framer-motion";
import { ArrowUpRight, CalendarDays, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";
import { usePublicPosts } from "../admin/hooks/usePublicPost";


function SectionHeading({ subHeading, heading }) {
  return (
    <div>
      <p className="text-sm font-medium text-secondary">
        {subHeading}
      </p>

      <h2 className="mt-1 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
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
  if (!readingTime) return "5 min read";

  return `${readingTime} min read`;
}

const Blog = () => {
  const {
    data,
    isLoading,
    isError,
  } = usePublicPosts({
    page: 1,
    limit: 10,
  });

  /*
    API response:

    {
      success: true,
      data: {
        blogs: [],
        data: {
          page,
          limit,
          total,
          totalPage
        }
      }
    }
  */

  const blogs = data?.data?.blogs ?? [];

  /*
    Featured blog:
    Use the first blog marked featured.
    If none is featured, use the first blog.
  */
  const featuredPost =
    blogs.find((blog) => blog.featured === true) ?? blogs[0];

  /*
    All remaining blogs.
    Avoid showing the featured blog twice.
  */
  const remainingPosts = featuredPost
    ? blogs.filter((blog) => blog.id !== featuredPost.id)
    : [];

  if (isLoading) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          subHeading="From the blog"
          heading="Latest thoughts & ideas"
        />

        <div className="mt-10 animate-pulse">
          <div className="h-48 rounded-2xl bg-zinc-100" />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          subHeading="From the blog"
          heading="Latest thoughts & ideas"
        />

        <div className="mt-10 rounded-xl border border-zinc-200 bg-zinc-50 p-6 text-sm text-zinc-600">
          Unable to load blogs right now.
        </div>
      </section>
    );
  }

  if (!blogs.length) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          subHeading="From the blog"
          heading="Latest thoughts & ideas"
        />

        <div className="mt-10 rounded-xl border border-zinc-200 bg-zinc-50 p-6 text-sm text-zinc-600">
          No published blogs available.
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      {/* Heading */}
      <SectionHeading
        subHeading="From the blog"
        heading="Latest thoughts & ideas"
      />

      {/* Featured Post */}
      {featuredPost && (
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 overflow-hidden rounded-2xl border border-zinc-200 bg-white"
        >
          <div className="grid md:grid-cols-[100px_1fr_auto]">
            {/* Date */}
            <div className="hidden border-r border-zinc-200 p-6 md:block">
              <CalendarDays
                size={20}
                className="text-zinc-500"
              />

              <p className="mt-3 text-sm font-medium text-zinc-950">
                {formatDate(
                  featuredPost.publishedAt ||
                    featuredPost.createdAt
                )}
              </p>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 text-xs text-zinc-500">
                <span className="rounded-full bg-zinc-100 px-3 py-1 font-medium">
                  Featured
                </span>

                <span className="flex items-center gap-1">
                  <Clock3 size={14} />
                  {getReadingTime(featuredPost.readingTime)}
                </span>
              </div>

              <h3 className="mt-4 text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl">
                {featuredPost.title}
              </h3>

              {featuredPost.excerpt && (
                <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600 sm:text-base">
                  {featuredPost.excerpt}
                </p>
              )}

              {/* Mobile date */}
              <div className="mt-5 flex items-center gap-2 text-xs text-zinc-500 md:hidden">
                <CalendarDays size={14} />
                {formatDate(
                  featuredPost.publishedAt ||
                    featuredPost.createdAt
                )}
              </div>
            </div>

            {/* Read Button */}
            <div className="flex items-center border-t border-zinc-200 p-6 md:border-l md:border-t-0">
              <Link
                to={`/blogs/${featuredPost.slug}`}
                className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium text-zinc-950 transition hover:text-zinc-500"
              >
                Read article
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>

          {/* Cover Image */}
          {featuredPost.coverImage && (
            <div className="border-t border-zinc-200">
              <img
                src={featuredPost.coverImage}
                alt={featuredPost.title}
                className="h-64 w-full object-cover sm:h-80"
              />
            </div>
          )}
        </motion.article>
      )}

      {/* Remaining Posts */}
      {remainingPosts.length > 0 && (
        <div className="mt-6 divide-y divide-zinc-200 border-y border-zinc-200">
          {remainingPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
              }}
              className="group py-6"
            >
              <div className="grid gap-4 md:grid-cols-[60px_minmax(0,1fr)_170px_auto] md:items-center">
                {/* Number */}
                <div className="hidden text-sm font-medium text-zinc-400 md:block">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Blog Info */}
                <div className="min-w-0">
                  <Link
                    to={`/blogs/${post.slug}`}
                    className="block"
                  >
                    <h3 className="text-lg font-semibold tracking-tight text-zinc-950 transition group-hover:text-zinc-500">
                      {post.title}
                    </h3>

                    {post.excerpt && (
                      <p className="mt-1 line-clamp-2 text-sm leading-6 text-zinc-500">
                        {post.excerpt}
                      </p>
                    )}
                  </Link>
                </div>

                {/* Date + Reading Time */}
                <div className="flex items-center gap-4 text-xs text-zinc-500 md:justify-end">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays size={14} />

                    {formatDate(
                      post.publishedAt || post.createdAt
                    )}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Clock3 size={14} />

                    {getReadingTime(post.readingTime)}
                  </span>
                </div>

                {/* Read */}
                <Link
                  to={`/blogs/${post.slug}`}
                  className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-medium text-zinc-950 transition hover:text-zinc-500"
                >
                  Read
                  <ArrowUpRight size={16} />
                </Link>
              </div>

              {/* Mobile Read */}
              <div className="mt-4 md:hidden">
                <Link
                  to={`/blogs/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-950"
                >
                  Read article
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </section>
  );
};

export default Blog;
