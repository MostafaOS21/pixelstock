import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import prepareHeaders from "./prepareHeaders";
import { API_BASE_URL } from "@/constants";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders,
  }),
  endpoints: (builder) => ({
    getCuratedPhotos: builder.query({
      query: ({
        page = 1,
        per_page = 15,
      }: {
        page: number;
        per_page?: number;
      }) => `/curated?page=${page}&per_page=${per_page}`,
    }),
    getSinglePhoto: builder.query({
      query: ({ id }: { id: string | undefined }) => `/photos/${id}`,
    }),
    getSimilarPhotos: builder.query({
      query: ({
        query,
        nextUrl,
        color,
        page = 1,
      }: {
        query: string;
        nextUrl?: string | null;
        color?: string;
        page?: number;
      }) => {
        if (nextUrl) return nextUrl;
        if (!color) return `/search?query='${query}'&page=${page}`;
        return `/search?query='${query}'&color=${color}`;
      },
      merge: (currentCache, newItems) => {
        currentCache.photos.push(...newItems.photos);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getPopularVideos: builder.query({
      query: ({
        page = 1,
        per_page = 15,
      }: {
        page: number;
        per_page: number;
      }) => `/videos/popular?page=${page}&per_page=${per_page}`,
    }),
    getSimilarVideos: builder.query({
      query: ({ query }: { query: string }) =>
        `/videos/search?query='${query}'`,
    }),
    getSingleVideo: builder.query({
      query: ({ id }: { id: string | undefined }) => `/videos/videos/${id}`,
    }),
    getFeaturedCollections: builder.query({
      query: ({
        page = 1,
        per_page = 15,
      }: {
        page: number;
        per_page: number;
      }) => `/collections/featured?page=${page}&per_page=${per_page}`,
    }),
  }),
});

export const {
  useGetCuratedPhotosQuery,
  useLazyGetCuratedPhotosQuery,
  useGetSinglePhotoQuery,
  useGetSimilarPhotosQuery,
  useLazyGetSimilarPhotosQuery,
  useGetPopularVideosQuery,
  useGetSingleVideoQuery,
  useGetSimilarVideosQuery,
  useGetFeaturedCollectionsQuery,
} = apiSlice;
