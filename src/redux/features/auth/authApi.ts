import { baseApi } from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/admin/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    getData: builder.query({
      query: () => ({
        url: "/category",
        method: "GET",
      }),
    }),
  }),
});
export const { useLoginMutation, useGetDataQuery } = authApi;
