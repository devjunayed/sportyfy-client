import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { TUser } from "../../types/shared.type";

const initialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logOut } = authSlice.actions;

export default authSlice.reducer;

export const currentToken = (state: RootState) => state.user.token;
export const currentUser = (state: RootState) =>
  state.user.user as unknown as TUser;
