import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Eye,
  FileText,
  PenLine,
  Plus,
  RefreshCw,
} from "lucide-react";
import { usePosts } from "../hooks/usePost";

const getPostsPath = (status = "") =>
  status ? `/admin/posts?status=${status}` : "/admin/posts";

const Dashboard = () => {
  const { data, isLoading, isError, error, refetch, isFetching } = usePosts(
    1,
    100,
  );

  const posts = data?.blogs?.blogs ?? data?.data?.posts ?? data?.data ?? [];
  const recentPosts = [...posts]
    .sort(
      (a, b) =>
        new Date(b.updatedAt || b.createdAt || 0) -
        new Date(a.updatedAt || a.createdAt || 0),
    )
    .slice(0, 5);
  const publishedPosts = posts.filter((post) => post.status === "PUBLISHED").length;
  const draftPosts = posts.filter((post) => post.status === "DRAFT").length;
  const totalViews = posts.reduce((total, post) => total + (post.views ?? 0), 0);
  const latestDraft = recentPosts.find((post) => post.status === "DRAFT");

  const stats = [
    { label: "Total posts", value: posts.length, icon: FileText, path: getPostsPath() },
    { label: "Published", value: publishedPosts, icon: Eye, path: getPostsPath("PUBLISHED") },
    { label: "Drafts", value: draftPosts, icon: PenLine, path: getPostsPath("DRAFT") },
    { label: "Views", value: totalViews.toLocaleString(), icon: Eye, path: getPostsPath() },
  ];

  if (isError) {
    return (
      <div className="mx-auto max-w-7xl">
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 dark:border-red-900/70 dark:bg-red-950/40">
          <p className="text-sm font-medium text-red-700 dark:text-red-300">
            Failed to load dashboard data.
          </p>
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {error?.message || "Please check your connection and try again."}
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="mt-4 inline-flex items-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50 disabled:opacity-50 dark:border-red-900 dark:bg-red-950 dark:text-red-300 dark:hover:bg-red-900/40"
          >
            <RefreshCw size={15} className={isFetching ? "animate-spin" : ""} />
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Overview of your blog.
          </p>
        </div>
        <Link
          to="/admin/posts/new"
          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-zinc-950 px-4 py-2.5 text-sm font-medium !text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:!text-zinc-950 dark:hover:bg-white"
        >
          <Plus size={17} />
          New post
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Link
              key={stat.label}
              to={stat.path}
              className="rounded-xl border border-zinc-200 bg-white p-5 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/70"
            >
              <div className="flex items-start justify-between">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{stat.label}</p>
                <div className="rounded-lg bg-zinc-100 p-2 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                  <Icon size={17} />
                </div>
              </div>
              <p className="mt-4 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                {isLoading ? "—" : stat.value}
              </p>
            </Link>
          );
        })}
      </div>

      {latestDraft && (
        <div className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-zinc-100/60 px-5 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800 dark:bg-zinc-900">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Continue writing
            </p>
            <p className="mt-1 truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
              {latestDraft.title || "Untitled draft"}
            </p>
          </div>
          <Link
            to={`/admin/posts/${latestDraft.id}/edit`}
            className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-zinc-700 transition hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50"
          >
            Resume draft
            <ArrowUpRight size={15} />
          </Link>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
          <div>
            <h2 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
              Recent posts
            </h2>
            <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
              Your latest content
            </p>
          </div>
          <Link
            to="/admin/posts"
            className="inline-flex items-center gap-1 text-sm font-medium text-zinc-600 transition hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50"
          >
            View all
            <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {isLoading ? (
            <div className="px-5 py-10 text-center text-sm text-zinc-500 dark:text-zinc-400">
              Loading posts...
            </div>
          ) : recentPosts.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">No posts yet.</p>
              <Link
                to="/admin/posts/new"
                className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-zinc-950 hover:underline dark:text-zinc-100"
              >
                <Plus size={15} />
                Create your first post
              </Link>
            </div>
          ) : (
            recentPosts.map((post) => (
              <Link
                key={post.id}
                to={`/admin/posts/${post.id}/edit`}
                className="flex items-center justify-between gap-4 px-5 py-4 transition hover:bg-zinc-50 dark:hover:bg-zinc-800/70"
              >
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {post.title || "Untitled post"}
                  </h3>
                  <p className="mt-1 truncate text-xs text-zinc-500 dark:text-zinc-400">
                    {post.slug || "No URL slug yet"}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span
                    className={
                      post.status === "PUBLISHED"
                        ? "rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                        : "rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 dark:bg-amber-950/50 dark:text-amber-300"
                    }
                  >
                    {post.status === "PUBLISHED" ? "Published" : "Draft"}
                  </span>
                  <ArrowUpRight size={16} className="text-zinc-400 dark:text-zinc-500" />
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
