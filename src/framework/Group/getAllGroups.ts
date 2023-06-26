import { useQuery } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { QueryOptionsType } from "types/queryOptions";
import http from "utils/http";

export const getAllGroups = async ({ queryKey }: any) => {
  const { data } = await http.get(Endpoints.GROUP);
  return { groups: { data: data as any } };
};

export const  useGroupQuery = (options: QueryOptionsType) => {
  return useQuery<{ groups: { data: any } }, Error>(
    [Endpoints.GROUP, options],
    getAllGroups
  );
};
