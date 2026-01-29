import { useQuery } from "@tanstack/react-query";
import type { User } from "@/types";
import { useApi } from "@/hooks/useApi";

export const useUsers = () => {
  const { api } = useApi();

  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await api<User[]>({
        method: "GET",
        url: "/users",
      });
      return data;
    },
  });
};
