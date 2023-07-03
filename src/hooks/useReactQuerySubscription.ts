import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useReactQuerySubscription = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const websocket = new WebSocket(
      "wss://task.noot.ae/notifications/token=" + token
    );
    websocket.onopen = () => {
      console.log("connected");
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // const queryKey = [...data.entity, data.id].filter(Boolean);
      // queryClient.invalidateQueries({ queryKey });
      console.log("data", data);
    };

    return () => {
      websocket.close();
    };
  }, [queryClient]);
};
