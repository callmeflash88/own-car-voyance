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
    getUsers: builder.query<any, { page: number; perPage: number }>({
      query: ({ page, perPage }) => ({
        url: "admin/users/",
        method: "GET",
        params: {
          page: page.toString(),
          perPage: perPage.toString(),
        },
      }),
    }),
    blockUnblockUsers: builder.mutation<{ ids: [string] }, any>({
      query: (data) => ({
        url: "admin/users/blockUsers",
        method: "POST",
        body: data,
      }),
    }),
    deleteUsers: builder.mutation<{ ids: [string] }, any>({
      query: (data) => ({
        url: "admin/users/deleteUsers",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetDashboardQuery,
  useGetMostPopularMakesQuery,
  useGetUserRegistrationThisWeekQuery,
  useGetTopSalesQuery,
  useGetUsersQuery,
  useBlockUnblockUsersMutation,
  useDeleteUsersMutation,
} = dashboardApi;
