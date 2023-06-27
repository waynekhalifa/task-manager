import { useQuery } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { QueryOptionsType } from "types/queryOptions";
import http from "utils/http";

export const getSingleEmployee = async ({ queryKey }: any) => {
  const [_params] = queryKey;
  const { data } = await http.post(Endpoints.EMPLOYEE + _params.id + "/");
  return { manager: { data: data as any } };
};

export const useSingleEmployee = (options: QueryOptionsType) => {
  return useQuery<{ manager: { data: any } }, Error>(
    [Endpoints.EMPLOYEE, options],
    getSingleEmployee
  );
};
