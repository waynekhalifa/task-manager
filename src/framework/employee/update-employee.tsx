import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { EmployeeUpdateInput } from "types/employee";

export const useUpdateEmployee = () => {
  return useMutation<any, Error, EmployeeUpdateInput>(async updateInput => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    };
    const { data } = await axios.post(
      process.env.REACT_APP_API_BASE_URL +
        Endpoints.EMPLOYEE +
        updateInput.id +
        "/",
      updateInput,
      config
    );
    return { session: { data: data as any } };
  });
};

export const employeeInput = (
  data: EmployeeUpdateInput
): EmployeeUpdateInput => {
  return { project: data.project, user: data.user };
};
