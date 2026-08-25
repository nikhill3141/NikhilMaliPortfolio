import { useNavigate } from "react-router-dom";
import { FilePlus, Search } from "lucide-react";
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
  const navigate = useNavigate();

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
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-950">
          Posts
        </h1>

        <button
          type="button"
          onClick={() => navigate("/admin/posts/new")}
          className="inline-flex items-center gap-2 rounded-lg bg-zinc-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800"
        >
          <FilePlus size={16} />
          New post
        </button>
      </div>

      {/* Search + filter */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full sm:max-w-xs">
          <Search
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search"
            className="w-full rounded-lg border border-zinc-200 bg-white py-2 pl-9 pr-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-400"
          />
        </div>

        <div className="flex gap-1.5">
          {["", "PUBLISHED", "DRAFT", "ARCHIVED"].map((s) => (
            <button
              key={s || "all"}
              type="button"
              onClick={() => {
                setStatus(s);
                setPage(1);
              }}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                status === s
                  ? "bg-zinc-950 text-white"
                  : "text-zinc-500 hover:bg-zinc-100"
              }`}
            >
              {s ? s.charAt(0) + s.slice(1).toLowerCase() : "All"}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-zinc-100">
                <th className="px-5 py-3 text-xs font-medium text-zinc-400">
                  Title
                </th>
                <th className="px-5 py-3 text-xs font-medium text-zinc-400">
                  Status
                </th>
                <th className="px-5 py-3 text-xs font-medium text-zinc-400">
                  Views
                </th>
                <th className="px-5 py-3 text-xs font-medium text-zinc-400">
                  Updated
                </th>
                <th className="px-5 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-50">
              {posts.map((post) => (
                <tr
                  key={post.id}
                  onClick={() => navigate(`/admin/posts/${post.id}/edit`)}
                  className="cursor-pointer transition hover:bg-zinc-50"
                >
                  <td className="px-5 py-3.5">
                    <p className="max-w-md truncate text-sm font-medium text-zinc-900">
                      {post.title}
                    </p>
                  </td>

                  <td className="px-5 py-3.5">
                    <StatusDot status={post.status} />
                  </td>

                  <td className="px-5 py-3.5 text-sm text-zinc-500">
                    {post.views}
                  </td>

                  <td className="px-5 py-3.5 text-sm text-zinc-500">
                    {new Date(post.updatedAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </td>

                  <td
                    className="px-5 py-3.5 text-right"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <PostActions post={post} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {posts.length === 0 && (
          <div className="px-6 py-16 text-center">
            <p className="text-sm font-medium text-zinc-900">No posts yet</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="mt-4 flex items-center justify-between text-sm text-zinc-500">
          <span>
            Page {pagination.page} of {pagination.totalPage}
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="rounded-lg border border-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            <button
              type="button"
              disabled={page >= pagination.totalPage}
              onClick={() => setPage((prev) => prev + 1)}
              className="rounded-lg border border-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const StatusDot = ({ status }) => {
  const styles = {
    PUBLISHED: "bg-emerald-500",
    DRAFT: "bg-amber-500",
    ARCHIVED: "bg-zinc-400",
  };

  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-zinc-600">
      <span
        className={`h-1.5 w-1.5 rounded-full ${styles[status] || styles.ARCHIVED}`}
      />
      {status}
    </span>
  );
};

export default Posts;
