import { useQuery } from "@tanstack/react-query";
import { getPostbyId } from "../api/post";

export const useGetOnePost = (id) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostbyId(id),
    enabled: Boolean(id),
  });
};

