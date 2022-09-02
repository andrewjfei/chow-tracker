import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:8080';

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api`,
    prepareHeaders: (headers, { getState }) => {
      // const token = getState().auth.user?.token;

      const token =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJmaXJzdE5hbWUiOiJCb2JieSIsImxhc3ROYW1lIjoiSm9uZXMiLCJpc3MiOiJhdXRoMCIsImlkIjoiMjQ0ZmRmNjYtNDI5ZS00ZDFiLTkxNTItNjE2Nzc1MTcyZTAxIiwiZXhwIjoxNjYyMDczMTYzLCJlbWFpbCI6ImJvYmJ5am9uZXNAdGVzdC5jb20iLCJ1c2VybmFtZSI6ImJvYmJ5am9uZXMifQ.SnkpWrTKnyas08qs2T74VlNCRoG5d3LJHwtEoBQri8hIMnYcH-wSLejtySpw-CXdxON32B2TWktDdgyIzDP-6WSQpfxf2-YEPFKQ9oAcUP1XchnKX_ZOjGzgJtggYPTG1WmzYXt0v2XI_ZwUi1SIs_mMgeLsyJYofXm2SyHOdiN4nkC1lSkKgadcBPdATNL4g-_me7O5JYpRGSa1pqv5Qt8w27y_JVmR2G1u21nMwu_J2aImXdPmx35lI77JkeHyVUjraTYmKqA6zOaHxEnWAYdRny1FAvOYQgtjIrUnYZ3_s4mR_1MHFeF4Bd7SImECyuoLS3RviniRlsqK2HJvtA';

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
    retrieveChowPopularityRanking: build.query({
      query: () => {
        return {
          url: `/chow/ranking/popularity?limit=3`,
          method: 'GET',
        };
      },
    }),
    retrieveChowCuisineRanking: build.query({
      query: () => {
        return {
          url: `/chow/ranking/cuisine?limit=3`,
          method: 'GET',
        };
      },
    }),
    retrieveChowPriceRangeRanking: build.query({
      query: () => {
        return {
          url: `/chow/ranking/price-range?limit=3`,
          method: 'GET',
        };
      },
    }),
    retrieveChowAreaRanking: build.query({
      query: () => {
        return {
          url: `/chow/ranking/area?limit=3`,
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
  useRetrieveChowPopularityRankingQuery,
  useRetrieveChowCuisineRankingQuery,
  useRetrieveChowPriceRangeRankingQuery,
  useRetrieveChowAreaRankingQuery,
} = apiSlice;

export { apiSlice };
