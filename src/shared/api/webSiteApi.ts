import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQueryWithReauth } from "../lib/axiosBaseQuery";
import { CarById, VehicleAd } from "../types/car";

export interface FindCarRequest {
  page?: number;
  perPage?: number;
  condition?: string[];
  make?: string[];
  body_style?: string[];
  price?: {
    from?: number;
    to?: number;
  };
  year?: {
    from?: number;
    to?: number;
  };
  sort?: {
    key?: string;
    value?: "asc" | "desc";
  };
}

export interface FindCarResponse {
  ads: VehicleAd[];
  total: number;
  page: number;
  perPage: number;
}

export interface FiltersResponse {
  makes: string[];
  models: string[];
  body_styles: string[];
  conditions: string[];
  years: number[];
  priceRange: { min: number; max: number };
}

export const webSiteApi = createApi({
  reducerPath: "webSiteApi",
  baseQuery: axiosBaseQueryWithReauth,
  endpoints: (builder) => ({
    findCar: builder.mutation<any, FindCarRequest>({
      query: (body) => ({
        url: "website/findCar",
        method: "POST",
        body,
      }),
    }),

    findCarById: builder.query<CarById, string>({
      query: (id) => ({
        url: `website/getCar/${id}`,
        method: "GET",
      }),
    }),

    getFindCarsFilters: builder.query<any, void>({
      query: () => ({
        url: "website/getFindCarsFilters",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useFindCarMutation,
  useFindCarByIdQuery,
  useGetFindCarsFiltersQuery,
} = webSiteApi;
