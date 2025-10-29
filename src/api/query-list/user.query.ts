import { axiosInstance } from "@/utils/axios";
import { GetUsersParams, UsersResponse } from "../api-types/user.types";

export const getUsers = async (params?: GetUsersParams): Promise<UsersResponse> => {
  const { data } = await axiosInstance.get<UsersResponse>("/users", { params });
  return data;
};
