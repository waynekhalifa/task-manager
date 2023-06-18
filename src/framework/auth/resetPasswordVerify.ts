import { useMutation } from "@tanstack/react-query";

import { http } from "utils/http";
import { Endpoints } from "enums/endpoints";
import { ResetPasswordVerifyInput } from "types/resetPasswordVerify";

export const useResetPasswordVerify = () => {
  return useMutation<any, Error, ResetPasswordVerifyInput>(
    async (createInput) => {
      const { data } = await http.post(
        Endpoints.RESET_PASSWORD_VERIFY,
        createInput
      );

      return data;
    }
  );
};
