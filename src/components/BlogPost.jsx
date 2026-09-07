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

const getReadingTime = (minutes) => {
  return `${minutes || 10} min read`;
};

/* =========================================================
   RENDER TEXT
========================================================= */

const renderText = (node, index) => {
  let content = node.text || "";

  if (node.marks?.length) {
    node.marks.forEach((mark) => {
      switch (mark.type) {
        case "bold":
          content = (
            <strong
              key={`${index}-bold`}
              className="font-semibold text-[var(--foreground)]"
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
              className="
                rounded-md
                bg-[var(--surface)]
                px-1.5
                py-0.5
                font-mono
                text-[0.9em]
                text-[var(--foreground)]
              "
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
              className="
                text-[var(--foreground)]
                underline
                underline-offset-4
                transition-opacity
                hover:opacity-60
              "
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

/* =========================================================
   RENDER NODE
========================================================= */

const renderNode = (node, index) => {
  if (!node) return null;

  /* -------------------------------------------------------
     Text
  ------------------------------------------------------- */

  if (node.type === "text") {
    return renderText(node, index);
  }

  /* -------------------------------------------------------
     Hard Break
  ------------------------------------------------------- */

  if (node.type === "hardBreak") {
    return <br key={index} />;
  }

  const children = node.content?.map((child, childIndex) =>
    renderNode(child, childIndex),
  );

  /* -------------------------------------------------------
     Heading
  ------------------------------------------------------- */

  if (node.type === "heading") {
    const level = node.attrs?.level || 2;

    if (level === 1) {
      return (
        <h2
          key={index}
          className="
            mb-5
            mt-12
            text-3xl
            font-bold
            tracking-tight
            text-[var(--foreground)]
            sm:text-4xl
          "
        >
          {children}
        </h2>
      );
    }

    if (level === 2) {
      return (
        <h2
          key={index}
          className="
            mb-4
            mt-12
            text-2xl
            font-bold
            tracking-tight
            text-[var(--foreground)]
            sm:text-3xl
          "
        >
          {children}
        </h2>
      );
    }

    return (
      <h3
        key={index}
        className="
          mb-3
          mt-10
          text-xl
          font-semibold
          tracking-tight
          text-[var(--foreground)]
          sm:text-2xl
        "
      >
        {children}
      </h3>
    );
  }

  /* -------------------------------------------------------
     Paragraph
  ------------------------------------------------------- */

  if (node.type === "paragraph") {
    return (
      <p
        key={index}
        className="
          mb-6
          text-[17px]
          leading-[1.9]
          text-secondary
        "
        style={{
          textAlign: node.attrs?.textAlign || "left",
        }}
      >
        {children}
      </p>
    );
  }

  /* -------------------------------------------------------
     Bullet List
  ------------------------------------------------------- */

  if (node.type === "bulletList") {
    return (
      <ul
        key={index}
        className="
          mb-7
          ml-6
          list-disc
          space-y-2
          text-[17px]
          leading-8
          text-secondary
        "
      >
        {children}
      </ul>
    );
  }

  /* -------------------------------------------------------
     Ordered List
  ------------------------------------------------------- */

  if (node.type === "orderedList") {
    return (
      <ol
        key={index}
        className="
          mb-7
          ml-6
          list-decimal
          space-y-2
          text-[17px]
          leading-8
          text-secondary
        "
      >
        {children}
      </ol>
    );
  }

  /* -------------------------------------------------------
     List Item
  ------------------------------------------------------- */

  if (node.type === "listItem") {
    return <li key={index}>{children}</li>;
  }

  /* -------------------------------------------------------
     Blockquote
  ------------------------------------------------------- */

  if (node.type === "blockquote") {
    return (
      <blockquote
        key={index}
        className="
          my-8
          border-l-2
          border-[var(--border)]
          pl-5
          text-lg
          italic
          leading-8
          text-secondary
        "
      >
        {children}
      </blockquote>
    );
  }

  /* -------------------------------------------------------
     Code Block
  ------------------------------------------------------- */

  if (node.type === "codeBlock") {
    return (
      <pre
        key={index}
        className="
          my-8
          overflow-x-auto
          rounded-xl
          bg-[var(--surface)]
          p-5
          text-sm
          leading-7
          text-[var(--foreground)]
        "
      >
        <code>{children}</code>
      </pre>
    );
  }

  /* -------------------------------------------------------
     Image
     
     Tiptap article images ARE rendered here.
  ------------------------------------------------------- */

  if (node.type === "image") {
    return (
      <figure key={index} className="my-10">
        <img
          src={node.attrs?.src}
          alt={node.attrs?.alt || ""}
          className="
            w-full
            rounded-2xl
            object-contain
          "
        />

        {node.attrs?.title && (
          <figcaption
            className="
              mt-3
              text-center
              text-sm
              text-secondary
            "
          >
            {node.attrs.title}
          </figcaption>
        )}
      </figure>
    );
  }

  /* -------------------------------------------------------
     Fallback
  ------------------------------------------------------- */

  return <div key={index}>{children}</div>;
};

/* =========================================================
   RENDER CONTENT
========================================================= */

const renderContent = (content) => {
  if (!content) return null;

  /*
   * Sometimes content can come from the API
   * as a JSON string.
   */
  if (typeof content === "string") {
    try {
      content = JSON.parse(content);
    } catch {
      return <p className="text-[17px] leading-8 text-secondary">{content}</p>;
    }
  }

  /*
   * Tiptap document
   */
  if (content.type === "doc") {
    return content.content?.map((node, index) => renderNode(node, index));
  }

  /*
   * Array of nodes
   */
  if (Array.isArray(content)) {
    return content.map((node, index) => renderNode(node, index));
  }

  /*
   * Single node
   */
  return renderNode(content, 0);
};

/* =========================================================
   BLOG POST
========================================================= */

const BlogPost = () => {
  const { slug } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: () => getPostbySlug(slug),
    enabled: Boolean(slug),
    retry: false,
  });

  const blog = data?.data?.blog || data?.data;

  /* =======================================================
     LOADING
  ======================================================= */

  if (isLoading) {
    return (
      <main className="sleek-section">
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          <div className="animate-pulse">
            {/* Back link */}
            <div className="h-4 w-28 rounded bg-[var(--surface)]" />

            {/* Meta */}
            <div className="mt-10 h-4 w-44 rounded bg-[var(--surface)]" />

            {/* Title */}
            <div className="mt-6 h-12 w-4/5 rounded bg-[var(--surface)]" />

            {/* Excerpt */}
            <div className="mt-5 h-5 w-2/3 rounded bg-[var(--surface)]" />

            {/* Cover */}
            <div className="mt-10 h-72 rounded-2xl bg-[var(--surface)]" />

            {/* Content */}
            <div className="mt-14 space-y-4">
              <div className="h-4 w-full rounded bg-[var(--surface)]" />
              <div className="h-4 w-full rounded bg-[var(--surface)]" />
              <div className="h-4 w-5/6 rounded bg-[var(--surface)]" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* =======================================================
     ERROR / NOT FOUND
  ======================================================= */

  if (isError || !blog) {
    return (
      <main className="sleek-section">
        <div className="mx-auto max-w-3xl px-5 py-32 text-center sm:px-6">
          <p className="text-sm text-secondary">404</p>

          <h1
            className="
              mt-2
              text-2xl
              font-semibold
              text-[var(--foreground)]
            "
          >
            Article not found
          </h1>

          <p className="mt-3 text-sm text-secondary">
            This article could not be found.
          </p>

          <Link
            to="/blogs"
            className="
              mt-7
              inline-flex
              items-center
              gap-2
              text-sm
              font-medium
              text-[var(--foreground)]
              transition-opacity
              hover:opacity-60
            "
          >
            <ArrowLeft size={16} />
            Back to articles
          </Link>
        </div>
      </main>
    );
  }

  /* =======================================================
     BLOG PAGE
  ======================================================= */

  return (
    <main className="">
      <article>
        {/* =================================================
            HEADER
        ================================================= */}

        <header
          className="
            mx-auto
            max-w-3xl
            px-5
            sm:px-6
            
          "
        >
          {/* Back */}
          <Link
            to="/blogs"
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              text-secondary
              transition-colors
              hover:text-[var(--foreground)]
            "
          >
            <ArrowLeft size={20} />
            Back to articles
          </Link>

          <div className="mt-6">
            {/* =================================================
                META
            ================================================= */}

            <div
              className="
                flex
                flex-wrap
                items-center
                gap-4
                text-sm
                text-secondary
              "
            >
              {blog.createdAt && (
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays size={15} />

                  {formatDate(blog.createdAt)}
                </span>
              )}

              <span className="inline-flex items-center gap-1.5">
                <Clock3 size={15} />

                {getReadingTime(blog.readingTime)}
              </span>
            </div>

            {/* =================================================
                TITLE
            ================================================= */}

            <h1
              className="
                mt-5
                text-4xl
                font-bold
                tracking-tight
                text-[var(--foreground)]
                sm:text-5xl
                sm:leading-[1.12]
              "
            >
              {blog.title}
            </h1>

            {/* =================================================
                EXCERPT
            ================================================= */}

            {blog.excerpt && (
              <p
                className="
                  mt-5
                  text-lg
                  leading-8
                  text-secondary
                "
              >
                {blog.excerpt}
              </p>
            )}
          </div>
        </header>

        {/* =================================================
            COVER IMAGE

            IMPORTANT:
            This image appears ONLY on the blog reading page.
            Blog.jsx does not render coverImage.
        ================================================= */}

        {blog.coverImage && (
          <div className="mx-auto max-w-5xl mt-10 px-5 sm:px-6">
            <div
              className="
                overflow-hidden
                rounded-2xl
              "
            >
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="
                  max-h-[560px]
                  w-full
                  object-cover
                "
              />
            </div>
          </div>
        )}

        {/* =================================================
            ARTICLE CONTENT
        ================================================= */}

        <div
          className="
            mx-auto
            max-w-3xl
            px-5
            pb-20
            pt-14
            sm:px-6
            sm:pb-24
            sm:pt-20
          "
        >
          <div>{renderContent(blog.content)}</div>
        </div>
      </article>
    </main>
  );
};

export default BlogPost;
