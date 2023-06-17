import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { ProjectCreateInput } from "types/project";

export const useCreateCategory = () => {
  return useMutation<any, Error, ProjectCreateInput>(async createInput => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    };
    const { data } = await axios.post(
      process.env.REACT_APP_API_BASE_URL + Endpoints.PROJECT,
      createInput,
      config
    );
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
