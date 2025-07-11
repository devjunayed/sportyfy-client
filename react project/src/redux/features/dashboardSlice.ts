import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  greetings: true,
};

const dashboardSlice = createSlice({
  initialState,
  name: "dashboard",
  reducers: {
    closeGreetings: (state) => {
      state.greetings = !state.greetings;
    },
  },
});


export const {closeGreetings} = dashboardSlice.actions;
export default dashboardSlice.reducer;