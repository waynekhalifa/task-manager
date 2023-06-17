import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { EmployeeCreateInput } from "types/employee";

export const useCreateEmployee = () => {
  return useMutation<any, Error, EmployeeCreateInput>(async createInput => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    };
    const { data } = await axios.post(
      process.env.REACT_APP_API_BASE_URL + Endpoints.EMPLOYEE,
      createInput,
      config
    );
    return { session: { data: data as any } };
  });
};

export const employeeInput = (
  data: EmployeeCreateInput
): EmployeeCreateInput => {
  return { project: data.project, user: data.user };
};
