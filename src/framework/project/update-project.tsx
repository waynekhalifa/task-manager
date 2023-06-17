import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { ProjectUpdateInput } from "types/project";

export const useUpdateProject = () => {
  return useMutation<any, Error, ProjectUpdateInput>(async updateInput => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    };
    const { data } = await axios.post(
      process.env.REACT_APP_API_BASE_URL +
        Endpoints.PROJECT +
        updateInput.id +
        "/",
      updateInput,
      config
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
