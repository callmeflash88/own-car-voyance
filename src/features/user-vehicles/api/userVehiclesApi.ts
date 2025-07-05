import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserVehicle, Vehicle } from "@/entities/vehicle/model/types";

export const userVehiclesApi = createApi({
  reducerPath: "userVehiclesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getMyVehicles: builder.query<UserVehicle[], void>({
      query: () => "user/car/getMyCars",
    }),
  }),
});

export const { useGetMyVehiclesQuery } = userVehiclesApi;
