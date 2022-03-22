import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// perform  a search
export const performSearch = createAsyncThunk('search/performSearch',
  async (searchType, thunkAPI) => {

    // Get the store state
    const state = thunkAPI.getState();

    // Extract out the relevant state data we need
    const searchTerm = state.search.searchTerm;
    const searchCat = state.search.category;

    // Set any options for the fetch statement
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            searchTerms: searchTerm,
            category: searchCat,
        }),
        redirect: 'follow',
    };

    // Use this to set the URL we get the posts from
    let url = `${process.env.REACT_APP_API_URL}/search`;

    try{
        
        // Fetch the data
        const response = await fetch(url, fetchOptions);
        // Get the json response data
        
        const json = await response.json();

        return json.data;
    } catch(error) {
        console.log(error);
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
            if(!action.payload){
                state.results = [];
            } else {
                state.results = action.payload.map(result => result);
            }
            
        }
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