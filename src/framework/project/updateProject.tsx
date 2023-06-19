import { useMutation } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { SelectedProject } from "types/project";
import http from "utils/http";

export const useUpdateProject = () => {
  return useMutation<any, Error, SelectedProject>(async updateInput => {
    const { data } = await http.patch(
      Endpoints.PROJECT + updateInput.id + "/",
      updateInput
    );
    return { session: { data: data as any } };
  });
};

export const projectUpdateInput = (data: SelectedProject): SelectedProject => {
  return {
    id: data.id,
    admin: data.admin,
    name: data.name,
    description: data.description,
    category: data.category,
    start_at: data.start_at,
    end_at: data.end_at,
  }
};