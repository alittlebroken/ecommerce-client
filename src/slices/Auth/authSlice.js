import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser } from '../../api/auth/auth';

// Login thunk
export const performLogin = createAsyncThunk(
    'auth/performLogin',
    async (credentials, thunkAPI) => {
        try{

            const response = await loginUser(credentials);

            // Do we have any error
            if(response.name === 'Error') {
                const err = new Error(response);
                throw err;
            }

            return {
                token: response,
                isAuthenticated: true
            }

        } catch(error) {
            throw error;
        }
    }
);

// Stores intitial state
const initialState = {
    isAuthenticated: false,
    accessToken: '',
    isLoading: false,
    hasError: true,
    errorMessage: ''
};

const authStore = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [performLogin.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [performLogin.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
            state.errorMessage = action.error.message;

            // Remove auth token in localStorage
            localStorage.removeItem('token');
        },
        [performLogin.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.errorMessage = '';

            // All is OK
            state.isAuthenticated = true;
            state.accessToken = action.payload.token.data.token;

            // Set token in localstorage
            localStorage.setItem('token',JSON.stringify(state.accessToken));  
            
        },
    }
});

// Export the selectors
export const selectIsLoading = state => state.auth.isLoading;
export const selectHasError = state => state.auth.hasError;
export const selectErrorMessage = state => state.auth.errorMessage;
export const selectAuthenticated = state => state.auth.isAuthenticated;
export const selectToken = state => state.auth.accessToken;

// Export the reducer
export default authStore.reducer;