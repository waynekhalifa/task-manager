import { useMutation } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { SelectedTask } from "types/task";
import http from "utils/http";

export const useDeleteTask = () => {
  return useMutation<any, Error, SelectedTask>(async updateInput => {
    const { data } = await http.delete(
      Endpoints.TASK + updateInput.id + "/"
    );
    return { session: { data: data as any } };
  });
};


