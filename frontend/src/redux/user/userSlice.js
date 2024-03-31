import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerStart: (state) => {
      state.loading = true;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    registerFailure: (state) => {
      state.loading = false;
    },
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
    },
  },
});

export const {
  registerStart,
  registerSuccess,
  registerFailure,
  loginStart,
  loginSuccess,
  loginFailure,
} = userSlice.actions;

export default userSlice.reducer;
