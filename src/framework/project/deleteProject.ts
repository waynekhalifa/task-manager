import { useMutation } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { SelectedProject } from "types/project";
import http from "utils/http";

export const useDeleteProject = () => {
  return useMutation<any, Error, SelectedProject>(async updateInput => {
    const { data } = await http.delete(
      Endpoints.PROJECT + updateInput.id + "/"
    );
    return { session: { data: data as any } };
  });
};


