import { useMutation } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { CategoryUpdateInput } from "types/category";
import http from "utils/http";

export const useUpdateCategory = () => {
  return useMutation<any, Error, CategoryUpdateInput>(async updateInput => {
    const { data } = await http.post(
      Endpoints.CATEGORY + updateInput.id + "/",
      updateInput
    );
    return { session: { data: data as any } };
  });
};

export const categoryInput = (
  data: CategoryUpdateInput
): CategoryUpdateInput => {
  return {
    name: data.name,
    base_category: data.base_category
  };
};
