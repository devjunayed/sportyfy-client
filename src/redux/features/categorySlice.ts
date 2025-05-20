import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  image: "",
  title: "",
  subtitle: "",
};

const categorySlice = createSlice({
  initialState,
  name: "category",
  reducers: {
    setImage: (state, action) => {
      state.image = action.payload;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setSubTitle: (state, action) => {
      state.subtitle = action.payload;
    },
  },
});

export const {
  setTitle,
  setSubTitle,
  setImage
} = categorySlice.actions;

export default categorySlice.reducer;
