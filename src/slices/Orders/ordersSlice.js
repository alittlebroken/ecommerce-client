import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

/**
 * Set the initial state for the store
 */
const initialState = {
    orders: [],
    completed: 0,
    pending: 0,
    total: 0,
    isLoading: false,
    hasError: false,
}

/**
 * Create the store slice
 */
const ordersSlice = createSlice({
    name: 'orders',
    initialState: initialState,
    reducers: {},
    extraReducers: {},
});

/**
 * Export selectors
 */
export const selectIsLoading = state => state.orders?.isLoading;
export const selectHasError = state => state.orders?.hasError;
export const selectOrders = state => state.orders?.orders;
export const selectCompletedOrders = state => state.orders?.completed;
export const selectTotalOrders = state => state.orders?.total;
export const selectPendingOrders = state => state.orders?.pending;

/**
 * Export the actions
 * export  const {} = ordersSlice.actions;
 */

/**
 * Export the reducer for the store
 */
export default ordersSlice.reducer;