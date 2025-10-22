import { baseApi } from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (search: string = "") => ({
        url: `admin/users?search=${search}&role=customer`,
        method: "GET",
      }),
    }),
    getConstrutor: builder.query({
      query: (search: string = "") => ({
        url: `admin/users?search=${search}&role=contractor`,
        method: "GET",
      }),
    }),
  }),
});
export const { useGetUserQuery, useGetConstrutorQuery } = authApi;
