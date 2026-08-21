import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getPosts } from "../api/post";


export const usePosts = (page = 1, limit = 10, search="", status="") => {
  return useQuery({
    queryKey: ["posts", page, limit, search, status],
    queryFn: async () => {
      return await getPosts({page, limit, search, status});
    },
    placeholderData: keepPreviousData,
  });
};
