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

export const employeeInput = (
  data: EmployeeCreateInput
): EmployeeCreateInput => {
  // return {
  //   first_name: data.first_name,
  //   last_name: data.last_name,
  //   username: data.username,
  //   email: data.email,
  //   password1: data.password1,
  //   password2: data.password2,
  //   employee: {
  //     onboard_at: data.employee.onboard_at,
  //     employee_id: data.employee.employee_id,
  //     phone: data.employee.phone,
  //     department: data.employee.department
  //   }
  // };
  const formData = new FormData();

  formData.append("first_name", `${data.first_name}`);
  formData.append("last_name", data.last_name);
  formData.append("username", data?.username!);
  formData.append("email", `${data.email}`);
  formData.append("password1", data.password1);
  formData.append("password2", data.password2);



  formData.append("onboard_at", data.employee.onboard_at);
  formData.append("employee_id", data.employee.employee_id);
  formData.append("phone", data.employee.phone);
  formData.append("department", data.employee.department);

  for (let i = 0; i < data.employee.files.length; i++) {
    formData.append("files", data.employee.files[i]);
  }
  return formData;
};