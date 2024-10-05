import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "user"
}

const registerSlice = createSlice({
    initialState,
    name: 'register',
    reducers: {
       setName: (state, action) => {
        state.name = action.payload;
       },
       setEmail: (state, action) => {
        state.email = action.payload;
       },
       setPassword: (state, action) => {
        state.password = action.payload;
       },
       setPhone: (state, action) => {
        state.phone = action.payload;
       },
       setAddress: (state, action) => {
        state.address = action.payload;
       },
    }
})


export const {setName, setEmail, setAddress, setPhone, setPassword} = registerSlice.actions;

export default registerSlice.reducer;