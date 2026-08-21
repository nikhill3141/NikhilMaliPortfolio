import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost, publishedPost, updatePost } from "../api/post";


export const usePostMutations = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deletePost,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });

  const publishMutation = useMutation({
    mutationFn: publishedPost,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updatePost,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });

  return {
    deleteMutation,
    publishMutation,
    updateMutation,
  };
};
