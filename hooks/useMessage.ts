import { useQuery } from "@tanstack/react-query";
import type { Message } from "@/types";
import { useApi } from "./useApi";

export const useMessages = (chatId: string) => {
  const { api } = useApi();

  return useQuery({
    queryKey: ["messages", chatId],
    queryFn: async (): Promise<Message[]> => {
      const { data } = await api<Message[]>({
        method: "GET",
        url: `/messages/chat/${chatId}`,
      });
      return data;
    },
    enabled: !!chatId,
  });
};
