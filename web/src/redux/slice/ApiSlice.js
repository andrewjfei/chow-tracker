import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:8080';

console.log(BASE_URL);

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.user?.token;

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => ({
        url: `/auth/login`,
        method: `POST`,
        body,
      }),
    }),
    getChowList: build.mutation({
      query: (params) => ({
        url: `/chow?searchString=${
          params.searchString
        }&cuisineList=${params.cuisineList.toString()}&priceRangeList=${params.priceRangeList.toString()}&areaList=${params.areaList.toString()}`,
        method: 'GET',
      }),
    }),
    getPopularityChowRanking: build.query({
      query: (params) => ({
        url: `/chow/ranking/popularity?limit=3`,
        method: 'GET',
      }),
    }),
    getCuisineChowRanking: build.query({
      query: (params) => ({
        url: `/chow/ranking/cuisine?limit=3`,
        method: 'GET',
      }),
    }),
    getPriceRangeChowRanking: build.query({
      query: (params) => ({
        url: `/chow/ranking/price-range?limit=3`,
        method: 'GET',
      }),
    }),
    getAreaChowRanking: build.query({
      query: (params) => ({
        url: `/chow/ranking/area?limit=3`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetChowListMutation,
  useGetPopularityChowRankingQuery,
  useGetCuisineChowRankingQuery,
  useGetPriceRangeChowRankingQuery,
  useGetAreaChowRankingQuery,
} = apiSlice;
