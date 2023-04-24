import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:'cart',
    initialState: 0,
    reducers:{
        add(state, action){
            return state+1
        },
        remove(state, action){
            return state-1
        }
    }
})

export const { add, remove } = cartSlice.actions;
export default cartSlice.reducer;