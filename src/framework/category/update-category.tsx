import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { CategoryUpdateInput } from "types/category";

export const useUpdateCategory = () => {
  return useMutation<any, Error, CategoryUpdateInput>(async updateInput => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    };
    const { data } = await axios.post(
      process.env.REACT_APP_API_BASE_URL +
        Endpoints.CATEGORY +
        updateInput.id +
        "/",
      updateInput,
      config
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
    base_category: data.base_category
  };
};
