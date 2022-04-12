import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

/**
 * Import the API functions
 */
import { getCustomerOrders } from '../../api/orders/orders';

/**
 * Thunk for loading the orders data into the store
 */
export const loadOrders = createAsyncThunk(
    'orders/loadOrders',
    async (payload, thunkAPI) => {

        /**
         * get the orders for this customer from the API
         */
        try{

            const response = await getCustomerOrders(payload);
            console.log(response)
            return JSON.stringify(response);

        } catch(error) {
            throw error;
        }

    }
);

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
    extraReducers: {
        [loadOrders.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [loadOrders.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        },
        [loadOrders.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.hasError = false;

            /**
             * parse the JSON response
             */
            const result = JSON.parse(action.payload)
            
            /**
             * Load the data into the state
             */
            state.orders = result.data;

            /**
             * Set the total count of orders
             */
            state.total = state.orders.length;

            /**
             * Set the pending orders
             */
            const pending = state.orders.filter(item => item.order_arrived == null);
            state.pending = pending.length;

            /**
             * Set the completed orders
             */
            const completed = state.orders.filter(item => item.order_arrived != null);
            state.completed = completed.length;

        }
    },
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