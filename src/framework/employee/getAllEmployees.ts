import { useQuery } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { QueryOptionsType } from "types/queryOptions";
import http from "utils/http";

export const getAllEmployees = async ({ queryKey }: any) => {
  const { data } = await http.get(Endpoints.EMPLOYEE);
  return { employees: { data: data as any } };
};

export const  useEmployeesQuery = (options: QueryOptionsType) => {
  return useQuery<{ employees: { data: any } }, Error>(
    [Endpoints.EMPLOYEE, options],
    getAllEmployees
  );
};
