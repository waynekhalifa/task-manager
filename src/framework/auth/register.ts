import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { AuthRegisterInput } from "types/register";
import { Endpoints } from "enums/endpoints";
import { AuthFormValues } from "types/authForm";

export const useRegister = () => {
  return useMutation<any, Error, AuthRegisterInput>(async (createInput) => {
    const { data } = await axios.post(
      "https://" + createInput.backend_url + Endpoints.REGISTER,
      createInput
    );

    return { session: { data: data as any } };
  });
};

export const registerInput = (data: AuthFormValues): AuthRegisterInput => {
  return {
    backend_url: data.backend_url!,
    first_name: data.first_name,
    last_name: data.last_name,
    username: data.username,
    email: data.email,
    password1: data.password1,
    password2: data.password2,
  };
};
