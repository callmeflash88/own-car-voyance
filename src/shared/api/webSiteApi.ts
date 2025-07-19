import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../lib/axiosBaseQuery";

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
  }),
});

export const { useFindCarQuery } = webSiteApi;
