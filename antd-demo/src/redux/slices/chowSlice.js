import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chowListFilter: {
    searchString: '',
    cuisineList: [],
    priceRangeList: [],
    areaList: [],
  },
  chowList: [],
};

const chowSlice = createSlice({
  name: 'chow',
  initialState: initialState,
  reducers: {
    resetFilters: (state) => {
      state.chowListFilter = initialState.chowListFilter;
    },
    updateSearchFilter: (state, action) => {
      state.chowListFilter.searchString = action.payload;
    },
    updateCuisineFilter: (state, action) => {
      state.chowListFilter.cuisineList = action.payload;
    },
    updatePriceRangeFilter: (state, action) => {
      state.chowListFilter.priceRangeList = action.payload;
    },
    updateAreaFilter: (state, action) => {
      state.chowListFilter.areaList = action.payload;
    },
    updateChowList: (state, action) => {
      state.chowList = action.payload;
    },
  },
});

export const {
  resetFilters,
  updateSearchFilter,
  updateCuisineFilter,
  updatePriceRangeFilter,
  updateAreaFilter,
  updateChowList,
} = chowSlice.actions;

export { chowSlice };
