import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { TaskCreateInput } from "types/task";

export const useCreateTask = () => {
  return useMutation<any, Error, TaskCreateInput>(async createInput => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    };
    const { data } = await axios.post(
      process.env.REACT_APP_API_BASE_URL + Endpoints.TASK,
      createInput,
      config
    );
    return { session: { data: data as any } };
  });
};

export const taskInput = (data: TaskCreateInput): TaskCreateInput => {
  return {
    project: data.project,
    files: data.files,
    name: data.name,
    description: data.description,
    user: data.user
  };
};
