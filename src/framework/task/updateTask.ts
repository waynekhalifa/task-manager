import { useMutation } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import http from "utils/http";

export const useUpdateTask = () => {
  return useMutation<any, Error, any>(async (updateInput) => {
    const { data } = await http.patch(
      Endpoints.TASK + updateInput.id + "/",
      updateInput
    );
    return { session: { data: data as any } };
  });
};
