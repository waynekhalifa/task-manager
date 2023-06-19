import { useQuery } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { QueryOptionsType } from "types/queryOptions";
import http from "utils/http";

export const getAllPermissions = async ({ queryKey }: any) => {
  const { data } = await http.get(Endpoints.PERMISSION + "?limit=100");
  return { permissions: { data: data as any } };
};

export const usePermissionsQuery = (options: QueryOptionsType) => {
  return useQuery<{ permissions: { data: any } }, Error>(
    [Endpoints.PERMISSION, options],
    getAllPermissions
  );
};
