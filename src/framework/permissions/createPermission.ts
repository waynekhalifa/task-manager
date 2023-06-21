import { useMutation } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { PermissionCreateInput } from "types/permission";
import http from "utils/http";

export const useCreatePermission = () => {
  return useMutation<any, Error, PermissionCreateInput>(async createInput => {
    const { data } = await http.post(Endpoints.PERMISSION, createInput);
    return { session: { data: data as any } };
  });
};

export const permissionsInput = (
  data: PermissionCreateInput
): PermissionCreateInput => {
  return {
    name: data.name,
    base_category: data.base_category!
  };
};
