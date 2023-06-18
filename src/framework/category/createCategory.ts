import { useMutation } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { CategoryCreateInput } from "types/category";
import http from "utils/http";

export const useCreateCategory = () => {
  return useMutation<any, Error, CategoryCreateInput>(async createInput => {
    const { data } = await http.post(Endpoints.CATEGORY, createInput);
    return { session: { data: data as any } };
  });
};

export const categoryInput = (
  data: CategoryCreateInput
): CategoryCreateInput => {
  return {
    name: data.name,
    base_category: data.base_category!
  };
};
