import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { usePostMutations } from "../hooks/usePostMutations";
import { Link } from "react-router-dom";



const PostActions = ({ post }) => {
  const [open, setOpen] = useState(false);

  const { deleteMutation, publishMutation } = usePostMutations();

  const handlePublish = () => {
    publishMutation.mutate(post.id);
    setOpen(false);
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?",
    );

    if (!confirmed) return;

    deleteMutation.mutate(post.id);
    setOpen(false);
  };



  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Post actions"
        className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
      >
        <MoreHorizontal size={18} />
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-40 rounded-lg border border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-700 dark:bg-zinc-900 dark:shadow-black/30">
          <Link
            to={`/admin/posts/${post.id}/edit`}
            onClick={() => setOpen(false)}
            className="block w-full rounded-md px-3 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Edit
          </Link>


          {post.status === "DRAFT" && (
            <button
              type="button"
              onClick={handlePublish}
              disabled={publishMutation.isPending}
              className="w-full rounded-md px-3 py-2 text-left text-sm text-emerald-700 hover:bg-emerald-50 disabled:opacity-50"
            >
              {publishMutation.isPending ? "Publishing..." : "Publish"}
            </button>
          )}

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="w-full rounded-md px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      )}
    </div>
  );
};

export default PostActions;
