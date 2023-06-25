import { useQuery } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { QueryOptionsType } from "types/queryOptions";
import http from "utils/http";

export const getAllTasks = async ({ queryKey }: any) => {
  const [_key, options] = queryKey;
  const query = options.query ? options.query + "&limit=50&offset=0" : "?limit=50&offset=0";
  const { data } = await http.get(Endpoints.TASK + query);
  return { tasks: { data: data as any } };
};

export const useTaskQuery = (options: QueryOptionsType) => {
  return useQuery<{ tasks: { data: any } }, Error>(
    [Endpoints.TASK, options],
    getAllTasks
  );
};
