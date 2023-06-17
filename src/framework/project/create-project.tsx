import { useMutation } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { ProjectCreateInput } from "types/project";
import http from "utils/http";

export const useCreateCategory = () => {
  return useMutation<any, Error, ProjectCreateInput>(async createInput => {
    const { data } = await http.post(Endpoints.PROJECT, createInput);
    return { session: { data: data as any } };
  });
};

export const categoryInput = (data: ProjectCreateInput): ProjectCreateInput => {
  return {
    admin: data.admin,
    files: data.files,
    name: data.name,
    description: data.description,
    category: data.category
  };
};
