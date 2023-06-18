import { useMutation } from "@tanstack/react-query";

import { http } from "utils/http";
import { Endpoints } from "enums/endpoints";
import { RefreshTokenInput } from "types/refreshToken";

export const useRefreshToken = () => {
  return useMutation<any, Error, RefreshTokenInput>(async (createInput) => {
    const { data } = await http.post(Endpoints.TOKEN_REFRESH, createInput);

    return data;
  });
};
