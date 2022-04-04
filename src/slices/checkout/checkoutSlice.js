import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
    placeOrder
} from '../../api/checkout/checkout';

/**
 * Thunk for placing the order
 */
export const processOrder = createAsyncThunk(
    'checkout/processOrder',
    async (payload, thunkAPI) => {

        try{
            return await placeOrder(payload);
        } catch(error) {
            throw error;
        }

    }
);

/**
 * Slice and extra reducers
 */
export const checkoutSlice = createSlice({
    name: 'checkout',
    initialState: {
        isLoading: false,
        hasError: false,
        paymentUrl: '',
    },
    reducers: {},
    extraReducers: {
        [processOrder.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [processOrder.rejected]: (state, action) => {
            state.isloading = false;
            state.hasError = true;
        },
        [processOrder.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.hasError = false;

            // Get the returned value from the API
            const response = JSON.parse(action.payload);
            state.paymentUrl = response.data.url;

        }
    }
});

/**
 * selectors
 */
export const selectHasError = state => state.checkout?.hasError;
export const selectIsLoading = state => state.checkout?.isLoading;
export const selectPaymentUrl = state => state.checkout?.paymentUrl;

/**
 * actions
 * export {} = checkoutSlice.actions;
 */

/**
 * Reducer
 */
export default checkoutSlice.reducer;