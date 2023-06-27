import { useQuery } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { QueryOptionsType } from "types/queryOptions";
import http from "utils/http";

export const getAllAssignedMembers = async ({ queryKey }: any) => {
  const [_key, { id }] = queryKey;
  const { data } = await http.get(Endpoints.EMPLOYEE_PROJECT + "?project=" + id);
  return { assignedEmployees: { data: data as any } };
};

export const useAssignedMembersQuery = (options: QueryOptionsType) => {
  return useQuery<{ assignedEmployees: { data: any } }, Error>(
    [Endpoints.EMPLOYEE_PROJECT, options],
    getAllAssignedMembers
  );
};
