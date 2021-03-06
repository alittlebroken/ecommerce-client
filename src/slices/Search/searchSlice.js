import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { findProduct, findProducts } from '../../api/products/products';

// perform  a search
export const performSearch = createAsyncThunk('search/performSearch',
  async (payload, thunkAPI) => {

    try{

        return await findProducts(payload);

    } catch(error) {
        throw error;
    }
    
  }
); 

// Get an individual product from the database
export const getProduct = createAsyncThunk('search/getProduct',
  async (payload, thunkAPI) => {

    try {

        return await findProduct(payload);

    } catch(error) {
        throw error;
    }

  }
);

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        results: [],
        searchTerm: localStorage.getItem('searchTerms'),
        category: 0,
        isLoading: false,
        hasError: false
    },
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        setSearchCategory: (state, action) => {
            state.category = action.payload;
        }
    },
    extraReducers: {
        [performSearch.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [performSearch.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        },
        [performSearch.fulfilled]: (state, action) => {

            state.isLoading = false;
            state.hasError = false;

            // parse the action payload
             const results = JSON.parse(action.payload);

            if(!results?.data){
                state.results = [];
            } else {

                if(results.status === 204){
                    state.results = [];
                } else {
                    state.results = results.data;
                }
            }
            
        },
        [getProduct.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [getProduct.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        },
        [getProduct.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.hasError = false;

            const results = JSON.parse(action.payload);

            if(!results?.data){
                state.results = results.message;
            } else {

                if(results.status === 404){
                    state.results = results.message;
                    state.hasError = true;
                } else {
                    state.results = results.data;
                }
            }
        },
    }
});

// Selectors
export const selectSearchResults = state => state.search?.results;
export const selectSearchCategory = state => state.search?.category;
export const selectSearchTerms = state => state.search?.searchTerm;
export const selectIsLoading = state => state.search?.isLoading;
export const selectHasError = state => state.search?.hasError;

// actions
export const { setSearchTerm, setSearchCategory } = searchSlice.actions;

// Export slice reducer
export default searchSlice.reducer;