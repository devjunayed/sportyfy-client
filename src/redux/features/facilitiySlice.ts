import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  images: [] as string[],
  name: "",
  description: "",
  pricePerHour: 0,
  location: "",
};

const facilitySlice = createSlice({
  initialState,
  name: "facility",
  reducers: {
    setImages: (state, action) => {
      if (!state.images.includes(action.payload[0])) {
        state.images.push(action.payload[0] as string);
      }
    },
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

export const {
  setImages,
  setName,
  setDescription,
  setPricePerHour,
  setLocation,
} = facilitySlice.actions;
export default facilitySlice.reducer;
