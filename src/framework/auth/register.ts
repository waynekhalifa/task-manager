import { useMutation } from "@tanstack/react-query";
import { AuthRegisterInput } from "types/register";
import { Endpoints } from "enums/endpoints";
import { http } from "utils/http";

export const useRegister = () => {
  return useMutation<any, Error, AuthRegisterInput>(async (createInput) => {
    const { data } = await http.post(Endpoints.REGISTER, createInput);

    return data;
  });
};
