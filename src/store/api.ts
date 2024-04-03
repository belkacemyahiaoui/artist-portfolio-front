import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { VideoInstance } from "../types";

export const videoApi = createApi({
  reducerPath: "videoApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ["Video"],
  endpoints: (builder) => ({
    getPerfomances: builder.query<VideoInstance[], null>({
      query: () => `videos/`,
      providesTags: ["Video"],
    }),
    savePerfomance: builder.mutation<VideoInstance, FormData>({
      query: (body) => ({
        url: `videos/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Video"],
    }),
    updatePerfomance: builder.mutation<VideoInstance, any>({
      query: ({ body, id }) => ({
        url: `videos/${id}/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Video"],
    }),
    deletePerfomance: builder.mutation<VideoInstance, number>({
      query: (id) => ({
        url: `videos/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Video"],
    }),
  }),
});

export const {
  useGetPerfomancesQuery,
  useSavePerfomanceMutation,
  useUpdatePerfomanceMutation,
  useDeletePerfomanceMutation,
} = videoApi;
