import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:8080';

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api`,
    prepareHeaders: (headers, { getState }) => {
      // const token = getState().auth.user?.token;

      const token =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJmaXJzdE5hbWUiOiJCb2JieSIsImxhc3ROYW1lIjoiSm9uZXMiLCJpc3MiOiJhdXRoMCIsImlkIjoiMjQ0ZmRmNjYtNDI5ZS00ZDFiLTkxNTItNjE2Nzc1MTcyZTAxIiwiZXhwIjoxNjYxOTM1MDk0LCJlbWFpbCI6ImJvYmJ5am9uZXNAdGVzdC5jb20iLCJ1c2VybmFtZSI6ImJvYmJ5am9uZXMifQ.v7ou5jW1PVTWqvrir0nLM-CZn_pZNe0Ts-WsnEboW7nQjnBq00079gWHnyh5qE923uVuBGz3TcQj2_pbi1d9CJDYnN0TxTRHX1pRBzV-e5OkLz2gPd0QRWgS7Kwxkyna0RMuX4SyDRf-dGZKGn7eVThxkEeKS2iYWWzYJM9F2jOk-uM38FJZFkfa-aOgtU2P3d66C4_dTrisi3VxhiURO5zcTXpAwZX5m5zIAx-1GoZDrxUCC_7JuWqjyGZpsPEjPXNWhuPR77TiXoEmR5-4rhkgbxF0w0YJsRONdSVJEfc_hEHGC5ouIzVVuUOZ4QIC3-1sTQ1f0XnTnuL1ucjGtA';

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    retrieveChowList: build.mutation({
      query: ({ searchString, cuisineList, priceRangeList, areaList }) => ({
        url: `/chow?searchString=${searchString}&cuisineList=${cuisineList}&priceRangeList=${priceRangeList}&areaList=${areaList}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useRetrieveChowListMutation } = apiSlice;

export { apiSlice };
