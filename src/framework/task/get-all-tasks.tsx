import { useQuery } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { QueryOptionsType } from "types/queryOptions";
import http from "utils/http";

export const getAllTasks = async ({ queryKey }: any) => {
  const { data } = await http.post(Endpoints.TASK);
  return { tasks: { data: data as any } };
};

export const useEmployeesQuery = (options: QueryOptionsType) => {
  return useQuery<{ tasks: { data: any } }, Error>(
    [Endpoints.TASK, options],
    getAllTasks
  );
};
