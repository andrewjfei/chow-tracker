import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:8080';

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api`,
    prepareHeaders: (headers, { getState }) => {
      // const token = getState().auth.user?.token;

      const token =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJmaXJzdE5hbWUiOiJCb2JieSIsImxhc3ROYW1lIjoiSm9uZXMiLCJpc3MiOiJhdXRoMCIsImlkIjoiMjQ0ZmRmNjYtNDI5ZS00ZDFiLTkxNTItNjE2Nzc1MTcyZTAxIiwiZXhwIjoxNjYyMDMwNzE4LCJlbWFpbCI6ImJvYmJ5am9uZXNAdGVzdC5jb20iLCJ1c2VybmFtZSI6ImJvYmJ5am9uZXMifQ.N32LLCHxcB-iezRNVPNh9HnerlO6xT2hEfhXhURLMnfLyFwekZeHD3fO6_huz1HadBp03VM9SdEzv22BG2-4d8s1OwN-1YHmy7zXAefw_uHhKRaQk9MCNT-VT5qCoRCsdgZrCfG7yTCWxvwa3NvQEVazot6gC8H-clJ_gZo9CJKR_mAqe6DhVVrV9IS8wVW1tWkDXkcmCC-iB39uIFaOMZoJ5NW-iRgMN_EcaGbrCGxUa88lFfA2Earh8Enpxj_rdzNpr8qQPJQ7BLuaIgS3uc_13yuHzoyZKb5NY5OyKnkm9qJ-0JMits5DK-mkWNiT-XNyxoWOqxcfbSnXScqOcA';

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    retrieveChowCategoryOptions: build.query({
      query: () => ({
        url: `/chow/category-options`,
        method: 'GET',
      }),
    }),
    createNewChow: build.mutation({
      query: (newChow) => ({
        url: `/chow`,
        method: 'POST',
        body: newChow,
      }),
    }),
    retrieveChowList: build.mutation({
      query: ({ searchString, cuisineList, priceRangeList, areaList }) => ({
        url: `/chow?searchString=${searchString}&cuisineList=${cuisineList}&priceRangeList=${priceRangeList}&areaList=${areaList}`,
        method: 'GET',
      }),
    }),
    updateChow: build.mutation({
      query: (updatedChow) => {
        const { id, ...chow } = updatedChow;
        return {
          url: `/chow/${id}`,
          method: 'PUT',
          body: chow,
        };
      },
    }),
    deleteChow: build.mutation({
      query: ({ id }) => {
        return {
          url: `/chow/${id}`,
          method: 'DELETE',
        };
      },
    }),
    retrieveRandomChow: build.mutation({
      query: (chowList) => {
        return {
          url: `/chow/random`,
          method: 'POST',
          body: chowList,
        };
      },
    }),
    visitChow: build.mutation({
      query: ({ id }) => {
        return {
          url: `/chow/${id}/visit`,
          method: 'PATCH',
        };
      },
    }),
  }),
});

export const {
  useRetrieveChowCategoryOptionsQuery,
  useCreateNewChowMutation,
  useRetrieveChowListMutation,
  useUpdateChowMutation,
  useDeleteChowMutation,
  useRetrieveRandomChowMutation,
  useVisitChowMutation,
} = apiSlice;

export { apiSlice };
