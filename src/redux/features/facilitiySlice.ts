import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  description: "",
  pricePerHour: 0,
  location: "",
};

const facilitySlice = createSlice({
  initialState,
  name: "facility",
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setPricePerHour: (state, action) => {
      state.pricePerHour = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});

export const { setName, setDescription, setPricePerHour, setLocation } =
  facilitySlice.actions;
export default facilitySlice.reducer;
