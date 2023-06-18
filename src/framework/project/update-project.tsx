import { useMutation } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { Project } from "types/project";
import http from "utils/http";

export const useUpdateProject = () => {
  return useMutation<any, Error, Project>(async updateInput => {
    const { data } = await http.post(
      Endpoints.PROJECT + updateInput.id + "/",
      updateInput
    );
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
  for (let i = 0; i < data.files.length; i++) {
    formData.append("files", data.files[i]);
  } 
  return formData;
  // return {
  //   id: data.id,
  //   admin: data.admin,
  //   name: data.name,
  //   description: data.description,
  //   category: data.category,
  //   start_at: data.start_at,
  //   end_at: data.end_at,
  //   files: data.files,
  // };
};
