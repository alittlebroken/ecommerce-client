import { configureStore } from '@reduxjs/toolkit';

// Import the various reducers
import searchReducer from '../slices/Search/searchSlice';
import authReducer from '../slices/Auth/authSlice';

// Create and export the store
const store = configureStore({
    reducer: {
        search: searchReducer,
        auth: authReducer
    }
});

export default store;