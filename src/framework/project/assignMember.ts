import { useMutation } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import http from "utils/http";

export const useAssignMemberToProject = () => {
  return useMutation<any, Error, any>(async createInput => {
    const { data } = await http.post(Endpoints.EMPLOYEE_PROJECT, createInput);
    return { session: { data: data as any } };
  });
};

 
export const createAssignInput = (data: any) => {
  return {
    user: data.user,
    project: data.project,
    task:data.task
  }
}