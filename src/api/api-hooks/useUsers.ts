import { useQuery } from "@tanstack/react-query";
import { GetUsersParams } from "../api-types/user.types";
import { getUsers } from "../query-list/user.query";

export const useUsers = (params?: GetUsersParams) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => getUsers(params),
  });
};
