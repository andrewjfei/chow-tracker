import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:8080';

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api`,
    prepareHeaders: (headers, { getState }) => {
      // const token = getState().auth.user?.token;

      const token =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJmaXJzdE5hbWUiOiJCb2JieSIsImxhc3ROYW1lIjoiSm9uZXMiLCJpc3MiOiJhdXRoMCIsImlkIjoiMjQ0ZmRmNjYtNDI5ZS00ZDFiLTkxNTItNjE2Nzc1MTcyZTAxIiwiZXhwIjoxNjYyMDAyMDIyLCJlbWFpbCI6ImJvYmJ5am9uZXNAdGVzdC5jb20iLCJ1c2VybmFtZSI6ImJvYmJ5am9uZXMifQ.f1ETneoidOeVGv5DC9gJMWnLkXqgVU1gbAS1T_htKPfjkVSpWujTqQg4GOx_Qq1B1KdBR61cOeG3nfn8HVtEoCJIO_ZRCup9NlwaD4wHp_51HOVsS9AeU_43jKXBC8P3RmAKm9fgNQrT1PD4f-IgzkADdnbVUAWX5GAVdKO0nt3zU380nM236W_wralko3rBsQY-6EhEqdR0mXYMlSxTzefF7bu3s2s5jMan4ei-I4paZCC7-glfEKLRK2CsMPa6LUb3JdCIKDXkNOlKsZ5D5hwqp5UoW6HjFr1Q4eSqt8QDTumT5ve8Np80h0ulXKJj6Ig1AFvvEOX8iFO8xlMGMg';

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
  }),
});

export const {
  useRetrieveChowCategoryOptionsQuery,
  useCreateNewChowMutation,
  useRetrieveChowListMutation,
  useUpdateChowMutation,
  useDeleteChowMutation,
} = apiSlice;

export { apiSlice };
