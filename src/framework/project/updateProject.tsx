import { useMutation } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { SelectedProject } from "types/project";
import http from "utils/http";

export const useUpdateProject = () => {
  return useMutation<any, Error, any>(async updateInput => {
    const { data } = await http.patch(
      Endpoints.PROJECT + updateInput.id + "/",
      updateInput.data, {
      headers: {
        "Content-Type": "multipart/form-data,  Application/json",
      },
    }

    );
    return { session: { data: data as any } };
  });
};

export const projectUpdateInput = (data: SelectedProject): any => {
  if (!data.file.size) {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      category: data.category,
      start_at: data.start_at,
      end_at: data.end_at,
      admin: data.admin,
      group: data?.group,
    } as SelectedProject;
  }
  const formData = new FormData();
  formData.append("name", data?.name!);
  formData.append("description", data?.description!);
  formData.append("category", `${data?.category!}`);
  formData.append("start_at", data?.start_at!);
  formData.append("end_at", data?.end_at!);
  formData.append("admin", `${data?.admin!}`);
  formData.append("group", `${data.group}`);
  formData.append("file", data.file);

  return formData;
};