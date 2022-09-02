import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:8080';

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api`,
    prepareHeaders: (headers, { getState }) => {
      // const token = getState().auth.user?.token;

      const token =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJmaXJzdE5hbWUiOiJCb2JieSIsImxhc3ROYW1lIjoiSm9uZXMiLCJpc3MiOiJhdXRoMCIsImlkIjoiMjQ0ZmRmNjYtNDI5ZS00ZDFiLTkxNTItNjE2Nzc1MTcyZTAxIiwiZXhwIjoxNjYyMDk1ODk2LCJlbWFpbCI6ImJvYmJ5am9uZXNAdGVzdC5jb20iLCJ1c2VybmFtZSI6ImJvYmJ5am9uZXMifQ.Do7ruZivfZOGUAlv3BTN2AA-yuqQ_lGEr-0awwPiTB7SlLGxT8c53v4su3XY8Bubm36DpWMxHN81oDuwGm9hrKTbqMT2F7-pZ_JVnGAYjqFXGDbwxxeYs9-m7VZ6YslyzsMh-4Dv8t7olUFCDjBO1vfbU9WMhPWuE5lXluZBnBC_w146gMV1723k7uEFJfBVwuyLxf0dJhCR3tYVe5DM3TBlz8FqlyXh5BLDpAWGD293XdVV4aMFG6yesRpCkAPk3DNnLDO0ciXhfneRhbd_6HCexrGG_fddVl02nv7j6IAsroEBTdM32QaRXsadDBo9b9nhQqY3glPKwaOgPifkjA';

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
