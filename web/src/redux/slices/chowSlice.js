import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chowCategoryOptions: {
    cuisineOptions: [],
    priceRangeOptions: [],
    areaOptions: [],
  },
  chowListFilter: {
    searchString: '',
    cuisineList: [],
    priceRangeList: [],
    areaList: [],
  },
  chowList: [],
  chowError: null,
  randomChow: null,
};

const chowSlice = createSlice({
  name: 'chow',
  initialState: initialState,
  reducers: {
    setChowCategoryOptions: (state, action) => {
      state.chowCategoryOptions = action.payload;
    },
    resetFilters: (state) => {
      state.chowListFilter = initialState.chowListFilter;
    },
    setSearchFilter: (state, action) => {
      state.chowListFilter.searchString = action.payload;
    },
    setCuisineFilter: (state, action) => {
      state.chowListFilter.cuisineList = action.payload;
    },
    setPriceRangeFilter: (state, action) => {
      state.chowListFilter.priceRangeList = action.payload;
    },
    setAreaFilter: (state, action) => {
      state.chowListFilter.areaList = action.payload;
    },
    setChowList: (state, action) => {
      state.chowList = action.payload;
    },
    addNewChow: (state, action) => {
      const updatedChowList = [action.payload, ...state.chowList];
      state.chowList = updatedChowList;
    },
    modifyChow: (state, action) => {
      const { index, modifedChow } = action.payload;
      state.chowList[index] = modifedChow;
    },
    removeChow: (state, action) => {
      state.chowList.splice(action.payload, 1);
    },
    setChowError: (state, action) => {
      state.chowError = action.payload;
    },
    setRandomChow: (state, action) => {
      state.randomChow = action.payload;
    },
    modifyChowHasBeen: (state, action) => {
      state.chowList[action.payload].hasBeen++;
    },
  },
});

export const {
  setChowCategoryOptions,
  resetFilters,
  setSearchFilter,
  setCuisineFilter,
  setPriceRangeFilter,
  setAreaFilter,
  setChowList,
  addNewChow,
  modifyChow,
  removeChow,
  setChowError,
  setRandomChow,
  modifyChowHasBeen,
} = chowSlice.actions;

export { chowSlice };
