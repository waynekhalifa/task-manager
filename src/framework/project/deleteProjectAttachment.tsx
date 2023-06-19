import { useMutation } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { SelectedProject } from "types/project";
import http from "utils/http";

export const useDeleteProjectAttachment = () => {
  return useMutation<any, Error, SelectedProject>(async updateInput => {
    const { data } = await http.delete(
      Endpoints.PROJECT_ATTACHMENT_DELETE + updateInput.id + "/"
    );
    return { session: { data: data as any } };
  });
};


