import { useQuery } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { QueryOptionsType } from "types/queryOptions";
import http from "utils/http";

export const getSingleCategory = async ({ queryKey }: any) => {
  const [_params] = queryKey;
  const { data } = await http.post(Endpoints.CATEGORY + _params.id + "/");
  return { category: { data: data as any } };
};

export const useSingleCategory = (options: QueryOptionsType) => {
  return useQuery<{ category: { data: any } }, Error>(
    [Endpoints.CATEGORY, options],
    getSingleCategory
  );
};
