import { ArrowLeft, CalendarDays, Clock3 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";

const formatDate = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const getBlogBySlug = async (slug) => {
  const response = await api.get(`/blogs/${slug}`);
  return response.data;
};



const renderMarks = (text, marks = []) => {
  let content = text;

  marks.forEach((mark) => {
    switch (mark.type) {
      case "bold":
        content = (
          <strong className="font-semibold text-zinc-950">{content}</strong>
        );
        break;

      case "italic":
        content = <em className="italic">{content}</em>;
        break;

      case "strike":
        content = <s>{content}</s>;
        break;

      case "code":
        content = (
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.9em] text-zinc-800">
            {content}
          </code>
        );
        break;

      case "link":
        content = (
          <a
            href={mark.attrs?.href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            {content}
          </a>
        );
        break;

      default:
        break;
    }
  });

  return content;
};

const renderNode = (node, index = 0) => {
  if (!node) return null;

  /* Text */
  if (node.type === "text") {
    return <span key={index}>{renderMarks(node.text || "", node.marks)}</span>;
  }

  /* Hard break */
  if (node.type === "hardBreak") {
    return <br key={index} />;
  }

  const children = node.content?.map((child, childIndex) =>
    renderNode(child, childIndex),
  );

  switch (node.type) {
    /* Heading */
    case "heading": {
      const level = node.attrs?.level || 2;

      if (level === 1) {
        return (
          <h1
            key={index}
            className="mt-12 mb-5 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl"
          >
            {children}
          </h1>
        );
      }

      if (level === 2) {
        return (
          <h2
            key={index}
            className="mt-12 mb-4 text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl"
          >
            {children}
          </h2>
        );
      }

      return (
        <h3
          key={index}
          className="mt-10 mb-3 text-xl font-semibold tracking-tight text-zinc-950 sm:text-2xl"
        >
          {children}
        </h3>
      );
    }

    /* Paragraph */
    case "paragraph":
      return (
        <p
          key={index}
          className="mb-6 text-[17px] leading-8 text-zinc-700"
          style={{
            textAlign: node.attrs?.textAlign || "left",
          }}
        >
          {children}
        </p>
      );

    /* Bullet list */
    case "bulletList":
      return (
        <ul
          key={index}
          className="mb-7 ml-6 list-disc space-y-2 text-[17px] leading-8 text-zinc-700"
        >
          {children}
        </ul>
      );

    /* Ordered list */
    case "orderedList":
      return (
        <ol
          key={index}
          className="mb-7 ml-6 list-decimal space-y-2 text-[17px] leading-8 text-zinc-700"
        >
          {children}
        </ol>
      );

    /* List item */
    case "listItem":
      return <li key={index}>{children}</li>;

    /* Blockquote */
    case "blockquote":
      return (
        <blockquote
          key={index}
          className="my-8 border-l-2 border-zinc-300 pl-5 text-lg italic leading-8 text-zinc-600"
        >
          {children}
        </blockquote>
      );

    /* Code block */
    case "codeBlock":
      return (
        <pre
          key={index}
          className="my-8 overflow-x-auto rounded-xl bg-zinc-950 p-5 text-sm leading-7 text-zinc-100"
        >
          <code>{children}</code>
        </pre>
      );

    /* Image */
    case "image":
      return (
        <figure key={index} className="my-10">
          <img
            src={node.attrs?.src}
            alt={node.attrs?.alt || ""}
            className="w-full rounded-2xl object-cover"
          />

          {node.attrs?.title && (
            <figcaption className="mt-3 text-center text-sm text-zinc-400">
              {node.attrs.title}
            </figcaption>
          )}
        </figure>
      );

    default:
      return <div key={index}>{children}</div>;
  }
};

const renderContent = (content) => {
  if (!content) return null;

  /*
    Your API gives:

    content: {
      type: "doc",
      content: [...]
    }
  */

  if (content.type === "doc") {
    return content.content?.map((node, index) => renderNode(node, index));
  }

  return renderNode(content);
};

/* -----------------------------
   Blog Post
----------------------------- */

const BlogPost = () => {
  const { slug } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["blog", slug],
    queryFn: () => getBlogBySlug(slug),
    enabled: Boolean(slug),
    retry: false,
  });

  /*
    Supports both:

    {
      success: true,
      data: {
        blog: {...}
      }
    }

    and:

    {
      success: true,
      data: {...}
    }
  */

  const blog = data?.data?.blog || data?.data?.blogs?.[0] || data?.data;

  if (isLoading) {
    return (
      <main className="min-h-screen">
        <div className="mx-auto max-w-3xl px-5 py-24 sm:px-6">
          <div className="animate-pulse">
            <div className="h-4 w-24 rounded bg-zinc-200" />

            <div className="mt-6 h-12 w-3/4 rounded bg-zinc-200" />

            <div className="mt-4 h-5 w-1/2 rounded bg-zinc-100" />

            <div className="mt-12 h-72 rounded-2xl bg-zinc-100" />
          </div>
        </div>
      </main>
    );
  }

  if (isError || !blog) {
    return (
      <main className="min-h-screen">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-5 py-32 text-center sm:px-6">
          <p className="text-sm text-zinc-400">404</p>

          <h1 className="mt-2 text-2xl font-semibold text-zinc-950">
            Article not found
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            The article you're looking for doesn't exist or may have been
            removed.
          </p>

          <Link
            to="/blogs"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-950"
          >
            <ArrowLeft size={16} />
            Back to articles
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <article>
        {/* Article Header */}
        <header className="mx-auto max-w-3xl px-5 pb-10 pt-20 sm:px-6 sm:pt-24">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-zinc-950"
          >
            <ArrowLeft size={15} />
            Back to articles
          </Link>

          <div className="mt-10">
            <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays size={15} />
                {formatDate(blog.createdAt)}
              </span>

              {blog.readingTime && (
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 size={15} />
                  {blog.readingTime} min read
                </span>
              )}
            </div>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-zinc-950 sm:text-5xl sm:leading-[1.12]">
              {blog.title}
            </h1>

            {blog.excerpt && (
              <p className="mt-5 text-lg leading-8 text-zinc-500">
                {blog.excerpt}
              </p>
            )}
          </div>
        </header>

        {/* Cover Image */}
        {blog.coverImage && (
          <div className="mx-auto max-w-5xl px-5 sm:px-6">
            <div className="overflow-hidden rounded-2xl">
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="max-h-[560px] w-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Article Content */}
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 sm:py-16">
          <div className="article-content">{renderContent(blog.content)}</div>
        </div>
      </article>
    </main>
  );
};

export default BlogPost;
