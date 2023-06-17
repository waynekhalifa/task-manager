import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { Endpoints } from "@/enums/endpoints";
import { QueryOptionsType } from "@/types/queryOptions";

export const getAllProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;

  const { data } = await axios.get(
    "https://" + _params.backendUrl + Endpoints.PRODUCTS
  );
  return { products: { data: data as any } };
};

export const useProductsQuery = (options: QueryOptionsType) => {
  return useQuery<{ products: { data: any } }, Error>(
    [Endpoints.PRODUCTS, options],
    getAllProducts
  );
};
