import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:8080';

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api`,
    prepareHeaders: (headers, { getState }) => {
      // const token = getState().auth.user?.token;

      const token =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJmaXJzdE5hbWUiOiJCb2JieSIsImxhc3ROYW1lIjoiSm9uZXMiLCJpc3MiOiJhdXRoMCIsImlkIjoiMjQ0ZmRmNjYtNDI5ZS00ZDFiLTkxNTItNjE2Nzc1MTcyZTAxIiwiZXhwIjoxNjYyMDg4Mjc4LCJlbWFpbCI6ImJvYmJ5am9uZXNAdGVzdC5jb20iLCJ1c2VybmFtZSI6ImJvYmJ5am9uZXMifQ.ZvVZuPNdXl9Db9loAcwJlD1S0m53qshs5foA0RwGT5OOmBQYqVukEM4pQsAkE7NFNGU0Fzf16WXbEIl6py270bjtldu4Pu16gGOVqc6LUaGTfgW2wqHOizEK6qZEZWkOj48nQPOZDbedgQ_ahi88KgOJBo5NBFMCSYZ7nNUU12DgZQkNK1Wa1zcuJRC-zSP6VLeDM6EYVZQPyW-7gRTcNlC_f3EYmK5hsI_2_99Jfyjpyhww1-nRplFf0pIs0eejeZ062OszqYTuHKSPJ_mRZLMCDxlAyiwdzswrjVNIhIUfS2-W6Wpnag56PISQo-a89Xw3FcUPYaZYo1T0ezOxhg';

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
    retrieveChowRankings: build.mutation({
      query: () => {
        return {
          url: `/chow/ranking?limit=3`,
          method: 'GET',
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
  useRetrieveChowRankingsMutation,
} = apiSlice;

export { apiSlice };
