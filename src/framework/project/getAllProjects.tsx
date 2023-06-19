import { useQuery } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { QueryOptionsType } from "types/queryOptions";
import http from "utils/http";

export const getAllProjects = async ({ queryKey }: any) => {
  const { data } = await http.get(Endpoints.PROJECT);
  return { projects: { data: data as any } };
};

export const useProjectsQuery = (options: QueryOptionsType) => {
  return useQuery<{ projects: { data: any } }, Error>(
    [Endpoints.PROJECT, options],
    getAllProjects
  );
};
