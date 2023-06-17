import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { TaskUpdateInput } from "types/task";

export const useUpdateTask = () => {
  return useMutation<any, Error, TaskUpdateInput>(async updateInput => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    };
    const { data } = await axios.post(
      process.env.REACT_APP_API_BASE_URL +
        Endpoints.TASK +
        updateInput.id +
        "/",
      updateInput,
      config
    );
    return { session: { data: data as any } };
  });
};

export const taskInput = (data: TaskUpdateInput): TaskUpdateInput => {
  return {
    id: data.id,
    project: data.project,
    files: data.files,
    name: data.name,
    description: data.description,
    user: data.user
  };
};
