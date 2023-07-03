import { useQuery } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { QueryOptionsType } from "types/queryOptions";
import http from "utils/http";

export const getAllNotifications = async ({ queryKey }: any) => {
  const { data } = await http.get(Endpoints.NOTIFICATIONS + "?limit=100");
  return data;
};

export const useNotificationsQuery = (options: QueryOptionsType) => {
  return useQuery<{ data: any }, Error>(
    [Endpoints.NOTIFICATIONS, options],
    getAllNotifications
  );
};
