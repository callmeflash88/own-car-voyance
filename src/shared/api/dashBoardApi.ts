import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../lib/axiosBaseQuery";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getDashboard: builder.query<any, void>({
      query: () => ({
        url: "admin/dashboard",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDashboardQuery } = dashboardApi;
