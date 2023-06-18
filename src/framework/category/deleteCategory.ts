import { useMutation } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { CategoryUpdateInput } from "types/category";
import http from "utils/http";

export const useDeleteCategory = () => {
  return useMutation<any, Error, CategoryUpdateInput>(async updateInput => {
    const { data } = await http.delete(
      Endpoints.CATEGORY + updateInput.id + "/"
    );
    return { session: { data: data as any } };
  });
};

export const categoryInput = (
  data: CategoryUpdateInput
): CategoryUpdateInput => {
  return {
    id: data.id,
    name: data.name,
  };
};
