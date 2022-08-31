import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:8080';

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api`,
    prepareHeaders: (headers, { getState }) => {
      // const token = getState().auth.user?.token;

      const token =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJmaXJzdE5hbWUiOiJCb2JieSIsImxhc3ROYW1lIjoiSm9uZXMiLCJpc3MiOiJhdXRoMCIsImlkIjoiMjQ0ZmRmNjYtNDI5ZS00ZDFiLTkxNTItNjE2Nzc1MTcyZTAxIiwiZXhwIjoxNjYxOTM3MTY0LCJlbWFpbCI6ImJvYmJ5am9uZXNAdGVzdC5jb20iLCJ1c2VybmFtZSI6ImJvYmJ5am9uZXMifQ.Xb0-7JP7EE2eSTVcxGmVq6uwGunwS46vS853PFfhRB-fK8e58Pr1ht9X4vcCXyrKKl7D1_4lDUzmNJMb6JnWYTJWy-BfvEEU89woMnJD9j8cL4rs-QLMviRxE6tp02LWixmivt8Vi3wtITzUn55V-pERMRS1Fi5HrRQ7KmUBxkJ0DDtVJCut4tOIIEBYEabanqGN5X1fyjYbROuZGd4M_PONLDOZ-PTiA4N1QMOg-5dWmC2C_0W0M2xcGIjuzGF7sG-hBDbZ84fw6_KulHv-L7czr8Bkdj8tebKa1rs83k9gdTauTnv4r7tGTrUIzHErahfj8TbryklNLjj0i5-C_A';

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    retrieveChowFilterOptions: build.query({
      query: () => ({
        url: `/chow/filter-options`,
        method: 'GET',
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
  useRetrieveChowFilterOptionsQuery,
  useRetrieveChowListMutation,
} = apiSlice;

export { apiSlice };
