import { useMutation } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { Group } from "types/group";
import http from "utils/http";

export const useUpdateGroup = () => {
  return useMutation<any, Error, Group>(async updateInput => {
    const { data } = await http.patch(
      Endpoints.GROUP + updateInput.id + "/",
      updateInput
    );
    return { session: { data: data as any } };
  });
};

export const groupInputUpdate = (
  data: Group
): Group => {
  return {
    id: data.id,
    name: data.name,
    permissions: data.permissions,
    description: data.description,
    users: data.users
  };
};
