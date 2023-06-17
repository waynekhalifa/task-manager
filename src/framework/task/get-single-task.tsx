import { useQuery } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { QueryOptionsType } from "types/queryOptions";
import http from "utils/http";

export const getSingleTask = async ({ queryKey }: any) => {
  const [_params] = queryKey;
  const { data } = await http.post(Endpoints.TASK + _params.id + "/");
  return { task: { data: data as any } };
};

export const useSingleTask = (options: QueryOptionsType) => {
  return useQuery<{ task: { data: any } }, Error>(
    [Endpoints.TASK, options],
    getSingleTask
  );
};
