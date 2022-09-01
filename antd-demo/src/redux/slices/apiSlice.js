import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:8080';

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api`,
    prepareHeaders: (headers, { getState }) => {
      // const token = getState().auth.user?.token;

      const token =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJmaXJzdE5hbWUiOiJCb2JieSIsImxhc3ROYW1lIjoiSm9uZXMiLCJpc3MiOiJhdXRoMCIsImlkIjoiMjQ0ZmRmNjYtNDI5ZS00ZDFiLTkxNTItNjE2Nzc1MTcyZTAxIiwiZXhwIjoxNjYyMDIzNTUwLCJlbWFpbCI6ImJvYmJ5am9uZXNAdGVzdC5jb20iLCJ1c2VybmFtZSI6ImJvYmJ5am9uZXMifQ.G2LwisR8CCoC01hFkrCHgwE4v2G-6J08KBErehyOnzpukbgwjDyhT5zgBEoKZpXp9pu8K0yC3SiA3vJAG7NfpUZ3znxZMwT8WqGCuCOTxi9kUb6Sr_LeEiDkqXkpFh_s-JjQPv28bgly4_6DbAsLlmBggA16lM7XTEOlrB45-kJoFWe2LlB5HZigzN19tR6UGqiFA3B78CfrbUZ2Nk-SLwr2rHxKi7kEq70v_79gNd8TMXihhz2mw3Z_K3HfEh78VfV2CP5i1_qTlGBIg1jjLW1kOj9axILd5qGmX_BgEFNJL-5QBL_tL1wRPRTxMLnqxYAYU6CR-mA7hUzuNJV_8w';

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
  }),
});

export const {
  useRetrieveChowCategoryOptionsQuery,
  useCreateNewChowMutation,
  useRetrieveChowListMutation,
  useUpdateChowMutation,
  useDeleteChowMutation,
  useRetrieveRandomChowMutation,
} = apiSlice;

export { apiSlice };
