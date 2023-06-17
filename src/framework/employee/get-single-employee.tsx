import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { Endpoints } from "@/enums/endpoints";
import { QueryOptionsType } from "@/types/queryOptions";

export const getSingleProduct = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;

  const { data } = await axios.get(
    "https://" + _params.backendUrl + Endpoints.PRODUCTS + _params.id
  );
  return { product: { data: data as any } };
};

export const useSingleProduct = (options: QueryOptionsType) => {
  return useQuery<{ product: { data: any } }, Error>(
    [Endpoints.PRODUCTS, options],
    getSingleProduct
  );
};
