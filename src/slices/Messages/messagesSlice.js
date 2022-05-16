import { createSlice } from '@reduxjs/toolkit';

/**
 * Initial state for the store
 */
const initialState = {
    content: '',
    type: '',
    code: '',
}

/**
 * Create the slice
 */
const messageSlice = createSlice({
    name: 'messages',
    initialState: initialState,
    reducers: {
        setMessage: (state, action) => {
            state.content = action.payload;
        },
        setType: (state, action) => {
            state.type = action.payload;
        },
        setCode: (state, action) => {
            state.code = action.payload;
        }
    },
});

/**
 * Export selects for the slices data
 */
export const selectMessage = state => state.messages.content;
export const selectType = state => state.messages.type;
export const selectCode = state => state.messages.code;

/**
 * Action exports
 */
export const { setMessage, setType, setCode } = messageSlice.actions;

/**
 * Default reducer export
 */
export default messageSlice.reducer;