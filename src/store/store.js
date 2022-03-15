import { configureStore } from '@reduxjs/toolkit';

// Import the various reducers
import searchReducer from '../slices/Search/searchSlice';

// Create and export the store
const store = configureStore({
    reducer: {
        search: searchReducer
    }
});

export default store;