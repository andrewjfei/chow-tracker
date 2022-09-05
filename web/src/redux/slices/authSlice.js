import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  authError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAuthError: (state, action) => {
      state.authError = action.payload;
    },
  },
});

export const { setUser, setAuthError } = authSlice.actions;

export { authSlice };
