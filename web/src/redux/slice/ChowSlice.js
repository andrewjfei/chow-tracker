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

const chowListFilterState = {
  filter: {
    searchString: '',
    cuisineList: [],
    priceRangeList: [],
    areaList: [],
  },
};

export const chowListFilterSlice = createSlice({
  name: 'chowListFilter',
  initialState: chowListFilterState,
  reducers: {
    updateChowListFilter: (state, action) => {
      console.log(action.payload);
      state.filter = action.payload;
    },
  },
});

export const { updateChowListFilter } = chowListFilterSlice.actions;
