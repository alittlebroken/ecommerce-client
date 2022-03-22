// React packages
import React from 'react';
import * as reactRedux from 'react-redux';

// Testing Packages
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

// Import testing utils
import{ render, screen } from '../../utils/test.util';

// Components to test
import Login from './Login';

// Test Suite
describe('<Login />', () => {

    // We also want to mock the useSelector and UseDispatch functions
    const useSelectorMock = jest.spyOn(reactRedux,'useSelector');
    const useDispatchMock = jest.spyOn(reactRedux,'useDispatch');

    beforeEach(() => {
        // Reset the mocks
        useSelectorMock.mockClear();
        useDispatchMock.mockClear();
    });

    it('renders the login form', () => {

      // Render the component
      render(<Login />);

      // Check that each component of the form is set
      expect(screen.getByRole('form')).toBeInTheDocument();

      expect(screen.getByLabelText('Username')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();

      expect(screen.getByLabelText('Password')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();

      expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Register'})).toHaveAttribute('href', '/register');

      expect(screen.getByAltText('bee with head in honeycomb')).toBeInTheDocument();

    });

    it('dispatches an action when the login button is pressed', () => {
        
        // Dispatch Mock
        const mockedDispatch = jest.fn();
        useDispatchMock.mockReturnValue(mockedDispatch);

        // Perform a sanity test to ensure it is not dispatched right away
        expect(mockedDispatch).not.toHaveBeenCalled();

        // The component we are testing
        render(<Login />);

        // Get the button we wish to test
        const loginButton = screen.getByRole('button', { name: 'Login' });
        userEvent.click(loginButton);

        // Check that the dispatch method was called at least once
        expect(mockedDispatch).toHaveBeenCalledTimes(1);

    });

});