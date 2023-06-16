import { useMutation } from "@tanstack/react-query";
import { AuthLoginInput } from "types/login";
import { Endpoints } from "enums/endpoints";
import { http } from "utils/http";

export const useLogin = () => {
  return useMutation<any, Error, AuthLoginInput>(async (createInput) => {
    const { data } = await http.post(Endpoints.LOGIN, createInput);

    return data;
  });
};
