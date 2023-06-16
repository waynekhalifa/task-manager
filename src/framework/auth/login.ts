import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { AuthLoginInput } from "types/login";
import { Endpoints } from "enums/endpoints";
import { AuthFormValues } from "types/authForm";

export const useLogin = () => {
  return useMutation<any, Error, AuthLoginInput>(async (createInput) => {
    const { data } = await axios.post(
      "https://" + createInput.backend_url + Endpoints.LOGIN,
      createInput
    );

    return { session: { data: data as any } };
  });
};

export const loginInput = (data: AuthFormValues): AuthLoginInput => {
  return {
    backend_url: data.backend_url!,
    username: data.username,
    password: data.password1,
  };
};
