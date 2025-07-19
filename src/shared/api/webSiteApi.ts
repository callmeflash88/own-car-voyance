import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../lib/axiosBaseQuery";
import { CarById, VehicleAd } from "../types/car";

export const webSiteApi = createApi({
  reducerPath: "webSiteApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    findCar: builder.query<any, void>({
      query: () => ({
        url: `website/findCar`,
        method: "GET",
      }),
    }),
    findCarById: builder.query<CarById, string>({
      query: (id) => ({
        url: `website/getCar/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useFindCarQuery, useFindCarByIdQuery } = webSiteApi;
