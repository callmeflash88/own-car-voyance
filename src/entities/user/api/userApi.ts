import { axiosBaseQuery } from "@/shared/lib/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getUser: builder.query<any, void>({
      query: () => ({
        url: "user/profile",
      }),
    }),
  }),
});

export const { useGetUserQuery } = userApi;
