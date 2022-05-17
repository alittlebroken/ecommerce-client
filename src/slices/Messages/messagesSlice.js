import { createSlice } from '@reduxjs/toolkit';
import * as uuid from 'uuid';

/**
 * Initial state for the store
 */
const initialState = {
    messages: [],
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
        },
        removeMessage: (state, action) => {
            /**
             * Filter out any message which has the same message ID
             */
            state.messages = state.messages.filter(message => message.id !== action.payload);
        }
    },
    extraReducers: {
        /**
         * Listen for the add to cart action successfully
         */
        'cart/addItemToCart/fulfilled': (state, action) => {
            /**
             * Extract the payload out
             */
            const payload = JSON.parse(action.payload)
            
            /**
             * Generate a message based on the payload
             */
            if(payload.status === 201 && payload.statusText === 'Created'){
                
                state.messages.push({
                    id: uuid.v4(),
                    content: 'Item has been added to the cart',
                    type: 'OK',
                    code: 201,
                })

                state.content = "Item added to cart";
                state.type = "OK";
                state.code = 201;
            }
        },
        /**
         * Listen for the item added to cart error
         */
        'cart/addItemToCart/rejected': (state, action) => {
          
            /**
             * Extract the payload out
             */
             const payload = JSON.parse(action.payload)

            /**
             * Generate a message based on the payload
             */

            state.messages.push({
                id: uuid.v4(),
                content: 'Unable to add item to the cart',
                type: 'ERROR',
                code: 400,
            })

            state.content = "There was an issue adding the desired item to the cart";
            state.type = "ERROR";
            state.code = "400";

        },
    },
});

/**
 * Export selects for the slices data
 */
export const selectMessage = state => state.messages.content;
export const selectMessages = state => state.messages;
export const selectType = state => state.messages.type;
export const selectCode = state => state.messages.code;

/**
 * Action exports
 */
export const { setMessage, setType, setCode, removeMessage } = messageSlice.actions;

/**
 * Default reducer export
 */
export default messageSlice.reducer;