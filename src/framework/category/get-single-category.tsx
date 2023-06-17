import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { QueryOptionsType } from "types/queryOptions";

export const getSingleCategory = async ({ queryKey }: any) => {
  const [_params] = queryKey;

  const { data } = await axios.get(
    process.env.REACT_APP_API_BASE_URL + Endpoints.CATEGORY + _params.id + "/"
  );
  return { category: { data: data as any } };
};

export const useSingleCategory = (options: QueryOptionsType) => {
  return useQuery<{ category: { data: any } }, Error>(
    [Endpoints.CATEGORY, options],
    getSingleCategory
  );
};
