import { useQuery } from "@tanstack/react-query";
import { getCurrentAdmin } from "../api/auth";

export const useCurrentAdmin = () => {
  return useQuery({
    queryKey: ["currentAdmin"],
    queryFn: getCurrentAdmin,
    retry: false,
  });
};
