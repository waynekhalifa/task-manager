import { useMutation } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { EmployeeUpdateInput } from "types/employee";
import http from "utils/http";

export const useUpdateEmployee = () => {
  return useMutation<any, Error, EmployeeUpdateInput>(async updateInput => {
    const { data } = await http.post(
      Endpoints.EMPLOYEE + updateInput.id + "/",
      updateInput
    );
    return { session: { data: data as any } };
  });
};

export const employeeInput = (
  data: EmployeeUpdateInput
): EmployeeUpdateInput => {
  return { project: data.project, user: data.user };
};
