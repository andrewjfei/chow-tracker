import { createSlice } from '@reduxjs/toolkit';

const authState = {
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: authState,
  reducers: {
    updateAuthUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { updateAuthUser } = authSlice.actions;
