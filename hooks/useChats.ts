import type { Chat } from "@/types";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useApi } from "./useApi";

export const useChats = () => {
  const { api } = useApi();

  return useQuery({
    queryKey: ["chats"],
    queryFn: async () => {
      const { data } = await api<Chat[]>({
        method: "GET",
        url: "/chats",
      });
      return data;
    },
  });
};

export const useGetOrCreateChat = () => {
  const { api } = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (participantId: string) => {
      const { data } = await api<Chat>({
        method: "POST",
        url: `/chats/with/${participantId}`,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
  });
};
