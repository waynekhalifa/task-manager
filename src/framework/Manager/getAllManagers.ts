import { useQuery } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { QueryOptionsType } from "types/queryOptions";
import http from "utils/http";

export const getAllManagers = async ({ queryKey }: any) => {
  const { data } = await http.get(Endpoints.MANAGER);
  return { managers: { data: data as any } };
};

export const useManagerQuery = (options: QueryOptionsType) => {
  return useQuery<{ managers: { data: any } }, Error>(
    [Endpoints.MANAGER, options],
    getAllManagers
  );
};
