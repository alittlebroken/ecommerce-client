// React packages
import React from 'react';
import { Provider } from 'react-redux';
import * as reactRedux from 'react-redux';

// Testing Packages
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import userEvent from '@testing-library/user-event';

// Component Packages
import Search from './Search';

describe('<Search />', () => {

    // We want to mock the store for each test
    const mockStore = configureStore();
    let store;

    // We also want to mock the useSelector and UseDispatch functions
    const useSelectorMock = jest.spyOn(reactRedux,'useSelector');
    const useDispatchMock = jest.spyOn(reactRedux,'useDispatch');

    const initialState = {
        results: [],
        term: "",
        category: 0,
        isLoading: false,
        hasError: false
    };

    // Setup the store for the tests
    store = mockStore(initialState);

    // Perform the following before each test
    beforeEach(() => {

        // Setup the store
        store = mockStore(initialState);

        // Reset the mocks
        fetch.resetMocks();
        useSelectorMock.mockClear();
        useDispatchMock.mockClear();

    });

    it('renders the component', () => {

       // Render the component being tested
       render(<Provider store={store}><Search /></Provider>);

       // Check the component was rendered
       expect(screen.getByRole('form')).toBeInTheDocument();
       expect(screen.getByRole('searchbox')).toBeInTheDocument();
       expect(screen.getByRole('button')).toBeInTheDocument();

    });

    it('should dispatch an action when the search box is typed in', async () => {

        // Dispatch mock test
        const mockedDispatch = jest.fn();
        useDispatchMock.mockReturnValue(mockedDispatch);

        // Perform a sanity test
        expect(mockedDispatch).not.toHaveBeenCalled();

        // Render the component
        render(<Provider store={store}><Search /></Provider>);

        const searchInput = screen.getByRole('searchbox');
        searchInput.focus();
        userEvent.keyboard('t');

        // The dispatch button should have been called at least once
        expect(mockedDispatch).toHaveBeenCalledTimes(1);

    });
  
});