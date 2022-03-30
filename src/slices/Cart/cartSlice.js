import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
    addToCart,
    updateCart,
    emptyCart,
    getCartContent
} from '../../api/cart/cart';

/**
 * Thunk to add an item to the cart
 */
export const addItemToCart = createAsyncThunk(
    'cart/addItemToCart',
    async (payload, thunkAPI) => {
        
        try{
            return await addToCart(payload);
        } catch(error) {
            throw error;
        }

    }
);
/**
 * Thunk for loading cart items
 */
export const loadCart = createAsyncThunk(
    'cart/loadCart',
    async (payload, thunkAPI) => {

        try{
            return await getCartContent(payload);
        } catch(error) {
            throw error;
        }

    }
);

/**
 * Thunk for updating the users cart
 */
export const updateMyCart = createAsyncThunk(
    'cart/updateCart',
    async (payload, thunkAPI) => {

        try{
            return await updateCart(payload);
        } catch(error){
            throw error;
        }

    }
);

/**
 * Thunk for clearing out a users cart
 */
export const clearMyCart = createAsyncThunk(
    'cart/clearMyCart',
    async (payload, thunkAPI) => {
        try{
            return await emptyCart(payload);
        } catch(error) {
            throw error;
        }
    }
);

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        quantity: 0,
        cost: 0,
        isLoading: false,
        hasError: false
    },
    reducers: {},
    extraReducers: {
        [addItemToCart.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [addItemToCart.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = false;
        },
        [addItemToCart.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.hasError = false;
        },
        [loadCart.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [loadCart.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        },
        [loadCart.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.hasError = false;

            const data = JSON.parse(action.payload);
            
            // Check we have some data to load
            if(data.status === 204){
                state.items = [];
                state.quantity = 0;
                state.cost = 0;
            } else if(data.status === 200) {
                // Only extract the cart cost of we have data to display
                state.items = data.data;
                state.quantity = data.data.length;
                let cartCost = 0;
                state.items.map(item => {
                    let itemTotalCost = parseFloat(item.price) * item.quantity;
                       cartCost += itemTotalCost;
                });
                state.cost = cartCost;
            }
  
        },
        [updateMyCart.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [updateMyCart.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        },
        [updateMyCart.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.hasError = false;
        },
        [clearMyCart.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [clearMyCart.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        },
        [clearMyCart.fulfilled]: (state, action) => {
             state.isLoading = false;
             state.hasError = false;

             // Clear out the other state variables
             state.items = [];
             state.quantity = 0;
             state.cost = 0;
        }
    },
});

// Selectors
export const selectCartItems = state => state.cart?.items;
export const selectIsLoading = state => state.cart?.isLoading;
export const selectHasError = state => state.cart?.hasError;
export const selectCartCount = state => state.cart?.quantity;
export const selectCartCost = state => state.cart?.cost;

// Actions
//export {} = cartSlice.actions;

// Reducer
export default cartSlice.reducer;