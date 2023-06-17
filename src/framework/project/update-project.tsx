import { useMutation } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { ProjectUpdateInput } from "types/project";
import http from "utils/http";

export const useUpdateProject = () => {
  return useMutation<any, Error, ProjectUpdateInput>(async updateInput => {
    const { data } = await http.post(
      Endpoints.PROJECT + updateInput.id + "/",
      updateInput
    );
    return { session: { data: data as any } };
  });
};

export const projectInput = (data: ProjectUpdateInput): ProjectUpdateInput => {
  return {
    id: data.id,
    admin: data.admin,
    files: data.files,
    name: data.name,
    description: data.description,
    category: data.category
  };
};
