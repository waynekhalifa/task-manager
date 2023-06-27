import { useMutation } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { AssignedEmployee } from "types/employee";
 import http from "utils/http";

export const useDeleteAssignedEmployee = () => {
  return useMutation<any, Error, AssignedEmployee>(async updateInput => {
    const { data } = await http.delete(
      Endpoints.EMPLOYEE_PROJECT + updateInput.id + "/"
    );
    return { session: { data: data as any } };
  });
};


