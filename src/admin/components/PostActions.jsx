import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { usePostMutations } from "../hooks/usePostMutations";


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
        className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-900"
      >
        <MoreHorizontal size={18} />
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-40 rounded-lg border border-zinc-200 bg-white p-1 shadow-lg">
          <button
            type="button"
            className="w-full rounded-md px-3 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-50"
          >
            Edit
          </button>

          <button
            type="button"
            className="w-full rounded-md px-3 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-50"
          >
            Preview
          </button>

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
