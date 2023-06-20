import { useMutation } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { PermissionUpdateInput } from "types/permission";
import http from "utils/http";

export const useUpdatePermissions = () => {
  return useMutation<any, Error, PermissionUpdateInput>(async createInput => {
    const { data } = await http.put(Endpoints.PERMISSION, createInput);
    return { session: { data: data as any } };
  });
};

export const permissionsInput = (
  data: PermissionUpdateInput
): PermissionUpdateInput => {
  return {
    user: data.user!,
    add: data.add!,
    remove: data.remove!
  };
};
