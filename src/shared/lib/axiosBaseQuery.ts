import { BaseQueryApi, BaseQueryFn, FetchArgs } from "@reduxjs/toolkit/query";
import { AxiosRequestConfig, AxiosError } from "axios";
import { instance } from "./api-client";
import { logout } from "@/features/auth/model/slice";
import { clearUser } from "@/entities/user/model/userSlice";
import { MAIN_ROUTES } from "@/lib/routes";

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

export const axiosBaseQueryWithReauth = async (
  args: FetchArgs,
  api: BaseQueryApi,
  extraOptions: Record<string, any>
) => {
  const result = await axiosBaseQuery()(args, api, extraOptions);

  if (result.error?.status === 401) {
    // todo: refresh token

    // reset user state
    api.dispatch(logout());
    api.dispatch(clearUser());

    // redirect to login
    if (typeof window !== undefined) {
      window.location.replace(
        `${MAIN_ROUTES.LOGIN}?redirect=${window.location.pathname}`
      );
    }
  }

  return result;
};
