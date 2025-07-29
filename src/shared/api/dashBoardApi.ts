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
    getMostPopularMakes: builder.query<any, void>({
      query: () => ({
        url: "admin/dashboard/mostPopularMakes",
        method: "GET",
      }),
    }),
    getUserRegistrationThisWeek: builder.query<any, void>({
      query: () => ({
        url: "admin/dashboard/userRegistrationThisWeek",
        method: "GET",
      }),
    }),
    getTopSales: builder.query<any, void>({
      query: () => ({
        url: "admin/dashboard/topSales",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetDashboardQuery,
  useGetMostPopularMakesQuery,
  useGetUserRegistrationThisWeekQuery,
  useGetTopSalesQuery,
} = dashboardApi;
