import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:8080';

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.user?.token;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    autoLoginUser: build.mutation({
      query: (token) => ({
        url: `/auth/auto-login`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    loginUser: build.mutation({
      query: (authCredentials) => ({
        url: `/auth/login`,
        method: 'POST',
        body: authCredentials,
      }),
    }),
    registerUser: build.mutation({
      query: (newUser) => ({
        url: `/user/register`,
        method: 'POST',
        body: newUser,
      }),
    }),
    retrieveChowCategoryOptions: build.mutation({
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
  useAutoLoginUserMutation,
  useLoginUserMutation,
  useRegisterUserMutation,
  useRetrieveChowCategoryOptionsMutation,
  useCreateNewChowMutation,
  useRetrieveChowListMutation,
  useUpdateChowMutation,
  useDeleteChowMutation,
  useRetrieveRandomChowMutation,
  useVisitChowMutation,
  useRetrieveChowRankingsMutation,
} = apiSlice;

export { apiSlice };
