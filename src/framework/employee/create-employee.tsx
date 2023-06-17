import { useMutation } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { EmployeeCreateInput } from "types/employee";
import http from "utils/http";

export const useCreateEmployee = () => {
  return useMutation<any, Error, EmployeeCreateInput>(async createInput => {
    const { data } = await http.post(Endpoints.EMPLOYEE, createInput);
    return { session: { data: data as any } };
  });
};

export const employeeInput = (
  data: EmployeeCreateInput
): EmployeeCreateInput => {
  return { project: data.project, user: data.user };
};
