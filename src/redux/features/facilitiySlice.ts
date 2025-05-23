import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TFacility } from "../../types/facility.type";



const initialState: TFacility = {
  images: [],
  name: "",
  shortDescription: "",
  description: "",
  pricePerHour: 0,
  location: "",
  category: "",
  capacity: 0,
  openHours: "",
  highlight: "",
};

const facilitySlice = createSlice({
  name: "facility",
  initialState,
  reducers: {
    setImages: (state, action: PayloadAction<string>) => {
      if (!state.images.includes(action.payload)) {
        state.images.push(action.payload);
      }
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setShortDescription: (state, action: PayloadAction<string>) => {
      state.shortDescription = action.payload;
    },
    setPricePerHour: (state, action: PayloadAction<number>) => {
      state.pricePerHour = action.payload;
    },
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },

    setCapacity: (state, action: PayloadAction<number>) => {
      state.capacity = action.payload;
    },
    setOpenHours: (state, action: PayloadAction<string>) => {
      state.openHours = action.payload;
    },
    setHighlight: (state, action: PayloadAction<string>) => {
      state.highlight = action.payload;
    },
   
  },
});

export const {
  setImages,
  setName,
  setDescription,
  setShortDescription,
  setPricePerHour,
  setLocation,
  setCategory,
  setCapacity,
  setOpenHours,
  setHighlight,

} = facilitySlice.actions;

export default facilitySlice.reducer;
