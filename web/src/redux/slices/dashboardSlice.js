import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chowRankings: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: initialState,
  reducers: {
    setChowRankings: (state, action) => {
      state.chowRankings = action.payload;
    },
  },
});

export const { setChowRankings } = dashboardSlice.actions;

export { dashboardSlice };
