import { ArrowLeft, CalendarDays, Clock3 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPostbySlug } from "../admin/api/post";



const formatDate = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};



const renderText = (node, index) => {
  let content = node.text || "";

  if (node.marks?.length) {
    node.marks.forEach((mark) => {
      switch (mark.type) {
        case "bold":
          content = (
            <strong
              key={`${index}-bold`}
              className="font-semibold text-zinc-950 dark:text-white"
            >
              {content}
            </strong>
          );
          break;

        case "italic":
          content = <em key={`${index}-italic`}>{content}</em>;
          break;

        case "strike":
          content = <s key={`${index}-strike`}>{content}</s>;
          break;

        case "code":
          content = (
            <code
              key={`${index}-code`}
              className="rounded-md bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.9em] text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
            >
              {content}
            </code>
          );
          break;

        case "link":
          content = (
            <a
              key={`${index}-link`}
              href={mark.attrs?.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:opacity-70"
            >
              {content}
            </a>
          );
          break;

        default:
          break;
      }
    });
  }

  return <span key={index}>{content}</span>;
};



const renderNode = (node, index) => {
  if (!node) return null;

  /* Text */
  if (node.type === "text") {
    return renderText(node, index);
  }

  /* Hard break */
  if (node.type === "hardBreak") {
    return <br key={index} />;
  }

  const children = node.content?.map((child, childIndex) =>
    renderNode(child, childIndex),
  );

  /* Heading */
  if (node.type === "heading") {
    const level = node.attrs?.level || 2;

    if (level === 1) {
      return (
        <h2
          key={index}
          className="mb-5 mt-12 text-3xl font-bold tracking-tight text-zinc-950 dark:text-white sm:text-4xl"
        >
          {children}
        </h2>
      );
    }

    if (level === 2) {
      return (
        <h2
          key={index}
          className="mb-4 mt-12 text-2xl font-bold tracking-tight text-zinc-950 dark:text-white sm:text-3xl"
        >
          {children}
        </h2>
      );
    }

    return (
      <h3
        key={index}
        className="mb-3 mt-10 text-xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-2xl"
      >
        {children}
      </h3>
    );
  }

  /* Paragraph */
  if (node.type === "paragraph") {
    return (
      <p
        key={index}
        className="mb-6 text-[17px] leading-[1.9] text-zinc-700 dark:text-zinc-300"
        style={{
          textAlign: node.attrs?.textAlign || "left",
        }}
      >
        {children}
      </p>
    );
  }

  /* Bullet List */
  if (node.type === "bulletList") {
    return (
      <ul
        key={index}
        className="mb-7 ml-6 list-disc space-y-2 text-[17px] leading-8 text-zinc-700 dark:text-zinc-300"
      >
        {children}
      </ul>
    );
  }

  /* Ordered List */
  if (node.type === "orderedList") {
    return (
      <ol
        key={index}
        className="mb-7 ml-6 list-decimal space-y-2 text-[17px] leading-8 text-zinc-700 dark:text-zinc-300"
      >
        {children}
      </ol>
    );
  }

  /* List Item */
  if (node.type === "listItem") {
    return <li key={index}>{children}</li>;
  }

  /* Blockquote */
  if (node.type === "blockquote") {
    return (
      <blockquote
        key={index}
        className="my-8 border-l-2 border-zinc-300 pl-5 text-lg italic leading-8 text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
      >
        {children}
      </blockquote>
    );
  }

  /* Code Block */
  if (node.type === "codeBlock") {
    return (
      <pre
        key={index}
        className="my-8 overflow-x-auto rounded-xl bg-zinc-950 p-5 text-sm leading-7 text-zinc-100 dark:bg-zinc-900"
      >
        <code>{children}</code>
      </pre>
    );
  }

  /* Image */
  if (node.type === "image") {
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
  }

  /* Fallback */
  return <div key={index}>{children}</div>;
};



const renderContent = (content) => {
  if (!content) return null;

  if (typeof content === "string") {
    try {
      content = JSON.parse(content);
    } catch {
      return (
        <p className="text-[17px] leading-8 text-zinc-700 dark:text-zinc-300">
          {content}
        </p>
      );
    }
  }

  if (content.type === "doc") {
    return content.content?.map((node, index) => renderNode(node, index));
  }

  if (Array.isArray(content)) {
    return content.map((node, index) => renderNode(node, index));
  }

  return renderNode(content, 0);
};



const BlogPost = () => {
  const { slug } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: () => getPostbySlug(slug),
    enabled: Boolean(slug),
    retry: false,
  });


  const blog = data?.data?.blog || data?.data;

  /* Loading */
  if (isLoading) {
    return (
      <main className="min-h-screen bg-white dark:bg-zinc-950">
        <div className="mx-auto max-w-3xl px-5 py-24 sm:px-6">
          <div className="animate-pulse">
            <div className="h-4 w-24 rounded bg-zinc-200 dark:bg-zinc-800" />

            <div className="mt-8 h-12 w-4/5 rounded bg-zinc-200 dark:bg-zinc-800" />

            <div className="mt-4 h-5 w-2/3 rounded bg-zinc-100 dark:bg-zinc-900" />

            <div className="mt-12 h-80 rounded-2xl bg-zinc-100 dark:bg-zinc-900" />
          </div>
        </div>
      </main>
    );
  }

  /* Error */
  if (isError || !blog) {
    return (
      <main className="min-h-screen bg-white dark:bg-zinc-950">
        <div className="mx-auto max-w-3xl px-5 py-32 text-center sm:px-6">
          <p className="text-sm text-zinc-400">404</p>

          <h1 className="mt-2 text-2xl font-semibold text-zinc-950 dark:text-white">
            Article not found
          </h1>

          <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
            This article could not be found.
          </p>

          <Link
            to="/blogs"
            className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-zinc-950 dark:text-white"
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
        <header className="mx-auto max-w-3xl px-5 pb-10 pt-20 sm:px-6 sm:pt-24">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
          >
            <ArrowLeft size={15} />
            Back to articles
          </Link>

          <div className="mt-10">
            <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
              {blog.createdAt && (
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays size={15} />
                  {formatDate(blog.createdAt)}
                </span>
              )}

              {blog.readingTime && (
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 size={15} />
                  {blog.readingTime} min read
                </span>
              )}
            </div>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-zinc-950 dark:text-white sm:text-5xl sm:leading-[1.12]">
              {blog.title}
            </h1>

            {blog.excerpt && (
              <p className="mt-5 text-lg leading-8 text-zinc-500 dark:text-zinc-400">
                {blog.excerpt}
              </p>
            )}
          </div>
        </header>

        {/* --------------------------------
            Cover Image
        -------------------------------- */}

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

        {/* --------------------------------
            Content
        -------------------------------- */}

        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 sm:py-20">
          <div>{renderContent(blog.content)}</div>
        </div>
      </article>
    </main>
  );
};

export default BlogPost;
