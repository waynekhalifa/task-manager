import { useMutation } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { TaskCreateInput } from "types/task";
import http from "utils/http";

export const useCreateTask = () => {
  return useMutation<any, Error, TaskCreateInput>(async createInput => {
    const { data } = await http.post(Endpoints.TASK, createInput);
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
