import { configureStore } from '@reduxjs/toolkit';

// Import the various reducers
import searchReducer from '../slices/Search/searchSlice';
import authReducer from '../slices/Auth/authSlice';
import cartReducer from '../slices/Cart/cartSlice';

// Create and export the store
const store = configureStore({
    reducer: {
        search: searchReducer,
        auth: authReducer,
        cart: cartReducer
    }
});

export default store;