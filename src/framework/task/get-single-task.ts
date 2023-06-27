import { useQuery } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { QueryOptionsType } from "types/queryOptions";
import http from "utils/http";

export const getSingleTask = async ({ queryKey }: any) => {
  const [_key, { id }] = queryKey;
  const { data } = await http.get(`${Endpoints.TASK}/${id}`);
  return data;
};

export const useSingleTask = (options: QueryOptionsType) => {
  return useQuery<{ task: { data: any } }, Error>(
    [Endpoints.TASK, options],
    getSingleTask
  );
};
