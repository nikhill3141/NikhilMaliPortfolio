import { motion } from "framer-motion";
import { ArrowLeft, CalendarDays, Clock3 } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { BLOG_POSTS } from "../DemoData/Data";

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogPost() {
  const { slug } = useParams();

  const post = BLOG_POSTS.find((item) => item.slug === slug);

  if (!post) {
    return (
      <main className="min-h-screen px-5 py-20">
        <div className="mx-auto max-w-3xl">
          <Link
            to="/#blogs"
            className="inline-flex items-center gap-2 text-sm text-secondary transition-colors hover:text-[var(--foreground)]"
          >
            <ArrowLeft size={16} />
            Back to blogs
          </Link>

          <h1 className="mt-10 text-3xl font-bold">Article not found</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Reading container */}

      <div className="mx-auto w-full max-w-4xl px-5 pb-24 pt-8 md:px-8 md:pt-12">
        {/* Back */}

        <Link
          to="/blogs"
          className="group inline-flex items-center gap-2 text-sm font-medium text-secondary transition-colors hover:text-[var(--foreground)]"
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-1"
          />
          Back to blogs
        </Link>

        {/* Header */}

        <motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mx-auto mt-14 max-w-3xl"
        >
          {/* Meta */}

          <div className="flex flex-wrap items-center gap-3 text-xs text-secondary">
            <span className="font-semibold uppercase tracking-[0.14em]">
              {post.category}
            </span>

            <span className="h-1 w-1 rounded-full bg-[var(--muted)]" />

            <span className="flex items-center gap-1.5">
              <CalendarDays size={13} />

              {formatDate(post.publishedAt)}
            </span>

            <span className="h-1 w-1 rounded-full bg-[var(--muted)]" />

            <span className="flex items-center gap-1.5">
              <Clock3 size={13} />

              {post.readTime}
            </span>
          </div>

          {/* Title */}

          <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl lg:text-6xl">
            {post.title}
          </h1>

          {/* Excerpt */}

          <p className="mt-6 text-lg leading-8 text-secondary md:text-xl">
            {post.excerpt}
          </p>
        </motion.header>

        {/* Cover */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.5,
            delay: 0.1,
          }}
          className="mt-12 overflow-hidden rounded-2xl border border-[var(--border)]"
        >
          <img
            src={post.cover}
            alt={post.title}
            className="aspect-[16/8] w-full object-cover"
          />
        </motion.div>

        {/* Article */}

        <article className="mx-auto mt-14 max-w-[740px]">
          {post.content.map((block, index) => {
            if (block.type === "heading") {
              return (
                <h2
                  key={index}
                  className="mb-5 mt-12 text-2xl font-bold tracking-tight md:text-3xl"
                >
                  {block.text}
                </h2>
              );
            }

            if (block.type === "code") {
              return (
                <pre
                  key={index}
                  className="my-8 overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 text-sm leading-7"
                >
                  <code>{block.code}</code>
                </pre>
              );
            }

            return (
              <p
                key={index}
                className="mb-6 text-[17px] leading-8 text-secondary md:text-[18px] md:leading-9"
              >
                {block.text}
              </p>
            );
          })}
        </article>

        {/* Tags */}

        <div className="mx-auto mt-14 max-w-[740px] border-t border-[var(--border)] pt-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-secondary">
            Tags
          </p>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-secondary"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom navigation */}

        <div className="mx-auto mt-16 max-w-[740px] border-t border-[var(--border)] pt-8">
          <Link
            to="/#blogs"
            className="group inline-flex items-center gap-2 text-sm font-semibold"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to all articles
          </Link>
        </div>
      </div>
    </main>
  );
}
