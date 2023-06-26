import { useMutation } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { CreateGroup } from "types/group";
import http from "utils/http";

export const useCreateGroup = () => {
  return useMutation<any, Error, CreateGroup>(async createInput => {
    const { data } = await http.post(Endpoints.GROUP, createInput);
    return { session: { data: data as any } };
  });
};

export const groupInput = (data: CreateGroup): CreateGroup => {
  return {
    name: data.name!,
    users: data.users!,
    description: data.description!,
    permissions: data.permissions!
  }
};