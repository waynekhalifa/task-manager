import { useMutation } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import http from "utils/http";

export const useUpdatePermissions = () => {
  return useMutation<any, Error, any>(async createInput => {
    const { data } = await http.put(Endpoints.PERMISSION, createInput);
    return { session: { data: data as any } };
  });
};

export const permissionsInput = (
  data: any
): any => {
  return {
    user: data.user!,
    add: data.add!,
    remove: data.remove!
  };
};
