import { useMutation } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { Group } from "types/group";
 import http from "utils/http";

export const useDeleteGroup = () => {
  return useMutation<any, Error, any>(async updateInput => {
    const { data } = await http.delete(
      Endpoints.GROUP + updateInput.id + "/"
    );
    return { session: { data: data as any } };
  });
};


