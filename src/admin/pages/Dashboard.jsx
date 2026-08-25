import { Link } from "react-router-dom";
import { FileText, Eye, PenLine, ArrowUpRight, Plus } from "lucide-react";
import { usePosts } from "../hooks/usePost";

const Dashboard = () => {
  const { data, isLoading, isError } = usePosts(1, 100);

  const posts = data?.data?.posts ?? data?.data ?? [];

  const totalPosts = posts.length;

  const publishedPosts = posts.filter(
    (post) => post.status === "PUBLISHED",
  ).length;

  const draftPosts = posts.filter((post) => post.status === "DRAFT").length;

  const totalViews = posts.reduce(
    (total, post) => total + (post.views ?? 0),
    0,
  );

  const stats = [
    {
      label: "Total posts",
      value: totalPosts,
      icon: FileText,
    },
    {
      label: "Published",
      value: publishedPosts,
      icon: Eye,
    },
    {
      label: "Drafts",
      value: draftPosts,
      icon: PenLine,
    },
    {
      label: "Views",
      value: totalViews.toLocaleString(),
      icon: Eye,
    },
  ];

  if (isError) {
    return (
      <div className="mx-auto max-w-7xl">
        <div className="rounded-xl border border-red-200 bg-red-50 p-5">
          <p className="text-sm font-medium text-red-700">
            Failed to load dashboard data.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-950">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-zinc-500">Overview of your blog.</p>
        </div>

        <Link
          to="/admin/posts/new"
          className="inline-flex items-center gap-2 rounded-lg bg-zinc-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800"
        >
          <Plus size={17} />
          New post
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-xl border border-zinc-200 bg-white p-5"
            >
              <div className="flex items-start justify-between">
                <p className="text-sm text-zinc-500">{stat.label}</p>

                <div className="rounded-lg bg-zinc-100 p-2 text-zinc-600">
                  <Icon size={17} />
                </div>
              </div>

              <p className="mt-4 text-2xl font-semibold tracking-tight text-zinc-950">
                {isLoading ? "—" : stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Recent posts */}
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
        <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4">
          <div>
            <h2 className="text-sm font-semibold text-zinc-950">
              Recent posts
            </h2>

            <p className="mt-0.5 text-xs text-zinc-500">Your latest content</p>
          </div>

          <Link
            to="/admin/posts"
            className="inline-flex items-center gap-1 text-sm font-medium text-zinc-600 transition hover:text-zinc-950"
          >
            View all
            <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className="divide-y divide-zinc-100">
          {isLoading ? (
            <div className="px-5 py-10 text-center text-sm text-zinc-500">
              Loading posts...
            </div>
          ) : posts.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <p className="text-sm text-zinc-500">No posts yet.</p>

              <Link
                to="/admin/posts/new"
                className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-zinc-950 hover:underline"
              >
                <Plus size={15} />
                Create your first post
              </Link>
            </div>
          ) : (
            posts.slice(0, 5).map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between gap-4 px-5 py-4 transition hover:bg-zinc-50"
              >
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-medium text-zinc-900">
                    {post.title}
                  </h3>

                  <p className="mt-1 text-xs text-zinc-500">{post.slug}</p>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      post.status === "PUBLISHED"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {post.status === "PUBLISHED" ? "Published" : "Draft"}
                  </span>

                  <Link
                    to={`/admin/posts/${post.id}/edit`}
                    className="rounded-md p-1.5 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-900"
                    title="Edit post"
                  >
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
