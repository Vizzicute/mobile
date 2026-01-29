import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSocketStore } from "@/lib/socket";
import { useCurrentUser } from "@/hooks/useAuth";

const SocketConnection = () => {
  const { data: user, isSuccess, isError } = useCurrentUser();
  const queryClient = useQueryClient();

  const connect = useSocketStore((state) => state.connect);
  const disconnect = useSocketStore((state) => state.disconnect);

  useEffect(() => {
    if (isSuccess && user) {
      connect(queryClient);
    }

    if (isError || !user) {
      disconnect();
    }

    return () => {
      disconnect();
    };
  }, [isSuccess, isError, user, connect, disconnect, queryClient]);

  return null;
};

export default SocketConnection;
