import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useApi } from "./useApi";
import { User } from "@/types";

export const useSignIn = () => {
  const { api } = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: { email: string; password: string }) => {
      await api.post("/auth/sign-in", values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
};

export const useCurrentUser = () => {
  const { api } = useApi();

  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const { data } = await api.get<User | null>("/me");
      return data;
    },
    retry: false, // don't retry on 401
  });
};

export const useSignOut = () => {
  const { api } = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await api.post("/auth/sign-out");
    },
    onSuccess: () => {
      queryClient.clear();
    },
  });
};

export const useSession = () => {
  const { api } = useApi();

  return useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const { data } = await api.get("/auth/session");
      return data;
    },
    retry: false,
  });
};
