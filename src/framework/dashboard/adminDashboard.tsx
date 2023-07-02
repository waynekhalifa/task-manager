import { useQuery } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { QueryOptionsType } from "types/queryOptions";
import http from "utils/http";

export const getAdminDashboard = async ({ queryKey }: any) => {
  const { data } = await http.get(Endpoints.ADMIN_DASHBOARD);
  return data;
};

export const useAdminDashboardQuery = (options: QueryOptionsType) => {
  return useQuery<{ data: any }, Error>(
    [Endpoints.ADMIN_DASHBOARD, options],
    getAdminDashboard
  );
};
