import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chowRankings: {
    popularity: [],
    cuisine: [],
    priceRange: [],
    area: [],
  },
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: initialState,
  reducers: {
    setChowRanking: (state, action) => {
      const { type, data } = action.payload;
      state.chowRankings[type] = data;
    },
  },
});

export const { setChowRanking } = dashboardSlice.actions;

export { dashboardSlice };
