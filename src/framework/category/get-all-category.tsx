import { useQuery } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { QueryOptionsType } from "types/queryOptions";
import http from "utils/http";

export const getAllCategories = async ({ queryKey }: any) => {
  const { data } = await http.get(Endpoints.CATEGORY);
  return { categories: { data: data as any } };
};

export const useCategoryQuery = (options: QueryOptionsType) => {
  return useQuery<{ categories: { data: any } }, Error>(
    [Endpoints.CATEGORY, options],
    getAllCategories
  );
};
