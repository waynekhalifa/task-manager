import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { QueryOptionsType } from "types/queryOptions";

export const getSingleTask = async ({ queryKey }: any) => {
  const [_params] = queryKey;

  const { data } = await axios.get(
    process.env.REACT_APP_API_BASE_URL + Endpoints.TASK + _params.id + "/"
  );
  return { task: { data: data as any } };
};

export const useSingleTask = (options: QueryOptionsType) => {
  return useQuery<{ task: { data: any } }, Error>(
    [Endpoints.TASK, options],
    getSingleTask
  );
};
