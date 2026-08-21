import { Link } from "react-router-dom";
import { FilePlus, MoreHorizontal } from "lucide-react";
import { usePosts } from "../hooks/usePost";
import { useState } from "react";
import PostActions from "../components/PostActions";

const Posts = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const { data, isLoading, isError, error } = usePosts(
    page,
    10,
    search,
    status,
  );

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-zinc-500">Loading posts...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-5">
        <p className="text-sm font-medium text-red-700">
          Failed to load posts.
        </p>

        <p className="mt-1 text-sm text-red-600">{error?.message}</p>
      </div>
    );
  }

  const posts = data?.blogs?.blogs ?? [];
  const pagination = data?.blogs?.data;

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-500">Content</p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-950">
            Posts
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Create, manage and publish your blog posts.
          </p>
        </div>

        <Link
          to="/admin/posts/new"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-950 px-4 py-2.5 text-sm font-medium !text-white transition hover:bg-zinc-800"
        >
          <FilePlus size={17} />
          New post
        </Link>
      </div>

      {/* search bar and filter */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search posts..."
            className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
          />
        </div>

        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className="rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-700 outline-none focus:border-zinc-400"
        >
          <option value="">All statuses</option>
          <option value="PUBLISHED">Published</option>
          <option value="DRAFT">Draft</option>
          <option value="ARCHIVED">Archived</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-zinc-200 bg-zinc-50">
              <tr>
                <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-zinc-500">
                  Post
                </th>

                <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-zinc-500">
                  Status
                </th>

                <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-zinc-500">
                  Views
                </th>

                <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-zinc-500">
                  Updated
                </th>

                <th className="px-5 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-100">
              {posts.map((post) => (
                <tr key={post.id} className="transition hover:bg-zinc-50">
                  <td className="px-5 py-4">
                    <div>
                      <p className="max-w-md truncate text-sm font-medium text-zinc-900">
                        {post.title}
                      </p>

                      <p className="mt-1 max-w-md truncate text-xs text-zinc-500">
                        {post.excerpt || "No excerpt"}
                      </p>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={post.status} />
                  </td>

                  <td className="px-5 py-4 text-sm text-zinc-600">
                    {post.views}
                  </td>

                  <td className="px-5 py-4 text-sm text-zinc-500">
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </td>

                  <td className="px-5 py-4 text-right">
                    <PostActions post={post} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty state */}
        {posts.length === 0 && (
          <div className="px-6 py-16 text-center">
            <p className="text-sm font-medium text-zinc-900">No posts yet</p>

            <p className="mt-1 text-sm text-zinc-500">
              Create your first blog post to get started.
            </p>
          </div>
        )}
      </div>

      {/* Pagination info */}
      {pagination && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-zinc-500">
            <span>
              Page {pagination.page} of {pagination.totalPage}
            </span>

            <span className="ml-3">{pagination.total} total posts</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="rounded-lg border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            <button
              type="button"
              disabled={page >= pagination.totalPage}
              onClick={() => setPage((prev) => prev + 1)}
              className="rounded-lg border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    PUBLISHED: "bg-emerald-50 text-emerald-700",
    DRAFT: "bg-amber-50 text-amber-700",
    ARCHIVED: "bg-zinc-100 text-zinc-600",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
        styles[status] || styles.ARCHIVED
      }`}
    >
      {status}
    </span>
  );
};

export default Posts;
