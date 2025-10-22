import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
const baseQuery = fetchBaseQuery({
  baseUrl: "http://10.10.13.40:4000/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    console.log(token);
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    } else {
      console.log("token not found");
    }
    console.log(token);
    return headers;
  },
});
const customBaseQueryWithRefreshtoken = async (args, api, extraoptions) => {
  const results = await baseQuery(args, api, extraoptions);
  console.log(results);
  return results;
};
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: customBaseQueryWithRefreshtoken,
  endpoints: () => ({}),
});
