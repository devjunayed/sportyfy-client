import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  slot: null,
};

const slotSlice = createSlice({
  name: "slot",
  initialState,
  reducers: {
    setSlot: (state, action) => {
      state.slot = action.payload;
    },
  },
});

export const { setSlot } = slotSlice.actions;

export default slotSlice.reducer;
