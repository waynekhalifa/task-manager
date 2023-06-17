import { useMutation } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { ProjectCreateInput } from "types/project";
import http from "utils/http";

export const useCreateProject = () => {
  return useMutation<any, Error, ProjectCreateInput>(async createInput => {
    const { data } = await http.post(Endpoints.PROJECT, createInput);
    return { session: { data: data as any } };
  });
};

export const projectInput = (data: ProjectCreateInput): ProjectCreateInput => {
  return {
    admin: data.admin,
    name: data.name,
    description: data.description,
    category: data.category,
    budget: data.budget,
    startDate: data.startDate,
    endDate: data.endDate,
    assignPerson: data.assignPerson,
    notifationSent: data.notifationSent,
    priority: data.priority,
  };
};
