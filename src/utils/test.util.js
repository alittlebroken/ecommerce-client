import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Crester the intial state for the store
const initialStateMock = {
    results: [],
    term: '',
    category: 0,
    isLoading: false,
    hasError: false
}

// Mock out the store
const storeMock = configureStore();

// Create the store
const store = storeMock(initialStateMock);

// List all wrapped providers we need for our elements
const AllProviders = ({children}) => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                {children}
            </BrowserRouter>
        </Provider>
    );
};

// Override the render fucntion with our own
const customRender = (ui, options) => {
    render(ui, {wrapper: AllProviders, ...options});
}

export * from '@testing-library/react';
export {customRender as render };