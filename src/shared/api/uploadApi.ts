import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQueryWithReauth } from "@/shared/lib/axiosBaseQuery";

interface Response {
  result: {
    id: number;
    url: string;
    type: string;
    file_name: string;
    created_at: string;
  };
}

export const uploadApi = createApi({
  reducerPath: "uploadApi",
  baseQuery: axiosBaseQueryWithReauth,
  endpoints: (builder) => ({
    uploadFile: builder.mutation<Response, File>({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", "avatar"); // 👈 додай type

        return {
          url: "upload/uploadFile",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const { useUploadFileMutation } = uploadApi;
