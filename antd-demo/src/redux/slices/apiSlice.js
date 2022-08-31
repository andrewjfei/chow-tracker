import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:8080';

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api`,
    prepareHeaders: (headers, { getState }) => {
      // const token = getState().auth.user?.token;

      const token =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJmaXJzdE5hbWUiOiJCb2JieSIsImxhc3ROYW1lIjoiSm9uZXMiLCJpc3MiOiJhdXRoMCIsImlkIjoiMjQ0ZmRmNjYtNDI5ZS00ZDFiLTkxNTItNjE2Nzc1MTcyZTAxIiwiZXhwIjoxNjYxOTg0NjM5LCJlbWFpbCI6ImJvYmJ5am9uZXNAdGVzdC5jb20iLCJ1c2VybmFtZSI6ImJvYmJ5am9uZXMifQ.ct6L9acqaBTG58-Yp_5go_JXXAnYGT0VQ96bN26B0BO9yxcFfL55jjmAq3RMQqgzpBHptPuvnOmhrjViKrZmq5qAqwhPVqZkVkVS13524hJdqZ0RHZsiYcgTL6WrpDRV4zaoUMY0xRWhLv_62xwOfXvRBVcCsISWf7Nn-2pZSTLt_OSkOVN3R_mbok4sWRon_JHb3s1kNks2y3Zvhn3NhGpnXZm0DqM2Af1UAmlw2mTCapf578JiEIfwpfmZLPvwKsMkvR7okxtGRVW_S7fDBPDdpne6ixk3wrxwSUfR-3BycnBrskbJg4ShzPVuYE9bMF0xIyK0BIOjjoxbM_UYig';

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
  }),
});

export const {
  useRetrieveChowCategoryOptionsQuery,
  useCreateNewChowMutation,
  useRetrieveChowListMutation,
} = apiSlice;

export { apiSlice };
