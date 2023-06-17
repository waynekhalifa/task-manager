import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { QueryOptionsType } from "types/queryOptions";

export const getAllEmployees = async ({ queryKey }: any) => {
  const { data } = await axios.get(
    process.env.REACT_APP_API_BASE_URL + Endpoints.EMPLOYEE
  );
  return { employees: { data: data as any } };
};

export const useEmployeesQuery = (options: QueryOptionsType) => {
  return useQuery<{ employees: { data: any } }, Error>(
    [Endpoints.EMPLOYEE, options],
    getAllEmployees
  );
};
