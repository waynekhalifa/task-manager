import { useMutation } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { SelectedTask } from "types/task";
import http from "utils/http";

export const useUpdateTask = () => {
  return useMutation<any, Error, SelectedTask>(async updateInput => {
    const { data } = await http.patch(
      Endpoints.TASK + updateInput.id + "/",
      updateInput
    );
    return { session: { data: data as any } };
  });
};

export const taskInput = (data: SelectedTask): SelectedTask => {
  return {
    id: data.id,
    project: data.project,
    name: data.name,
    description: data.description,
    task_priority: data.task_priority,
    task_progress: data.task_progress,
    user: data.user,
    group: data?.group?.id,
    start_at: data.start_at,
    end_at: data.end_at,
  } as SelectedTask;
};
