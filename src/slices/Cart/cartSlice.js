import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: []
    },
    reducers: {},
    extraReducers: {},
});

// Selectors
export const selectCartItems = state => state.cart.items;

// Actions
//export {} = cartSlice.actions;

// Reducer
export default cartSlice.reducer;