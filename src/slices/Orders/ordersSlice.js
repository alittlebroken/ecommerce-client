import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

/**
 * Import the API functions
 */
import { getCustomerOrders, getCustomerOrder, getOrderItems } from '../../api/orders/orders';

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
            
            return JSON.stringify(response);

        } catch(error) {
            throw error;
        }

    }
);

/**
 * Thunk for loading a single order into the store
 */
export const loadOrder = createAsyncThunk(
    'orders/loadOrder',
    async (payload, thunkAPI) => {
        try{
            /**
             * load the data from the API
             */
            const response = await getCustomerOrder(payload);
            return JSON.stringify(response);
        } catch(error) {
            throw error;
        }
    }
);

/**
 * Thunk for loading items for an order
 */
export const loadOrderItems = createAsyncThunk(
    'orders/loadOrderItems',
    async (payload, thunkAPI) => {
        try{

            /**
             * load the items for an order
             */
            const response = getOrderItems(payload);
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
    filter: null,
    isLoading: false,
    hasError: false,
}

/**
 * Create the store slice
 */
const ordersSlice = createSlice({
    name: 'orders',
    initialState: initialState,
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload;
        }
    },
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
            if(state.filter == null || state.filter === 'all'){
                /**
                 * load all orders into the state
                 */
                 state.orders = result.data;
            } else if(state.filter === 'pending'){
                state.orders = result.data.filter(item => item.order_arrived == null);
            } else if(state.filter === 'completed'){
                state.orders = result.data.filter(item => item.order_arrived != null);
            }

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

            /**
             * Sort the orders by date
             */
             state.orders.sort((a, b) => (a.order_date < b.order_date) ? 1: -1);

        },
        [loadOrder.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [loadOrder.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        },
        [loadOrder.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.hasError = false;

            /**
             * Parses the JSON response
             */
            const result = JSON.parse(action.payload);
            state.orders = result.data[0];
        },
        [loadOrderItems.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [loadOrderItems.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        },
        [loadOrderItems.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.hasError = false;

            /**
             * parse the JSON returned
             */
            const response = JSON.parse(action.payload);

            /**
             * Add the data to the order but only if we 
             * have 1 order
             */
            if(state.orders.length === 1){
                /**
                 * We are good to go lets add the orders
                 */
                state.orders = [
                    {
                    ...state.orders[0],
                    items: action.payload.data,
                    },
                ]
            }


        },
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
export const selectOrderFilter = state => state.orders?.filter;

/**
 * Export the actions
 */
 export const { setFilter } = ordersSlice.actions;

/**
 * Export the reducer for the store
 */
export default ordersSlice.reducer;