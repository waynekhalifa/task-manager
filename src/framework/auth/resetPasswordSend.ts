import { useMutation } from "@tanstack/react-query";

import { http } from "utils/http";
import { Endpoints } from "enums/endpoints";
import { ResetPasswordSendInput } from "types/resetPasswordSend";

export const useResetPasswordSend = () => {
  return useMutation<any, Error, ResetPasswordSendInput>(
    async (createInput) => {
      const { data } = await http.post(
        Endpoints.RESET_PASSWORD_SEND,
        createInput
      );

      return data;
    }
  );
};
