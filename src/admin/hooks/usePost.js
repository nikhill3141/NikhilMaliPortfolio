import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../api/post";


export const usePosts = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["adminPosts", page, limit],
    queryFn: () => getPosts({ page, limit }),
    placeholderData: (previousData) => previousData,
  });
};
