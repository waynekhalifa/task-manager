import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { CategoryCreateInput } from "types/category";

export const useCreateCategory = () => {
  return useMutation<any, Error, CategoryCreateInput>(async createInput => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    };
    const { data } = await axios.post(
      process.env.REACT_APP_API_BASE_URL + Endpoints.CATEGORY,
      createInput,
      config
    );
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
