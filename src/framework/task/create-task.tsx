import { useMutation } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { Task } from "types/task";
import http from "utils/http";

export const useCreateTask = () => {
  return useMutation<any, Error, Task>(async createInput => {
    const { data } = await http.post(Endpoints.TASK, createInput);
    return { session: { data: data as any } };
  });
};

export const taskInput = (data: Task): Task => {

  return {
    name: data.name,
    description: data.description,
    task_priority: data.task_priority,
    user: data.user,
    project: data.project,
    start_at: data.start_at,
    end_at: data.end_at,
  } as Task;
};
