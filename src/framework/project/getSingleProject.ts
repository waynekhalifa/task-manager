import { useQuery } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { QueryOptionsType } from "types/queryOptions";
import http from "utils/http";

export const getSingleProject = async ({ queryKey }: any) => {
  const [_key, { id }] = queryKey;
  const { data } = await http.get(`${Endpoints.PROJECT}/${id}`);
  return data;
};

export const useSingleProject = (options: QueryOptionsType) => {
  return useQuery(
    [Endpoints.PROJECT, options],
    getSingleProject
  );
};
