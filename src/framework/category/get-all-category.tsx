import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { QueryOptionsType } from "types/queryOptions";

export const getAllCategories = async ({ queryKey }: any) => {
  const { data } = await axios.get(
    process.env.REACT_APP_API_BASE_URL + Endpoints.CATEGORY
  );
  return { categories: { data: data as any } };
};

export const useCategoryQuery = (options: QueryOptionsType) => {
  return useQuery<{ categories: { data: any } }, Error>(
    [Endpoints.CATEGORY, options],
    getAllCategories
  );
};
