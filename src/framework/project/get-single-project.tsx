import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { QueryOptionsType } from "types/queryOptions";

export const getSingleProject = async ({ queryKey }: any) => {
  const [_params] = queryKey;

  const { data } = await axios.get(
    process.env.REACT_APP_API_BASE_URL + Endpoints.PROJECT + _params.id + "/"
  );
  return { project: { data: data as any } };
};

export const useSingleProject = (options: QueryOptionsType) => {
  return useQuery<{ project: { data: any } }, Error>(
    [Endpoints.PROJECT, options],
    getSingleProject
  );
};
