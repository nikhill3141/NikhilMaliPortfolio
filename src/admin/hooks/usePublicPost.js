import { useQuery } from "@tanstack/react-query";
import { getPublicPosts } from "../api/post";


export const usePublicPosts = ({ page = 1, limit = 10 } = {}) => {
  return useQuery({
    queryKey: ["public-posts", page, limit],
    queryFn: () => getPublicPosts({ page, limit }),
  });
};
