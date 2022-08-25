import { createSlice } from '@reduxjs/toolkit';

const chowListState = {
  chowList: [],
};

export const chowListSlice = createSlice({
  name: 'chowList',
  initialState: chowListState,
  reducers: {
    updateChowList: (state, action) => {
      state.chowList = action.payload;
    },
  },
});

export const { updateChowList } = chowListSlice.actions;
