import { useMutation } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { EmployeeCreateInput } from "types/employee";
import http from "utils/http";

export const useCreateEmployee = () => {
  return useMutation<any, Error, FormData>(async createInput => {
    const { data } = await http.post(Endpoints.EMPLOYEE_CREATE, createInput);
    return { session: { data: data as any } };
  });
};

export const employeeInput = (data: EmployeeCreateInput): FormData => {
  const formData = new FormData();
  formData.append("first_name", data.first_name);
  formData.append("last_name", data.last_name);
  formData.append("username", data?.username);
  formData.append("email", data.email);
  formData.append("password1", data.password1);
  formData.append("password2", data.password1);
  formData.append("onboard_at", data.onboard_at);
  formData.append("employee_id", data.employee_id);
  formData.append("phone", data.phone);
  formData.append("department", data.department);
  formData.append("description", data.description);
  for (let i = 0; i < data.files.length; i++) {
    formData.append("files", data.files[i]);
  }
  return formData;
};