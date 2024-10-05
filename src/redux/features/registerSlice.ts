import { createSlice } from "@reduxjs/toolkit";
import { RegistrationFieldType } from "../../types/registration.type";

const initialState : RegistrationFieldType = {
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
       clearRegisterForm : (state) => {
        state.name = ""
        state.email = ""
        state.address = ""
        state.phone = ""
        state.password = ""
       }
    }
})


export const {setName, setEmail, setAddress, setPhone, setPassword, clearRegisterForm} = registerSlice.actions;

export default registerSlice.reducer;