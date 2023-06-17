import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { QueryOptionsType } from "types/queryOptions";

export const getAllTasks = async ({ queryKey }: any) => {
  const { data } = await axios.get(
    process.env.REACT_APP_API_BASE_URL + Endpoints.TASK
  );
  return { tasks: { data: data as any } };
};

export const useEmployeesQuery = (options: QueryOptionsType) => {
  return useQuery<{ tasks: { data: any } }, Error>(
    [Endpoints.TASK, options],
    getAllTasks
  );
};
