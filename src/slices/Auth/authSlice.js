import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, registerUser } from '../../api/auth/auth';

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

// Logout thunk
export const performLogout = createAsyncThunk(
    'auth/performLogout',
    async (credentials, thunkAPI) => {

    }
);

// Registration thunk
export const registerAccount = createAsyncThunk(
    'auth/registerAccount',
    async(credentials, thunkAPI) => {

        try{

            // Extract the credentials
            const { email, password } = credentials;

            const response = await registerUser({
                email: email,
                password: password
            });

            // Do we have any error
            if(response.name === 'Error') {
                const err = new Error(response);
                throw err;
            }

            return {
                status: 'OK',
                message: 'User account created successfully.'
            }

        } catch(error) {
            throw error;
        }


    }
);

// Stores intitial state
const initialState = {
    isAuthenticated: !!localStorage.getItem('token'),
    accessToken: localStorage.getItem('token'),
    isLoading: false,
    hasError: false,
    errorMessage: '',
    redirectUrl: '/'
};

const authStore = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setRedirectUrl: (state, action) => {
            state.redirectUrl = action.payload;
        },
    },
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

            // Which page to redirect to
            state.redirectUrl = '/';
            
        },
        [performLogout.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [performLogout.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        },
        [performLogout.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.hasError = false;

            // remove token from localstorage
            localStorage.removeItem('token');

            // clean up the state
            state.isAuthenticated = false;
            state.accessToken = '';
            state.redirectUrl = '/login';
        },
        [registerAccount.pending]: (state, action) => {
            state.isLoading = true;
            state.hasErorr = false;
        },
        [registerAccount.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;

            state.errorMessage = action.error.message;
        },
        [registerAccount.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.errorMessage = '';
            state.redirectUrl = '/login';
        },
    }
});

// Export the selectors
export const selectIsLoading = state => state.auth.isLoading;
export const selectHasError = state => state.auth.hasError;
export const selectErrorMessage = state => state.auth.errorMessage;
export const selectAuthenticated = state => state.auth.isAuthenticated;
export const selectToken = state => state.auth.accessToken;
export const selectRedirect = state => state.auth.redirectUrl;

// actions
export const { setIsAuthenticated, setRedirectUrl } = authStore.actions;

// Export the reducer
export default authStore.reducer;