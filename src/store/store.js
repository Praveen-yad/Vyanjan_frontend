import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cardSlice";

const store = configureStore({
    reducer:{
        cart: cartReducer,
    },
})

export default store