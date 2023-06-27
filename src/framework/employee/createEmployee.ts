import { useMutation } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { EmployeeCreateInput } from "types/employee";
import http from "utils/http";

export const useCreateEmployee = () => {
  return useMutation<any, Error, EmployeeCreateInput>(async createInput => {
    const { data } = await http.post(Endpoints.EMPLOYEE_CREATE, createInput);
    return { session: { data: data as any } };
  });
};

export const employeeInput = (data: EmployeeCreateInput): any => {
  return {
    useremployee: {
      onboard_at: data.onboard_at!,
      employee_id: data.employee_id!,
      phone: data.phone!,
      department: data.department!,
      description: data.description!,
      manager: data.manager!,
    },
    first_name: data.first_name!,
    last_name: data.last_name!,
    username: data.username!,
    email: data.email!,
    password1: data.password1!,
    password2: data.password1!,
    user_permissions: data.user_permissions!

  }
};