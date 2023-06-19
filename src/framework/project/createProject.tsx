import { useMutation } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { Project } from "types/project";
import http from "utils/http";

export const useCreateProject = () => {
  return useMutation<any, Error, FormData>(async createInput => {
    const { data } = await http.post(Endpoints.PROJECT, createInput, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return { session: { data: data as any } };
  });
};

export const projectInput = (data: Project): FormData => {
  const formData = new FormData();

  formData.append("admin", `${data.admin}`);
  formData.append("name", data.name);
  formData.append("description", data?.description!);
  formData.append("category", `${data.category}`);
  formData.append("start_at", data.start_at);
  formData.append("end_at", data.end_at);
  if (!data.file) return formData;
  formData.append("file", data.file);
  return formData;
};
