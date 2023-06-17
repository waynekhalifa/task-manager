import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { QueryOptionsType } from "types/queryOptions";

export const getSingleEmployee = async ({ queryKey }: any) => {
  const [_params] = queryKey;

  const { data } = await axios.get(
    process.env.REACT_APP_API_BASE_URL + Endpoints.EMPLOYEE + _params.id + "/"
  );
  return { employee: { data: data as any } };
};

export const useSingleEmployee = (options: QueryOptionsType) => {
  return useQuery<{ employee: { data: any } }, Error>(
    [Endpoints.EMPLOYEE, options],
    getSingleEmployee
  );
};
