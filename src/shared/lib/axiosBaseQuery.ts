import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { AxiosRequestConfig, AxiosError } from "axios";
import { instance } from "./api-client";

export const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      body?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
    },
    unknown,
    { status: number; data: any }
  > =>
  async ({ url, method = "GET", body, params }) => {
    try {
      const result = await instance({
        url,
        method,
        data: body,
        params,
      });

      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      console.error("Error:", {
        status: err.response?.status || 500,
        data: err.response?.data || err.message,
      });
      return {
        error: {
          status: err.response?.status || 500,
          data: err.response?.data || err.message,
        },
      };
    }
  };
