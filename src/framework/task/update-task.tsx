import { useMutation } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { TaskUpdateInput } from "types/task";
import http from "utils/http";

export const useUpdateTask = () => {
  return useMutation<any, Error, TaskUpdateInput>(async updateInput => {
    const { data } = await http.post(
      Endpoints.TASK + updateInput.id + "/",
      updateInput
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
