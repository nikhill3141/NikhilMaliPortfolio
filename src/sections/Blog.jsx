import { motion } from "framer-motion";
import { ArrowUpRight, CalendarDays, Clock3 } from "lucide-react";
import { BLOG_POSTS } from "../DemoData/Data";
import { useState } from "react";
import { Link } from "react-router-dom";



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
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function Blog({ sectionRef }) {
  
  const featuredPost =
    BLOG_POSTS.find((post) => post.featured) || BLOG_POSTS[0];

  const remainingPosts = BLOG_POSTS.filter(
    (post) => post.id !== featuredPost?.id,
  );

  return (
    <section ref={sectionRef} data-section="blogs" className="sleek-section">
      {/* Header */}

      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <SectionHeading subHeading="Writing & Ideas" heading="Blogs" />
      </div>

      {/* Featured Blog */}

      {featuredPost && (
        <motion.article
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true, amount: 0.3 }}
          className="group mt-10 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
        >
          <div className="grid md:grid-cols-[100px_1fr_auto] md:items-center">
            {/* Number */}

            <div className="hidden h-full border-r border-[var(--border)] p-6 md:flex md:items-center md:justify-center">
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

                <span className="h-1 w-1 rounded-full bg-[var(--muted)]" />

                <span className="flex items-center gap-1.5">
                  <Clock3 size={13} />

                  {featuredPost.readTime}
                </span>
              </div>

              <h3 className="mt-4 max-w-3xl text-2xl font-bold leading-tight tracking-tight md:text-3xl">
                {featuredPost.title}
              </h3>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-secondary">
                {featuredPost.excerpt}
              </p>

              <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                {featuredPost.tags.map((tag) => (
                  <span key={tag} className="text-xs text-secondary">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Read */}

            <div className="border-t border-[var(--border)] p-5 md:border-l md:border-t-0 md:p-8">
              <Link
                to={`/blogs/${featuredPost.slug}`}
                className="flex w-full items-center justify-between gap-3 text-sm font-semibold md:w-auto"
              >
                <span className="md:hidden">Read article</span>

                <span className="hidden md:block">Read</span>

                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] transition-all duration-300 group-hover:bg-[var(--foreground)] group-hover:text-[var(--background)]">
                  <ArrowUpRight size={17} />
                </span>
              </Link>
            </div>
          </div>
        </motion.article>
      )}

      {/* Blog List */}

      <div className="mt-4 border-t border-[var(--border)]">
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
            className="group border-b border-[var(--border)] py-6 transition-colors  md:py-7"
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

                <p className="mt-2 max-w-3xl line-clamp-2 text-sm leading-6 text-secondary">
                  {post.excerpt}
                </p>

                {/* Tags */}

                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs text-secondary">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Date + Read Time */}

              <div className="flex items-center gap-4 text-xs text-secondary md:flex-col md:items-end md:gap-1.5">
                <span className="flex items-center gap-1.5 whitespace-nowrap">
                  <CalendarDays size={13} />

                  {formatDate(post.publishedAt)}
                </span>

                <span className="h-1 w-1 rounded-full bg-[var(--muted)] md:hidden" />

                <span className="flex items-center gap-1.5 whitespace-nowrap">
                  <Clock3 size={13} />

                  {post.readTime}
                </span>
              </div>

              {/* Arrow */}

              <div
                className="hidden md:flex md:justify-end"
                
              >
                <Link
                  to={`/blogs/${post.slug}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-secondary transition-all duration-300 group-hover:border-[var(--foreground)] group-hover:bg-[var(--foreground)] group-hover:text-[var(--background)]"
                >
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>

            {/* Mobile Arrow */}

            <div className="mt-5 flex items-center justify-between md:hidden">
              <span className="text-xs font-medium text-secondary">
                Read article
              </span>

              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-secondary">
                <ArrowUpRight size={16} />
              </span>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Footer */}

      <div className="mt-6 flex items-center justify-between text-xs text-secondary">
        <span>{BLOG_POSTS.length} articles</span>

        <span>More coming soon</span>
      </div>
    </section>
  );
}
