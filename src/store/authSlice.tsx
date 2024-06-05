import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Auth } from "./types";

const initialState: Auth = {
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
    removeAccessToken(state) {
      state.accessToken = null;
    },
  },
});

export const { addAccessToken, removeAccessToken } = authSlice.actions;

export default authSlice.reducer;
