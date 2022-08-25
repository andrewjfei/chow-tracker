import { createSlice } from '@reduxjs/toolkit';

const counterState = {
  count: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState: counterState,
  reducers: {
    increment: (state) => {
      state.count = state.count + 1;
    },
    decrement: (state) => {
      state.count = state.count - 1;
    },
    incrementByAmount: (state, action) => {
      state.count += action.payload;
      console.log(state);
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
