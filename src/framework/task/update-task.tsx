import { useMutation } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { SelectedTask } from "types/task";
import http from "utils/http";

export const useUpdateTask = () => {
  return useMutation<any, Error, SelectedTask>(async updateInput => {
    const { data } = await http.post(
      Endpoints.TASK + updateInput.id + "/",
      updateInput
    );
    return { session: { data: data as any } };
  });
};

export const taskInput = (data: SelectedTask): SelectedTask => {
  return {} as SelectedTask;
};
