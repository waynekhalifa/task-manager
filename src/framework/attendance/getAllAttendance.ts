import { useQuery } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { QueryOptionsType } from "types/queryOptions";
import http from "utils/http";

export const getAllAttendance = async ({ queryKey }: any) => {
  const { data } = await http.get(Endpoints.ATTENDANCE + "?limit=10");
  return data;
};

export const useAttendanceQuery = (options: QueryOptionsType) => {
  return useQuery<{ data: any }, Error>(
    [Endpoints.ATTENDANCE, options],
    getAllAttendance
  );
};
