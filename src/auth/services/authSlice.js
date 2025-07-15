import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
    setAuthError: (state, action) => {
      state.error = action.payload;
      state.user = null;
    },
    clearAuth: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setAuthLoading, setUser, setAuthError, clearAuth } =
  authSlice.actions;
export default authSlice.reducer;
